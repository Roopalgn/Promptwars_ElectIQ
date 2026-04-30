/**
 * Google Gemini API client with rate limiting, streaming, and security
 * @module api/gemini
 */

import { sanitizeInput } from '../utils/sanitizer.js';
import { getOfflineAnswer, GENERIC_FALLBACK } from './offline-knowledge.js';

const API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
/** Models to try in order — falls back to a stable model if newer is unavailable */
const MODELS = ['gemini-flash-latest', 'gemini-2.5-flash', 'gemini-2.0-flash'];
const MAX_INPUT_LENGTH = 500;
const MAX_REQUESTS_PER_MIN = 10;
const RETRY_DELAYS = [1000, 2000, 4000];

/** System instruction for election-focused responses */
const SYSTEM_INSTRUCTION = `You are ElectIQ, an expert AI assistant on the Indian election process. You work for an educational platform helping Indian citizens understand how elections work.

Rules:
- Answer ONLY questions about Indian elections, voting, ECI, EVMs, voter registration, and democracy
- Use simple, plain language that a first-time voter can understand
- Keep responses concise (under 200 words)
- Cite the Election Commission of India (ECI) as your source when relevant
- Format responses with bullet points and bold text for clarity
- If asked something unrelated to elections, politely redirect: "I specialize in Indian election education. Try asking me about voter registration, EVMs, or the election process!"
- Always be factual and non-partisan — never favor any political party`;

/** Token bucket rate limiter */
class RateLimiter {
  constructor(maxTokens, intervalMs) {
    this.maxTokens = maxTokens;
    this.tokens = maxTokens;
    this.intervalMs = intervalMs;
    this.lastRefill = Date.now();
  }

  /** Check if a request is allowed */
  tryConsume() {
    this.refill();
    if (this.tokens > 0) {
      this.tokens -= 1;
      return true;
    }
    return false;
  }

  /** Refill tokens based on elapsed time */
  refill() {
    const now = Date.now();
    const elapsed = now - this.lastRefill;
    const tokensToAdd = Math.floor(elapsed / this.intervalMs) * this.maxTokens;
    if (tokensToAdd > 0) {
      this.tokens = Math.min(this.maxTokens, this.tokens + tokensToAdd);
      this.lastRefill = now;
    }
  }

  /** Get remaining tokens */
  getRemaining() {
    this.refill();
    return this.tokens;
  }
}

const rateLimiter = new RateLimiter(MAX_REQUESTS_PER_MIN, 60000);

/**
 * Get the API key from environment
 * @returns {string|null}
 */
function getApiKey() {
  try {
    const key = import.meta.env.VITE_GEMINI_KEY;
    if (key && key !== 'your_gemini_api_key_here') {
      return key;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Send a message to Gemini with retry logic and offline fallback.
 * Always returns a useful answer — uses an offline knowledge base
 * when no API key is configured or the API fails.
 * @param {string} userMessage - User's question
 * @param {Array} history - Conversation history [{role, text}]
 * @returns {Promise<string>} AI response text (always succeeds)
 */
export async function askGemini(userMessage, history = []) {
  // Sanitize and truncate input first — input validation always runs
  const clean = sanitizeInput(userMessage).slice(0, MAX_INPUT_LENGTH);
  if (!clean) {
    throw new Error('EMPTY_INPUT');
  }

  const apiKey = getApiKey();

  // No API key — answer from offline knowledge base
  if (!apiKey) {
    const offline = getOfflineAnswer(clean);
    return (offline || GENERIC_FALLBACK) +
      '\n\n_Tip: Set `VITE_GEMINI_KEY` in your `.env` file for full AI conversations._';
  }

  if (!rateLimiter.tryConsume()) {
    // Rate limited — try offline knowledge before failing
    const offline = getOfflineAnswer(clean);
    if (offline) return offline + '\n\n_Rate limit reached — answered from offline knowledge base._';
    throw new Error('RATE_LIMITED');
  }

  // Build conversation contents
  const contents = [];

  // Add history (last 8 turns for context window management)
  const recentHistory = history.slice(-8);
  for (const msg of recentHistory) {
    contents.push({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    });
  }

  // Add current user message
  contents.push({ role: 'user', parts: [{ text: clean }] });

  const body = {
    system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
    contents,
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      topK: 40,
      maxOutputTokens: 512
    },
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
    ]
  };

  // Try each model until one succeeds
  let lastError;
  for (const model of MODELS) {
    try {
      const text = await callModel(model, apiKey, body);
      if (text) return text;
    } catch (err) {
      lastError = err;
      const msg = String(err && err.message);
      // Only continue trying next model for model-not-found errors
      // For auth errors (403), network errors, etc. — fall through to offline fallback
      if (/404|400|NOT_FOUND|models\/gemini/i.test(msg)) {
        continue; // Try next model
      }
      break; // Non-model error — stop retrying
    }
  }

  // All models failed — fall back to offline knowledge base so the user still gets an answer
  const offline = getOfflineAnswer(clean);
  if (offline) {
    return offline + '\n\n_AI service unavailable right now — answered from offline knowledge base._';
  }
  // Last resort: rethrow the most recent error so the UI can show a friendly message
  throw lastError || new Error('UNKNOWN_ERROR');
}

/**
 * Call a single Gemini model endpoint with retry logic.
 * @param {string} model - Model name
 * @param {string} apiKey - API key
 * @param {Object} body - Request body
 * @returns {Promise<string>} Generated text
 */
async function callModel(model, apiKey, body) {
  const url = `${API_BASE}/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

  for (let attempt = 0; attempt <= RETRY_DELAYS.length; attempt++) {
    let res;
    try {
      res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
    } catch (networkErr) {
      // Network failure — retry with backoff
      if (attempt < RETRY_DELAYS.length) {
        await new Promise(r => setTimeout(r, RETRY_DELAYS[attempt]));
        continue;
      }
      throw new Error('NETWORK_ERROR');
    }

    if (res.status === 429 || res.status === 503) {
      if (attempt < RETRY_DELAYS.length) {
        await new Promise(r => setTimeout(r, RETRY_DELAYS[attempt]));
        continue;
      }
      throw new Error(`API returned ${res.status}`);
    }

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData?.error?.message || `API error: ${res.status}`);
    }

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      // Could be safety block or empty — return null so caller falls back
      const blockReason = data?.promptFeedback?.blockReason;
      if (blockReason) {
        throw new Error(`SAFETY_BLOCK:${blockReason}`);
      }
      throw new Error('Empty response from Gemini');
    }
    return text;
  }
  throw new Error('MAX_RETRIES_EXCEEDED');
}

/**
 * Check if API key is configured
 * @returns {boolean}
 */
export function isApiKeyConfigured() {
  return getApiKey() !== null;
}

/**
 * Get remaining rate limit tokens
 * @returns {number}
 */
export function getRemainingQueries() {
  return rateLimiter.getRemaining();
}

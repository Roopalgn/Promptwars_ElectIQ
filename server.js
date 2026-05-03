import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// ── Security headers (helmet) ─────────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: false, // CSP is already in index.html meta tag
  crossOriginEmbedderPolicy: false,
}));

// ── Body size cap (prevent payload attacks) ───────────────────────────────────
app.use(express.json({ limit: '50kb' }));

// ── Rate limiter on the proxy endpoint ───────────────────────────────────────
const geminiLimiter = rateLimit({
  windowMs: 60 * 1000,   // 1 minute
  max: 20,               // 20 requests per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'RATE_LIMIT_EXCEEDED' },
});

// ── Allowlist of valid Gemini model names (prevents SSRF) ────────────────────
const ALLOWED_MODELS = new Set([
  'gemini-flash-latest',
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
  'gemini-1.5-flash',
  'gemini-1.5-pro',
]);

app.use(express.static(path.join(__dirname, 'dist')));

// ── Secure Proxy for Gemini API ───────────────────────────────────────────────
app.post('/api/gemini', geminiLimiter, async (req, res) => {
  const apiKey = process.env.VITE_GEMINI_KEY;

  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return res.status(500).json({ error: 'API_KEY_NOT_CONFIGURED' });
  }

  const { model, body } = req.body;

  // Validate model name against allowlist to prevent SSRF
  if (!model || !ALLOWED_MODELS.has(model)) {
    return res.status(400).json({ error: 'INVALID_MODEL' });
  }

  // Validate that body exists and is an object
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return res.status(400).json({ error: 'INVALID_REQUEST_BODY' });
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy Error:', error.message);
    res.status(500).json({ error: 'FAILED_TO_FETCH_GEMINI' });
  }
});

// ── Fallback for SPA routing ──────────────────────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`ElectIQ Server running on port ${PORT}`);
});

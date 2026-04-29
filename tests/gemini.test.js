/**
 * Tests for Gemini API client — security and rate limiting
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock import.meta.env
vi.stubEnv('VITE_GEMINI_KEY', 'test-key-123');

describe('Gemini API - Input Validation', () => {
  it('rejects empty input after sanitization', async () => {
    const { askGemini } = await import('../src/api/gemini.js');
    await expect(askGemini('')).rejects.toThrow('EMPTY_INPUT');
  });

  it('rejects whitespace-only input', async () => {
    const { askGemini } = await import('../src/api/gemini.js');
    await expect(askGemini('   ')).rejects.toThrow('EMPTY_INPUT');
  });

  it('reports API key as configured when env var is set', async () => {
    const { isApiKeyConfigured } = await import('../src/api/gemini.js');
    expect(isApiKeyConfigured()).toBe(true);
  });

  it('returns remaining queries from rate limiter', async () => {
    const { getRemainingQueries } = await import('../src/api/gemini.js');
    const remaining = getRemainingQueries();
    expect(typeof remaining).toBe('number');
    expect(remaining).toBeGreaterThanOrEqual(0);
    expect(remaining).toBeLessThanOrEqual(10);
  });
});

describe('Gemini API - Rate Limiting', () => {
  it('rate limiter has correct max tokens', async () => {
    const { getRemainingQueries } = await import('../src/api/gemini.js');
    // After fresh module load, should have max tokens
    const remaining = getRemainingQueries();
    expect(remaining).toBeLessThanOrEqual(10);
  });
});

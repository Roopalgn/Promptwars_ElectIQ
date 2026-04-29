/**
 * Tests for cache utility — localStorage TTL management
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getCached, setCached, removeCached, getPersistent, setPersistent } from '../src/utils/cache.js';

describe('Cache — TTL-based Storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns null for non-existent key', () => {
    expect(getCached('nonexistent')).toBeNull();
  });

  it('stores and retrieves a value', () => {
    setCached('test-key', { data: 'hello' });
    expect(getCached('test-key')).toEqual({ data: 'hello' });
  });

  it('returns null for expired entries', () => {
    setCached('expired-key', 'value', 1); // 1ms TTL
    // Advance time
    vi.useFakeTimers();
    vi.advanceTimersByTime(10);
    expect(getCached('expired-key')).toBeNull();
    vi.useRealTimers();
  });

  it('removes cached values', () => {
    setCached('to-remove', 'data');
    removeCached('to-remove');
    expect(getCached('to-remove')).toBeNull();
  });

  it('handles corrupted localStorage data gracefully', () => {
    localStorage.setItem('electiq_corrupt', 'not-json');
    expect(getCached('corrupt')).toBeNull();
  });

  it('handles localStorage quota errors silently', () => {
    // Should not throw
    expect(() => setCached('key', 'x'.repeat(10000000))).not.toThrow();
  });
});

describe('Cache — Persistent Storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('stores and retrieves persistent values (no expiry)', () => {
    setPersistent('high_score', 8);
    expect(getPersistent('high_score')).toBe(8);
  });

  it('returns null for non-existent persistent key', () => {
    expect(getPersistent('missing')).toBeNull();
  });

  it('persistent values do not expire', () => {
    setPersistent('forever', 'always');
    vi.useFakeTimers();
    vi.advanceTimersByTime(999999999);
    expect(getPersistent('forever')).toBe('always');
    vi.useRealTimers();
  });
});

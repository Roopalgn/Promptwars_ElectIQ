/**
 * Cache manager — localStorage + SW coordination
 * @module utils/cache
 */

const CACHE_PREFIX = 'electiq_';
const DEFAULT_TTL = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Get cached value with TTL check
 * @param {string} key - Cache key
 * @returns {*} Parsed value or null
 */
export function getCached(key) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) { return null; }
    const { value, expiry } = JSON.parse(raw);
    if (expiry && Date.now() > expiry) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return value;
  } catch {
    return null;
  }
}

/**
 * Set cached value with optional TTL
 * @param {string} key - Cache key
 * @param {*} value - Value to cache
 * @param {number} [ttl] - TTL in ms (default 24h)
 */
export function setCached(key, value, ttl = DEFAULT_TTL) {
  try {
    const entry = { value, expiry: Date.now() + ttl };
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry));
  } catch {
    // localStorage full — silently fail
  }
}

/**
 * Remove cached value
 * @param {string} key - Cache key
 */
export function removeCached(key) {
  localStorage.removeItem(CACHE_PREFIX + key);
}

/**
 * Get a persistent value (no expiry)
 * @param {string} key
 * @returns {*}
 */
export function getPersistent(key) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) { return null; }
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Set a persistent value (no expiry)
 * @param {string} key
 * @param {*} value
 */
export function setPersistent(key, value) {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(value));
  } catch {
    // silently fail
  }
}

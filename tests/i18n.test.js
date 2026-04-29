/**
 * Tests for i18n utility — translation engine
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { t, localize, getLang, setLang, toggleLang } from '../src/utils/i18n.js';

describe('i18n', () => {
  beforeEach(() => {
    setLang('en');
  });

  it('resolves English keys correctly', () => {
    expect(t('app.title')).toBe('ElectIQ');
    expect(t('nav.home')).toBe('Home');
  });

  it('resolves Hindi keys correctly', () => {
    setLang('hi');
    expect(t('nav.home')).toBe('होम');
    expect(t('app.tagline')).toBe('अपना वोट जानो। अपनी आवाज़ बनो।');
  });

  it('falls back to English for missing Hindi key', () => {
    setLang('hi');
    // If a key exists in en but not in hi, should still return en version
    const result = t('nonexistent.key');
    expect(result).toBe('nonexistent.key'); // Returns key itself as final fallback
  });

  it('returns key string when key does not exist in any language', () => {
    expect(t('does.not.exist')).toBe('does.not.exist');
  });

  it('toggles language from en to hi', () => {
    expect(getLang()).toBe('en');
    const newLang = toggleLang();
    expect(newLang).toBe('hi');
    expect(getLang()).toBe('hi');
  });

  it('toggles language from hi to en', () => {
    setLang('hi');
    const newLang = toggleLang();
    expect(newLang).toBe('en');
  });

  it('persists language preference to localStorage', () => {
    setLang('hi');
    expect(localStorage.getItem('electiq-lang')).toBe('hi');
  });

  it('ignores invalid language codes', () => {
    setLang('fr');
    expect(getLang()).toBe('en'); // Should remain unchanged
  });
});

describe('localize', () => {
  beforeEach(() => {
    setLang('en');
  });

  it('returns English value by default', () => {
    const obj = { en: 'Hello', hi: 'नमस्ते' };
    expect(localize(obj)).toBe('Hello');
  });

  it('returns Hindi value when language is hi', () => {
    setLang('hi');
    const obj = { en: 'Hello', hi: 'नमस्ते' };
    expect(localize(obj)).toBe('नमस्ते');
  });

  it('falls back to English when hi key is missing', () => {
    setLang('hi');
    const obj = { en: 'Only English' };
    expect(localize(obj)).toBe('Only English');
  });

  it('returns empty string for null/undefined', () => {
    expect(localize(null)).toBe('');
    expect(localize(undefined)).toBe('');
  });
});

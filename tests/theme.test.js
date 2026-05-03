/**
 * Tests for theme utility — dark/light/system toggle
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getStoredTheme, getEffectiveTheme, applyTheme, setTheme, cycleTheme, initTheme, getThemeLabel } from '../src/utils/theme.js';

describe('Theme — Storage', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('returns "system" when no theme stored', () => {
    expect(getStoredTheme()).toBe('system');
  });

  it('returns "dark" when dark is stored', () => {
    localStorage.setItem('electiq-theme', 'dark');
    expect(getStoredTheme()).toBe('dark');
  });

  it('returns "light" when light is stored', () => {
    localStorage.setItem('electiq-theme', 'light');
    expect(getStoredTheme()).toBe('light');
  });

  it('returns "system" for invalid stored value', () => {
    localStorage.setItem('electiq-theme', 'neon');
    expect(getStoredTheme()).toBe('system');
  });

  it('returns "system" when localStorage throws', () => {
    const spy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked'); });
    expect(getStoredTheme()).toBe('system');
    spy.mockRestore();
  });
});

describe('Theme — Effective Resolution', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('resolves "dark" or "light" for stored system preference', () => {
    localStorage.setItem('electiq-theme', 'system');
    const result = getEffectiveTheme();
    expect(['dark', 'light']).toContain(result);
  });

  it('returns stored value directly for explicit choice', () => {
    localStorage.setItem('electiq-theme', 'light');
    expect(getEffectiveTheme()).toBe('light');
  });
});

describe('Theme — Apply', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme');
    // Add meta theme-color for testing
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      document.head.appendChild(meta);
    }
  });

  it('sets data-theme attribute on documentElement', () => {
    applyTheme('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('sets data-theme to light', () => {
    applyTheme('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('updates meta theme-color for dark theme', () => {
    applyTheme('dark');
    expect(document.querySelector('meta[name="theme-color"]').getAttribute('content')).toBe('#0A0A14');
  });

  it('updates meta theme-color for light theme', () => {
    applyTheme('light');
    expect(document.querySelector('meta[name="theme-color"]').getAttribute('content')).toBe('#FFFFFF');
  });
});

describe('Theme — setTheme persists', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('persists choice to localStorage', () => {
    setTheme('light');
    expect(localStorage.getItem('electiq-theme')).toBe('light');
  });

  it('applies theme to DOM', () => {
    setTheme('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});

describe('Theme — Cycle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('cycles dark → light', () => {
    localStorage.setItem('electiq-theme', 'dark');
    expect(cycleTheme()).toBe('light');
  });

  it('cycles light → system', () => {
    localStorage.setItem('electiq-theme', 'light');
    expect(cycleTheme()).toBe('system');
  });

  it('cycles system → dark', () => {
    localStorage.setItem('electiq-theme', 'system');
    expect(cycleTheme()).toBe('dark');
  });

  it('persists cycled value', () => {
    localStorage.setItem('electiq-theme', 'dark');
    cycleTheme();
    expect(localStorage.getItem('electiq-theme')).toBe('light');
  });
});

describe('Theme — Labels', () => {
  it('returns moon emoji for dark', () => {
    expect(getThemeLabel('dark')).toBe('🌙');
  });

  it('returns sun emoji for light', () => {
    expect(getThemeLabel('light')).toBe('☀️');
  });

  it('returns monitor emoji for system', () => {
    expect(getThemeLabel('system')).toBe('🖥️');
  });
});

describe('Theme — Init', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('applies theme on init without throwing', () => {
    expect(() => initTheme()).not.toThrow();
    expect(document.documentElement.hasAttribute('data-theme')).toBe(true);
  });
});

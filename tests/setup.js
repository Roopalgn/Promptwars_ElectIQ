/**
 * Vitest global test setup — patches environment for jsdom
 */

// Provide a full localStorage implementation since jsdom's proxy may be broken
const store = {};
const localStorageMock = {
  getItem: (key) => (key in store ? store[key] : null),
  setItem: (key, value) => { store[key] = String(value); },
  removeItem: (key) => { delete store[key]; },
  clear: () => { Object.keys(store).forEach(k => delete store[k]); },
  get length() { return Object.keys(store).length; },
  key: (i) => Object.keys(store)[i] || null,
};

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock, writable: true, configurable: true });

// Ensure window.matchMedia is available (required by theme.js)
if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
  window.matchMedia = (query) => ({
    matches: query === '(prefers-color-scheme: dark)',
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });
}

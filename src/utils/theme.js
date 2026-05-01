/**
 * Theme management — supports light, dark, and system preference.
 * Exposes a single helper that wires up CSS-variable theme switching with
 * smooth transitions while avoiding a flash of incorrect theme on load.
 *
 * Storage key: `electiq-theme` ('light' | 'dark' | 'system')
 *
 * @module utils/theme
 */

const STORAGE_KEY = 'electiq-theme';
const ATTR = 'data-theme';

/** @returns {'light'|'dark'|'system'} */
export function getStoredTheme() {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'light' || v === 'dark' || v === 'system' ? v : 'system';
  } catch { return 'system'; }
}

/** @returns {'light'|'dark'} */
function systemTheme() {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

/** Resolve user choice to an actual concrete theme. */
export function getEffectiveTheme() {
  const stored = getStoredTheme();
  return stored === 'system' ? systemTheme() : stored;
}

/**
 * Apply theme to document root. Updates meta theme-color for the URL bar.
 * @param {'light'|'dark'|'system'} theme
 */
export function applyTheme(theme) {
  const effective = theme === 'system' ? systemTheme() : theme;
  document.documentElement.setAttribute(ATTR, effective);

  // Update <meta name="theme-color"> for mobile address bar
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', effective === 'light' ? '#FFFFFF' : '#0A0A14');
  }
}

/**
 * Persist user choice and apply it.
 * @param {'light'|'dark'|'system'} theme
 */
export function setTheme(theme) {
  try { localStorage.setItem(STORAGE_KEY, theme); } catch { /* noop */ }
  applyTheme(theme);
}

/** Cycle: dark -> light -> system -> dark. */
export function cycleTheme() {
  const order = ['dark', 'light', 'system'];
  const current = getStoredTheme();
  const idx = order.indexOf(current);
  const next = order[(idx + 1) % order.length];
  setTheme(next);
  return next;
}

/** Initialize theme on page load and watch for system changes. */
export function initTheme() {
  applyTheme(getStoredTheme());
  // React to OS-level changes when user has chosen 'system'
  const mq = window.matchMedia('(prefers-color-scheme: light)');
  const onChange = () => {
    if (getStoredTheme() === 'system') applyTheme('system');
  };
  if (mq.addEventListener) mq.addEventListener('change', onChange);
  else if (mq.addListener) mq.addListener(onChange); // legacy
}

/** Pretty label for the current theme button. */
export function getThemeLabel(theme = getStoredTheme()) {
  if (theme === 'light') return '☀️';
  if (theme === 'dark') return '🌙';
  return '🖥️';
}

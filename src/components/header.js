/**
 * Header component with navigation and language toggle
 * @module components/header
 */

import { t, toggleLang, getLang } from '../utils/i18n.js';

/**
 * Render the header into the target element.
 *
 * IMPORTANT: The sidebar/overlay are mounted on `document.body`, NOT inside
 * the header element. The header has `backdrop-filter: blur(...)` which in
 * Chromium/WebKit creates a containing block for `position: fixed`
 * descendants, clipping the sidebar to the header's ~60px bounds.
 *
 * @param {HTMLElement} container
 * @param {Function} onLangChange - Callback when language changes
 */
export function renderHeader(container, onLangChange) {
  container.classList.add('app-header');
  let menuOpen = false;

  // Create sidebar root once on document.body so position:fixed resolves
  // against the viewport rather than against the blurred header.
  let sidebarRoot = document.getElementById('sidebar-root');
  if (!sidebarRoot) {
    sidebarRoot = document.createElement('div');
    sidebarRoot.id = 'sidebar-root';
    document.body.appendChild(sidebarRoot);
  }

  const renderHeaderBar = () => {
    container.innerHTML = `
      <div class="header-inner">
        <button class="header-menu-btn" id="header-menu-btn"
                aria-label="${menuOpen ? 'Close' : 'Open'} navigation menu"
                aria-expanded="${menuOpen}" aria-controls="header-nav">
          ${menuOpen ? '✕' : '☰'}
        </button>

        <a href="#hero" class="header-logo" aria-label="${t('app.title')} - ${t('app.tagline')}">
          <span class="header-logo-icon" aria-hidden="true">🗳️</span>
          <span class="header-logo-text">Elect<span>IQ</span></span>
        </a>

        <div class="header-actions">
          <button class="lang-toggle" id="lang-toggle-btn" aria-label="Switch language">
            ${t('lang.toggle')}
          </button>
        </div>
      </div>
    `;
    const menuBtn = container.querySelector('#header-menu-btn');
    if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
    container.querySelector('#lang-toggle-btn').addEventListener('click', () => {
      toggleLang();
      if (menuOpen) closeMenu();
      renderHeaderBar();
      if (onLangChange) onLangChange(getLang());
    });
  };

  const renderSidebar = () => {
    sidebarRoot.innerHTML = `
      <div class="new-sidebar-overlay ${menuOpen ? 'active' : ''}" id="sidebar-overlay" aria-hidden="${!menuOpen}"></div>
      <aside class="new-sidebar ${menuOpen ? 'active' : ''}" id="header-nav" aria-label="Main navigation"
             aria-hidden="${!menuOpen}" ${menuOpen ? '' : 'inert'}>
        <div class="new-sidebar-top">
          <div class="new-sidebar-title">Elect<span>IQ</span></div>
          <button class="new-sidebar-close" id="sidebar-close-btn" aria-label="Close menu">✕</button>
        </div>
        <ul class="new-sidebar-menu">
          <li><a href="#journey" id="nav-journey"><span class="new-sidebar-icon">📍</span>${t('nav.journey')}</a></li>
          <li><a href="#timeline" id="nav-timeline"><span class="new-sidebar-icon">📅</span>${t('nav.timeline')}</a></li>
          <li><a href="#eligibility" id="nav-eligibility"><span class="new-sidebar-icon">✅</span>${t('nav.eligibility')}</a></li>
          <li><a href="#evm" id="nav-evm"><span class="new-sidebar-icon">🗳️</span>${t('nav.evm')}</a></li>
          <li><a href="#quiz" id="nav-quiz"><span class="new-sidebar-icon">🧠</span>${t('nav.quiz')}</a></li>
          <li><a href="#pledge" id="nav-pledge"><span class="new-sidebar-icon">🤝</span>${t('nav.pledge')}</a></li>
          <li><a href="#glossary" id="nav-glossary"><span class="new-sidebar-icon">📖</span>${t('nav.glossary')}</a></li>
          <li><a href="#maps" id="nav-maps"><span class="new-sidebar-icon">📍</span>${t('nav.maps')}</a></li>
        </ul>
      </aside>
    `;

    const closeBtn = sidebarRoot.querySelector('#sidebar-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    const overlay = sidebarRoot.querySelector('#sidebar-overlay');
    if (overlay) overlay.addEventListener('click', closeMenu);

    sidebarRoot.querySelectorAll('.new-sidebar-menu a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  };

  function openMenu() {
    menuOpen = true;
    document.body.classList.add('sidebar-open');
    renderAll();
    const firstLink = sidebarRoot.querySelector('.new-sidebar-menu a');
    if (firstLink) firstLink.focus();
  }
  function closeMenu() {
    if (!menuOpen) return;
    menuOpen = false;
    document.body.classList.remove('sidebar-open');
    renderAll();
    const btn = container.querySelector('#header-menu-btn');
    if (btn) btn.focus();
  }
  function toggleMenu() { menuOpen ? closeMenu() : openMenu(); }

  const renderAll = () => { renderHeaderBar(); renderSidebar(); };
  renderAll();

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) closeMenu();
  });

  return { rerender: renderAll };
}



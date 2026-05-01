/**
 * Header component with navigation and language toggle
 * @module components/header
 */

import { t, toggleLang, getLang } from '../utils/i18n.js';

/**
 * Render the header into the target element
 * @param {HTMLElement} container
 * @param {Function} onLangChange - Callback when language changes
 */
export function renderHeader(container, onLangChange) {
  container.classList.add('app-header');
  let menuOpen = false;

  const render = () => {
    container.innerHTML = `
      <div class="header-inner">
        <!-- Hamburger (Hidden on Homepage) -->
        <button class="header-menu-btn" id="header-menu-btn" aria-label="${menuOpen ? 'Close' : 'Open'} navigation menu" aria-expanded="${menuOpen}" aria-controls="header-nav">
          ${menuOpen ? '✕' : '☰'}
        </button>

        <!-- Brand Logo (Centered on Home, Left on other pages) -->
        <a href="#hero" class="header-logo" aria-label="${t('app.title')} - ${t('app.tagline')}">
          <span class="header-logo-icon" aria-hidden="true">🗳️</span>
          <span class="header-logo-text">Elect<span>IQ</span></span>
        </a>

        <!-- Lang Toggle (Right aligned) -->
        <div class="header-actions">
          <button class="lang-toggle" id="lang-toggle-btn" aria-label="Switch language">
            ${t('lang.toggle')}
          </button>
        </div>
      </div>

      <!-- Sidebar Navigation (Reworked) -->
      <div class="new-sidebar-overlay ${menuOpen ? 'active' : ''}" id="sidebar-overlay"></div>
      <aside class="new-sidebar ${menuOpen ? 'active' : ''}" id="header-nav" aria-label="Main navigation">
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

    // Menu toggle
    const toggleMenu = () => {
      menuOpen = !menuOpen;
      render();
      if (menuOpen) {
        const firstLink = container.querySelector('.new-sidebar-menu a');
        if (firstLink) firstLink.focus();
      }
    };

    const menuBtn = container.querySelector('#header-menu-btn');
    if (menuBtn) menuBtn.addEventListener('click', toggleMenu);

    const closeBtn = container.querySelector('#sidebar-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', toggleMenu);
    
    const overlay = container.querySelector('#sidebar-overlay');
    if (overlay) overlay.addEventListener('click', toggleMenu);


    // Close menu when a nav link is clicked
    container.querySelectorAll('.new-sidebar-menu a').forEach(link => {
      link.addEventListener('click', () => {
        if (menuOpen) { menuOpen = false; render(); }
      });
    });

    container.querySelector('#lang-toggle-btn').addEventListener('click', () => {
      toggleLang();
      menuOpen = false;
      render();
      if (onLangChange) {
        onLangChange(getLang());
      }
    });

  };

  render();

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) {
      menuOpen = false;
      render();
      container.querySelector('#header-menu-btn').focus();
    }
  });

  return { rerender: render };
}



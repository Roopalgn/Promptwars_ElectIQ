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
        <a href="#hero" class="header-logo" aria-label="${t('app.title')} - ${t('app.tagline')}">
          <span class="header-logo-icon" aria-hidden="true">🗳️</span>
          <span class="header-logo-text">Elect<span>IQ</span></span>
        </a>
        <button class="header-menu-btn" id="header-menu-btn" aria-label="${menuOpen ? 'Close' : 'Open'} navigation menu" aria-expanded="${menuOpen}" aria-controls="header-nav">
          ${menuOpen ? '✕' : '☰'}
        </button>
        <nav class="header-nav ${menuOpen ? 'open' : ''}" id="header-nav" role="navigation" aria-label="Main navigation">
          <a href="#journey" id="nav-journey"><span>📍 </span>${t('nav.journey')}</a>
          <a href="#timeline" id="nav-timeline"><span>📅 </span>${t('nav.timeline')}</a>
          <a href="#eligibility" id="nav-eligibility"><span>✅ </span>${t('nav.eligibility')}</a>
          <a href="#evm" id="nav-evm"><span>🗳️ </span>${t('nav.evm')}</a>
          <a href="#quiz" id="nav-quiz"><span>🧠 </span>${t('nav.quiz')}</a>
          <a href="#pledge" id="nav-pledge"><span>🤝 </span>${t('nav.pledge')}</a>
          <a href="#glossary" id="nav-glossary"><span>📖 </span>${t('nav.glossary')}</a>
          <a href="#maps" id="nav-maps"><span>📍 </span>${t('nav.maps')}</a>
          <button class="lang-toggle" id="lang-toggle-btn" aria-label="Switch language">
            ${t('lang.toggle')}
          </button>
        </nav>
      </div>
    `;

    // Menu toggle
    container.querySelector('#header-menu-btn').addEventListener('click', () => {
      menuOpen = !menuOpen;
      render();
      if (menuOpen) {
        const firstLink = container.querySelector('.header-nav a');
        if (firstLink) firstLink.focus();
      }
    });

    // Close menu when a nav link is clicked (mobile)
    container.querySelectorAll('.header-nav a').forEach(link => {
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



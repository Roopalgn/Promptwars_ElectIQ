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

  const render = () => {
    container.innerHTML = `
      <div class="header-inner">
        <a href="#hero" class="header-logo" aria-label="${t('app.title')} - ${t('app.tagline')}">
          <span class="header-logo-icon" aria-hidden="true">🗳️</span>
          <span class="header-logo-text">Elect<span>IQ</span></span>
        </a>
        <nav class="header-nav" role="navigation" aria-label="Main navigation">
          <a href="#journey" id="nav-journey"><span>📍 </span>${t('nav.journey')}</a>
          <a href="#timeline" id="nav-timeline"><span>📅 </span>${t('nav.timeline')}</a>
          <a href="#quiz" id="nav-quiz"><span>🧠 </span>${t('nav.quiz')}</a>
          <a href="#glossary" id="nav-glossary"><span>📖 </span>${t('nav.glossary')}</a>
          <a href="#maps" id="nav-maps"><span>📍 </span>${t('nav.maps')}</a>
          <button class="lang-toggle" id="lang-toggle-btn" aria-label="Switch language">
            ${t('lang.toggle')}
          </button>
        </nav>
      </div>
    `;

    container.querySelector('#lang-toggle-btn').addEventListener('click', () => {
      toggleLang();
      render();
      if (onLangChange) {
        onLangChange(getLang());
      }
    });

    // Highlight active nav based on scroll
    updateActiveNav();
  };

  render();
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  return { rerender: render };
}

/** Update active nav link based on scroll position */
function updateActiveNav() {
  const sections = ['journey', 'timeline', 'quiz', 'glossary', 'maps'];
  const scrollY = window.scrollY + 120;

  let activeId = '';
  for (const id of sections) {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= scrollY) {
      activeId = id;
    }
  }

  document.querySelectorAll('.header-nav a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
  });
}

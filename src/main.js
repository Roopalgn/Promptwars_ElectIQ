/**
 * ElectIQ — Main Application Entry Point
 * Bootstraps all components and initializes the app
 * @module main
 */

// Import Styles
import './styles/main.css';
import './styles/components.css';
import './styles/animations.css';
import './styles/evm-pledge.css';

import { renderHeader } from './components/header.js';
import { renderJourneyMap } from './components/journey-map.js';
import { renderTimeline } from './components/timeline.js';
import { renderQuiz } from './components/quiz.js';
import { renderGlossary } from './components/glossary.js';
import { renderMaps } from './components/maps.js';
import { renderChatbot } from './components/chatbot.js';
import { renderCountdown } from './components/countdown.js';
import { renderEligibility } from './components/eligibility.js';
import { renderEvmSimulator } from './components/evm-simulator.js';
import { renderChecklist } from './components/checklist.js';
import { renderPledge } from './components/pledge.js';
import { t, getLang } from './utils/i18n.js';
import { initAnalytics } from './utils/analytics.js';
import { initPerformanceMonitoring, addResourceHints } from './utils/performance.js';
import { initTheme } from './utils/theme.js';

/** Component references for re-rendering on language change */
const components = {};

/**
 * Initialize the application
 */
function init() {
  document.documentElement.lang = getLang();

  // Apply persisted theme as early as possible (also done inline in <head>
  // for first paint, but re-run here to attach system-change listener).
  initTheme();

  // Initialize Google Analytics 4
  initAnalytics();

  // Performance monitoring — Web Vitals reporting
  initPerformanceMonitoring();
  addResourceHints();

  // Spotlight hover effect on glass cards
  initCardSpotlight();

  // Render Home UI
  renderHero();
  renderFeatureGrid();

  // Render all components with error isolation
  components.header = safeRender('app-header', (el) => renderHeader(el, handleLangChange));
  components.countdown = safeRender('countdown', renderCountdown);
  components.journey = safeRender('journey', renderJourneyMap);
  components.timeline = safeRender('timeline', renderTimeline);
  components.eligibility = safeRender('eligibility', renderEligibility);
  components.checklist = safeRender('checklist', renderChecklist);
  components.evm = safeRender('evm', renderEvmSimulator);
  components.quiz = safeRender('quiz', renderQuiz);
  components.pledge = safeRender('pledge', renderPledge);
  components.glossary = safeRender('glossary', renderGlossary);
  components.maps = safeRender('maps', renderMaps);
  components.chatbot = safeRender('chatbot-container', renderChatbot);

  // Intersection Observer for scroll animations
  initScrollReveal();

  // SPA Router for hash navigation
  initRouter();

  // Register Service Worker
  registerServiceWorker();
}

/**
 * Safely render a component — catches errors so one broken component
 * does not crash the entire application
 * @param {string} containerId - DOM element ID
 * @param {Function} renderFn - Render function to call with the container
 * @returns {Object|null} Component handle or null on failure
 */
function safeRender(containerId, renderFn) {
  try {
    const el = document.getElementById(containerId);
    if (!el) return null;
    return renderFn(el);
  } catch (err) {
    console.error(`[ElectIQ] Failed to render component "${containerId}":`, err);
    const el = document.getElementById(containerId);
    if (el) {
      el.innerHTML = `<div class="glass-card" style="padding:var(--space-6);text-align:center;" role="alert">
        <p style="color:var(--text-muted);">This section could not be loaded. Please refresh the page.</p>
      </div>`;
    }
    return null;
  }
}

/**
 * Simple SPA Router based on URL hash.
 * Hides non-active sections to simulate separate pages.
 */
function initRouter() {
  const sections = ['hero', 'feature-grid', 'countdown', 'journey', 'timeline', 'eligibility', 'checklist', 'evm', 'quiz', 'pledge', 'glossary', 'maps'];
  
  function handleRoute() {
    const hash = window.location.hash.slice(1) || 'hero';
    const isHome = hash === 'hero' || hash === '';

    if (isHome) {
      document.body.classList.add('is-home');
    } else {
      document.body.classList.remove('is-home');
    }

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      
      if (isHome) {
        if (id === 'hero' || id === 'feature-grid' || id === 'countdown') {
          el.style.display = 'block';
        } else {
          el.style.display = 'none';
        }
      } else {
        if (id === hash) {
          el.style.display = 'block';
          // For accessibility, focus the newly visible section
          setTimeout(() => {
            el.setAttribute('tabindex', '-1');
            el.focus({ preventScroll: true });
            window.scrollTo(0, 0);
          }, 50);
        } else {
          el.style.display = 'none';
        }
      }
    });

    // Highlight active nav link
    document.querySelectorAll('.header-nav a').forEach(link => {
      const linkHash = link.getAttribute('href');
      link.classList.toggle('active', linkHash === `#${hash}` || (isHome && linkHash === '#hero'));
    });
  }

  window.addEventListener('hashchange', handleRoute);
  
  // Intercept anchor clicks
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (window.location.hash === href || (window.location.hash === '' && href === '#hero')) {
        window.scrollTo(0, 0); // already there, just scroll up
      } else {
        window.location.hash = href;
      }
    });
  });

  // Run on load
  handleRoute();
}

/**
 * Mouse-following spotlight effect for `.glass-card` elements.
 * Uses a single delegated `pointermove` listener and CSS variables for performance.
 */
function initCardSpotlight() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(hover: hover)').matches) return; // skip on touch devices

  document.addEventListener('pointermove', (e) => {
    const card = e.target.closest && e.target.closest('.glass-card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    card.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, { passive: true });
}

function renderHero() {
  const hero = document.getElementById('hero');
  hero.innerHTML = `
    <div class="hero-content">
      <div class="hero-badge animate-fade-in-down delay-1">
        <span class="badge badge-primary">✨ ${t('hero.badge')}</span>
      </div>

      <h1 class="hero-title animate-fade-in-up delay-2" id="hero-title">
        ${t('hero.title.1')}<br>
        <span class="highlight gradient-text-animated">${t('hero.title.2')}</span><br>
        ${t('hero.title.3')}
      </h1>

      <p class="hero-subtitle animate-fade-in-up delay-3">
        ${t('hero.subtitle')}
      </p>

      <div class="hero-actions animate-fade-in-up delay-4">
        <a href="#journey" class="btn btn-primary" id="hero-cta-journey">
          📍 ${t('hero.cta.journey')}
        </a>
        <button class="btn btn-secondary" id="hero-cta-chat">
          💬 ${t('hero.cta.chat')}
        </button>
      </div>
    </div>
  `;

  // Chat CTA opens chatbot
  const chatCta = hero.querySelector('#hero-cta-chat');
  if (chatCta) {
    chatCta.addEventListener('click', () => {
      const toggle = document.querySelector('#chatbot-toggle-btn');
      if (toggle) { toggle.click(); }
    });
  }
}

/**
 * Render the Dashboard Style Feature Grid
 */
function renderFeatureGrid() {
  const grid = document.getElementById('feature-grid');
  if (!grid) return;

  const features = [
    { id: 'journey', icon: '📍', title: t('nav.journey'), desc: 'Step-by-step guide from registration to results.' },
    { id: 'timeline', icon: '📅', title: t('nav.timeline'), desc: 'Explore all the important election phases.' },
    { id: 'eligibility', icon: '✅', title: t('nav.eligibility'), desc: 'Check if you are eligible to vote.' },
    { id: 'evm', icon: '🗳️', title: t('nav.evm'), desc: 'Try our interactive EVM simulator.' },
    { id: 'quiz', icon: '🧠', title: t('nav.quiz'), desc: 'Test your election knowledge.' },
    { id: 'pledge', icon: '🤝', title: t('nav.pledge'), desc: 'Take the voter pledge today.' },
    { id: 'glossary', icon: '📖', title: t('nav.glossary'), desc: 'Learn common election terminology.' },
    { id: 'maps', icon: '📍', title: t('nav.maps'), desc: 'Find your nearest polling booth.' }
  ];

  grid.innerHTML = `
    <div class="feature-dashboard-grid">
      ${features.map((f, i) => `
        <a href="#${f.id}" class="dashboard-card glass-card animate-fade-in-up delay-${(i % 3) + 1}">
          <div class="dashboard-card-icon">${f.icon}</div>
          <h3 class="dashboard-card-title">${f.title}</h3>
          <p class="dashboard-card-desc">${f.desc}</p>
        </a>
      `).join('')}
    </div>
  `;
}

/**
 * Handle language change — re-render all components
 * @param {string} _lang - New language code
 */
function handleLangChange(_lang) {
  document.documentElement.lang = _lang;
  renderHero();
  Object.values(components).forEach(c => {
    if (c && typeof c.rerender === 'function') {
      c.rerender();
    }
  });
}

/**
 * Initialize Intersection Observer for scroll-reveal animations
 */
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  // Observe after a brief delay to let DOM settle
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }, 100);
}

/**
 * Register the Service Worker for PWA / offline support.
 * Detects when a new SW has installed and is waiting, then shows a
 * non-blocking "New version available" banner. Clicking refresh sends
 * SKIP_WAITING to the worker and reloads once it activates.
 */
function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
      // If a worker is already waiting (e.g. user returned to a stale tab)
      if (reg.waiting && navigator.serviceWorker.controller) {
        showUpdateBanner(reg.waiting);
      }
      // Watch for new updates while page is open
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        if (!newWorker) return;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            showUpdateBanner(newWorker);
          }
        });
      });
    }).catch(() => {
      // SW registration failed — non-critical
    });

    // When the new SW activates, reload exactly once so users see new assets
    let reloaded = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (reloaded) return;
      reloaded = true;
      window.location.reload();
    });
  });
}

/**
 * Display a dismissible banner offering to refresh for new content.
 * @param {ServiceWorker} waitingWorker
 */
function showUpdateBanner(waitingWorker) {
  if (document.getElementById('sw-update-banner')) return;

  const banner = document.createElement('div');
  banner.id = 'sw-update-banner';
  banner.className = 'sw-update-banner';
  banner.setAttribute('role', 'status');
  banner.setAttribute('aria-live', 'polite');
  banner.innerHTML = `
    <span class="sw-update-icon" aria-hidden="true">✨</span>
    <span class="sw-update-text">A new version of ElectIQ is available.</span>
    <button type="button" class="sw-update-refresh" id="sw-update-refresh">Refresh</button>
    <button type="button" class="sw-update-dismiss" id="sw-update-dismiss" aria-label="Dismiss">✕</button>
  `;
  document.body.appendChild(banner);
  // Animate in
  requestAnimationFrame(() => banner.classList.add('visible'));

  banner.querySelector('#sw-update-refresh').addEventListener('click', () => {
    waitingWorker.postMessage({ type: 'SKIP_WAITING' });
  });
  banner.querySelector('#sw-update-dismiss').addEventListener('click', () => {
    banner.classList.remove('visible');
    setTimeout(() => banner.remove(), 300);
  });
}

// Boot the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

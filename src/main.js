/**
 * ElectIQ — Main Application Entry Point
 * Bootstraps all components and initializes the app
 * @module main
 */

// Import Styles
import './styles/main.css';
import './styles/components.css';
import './styles/animations.css';

import { renderHeader } from './components/header.js';
import { renderJourneyMap } from './components/journey-map.js';
import { renderTimeline } from './components/timeline.js';
import { renderQuiz } from './components/quiz.js';
import { renderGlossary } from './components/glossary.js';
import { renderMaps } from './components/maps.js';
import { renderChatbot } from './components/chatbot.js';
import { renderCountdown } from './components/countdown.js';
import { renderEligibility } from './components/eligibility.js';
import { t, getLang } from './utils/i18n.js';
import { initAnalytics } from './utils/analytics.js';
import { initPerformanceMonitoring, addResourceHints } from './utils/performance.js';

/** Component references for re-rendering on language change */
const components = {};

/**
 * Initialize the application
 */
function init() {
  document.documentElement.lang = getLang();

  // Initialize Google Analytics 4
  initAnalytics();

  // Performance monitoring — Web Vitals reporting
  initPerformanceMonitoring();
  addResourceHints();

  // Render Hero
  renderHero();

  // Render all components with error isolation
  components.header = safeRender('app-header', (el) => renderHeader(el, handleLangChange));
  components.countdown = safeRender('countdown', renderCountdown);
  components.journey = safeRender('journey', renderJourneyMap);
  components.timeline = safeRender('timeline', renderTimeline);
  components.eligibility = safeRender('eligibility', renderEligibility);
  components.quiz = safeRender('quiz', renderQuiz);
  components.glossary = safeRender('glossary', renderGlossary);
  components.maps = safeRender('maps', renderMaps);
  components.chatbot = safeRender('chatbot-container', renderChatbot);

  // Intersection Observer for scroll animations
  initScrollReveal();

  // Focus management for hash navigation
  initFocusManagement();

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
 * Manage focus when navigating between sections via hash links
 */
function initFocusManagement() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        // Smooth scroll + focus management
        setTimeout(() => {
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }, 400);
      }
    });
  });
}

/**
 * Render the Hero section
 */
function renderHero() {
  const hero = document.getElementById('hero');
  hero.innerHTML = `
    <div class="hero-content">
      <div class="hero-badge animate-fade-in-down">
        <span class="badge badge-primary">✨ ${t('hero.badge')}</span>
      </div>

      <h1 class="hero-title animate-fade-in-up delay-1" id="hero-title">
        ${t('hero.title.1')}<br>
        <span class="highlight gradient-text-animated">${t('hero.title.2')}</span><br>
        ${t('hero.title.3')}
      </h1>

      <p class="hero-subtitle animate-fade-in-up delay-2">
        ${t('hero.subtitle')}
      </p>

      <div class="hero-actions animate-fade-in-up delay-3">
        <a href="#journey" class="btn btn-primary" id="hero-cta-journey">
          📍 ${t('hero.cta.journey')}
        </a>
        <button class="btn btn-secondary" id="hero-cta-chat">
          💬 ${t('hero.cta.chat')}
        </button>
      </div>

      <div class="hero-stats animate-fade-in-up delay-4">
        <div class="hero-stat">
          <div class="hero-stat-value">${t('hero.stat.voters')}</div>
          <div class="hero-stat-label">${t('hero.stat.voters.label')}</div>
        </div>
        <div class="hero-stat">
          <div class="hero-stat-value">${t('hero.stat.constituencies')}</div>
          <div class="hero-stat-label">${t('hero.stat.constituencies.label')}</div>
        </div>
        <div class="hero-stat">
          <div class="hero-stat-value">${t('hero.stat.phases')}</div>
          <div class="hero-stat-label">${t('hero.stat.phases.label')}</div>
        </div>
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
 * Register the Service Worker for PWA / offline support
 */
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // SW registration failed — non-critical
      });
    });
  }
}

// Boot the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

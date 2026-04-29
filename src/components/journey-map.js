/**
 * Interactive 6-step Election Journey Map
 * @module components/journey-map
 */

import { electionSteps } from '../data/election-steps.js';
import { t, localize } from '../utils/i18n.js';
import { trackEvent } from '../utils/analytics.js';

/**
 * Journey Map state manager (exported for testing)
 */
export class JourneyState {
  constructor(totalSteps) {
    this.current = 1;
    this.total = totalSteps;
    this.visited = new Set([1]);
  }

  next() {
    if (this.current < this.total) {
      this.current += 1;
      this.visited.add(this.current);
      return true;
    }
    return false;
  }

  prev() {
    if (this.current > 1) {
      this.current -= 1;
      return true;
    }
    return false;
  }

  goTo(step) {
    if (step >= 1 && step <= this.total) {
      this.current = step;
      this.visited.add(step);
      return true;
    }
    return false;
  }

  isCompleted(step) {
    return this.visited.has(step) && step < this.current;
  }
}

/**
 * Render the Journey Map section
 * @param {HTMLElement} container
 */
export function renderJourneyMap(container) {
  const state = new JourneyState(electionSteps.length);

  const render = () => {
    const step = electionSteps[state.current - 1];

    container.innerHTML = `
      <div class="section-header reveal">
        <h2 id="journey-title">${t('journey.title')}</h2>
        <p>${t('journey.subtitle')}</p>
      </div>

      <div class="journey-container reveal">
        <div class="journey-progress" role="tablist" aria-label="Election journey steps">
          ${electionSteps.map((s, i) => `
            <button class="journey-step-btn ${i + 1 === state.current ? 'active' : ''} ${state.isCompleted(i + 1) ? 'completed' : ''}"
                    role="tab"
                    id="journey-tab-${i + 1}"
                    aria-selected="${i + 1 === state.current}"
                    aria-controls="journey-panel"
                    data-step="${i + 1}"
                    title="${localize(s.title)}">
              <span aria-hidden="true">${state.isCompleted(i + 1) ? '✓' : s.icon}</span>
              <span>${t('journey.step')} ${i + 1}</span>
            </button>
          `).join('')}
        </div>

        <div class="glass-card journey-card animate-fade-in-up"
             role="tabpanel"
             id="journey-panel"
             aria-labelledby="journey-tab-${state.current}">
          <div class="journey-card-header">
            <span class="journey-card-icon" aria-hidden="true">${step.icon}</span>
            <div>
              <div class="journey-card-step">${t('journey.step')} ${state.current} ${t('journey.of')} ${state.total}</div>
              <h3 class="journey-card-title">${localize(step.title)}</h3>
            </div>
          </div>

          <div class="journey-card-body">
            <p>${localize(step.description)}</p>
            <ul>
              ${localize(step.details).map(d => `<li>${d}</li>`).join('')}
            </ul>
          </div>

          <div class="journey-fact" role="note">
            <div class="journey-fact-title">${t('journey.fact')}</div>
            <p>${localize(step.fact)}</p>
          </div>
        </div>

        <div class="journey-nav">
          <button class="btn btn-secondary" id="journey-prev" ${state.current === 1 ? 'disabled' : ''} aria-label="Previous step">
            ${t('journey.prev')}
          </button>
          <button class="btn btn-primary" id="journey-next" ${state.current === state.total ? 'disabled' : ''} aria-label="Next step">
            ${t('journey.next')}
          </button>
        </div>
      </div>
    `;

    // Event listeners
    container.querySelectorAll('.journey-step-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const stepNum = parseInt(btn.dataset.step, 10);
        state.goTo(stepNum);
        trackEvent('journey_step', { step: stepNum });
        render();
      });
    });

    const prevBtn = container.querySelector('#journey-prev');
    const nextBtn = container.querySelector('#journey-next');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => { state.prev(); render(); });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => { state.next(); render(); });
    }

    // Keyboard navigation — only act when focus is inside this section
    container.addEventListener('keydown', (e) => {
      const tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA') { return; }
      if (e.key === 'ArrowRight' && state.current < state.total) { state.next(); render(); }
      if (e.key === 'ArrowLeft' && state.current > 1) { state.prev(); render(); }
    });
  };

  render();
  return { rerender: render };
}

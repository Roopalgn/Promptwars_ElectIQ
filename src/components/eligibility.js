/**
 * Voter Eligibility Quick-Checker
 * 4-question form that tells users if they can vote and what to do next.
 * @module components/eligibility
 */

import { t } from '../utils/i18n.js';
import { trackEvent } from '../utils/analytics.js';

/**
 * Render the eligibility checker into a container.
 * @param {HTMLElement} container
 */
export function renderEligibility(container) {
  const state = { citizen: null, age: null, resident: null, jail: null, result: null };

  const render = () => {
    container.innerHTML = `
      <div class="section-header reveal">
        <h2 id="eligibility-title">${t('eligibility.title')}</h2>
        <p>${t('eligibility.subtitle')}</p>
      </div>

      <div class="reveal eligibility-wrap">
        <form class="glass-card eligibility-form" id="eligibility-form" aria-labelledby="eligibility-title" novalidate>
          ${question('citizen', t('eligibility.q1'), state.citizen)}
          ${question('age', t('eligibility.q2'), state.age)}
          ${question('resident', t('eligibility.q3'), state.resident)}
          ${question('jail', t('eligibility.q4'), state.jail)}

          <button type="submit" class="btn btn-primary" id="eligibility-submit">
            ${t('eligibility.check')}
          </button>
        </form>

        ${state.result ? renderResult(state.result) : ''}
      </div>
    `;

    container.querySelector('#eligibility-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      state.citizen = data.get('citizen') === 'yes';
      state.age = data.get('age') === 'yes';
      state.resident = data.get('resident') === 'yes';
      state.jail = data.get('jail') === 'yes';

      // Validate all answered
      if ([state.citizen, state.age, state.resident, state.jail].some(v => v === null)) {
        return;
      }

      const eligible = state.citizen && state.age && state.resident && !state.jail;
      const reasons = [];
      if (!state.citizen) reasons.push(t('eligibility.reason.citizen'));
      if (!state.age) reasons.push(t('eligibility.reason.age'));
      if (!state.resident) reasons.push(t('eligibility.reason.resident'));
      if (state.jail) reasons.push(t('eligibility.reason.jail'));

      state.result = { eligible, reasons };
      trackEvent('eligibility_check', { eligible });
      render();

      // Scroll result into view
      setTimeout(() => {
        const resultEl = container.querySelector('.eligibility-result');
        if (resultEl) resultEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    });
  };

  function question(name, label, currentValue) {
    return `
      <fieldset class="eligibility-q">
        <legend>${label}</legend>
        <label class="eligibility-radio">
          <input type="radio" name="${name}" value="yes" ${currentValue === true ? 'checked' : ''} required />
          <span>${t('eligibility.yes')}</span>
        </label>
        <label class="eligibility-radio">
          <input type="radio" name="${name}" value="no" ${currentValue === false ? 'checked' : ''} required />
          <span>${t('eligibility.no')}</span>
        </label>
      </fieldset>
    `;
  }

  function renderResult({ eligible, reasons }) {
    if (eligible) {
      return `
        <div class="glass-card eligibility-result eligible animate-scale-in" role="status" aria-live="polite">
          <div style="font-size:3rem;margin-bottom:var(--space-2);">✅</div>
          <h3>${t('eligibility.result.eligible')}</h3>
          <p>${t('eligibility.result.eligible.body')}</p>
          <div class="eligibility-actions">
            <a href="https://voters.eci.gov.in/" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
              📝 ${t('eligibility.cta.register')}
            </a>
            <a href="https://electoralsearch.eci.gov.in/" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
              🔍 ${t('eligibility.cta.check')}
            </a>
          </div>
        </div>
      `;
    }
    return `
      <div class="glass-card eligibility-result ineligible animate-scale-in" role="status" aria-live="polite">
        <div style="font-size:3rem;margin-bottom:var(--space-2);">ℹ️</div>
        <h3>${t('eligibility.result.ineligible')}</h3>
        <p>${t('eligibility.result.ineligible.body')}</p>
        <ul style="text-align:left;margin:var(--space-4) auto;max-width:480px;">
          ${reasons.map(r => `<li>${r}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  render();
  return { rerender: render };
}

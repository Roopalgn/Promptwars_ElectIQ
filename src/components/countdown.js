/**
 * Election Day Countdown widget — visual reminder of the next major election event.
 * Pulls from the timeline data set; if no future events remain, encourages registration.
 * @module components/countdown
 */

import { timelineEvents } from '../data/timeline-events.js';
import { localize, t } from '../utils/i18n.js';

/**
 * Find the next upcoming event from the timeline.
 * @returns {{event: Object, daysLeft: number}|null}
 */
function getNextEvent() {
  const now = Date.now();
  const upcoming = timelineEvents
    .map(e => ({ event: e, ts: new Date(e.startDate).getTime() }))
    .filter(x => x.ts > now)
    .sort((a, b) => a.ts - b.ts)[0];
  if (!upcoming) return null;
  return {
    event: upcoming.event,
    daysLeft: Math.ceil((upcoming.ts - now) / (1000 * 60 * 60 * 24))
  };
}

/**
 * Render the countdown banner into a container.
 * @param {HTMLElement} container
 */
export function renderCountdown(container) {
  const render = () => {
    const next = getNextEvent();

    if (!next) {
      container.innerHTML = `
        <div class="countdown-banner glass-card" role="status">
          <span class="countdown-icon" aria-hidden="true">🗳️</span>
          <div class="countdown-text">
            <strong>${t('countdown.noEvent.title')}</strong>
            <span>${t('countdown.noEvent.subtitle')}</span>
          </div>
          <a href="https://voters.eci.gov.in/" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
            ${t('countdown.cta.register')}
          </a>
        </div>
      `;
      return;
    }

    const { event, daysLeft } = next;
    container.innerHTML = `
      <div class="countdown-banner glass-card" role="status" aria-live="polite">
        <span class="countdown-icon animate-float" aria-hidden="true">⏳</span>
        <div class="countdown-text">
          <strong>${localize(event.label)}</strong>
          <span>${t('countdown.in')} <span class="countdown-days">${daysLeft}</span> ${daysLeft === 1 ? t('countdown.day') : t('countdown.days')}</span>
        </div>
        <span class="badge badge-primary">${new Date(event.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
      </div>
    `;
  };

  render();
  // Refresh once per hour so the day count stays accurate during long sessions
  const interval = setInterval(render, 60 * 60 * 1000);

  return {
    rerender: render,
    destroy: () => clearInterval(interval)
  };
}

/**
 * Interactive EVM (Electronic Voting Machine) Simulator
 * Lets users experience the voting flow used at real Indian polling booths,
 * including VVPAT slip preview and security disclosures.
 * @module components/evm-simulator
 */

import { t } from '../utils/i18n.js';
import { trackEvent } from '../utils/analytics.js';

const CANDIDATES = [
  { id: 1, name: 'Asha Verma',     party: 'Independent',           symbol: '🌱', color: '#16A34A' },
  { id: 2, name: 'Ravi Kumar',     party: 'National Progress',     symbol: '🚲', color: '#3B82F6' },
  { id: 3, name: 'Priya Sharma',   party: 'Bharat Vikas Party',    symbol: '🌻', color: '#F59E0B' },
  { id: 4, name: 'Mohammed Khan',  party: "People's Alliance",     symbol: '🏠', color: '#EC4899' },
  { id: 5, name: 'Lakshmi Iyer',   party: 'Common Good Party',     symbol: '📚', color: '#8B5CF6' },
  { id: 6, name: 'NOTA',           party: 'None of the Above',     symbol: '🚫', color: '#6B6B82' }
];

/**
 * Render the EVM simulator section.
 * @param {HTMLElement} container
 */
export function renderEvmSimulator(container) {
  const state = { stage: 'intro', selected: null, slipShown: false, slipDropped: false, vvpatTimer: null };

  const render = () => {
    container.innerHTML = `
      <div class="section-header reveal">
        <h2 id="evm-title">${t('evm.title')}</h2>
        <p>${t('evm.subtitle')}</p>
      </div>

      <div class="evm-wrap reveal">
        ${renderStage(state)}
      </div>
    `;
    attach();
  };

  function renderStage(s) {
    if (s.stage === 'intro') return renderIntro();
    if (s.stage === 'voting') return renderVoting(s);
    if (s.stage === 'vvpat') return renderVvpat(s);
    if (s.stage === 'done') return renderDone(s);
    return '';
  }

  function renderIntro() {
    return `
      <div class="glass-card evm-intro">
        <div class="evm-icon-large" aria-hidden="true">🗳️</div>
        <h3>${t('evm.intro.title')}</h3>
        <p>${t('evm.intro.body')}</p>
        <ul class="evm-rules">
          <li>${t('evm.rule.1')}</li>
          <li>${t('evm.rule.2')}</li>
          <li>${t('evm.rule.3')}</li>
          <li>${t('evm.rule.4')}</li>
        </ul>
        <button class="btn btn-primary" id="evm-start-btn">▶ ${t('evm.start')}</button>
      </div>
    `;
  }

  function renderVoting(s) {
    return `
      <div class="evm-machine glass-card">
        <div class="evm-display" role="status" aria-live="polite">
          <span class="evm-display-led" aria-hidden="true"></span>
          <span class="evm-display-text">${s.selected ? t('evm.display.recorded') : t('evm.display.ready')}</span>
        </div>

        <div class="evm-instruction">${t('evm.instruction')}</div>

        <div class="evm-ballot" role="list" aria-label="Ballot Unit">
          ${CANDIDATES.map((c, i) => `
            <button class="evm-row ${s.selected?.id === c.id ? 'pressed' : ''}"
                    data-id="${c.id}"
                    role="listitem"
                    ${s.selected ? 'disabled' : ''}
                    aria-label="Vote for ${c.name} of ${c.party}, symbol ${c.symbol}">
              <span class="evm-row-num">${i + 1}</span>
              <span class="evm-row-info">
                <span class="evm-row-name">${c.name}</span>
                <span class="evm-row-party" style="color:${c.color};">${c.party}</span>
              </span>
              <span class="evm-row-symbol" aria-hidden="true">${c.symbol}</span>
              <span class="evm-row-button" aria-hidden="true">
                <span class="evm-row-led ${s.selected?.id === c.id ? 'on' : ''}"></span>
                <span class="evm-row-key">●</span>
              </span>
            </button>
          `).join('')}
        </div>

        <div class="evm-footer">
          <span class="evm-brand">BHARAT NIRVACHAN AAYOG</span>
          <span class="evm-brand-en">Election Commission of India</span>
        </div>
      </div>
    `;
  }

  function renderVvpat(s) {
    return `
      <div class="vvpat-stage glass-card">
        <h3>${t('evm.vvpat.title')}</h3>
        <p class="vvpat-caption">${t('evm.vvpat.caption')}</p>

        <div class="vvpat-window" aria-live="polite">
          <div class="vvpat-slip animate-slip-in">
            <div class="vvpat-slip-header">VVPAT</div>
            <div class="vvpat-slip-row">
              <span class="vvpat-slip-num">${s.selected.id}</span>
              <span class="vvpat-slip-name">${s.selected.name}</span>
              <span class="vvpat-slip-symbol">${s.selected.symbol}</span>
            </div>
            <div class="vvpat-slip-meta">SLIP NO. ${Math.floor(Math.random() * 90000 + 10000)}</div>
          </div>
        </div>

        <div class="vvpat-countdown" id="vvpat-countdown" aria-live="polite">
          ${t('evm.vvpat.visibleFor')} <strong id="vvpat-seconds">7</strong>s
        </div>

        <p class="vvpat-disclaimer">${t('evm.vvpat.disclaimer')}</p>
      </div>
    `;
  }

  function renderDone(s) {
    return `
      <div class="glass-card evm-done animate-scale-in">
        <div class="evm-icon-large" aria-hidden="true">🎉</div>
        <h3>${t('evm.done.title')}</h3>
        <p>${t('evm.done.body').replace('{name}', s.selected.name)}</p>
        <ul class="evm-recap">
          <li>✅ ${t('evm.recap.1')}</li>
          <li>✅ ${t('evm.recap.2')}</li>
          <li>✅ ${t('evm.recap.3')}</li>
        </ul>
        <div class="evm-actions">
          <button class="btn btn-primary" id="evm-restart-btn">🔄 ${t('evm.restart')}</button>
          <a href="#eligibility" class="btn btn-secondary">${t('evm.checkEligibility')}</a>
        </div>
      </div>
    `;
  }

  function attach() {
    const startBtn = container.querySelector('#evm-start-btn');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        state.stage = 'voting';
        trackEvent('evm_simulator_start');
        render();
      });
    }

    container.querySelectorAll('.evm-row:not([disabled])').forEach(row => {
      row.addEventListener('click', () => {
        const id = parseInt(row.dataset.id, 10);
        const cand = CANDIDATES.find(c => c.id === id);
        state.selected = cand;
        // Brief beep visual on the LED — re-render after 700ms to show VVPAT
        render();
        setTimeout(() => { state.stage = 'vvpat'; render(); startVvpatCountdown(); }, 900);
        trackEvent('evm_vote_cast', { nota: cand.name === 'NOTA' });
      });
    });

    const restartBtn = container.querySelector('#evm-restart-btn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        if (state.vvpatTimer) clearInterval(state.vvpatTimer);
        state.stage = 'intro';
        state.selected = null;
        state.slipShown = false;
        render();
      });
    }
  }

  function startVvpatCountdown() {
    let seconds = 7;
    const secEl = container.querySelector('#vvpat-seconds');
    if (state.vvpatTimer) clearInterval(state.vvpatTimer);
    state.vvpatTimer = setInterval(() => {
      seconds -= 1;
      if (secEl) secEl.textContent = String(seconds);
      if (seconds <= 0) {
        clearInterval(state.vvpatTimer);
        state.vvpatTimer = null;
        state.stage = 'done';
        render();
      }
    }, 1000);
  }

  render();
  return {
    rerender: render,
    destroy: () => { if (state.vvpatTimer) clearInterval(state.vvpatTimer); }
  };
}

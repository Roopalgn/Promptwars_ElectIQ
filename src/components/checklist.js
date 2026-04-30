/**
 * Polling Day Checklist component
 * Allows users to tick off what they need to bring to the polling booth
 * @module components/checklist
 */

import { t } from '../utils/i18n.js';
import { trackEvent } from '../utils/analytics.js';
import { getPersistent, setPersistent } from '../utils/cache.js';

const STORAGE_KEY = 'voter_checklist';

export function renderChecklist(container) {
  let state = getPersistent(STORAGE_KEY) || [false, false, false, false];

  const render = () => {
    const isCompleted = state.every(Boolean);
    
    container.innerHTML = `
      <div class="section-header reveal">
        <h2 id="checklist-title">${t('checklist.title')}</h2>
        <p>${t('checklist.subtitle')}</p>
      </div>

      <div class="reveal checklist-wrap" style="max-width: 600px; margin: 0 auto;">
        <div class="glass-card checklist-card" style="padding: var(--space-6);">
          <ul class="checklist-items" style="list-style: none; padding: 0;">
            ${[1, 2, 3, 4].map((i, index) => `
              <li style="margin-bottom: var(--space-4); display: flex; align-items: flex-start; gap: var(--space-3);">
                <label style="display: flex; align-items: center; cursor: pointer; font-size: var(--text-lg); width: 100%;">
                  <input type="checkbox" class="checklist-checkbox" data-index="${index}" ${state[index] ? 'checked' : ''} 
                         style="width: 24px; height: 24px; margin-right: var(--space-3); accent-color: var(--color-primary); cursor: pointer;" />
                  <span style="${state[index] ? 'text-decoration: line-through; color: var(--text-muted);' : 'color: var(--text-primary);'} transition: all var(--transition-fast);">
                    ${t('checklist.item.' + i)}
                  </span>
                </label>
              </li>
            `).join('')}
          </ul>
          
          ${isCompleted ? `
            <div class="checklist-completed animate-scale-in" style="margin-top: var(--space-6); padding: var(--space-4); background: rgba(22,163,74,0.15); border: 1px solid rgba(22,163,74,0.3); border-radius: var(--radius-md); text-align: center; color: var(--color-accent-light); font-weight: bold; font-size: var(--text-lg);">
              🎉 ${t('checklist.completed')}
            </div>
          ` : ''}
        </div>
      </div>
    `;

    attach();
  };

  function attach() {
    container.querySelectorAll('.checklist-checkbox').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const index = parseInt(e.target.dataset.index, 10);
        state[index] = e.target.checked;
        setPersistent(STORAGE_KEY, state);
        
        if (state.every(Boolean)) {
          trackEvent('checklist_completed');
        }
        render();
      });
    });
  }

  render();
  return { rerender: render };
}

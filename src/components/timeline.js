/**
 * Custom CSS Timeline visualization
 * @module components/timeline
 */

import { timelineEvents, timelineCategories } from '../data/timeline-events.js';
import { t, localize } from '../utils/i18n.js';

/**
 * Render the Timeline section
 * @param {HTMLElement} container
 */
export function renderTimeline(container) {
  const render = () => {
    container.innerHTML = `
      <style>
        .custom-timeline {
          position: relative;
          max-width: 1000px;
          margin: var(--space-10) auto;
          padding: var(--space-4) 0;
        }
        .custom-timeline::after {
          content: '';
          position: absolute;
          width: 4px;
          background: linear-gradient(to bottom, var(--color-primary), var(--color-secondary));
          top: 0;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 4px;
          z-index: 0;
        }
        .timeline-node {
          padding: 10px 40px;
          position: relative;
          width: 50%;
          box-sizing: border-box;
          z-index: 1;
        }
        .timeline-node.left { left: 0; }
        .timeline-node.right { left: 50%; }
        
        .timeline-dot {
          position: absolute;
          width: 24px;
          height: 24px;
          right: -12px;
          background-color: var(--bg-surface);
          border: 4px solid var(--color-primary);
          top: 24px;
          border-radius: 50%;
          z-index: 2;
          box-shadow: var(--shadow-glow);
          transition: transform var(--transition-fast);
        }
        .timeline-node.right .timeline-dot {
          left: -12px;
        }
        
        .timeline-content {
          padding: var(--space-5);
          background: var(--bg-glass);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          position: relative;
          transition: all var(--transition-base);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .timeline-content:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }
        .timeline-node:hover .timeline-dot {
          transform: scale(1.3);
        }
        
        .timeline-date {
          font-family: var(--font-display);
          color: var(--color-primary-light);
          font-weight: 700;
          font-size: var(--text-sm);
          margin-bottom: var(--space-2);
          letter-spacing: 0.5px;
        }
        .timeline-event-title {
          font-size: var(--text-xl);
          font-weight: 700;
          margin-bottom: var(--space-2);
          color: var(--text-primary);
          padding-right: 80px; /* Space for the absolute badge */
        }
        .timeline-desc {
          color: var(--text-secondary);
          font-size: var(--text-sm);
          line-height: 1.6;
        }
        
        @media screen and (max-width: 768px) {
          .custom-timeline::after {
            left: 31px;
            transform: none;
          }
          .timeline-node {
            width: 100%;
            padding-left: 70px;
            padding-right: var(--space-4);
          }
          .timeline-node.left, .timeline-node.right {
            left: 0;
          }
          .timeline-node.left .timeline-dot, .timeline-node.right .timeline-dot {
            left: 19px;
          }
        }
      </style>

      <div class="section-header reveal">
        <h2 id="timeline-title">${t('timeline.title')}</h2>
        <p>${t('timeline.subtitle')}</p>
      </div>

      <div class="timeline-legend reveal" style="display:flex; justify-content:center; gap:var(--space-4); margin-bottom:var(--space-8); flex-wrap:wrap;">
        ${timelineCategories.map(cat => `
          <div class="timeline-legend-item" style="display:flex; align-items:center; gap:var(--space-2);">
            <span class="timeline-legend-dot" style="background:${cat.color}; width:12px; height:12px; border-radius:50%;" aria-hidden="true"></span>
            <span style="font-size:var(--text-sm); color:var(--text-secondary);">${localize(cat.label)}</span>
          </div>
        `).join('')}
      </div>

      <div class="custom-timeline">
        ${timelineEvents.map((e, i) => {
          const isLeft = i % 2 === 0;
          const cat = timelineCategories.find(c => c.id === e.category);
          const catLabel = cat ? localize(cat.label) : e.category;
          
          let dateStr = formatDate(e.startDate);
          if (e.endDate && e.startDate !== e.endDate) {
            dateStr += ` — ${formatDate(e.endDate)}`;
          }

          return `
          <div class="timeline-node ${isLeft ? 'left' : 'right'} reveal delay-${(i % 5) + 1}">
            <div class="timeline-dot" style="border-color: ${cat.color}; box-shadow: 0 0 15px ${cat.color}80;"></div>
            <div class="timeline-content" style="border-top: 4px solid ${cat.color}">
              <span class="badge" style="background:${cat.color}22; color:${cat.color}; border:1px solid ${cat.color}55; position:absolute; top:var(--space-4); right:var(--space-4);">${catLabel}</span>
              <div class="timeline-date" style="color: ${cat.color};">${dateStr}</div>
              <div class="timeline-event-title">${localize(e.label)}</div>
              <div class="timeline-desc">${localize(e.description)}</div>
            </div>
          </div>
          `;
        }).join('')}
      </div>
    `;
  };

  render();
  return { rerender: render };
}

/**
 * Format date string to readable format
 * @param {string} dateStr - ISO date string
 * @returns {string}
 */
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
}

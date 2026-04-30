/**
 * Google Charts Timeline visualization
 * @module components/timeline
 */

import { timelineEvents, timelineCategories } from '../data/timeline-events.js';
import { t, localize } from '../utils/i18n.js';

/**
 * Render the Timeline section with Google Charts
 * @param {HTMLElement} container
 */
export function renderTimeline(container) {
  const render = () => {
    container.innerHTML = `
      <div class="section-header reveal">
        <h2 id="timeline-title">${t('timeline.title')}</h2>
        <p>${t('timeline.subtitle')}</p>
      </div>

      <div class="timeline-chart-wrap reveal">
        <div id="timeline-chart" role="img" aria-label="Interactive timeline of the 2024 Indian General Election showing all phases from announcement to results">
          <p style="text-align:center;padding:2rem;color:var(--text-muted);">Loading timeline...</p>
        </div>
      </div>

      <div class="timeline-legend reveal">
        ${timelineCategories.map(cat => `
          <div class="timeline-legend-item">
            <span class="timeline-legend-dot" style="background:${cat.color}" aria-hidden="true"></span>
            <span>${localize(cat.label)}</span>
          </div>
        `).join('')}
      </div>

      <div class="timeline-details reveal" style="margin-top:var(--space-6);">
        <div class="glass-card" style="padding:var(--space-6);">
          <h3 style="margin-bottom:var(--space-4);font-size:var(--text-xl);">📅 Phase Details</h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:var(--space-4);">
            ${timelineEvents.map(e => {
              const cat = timelineCategories.find(c => c.id === e.category);
              const catLabel = cat ? localize(cat.label) : e.category;
              return `
              <div style="padding:var(--space-3);border-left:3px solid ${e.color};background:var(--bg-glass);border-radius:0 var(--radius-sm) var(--radius-sm) 0;">
                <span class="badge badge-info" style="background:${e.color}22;color:${e.color};border-color:${e.color}55;margin-bottom:var(--space-2);">${catLabel}</span>
                <div style="font-weight:700;color:var(--text-primary);font-size:var(--text-sm);margin-top:var(--space-1);">${localize(e.label)}</div>
                <div style="font-size:var(--text-xs);color:var(--text-muted);margin-top:2px;">${formatDate(e.startDate)}</div>
                <div style="font-size:var(--text-xs);color:var(--text-secondary);margin-top:4px;">${localize(e.description)}</div>
              </div>
            `; }).join('')}
          </div>
        </div>
      </div>
    `;

    // Load Google Charts
    loadChart();
  };

  render();
  return { rerender: render };
}

/** Initialize and draw the Google Charts timeline */
function loadChart() {
  const chartEl = document.getElementById('timeline-chart');
  if (!chartEl) return;

  const initCharts = () => {
    try {
      google.charts.load('current', { packages: ['timeline'] });
      google.charts.setOnLoadCallback(() => {
        if (google.visualization && google.visualization.Timeline) {
          drawTimeline();
        } else {
          chartEl.innerHTML = '<p style="text-align:center;padding:2rem;color:var(--text-muted);">Failed to initialize timeline visualization.</p>';
        }
      });
    } catch (e) {
      chartEl.innerHTML = '<p style="text-align:center;padding:2rem;color:var(--text-muted);">Error loading Google Charts.</p>';
    }
  };

  // If already loaded
  if (typeof google !== 'undefined' && google.charts) {
    initCharts();
    return;
  }

  // Otherwise, load script dynamically
  const script = document.createElement('script');
  script.src = 'https://www.gstatic.com/charts/loader.js';
  script.onload = initCharts;
  script.onerror = () => {
    chartEl.innerHTML = '<p style="text-align:center;padding:2rem;color:var(--text-muted);">Timeline requires Google Charts (check internet connection).</p>';
  };
  document.head.appendChild(script);
}

/** Draw the timeline chart */
function drawTimeline() {
  const chartEl = document.getElementById('timeline-chart');
  if (!chartEl) { return; }

  const chart = new google.visualization.Timeline(chartEl);
  const dataTable = new google.visualization.DataTable();

  dataTable.addColumn({ type: 'string', id: 'Category' });
  dataTable.addColumn({ type: 'string', id: 'Label' });
  dataTable.addColumn({ type: 'string', role: 'tooltip' });
  dataTable.addColumn({ type: 'date', id: 'Start' });
  dataTable.addColumn({ type: 'date', id: 'End' });

  timelineEvents.forEach(event => {
    const cat = timelineCategories.find(c => c.id === event.category);
    const catLabel = cat ? localize(cat.label) : event.category;
    const label = localize(event.label);
    const desc = localize(event.description);
    const start = new Date(event.startDate);
    // For single-day events, show at least 1 day span
    let end = new Date(event.endDate);
    if (start.getTime() === end.getTime()) {
      end = new Date(start.getTime() + 86400000);
    }
    const tooltip = `${label}\n${formatDate(event.startDate)}\n${desc}`;
    dataTable.addRow([catLabel, label, tooltip, start, end]);
  });

  const options = {
    timeline: {
      groupByRowLabel: true,
      showRowLabels: true,
      rowLabelStyle: { fontName: 'Inter', fontSize: 13, color: '#A0A0B8' },
      barLabelStyle: { fontName: 'Inter', fontSize: 11 }
    },
    backgroundColor: 'transparent',
    colors: timelineEvents.map(e => e.color),
    avoidOverlappingGridLines: true,
    height: 400
  };

  chart.draw(dataTable, options);

  // Resize handler
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => chart.draw(dataTable, options), 250);
  });
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

/**
 * Google Maps Embed for polling booth discovery
 * @module components/maps
 */

import { t } from '../utils/i18n.js';

/**
 * Build a Google Maps embed URL.
 * If a Maps API key is configured, use the official Embed API (better UX).
 * Otherwise, fall back to the keyless `?output=embed` URL which works
 * everywhere without authentication.
 * @returns {string}
 */
function buildMapsEmbedUrl() {
  let key = '';
  try { key = import.meta.env.VITE_MAPS_KEY || ''; } catch { /* env unavailable */ }
  if (key && key !== 'your_maps_api_key_here') {
    return `https://www.google.com/maps/embed/v1/search?q=Election+Commission+offices+India&key=${encodeURIComponent(key)}`;
  }
  // Keyless fallback — no API key required, works in all environments
  return 'https://maps.google.com/maps?q=Election+Commission+of+India,+Nirvachan+Sadan,+New+Delhi&z=5&output=embed';
}

/**
 * Render the Maps section
 * @param {HTMLElement} container
 */
export function renderMaps(container) {
  const render = () => {
    container.innerHTML = `
      <div class="section-header reveal">
        <h2 id="maps-title">${t('maps.title')}</h2>
        <p>${t('maps.subtitle')}</p>
      </div>

      <div class="reveal">
        <div class="glass-card" style="padding:var(--space-6);margin-bottom:var(--space-6);">
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:var(--space-4);">
            <a href="https://electoralsearch.eci.gov.in/" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="text-align:center;">
              🔍 Search Your Name on Electoral Roll
            </a>
            <a href="https://voters.eci.gov.in/" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="text-align:center;">
              📝 Register to Vote (NVSP)
            </a>
            <a href="https://www.eci.gov.in/" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="text-align:center;">
              🏛️ Election Commission of India
            </a>
          </div>
        </div>

        <div class="maps-container">
          <iframe
            class="maps-iframe"
            src="https://maps.google.com/maps?q=Nirvachan+Sadan+Election+Commission+of+India+New+Delhi&output=embed&z=5"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Map showing Election Commission of India headquarters, New Delhi"
            aria-label="Interactive Google Map centered on India showing ECI office locations">
          </iframe>
        </div>

        <div class="glass-card" style="padding:var(--space-4);margin-top:var(--space-4);">
          <p style="font-size:var(--text-sm);color:var(--text-muted);text-align:center;margin:0 auto;">
            🗺️ <a href="https://maps.google.com/maps?q=Election+Commission+office+near+me" target="_blank" rel="noopener noreferrer">Find your nearest Election Commission office on Google Maps →</a>
          </p>
        </div>

        <div class="glass-card" style="padding:var(--space-5);margin-top:var(--space-6);">
          <h4 style="margin-bottom:var(--space-3);">📞 Important Contacts</h4>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:var(--space-4);">
            <div>
              <p style="font-weight:600;color:var(--text-primary);font-size:var(--text-sm);">Voter Helpline</p>
              <p style="color:var(--color-primary-light);font-size:var(--text-lg);font-weight:700;">1950</p>
            </div>
            <div>
              <p style="font-weight:600;color:var(--text-primary);font-size:var(--text-sm);">National Grievance Portal</p>
              <p style="font-size:var(--text-sm);"><a href="https://ngsp.in/" target="_blank" rel="noopener noreferrer">ngsp.in</a></p>
            </div>
            <div>
              <p style="font-weight:600;color:var(--text-primary);font-size:var(--text-sm);">cVIGIL App</p>
              <p style="font-size:var(--text-sm);color:var(--text-secondary);">Report election violations via photo/video</p>
            </div>
            <div>
              <p style="font-weight:600;color:var(--text-primary);font-size:var(--text-sm);">Voter Helpline App</p>
              <p style="font-size:var(--text-sm);color:var(--text-secondary);">Check voter details on mobile</p>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  render();
  return { rerender: render };
}

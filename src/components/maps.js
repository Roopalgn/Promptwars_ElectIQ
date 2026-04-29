/**
 * Google Maps Embed for polling booth discovery
 * @module components/maps
 */

import { t } from '../utils/i18n.js';

/**
 * Get Maps API key from environment variable
 * @returns {string}
 */
function getMapsApiKey() {
  try {
    return import.meta.env.VITE_MAPS_KEY || '';
  } catch {
    return '';
  }
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
            <a href="https://electoralsearch.in/" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="text-align:center;">
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
            src="https://www.google.com/maps/embed/v1/search?q=Election+Commission+offices+India&key=${getMapsApiKey()}"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Map showing Election Commission offices across India"
            aria-label="Interactive Google Map showing Election Commission offices in India">
          </iframe>
          <noscript>
            <div class="maps-fallback">
              <p>Map requires JavaScript. Visit <a href="https://www.eci.gov.in/contact-us" target="_blank" rel="noopener noreferrer">ECI Contact Us</a> to find your nearest office.</p>
            </div>
          </noscript>
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

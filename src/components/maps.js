/**
 * Google Maps Embed for polling booth discovery
 * @module components/maps
 */

import { t } from '../utils/i18n.js';
import { sanitizeInput } from '../utils/sanitizer.js';
import { trackEvent } from '../utils/analytics.js';

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

        <!-- Booth Finder: deep-link to electoralsearch.eci.gov.in with prefilled query -->
        <form class="glass-card booth-finder" id="booth-finder" novalidate>
          <h3 class="booth-finder-title">📍 ${t('booth.title')}</h3>
          <p class="booth-finder-subtitle">${t('booth.subtitle')}</p>

          <div class="booth-finder-tabs" role="tablist">
            <button type="button" role="tab" id="booth-tab-epic" class="booth-tab active" data-tab="epic" aria-selected="true">${t('booth.byEpic')}</button>
            <button type="button" role="tab" id="booth-tab-details" class="booth-tab" data-tab="details" aria-selected="false">${t('booth.byDetails')}</button>
          </div>

          <div class="booth-tab-panel" id="booth-panel-epic" role="tabpanel" aria-labelledby="booth-tab-epic">
            <label for="booth-epic">${t('booth.epicLabel')}</label>
            <input type="text" id="booth-epic" name="epic" maxlength="20"
                   pattern="[A-Za-z0-9]{6,20}"
                   placeholder="ABC1234567"
                   autocomplete="off"
                   inputmode="latin"
                   aria-describedby="booth-epic-hint" />
            <small id="booth-epic-hint" class="booth-hint">${t('booth.epicHint')}</small>
          </div>

          <div class="booth-tab-panel" id="booth-panel-details" role="tabpanel" aria-labelledby="booth-tab-details" hidden>
            <div class="booth-grid">
              <div>
                <label for="booth-state">${t('booth.state')}</label>
                <input type="text" id="booth-state" name="state" maxlength="40" autocomplete="address-level1" />
              </div>
              <div>
                <label for="booth-district">${t('booth.district')}</label>
                <input type="text" id="booth-district" name="district" maxlength="40" autocomplete="address-level2" />
              </div>
              <div>
                <label for="booth-pincode">${t('booth.pincode')}</label>
                <input type="text" id="booth-pincode" name="pincode" maxlength="6"
                       pattern="[0-9]{6}" inputmode="numeric" autocomplete="postal-code" />
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-primary booth-submit">
            🔎 ${t('booth.find')}
          </button>
          <p class="booth-finder-note">${t('booth.note')}</p>
        </form>

        <div class="glass-card" style="padding:var(--space-6); margin-top:var(--space-8);">
          <h3 style="margin-bottom:var(--space-2); text-align:center;">📍 All-India Polling Stations</h3>
          <p style="color:var(--text-secondary); text-align:center; margin-bottom:var(--space-6); font-size:var(--text-sm);">
            Overview of Election Commission offices and major polling hubs across India.
          </p>
          <div class="maps-container" style="background:var(--bg-elevated); border-radius:var(--radius-md); overflow:hidden;">
            <noscript>
              <div style="padding: var(--space-4); text-align: center;">
                <p>Interactive map requires JavaScript. <a href="https://maps.google.com/maps?q=Election+Commission+offices+India" target="_blank" rel="noopener noreferrer">View on Google Maps</a></p>
              </div>
            </noscript>
            <iframe
              class="maps-iframe"
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d14500000!2d75.0!3d22.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sElection+Commission+offices+India!5e0!3m2!1sen!2sin"
              width="100%"
              height="500"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Map showing Election Commission offices across India"
              aria-label="Interactive Google Map showing ECI office locations across India">
            </iframe>
          </div>
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
    attachBoothFinder(container);
  };

  render();
  return { rerender: render };
}

/** Attach interactivity to the booth finder form. */
function attachBoothFinder(container) {
  const form = container.querySelector('#booth-finder');
  if (!form) return;

  // Tab switching
  const tabs = form.querySelectorAll('.booth-tab');
  const panels = {
    epic: form.querySelector('#booth-panel-epic'),
    details: form.querySelector('#booth-panel-details')
  };
  let active = 'epic';
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      active = tab.dataset.tab;
      tabs.forEach(t => {
        const isActive = t === tab;
        t.classList.toggle('active', isActive);
        t.setAttribute('aria-selected', String(isActive));
      });
      Object.entries(panels).forEach(([name, panel]) => {
        if (panel) panel.hidden = name !== active;
      });
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let resultContainer = form.querySelector('#mock-booth-result');
    if (!resultContainer) {
      resultContainer = document.createElement('div');
      resultContainer.id = 'mock-booth-result';
      resultContainer.style.marginTop = 'var(--space-6)';
      resultContainer.style.padding = 'var(--space-4)';
      resultContainer.style.background = 'rgba(22, 163, 74, 0.1)';
      resultContainer.style.border = '1px solid var(--color-accent)';
      resultContainer.style.borderRadius = 'var(--radius-md)';
      resultContainer.style.animation = 'fadeIn 0.3s ease';
      form.appendChild(resultContainer);
    }

    if (active === 'epic') {
      const raw = form.elements.epic.value || '';
      const epic = sanitizeInput(raw).replace(/[^A-Za-z0-9]/g, '').toUpperCase();
      if (epic.length < 6) {
        flashHint(form.querySelector('#booth-epic'));
        return;
      }
      trackEvent('booth_finder_search', { mode: 'epic' });
      
      resultContainer.innerHTML = `
        <h4 style="color: var(--color-accent-light); margin-bottom: var(--space-2);">✅ Polling Booth Found</h4>
        <p style="margin-bottom: var(--space-1);"><strong>EPIC No:</strong> ${epic}</p>
        <p style="margin-bottom: var(--space-1);"><strong>Polling Station:</strong> Govt. Primary School, Room No. 2</p>
        <p style="margin-bottom: var(--space-1);"><strong>Part Serial No:</strong> 421</p>
        <p style="font-size: var(--text-sm); color: var(--text-muted); margin-top: var(--space-3); border-top: 1px solid var(--border-subtle); padding-top: var(--space-2);">* Note: This is a simulated result for demonstration. Due to ECI security policies, real-time fetching requires official API access.</p>
        <a href="https://electoralsearch.eci.gov.in/" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="margin-top: var(--space-3); display: inline-block;">Verify on Official ECI Portal →</a>
      `;
    } else {
      const state = sanitizeInput(form.elements.state.value || '').slice(0, 40);
      const district = sanitizeInput(form.elements.district.value || '').slice(0, 40);
      const pincode = sanitizeInput(form.elements.pincode.value || '').replace(/\D/g, '').slice(0, 6);
      
      if (!state && !district && !pincode) {
        flashHint(form.querySelector('#booth-state'));
        return;
      }
      trackEvent('booth_finder_search', { mode: 'details' });
      
      resultContainer.innerHTML = `
        <h4 style="color: var(--color-accent-light); margin-bottom: var(--space-2);">✅ Polling Booth Found</h4>
        <p style="margin-bottom: var(--space-1);"><strong>Location:</strong> ${district ? district + ', ' : ''}${state}</p>
        <p style="margin-bottom: var(--space-1);"><strong>Polling Station:</strong> Community Hall, Near Main Square${pincode ? ' - ' + pincode : ''}</p>
        <p style="margin-bottom: var(--space-1);"><strong>Assembly Constituency:</strong> Central ${district || 'District'}</p>
        <p style="font-size: var(--text-sm); color: var(--text-muted); margin-top: var(--space-3); border-top: 1px solid var(--border-subtle); padding-top: var(--space-2);">* Note: This is a simulated result for demonstration. Due to ECI security policies, real-time fetching requires official API access.</p>
        <a href="https://electoralsearch.eci.gov.in/" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="margin-top: var(--space-3); display: inline-block;">Verify on Official ECI Portal →</a>
      `;
    }
  });
}

function flashHint(el) {
  if (!el) return;
  el.focus();
  el.classList.add('booth-flash');
  setTimeout(() => el.classList.remove('booth-flash'), 800);
}



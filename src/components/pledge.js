/**
 * Voter Pledge — collects user's commitment to vote and generates
 * a shareable, downloadable certificate as an SVG/PNG.
 * @module components/pledge
 */

import { t } from '../utils/i18n.js';
import { sanitizeInput } from '../utils/sanitizer.js';
import { trackEvent } from '../utils/analytics.js';
import { getPersistent, setPersistent } from '../utils/cache.js';

const STORAGE_KEY = 'voter_pledge';

export function renderPledge(container) {
  const saved = getPersistent(STORAGE_KEY);

  const render = () => {
    const data = getPersistent(STORAGE_KEY);
    container.innerHTML = `
      <div class="section-header reveal">
        <h2 id="pledge-title">${t('pledge.title')}</h2>
        <p>${t('pledge.subtitle')}</p>
      </div>

      ${data ? renderCertificate(data) : renderForm()}
    `;
    attach();
  };

  function renderForm() {
    return `
      <form class="glass-card pledge-form reveal" id="pledge-form" novalidate>
        <p class="pledge-intro">${t('pledge.intro')}</p>

        <ul class="pledge-statements">
          <li>${t('pledge.statement.1')}</li>
          <li>${t('pledge.statement.2')}</li>
          <li>${t('pledge.statement.3')}</li>
          <li>${t('pledge.statement.4')}</li>
        </ul>

        <div class="form-group">
          <label for="pledge-name">${t('pledge.name')}</label>
          <input type="text" id="pledge-name" name="name" required maxlength="60" autocomplete="name" />
        </div>

        <div class="form-group">
          <label for="pledge-state">${t('pledge.state')}</label>
          <select id="pledge-state" name="state" required>
            <option value="">— ${t('pledge.selectState')} —</option>
            ${INDIAN_STATES.map(s => `<option value="${s}">${s}</option>`).join('')}
          </select>
        </div>

        <button type="submit" class="btn btn-primary">${t('pledge.submit')}</button>
      </form>
    `;
  }

  function renderCertificate(data) {
    const dateStr = new Date(data.timestamp).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
    const certId = data.certId || 'EI-XXXXXX';
    return `
      <div class="pledge-certificate-wrap reveal">
        <div class="pledge-certificate" id="pledge-certificate">
          <div class="pledge-cert-border">
            <div class="pledge-cert-header">
              <span class="pledge-cert-emblem" aria-hidden="true">🇮🇳</span>
              <div>
                <div class="pledge-cert-eyebrow">ElectIQ • Voter Pledge</div>
                <h3 class="pledge-cert-title">Certificate of Commitment</h3>
              </div>
            </div>

            <p class="pledge-cert-body">${t('pledge.cert.thisCertifies')}</p>
            <h2 class="pledge-cert-name">${escapeForCert(data.name)}</h2>
            <p class="pledge-cert-state">${t('pledge.cert.fromState')} <strong>${escapeForCert(data.state)}</strong></p>

            <p class="pledge-cert-pledge">
              "${t('pledge.cert.quote')}"
            </p>

            <div class="pledge-cert-footer">
              <div>
                <div class="pledge-cert-label">${t('pledge.cert.date')}</div>
                <div class="pledge-cert-value">${dateStr}</div>
              </div>
              <div class="pledge-cert-stamp" aria-hidden="true">
                <div class="pledge-cert-stamp-inner">VOTE<br>2024</div>
              </div>
              <div>
                <div class="pledge-cert-label">${t('pledge.cert.id')}</div>
                <div class="pledge-cert-value">${certId}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="pledge-actions">
          <button class="btn btn-primary" id="pledge-download-btn">⬇ ${t('pledge.download')}</button>
          <button class="btn btn-secondary" id="pledge-share-btn">📤 ${t('pledge.share')}</button>
          <button class="btn btn-ghost" id="pledge-reset-btn">${t('pledge.retake')}</button>
        </div>
      </div>
    `;
  }

  function attach() {
    const form = container.querySelector('#pledge-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = sanitizeInput((form.elements.name.value || '').trim()).slice(0, 60);
        const state = sanitizeInput((form.elements.state.value || '').trim());
        if (!name || !state) return;
        const data = {
          name, state,
          timestamp: Date.now(),
          certId: 'EI-' + Math.random().toString(36).slice(2, 8).toUpperCase()
        };
        setPersistent(STORAGE_KEY, data);
        trackEvent('voter_pledge_taken', { state });
        render();
        // Smooth-scroll to certificate
        setTimeout(() => {
          const cert = container.querySelector('#pledge-certificate');
          if (cert) cert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 80);
      });
    }

    const downloadBtn = container.querySelector('#pledge-download-btn');
    if (downloadBtn) downloadBtn.addEventListener('click', downloadCertificate);

    const shareBtn = container.querySelector('#pledge-share-btn');
    if (shareBtn) shareBtn.addEventListener('click', sharePledge);

    const resetBtn = container.querySelector('#pledge-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm(t('pledge.confirmReset'))) {
          setPersistent(STORAGE_KEY, null);
          render();
        }
      });
    }
  }

  async function downloadCertificate() {
    const data = getPersistent(STORAGE_KEY);
    if (!data) return;
    const svg = buildCertificateSVG(data);
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `voter-pledge-${data.certId || 'electiq'}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    trackEvent('pledge_downloaded');
  }

  async function sharePledge() {
    const data = getPersistent(STORAGE_KEY);
    if (!data) return;
    const text = `I've pledged to vote in the upcoming Indian elections via @ElectIQ! Join me — every vote counts. 🇮🇳 #BuildwithAI #PromptWarsVirtual`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Voter Pledge', text, url: window.location.href });
        trackEvent('pledge_shared', { method: 'native' });
        return;
      } catch { /* user cancelled */ }
    }
    try {
      await navigator.clipboard.writeText(text);
      const btn = container.querySelector('#pledge-share-btn');
      if (btn) {
        const orig = btn.textContent;
        btn.textContent = '✅ ' + t('quiz.copied');
        setTimeout(() => { btn.textContent = orig; }, 2000);
      }
      trackEvent('pledge_shared', { method: 'clipboard' });
    } catch { /* clipboard blocked */ }
  }

  render();
  return { rerender: render };
}

function escapeForCert(str) {
  return String(str).replace(/[<>&"']/g, c => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function buildCertificateSVG(data) {
  const dateStr = new Date(data.timestamp).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0F0F1A"/>
      <stop offset="100%" stop-color="#161625"/>
    </linearGradient>
    <linearGradient id="border" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#FF6B35"/>
      <stop offset="50%" stop-color="#1A56DB"/>
      <stop offset="100%" stop-color="#16A34A"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#bg)"/>
  <rect x="40" y="40" width="1120" height="720" fill="none" stroke="url(#border)" stroke-width="6" rx="20"/>
  <rect x="60" y="60" width="1080" height="680" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1" rx="14"/>

  <text x="600" y="140" text-anchor="middle" fill="#FF8F66" font-family="Arial, sans-serif" font-size="20" letter-spacing="6">ELECTIQ — VOTER PLEDGE</text>
  <text x="600" y="200" text-anchor="middle" fill="#F1F1F4" font-family="Georgia, serif" font-size="48" font-weight="bold">Certificate of Commitment</text>

  <text x="600" y="280" text-anchor="middle" fill="#A0A0B8" font-family="Arial, sans-serif" font-size="22">This certifies that</text>

  <text x="600" y="360" text-anchor="middle" fill="#FF6B35" font-family="Georgia, serif" font-size="56" font-weight="bold">${escapeForCert(data.name)}</text>

  <text x="600" y="410" text-anchor="middle" fill="#A0A0B8" font-family="Arial, sans-serif" font-size="22">from <tspan fill="#F1F1F4" font-weight="bold">${escapeForCert(data.state)}</tspan></text>

  <text x="600" y="490" text-anchor="middle" fill="#F1F1F4" font-family="Georgia, serif" font-size="22" font-style="italic">"I pledge to cast my vote in the upcoming elections,</text>
  <text x="600" y="525" text-anchor="middle" fill="#F1F1F4" font-family="Georgia, serif" font-size="22" font-style="italic">to be informed, non-partisan, and to encourage others</text>
  <text x="600" y="560" text-anchor="middle" fill="#F1F1F4" font-family="Georgia, serif" font-size="22" font-style="italic">to participate in our democracy."</text>

  <line x1="160" y1="660" x2="380" y2="660" stroke="#A0A0B8" stroke-width="1"/>
  <text x="270" y="690" text-anchor="middle" fill="#A0A0B8" font-family="Arial, sans-serif" font-size="14">DATE</text>
  <text x="270" y="715" text-anchor="middle" fill="#F1F1F4" font-family="Arial, sans-serif" font-size="18" font-weight="bold">${dateStr}</text>

  <circle cx="600" cy="680" r="50" fill="none" stroke="#FF6B35" stroke-width="3"/>
  <text x="600" y="675" text-anchor="middle" fill="#FF6B35" font-family="Arial, sans-serif" font-size="18" font-weight="bold">VOTE</text>
  <text x="600" y="700" text-anchor="middle" fill="#FF6B35" font-family="Arial, sans-serif" font-size="14">2024</text>

  <line x1="820" y1="660" x2="1040" y2="660" stroke="#A0A0B8" stroke-width="1"/>
  <text x="930" y="690" text-anchor="middle" fill="#A0A0B8" font-family="Arial, sans-serif" font-size="14">CERTIFICATE ID</text>
  <text x="930" y="715" text-anchor="middle" fill="#F1F1F4" font-family="monospace" font-size="18" font-weight="bold">${data.certId || 'EI-XXXXXX'}</text>
</svg>`;
}

const INDIAN_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana',
  'Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur',
  'Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana',
  'Tripura','Uttar Pradesh','Uttarakhand','West Bengal',
  'Andaman & Nicobar','Chandigarh','Dadra & Nagar Haveli and Daman & Diu','Delhi','Jammu & Kashmir',
  'Ladakh','Lakshadweep','Puducherry'
];

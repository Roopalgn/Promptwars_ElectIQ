/**
 * Analytics wrapper — Google Analytics 4 (gtag) event tracking
 * @module utils/analytics
 */

let initialized = false;

/**
 * Initialize Google Analytics 4 — loads gtag.js dynamically
 * Only loads if a valid measurement ID is configured
 */
export function initAnalytics() {
  try {
    const gaId = import.meta.env.VITE_GA_ID;
    if (!gaId || gaId === 'your_ga4_measurement_id_here' || initialized) {
      return;
    }

    // Load gtag.js script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', gaId, {
      send_page_view: true,
      cookie_flags: 'SameSite=None;Secure'
    });

    initialized = true;
  } catch {
    // Analytics init failed — silently ignore
  }
}

/**
 * Track a custom event via gtag (if loaded)
 * @param {string} eventName - Event name
 * @param {Object} [params] - Event parameters
 */
export function trackEvent(eventName, params = {}) {
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  } catch {
    // Analytics not loaded — silently ignore
  }
}

/**
 * Track a page/section view
 * @param {string} sectionName - Section name
 */
export function trackPageView(sectionName) {
  trackEvent('page_view', { page_title: sectionName, page_location: window.location.href });
}

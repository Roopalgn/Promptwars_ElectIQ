/**
 * Analytics wrapper — Google Analytics 4 (gtag) event tracking
 * @module utils/analytics
 */

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

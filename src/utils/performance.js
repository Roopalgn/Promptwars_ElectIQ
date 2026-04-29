/**
 * Performance monitoring — Web Vitals & Resource Hints
 * Reports Core Web Vitals to Google Analytics 4 when available
 * @module utils/performance
 */

import { trackEvent } from './analytics.js';

/**
 * Report Web Vitals metrics to GA4
 * Uses the Performance Observer API (no external deps)
 */
export function initPerformanceMonitoring() {
  if (typeof PerformanceObserver === 'undefined') return;

  // Largest Contentful Paint (LCP)
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      trackEvent('web_vitals', {
        metric: 'LCP',
        value: Math.round(lastEntry.startTime),
        rating: lastEntry.startTime < 2500 ? 'good' : lastEntry.startTime < 4000 ? 'needs-improvement' : 'poor'
      });
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch { /* not supported */ }

  // First Input Delay (FID) / Interaction to Next Paint (INP)
  try {
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        trackEvent('web_vitals', {
          metric: 'FID',
          value: Math.round(entry.processingStart - entry.startTime),
          rating: (entry.processingStart - entry.startTime) < 100 ? 'good' : 'needs-improvement'
        });
      });
    });
    fidObserver.observe({ type: 'first-input', buffered: true });
  } catch { /* not supported */ }

  // Cumulative Layout Shift (CLS)
  try {
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });

    // Report on page hide
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        trackEvent('web_vitals', {
          metric: 'CLS',
          value: Math.round(clsValue * 1000) / 1000,
          rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor'
        });
      }
    });
  } catch { /* not supported */ }
}

/**
 * Add resource hints for critical third-party origins
 * Improves load performance for Google services
 */
export function addResourceHints() {
  const origins = [
    'https://generativelanguage.googleapis.com',
    'https://www.gstatic.com',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ];

  origins.forEach(origin => {
    if (!document.querySelector(`link[href="${origin}"]`)) {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = origin;
      document.head.appendChild(link);
    }
  });
}

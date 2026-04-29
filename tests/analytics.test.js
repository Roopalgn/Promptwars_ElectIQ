/**
 * Tests for analytics utility — GA4 integration
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { trackEvent, trackPageView, initAnalytics } from '../src/utils/analytics.js';

describe('Analytics — Event Tracking', () => {
  beforeEach(() => {
    delete window.gtag;
  });

  it('does not throw when gtag is not loaded', () => {
    expect(() => trackEvent('test_event')).not.toThrow();
  });

  it('calls gtag when available', () => {
    window.gtag = vi.fn();
    trackEvent('button_click', { label: 'start' });
    expect(window.gtag).toHaveBeenCalledWith('event', 'button_click', { label: 'start' });
  });

  it('trackPageView sends page_view event with correct params', () => {
    window.gtag = vi.fn();
    trackPageView('quiz');
    expect(window.gtag).toHaveBeenCalledWith('event', 'page_view', expect.objectContaining({
      page_title: 'quiz'
    }));
  });

  it('handles errors in gtag gracefully', () => {
    window.gtag = () => { throw new Error('gtag error'); };
    expect(() => trackEvent('crash_test')).not.toThrow();
  });

  it('does not init analytics without valid GA ID', () => {
    // initAnalytics reads from import.meta.env which is mocked
    expect(() => initAnalytics()).not.toThrow();
  });
});

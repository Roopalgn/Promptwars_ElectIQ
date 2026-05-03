/**
 * Tests for performance utility — Web Vitals & resource hints
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { addResourceHints, initPerformanceMonitoring } from '../src/utils/performance.js';

describe('Performance — Resource Hints', () => {
  beforeEach(() => {
    // Clear any dns-prefetch links
    document.querySelectorAll('link[rel="dns-prefetch"]').forEach(el => el.remove());
  });

  it('adds dns-prefetch links to head', () => {
    addResourceHints();
    const links = document.querySelectorAll('link[rel="dns-prefetch"]');
    expect(links.length).toBeGreaterThanOrEqual(4);
  });

  it('includes generativelanguage.googleapis.com', () => {
    addResourceHints();
    const link = document.querySelector('link[href="https://generativelanguage.googleapis.com"]');
    expect(link).toBeTruthy();
    expect(link.rel).toBe('dns-prefetch');
  });

  it('includes fonts.googleapis.com', () => {
    addResourceHints();
    const link = document.querySelector('link[href="https://fonts.googleapis.com"]');
    expect(link).toBeTruthy();
  });

  it('includes fonts.gstatic.com', () => {
    addResourceHints();
    const link = document.querySelector('link[href="https://fonts.gstatic.com"]');
    expect(link).toBeTruthy();
  });

  it('does not duplicate links on multiple calls', () => {
    addResourceHints();
    const count1 = document.querySelectorAll('link[rel="dns-prefetch"]').length;
    addResourceHints();
    const count2 = document.querySelectorAll('link[rel="dns-prefetch"]').length;
    expect(count2).toBe(count1);
  });
});

describe('Performance — Monitoring Init', () => {
  it('does not throw when PerformanceObserver is available', () => {
    expect(() => initPerformanceMonitoring()).not.toThrow();
  });

  it('does not throw when PerformanceObserver is undefined', () => {
    const original = globalThis.PerformanceObserver;
    delete globalThis.PerformanceObserver;
    expect(() => initPerformanceMonitoring()).not.toThrow();
    globalThis.PerformanceObserver = original;
  });
});

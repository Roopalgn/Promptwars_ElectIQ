/**
 * Tests for countdown component — next election event display
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { renderCountdown } from '../src/components/countdown.js';

describe('Countdown — Rendering', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="countdown"></div>';
  });

  it('renders without throwing', () => {
    const container = document.getElementById('countdown');
    expect(() => renderCountdown(container)).not.toThrow();
  });

  it('renders a countdown-banner element', () => {
    const container = document.getElementById('countdown');
    renderCountdown(container);
    expect(container.querySelector('.countdown-banner')).toBeTruthy();
  });

  it('banner has role="status" for accessibility', () => {
    const container = document.getElementById('countdown');
    renderCountdown(container);
    const banner = container.querySelector('.countdown-banner');
    expect(banner.getAttribute('role')).toBe('status');
  });

  it('renders icon with aria-hidden', () => {
    const container = document.getElementById('countdown');
    renderCountdown(container);
    const icon = container.querySelector('.countdown-icon');
    expect(icon).toBeTruthy();
    expect(icon.getAttribute('aria-hidden')).toBe('true');
  });
});

describe('Countdown — Return Value', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="countdown"></div>';
  });

  it('returns object with rerender and destroy methods', () => {
    const container = document.getElementById('countdown');
    const handle = renderCountdown(container);
    expect(typeof handle.rerender).toBe('function');
    expect(typeof handle.destroy).toBe('function');
  });

  it('destroy does not throw', () => {
    const container = document.getElementById('countdown');
    const handle = renderCountdown(container);
    expect(() => handle.destroy()).not.toThrow();
  });

  it('rerender updates the DOM without throwing', () => {
    const container = document.getElementById('countdown');
    const handle = renderCountdown(container);
    expect(() => handle.rerender()).not.toThrow();
    expect(container.querySelector('.countdown-banner')).toBeTruthy();
  });
});

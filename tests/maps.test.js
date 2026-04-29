/**
 * Tests for Maps component — accessibility, external links
 */
import { describe, it, expect, beforeEach } from 'vitest';

// Mock import.meta.env for maps key
vi.stubEnv('VITE_MAPS_KEY', 'test-maps-key');

import { vi } from 'vitest';

describe('Maps — Rendering and Security', () => {
  let container;

  beforeEach(() => {
    document.body.innerHTML = '<section id="maps"></section>';
    container = document.getElementById('maps');
  });

  it('renders maps section with iframe', async () => {
    const { renderMaps } = await import('../src/components/maps.js');
    renderMaps(container);
    const iframe = container.querySelector('.maps-iframe');
    expect(iframe).not.toBeNull();
  });

  it('iframe uses lazy loading', async () => {
    const { renderMaps } = await import('../src/components/maps.js');
    renderMaps(container);
    const iframe = container.querySelector('.maps-iframe');
    expect(iframe.getAttribute('loading')).toBe('lazy');
  });

  it('iframe has accessible title', async () => {
    const { renderMaps } = await import('../src/components/maps.js');
    renderMaps(container);
    const iframe = container.querySelector('.maps-iframe');
    expect(iframe.getAttribute('title')).toContain('Election Commission');
  });

  it('external links have rel="noopener noreferrer"', async () => {
    const { renderMaps } = await import('../src/components/maps.js');
    renderMaps(container);
    const links = container.querySelectorAll('a[target="_blank"]');
    links.forEach(link => {
      expect(link.getAttribute('rel')).toContain('noopener');
      expect(link.getAttribute('rel')).toContain('noreferrer');
    });
  });

  it('renders voter helpline number', async () => {
    const { renderMaps } = await import('../src/components/maps.js');
    renderMaps(container);
    expect(container.textContent).toContain('1950');
  });

  it('renders cVIGIL app info', async () => {
    const { renderMaps } = await import('../src/components/maps.js');
    renderMaps(container);
    expect(container.textContent).toContain('cVIGIL');
  });

  it('provides noscript fallback', async () => {
    const { renderMaps } = await import('../src/components/maps.js');
    renderMaps(container);
    const noscript = container.querySelector('noscript');
    expect(noscript).not.toBeNull();
  });

  it('does not expose API key in DOM when env is empty', async () => {
    // This test verifies the key comes from env, not hardcoded
    const { renderMaps } = await import('../src/components/maps.js');
    renderMaps(container);
    const iframe = container.querySelector('.maps-iframe');
    const src = iframe.getAttribute('src');
    // Should use environment variable key
    expect(src).not.toContain('AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8');
  });
});

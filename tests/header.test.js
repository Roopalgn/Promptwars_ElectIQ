/**
 * Tests for Header component — navigation, language toggle, mobile menu
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Header — Navigation', () => {
  let container;

  beforeEach(async () => {
    document.body.innerHTML = `
      <header id="app-header"></header>
      <main>
        <section id="hero"></section>
        <section id="journey"></section>
        <section id="timeline"></section>
        <section id="quiz"></section>
        <section id="glossary"></section>
        <section id="maps"></section>
      </main>
    `;
    container = document.getElementById('app-header');
  });

  it('renders header with logo and navigation', async () => {
    const { renderHeader } = await import('../src/components/header.js');
    renderHeader(container, vi.fn());
    expect(container.querySelector('.header-logo')).not.toBeNull();
    expect(document.body.querySelector('#header-nav')).not.toBeNull();
  });

  it('renders all navigation links', async () => {
    const { renderHeader } = await import('../src/components/header.js');
    renderHeader(container, vi.fn());
    const links = document.body.querySelectorAll('#header-nav a');
    expect(links.length).toBe(9);
  });

  it('includes hamburger menu button', async () => {
    const { renderHeader } = await import('../src/components/header.js');
    renderHeader(container, vi.fn());
    const menuBtn = container.querySelector('#header-menu-btn');
    expect(menuBtn).not.toBeNull();
    expect(menuBtn.getAttribute('aria-expanded')).toBe('false');
  });

  it('toggles mobile menu open/close', async () => {
    const { renderHeader } = await import('../src/components/header.js');
    renderHeader(container, vi.fn());
    const menuBtn = container.querySelector('#header-menu-btn');
    menuBtn.click();
    const nav = document.body.querySelector('#header-nav');
    expect(nav.classList.contains('active')).toBe(true);
  });

  it('calls onLangChange callback when language is toggled', async () => {
    const { renderHeader } = await import('../src/components/header.js');
    const callback = vi.fn();
    renderHeader(container, callback);
    container.querySelector('#lang-toggle-btn').click();
    expect(callback).toHaveBeenCalled();
  });

  it('has accessible aria-label on language toggle', async () => {
    const { renderHeader } = await import('../src/components/header.js');
    renderHeader(container, vi.fn());
    const langBtn = container.querySelector('#lang-toggle-btn');
    expect(langBtn.getAttribute('aria-label')).toBe('Switch language');
  });
});

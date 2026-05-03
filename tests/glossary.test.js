/**
 * Tests for Glossary component — search, filtering, accessibility
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Glossary — Rendering and Search', () => {
  let container;

  beforeEach(() => {
    document.body.innerHTML = '<section id="glossary"></section>';
    container = document.getElementById('glossary');
  });

  it('renders glossary section with search input', async () => {
    const { renderGlossary } = await import('../src/components/glossary.js');
    renderGlossary(container);
    expect(container.querySelector('#glossary-search-input')).not.toBeNull();
  });

  it('renders alphabetical index buttons', async () => {
    const { renderGlossary } = await import('../src/components/glossary.js');
    renderGlossary(container);
    const buttons = container.querySelectorAll('.glossary-alpha button');
    expect(buttons.length).toBeGreaterThan(5); // 'All' + letters
  });

  it('renders term cards in the grid', async () => {
    const { renderGlossary } = await import('../src/components/glossary.js');
    renderGlossary(container);
    const expandBtn = container.querySelector('#glossary-expand-btn');
    if (expandBtn) expandBtn.click();
    const cards = container.querySelectorAll('.glossary-card');
    expect(cards.length).toBeGreaterThan(10);
  });

  it('search input has accessible label', async () => {
    const { renderGlossary } = await import('../src/components/glossary.js');
    renderGlossary(container);
    const label = container.querySelector('label[for="glossary-search-input"]');
    expect(label).not.toBeNull();
    expect(label.classList.contains('sr-only')).toBe(true);
  });

  it('grid has role=list for screen readers', async () => {
    const { renderGlossary } = await import('../src/components/glossary.js');
    renderGlossary(container);
    const grid = container.querySelector('.glossary-grid');
    expect(grid.getAttribute('role')).toBe('list');
  });

  it('each card has role=listitem', async () => {
    const { renderGlossary } = await import('../src/components/glossary.js');
    renderGlossary(container);
    const card = container.querySelector('.glossary-card');
    expect(card.getAttribute('role')).toBe('listitem');
  });

  it('has maxlength attribute for search security', async () => {
    const { renderGlossary } = await import('../src/components/glossary.js');
    renderGlossary(container);
    const input = container.querySelector('#glossary-search-input');
    expect(input.getAttribute('maxlength')).toBe('100');
  });
});

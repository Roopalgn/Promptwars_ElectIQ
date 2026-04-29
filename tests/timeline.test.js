/**
 * Tests for Timeline component — Google Charts integration
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { timelineEvents, timelineCategories } from '../src/data/timeline-events.js';

describe('Timeline — Data Validation', () => {
  it('all timeline events have required fields', () => {
    timelineEvents.forEach(event => {
      expect(event).toHaveProperty('label');
      expect(event).toHaveProperty('startDate');
      expect(event).toHaveProperty('endDate');
      expect(event).toHaveProperty('category');
      expect(event).toHaveProperty('description');
    });
  });

  it('all events have valid dates', () => {
    timelineEvents.forEach(event => {
      const start = new Date(event.startDate);
      const end = new Date(event.endDate);
      expect(start.getTime()).not.toBeNaN();
      expect(end.getTime()).not.toBeNaN();
      expect(end.getTime()).toBeGreaterThanOrEqual(start.getTime());
    });
  });

  it('all events have bilingual labels', () => {
    timelineEvents.forEach(event => {
      expect(event.label).toHaveProperty('en');
      expect(event.label).toHaveProperty('hi');
      expect(typeof event.label.en).toBe('string');
      expect(event.label.en.length).toBeGreaterThan(0);
    });
  });

  it('all categories have id, label, and color', () => {
    timelineCategories.forEach(cat => {
      expect(cat).toHaveProperty('id');
      expect(cat).toHaveProperty('label');
      expect(cat).toHaveProperty('color');
      expect(cat.color).toMatch(/^#[0-9a-fA-F]{6}$/);
    });
  });

  it('all events reference valid category IDs', () => {
    const validIds = timelineCategories.map(c => c.id);
    timelineEvents.forEach(event => {
      expect(validIds).toContain(event.category);
    });
  });
});

describe('Timeline — Rendering', () => {
  let container;

  beforeEach(() => {
    // Mock google.charts
    window.google = {
      charts: { load: vi.fn(), setOnLoadCallback: vi.fn() },
      visualization: { Timeline: vi.fn(), DataTable: vi.fn() }
    };
    document.body.innerHTML = '<section id="timeline"></section>';
    container = document.getElementById('timeline');
  });

  it('renders timeline section with chart container', async () => {
    const { renderTimeline } = await import('../src/components/timeline.js');
    renderTimeline(container);
    expect(container.querySelector('#timeline-chart')).not.toBeNull();
  });

  it('renders legend items for all categories', async () => {
    const { renderTimeline } = await import('../src/components/timeline.js');
    renderTimeline(container);
    const legends = container.querySelectorAll('.timeline-legend-item');
    expect(legends.length).toBe(timelineCategories.length);
  });

  it('chart container has accessible role=img', async () => {
    const { renderTimeline } = await import('../src/components/timeline.js');
    renderTimeline(container);
    const chart = container.querySelector('#timeline-chart');
    expect(chart.getAttribute('role')).toBe('img');
  });

  it('shows loading message while chart loads', async () => {
    const { renderTimeline } = await import('../src/components/timeline.js');
    renderTimeline(container);
    const chart = container.querySelector('#timeline-chart');
    expect(chart.textContent).toContain('Loading');
  });
});

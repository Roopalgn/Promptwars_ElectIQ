/**
 * Tests for checklist component — polling day checklist with localStorage persistence
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { renderChecklist } from '../src/components/checklist.js';

describe('Checklist — Rendering', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '<div id="checklist"></div>';
  });

  it('renders 4 checkbox items', () => {
    const container = document.getElementById('checklist');
    renderChecklist(container);
    const checkboxes = container.querySelectorAll('.checklist-checkbox');
    expect(checkboxes.length).toBe(4);
  });

  it('all checkboxes start unchecked', () => {
    const container = document.getElementById('checklist');
    renderChecklist(container);
    const checkboxes = container.querySelectorAll('.checklist-checkbox');
    checkboxes.forEach(cb => expect(cb.checked).toBe(false));
  });

  it('renders section header with title', () => {
    const container = document.getElementById('checklist');
    renderChecklist(container);
    expect(container.querySelector('#checklist-title')).toBeTruthy();
  });
});

describe('Checklist — Persistence', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '<div id="checklist"></div>';
  });

  it('persists checked state to localStorage', () => {
    const container = document.getElementById('checklist');
    renderChecklist(container);

    const cb = container.querySelector('.checklist-checkbox[data-index="0"]');
    cb.checked = true;
    cb.dispatchEvent(new Event('change'));

    const stored = JSON.parse(localStorage.getItem('electiq_voter_checklist'));
    expect(stored[0]).toBe(true);
  });

  it('restores checked state from localStorage', () => {
    localStorage.setItem('electiq_voter_checklist', JSON.stringify([true, false, true, false]));

    const container = document.getElementById('checklist');
    renderChecklist(container);

    const checkboxes = container.querySelectorAll('.checklist-checkbox');
    expect(checkboxes[0].checked).toBe(true);
    expect(checkboxes[1].checked).toBe(false);
    expect(checkboxes[2].checked).toBe(true);
    expect(checkboxes[3].checked).toBe(false);
  });

  it('shows completed message when all checked', () => {
    localStorage.setItem('electiq_voter_checklist', JSON.stringify([true, true, true, true]));

    const container = document.getElementById('checklist');
    renderChecklist(container);

    expect(container.querySelector('.checklist-completed')).toBeTruthy();
  });

  it('does not show completed message when not all checked', () => {
    localStorage.setItem('electiq_voter_checklist', JSON.stringify([true, true, true, false]));

    const container = document.getElementById('checklist');
    renderChecklist(container);

    expect(container.querySelector('.checklist-completed')).toBeFalsy();
  });
});

describe('Checklist — Return Value', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '<div id="checklist"></div>';
  });

  it('returns an object with rerender method', () => {
    const container = document.getElementById('checklist');
    const handle = renderChecklist(container);
    expect(typeof handle.rerender).toBe('function');
  });
});

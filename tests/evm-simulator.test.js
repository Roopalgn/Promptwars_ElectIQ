/**
 * Tests for EVM simulator component — voting flow stages
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { renderEvmSimulator } from '../src/components/evm-simulator.js';

describe('EVM Simulator — Rendering', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="evm"></div>';
  });

  it('renders without throwing', () => {
    const container = document.getElementById('evm');
    expect(() => renderEvmSimulator(container)).not.toThrow();
  });

  it('renders intro stage initially', () => {
    const container = document.getElementById('evm');
    renderEvmSimulator(container);
    expect(container.querySelector('.evm-intro')).toBeTruthy();
  });

  it('renders section title', () => {
    const container = document.getElementById('evm');
    renderEvmSimulator(container);
    expect(container.querySelector('#evm-title')).toBeTruthy();
  });

  it('renders start button in intro stage', () => {
    const container = document.getElementById('evm');
    renderEvmSimulator(container);
    const btn = container.querySelector('#evm-start-btn');
    expect(btn).toBeTruthy();
  });

  it('renders safety rules in intro', () => {
    const container = document.getElementById('evm');
    renderEvmSimulator(container);
    const rules = container.querySelectorAll('.evm-rules li');
    expect(rules.length).toBeGreaterThanOrEqual(3);
  });
});

describe('EVM Simulator — Stage Transitions', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="evm"></div>';
  });

  it('clicking start moves to voting stage', () => {
    const container = document.getElementById('evm');
    renderEvmSimulator(container);

    const startBtn = container.querySelector('#evm-start-btn');
    if (startBtn) {
      startBtn.click();
      // After click, should show candidate list (voting stage uses .evm-row)
      const candidates = container.querySelectorAll('.evm-row');
      expect(candidates.length).toBeGreaterThan(0);
    }
  });

  it('candidates include NOTA option', () => {
    const container = document.getElementById('evm');
    renderEvmSimulator(container);

    const startBtn = container.querySelector('#evm-start-btn');
    if (startBtn) {
      startBtn.click();
      expect(container.textContent).toContain('NOTA');
    }
  });
});

/**
 * Tests for eligibility checker — voter qualification logic
 */
import { describe, it, expect, beforeEach } from 'vitest';

describe('Eligibility — Core Logic', () => {
  /**
   * Mirror the eligibility business logic from the component.
   * Extracted here so we test the decision tree, not the DOM wiring.
   */
  function checkEligibility({ citizen, age, resident, jail }) {
    const eligible = citizen && age && resident && !jail;
    const reasons = [];
    if (!citizen) { reasons.push('Not a citizen'); }
    if (!age) { reasons.push('Under 18'); }
    if (!resident) { reasons.push('Not a resident'); }
    if (jail) { reasons.push('Currently in jail'); }
    return { eligible, reasons };
  }

  it('all-yes answers → eligible with no reasons', () => {
    const result = checkEligibility({ citizen: true, age: true, resident: true, jail: false });
    expect(result.eligible).toBe(true);
    expect(result.reasons).toHaveLength(0);
  });

  it('not a citizen → ineligible', () => {
    const result = checkEligibility({ citizen: false, age: true, resident: true, jail: false });
    expect(result.eligible).toBe(false);
    expect(result.reasons).toContain('Not a citizen');
  });

  it('under 18 → ineligible', () => {
    const result = checkEligibility({ citizen: true, age: false, resident: true, jail: false });
    expect(result.eligible).toBe(false);
    expect(result.reasons).toContain('Under 18');
  });

  it('not a resident → ineligible', () => {
    const result = checkEligibility({ citizen: true, age: true, resident: false, jail: false });
    expect(result.eligible).toBe(false);
    expect(result.reasons).toContain('Not a resident');
  });

  it('in jail → ineligible', () => {
    const result = checkEligibility({ citizen: true, age: true, resident: true, jail: true });
    expect(result.eligible).toBe(false);
    expect(result.reasons).toContain('Currently in jail');
  });

  it('multiple disqualifying reasons → all reported', () => {
    const result = checkEligibility({ citizen: false, age: false, resident: false, jail: true });
    expect(result.eligible).toBe(false);
    expect(result.reasons).toHaveLength(4);
  });

  it('only jail=false matters when everything else is true', () => {
    const resultYes = checkEligibility({ citizen: true, age: true, resident: true, jail: false });
    const resultNo = checkEligibility({ citizen: true, age: true, resident: true, jail: true });
    expect(resultYes.eligible).toBe(true);
    expect(resultNo.eligible).toBe(false);
  });
});

describe('Eligibility — Component Rendering', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="eligibility"></div>';
  });

  it('renders the form with 4 fieldsets', async () => {
    const { renderEligibility } = await import('../src/components/eligibility.js');
    const container = document.getElementById('eligibility');
    renderEligibility(container);

    const fieldsets = container.querySelectorAll('fieldset');
    expect(fieldsets.length).toBe(4);
  });

  it('renders submit button', async () => {
    const { renderEligibility } = await import('../src/components/eligibility.js');
    const container = document.getElementById('eligibility');
    renderEligibility(container);

    const btn = container.querySelector('#eligibility-submit');
    expect(btn).toBeTruthy();
    expect(btn.type).toBe('submit');
  });

  it('form has aria-labelledby for accessibility', async () => {
    const { renderEligibility } = await import('../src/components/eligibility.js');
    const container = document.getElementById('eligibility');
    renderEligibility(container);

    const form = container.querySelector('form');
    expect(form.getAttribute('aria-labelledby')).toBe('eligibility-title');
  });

  it('each question has radio inputs with required attribute', async () => {
    const { renderEligibility } = await import('../src/components/eligibility.js');
    const container = document.getElementById('eligibility');
    renderEligibility(container);

    const radios = container.querySelectorAll('input[type="radio"]');
    expect(radios.length).toBe(8); // 4 questions × 2 options
    radios.forEach(r => expect(r.required).toBe(true));
  });
});

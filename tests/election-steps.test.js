/**
 * Tests for election steps data — integrity and bilingual content
 */
import { describe, it, expect } from 'vitest';
import { electionSteps } from '../src/data/election-steps.js';

describe('Election Steps — Data Integrity', () => {
  it('has exactly 6 steps', () => {
    expect(electionSteps.length).toBe(6);
  });

  it('all steps have required fields', () => {
    electionSteps.forEach(step => {
      expect(step).toHaveProperty('id');
      expect(step).toHaveProperty('icon');
      expect(step).toHaveProperty('title');
      expect(step).toHaveProperty('description');
      expect(step).toHaveProperty('details');
      expect(step).toHaveProperty('fact');
    });
  });

  it('all steps have bilingual title, description, details, fact', () => {
    electionSteps.forEach(step => {
      expect(step.title).toHaveProperty('en');
      expect(step.title).toHaveProperty('hi');
      expect(step.description).toHaveProperty('en');
      expect(step.description).toHaveProperty('hi');
      expect(step.details).toHaveProperty('en');
      expect(step.details).toHaveProperty('hi');
      expect(step.fact).toHaveProperty('en');
      expect(step.fact).toHaveProperty('hi');
    });
  });

  it('details arrays are non-empty', () => {
    electionSteps.forEach(step => {
      expect(step.details.en.length).toBeGreaterThan(0);
      expect(step.details.hi.length).toBeGreaterThan(0);
    });
  });

  it('steps are numbered sequentially', () => {
    electionSteps.forEach((step, i) => {
      expect(step.id).toBe(i + 1);
    });
  });

  it('all icons are emoji strings', () => {
    electionSteps.forEach(step => {
      expect(typeof step.icon).toBe('string');
      expect(step.icon.length).toBeGreaterThan(0);
    });
  });
});

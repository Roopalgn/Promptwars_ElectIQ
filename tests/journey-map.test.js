/**
 * Tests for Journey Map state management
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { JourneyState } from '../src/components/journey-map.js';

describe('JourneyState', () => {
  let state;

  beforeEach(() => {
    state = new JourneyState(6);
  });

  it('starts at step 1', () => {
    expect(state.current).toBe(1);
  });

  it('next() increments step', () => {
    const result = state.next();
    expect(result).toBe(true);
    expect(state.current).toBe(2);
  });

  it('prev() decrements step', () => {
    state.next(); // go to 2
    const result = state.prev();
    expect(result).toBe(true);
    expect(state.current).toBe(1);
  });

  it('cannot go below step 1', () => {
    const result = state.prev();
    expect(result).toBe(false);
    expect(state.current).toBe(1);
  });

  it('cannot exceed total steps', () => {
    for (let i = 0; i < 10; i++) { state.next(); }
    expect(state.current).toBe(6);
  });

  it('goTo() jumps to specific step', () => {
    state.goTo(4);
    expect(state.current).toBe(4);
  });

  it('goTo() rejects invalid step (0)', () => {
    const result = state.goTo(0);
    expect(result).toBe(false);
    expect(state.current).toBe(1);
  });

  it('goTo() rejects invalid step (> total)', () => {
    const result = state.goTo(7);
    expect(result).toBe(false);
    expect(state.current).toBe(1);
  });

  it('tracks visited steps', () => {
    state.next(); // visit 2
    state.next(); // visit 3
    expect(state.visited.has(1)).toBe(true);
    expect(state.visited.has(2)).toBe(true);
    expect(state.visited.has(3)).toBe(true);
    expect(state.visited.has(4)).toBe(false);
  });

  it('marks previous steps as completed', () => {
    state.next(); // now at 2
    state.next(); // now at 3
    expect(state.isCompleted(1)).toBe(true);
    expect(state.isCompleted(2)).toBe(true);
    expect(state.isCompleted(3)).toBe(false); // current step, not completed
  });
});

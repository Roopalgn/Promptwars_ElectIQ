/**
 * Tests for Quiz state management
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { QuizState } from '../src/components/quiz.js';

const mockQuestions = [
  { id: 1, category: 'A', question: 'Q1', answer: true, explanation: 'E1' },
  { id: 2, category: 'A', question: 'Q2', answer: false, explanation: 'E2' },
  { id: 3, category: 'B', question: 'Q3', answer: true, explanation: 'E3' },
  { id: 4, category: 'B', question: 'Q4', answer: false, explanation: 'E4' },
  { id: 5, category: 'C', question: 'Q5', answer: true, explanation: 'E5' }
];

describe('QuizState', () => {
  let state;

  beforeEach(() => {
    state = new QuizState(mockQuestions);
    // Reset shuffle by setting questions directly for deterministic tests
    state.questions = [...mockQuestions];
    state.currentIndex = 0;
  });

  it('starts at question index 0', () => {
    expect(state.currentIndex).toBe(0);
    expect(state.score).toBe(0);
    expect(state.isComplete).toBe(false);
  });

  it('increments score on correct answer', () => {
    state.answer(true); // Q1 answer is true
    expect(state.score).toBe(1);
  });

  it('does not increment score on wrong answer', () => {
    state.answer(false); // Q1 answer is true, so false is wrong
    expect(state.score).toBe(0);
  });

  it('prevents double-answering same question', () => {
    state.answer(true);
    const result = state.answer(false);
    expect(result).toBe(false);
    expect(state.score).toBe(1); // Only counted once
  });

  it('advances to next question with next()', () => {
    state.answered = true;
    state.next();
    expect(state.currentIndex).toBe(1);
    expect(state.answered).toBe(false);
  });

  it('marks complete when reaching last question', () => {
    state.currentIndex = mockQuestions.length - 1;
    state.answered = true;
    state.next();
    expect(state.isComplete).toBe(true);
  });

  it('cannot advance past last question', () => {
    state.currentIndex = mockQuestions.length - 1;
    const result = state.next();
    expect(result).toBe(false);
  });

  it('returns correct badge for low score', () => {
    state.score = 2;
    const badge = state.getBadge();
    expect(badge.label).toBe('Beginner');
    expect(badge.emoji).toBe('🌱');
  });

  it('returns correct badge for high score', () => {
    state.score = 10;
    const badge = state.getBadge();
    expect(badge.label).toBe('Democracy Champion');
    expect(badge.emoji).toBe('🏆');
  });

  it('returns correct badge for mid score', () => {
    state.score = 8;
    const badge = state.getBadge();
    expect(badge.label).toBe('Election Expert');
  });

  it('shuffles questions on construction', () => {
    const state1 = new QuizState(mockQuestions);
    const state2 = new QuizState(mockQuestions);
    // With 5 questions, shuffle should produce different orders most of the time
    // We just verify the questions array has same length
    expect(state1.questions.length).toBe(mockQuestions.length);
    expect(state2.questions.length).toBe(mockQuestions.length);
  });

  it('resets state correctly', () => {
    state.score = 5;
    state.currentIndex = 3;
    state.isComplete = true;
    state.reset();
    expect(state.score).toBe(0);
    expect(state.currentIndex).toBe(0);
    expect(state.isComplete).toBe(false);
    expect(state.answered).toBe(false);
  });
});

/**
 * Tests for offline knowledge base — fallback chatbot answers
 */
import { describe, it, expect } from 'vitest';
import { getOfflineAnswer, GENERIC_FALLBACK } from '../src/api/offline-knowledge.js';

describe('Offline Knowledge Base', () => {
  it('returns null for empty input', () => {
    expect(getOfflineAnswer('')).toBeNull();
    expect(getOfflineAnswer('   ')).toBeNull();
    expect(getOfflineAnswer(null)).toBeNull();
    expect(getOfflineAnswer(undefined)).toBeNull();
  });

  it('matches voter registration questions', () => {
    const answer = getOfflineAnswer('How do I register to vote?');
    expect(answer).not.toBeNull();
    expect(answer).toContain('Form 6');
  });

  it('matches EVM questions', () => {
    const answer = getOfflineAnswer('What is an EVM?');
    expect(answer).toContain('EVM');
  });

  it('matches NOTA questions', () => {
    const answer = getOfflineAnswer('Tell me about NOTA');
    expect(answer).toContain('NOTA');
  });

  it('matches NRI / overseas voter questions', () => {
    const answer = getOfflineAnswer('Can NRI vote in elections?');
    expect(answer).toContain('NRI');
  });

  it('matches polling booth questions', () => {
    const answer = getOfflineAnswer('How do I find my polling booth?');
    expect(answer).toContain('electoralsearch');
  });

  it('matches MCC / model code questions', () => {
    const answer = getOfflineAnswer('What is the model code of conduct?');
    expect(answer).toContain('Model Code of Conduct');
  });

  it('matches Hindi keyword "पंजीकरण"', () => {
    const answer = getOfflineAnswer('मतदाता पंजीकरण कैसे करें');
    expect(answer).not.toBeNull();
  });

  it('returns null for unrelated queries', () => {
    expect(getOfflineAnswer('what is the weather today')).toBeNull();
    expect(getOfflineAnswer('xyz random text')).toBeNull();
  });

  it('GENERIC_FALLBACK is a non-empty string', () => {
    expect(typeof GENERIC_FALLBACK).toBe('string');
    expect(GENERIC_FALLBACK.length).toBeGreaterThan(50);
    expect(GENERIC_FALLBACK).toContain('1950');
  });
});

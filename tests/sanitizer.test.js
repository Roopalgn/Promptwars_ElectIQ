/**
 * Tests for sanitizer utility — XSS prevention
 */
import { describe, it, expect } from 'vitest';
import { sanitizeInput, sanitizeRichContent, escapeHtml } from '../src/utils/sanitizer.js';

describe('sanitizeInput', () => {
  it('strips <script> tags from input', () => {
    const result = sanitizeInput('<script>alert("xss")</script>Hello');
    expect(result).not.toContain('<script>');
    expect(result).toContain('Hello');
  });

  it('strips onerror attributes from img tags', () => {
    const result = sanitizeInput('<img src="x" onerror="alert(1)">');
    expect(result).not.toContain('onerror');
  });

  it('returns empty string for non-string input', () => {
    expect(sanitizeInput(null)).toBe('');
    expect(sanitizeInput(undefined)).toBe('');
    expect(sanitizeInput(123)).toBe('');
  });

  it('returns empty string for empty input', () => {
    expect(sanitizeInput('')).toBe('');
    expect(sanitizeInput('   ')).toBe('');
  });

  it('preserves plain text content', () => {
    expect(sanitizeInput('How do I register to vote?')).toBe('How do I register to vote?');
  });

  it('strips all HTML tags in strict mode', () => {
    const result = sanitizeInput('<b>bold</b> and <em>italic</em>');
    expect(result).not.toContain('<b>');
    expect(result).not.toContain('<em>');
    expect(result).toContain('bold');
    expect(result).toContain('italic');
  });
});

describe('sanitizeRichContent', () => {
  it('preserves safe formatting tags', () => {
    const result = sanitizeRichContent('<strong>bold</strong> and <em>italic</em>');
    expect(result).toContain('<strong>');
    expect(result).toContain('<em>');
  });

  it('strips dangerous tags from rich content', () => {
    const result = sanitizeRichContent('<script>alert(1)</script><p>Safe</p>');
    expect(result).not.toContain('<script>');
    expect(result).toContain('<p>Safe</p>');
  });

  it('returns empty string for non-string input', () => {
    expect(sanitizeRichContent(null)).toBe('');
    expect(sanitizeRichContent(42)).toBe('');
  });
});

describe('escapeHtml', () => {
  it('escapes angle brackets', () => {
    const result = escapeHtml('<div>test</div>');
    expect(result).toContain('&lt;');
    expect(result).toContain('&gt;');
  });

  it('returns empty string for non-string input', () => {
    expect(escapeHtml(null)).toBe('');
  });
});

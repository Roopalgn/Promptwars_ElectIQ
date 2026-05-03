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

  it('strips javascript: URLs', () => {
    const result = sanitizeInput('<a href="javascript:alert(1)">click</a>');
    expect(result).not.toContain('javascript:');
  });

  it('strips SVG onload vectors', () => {
    const result = sanitizeInput('<svg onload="alert(1)">');
    expect(result).not.toContain('onload');
    expect(result).not.toContain('<svg');
  });

  it('strips iframe injection', () => {
    const result = sanitizeInput('<iframe src="https://evil.com"></iframe>');
    expect(result).not.toContain('<iframe');
  });

  it('strips onfocus event handler', () => {
    const result = sanitizeInput('<input onfocus="alert(1)" autofocus>');
    expect(result).not.toContain('onfocus');
  });

  it('strips onmouseover event handler', () => {
    const result = sanitizeInput('<div onmouseover="alert(1)">hover</div>');
    expect(result).not.toContain('onmouseover');
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

  it('handles deeply nested injection attempts', () => {
    const result = sanitizeInput('<div><p><span><script>alert(1)</script></span></p></div>');
    expect(result).not.toContain('<script>');
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

  it('strips style tags from rich content', () => {
    const result = sanitizeRichContent('<style>body{display:none}</style><p>Text</p>');
    expect(result).not.toContain('<style>');
    expect(result).toContain('<p>Text</p>');
  });

  it('strips event handlers from allowed tags', () => {
    const result = sanitizeRichContent('<strong onclick="alert(1)">text</strong>');
    expect(result).not.toContain('onclick');
    expect(result).toContain('<strong>');
  });

  it('preserves list elements', () => {
    const result = sanitizeRichContent('<ul><li>Item 1</li><li>Item 2</li></ul>');
    expect(result).toContain('<ul>');
    expect(result).toContain('<li>');
  });

  it('strips form elements from AI responses', () => {
    const result = sanitizeRichContent('<form action="https://evil.com"><input></form>');
    expect(result).not.toContain('<form');
    expect(result).not.toContain('<input');
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

  it('escapes ampersands', () => {
    const result = escapeHtml('A & B');
    expect(result).toContain('&amp;');
  });

  it('handles special characters safely', () => {
    const result = escapeHtml('<script>alert("xss")</script>');
    expect(result).not.toContain('<script>');
    expect(result).toContain('&lt;script&gt;');
  });

  it('preserves safe text', () => {
    expect(escapeHtml('Hello world')).toBe('Hello world');
  });

  it('returns empty string for non-string input', () => {
    expect(escapeHtml(null)).toBe('');
    expect(escapeHtml(undefined)).toBe('');
    expect(escapeHtml(123)).toBe('');
  });
});

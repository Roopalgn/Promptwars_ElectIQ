/**
 * DOMPurify wrapper for XSS prevention
 * All user inputs and AI responses MUST pass through this before rendering
 * @module utils/sanitizer
 */

import DOMPurify from 'dompurify';

/** Allowed HTML tags for rich content (AI responses) */
const RICH_CONFIG = {
  ALLOWED_TAGS: ['b', 'strong', 'i', 'em', 'ul', 'ol', 'li', 'p', 'br', 'span', 'h3', 'h4'],
  ALLOWED_ATTR: ['class'],
  KEEP_CONTENT: true
};

/** Strict config — strips ALL HTML (user inputs) */
const STRICT_CONFIG = {
  ALLOWED_TAGS: [],
  ALLOWED_ATTR: [],
  KEEP_CONTENT: true
};

/**
 * Sanitize user input — removes ALL HTML tags
 * @param {string} input - Raw user input
 * @returns {string} Plain text with no HTML
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return '';
  }
  return DOMPurify.sanitize(input.trim(), STRICT_CONFIG);
}

/**
 * Sanitize rich content — allows safe formatting tags
 * Used for AI responses that may contain bold, lists, etc.
 * @param {string} html - HTML content to sanitize
 * @returns {string} Sanitized HTML with only safe tags
 */
export function sanitizeRichContent(html) {
  if (typeof html !== 'string') {
    return '';
  }
  return DOMPurify.sanitize(html, RICH_CONFIG);
}

/**
 * Escape HTML entities for safe text rendering
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
export function escapeHtml(text) {
  if (typeof text !== 'string') {
    return '';
  }
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

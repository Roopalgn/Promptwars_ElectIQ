/**
 * Searchable Election Glossary with alphabetical index
 * @module components/glossary
 */

import { glossaryTerms } from '../data/glossary-terms.js';
import { t, getLang } from '../utils/i18n.js';
import { escapeHtml } from '../utils/sanitizer.js';

/**
 * Render the Glossary section
 * @param {HTMLElement} container
 */
export function renderGlossary(container) {
  let searchQuery = '';
  let activeLetter = '';
  let debounceTimer = null;

  const render = () => {
    const filtered = filterTerms(searchQuery, activeLetter);

    container.innerHTML = `
      <div class="section-header reveal">
        <h2 id="glossary-title">${t('glossary.title')}</h2>
        <p>${t('glossary.subtitle')}</p>
      </div>

      <div class="reveal">
        <div class="glossary-search-wrap">
          <span class="glossary-search-icon" aria-hidden="true">🔍</span>
          <label for="glossary-search-input" class="sr-only">${t('glossary.search')}</label>
          <input type="search"
                 class="glossary-search"
                 id="glossary-search-input"
                 placeholder="${t('glossary.search')}"
                 value="${escapeHtml(searchQuery)}"
                 maxlength="100"
                 autocomplete="off" />
        </div>

        <div class="glossary-alpha" role="toolbar" aria-label="Filter by letter">
          <button class="${activeLetter === '' ? 'active' : ''}" data-letter="">${t('glossary.all')}</button>
          ${getAvailableLetters().map(l => `
            <button class="${activeLetter === l ? 'active' : ''}" data-letter="${l}">${l}</button>
          `).join('')}
        </div>
      </div>

      <div class="glossary-grid reveal" role="list" aria-label="Election terms">
        ${filtered.length > 0 ? filtered.map(term => `
          <div class="glass-card glossary-card hover-lift" role="listitem">
            <div class="glossary-term">${highlightMatch(term.term, searchQuery)}</div>
            ${getLang() === 'hi' || term.hi ? `<div class="glossary-term-hi">${term.hi}</div>` : ''}
            <p class="glossary-def">${term.def}</p>
          </div>
        `).join('') : `
          <div class="glossary-empty" role="status">
            <p style="font-size:2rem;margin-bottom:var(--space-2);">🔍</p>
            <p>${t('glossary.empty')}</p>
          </div>
        `}
      </div>
    `;

    // Search input with debounce
    const input = container.querySelector('#glossary-search-input');
    if (input) {
      input.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          searchQuery = e.target.value.trim();
          activeLetter = '';
          render();
          // Re-focus input and restore cursor
          const newInput = container.querySelector('#glossary-search-input');
          if (newInput) {
            newInput.focus();
            newInput.setSelectionRange(newInput.value.length, newInput.value.length);
          }
        }, 300);
      });
    }

    // Letter filter buttons
    container.querySelectorAll('.glossary-alpha button').forEach(btn => {
      btn.addEventListener('click', () => {
        activeLetter = btn.dataset.letter;
        searchQuery = '';
        render();
      });
    });
  };

  render();
  return { rerender: render };
}

/**
 * Filter terms by search query and/or letter
 * @param {string} query
 * @param {string} letter
 * @returns {Array}
 */
function filterTerms(query, letter) {
  let results = [...glossaryTerms];

  if (letter) {
    results = results.filter(t => t.term.charAt(0).toUpperCase() === letter);
  }

  if (query) {
    const q = query.toLowerCase();
    results = results.filter(t =>
      t.term.toLowerCase().includes(q) ||
      t.def.toLowerCase().includes(q) ||
      (t.hi && t.hi.includes(query))
    );
  }

  return results.sort((a, b) => a.term.localeCompare(b.term));
}

/**
 * Get letters that have at least one term
 * @returns {string[]}
 */
function getAvailableLetters() {
  const letters = new Set(glossaryTerms.map(t => t.term.charAt(0).toUpperCase()));
  return [...letters].sort();
}

/**
 * Highlight matching text in term name
 * @param {string} text
 * @param {string} query
 * @returns {string}
 */
function highlightMatch(text, query) {
  if (!query) { return escapeHtml(text); }
  const escaped = escapeHtml(text);
  const q = escapeHtml(query);
  const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return escaped.replace(regex, '<mark style="background:rgba(255,107,53,0.3);color:var(--text-primary);border-radius:2px;padding:0 2px;">$1</mark>');
}

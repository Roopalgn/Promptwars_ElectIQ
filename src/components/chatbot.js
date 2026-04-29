/**
 * AI Chatbot powered by Google Gemini
 * @module components/chatbot
 */

import { askGemini, isApiKeyConfigured, getRemainingQueries } from '../api/gemini.js';
import { sanitizeInput, sanitizeRichContent } from '../utils/sanitizer.js';
import { t } from '../utils/i18n.js';
import { trackEvent } from '../utils/analytics.js';

const SUGGESTIONS = [
  'How do I register to vote?',
  'What is an EVM?',
  'What is Form 6?',
  'What is NOTA?',
  'Explain the Model Code of Conduct'
];

/**
 * Render the Chatbot widget
 * @param {HTMLElement} container
 */
export function renderChatbot(container) {
  let isOpen = false;
  let messages = [];
  let isLoading = false;
  const history = [];

  const render = () => {
    container.innerHTML = `
      <button class="chatbot-toggle ${isOpen ? 'open' : ''}"
              id="chatbot-toggle-btn"
              aria-label="${isOpen ? 'Close' : 'Open'} AI assistant"
              aria-expanded="${isOpen}">
        ${isOpen ? '✕' : '💬'}
      </button>

      <div class="chatbot-panel ${isOpen ? 'open' : ''}" role="dialog" aria-label="AI Election Assistant" id="chatbot-dialog">
        <div class="chatbot-header">
          <span class="chatbot-header-dot" aria-hidden="true"></span>
          <div>
            <div class="chatbot-header-title">${t('chat.title')}</div>
            <div class="chatbot-header-subtitle">${t('chat.subtitle')}</div>
          </div>
        </div>

        <div class="chatbot-messages" id="chatbot-messages" aria-live="polite" aria-label="Chat messages">
          ${messages.length === 0 ? `
            <div class="chatbot-msg bot">
              <p>${isApiKeyConfigured() ? t('chat.welcome') : t('chat.configKey')}</p>
            </div>
          ` : ''}
          ${messages.map(m => `
            <div class="chatbot-msg ${m.role}">
              ${m.role === 'bot' ? sanitizeRichContent(formatMarkdown(m.text)) : `<p>${sanitizeRichContent(m.text)}</p>`}
            </div>
          `).join('')}
          ${isLoading ? `
            <div class="chatbot-typing" aria-label="AI is typing">
              <span></span><span></span><span></span>
            </div>
          ` : ''}
        </div>

        ${messages.length === 0 && isApiKeyConfigured() ? `
          <div class="chatbot-suggestions" role="list" aria-label="Suggested questions">
            ${SUGGESTIONS.map(s => `
              <button class="chatbot-suggestion" role="listitem" data-suggestion="${s}">${s}</button>
            `).join('')}
          </div>
        ` : ''}

        <div class="chatbot-rate-limit" aria-live="polite">
          ${getRemainingQueries()} ${t('chat.rateLimit')}
        </div>

        <div class="chatbot-input-area">
          <label for="chatbot-input" class="sr-only">${t('chat.placeholder')}</label>
          <input type="text"
                 class="chatbot-input"
                 id="chatbot-input"
                 placeholder="${t('chat.placeholder')}"
                 maxlength="500"
                 autocomplete="off"
                 ${!isApiKeyConfigured() || isLoading ? 'disabled' : ''} />
          <button class="chatbot-send"
                  id="chatbot-send-btn"
                  aria-label="Send message"
                  ${!isApiKeyConfigured() || isLoading ? 'disabled' : ''}>
            ➤
          </button>
        </div>
      </div>
    `;

    // Screen-reader-only style injection
    if (!document.querySelector('#sr-only-style')) {
      const style = document.createElement('style');
      style.id = 'sr-only-style';
      style.textContent = `.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}`;
      document.head.appendChild(style);
    }

    // Toggle button
    container.querySelector('#chatbot-toggle-btn').addEventListener('click', () => {
      isOpen = !isOpen;
      render();
      if (isOpen) {
        setTimeout(() => {
          const input = container.querySelector('#chatbot-input');
          if (input) { input.focus(); }
        }, 300);
      }
    });

    // Focus trap when dialog is open
    if (isOpen) {
      const dialog = container.querySelector('#chatbot-dialog');
      if (dialog) {
        dialog.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            isOpen = false;
            render();
            const toggle = container.querySelector('#chatbot-toggle-btn');
            if (toggle) toggle.focus();
            return;
          }
          if (e.key !== 'Tab') return;
          const focusable = dialog.querySelectorAll('button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])');
          if (focusable.length === 0) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        });
      }
    }

    // Suggestion chips
    container.querySelectorAll('.chatbot-suggestion').forEach(btn => {
      btn.addEventListener('click', () => {
        sendMessage(btn.dataset.suggestion);
      });
    });

    // Send button
    const sendBtn = container.querySelector('#chatbot-send-btn');
    if (sendBtn) {
      sendBtn.addEventListener('click', () => {
        const input = container.querySelector('#chatbot-input');
        if (input && input.value.trim()) {
          sendMessage(input.value.trim());
        }
      });
    }

    // Enter key
    const input = container.querySelector('#chatbot-input');
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && input.value.trim()) {
          sendMessage(input.value.trim());
        }
      });
    }

    // Scroll to bottom
    const msgContainer = container.querySelector('#chatbot-messages');
    if (msgContainer) {
      msgContainer.scrollTop = msgContainer.scrollHeight;
    }
  };

  async function sendMessage(text) {
    const clean = sanitizeInput(text);
    if (!clean || isLoading) { return; }

    messages.push({ role: 'user', text: clean });
    history.push({ role: 'user', text: clean });
    isLoading = true;
    render();

    trackEvent('chatbot_message', { query: clean.slice(0, 50) });

    try {
      const response = await askGemini(clean, history);
      history.push({ role: 'model', text: response });
      messages.push({ role: 'bot', text: response });
    } catch (err) {
      let errorMsg = t('chat.error');
      if (err.message === 'RATE_LIMITED') {
        errorMsg = '⚠️ Rate limit reached. Please wait a moment before asking another question.';
      } else if (err.message === 'API_KEY_MISSING') {
        errorMsg = t('chat.configKey');
      }
      messages.push({ role: 'bot', text: errorMsg });
    } finally {
      isLoading = false;
      render();
    }
  }

  render();
  return { rerender: render };
}

/**
 * Convert basic markdown to HTML
 * @param {string} text
 * @returns {string}
 */
function formatMarkdown(text) {
  if (!text) { return ''; }
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^[-•]\s+(.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    .split('\n\n').map(p => {
      if (p.includes('<ul>') || p.includes('<li>')) { return p; }
      return `<p>${p}</p>`;
    }).join('')
    .replace(/\n/g, '<br>');
}

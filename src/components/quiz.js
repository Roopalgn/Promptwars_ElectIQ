/**
 * Myth-Busting Quiz with badge system
 * @module components/quiz
 */

import { quizQuestions, badgeThresholds } from '../data/quiz-questions.js';
import { t } from '../utils/i18n.js';
import { getPersistent, setPersistent } from '../utils/cache.js';
import { trackEvent } from '../utils/analytics.js';

/**
 * Quiz state manager (exported for testing)
 */
export class QuizState {
  constructor(questions) {
    this.questions = this.shuffle([...questions]);
    this.currentIndex = 0;
    this.score = 0;
    this.answered = false;
    this.selectedAnswer = null;
    this.isComplete = false;
    this.started = false;
  }

  getCurrentQuestion() {
    return this.questions[this.currentIndex] || null;
  }

  answer(value) {
    if (this.answered) { return false; }
    this.answered = true;
    this.selectedAnswer = value;
    const correct = this.getCurrentQuestion().answer === value;
    if (correct) { this.score += 1; }
    return correct;
  }

  next() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex += 1;
      this.answered = false;
      this.selectedAnswer = null;
      return true;
    }
    this.isComplete = true;
    return false;
  }

  getBadge() {
    const total = Math.min(this.questions.length, 10);
    const pct = this.score;
    return badgeThresholds.find(b => pct >= b.min && pct <= b.max) || badgeThresholds[0];
  }

  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  reset() {
    this.questions = this.shuffle([...quizQuestions]);
    this.currentIndex = 0;
    this.score = 0;
    this.answered = false;
    this.selectedAnswer = null;
    this.isComplete = false;
  }
}

/**
 * Render the Quiz section
 * @param {HTMLElement} container
 */
export function renderQuiz(container) {
  // Use only 10 questions per session
  const state = new QuizState(quizQuestions.slice(0, 10));

  const render = () => {
    container.innerHTML = `
      <div class="section-header reveal">
        <h2 id="quiz-title">${t('quiz.title')}</h2>
        <p>${t('quiz.subtitle')}</p>
      </div>

      <div class="quiz-container reveal">
        ${!state.started ? renderStartScreen() : ''}
        ${state.started && !state.isComplete ? renderQuestion(state) : ''}
        ${state.isComplete ? renderResults(state) : ''}
      </div>
    `;

    attachListeners();
  };

  function renderStartScreen() {
    const highScore = getPersistent('quiz_high_score');
    return `
      <div class="glass-card quiz-card">
        <div style="font-size:4rem;margin-bottom:var(--space-4);">🧠</div>
        <h3 style="margin-bottom:var(--space-2);">${t('quiz.title')}</h3>
        <p style="margin-bottom:var(--space-6);max-width:none;">10 True/False questions about Indian elections.<br>Can you separate myth from fact?</p>
        ${highScore !== null ? `<p style="margin-bottom:var(--space-4);color:var(--color-primary-light);">🏆 Your best: ${highScore}/10</p>` : ''}
        <button class="btn btn-primary" id="quiz-start-btn">${t('quiz.start')}</button>
      </div>
    `;
  }

  function renderQuestion(s) {
    const q = s.getCurrentQuestion();
    const progress = ((s.currentIndex) / s.questions.length) * 100;
    const isCorrect = s.answered ? q.answer === s.selectedAnswer : null;

    return `
      <div class="quiz-progress-bar" role="progressbar" aria-valuenow="${s.currentIndex + 1}" aria-valuemin="1" aria-valuemax="${s.questions.length}">
        <div class="quiz-progress-fill" style="width:${progress}%"></div>
      </div>

      <div class="glass-card quiz-card animate-fade-in-up">
        <div class="quiz-question-num">${t('quiz.question')} ${s.currentIndex + 1} / ${s.questions.length}</div>
        <p class="quiz-question">"${q.question}"</p>
        <span class="badge badge-info quiz-category">${q.category}</span>

        <div class="quiz-answers">
          <button class="quiz-answer-btn true-btn ${s.answered && s.selectedAnswer === true ? (isCorrect ? 'correct' : 'incorrect') : ''} ${s.answered && q.answer === true && s.selectedAnswer !== true ? 'correct' : ''}"
                  id="quiz-true-btn"
                  data-answer="true"
                  ${s.answered ? 'disabled' : ''}
                  aria-label="True">
            ${t('quiz.true')}
          </button>
          <button class="quiz-answer-btn false-btn ${s.answered && s.selectedAnswer === false ? (isCorrect ? 'correct' : 'incorrect') : ''} ${s.answered && q.answer === false && s.selectedAnswer !== false ? 'correct' : ''}"
                  id="quiz-false-btn"
                  data-answer="false"
                  ${s.answered ? 'disabled' : ''}
                  aria-label="False">
            ${t('quiz.false')}
          </button>
        </div>

        ${s.answered ? `
          <div class="quiz-explanation ${isCorrect ? 'correct-exp' : 'incorrect-exp'}" role="alert">
            <p><strong>${isCorrect ? t('quiz.correct') : t('quiz.incorrect')}</strong></p>
            <p>${q.explanation}</p>
          </div>
          <button class="btn btn-primary" id="quiz-next-btn" style="margin-top:var(--space-4);">
            ${s.currentIndex < s.questions.length - 1 ? t('quiz.next') : `${t('quiz.score')} →`}
          </button>
        ` : ''}
      </div>

      <div style="text-align:center;margin-top:var(--space-4);color:var(--text-muted);font-size:var(--text-sm);">
        Score: ${s.score}/${s.currentIndex + (s.answered ? 1 : 0)}
      </div>
    `;
  }

  function renderResults(s) {
    const badge = s.getBadge();
    // Save high score
    const prev = getPersistent('quiz_high_score') || 0;
    if (s.score > prev) { setPersistent('quiz_high_score', s.score); }

    const shareText = `I scored ${s.score}/10 on the ElectIQ Myth Buster Quiz! ${badge.emoji} ${badge.label} — Test your Indian election knowledge! #BuildwithAI #PromptWarsVirtual`;

    return `
      <div class="glass-card quiz-score-card animate-scale-in">
        <div class="quiz-score-badge">${badge.emoji}</div>
        <h3 class="quiz-score-title" style="color:${badge.color}">${badge.label}</h3>
        <p class="quiz-score-subtitle">${s.score} out of ${s.questions.length} correct</p>

        <div class="quiz-score-actions">
          <button class="btn btn-primary" id="quiz-retry-btn">${t('quiz.retry')}</button>
          <button class="btn btn-secondary" id="quiz-share-btn">📤 ${t('quiz.share')}</button>
        </div>
      </div>
    `;
  }

  function attachListeners() {
    const startBtn = container.querySelector('#quiz-start-btn');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        state.started = true;
        trackEvent('quiz_start');
        render();
      });
    }

    container.querySelectorAll('.quiz-answer-btn:not([disabled])').forEach(btn => {
      btn.addEventListener('click', () => {
        const answer = btn.dataset.answer === 'true';
        state.answer(answer);
        trackEvent('quiz_answer', { question: state.currentIndex + 1, correct: state.getCurrentQuestion().answer === answer });
        render();
      });
    });

    const nextBtn = container.querySelector('#quiz-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => { state.next(); render(); });
    }

    const retryBtn = container.querySelector('#quiz-retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        state.reset();
        state.started = true;
        render();
      });
    }

    const shareBtn = container.querySelector('#quiz-share-btn');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        const badge = state.getBadge();
        const text = `I scored ${state.score}/10 on the ElectIQ Myth Buster Quiz! ${badge.emoji} ${badge.label} — Test your Indian election knowledge! #BuildwithAI #PromptWarsVirtual`;
        if (navigator.share) {
          navigator.share({ title: 'ElectIQ Quiz Score', text }).catch(() => {});
        } else {
          navigator.clipboard.writeText(text).then(() => {
            shareBtn.textContent = '✓ Copied!';
            setTimeout(() => { shareBtn.textContent = `📤 ${t('quiz.share')}`; }, 2000);
          }).catch(() => {});
        }
        trackEvent('quiz_share', { score: state.score });
      });
    }
  }

  render();
  return { rerender: render };
}

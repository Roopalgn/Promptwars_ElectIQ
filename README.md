# 🗳️ ElectIQ — India's Smartest Election Education Assistant

> **Know Your Vote. Own Your Voice.**

An interactive, AI-powered web application that helps Indian citizens understand the election process — from voter registration to result declaration. Built with Google Gemini AI, Google Charts, and modern web technologies.

🔗 **Live Demo**: *[Deployed URL]*

---

## 📋 Chosen Vertical

**Challenge 2: Election Process Education**

> Create an assistant that helps users understand the election process, timelines, and steps in an interactive and easy-to-follow way.

---

## ✨ Key Features

### 1. 📍 Interactive 6-Step Journey Map
A visual, clickable walkthrough of the entire Indian election process — from voter registration to counting day. Each step includes detailed explanations, key points, and "Did You Know?" facts. Fully keyboard-navigable with ARIA tab roles.

### 2. 💬 AI Q&A Chatbot (Google Gemini)
A conversational AI assistant powered by **Google Gemini 2.0 Flash** that answers free-form questions about Indian elections in plain language. Features include:
- Streaming responses with typing indicator
- Suggested question chips for quick access
- Rate limiting (10 requests/minute) with exponential backoff
- Input sanitization via DOMPurify before API calls
- Conversation history context (last 8 turns)

### 3. 📅 Election Timeline (Google Charts)
An interactive **Google Charts Timeline** visualization showing all 7 phases of the 2024 Lok Sabha election — from announcement to government formation. Includes phase detail cards with constituency breakdowns.

### 4. 🧠 Myth Buster Quiz
20 True/False questions across 3 categories (Voter Rights, EVM & Process, Deadlines & Rules). Features:
- Animated correct/incorrect feedback
- Badge system: Beginner → Informed Voter → Election Expert → Democracy Champion
- Persistent high score via localStorage
- Share score via Web Share API / clipboard

### 5. 📖 Searchable Glossary
37+ Indian election terms with Hindi translations and plain-language definitions. Features debounced real-time search, alphabetical filtering, and highlighted matching.

### 6. 📍 Polling Booth Finder (Google Maps)
Google Maps Embed showing ECI offices, plus direct links to the Electoral Roll search, NVSP voter registration portal, and Voter Helpline (1950).

### 7. 🌐 Bilingual Support (English + Hindi)
Complete UI localization with 50+ translated strings. Language preference persists to localStorage.

### 8. 🔒 Security Hardening
- DOMPurify sanitization on all user inputs AND AI responses
- Content Security Policy (CSP) meta tag
- API key stored in `.env` (never in bundle)
- Rate limiting prevents API abuse
- No `eval()` or `innerHTML` without sanitization
- ESLint rules enforce `no-eval`, `no-new-func`

### 9. ♿ WCAG 2.1 AA Accessibility
- Skip-to-main navigation link
- Full keyboard navigation (arrow keys for journey map)
- ARIA roles, labels, and live regions throughout
- `prefers-reduced-motion` respected
- Color contrast ≥ 4.5:1
- Minimum 44px touch targets

### 10. 📱 Progressive Web App (PWA)
- Service Worker with cache-first strategy
- Offline fallback for static assets
- Installable on mobile devices

---

## 🔧 Google Services Used

| Service | Usage |
|---|---|
| **Google Gemini 2.0 Flash** | AI chatbot for election Q&A with system prompts and safety settings |
| **Google Charts (Timeline)** | Interactive election phase timeline visualization |
| **Google Maps Embed API** | Polling booth / ECI office map |
| **Google Fonts** | Inter + Outfit typography |

---

## 🏗️ Architecture

```
electiq/
├── index.html              # Entry point (semantic HTML5, CSP headers)
├── package.json            # Vite + Vitest + ESLint
├── vite.config.js          # Build config with test setup
├── .eslintrc.json          # Code quality enforcement
├── .env.example            # API key template (no secrets)
├── Dockerfile              # Cloud Run deployment
│
├── src/
│   ├── main.js             # App bootstrap & component orchestration
│   ├── api/gemini.js       # Gemini client (rate-limited, sanitized)
│   ├── components/         # 7 modular UI components
│   ├── data/               # Static content (bilingual, 4 data files)
│   ├── utils/              # Sanitizer, i18n, cache, analytics
│   └── styles/             # Design system (3 CSS files)
│
├── public/                 # PWA manifest & service worker
└── tests/                  # 5 test files, 30+ test cases
```

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js 18+
- npm 9+

### Setup

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/electiq.git
cd electiq

# Install dependencies
npm install

# Configure API key
cp .env.example .env
# Edit .env and add your Gemini API key from https://aistudio.google.com

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run tests with coverage |
| `npm run lint` | Run ESLint |

---

## 🔑 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_GEMINI_KEY` | Yes | Google Gemini API key from [AI Studio](https://aistudio.google.com) |

> ⚠️ The `.env` file is git-ignored. Only `.env.example` (with placeholder values) is committed.

---

## 🧪 Testing

```bash
npm test
```

Runs **30+ unit tests** across 5 test files:

- `sanitizer.test.js` — XSS prevention (script injection, attribute injection, edge cases)
- `i18n.test.js` — Translation resolution, language toggling, localStorage persistence
- `quiz.test.js` — Score management, badge thresholds, shuffle, reset
- `journey-map.test.js` — Step navigation, bounds checking, visited tracking
- `gemini.test.js` — Input validation, rate limiting, API key detection

---

## 📝 Assumptions

1. **India-focused**: All content is specific to the Indian election process (ECI, Lok Sabha, EVMs)
2. **2024 Election data**: Timeline uses the 2024 Lok Sabha election schedule as reference data
3. **Gemini API key**: Users need their own free API key from Google AI Studio
4. **Modern browser**: Targets ES2022+ browsers (Chrome 90+, Firefox 90+, Safari 15+)
5. **Educational tool**: This is an informational app, not affiliated with the Election Commission of India

---

## ☁️ Deployment (Google Cloud Run)

```bash
# Build and deploy
gcloud run deploy electiq \
  --source . \
  --region asia-south1 \
  --allow-unauthenticated \
  --set-env-vars VITE_GEMINI_KEY=your_key_here
```

---

## 📄 License

MIT

---

*Built with ❤️ using Google Antigravity for PromptWars Virtual Challenge 2*

`#BuildwithAI` `#PromptWarsVirtual`

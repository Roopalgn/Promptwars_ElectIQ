# 🗳️ ElectIQ — India's Smartest Election Education Assistant

> **Know Your Vote. Own Your Voice.**

An interactive, AI-powered Progressive Web App that teaches Indian citizens how the world's largest democracy actually works — from voter registration to result declaration. Built end-to-end with **Google Antigravity** for **PromptWars Virtual Challenge 2 — Election Process Education**.

🔗 **Live Demo**: *[Deploy and paste URL here before submission]*
📦 **Repository**: <https://github.com/Roopalgn/Promptwars>
📝 **Blog**: *[Paste blog URL after publishing]*

---

## 📋 Chosen Vertical

**Challenge 2: Election Process Education**

> *"Create an assistant that helps users understand the election process, timelines, and steps in an interactive and easy-to-follow way."*

ElectIQ goes beyond a static FAQ — it is a **multi-modal, conversational, accessible, offline-capable education platform** with 13 interactive learning modules and a Gemini-powered tutor.

---

## 🎯 Judging Criteria — Quick Map

| Criterion | Where It Lives | Highlight |
|---|---|---|
| **Code Quality** | [src/](src/), [.eslintrc.json](.eslintrc.json) | ESM modules, `safeRender` error isolation, JSDoc, ESLint clean, zero framework runtime |
| **Security** | [src/utils/sanitizer.js](src/utils/sanitizer.js), [index.html](index.html), [src/api/gemini.js](src/api/gemini.js) | DOMPurify on every render, strict CSP, rate-limited API, no `eval`, key never bundled — see [SECURITY.md](SECURITY.md) |
| **Efficiency** | [src/utils/cache.js](src/utils/cache.js), [public/sw.js](public/sw.js), [index.html](index.html) | Critical CSS inlined, async stylesheet, SW stale-while-revalidate, Gemini response cache, code-split via Vite |
| **Testing** | [tests/](tests/), [vite.config.js](vite.config.js) | 13 Vitest files with jsdom, runs with `--coverage` (v8) |
| **Accessibility** | [src/styles/main.css](src/styles/main.css), every component | WCAG 2.1 AA: skip-link, ARIA roles, keyboard nav, `prefers-reduced-motion`, 44 px touch targets, dark/light/system theme — see [ACCESSIBILITY.md](ACCESSIBILITY.md) |
| **Google Services** | [src/api/gemini.js](src/api/gemini.js), [src/components/timeline.js](src/components/timeline.js), [src/components/maps.js](src/components/maps.js) | Gemini (chat) + Charts (timeline) + Maps Embed + Fonts + Analytics + Cloud Run |

---

## ✨ Feature Tour (13 Modules)

| # | Module | What it does |
|---|---|---|
| 1 | **Hero + Countdown** | Live countdown to the next election milestone |
| 2 | **6-Step Journey Map** | Tabbed walkthrough of the election lifecycle, fully keyboard-driven |
| 3 | **Election Timeline** | Google Charts Timeline of all 7 phases of Lok Sabha 2024 |
| 4 | **Eligibility Checker** | Decision-tree quiz that tells you if you can vote |
| 5 | **First-Time Voter Checklist** | Interactive checklist persisted to `localStorage` |
| 6 | **EVM + VVPAT Simulator** | Hands-on simulation of casting a vote, with VVPAT slip |
| 7 | **Polling-Day Simulator** | Decision scenarios at the booth |
| 8 | **Myth-Buster Quiz** | 20 T/F questions, badges (Beginner → Democracy Champion), high-score, **X share intent** |
| 9 | **Voter Pledge** | Sign-and-share digital pledge |
| 10 | **Glossary** | 37+ terms (EN + HI) with debounced search |
| 11 | **Polling Booth Finder** | Tabbed form (EPIC No. or State + District + Pincode) deep-linking to `electoralsearch.eci.gov.in`; **no PII stored locally** |
| 12 | **Maps + Helpline** | Google Maps embed + ECI helpline (1950) |
| 13 | **Gemini Chatbot** | Streaming AI tutor with voice input (Web Speech API), suggested chips, offline-knowledge fallback |

Plus: **Dark / Light / System theme**, **bilingual (EN + HI)**, **PWA install + offline**, **service-worker update banner**, and a glassmorphic UI with motion-reduced fallbacks.

---

## 🔧 Google Services Used

| Service | How It's Used |
|---|---|
| **Google Gemini** | Streaming chat with model fallback chain `gemini-flash-latest → gemini-2.5-flash → gemini-2.0-flash`, system prompt, safety settings, retry with exponential back-off, in-memory response cache. See [src/api/gemini.js](src/api/gemini.js). |
| **Google Charts** | Interactive Timeline visualisation of the 2024 Lok Sabha phases ([src/components/timeline.js](src/components/timeline.js)). |
| **Google Maps Embed** | Polling-booth & ECI office map ([src/components/maps.js](src/components/maps.js)). |
| **Google Fonts** | Inter + Outfit, preconnected, swap-displayed. |
| **Google Analytics 4** | Privacy-friendly event tracking gated behind `window.__GA_ID__` ([src/utils/analytics.js](src/utils/analytics.js)). |
| **Google Cloud Run** | One-command deploy via [Dockerfile](Dockerfile). |
| **Web Speech API (Chrome / Google engine)** | Hindi + English voice input on the chatbot. |

---

## 🏗️ Architecture

```
electiq/
├── index.html                # Entry — strict CSP, critical CSS inline, async app.css, theme bootstrap
├── package.json              # Vite + Vitest + ESLint
├── vite.config.js            # Build + Vitest config (jsdom, coverage)
├── .eslintrc.json            # Code-quality enforcement (no-eval, no-new-func, etc.)
├── .env.example              # API key template (no secrets)
├── Dockerfile                # Cloud Run deploy
├── SECURITY.md               # Threat model + mitigations
├── ACCESSIBILITY.md          # WCAG 2.1 AA conformance notes
│
├── src/
│   ├── main.js               # Bootstrap, SPA router, SW registration, update-banner
│   ├── api/
│   │   ├── gemini.js         # Gemini client (rate-limit, retry, sanitize, model fallback)
│   │   └── offline-knowledge.js  # Curated offline KB for graceful degradation
│   ├── components/           # 13 modular UI components, each independently rendered
│   ├── data/                 # Bilingual static content (steps, glossary, quiz, timeline, scenarios)
│   ├── utils/                # sanitizer, i18n, cache, analytics, performance, theme
│   └── styles/               # Design system (main, components, animations, evm-pledge)
│
├── public/
│   ├── app.css               # Compiled stylesheet (loaded async)
│   ├── manifest.json         # PWA manifest
│   └── sw.js                 # Service Worker v3 — stale-while-revalidate + SKIP_WAITING
│
└── tests/                    # 13 Vitest files with jsdom
```

---

## 🚀 Run Locally

### Prerequisites
- Node.js 18+ and npm 9+
- A free Gemini API key from <https://aistudio.google.com>

### Setup

```bash
git clone https://github.com/Roopalgn/Promptwars.git
cd Promptwars
npm install
cp .env.example .env       # add your VITE_GEMINI_KEY
npm run dev
```

Opens at `http://localhost:3000`.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build (minified, code-split) |
| `npm run preview` | Serve the production build locally |
| `npm test` | Vitest run with v8 coverage |
| `npm run test:watch` | Vitest watch mode |
| `npm run lint` | ESLint over `src/` |

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_GEMINI_KEY` | Yes | Google Gemini API key |
| `VITE_GA_ID` | No | Google Analytics 4 measurement ID (e.g. `G-XXXXXXXXXX`) |

> `.env` is git-ignored. Only `.env.example` is committed.

---

## 🔒 Security Highlights

See [SECURITY.md](SECURITY.md) for the full threat-model. Quick summary:

- **CSP** — strict `default-src 'self'` with explicit allow-lists in [index.html](index.html)
- **XSS** — every dynamic string passes through DOMPurify ([src/utils/sanitizer.js](src/utils/sanitizer.js)) before reaching the DOM, including Gemini responses
- **Injection** — booth-finder + chat input length-capped, regex-validated, URL-encoded via `URLSearchParams`
- **Rate limiting** — token-bucket limiter (10 req/min) on Gemini, plus exponential back-off on 429/5xx
- **Secrets** — API key never inlined; build-time env via `import.meta.env`; key absence falls back to offline KB
- **Dependencies** — only DOMPurify and marked are runtime deps
- **No eval** — enforced by ESLint rules `no-eval`, `no-new-func`, `no-implied-eval`

---

## ♿ Accessibility

See [ACCESSIBILITY.md](ACCESSIBILITY.md) for the WCAG 2.1 AA checklist. Highlights:

- Skip-to-main link, semantic landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`)
- Full keyboard support: arrow-key tab navigation on the journey map, focus rings everywhere, no keyboard traps
- ARIA — `role="tablist"`, `aria-selected`, `aria-live`, `aria-label` throughout
- `prefers-reduced-motion` honoured by every animation, including theme transition and SW update banner
- `prefers-color-scheme` drives the default theme; manual override persists to `localStorage`
- Minimum 44 × 44 px touch targets
- Color contrast ≥ 4.5:1 in both dark and light themes (verified)
- Voice input via Web Speech API for users who can't type

---

## ⚡ Performance

- **Critical CSS** inlined in `<head>` for sub-second first paint
- Main stylesheet loaded via `media="print" onload="this.media='all'"` trick (non-render-blocking)
- Theme attribute applied **synchronously** before paint to avoid flash-of-incorrect-theme
- **Service Worker v3** uses stale-while-revalidate; new versions surface a non-blocking refresh banner that the user dismisses or accepts
- Gemini responses cached (LRU) in [src/utils/cache.js](src/utils/cache.js)
- Vite production build is code-split and minified
- Web Vitals (CLS / LCP / INP) tracked via [src/utils/performance.js](src/utils/performance.js)

---

## 🧪 Testing

```bash
npm test
```

13 Vitest suites with jsdom + v8 coverage:

| File | Covers |
|---|---|
| [tests/sanitizer.test.js](tests/sanitizer.test.js) | XSS prevention (script + attribute + `javascript:` URL injection) |
| [tests/i18n.test.js](tests/i18n.test.js) | Translation resolution, language toggle, persistence |
| [tests/quiz.test.js](tests/quiz.test.js) | Score, badges, shuffle, reset |
| [tests/journey-map.test.js](tests/journey-map.test.js) | Step nav, bounds, visited tracking |
| [tests/gemini.test.js](tests/gemini.test.js) | Input validation, rate limiting, key detection |
| [tests/analytics.test.js](tests/analytics.test.js) | Event-shape validation, GA gating |
| [tests/cache.test.js](tests/cache.test.js) | LRU eviction, TTL |
| [tests/glossary.test.js](tests/glossary.test.js) | Search, alphabetical filter, highlighting |
| [tests/header.test.js](tests/header.test.js) | Sidebar mount, theme cycle, lang toggle |
| [tests/maps.test.js](tests/maps.test.js) | Booth-finder URL building, sanitization |
| [tests/election-steps.test.js](tests/election-steps.test.js) | Step data shape |
| [tests/offline-knowledge.test.js](tests/offline-knowledge.test.js) | Offline KB lookup |
| [tests/timeline.test.js](tests/timeline.test.js) | Phase data shape |

---

## ☁️ Deploy to Google Cloud Run

```bash
gcloud run deploy electiq \
  --source . \
  --region asia-south1 \
  --allow-unauthenticated \
  --set-env-vars VITE_GEMINI_KEY=your_key_here
```

The included [Dockerfile](Dockerfile) builds the static bundle and serves it via nginx.

---

## 📝 Assumptions

1. **India-focused** — every fact, date, and term targets the Indian electoral system.
2. **2024 Lok Sabha schedule** is used as illustrative reference data.
3. **Users bring their own Gemini key** (free tier is sufficient).
4. **Modern evergreen browser** — Chrome 90+, Firefox 90+, Safari 15+, Edge 90+.
5. **Educational tool only** — *not* affiliated with the Election Commission of India. The booth-finder deep-links to `electoralsearch.eci.gov.in`; no PII is stored locally.

---

## 🙏 Credits

- **Election Commission of India** — public information used as factual ground truth.
- **Google Antigravity, Gemini, Charts, Maps, Cloud Run** — the Google stack that made this possible.
- **DOMPurify, marked, Vite, Vitest, ESLint** — open-source giants whose shoulders we stand on.

---

## 📄 License

MIT — fork it, remix it, get more Indians to the polling booth.

---

*Built end-to-end with Google Antigravity for **PromptWars Virtual Challenge 2** by [@Roopalgn](https://github.com/Roopalgn).*

`#BuildwithAI` `#PromptWarsVirtual`

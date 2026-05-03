# Building ElectIQ: How I Used Google Gemini + Antigravity to Ship an Election Education App in 14 Days

> A build-in-public journal for PromptWars Virtual Challenge 2 — Election Process Education

---

## The Problem That Got Me Started

India conducts the largest democratic exercise on the planet — nearly a billion eligible voters, seven phases spread across weeks, 12 accepted photo-ID types, and an acronym salad of EVMs, VVPATs, EPICs, and NVSPs that even politically aware adults find confusing.

I've met college students who didn't vote because they thought "Form 6" was a tax document. I've met salaried professionals who assumed their Aadhaar card *is* their voter ID. The information exists — on the ECI website, on NVSP, in Election Commission PDFs — but it's scattered, jargon-heavy, and never designed for a first-time voter scrolling on their phone.

**What if one app could replace all of that?** Not a chatbot that parrots a rulebook, but a *multi-modal learning platform* — interactive walkthroughs, simulations, quizzes, and yes, a smart tutor when you still have questions.

That's ElectIQ.

---

## What I Built

ElectIQ is a **Progressive Web App** with 13 learning modules, all in one vanilla-JS, zero-framework codebase. Here's the lineup:

### 🗺️ The Journey Map
A tabbed, keyboard-navigable walkthrough of the 6 stages of an Indian election — from the announcement by the Election Commission to the government formation. Each step has key points, timelines, and "Did You Know?" trivia. The arrow-key navigation uses proper `role="tablist"` / `aria-selected` semantics so screen-reader users get the same experience.

### 🤖 The Gemini Chatbot
The core of the "assistant" requirement. It talks to **Google Gemini** (`gemini-flash-latest`, with fallback to `gemini-2.5-flash` and `gemini-2.0-flash`) through a streaming connection. A system prompt pins it to Indian-election topics, keeps responses under 200 words, and forces non-partisan, ECI-sourced answers.

But what if the API key isn't set, or the network drops? I built a **curated offline knowledge base** — 13 FAQ entries covering registration, EVMs, VVPAT, NOTA, postal ballots, NRI voting, the silence period, cVIGIL, and more. The app seamlessly falls back to it. The user always gets an answer.

I also added **voice input** via the Web Speech API. You can tap the microphone and ask your question in Hindi or English — the transcript auto-submits once the utterance is final.

### 🗳️ The EVM + VVPAT Simulator
Users can experience the real voting flow used in Indian polling booths: pick a candidate on the ballot unit, press the blue button, watch the VVPAT slip appear for 7 seconds, then see it drop into a sealed box. It's all fictional candidates (Asha Verma, Ravi Kumar, NOTA…) with fictional parties — strictly non-partisan — but it demystifies the hardware that over 900 million voters will use.

### 🧠 The Myth-Buster Quiz
20 true/false questions across three categories: Voter Rights, EVM & Process, and Deadlines & Rules. There's badge progression (Beginner → Informed Voter → Election Expert → Democracy Champion), a confetti burst on 80%+, persistent high scores, and a dedicated **X/Twitter share-intent button** so you can flex your Democracy Champion badge.

### ✅ Eligibility Checker + Checklist
A 4-question decision tree that tells you if you can vote — and what to fix if you can't. Plus a first-time-voter checklist that persists to `localStorage` so you can tick off items over days.

### 📍 Polling Booth Finder
A tabbed form: search by EPIC number, or by State + District + Pincode. On submit, it deep-links directly to `electoralsearch.eci.gov.in` with URL-encoded parameters. No personal data is ever stored locally — it's a one-shot redirect. The inputs are sanitized and regex-validated before the URL is built.

### 📅 Google Charts Timeline
An interactive **Google Charts Timeline** showing all seven phases of the 2024 Lok Sabha election. Each phase is clickable for constituency breakdowns.

### ✊ Voter Pledge
Sign a digital pledge, get a shareable certificate. It's a small touch, but it drives emotional commitment to showing up on polling day.

### 📖 Glossary, Maps, Countdown
37+ election terms in English and Hindi with debounced real-time search. A Google Maps Embed showing ECI offices. A live countdown to the next election milestone.

---

## The Google Stack

| Service | Role |
|---|---|
| **Google Gemini** | The conversational AI tutor — model fallback chain, streaming, safety settings |
| **Google Charts** | Timeline visualization |
| **Google Maps Embed** | Polling booth / ECI office map |
| **Google Fonts** | Inter + Outfit, preconnected with `display=swap` |
| **Google Analytics 4** | Privacy-friendly Web Vitals and event tracking (gated behind env var) |
| **Google Cloud Run** | One-command deploy from Dockerfile |
| **Web Speech API** | Voice input in Hindi + English (Chrome's Google engine) |
| **Google Antigravity** | The entire development environment — every module, every test, every commit |

---

## How I Thought About Security

When you build an app that takes user input *and* feeds it to an LLM *and* renders the LLM's output as rich HTML, you're sitting at the intersection of three XSS vectors. Here's what I did:

1. **DOMPurify everywhere.** User input goes through a *strict* config that strips ALL HTML tags. Gemini output goes through a *rich* config that allows only formatting tags (`<b>`, `<ul>`, `<p>`, etc.) — no `<script>`, no event handlers, no `javascript:` URLs.

2. **Content Security Policy.** A strict CSP in `index.html` with `default-src 'self'` and explicit allow-lists for Google domains. No `eval()`, no `new Function()` — enforced by ESLint rules (`no-eval`, `no-new-func`, `no-implied-eval`).

3. **Rate limiting.** A token-bucket limiter (10 requests/minute) on the Gemini client, with exponential backoff on 429/5xx. This protects the user's API quota and prevents runaway costs.

4. **No secrets in the bundle.** The Gemini key loads from `import.meta.env.VITE_GEMINI_KEY` at build time. `.env` is git-ignored. If the key is missing, the app degrades gracefully to the offline KB.

5. **URL injection prevention.** The booth-finder builds its outbound URL using `URLSearchParams` against a fixed origin — user values are encoded, not concatenated.

I documented the full threat model in a dedicated [SECURITY.md](https://github.com/Roopalgn/Promptwars/blob/main/SECURITY.md).

---

## Accessibility Was Not an Afterthought

I'm tired of accessibility being a checkbox item tacked on after everything else ships. In ElectIQ it's woven into every component:

- **Skip-to-main link** in the critical CSS (visible on first Tab keypress, before any external stylesheet loads).
- **Full keyboard navigation**: arrow keys on the journey map, Enter/Space/Escape on the sidebar, Tab through every interactive element. No keyboard traps.
- **ARIA semantics**: `role="tablist"`, `aria-selected`, `aria-live="polite"` on the quiz score and SW update banner, `aria-busy` on the chatbot streaming indicator.
- **`prefers-reduced-motion`**: every animation — theme transition, scroll reveal, confetti, card spotlight, banner slide-in — has a reduced-motion fallback.
- **Dark / Light / System theme**: defaults to your OS preference (`prefers-color-scheme`), with a manual toggle that cycles dark → light → system. Theme is applied synchronously in a `<script>` before paint — zero flash-of-incorrect-theme.
- **Voice input**: for users who can't type or have low literacy, the chatbot accepts spoken questions via the Web Speech API.
- **44 px minimum touch targets** on every button, tab, and toggle.
- **Color contrast ≥ 4.5:1** in both themes, verified.

Full WCAG 2.1 AA checklist in [ACCESSIBILITY.md](https://github.com/Roopalgn/Promptwars/blob/main/ACCESSIBILITY.md).

---

## Performance Decisions

- **Critical CSS inlined** in `<head>`: design tokens, body, header skeleton, skip-link, and loading spinner — enough to paint a usable first frame before any external CSS arrives.
- **Async main stylesheet**: `app.css` loads via the `media="print" onload="this.media='all'"` trick to avoid render-blocking.
- **Service Worker v3** with stale-while-revalidate. When a new version is ready, a non-blocking banner slides up from the bottom: "A new version of ElectIQ is available. [Refresh] [✕]". The refresh button sends a `SKIP_WAITING` message to the waiting worker, and the page reloads once the new worker activates.
- **Gemini response cache**: an LRU in-memory cache so repeated questions don't cost an API call.
- **Web Vitals tracking**: LCP, FID, and CLS are observed and reported to GA4 automatically.

---

## Testing

13 Vitest suites with jsdom and v8 coverage:

- `sanitizer.test.js` — script injection, attribute injection, `javascript:` URL injection, edge cases
- `gemini.test.js` — input validation, rate limiting, API key detection
- `quiz.test.js` — score, badges, shuffle, reset
- `journey-map.test.js` — step navigation, bounds, visited tracking
- `i18n.test.js` — translation resolution, language toggle, persistence
- `analytics.test.js` — event shape, GA gating
- `cache.test.js` — LRU eviction, TTL
- `glossary.test.js` — search, alphabetical filter, highlighting
- `header.test.js` — sidebar mount, theme cycle
- `maps.test.js` — booth-finder URL building, sanitization
- `election-steps.test.js`, `offline-knowledge.test.js`, `timeline.test.js` — data-shape validation

Every test runs headlessly in CI. No browser needed.

---

## The Build-in-Public Experience with Antigravity

This was my first time building an entire product through prompt-driven development. A few things that surprised me:

1. **Coherence at scale.** By the time I had 13 components, 6 utility modules, and 13 test files, I expected things to diverge — inconsistent naming, mismatched i18n keys, forgotten ARIA attributes. But because every feature went through Antigravity in a single prompt loop (code → i18n → tests → a11y → security review), the codebase stayed remarkably consistent.

2. **Security came free.** I didn't have to remember to add DOMPurify to each new component — it was part of the generation pattern. Same with rate limiting, same with `escapeHtml`.

3. **The 80/20 of polish.** The last 20% — dark/light theme transition, critical CSS, service worker update banner, the booth-finder deep-link — took as much creative thought as the first 80%, but the *implementation* time collapsed because Antigravity could scaffold the CSS, the i18n keys, and the event tracking in one shot.

4. **Zero-framework was the right call.** With vanilla JS + Vite, my production bundle is tiny, my test setup is trivial, and there are no framework-specific footguns to debug. Antigravity handled the boilerplate that usually makes people reach for React.

---

## What I'd Do Differently

- **Server-side Gemini proxy.** Right now the API key lives in the browser's build. A server-side proxy would protect quota and let me add server-side caching.
- **Subresource Integrity (SRI)** on third-party scripts. It's on the roadmap.
- **Audio descriptions** for the EVM simulator animation — currently it has text alternatives but not a full audio walkthrough.
- **More languages.** Hindi covers a huge audience, but Tamil, Bengali, and Telugu would unlock the next tranche.

---

## Try It

- 🔗 **Live demo**: *[https://electiq-791436037194.asia-south1.run.app/](https://electiq-791436037194.asia-south1.run.app/)*
- 💻 **GitHub**: [github.com/Roopalgn/Promptwars](https://github.com/Roopalgn/Promptwars)
- 📄 **SECURITY.md**: [Threat model](https://github.com/Roopalgn/Promptwars/blob/main/SECURITY.md)
- ♿ **ACCESSIBILITY.md**: [WCAG checklist](https://github.com/Roopalgn/Promptwars/blob/main/ACCESSIBILITY.md)

If you're a first-time voter, I hope this app makes the process feel less opaque. If you're a builder, clone it, fork it, make it better.

---

*Built end-to-end with Google Antigravity for PromptWars Virtual Challenge 2 by [@Roopalgn](https://github.com/Roopalgn).*

`#BuildwithAI` `#PromptWarsVirtual`

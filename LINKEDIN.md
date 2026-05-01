# 📣 LinkedIn Post — ElectIQ for PromptWars Virtual Challenge 2

> Three caption variants. Pick whichever fits your voice; attach a screenshot or short screen-recording of the app (hero + chatbot + quiz badge moment work great).

---

## ✨ Variant 1 — The Mission Hook (recommended)

🗳️ **India runs the world's largest democracy — but most first-time voters still Google "what is an EPIC card?" the night before polling day.**

So this fortnight on **#PromptWarsVirtual** I built **ElectIQ** — an AI-powered Election Education Assistant that turns 10 confusing portals into one calm, bilingual, offline-capable PWA.

🎯 What's inside:
• 6-step journey map of the Indian election lifecycle
• Hands-on EVM + VVPAT simulator
• 20-question myth-buster quiz with badges
• 37-term glossary in English + हिन्दी
• Polling-booth finder that deep-links into electoralsearch.eci.gov.in (zero PII stored)
• A **Gemini-powered chatbot** with voice input that answers "Can I vote if I moved cities?" in plain language

🛠️ The Google stack:
• **Google Gemini** (`gemini-flash-latest` with model fallback) for the conversational tutor
• **Google Charts** for the Lok Sabha 2024 timeline
• **Google Maps Embed** for ECI offices
• **Google Cloud Run** for one-command deploy
• **Google Antigravity** as the cockpit — every component, every test, every accessibility tweak shipped through prompt-driven development

🔒 Built secure by default: strict CSP, DOMPurify on every render (including LLM output), token-bucket rate limiter, no API key in the bundle, ESLint blocking `eval`.

♿ Built accessible: WCAG 2.1 AA, full keyboard nav, `prefers-reduced-motion`, dark/light/system theme, 44 px touch targets, voice input via Web Speech API.

⚡ Built fast: critical CSS inlined, async stylesheet, service-worker stale-while-revalidate, non-blocking "new version available" banner.

The whole thing — 13 modules, 13 test suites, bilingual, PWA-installable — went from blank repo to live in **two weeks of vibe-coding** with Antigravity.

If you've ever skipped voting because the process felt opaque: this app is for you. If you're a builder: clone it, fork it, ship your own.

🔗 Live demo: [paste URL]
💻 Code: https://github.com/Roopalgn/Promptwars
📖 Blog: [paste blog URL]

#BuildwithAI #PromptWarsVirtual @googlefordevelopers @hack2skill

---

## ⚡ Variant 2 — The Tech-Builder Angle

Two weeks. Zero frameworks. One mission: make Indian election education actually *fun* to use.

Just shipped **ElectIQ** for **#PromptWarsVirtual** Challenge 2 — a vanilla-JS PWA built end-to-end inside **Google Antigravity**.

Highlights:
✅ 13 interactive modules (journey map, EVM simulator, quiz, timeline, glossary…)
✅ **Gemini** chatbot with streaming, voice input, model fallback, offline KB
✅ **Google Charts** + **Maps Embed** + **Cloud Run**
✅ Strict CSP, DOMPurify, rate limiting, no `eval`
✅ WCAG 2.1 AA, dark/light/system theme, EN + हिन्दी
✅ Service worker v3 with non-blocking update banner
✅ Critical CSS inlined → sub-second first paint
✅ 13 Vitest suites with v8 coverage

Antigravity didn't just write code — it kept the *whole* repo coherent: every new feature came with i18n keys, tests, a11y review, and security checks in the same prompt loop. That's the unlock.

🔗 Demo: [paste URL]
💻 Code: https://github.com/Roopalgn/Promptwars
📝 Blog: [paste URL]

#BuildwithAI #PromptWarsVirtual @googlefordevelopers @hack2skill

---

## 💡 Variant 3 — The Short & Punchy

Built **ElectIQ** in 14 days for **#PromptWarsVirtual** — an AI tutor that demystifies Indian elections.

Gemini chatbot 🤖 · EVM simulator 🗳️ · Bilingual quiz 🧠 · Booth finder 📍 · Offline PWA ⚡ · WCAG AA ♿

100% built with **Google Antigravity**. Vanilla JS, zero framework, full Google stack (Gemini + Charts + Maps + Cloud Run).

Try it → [paste URL]
Code → https://github.com/Roopalgn/Promptwars

#BuildwithAI #PromptWarsVirtual @googlefordevelopers @hack2skill

---

## 🖼️ Suggested image / video

- **Photo of your setup**: monitor showing ElectIQ hero + Antigravity editor side-by-side. (Required by the brief.)
- **Or a 30-second screen recording** that walks through: Hero → switch theme to light → open Hindi → ask the chatbot a question → take 3 quiz questions → show the booth finder.

## ✅ Pre-post checklist

- [ ] Screenshot or video attached
- [ ] Live demo URL filled in
- [ ] Blog post URL filled in
- [ ] Hashtags: `#BuildwithAI` `#PromptWarsVirtual`
- [ ] Tags: `@googlefordevelopers` `@hack2skill`
- [ ] Repo set to **public** ✅
- [ ] Single branch (`main`) ✅
- [ ] Repo size < 10 MB ✅

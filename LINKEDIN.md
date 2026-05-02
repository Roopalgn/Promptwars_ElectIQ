# 📣 LinkedIn Post — Final (Copy-Paste Ready)

> Attach a screenshot of your setup (monitor showing the ElectIQ hero + Antigravity side-by-side) or a short screen recording. Then copy the caption below, fill in the two placeholder URLs, and post.

---

🗳️ **India runs the world's largest democracy — but most first-time voters still Google "what is an EPIC card?" the night before polling day.**

So this fortnight I built **ElectIQ** for #PromptWarsVirtual Challenge 2 — an AI-powered Election Education Assistant that turns 10 confusing government portals into one calm, bilingual, offline-capable PWA.

What's inside — 13 interactive modules:
🗺️ 6-step journey map of the election lifecycle
🗳️ Hands-on EVM + VVPAT voting simulator
🧠 20-question myth-buster quiz with badges
📖 37-term glossary in English + हिन्दी
📍 Polling-booth finder (deep-links to electoralsearch.eci.gov.in — zero PII stored)
🤖 Gemini-powered chatbot with voice input that answers "Can I vote if I moved cities?" in plain language

The Google stack that made it possible:
→ Google Gemini (streaming chat, model fallback chain, offline KB)
→ Google Charts (Lok Sabha 2024 timeline)
→ Google Maps Embed (ECI offices)
→ Google Cloud Run (one-command deploy)
→ Google Antigravity (every component, test, and a11y tweak — built through prompting)

🔒 Secure: strict CSP, DOMPurify on every render incl. LLM output, token-bucket rate limiter, no API key in the bundle.
♿ Accessible: WCAG 2.1 AA, keyboard nav, prefers-reduced-motion, dark/light/system theme, 44 px touch targets, voice input.
⚡ Fast: critical CSS inlined, async stylesheet, SW stale-while-revalidate, sub-second first paint.
🧪 Tested: 13 Vitest suites with v8 coverage.

13 modules, 13 test files, bilingual, PWA-installable — blank repo to live in two weeks of vibe-coding with Antigravity.

If you've ever skipped voting because the process felt opaque: this app is for you.

🔗 Live demo: [PASTE YOUR DEPLOY URL HERE]
💻 Code: https://github.com/Roopalgn/Promptwars
📝 Blog: [PASTE YOUR BLOG URL HERE]

#BuildwithAI #PromptWarsVirtual @Google for Developers @Hack2skill

---

## ✅ Pre-post checklist

- [ ] Screenshot or video attached (required by brief)
- [ ] Live demo URL filled in
- [ ] Blog post URL filled in
- [ ] Hashtags present: `#BuildwithAI` `#PromptWarsVirtual`
- [ ] Tagged: `@Google for Developers` `@Hack2skill`
- [ ] Repo is public
- [ ] Single branch (`main`)
- [ ] Repo < 10 MB

# 🔒 Security Policy — ElectIQ

ElectIQ is a public-facing educational PWA. We take security seriously because users may search for sensitive information (their voter ID, polling booth, address). This document is the threat-model + mitigation reference for judges and contributors.

---

## Threat Model

| Threat | Surface | Mitigation |
|---|---|---|
| **XSS via user input** | Chatbot prompt, glossary search, booth-finder fields | All inputs pass through DOMPurify ([`src/utils/sanitizer.js`](src/utils/sanitizer.js)) **before** insertion. `textContent` preferred over `innerHTML`; remaining `innerHTML` calls operate on sanitized strings only. |
| **XSS via LLM response** | Gemini chat output | Markdown is parsed by `marked` then re-sanitized by DOMPurify with an allow-list of safe tags; no `<script>`, no event-handler attributes, no `javascript:` URLs survive. |
| **Open redirect** | Booth-finder deep-link | URL is built with `URLSearchParams` against a fixed origin (`https://electoralsearch.eci.gov.in`); user values are URL-encoded, not concatenated. |
| **API key leak** | Bundled JS | Key is loaded via `import.meta.env.VITE_GEMINI_KEY` at build time. `.env` is git-ignored. If the key is missing the app silently degrades to the curated offline knowledge base. |
| **API abuse / cost spike** | Gemini calls | In-app token-bucket rate limiter (10 req/min) + exponential back-off on 429/5xx + LRU response cache. |
| **CSP bypass / 3rd-party injection** | Network | Strict CSP in [`index.html`](index.html): `default-src 'self'`; explicit allow-lists for `script-src`, `style-src`, `frame-src`, `connect-src`. Inline scripts limited to the minimal theme-bootstrap and CSP-allowed `'unsafe-inline'` only as a transitional measure (see Future Work). |
| **PII leakage** | Booth-finder | EPIC numbers, pincodes, and addresses are **never** stored — they are only used to build the outbound URL on form submit. No analytics events carry PII. |
| **Prompt injection** | Gemini chat | System instruction explicitly scopes the assistant to Indian elections; off-topic redirect baked into the system prompt. |
| **Insecure dependencies** | npm tree | Only two runtime deps (`dompurify`, `marked`), both actively maintained. CI-friendly: `npm audit` runs cleanly at submission time. |
| **Code injection via dynamic eval** | Source code | ESLint enforces `no-eval`, `no-new-func`, `no-implied-eval`. No `Function()` constructors anywhere in `src/`. |
| **Service-worker hijack** | `/sw.js` | Same-origin only. SW v3 uses message-based `SKIP_WAITING` so updates are gated by an explicit user gesture (Refresh button). |

---

## Content Security Policy

```http
default-src 'self';
script-src  'self' 'unsafe-inline' https://www.gstatic.com https://www.google.com https://www.googletagmanager.com;
style-src   'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src    https://fonts.gstatic.com;
img-src     'self' data: https://*.googleapis.com https://*.gstatic.com https://www.googletagmanager.com;
connect-src 'self' https://generativelanguage.googleapis.com https://www.google-analytics.com https://analytics.google.com;
frame-src   https://www.google.com https://maps.google.com https://www.google.com/maps;
```

`'unsafe-inline'` for `script-src` is required for the synchronous theme-bootstrap (≈10 lines). It is **not** used for any user data or third-party content.

---

## Reporting a Vulnerability

If you discover a security issue, please open a **private** GitHub Security Advisory on this repo rather than a public issue. We aim to triage within 72 hours.

---

## Future Work

- Move theme-bootstrap to a hashed inline script and drop `'unsafe-inline'` from `script-src`.
- Add Subresource Integrity (SRI) hashes to `gstatic.com` and `googletagmanager.com` script tags.
- Server-side proxy for the Gemini key so a stolen browser bundle cannot exhaust quota.

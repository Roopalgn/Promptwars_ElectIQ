# ♿ Accessibility — ElectIQ

ElectIQ targets **WCAG 2.1 Level AA**. Below is the conformance checklist with file references. Where a criterion is partially met, the gap is documented.

---

## Perceivable

| Criterion | Status | Where |
|---|---|---|
| **1.1.1 Non-text Content** | ✅ | All images either have `alt` text or `aria-hidden="true"` for decorative emoji. SVG icons carry `aria-label` or are inside a labelled button. |
| **1.3.1 Info and Relationships** | ✅ | Semantic landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`); journey map and booth-finder use `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`. |
| **1.3.2 Meaningful Sequence** | ✅ | DOM order matches visual order; CSS Grid does not reorder content. |
| **1.4.1 Use of Color** | ✅ | Quiz feedback uses ✓ / ✗ icons in addition to color; tab activation uses both color and a 2 px primary border-bottom. |
| **1.4.3 Contrast (Minimum)** | ✅ | Verified ≥ 4.5:1 in both dark and light themes for body text and ≥ 3:1 for large text. |
| **1.4.4 Resize Text** | ✅ | All sizing in `rem` / `em` / `%`; no `px` font-sizes. Layout survives 200% zoom. |
| **1.4.10 Reflow** | ✅ | Single-column reflow at 320 px width. No horizontal scroll. |
| **1.4.11 Non-text Contrast** | ✅ | Focus rings, button borders, and icon buttons all meet 3:1 against their backgrounds. |
| **1.4.12 Text Spacing** | ✅ | `line-height: 1.7` in body; no fixed-height containers that clip text. |
| **1.4.13 Content on Hover or Focus** | ✅ | Tooltips dismissible (Escape), hoverable, persistent until dismissed. |

---

## Operable

| Criterion | Status | Where |
|---|---|---|
| **2.1.1 Keyboard** | ✅ | Every interactive element is focusable. Journey map supports `←` `→` `Home` `End` keys. Sidebar opens via Enter/Space, closes via Escape. |
| **2.1.2 No Keyboard Trap** | ✅ | Sidebar focus is moved into the panel on open and returned to the trigger on close. |
| **2.4.1 Bypass Blocks** | ✅ | Skip-to-main link in [`index.html`](index.html), styled in inlined critical CSS so it appears before any external CSS loads. |
| **2.4.3 Focus Order** | ✅ | Tab order matches visual order in every component. |
| **2.4.7 Focus Visible** | ✅ | Global `:focus-visible` ring (3 px, primary color, 2 px offset). |
| **2.5.5 Target Size** | ✅ | Buttons, tab triggers, theme toggle, lang toggle, voice button: all `min-height: 44px; min-width: 44px`. |
| **2.5.8 Target Size (Minimum)** | ✅ | 24 × 24 px minimum for icon-only controls (e.g. SW dismiss button). |
| **2.3.3 Animation from Interactions** | ✅ | `prefers-reduced-motion: reduce` short-circuits glass-card spotlight, theme transition, SW banner slide-in, scroll-reveal. |

---

## Understandable

| Criterion | Status | Where |
|---|---|---|
| **3.1.1 Language of Page** | ✅ | `<html lang="en">` set, updated to `lang="hi"` when user toggles to Hindi. |
| **3.1.2 Language of Parts** | ✅ | Hindi glossary entries within an English page carry `lang="hi"`. |
| **3.2.1 On Focus** | ✅ | No focus event triggers a context change. |
| **3.2.2 On Input** | ✅ | Form submits are explicit (button click). |
| **3.3.1 Error Identification** | ✅ | Booth-finder shows red flash + shake + focus-on-invalid-field. |
| **3.3.2 Labels or Instructions** | ✅ | Every input has a `<label>`; helper text below each. |

---

## Robust

| Criterion | Status | Where |
|---|---|---|
| **4.1.2 Name, Role, Value** | ✅ | All custom controls expose role + name + state via ARIA. |
| **4.1.3 Status Messages** | ✅ | Quiz score and SW update banner use `role="status"` + `aria-live="polite"`; chatbot streaming uses `aria-busy`. |

---

## Beyond AA

- **Voice input** for the chatbot via Web Speech API (Chrome / Edge / Android with Google's engine), giving users with low literacy or motor disabilities an alternative input channel.
- **Bilingual UI** (English + Hindi) with full content parity.
- **Theme system** — Light / Dark / System with smooth transitions that respect `prefers-reduced-motion`.
- **Synchronous theme application** prevents the flash-of-incorrect-theme that disorients users with photosensitive conditions.
- **Offline-first** — service worker keeps the app usable on flaky rural networks.

---

## Manual Testing

- Navigated entire app with **only the keyboard** — every interactive element reachable, every focus state visible.
- Verified with **Chrome Lighthouse** and **axe DevTools** — no critical or serious issues at the time of submission.
- Tested at **320 px** viewport, **200% zoom**, and **dark + light + Windows High-Contrast** modes.
- Smoke-tested with **NVDA** screen reader on Firefox.

---

## Known Gaps

- We do not yet ship audio descriptions of the EVM simulator animation. A text alternative (the visible "Step X of N" hint) is provided.
- The Google Charts Timeline iframe inherits the host library's accessibility; we annotate the surrounding region with `aria-label` so screen readers announce a meaningful summary.

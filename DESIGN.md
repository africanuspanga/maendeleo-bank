# Maendeleo Bank — Design System

Derived from the Stripe design language, re-grounded in Maendeleo Bank's brand:
**purple `#843b8d` carries ~80% of the brand surface; green `#1b9f3c` is a deliberate ~20% accent.**
Tagline: *"Together in Progress."* Tone: corporate, trustworthy, Tanzanian, quietly modern.

This file is the single source of truth. Every page, component, and admin screen must reference these tokens. Nothing here is decorative for its own sake — the brand reads as hand-built, precise, and editorial, never templated or "AI-generated."

---

## 1. Color

### Brand & Accent
| Token | Value | Role |
|---|---|---|
| `{colors.primary}` | `#843b8d` | The signature purple. Filled CTAs, link emphasis, gradient anchor, brand chrome. Used sparingly per band — one filled pill per section. |
| `{colors.primary-deep}` | `#6f2f78` | Gradient mid-stop, hover state. |
| `{colors.primary-press}` | `#56245d` | Pressed state of primary buttons. |
| `{colors.primary-soft}` | `#a86bb1` | Lighter purple for product-UI accents, chart highlights, icon fills. **Fills, borders and chart series only — never text on dark grounds** (3.9–4.4:1 on plum). |
| `{colors.primary-soft-on-dark}` | `#c79bd4` | The text-role purple on dark grounds (~6.4:1 on `{colors.brand-dark}`). Eyebrows, links and accent words on plum. |
| `{colors.primary-bg-subdued}` | `#f3e9f5` | Pale purple fill for soft tags, selected states, subtle bands. |
| `{colors.accent}` | `#1b9f3c` | The green. ~20% usage only: WhatsApp surface, success states, one accent element per viewport max, gradient edge stop, key stats/highlights. Never competes with purple on the same element. **Fails WCAG AA under white text (3.46:1) — never a text-bearing surface; fills, dots and chart marks only.** |
| `{colors.accent-deep}` | `#157a2f` | The text-bearing green surface (5.3:1 with white) — accent CTA pills, success chips carrying text. Also green hover/press. |
| `{colors.accent-bg-subdued}` | `#e6f5ea` | Pale green fill for success chips and highlighted figures. |
| `{colors.brand-dark}` | `#2a1230` | Deep plum — featured tiers, dashboard chrome, dark bands, footer. |

### Surface
| Token | Value | Role |
|---|---|---|
| `{colors.canvas}` | `#ffffff` | Default page background. |
| `{colors.canvas-soft}` | `#faf7fb` | Barely purple-tinted off-white for feature bands. |
| `{colors.canvas-warm}` | `#f7f2ec` | Warm cream interlude band (rare — one per page max). |
| `{colors.hairline}` | `#e9e2ec` | 1px borders on cards and tables. |
| `{colors.hairline-input}` | `#c9b8d0` | Cooler hairline on form inputs. |

### Text
| Token | Value | Role |
|---|---|---|
| `{colors.ink}` | `#241128` | Default body text — deep plum, never pure black. |
| `{colors.ink-secondary}` | `#3d2a44` | Secondary text on white. |
| `{colors.ink-mute}` | `#71637a` | Helper text, captions, table labels. |
| `{colors.on-primary}` | `#ffffff` | Text on purple / dark-plum surfaces. |

### Semantic
- Success: `{colors.accent}` family. Error: `#c0392b` family (restrained). Warning: `#b7791f`. Semantic colors never appear on marketing bands — only in forms, admin, and product UI.

---

## 2. Typography

**Two families, each with one job.**
- **Source Serif 4** (Google Fonts, weights 400/600 only) — the display face: hero, section openers, pull quotes. This is the "national institution" register. Wired to `--font-heading`, used via `font-heading`.
- **Inter** (Google Fonts, weights 300/400/500 only) — body, UI, numbers, labels, admin. Load with `font-feature-settings: "ss01"`.

The scale below lives in code as Tailwind v4 theme tokens in `app/globals.css` — each `text-*` utility bundles size, line-height, letter-spacing and weight. **Use the utility; never raw `text-[<px>]` values in components.**

| Token / utility | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{type.display-hero}` → `text-display-hero` | clamp(56px → 104px) | 300 | 1.02 | -0.02em | Homepage hero headline |
| `{type.display-xxl}` → `text-display-xxl` | 56px | 300 | 1.03 | -1.4px | CTA-band headline |
| `{type.display-xl}` → `text-display-xl` | 48px | 300 | 1.15 | -0.96px | Section opener |
| `{type.display-lg}` → `text-display-lg` | 32px | 300 | 1.1 | -0.64px | Card title / sub-section |
| `{type.display-md}` → `text-display-md` | 26px | 400 | 1.12 | -0.26px | Compact card title |
| `{type.heading-lg}` → `text-heading-lg` | 22px | 400 | 1.1 | -0.22px | Tier name |
| `{type.heading-md}` → `text-heading-md` | 20px | 400 | 1.4 | -0.2px | Section sub-heading |
| `{type.heading-sm}` → `text-heading-sm` | 18px | 400 | 1.4 | 0 | Mini-section label |
| `{type.body-lg}` → `text-body-lg` | 16px | 400 | 1.4 | 0 | Marketing body lead |
| `{type.body-md}` → `text-body-md` | 15px | 400 | 1.4 | 0 | Default UI body |
| `{type.body-tabular}` → `text-body-tabular` | 14px | 400 | 1.4 | -0.42px | Money / numeric tables — always with `tnum` |
| `{type.button-md}` → `text-button-md` | 16px | 400 | 1.0 | 0 | Pill button label |
| `{type.button-sm}` → `text-button-sm` | 14px | 400 | 1.0 | 0 | Compact pill label |
| `{type.caption}` → `text-caption` | 13px | 400 | 1.4 | -0.39px | Helper, table labels |
| `{type.micro}` → `text-micro` | 12px | 400 | 1.4 | 0 | Legal fine print — the absolute floor |
| `{type.eyebrow}` → `text-eyebrow` | 11px | 500 | 1.15 | 0.12em | All-caps eyebrow — the **only** sub-12px exception, always uppercase |

**Principles**
- **Weight 300 is display-only (≥32px).** Body copy runs at 400; captions and the eyebrow at 400/500. Inter Light below 32px loses its strokes on the low-DPI screens most of this audience uses.
- Never bump display type to 600/700 in Inter — emphasis comes from size and color, not weight. (Source Serif 4 may use its 600 for display emphasis.)
- **12px is the absolute type floor**, used only for legal fine print. The eyebrow (11px/500, wide tracking, uppercase) is the single exception.
- Negative tracking on every display tier — the editorial signature.
- `font-feature-settings: "ss01"` on `<body>` globally.
- Any number representing money, rates, shares, or counts uses `tnum` + tightened tracking (`{type.body-tabular}`).

---

## 3. Layout

- Base unit 8px. Tokens: 2 / 4 / 8 / 12 / 16 / 24 / 32 / 64.
- Section padding: 64–96px marketing, 32–48px admin/product.
- Card internal padding: 32px feature cards, 24px compact.
- Content container ~1200px centered; gradient mesh and dark bands run edge-to-edge.
- Breakpoints: <768 mobile (display-hero clamps 104→56px, hamburger nav), 768–1023 tablet (grids 2-up), ≥1024 desktop (grids 3–4-up), ≥1440 wide.

---

## 4. Elevation & Shape

| Level | Treatment | Use |
|---|---|---|
| 0 | Flat | Default |
| 1 | `0 1px 3px rgba(42,18,48,0.08)` | Card lift on white |
| 2 | `0 8px 24px rgba(42,18,48,0.14), 0 2px 6px rgba(42,18,48,0.06)` + 1px `{colors.hairline}` border | Floating panels, chat window, dropdowns — the hairline gives the panel a visible edge on white |
| 3 | Gradient mesh | Atmospheric depth on heroes — not literal shadow |

Radius: `4px` tags · `6px` inputs · `8px` compact cards · `12px` feature/pricing cards · `16px` panels/mockups · `9999px` all buttons and pills.

**Buttons are always pills.** Never rounded-rectangles. Padding `8px 16px` minimum; 40px min height (44px mobile).

---

## 5. Signature Elements

### Gradient Mesh Hero
Every marketing hero sits on a soft mesh: pale lavender `#efe3f3` → light purple `#c79bd4` → brand purple `#843b8d` → deep plum `#56245d`, with **one** green wash `#bfe8cb → #1b9f3c` at a corner/edge (the 20% accent). Organic blob shapes, heavy blur, upper third of the page; canvas white below. Render as layered absolutely-positioned blurred radial divs or SVG — not a flat linear gradient.

### Hero Copy (Homepage)
- Eyebrow: `MAENDELEO BANK PLC` (eyebrow token — 11px/500 uppercase, wide tracking — purple)
- Title (display-hero, Source Serif 4): **Together in Progress**
- Sub (body-lg, ink-secondary, ≤15 words): *"Your trusted partner in development, progress and financial growth across Tanzania."*
- One filled purple pill CTA + one outline pill. Hero video (`/Bandari-Towers-Hero-Video.mp4`) plays muted/looped inside a 16px-radius panel or behind a soft overlay — never full-bleed autoplay chaos.

### Cards — the hand-crafted rule
Cards must feel designed by a person:
- White canvas, 1px `{colors.hairline}` border, Level 1 shadow only on hover lift, 12px radius, 32px padding.
- One Lucide icon (1.5px stroke, purple, in a 40px `{colors.primary-bg-subdued}` rounded square) — never emoji, never stock 3D illustrations.
- Title `{type.display-md}`, body `{type.body-md}` ink-mute, one inline purple link with a small arrow.
- No gradients on cards, no glassmorphism, no neon, no random decorative shapes, no asymmetry for its own sake. Grid-aligned, evenly spaced, consistent heights.
- A featured card may invert to `{colors.brand-dark}` with white text (Stripe's featured-tier move) — at most one per grid.

### Tabular Money Type
FX rates, share price, financial figures: `tnum` always. This is the bank's quiet financial-DNA signal.

### Floating Action Pair (bottom-right, every public page)
- **WhatsApp button**: the official green glyph (asset `/whatsapp.png`) on a filled `{colors.accent}` 56px circle, Level 2 shadow — the icon must fully fit inside the circle with ~14px breathing room, never cropped or overflowing. Links to `https://wa.me/255…` (bank WhatsApp number from content docs).
- **AI assistant button**: 56px circle directly above WhatsApp, filled `{colors.primary}`, white sparkle/chat Lucide icon, subtle pulse ring on first load. Opens the AI chat panel.
- Both labeled with a tooltip on hover; 16px gap between them; 24px from viewport edges; above all content (z-index 50); keyboard accessible.

### AI Chat Panel
- 380px-wide panel (full-screen on mobile), slides up from the button, white canvas, 16px radius, Level 2 shadow, header in `{colors.brand-dark}` with logo mark + "Maendeleo Assistant" + "Inakusaidia kwa Kiswahili na English".
- Answers in the user's language (Swahili or English), short clean sentences, **no markdown asterisks ever** — plain text with simple line breaks and hyphen bullets only.

---

## 6. Components

- **`button-primary-pill`**: bg `{colors.primary}`, white text, `{type.button-md}`, `8px 16px`, radius 9999px; hover `{colors.primary-deep}`; press `{colors.primary-press}`.
- **`button-secondary`**: white bg, `{colors.primary}` text + 1px border, same geometry.
- **`button-accent-pill`**: `{colors.accent-deep}` bg with white text (5.3:1) — used at most once per page (e.g. "Chat on WhatsApp" or a single green CTA). `#1b9f3c` is never a text-bearing surface.
- **`button-on-dark`**: `{colors.brand-dark}` bg, white text.
- **`card-feature`**, **`card-feature-dark`** (featured invert), **`card-pricing`/`card-tier`**, **`card-stat`** (big tabular figure + caption label).
- **`text-input`**: white, `{type.body-md}`, `8px 12px`, 6px radius, 1px `{colors.hairline-input}`; focus border swaps to `{colors.primary}`. A global `:focus-visible` baseline (2px solid brand outline, 2px offset) applies everywhere — form components may layer rings on top but never weaken it.
- **`nav-bar`**: white (transparent over mesh until scroll), logo left, zone links center (Personal / Business / Institutional / Investor Relations / About / News / Contact), one filled purple pill right ("Internet Banking" → https://ibanking.maendeleobank.co.tz). Mobile: hamburger → full-screen white sheet.
- **`pill-tag-soft`**: `{colors.primary-bg-subdued}` bg, `{colors.primary-deep}` text, eyebrow token, `4px 8px`, pill.
- **`footer-dark`**: `{colors.brand-dark}` bg, ink-mute-on-dark text, 4–6 link columns, contact block, socials, legal row (BoT licence line, DSE ticker MBP, © year). Type `{type.caption}`.
- **Admin system**: same tokens, denser — 32–48px section padding, sidebar in `{colors.brand-dark}`, tables with `{type.body-tabular}` for figures, hairline borders, no marketing mesh.

---

## 7. Do's and Don'ts

**Do**
- Purple dominates (~80%); green appears as a single deliberate accent per viewport (~20%).
- One filled pill CTA per band; everything else is outline or link.
- Serif display type for heroes and section openers; weight-300 display type (≥32px) with negative tracking.
- `tnum` on every rate, amount, and share figure.
- Real content from `docs/maendeleo-bank-info/` — real product names, real figures, real branch names.
- Generous whitespace: 96px section gaps on marketing pages.
- Text-bearing accent surfaces use `#157a2f`; text on dark plum uses `#c79bd4`.

**Don't**
- No gradients on cards, no glassmorphism, no purple body text, no green buttons next to purple buttons.
- No emoji in UI, no generic stock-icon blobs, no "AI-generated" look — every card follows §5's card rule.
- No weight 300 below 32px; no display type heavier than 600 (Inter display stays at 300).
- No type below 12px except the 11px/500 eyebrow.
- No white text on `#1b9f3c`, no `#a86bb1` text on dark grounds.
- No markdown asterisks in any user-facing string (especially AI chat).
- No rounded-rectangle buttons — pills only.
- No lorem ipsum, no placeholder copy anywhere.

---

## 8. Content Sources of Truth

- Site copy and product facts: `docs/maendeleo-bank-info/*.md` (scraped from the live site + verified research).
- Assets: `/public/Maendeleo-bank-logo.png`, `/public/Maendeleo-Bank-Favicon.png`, `/public/Bandari-Towers-Hero-Video.mp4`, `/public/whatsapp.png`, `/public/Corporate images/*.jpg`.
- Hero/section imagery: corporate launch photos for About/News; the Bandari Towers video for the hero.

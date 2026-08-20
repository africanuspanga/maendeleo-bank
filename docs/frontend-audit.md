# Frontend Design Audit — Maendeleo Bank PLC

> **Status:** open · **Reviewed:** 20 August 2026 · **Scope:** public marketing site (`app/(site)/**`, `components/site/**`, `components/chat/**`)
> **Rendered version:** https://claude.ai/code/artifact/6cece41b-f65e-427f-87c5-3e3cdc709422

A code-and-browser audit of the public site: composition, typography, cards, colour, accessibility
and the content architecture behind them. **50 findings** — 8 blockers, 28 major, 14 polish.

Measurements were taken on the live DOM at 1440px and 390px (contrast with full alpha compositing
against each element's real backdrop; type counts across every rendered text node on the homepage),
plus `ffprobe` and MP4 atom inspection for media.

---

## How to use this document

- Every finding has a stable ID (`F01`–`F50`). **Reference the ID in commits and PRs** — e.g. `fix(hero): re-encode background video (F01)`.
- `Files` lists every path that must change. Treat it as the edit surface, not a hint.
- `Fix` is the agreed correction. If you deviate, say so in the PR and update this file.
- Tick the checkbox when the fix is merged. Do not delete findings — closed history is useful.
- **Ground truth is [`DESIGN.md`](../DESIGN.md).** Most findings below are the gap between that file
  and the code, not a disagreement with it. Where a finding contradicts `DESIGN.md`, it says so
  explicitly and the finding wins.

**Severity**

| Tag | Meaning |
|---|---|
| `BLOCKER` | Site is not credible on launch day. Fix before anything else. |
| `MAJOR` | Visibly below the standard of a listed commercial bank. |
| `POLISH` | Real, worth fixing, not urgent. |

---

## Verdict

The design language is good. `DESIGN.md` is a real design system — tokens, a type scale, elevation
levels, explicit do's and don'ts — and the brand direction (plum ground, restrained purple, green as
a ~20% accent, tabular figures on every number) is the right instinct for a Tanzanian commercial
bank. The loans cards and the investor-relations share block are close to production quality.

What is missing is the last 20%.

1. **The system is documented but not enforced.** The homepage alone renders 33 distinct type styles
   against a 15-token scale, and the shipped sizes (104/64/40/34px) are not the documented ones.
2. **The site's own accent CTA colour fails WCAG AA** at 3.46:1.
3. **The 17.7 MB hero video cannot play**, so the most valuable surface on the site is a flat purple
   rectangle — permanently, on Tanzanian mobile data.
4. **A full Supabase CMS exists and the public site does not read from it.** Six tables, seven admin
   sections, and only exchange rates reach a visitor.

None of this is hard. Most of it is a week of focused work.

---

## Priority order

| Phase | Findings | Outcome |
|---|---|---|
| **1 — Days 1–2** | F01, F04, F05, F07, F18, F19, F21 | Everything a visitor notices in ten seconds. No decisions needed from anyone. |
| **2 — Days 3–5** | F13, F14, F15, F16, F17 | Type system enforced in code. Body copy to weight 400. Second typeface introduced. |
| **3 — Week 2** | F02, F26, F27, F28, F49 | CMS wired. Loans, branches and contact actually do the bank's work. |
| **4 — Week 3** | F33–F47 | Composition, footer rebuild, accessibility pass. |
| **Parallel — needs client** | F08, F09, F11, F26, F39, F48 | Start asking now; these block on assets and compliance sign-off. |

### Blocked on the client — raise these immediately

- [ ] Reversed / mono **logo as SVG** — blocks F09 everywhere
- [ ] The real **WhatsApp Business number** — F08
- [ ] **Compliance wording**: BoT licence number, Deposit Insurance Board statement, complaints procedure, privacy policy — F39
- [ ] **Indicative loan rates and fee schedule**, cleared by credit — F26
- [ ] Confirmation of whether the **forex rates are BoT's or the bank's own** — F48
- [ ] **Corporate photography** with usable negative space — F11

---

# A. Blockers

## F01 · `BLOCKER` · The hero video cannot play, and never will on mobile data

**Files:** `public/Bandari-Towers-Hero-Video.mp4`, `components/site/home/hero.tsx`

`Bandari-Towers-Hero-Video.mp4` is **17.7 MB for 6.8 seconds** — a 20.6 Mbps bitrate, roughly ten
times what a looping background clip needs. Three things compound it:

- The `moov` atom sits at the **end** of the file (byte 17,672,143), so the browser must download
  every byte before it can decode frame one.
- `preload="auto"` tells it to fetch all of it immediately.
- The file still carries a **192 kbps AAC audio track** on an element that is permanently `muted`.

Measured live on localhost after 15 seconds: `readyState 0`, `videoWidth 0`, still paused. On a Dar
es Salaam 3G connection the hero is a flat plum rectangle indefinitely, and you have spent 17.7 MB
of the visitor's data bundle to show them nothing.

**Fix**

```bash
ffmpeg -i Bandari-Towers-Hero-Video.mp4 \
  -c:v libx264 -profile:v high -crf 26 -preset slow \
  -vf "scale=1280:-2" -an \
  -movflags +faststart \
  bandari-towers-hero.mp4
# extract poster
ffmpeg -i bandari-towers-hero.mp4 -frames:v 1 -q:v 2 hero-poster.jpg
```

Target ~1.2–1.8 MB. Then in `hero.tsx`:

- add `poster="/hero-poster.webp"` so the hero has content at 0 ms
- change `preload="auto"` → `preload="metadata"`
- skip the video entirely under `prefers-reduced-motion` and when `navigator.connection.saveData` is true

- [x] Fixed

---

## F02 · `BLOCKER` · The CMS publishes into a void

**Files:** `app/(site)/news/page.tsx`, `app/(site)/careers/page.tsx`, `app/(site)/tenders/page.tsx`,
`app/(site)/investor-relations/page.tsx`, `components/site/home/news-band.tsx`, `app/admin/actions/*.ts`

There are six Supabase tables — `news`, `careers`, `tenders`, `reports`, `site_content`,
`forex_rates` — and seven admin sections to edit them. **Exactly one, `forex_rates`, is read by a
public page.** Every other public page renders a hardcoded array in the component file.

The practical consequence: a bank officer posts a tender with a closing date and it appears nowhere.
HR posts a vacancy — nowhere. Finance uploads the annual report — nowhere. The homepage news band's
newest item is dated **24 February 2026**, six months stale, and only a developer can change it.

**Fix**

Wire the five orphaned tables to their public pages as server components using Cache Components:

- `use cache` + `cacheTag('news')` on the data reads
- call `updateTag('news')` from the matching server action in `app/admin/actions/news.ts` so a
  publish invalidates the page
- repeat for `careers`, `tenders`, `reports`, `site_content`

Tenders and careers are the priority — they are time-bound documents with legal deadlines.
See `node_modules/next/dist/docs/` for the current Cache Components API before writing this.

> Note: `news`, `careers`, `tenders` and `reports` now feed their public pages via tagged cached
> reads (`lib/content.ts`) with `revalidateTag(tag, "max")` in every admin action; each page keeps
> its hardcoded content as fallback while a table is empty. `site_content` still has no public
> consumer — wired for invalidation, not yet read by the site.

- [x] Fixed

---

## F03 · `BLOCKER` · There is no "Contact" link in the main navigation

**Files:** `components/site/navbar.tsx`

The primary nav is Home · Personal · Business · Institutional · Loans · Investor Relations · Reports
· About us. A visitor who wants a branch, a phone number, or a person **cannot get there from the
header.** "Where are we" is buried in the utility strip, and `/digital-banking` — a page that exists
— has no nav entry at all.

**Fix**

Contact and Digital Banking join the primary nav. If eight items is already too many (see F04), fold
Institutional under a "Banking" group and promote Contact — for a retail bank, "find us / talk to
us" outranks a segment page.

- [x] Fixed

---

## F04 · `BLOCKER` · Every multi-word nav label wraps to two lines

**Files:** `components/site/navbar.tsx`, `components/site/primitives.tsx` (`pillBase`)

At 1440px — a comfortable desktop width — "Personal Banking", "Business Banking", "Investor
Relations", "About us" and the "Internet Banking" CTA **all break across two lines** inside 44px-tall
pills. The nav measures 760px for eight items plus a CTA inside a 1200px container, and neither
`pillBase` nor the nav link classes set `white-space: nowrap`.

It is the single most visible amateur tell on the page, and it is on every screen.

**Fix**

`whitespace-nowrap` on both, then reduce the item count so it actually fits: **5–6 top-level entries
with grouped dropdowns** is the standard for a bank of this size. Widen the container to 1280px on
`xl` if needed.

- [x] Fixed

---

## F05 · `BLOCKER` · The floating buttons sit on top of content on mobile

**Files:** `components/floating-actions.tsx`, `components/site/home/hero.tsx`, `components/site/footer.tsx`

At 390px the AI orb and WhatsApp button (fixed, `right-6 bottom-6`, 56px each) land directly over
the hero's stat block — obscuring "280+ Umoja ATM locations" and "MBP · Listed on the DSE since
2013" — and over the footer's copyright and licence line. It is a hard collision on the two places
where a bank's credibility markers live.

**Fix**

Add bottom clearance to the page: a global `pb-24 md:pb-0` on the last section and the footer, or
shrink to a single 48px launcher on mobile with WhatsApp inside the chat panel. Also hide the orb
while the user is actively scrolling.

- [x] Fixed

---

## F06 · `BLOCKER` · Careers, Tenders and Whistleblowing are unreachable on mobile

**Files:** `components/site/navbar.tsx`, `components/site/footer.tsx`

`utilityLinks` live only in the top strip, which is `hidden md:flex`. The mobile sheet renders
`navItems` only — it **never renders `utilityLinks`**. And the footer omits Careers and Tenders
entirely. So on a phone, `/careers` and `/tenders` are orphan pages reachable only by typing the URL.

For a bank that must publish tenders publicly, that is a procurement-transparency problem, not just
a UX one.

**Fix**

Append `utilityLinks` to the bottom of the mobile sheet under a "More" divider, and add Careers,
Tenders, Whistleblowing and Contact to the footer sitemap (see F38).

- [x] Fixed

---

## F07 · `BLOCKER` · The accent CTA colour fails WCAG AA

**Files:** `app/globals.css`, `components/site/primitives.tsx` (`pillStyles.accent`), `components/site/home/ussd-band.tsx`

White on `--brand-green #1b9f3c` measures **3.46:1** against a 4.5:1 requirement. This is not an edge
case — it is `button-accent-pill`, the design system's designated accent CTA. It is "Open an account
today" in the homepage CTA band and "Dial now" in the USSD band. **The bank's most
conversion-critical button is the least legible element on the page.**

**Fix**

Darken the CTA green to `#157a2f` — already in your tokens as `--brand-green-deep`, measures 5.3:1.
Keep `#1b9f3c` for fills, dots and chart marks where it is not carrying text. Same treatment for the
pulse dot and success chips.

- [x] Fixed

---

## F08 · `BLOCKER` · The WhatsApp button points at a landline

**Files:** `components/floating-actions.tsx`

```ts
const WHATSAPP_URL = "https://wa.me/255220511518";
```

That is the head-office switchboard, marked in a source `TODO` as a placeholder. A landline has no
WhatsApp account, so the button opens a dead conversation. This is one of only two persistent CTAs
on every page.

**Fix**

Get the real WhatsApp Business number from the client before launch. **If there is not one, remove
the button** rather than ship a broken channel — a bank that appears not to answer its own WhatsApp
is worse than a bank without WhatsApp.

> Note: the demo build keeps the button pending the real number from the client; the code carries a
> `TODO(F08)` BLOCKER comment marking `255220511518` as the head-office landline.

- [ ] Fixed

---

# B. Brand craft

## F09 · `MAJOR` · There is no reversed logo, so the mark sits in a white sticker

**Files:** `components/site/navbar.tsx`, `components/site/footer.tsx`, `components/chat/chat-panel.tsx`, `public/`

The logo is a purple-and-green wordmark on white. Because there is no mono or reversed version,
**three separate components paste it onto a white chip** to survive the dark plum ground:

| Component | Hack |
|---|---|
| Navbar over hero | `bg-white px-3 py-1.5` pill |
| Footer | `rounded bg-white p-1.5` |
| Chat panel header | `h-9 w-9 rounded-lg bg-white` |

A white rectangle floating on the brand's own dark colour reads as a sticker slapped on the page. It
is the most visible brand-craft failure on the site, and it appears on every single screen. No listed
bank ships this.

**Fix**

Commission (or derive) a reversed logo: all-white wordmark with the "M" bars in `#a86bb1` and
`#4ec46a` so the two-colour identity survives on plum. Ship it as SVG, swap it in wherever the ground
is dark, and **delete all three white chips.**

> Note: still blocked on the client-supplied reversed/mono SVG logo. Interim mitigation shipped:
> the wordmark is now an 18 KB WebP (F10), but the white chips remain until the asset arrives.

- [ ] Fixed

---

## F10 · `MAJOR` · The logo is a 461 KB PNG rendered at 36px tall

**Files:** `public/Maendeleo-bank-logo.png`, `public/Maendeleo-Bank-Favicon.png`

`Maendeleo-bank-logo.png` is 2400×518 and **461 KB**, displayed at `h-8 md:h-9`. The chat header
loads a separate **105 KB** favicon PNG to show a 24px mark. During review the logo was still blank
several seconds into multiple page loads — the brand is literally absent from the first paint.

**Fix**

Convert both to SVG (a wordmark like this should land under 8 KB) and inline the small mark as a
component. Keep the PNG only for OG images and the manifest, where raster is required.

> Note: deviation — no vector source exists, so instead of SVG the wordmark is now `logo.webp`
> (600px, ~18 KB) and the chat mark `brand-mark.webp` (64px, ~2 KB); PNGs kept for OG/manifest.

- [x] Fixed

---

## F11 · `MAJOR` · The heritage band's photo fights its own headline

**Files:** `components/site/home/heritage-band.tsx`

The overlay is `from-brand-plum/95 via-brand-plum/75 to-brand-plum/30`, so the right 40% of the image
shows at near-full strength. What shows through is a very busy launch photo containing **a second
Maendeleo logo** on a ceremonial key, a phone-mockup billboard reading "MB mobile App", and App Store
/ Google Play badges. Two competing brand marks and a rogue app-store CTA behind the headline "Born
of a church, built for a nation".

Separately, `object-cover` with no `object-position` **crops the subjects' heads off** at the top edge
of the band.

**Fix**

Take the right stop to `/60` minimum and add a horizontal scrim, or pick a calmer frame. Set
`object-position: 50% 30%` so faces sit in the upper third. Better: select a photo whose right side
is genuinely empty and let the type sit in real negative space.

- [x] Fixed

---

## F12 · `POLISH` · Asset filenames leak into public URLs

**Files:** `public/Corporate images/`, all consumers

Every corporate image is served from
`/Corporate%20images/WhatsApp-Image-2025-07-03-at-15.20.15-2048x1365.jpg` — a space in the directory
name, and a filename that tells every visitor the bank's press photography arrived over WhatsApp.

**Fix**

Rename to semantic slugs in an `/images/` directory: `national-bank-launch-2025.jpg`,
`arusha-branch-opening.jpg`. Convert to WebP/AVIF while you are there — these are 200–500 KB JPEGs at
2048px.

- [x] Fixed

---

# C. Typography

> This is where the gap between `DESIGN.md` and the shipped site is widest.

## F13 · `MAJOR` · 33 distinct type styles on the homepage, against a 15-token scale

**Files:** `app/globals.css`, every component

Measured on the live DOM: **33 unique combinations** of size/weight/line-height/letter-spacing,
across **16 distinct font sizes**. The system defines 15 tokens.

Four different 13px styles ship simultaneously:

```
13px / 300 / lh 19.5 / ls -0.42
13px / 400 / lh 18.2 / ls -0.42
13px / 300 / lh 18.2 / ls -0.39
13px / 300 / lh 18.2 / ls -0.42
```

Three different 11px. Three different 12px. Nobody consciously chose four 13px styles — they
accumulated because the tokens live in a Markdown table instead of in code, so every component
re-types its own arbitrary values.

**Fix**

Move the scale into `@theme` as real utilities — `text-display-xl`, `text-body-md`, `text-caption` —
each bundling size, weight, line-height and tracking. Then **ban raw `text-[15px]` from components.**
A lint rule on arbitrary font-size values enforces it permanently.

- [x] Fixed

> Note: token layer landed; component migration to the new utilities continues across the component findings.

---

## F14 · `MAJOR` · The shipped scale is not the documented scale

**Files:** `DESIGN.md`, `app/globals.css`

| | Sizes |
|---|---|
| `DESIGN.md` specifies | 56 · 48 · 32 · 26 · 22 · 20 · 18 |
| Homepage actually renders | 104 · 64 · 56 · 40 · 36 · 34 · 28 · 20 · 18 |

The 104px hero and the 64px CTA heading do not exist in the system at all; 48, 32, 26 and 22 never
appear once. Two different systems are running side by side.

**Fix**

Pick one. Extend the documented scale upward — add `display-hero` at 96–104px — rather than pull the
hero down, because the big editorial hero is the site's best idea. Then delete the sizes nothing uses.

- [x] Fixed

---

## F15 · `MAJOR` · Weight 300 is being used for 14–15px body copy

**Files:** `DESIGN.md` §2, every component

The system mandates weight 300 everywhere including `body-md` at 15px and `body-tabular` at 14px.
**Inter Light at those sizes loses stroke weight badly** — worse on Windows, worse again on a low-DPI
Android screen, which is most of this bank's audience. Card body copy across the whole site is
14–15px/300 in `#71637a`: technically passing contrast, visually washed out.

**Fix** — *this contradicts `DESIGN.md` §2 deliberately; update that file too.*

Weight 300 is a **display** voice. Keep it at ≥32px where the thin strokes read as elegance. Take
body copy to 400 and captions to 400/500, and let the display tier carry the lightness.

**This single change does more for perceived quality than any other item on this list.**

- [x] Fixed

---

## F16 · `MAJOR` · Six type sizes below 14px carry real content

**Files:** `components/site/navbar.tsx`, `components/site/footer.tsx`, `components/site/primitives.tsx` (`Eyebrow`), `components/site/home/forex-widget.tsx`

13, 12, 11 and 10px all appear with substantive text. **10px appears 14 times on the homepage alone**
— every eyebrow, every forex table header. The utility bar runs 11px/300. The footer runs 13px and
11px.

**Fix**

Set **12px as the absolute floor**, used only for legal fine print. Eyebrows move to 11px/500 with
wider tracking — the extra weight and letter-spacing preserve the micro-cap look while staying
legible. Table headers go to 12px.

- [x] Fixed

---

## F17 · `MAJOR` · One typeface does every job

**Files:** `app/layout.tsx`, `app/globals.css`

```css
--font-heading: var(--font-sans);
```

Headings, body, numbers, labels and the admin dashboard are all Inter. The system justifies this as a
Söhne substitute, which is a reasonable technical call, but the result is that nothing on the page
has a distinct voice. **Inter at weight 300 with tight negative tracking is, at this point, the
default look of a generated site.** It reads as competent and anonymous.

**Fix**

Add one contrasting face and use it with discipline. Either a display serif for the hero and section
openers only (keeps the "national institution" register), or a distinctive grotesk for display with
Inter demoted to UI and body. **Load two weights, not five.** This is the cheapest way to make the
site stop looking templated.

- [x] Fixed

---

## F18 · `MAJOR` · `<br>` inside headings breaks the accessible name

**Files:** `components/site/home/hero.tsx`, `components/site/home/cta-band.tsx`

The H1 computes as **"Together inProgress"** and the CTA heading as **"Ready to bankwith us?"** — no
space. Screen readers announce it that way, and it is what search engines index for the bank's own
tagline.

**Fix**

Drop the `<br />` and control the break with `max-width` plus `text-wrap: balance`, or wrap each line
in a `<span className="block">`, which preserves whitespace in the accessible name.

- [x] Fixed

---

## F19 · `MAJOR` · The homepage title tag says the brand name twice

**Files:** `app/layout.tsx`, `app/(site)/page.tsx`

Rendered: `Maendeleo Bank PLC | Together in Progress | Maendeleo Bank PLC`

The root layout sets `template: "%s | Maendeleo Bank PLC"` and the homepage sets its own full title,
so the template appends the brand again.

**Fix**

```ts
title: { absolute: "Maendeleo Bank PLC | Together in Progress" }
```

on the homepage, and let every other page pass a bare segment name to the template.

- [x] Fixed

---

## F20 · `POLISH` · Two date formats on one page

**Files:** `components/site/home/forex-widget.tsx`, `components/site/home/news-band.tsx`, `lib/rates.ts`

The forex badge renders `20-Aug-26`; the news band renders `24 February 2026`. Both are visible in
the same scroll.

**Fix**

One formatter, `Intl.DateTimeFormat("en-GB")`, exported from `lib/`. Financial data gets a time as
well as a date.

- [x] Fixed

---

# D. Colour & contrast

Measured on the live DOM with full alpha compositing against each element's real backdrop.

| Element | Foreground / ground | Ratio | Required |
|---|---|---|---|
| Accent CTA — "Open an account today" | white on `#1b9f3c` | **3.46:1** | 4.5:1 |
| "Dial now" pill, USSD band | white on `#1b9f3c` | **3.46:1** | 4.5:1 |
| Utility bar links (all 5) | `white/70` on `plum/60` | **3.13:1** | 4.5:1 |
| Arrow links on dark | `#a86bb1` on plum | **3.89:1** | 4.5:1 |
| Eyebrows on dark bands | `#a86bb1` on plum | **4.40:1** | 4.5:1 |

## F21 · `MAJOR` · Every text colour on the dark plum ground is borderline or failing

**Files:** `app/globals.css`, `components/site/primitives.tsx` (`ArrowLink`, `PageHero`), `components/site/navbar.tsx`

The table above is not five isolated bugs — it is one systemic choice. `--brand-soft #a86bb1` was
picked as the on-dark accent and lands at 3.89–4.40:1 against `#2a1230`. It is used for eyebrows,
arrow links, and the hero's "Progress" — **so the second half of the bank's tagline is the least
legible word on the homepage.**

**Fix**

Introduce `--brand-soft-on-dark` at roughly `#c79bd4` (measures ~6.4:1 on plum) and use it for every
text role on dark grounds. Keep `#a86bb1` for fills, borders and chart series. Take the utility bar
to `white/85` on a solid `plum/80`.

- [x] Fixed

---

## F22 · `MAJOR` · The icon chips read as grey placeholders

**Files:** `components/site/primitives.tsx` (`FeatureCard`), `components/site/home/quick-actions.tsx`, `app/(site)/personal-banking/page.tsx`, `app/(site)/contact/page.tsx`, all card grids

Every card on the site uses a `#f3e9f5` square with a **1.5px-stroke** `#843b8d` Lucide icon at 20px.
Nominal contrast is fine, but a 1.5px stroke at that size on a pale ground reads as light grey at a
glance. Scanning any card grid, the icons register as empty chips rather than as meaning.

**Fix**

Stroke to 1.75, icon to 22px, and either deepen the glyph to `#6f2f78` or invert the chip to solid
`#843b8d` with a white glyph on the primary card in each grid. The quick-actions hover state already
inverts to solid purple — **make that the resting state, not the hover.**

- [x] Fixed

---

## F23 · `MAJOR` · Purple body text on the loans page

**Files:** `app/(site)/loans/page.tsx`

The AMOUNT values on every loan card — "TZS 3M – 500M", "Based on net salary" — render in
`text-brand`. `DESIGN.md` §7 says **"no purple body text"** explicitly. Worse, purple is also the
link colour, so eleven cards' worth of key figures look clickable and are not.

**Fix**

Amounts go to `--ink` with `tnum` and a slightly heavier weight. If they need emphasis, give the
whole amount/tenure row a `--canvas-soft` panel instead of colouring the text.

- [x] Fixed

---

## F24 · `POLISH` · Purple and green CTAs in the same viewport

**Files:** `components/site/home/ussd-band.tsx`

The USSD band puts a purple "More on Digital Banking" pill and a green "Dial now" block on the same
screen. `DESIGN.md` §7 forbids exactly this — *"no green buttons next to purple buttons"*, *"one
green accent per viewport max"*.

**Fix**

Make "Dial now" the real CTA (see F44) in purple, and move the green accent to the phone mockup's
status indicator.

- [x] Fixed

---

## F25 · `POLISH` · Focus rings are effectively invisible on form inputs

**Files:** `components/site/contact-form.tsx`, `components/chat/chat-panel.tsx`

Inputs use `focus:ring-2 focus:ring-brand/20` — a 20% opacity purple ring on white. Combined with a
border swap it is the only focus signal on the contact form and the chat input.

**Fix**

`ring-brand/60` with a 2px white offset ring, or a solid 2px `outline` with `outline-offset: 2px`.
Keyboard users need to see it from a normal viewing distance.

- [x] Fixed

---

# E. Cards

> The card *rule* in `DESIGN.md` §5 is good. The problems are what the cards contain and what they
> let you do.

## F26 · `MAJOR` · Loan cards have no rate, no fees, and no way to apply

**Files:** `app/(site)/loans/page.tsx`

Eleven loan products, each with AMOUNT and TENURE and a good feature list — and **no interest rate,
no fee schedule, no representative example, and not a single Apply button.** The section heading says
"Compare and choose" above cards that give you nothing to compare on and nowhere to go. The page copy
says "affordable or competitive rates on a reducing balance", which is a phrase, not a rate.

This is the most commercially important page on the site and it currently converts nobody.

**Fix**

- Add a **RATE** row alongside AMOUNT and TENURE — an indicative range is fine and is what peers publish
- Add a **required-documents** list per product
- Put a primary CTA on every card: "Apply at a branch" → the branch locator, or a callback-request form
- A simple **repayment calculator** on this page would outperform every other feature on the site

> Note: partially done — every card now ends in an "Apply at a branch" CTA and the twelfth cell
> is a dark "talk to a loan officer" card (F30). The RATE row, fee schedule and repayment
> calculator block on indicative rates cleared by credit (client).

- [ ] Fixed

---

## F27 · `MAJOR` · Branch cards are inert and nearly empty

**Files:** `app/(site)/contact/page.tsx`

Six branches, each a card containing a bank icon, a name, and one line like "Dar es Salaam · Mwenge".
**No street address, no phone, no opening hours, no directions link, no map anywhere on the page, and
the cards are not clickable.** The branch locator is a top-three page on any retail bank site.

**Fix**

Full address, branch phone, hours if they differ from head office, and a "Get directions" link to
Google Maps. Make the card itself the link. Add an embedded map or at minimum a static map image per
branch. **Include ATM locations** — the site advertises 280+ of them and lists none.

> Note: partially done — cards are now clickable "Get directions" links to Google Maps.
> Street addresses, branch phones, hours and the ATM list block on client data (the scraped
> source contains no branch address list).

- [ ] Fixed

---

## F28 · `MAJOR` · News headlines are not links

**Files:** `components/site/home/news-band.tsx`

The three items in the homepage news list are plain `<li>` elements with **no anchor** — headline,
date and summary rendered as body text. The featured card *is* a link, but it points at `/news`
rather than at that story. **Nothing on the homepage takes a visitor to an article.**

**Fix**

Every headline becomes a link to its own article route once F02 is done. Add thumbnails to the list
items so the right column has the same visual weight as the featured card.

> Note: headlines link to the new `/news/[slug]` article route (CMS-driven). Thumbnails on the
> list items deferred — CMS stories may not carry images yet.

- [x] Fixed

---

## F29 · `POLISH` · The icon and the corner arrow do not align

**Files:** `components/site/home/quick-actions.tsx`

`items-start` top-aligns a 44px icon circle and a 20px arrow, so the arrow floats ~12px above the
circle's centre. Small, but it is the first row of cards a visitor sees, and misalignment at the top
of a grid undermines everything below it.

**Fix** — `items-center` on that row, or align the arrow to the circle's optical centre with `mt-3`.

- [x] Fixed

---

## F30 · `POLISH` · Eleven products in a three-up grid leave an orphan cell

**Files:** `app/(site)/loans/page.tsx`

3 + 3 + 3 + 2 leaves one empty slot at the bottom right — dead space where the eye expects a card.

**Fix**

Fill it with a dark `card-feature-dark` — *"Not sure which loan fits? Talk to a loan officer"* with a
phone CTA. `DESIGN.md` §5 already allows one inverted card per grid, and this is exactly what it is for.

- [x] Fixed

---

## F31 · `POLISH` · Contact cards end abruptly, and the email wraps mid-address

**Files:** `app/(site)/contact/page.tsx`

The four contact cards stretch to equal height but their content is top-aligned, so three have
40–80px of empty bottom. "Careers: hr@maendeleobank.co.tz" breaks after the label, splitting the
address across lines.

**Fix**

Give each card a bottom-anchored action ("Call now", "Send email", "Get directions") so the trailing
space becomes function. `break-words` plus a slightly wider column stops the address splitting.

- [x] Fixed

---

## F32 · `POLISH` · Card interiors have no internal hierarchy

**Files:** all card components

Across the site, card body copy is uniformly 14–15px/300 in `#71637a`. Within a card there is nothing
distinguishing a benefit from a condition from a detail. The loans cards get this right with their
AMOUNT/TENURE micro-labels; nothing else does.

**Fix**

Adopt the loans-card pattern site-wide: **one micro-label tier, one emphasis tier, one body tier.**
Three levels inside a card is enough, and it is what makes a card feel authored.

- [x] Fixed

---

# F. Layout & composition

## F33 · `MAJOR` · Six bands share the same empty-right-half problem

**Files:** `components/site/home/hero.tsx`, `components/site/primitives.tsx` (`PageHero`),
`components/site/home/banking-zones.tsx`, `forex-widget.tsx`, `ussd-band.tsx`, `cta-band.tsx`

The hero, the inner-page header on all eleven pages, the banking-zones list, the forex section, the
USSD band and the closing CTA **all place content in a left column of 500–600px and leave the right
half of a 1200px container empty.** In the banking-zones rows there is ~400px of nothing between the
description text and the arrow button.

Generous whitespace is deliberate; the same asymmetry six times in one scroll reads as unfinished.

**Fix**

Vary the composition. Give two or three of these bands a right-hand element — a product shot, a stat
block, a pull quote, a small data panel. Where the band is genuinely text-only, centre it and tighten
the measure to ~62ch instead of pinning it left. The banking-zones rows should pull the arrow in
toward the text rather than the container edge.

- [x] Fixed

---

## F34 · `MAJOR` · Eleven inner pages open with the identical flat slab

**Files:** `components/site/primitives.tsx` (`PageHero`)

`PageHero` renders the same dark plum band with the same four blurred glows on every page. No
imagery, no product cue, no differentiation — navigating Personal → Business → Loans → Contact, the
top 450px never changes. It is also visually flatter than `DESIGN.md` §5's "gradient mesh" describes;
the glows are subtle enough that it reads as a solid rectangle.

**Fix**

Parameterise it. Let each page pass an optional image or a distinct mesh configuration, and drop a
relevant stat into the empty right side — *"11 loan products, TZS 50,000 to 500M"* on the loans
header, *"6 branches · 2,100+ agents"* on contact. Same component, per-page identity.

- [x] Fixed

---

## F35 · `MAJOR` · The homepage navigates you to the same four places twice

**Files:** `app/(site)/page.tsx`, `components/site/home/quick-actions.tsx`, `components/site/home/banking-zones.tsx`

Quick Actions (Personal / Business / Loans / Internet Banking) is followed immediately by Banking
Zones (Personal / Business / Institutional / Investor Relations). Two full-height sections, ~1,400px
of scroll, delivering the same navigational move — and both duplicate the main nav directly above them.

**Fix**

Keep Quick Actions as the compact router. **Rebuild Banking Zones as proof rather than navigation:**
real numbers, a customer story, the 2025–2030 strategy, the national-bank licence. A homepage's
second section should tell me why to trust you, not where to click.

- [x] Fixed

---

## F36 · `POLISH` · The footer collapses badly at tablet width

**Files:** `components/site/footer.tsx`

`md:grid-cols-2 lg:grid-cols-5` with no intermediate step. At 820px the five columns become two,
leaving "Reports" alone on its own row with the right half of the footer empty.

**Fix** — `sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5`, and let the logo block span two columns at
the medium step.

- [x] Fixed

> Note: implemented as `sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6` (six tracks to fit the new
> five-column sitemap plus brand block); the logo/brand block spans two columns at `md` as specified.

---

# G. The footer

> The weakest single component on the site, and the one a regulator or an institutional visitor
> looks at first. All findings: `components/site/footer.tsx`

## F37 · `MAJOR` · "Privacy Policy" is filed under "Open Hours"

It is the fourth item in the Open Hours column, directly after "Sunday & public holidays: Closed" —
and it links to `/contact`, because no privacy policy page exists.

**Fix**

A real `/privacy` page in a Legal column. For a bank handling personal financial data under
Tanzania's Personal Data Protection Act, this is not optional.

- [ ] Fixed

> Note: "Privacy Policy" has been removed from the Open Hours column and a Legal column created,
> but no `/privacy` page was built: `docs/maendeleo-bank-info/14-other-pages.md` shows the current
> site's "Privacy policy" page contains mispublished HR-manual text, not a data-protection policy,
> and no usable privacy content exists in the source docs. Blocks on compliance-approved wording
> from the client (see the blocked-on-client list above).

---

## F38 · `MAJOR` · The footer omits more than half the site

Lists Personal Banking, Business Banking, Loans, AGM Book, Annual Report.
**Missing:** Institutional, Digital Banking, Investor Relations, News, Careers, Tenders, About, Contact.

A corporate footer is a sitemap; this one is a fragment.

**Fix**

Four proper columns — Banking, About, Investors, Support — covering every route, plus a Legal row.
**Generate it from the same route list that feeds the nav** so they cannot drift apart.

- [x] Fixed

> Note: deviation — the footer is now a complete five-column sitemap (Banking, About, Investors,
> Support, Legal) covering every route, but it is **not** generated from a shared route list: that
> refactor touches the navbar, which is under concurrent edit. The footer's route list is hand-kept
> complete for now, marked with `// TODO(F38): derive from shared route list with navbar` in
> `components/site/footer.tsx`.

---

## F39 · `MAJOR` · Missing the disclosures a licensed bank is expected to publish

Present: *"Licensed by the Bank of Tanzania · Listed on the DSE (MBP)"*.

Absent: the **BoT licence number**, the **Deposit Insurance Board** membership statement, a
**complaints and grievance procedure**, **terms and conditions**, a **fraud and security awareness**
page, and a **tariff / fees guide**. Whistleblowing exists but only in the desktop utility strip.

**Fix**

Add a Legal / Regulatory column carrying all of the above. **Confirm the exact required wording with
the client's compliance officer** — BoT and DIB have prescribed formulations.

- [ ] Fixed

> Note: partially done. The Legal column now carries what legitimately exists today: the licence
> statement as currently worded ("Licensed by the Bank of Tanzania", "Listed on the DSE (MBP)") and
> the whistleblowing channel (`mailto:whistleblowing@maendeleobank.co.tz`, matching the utility
> strip — no `/whistleblowing` route exists). Still blocked on client compliance wording: BoT
> licence number, Deposit Insurance Board statement, complaints/grievance procedure, terms and
> conditions, fraud & security awareness page, and the tariff/fees guide. The privacy policy is
> blocked separately — see F37.

---

## F40 · `POLISH` · Opening hours and the postal address are rendered as links

"Monday – Friday: 8:30am – 4:00pm", "P.O. Box 216, Dar es Salaam" and "Sunday & public holidays:
Closed" are all `<Link>` elements pointing at `/contact`. They get hover states and navigate on
click. The `mailto:` and `tel:` entries also route through `next/link`, which they should not.

**Fix**

Make the contact and hours blocks plain text in an `<address>`. Only the email and phone stay
interactive, as bare `<a>`.

- [x] Fixed

---

## F41 · `POLISH` · Footer column headings are `<h2>`

**Files:** `components/site/footer.tsx`, `components/site/home/banking-zones.tsx`

"Contact", "Open Hours", "Accounts" and "Reports" ship as H2s, so **every page ends with four stray
second-level headings** competing with its real section structure. Separately, the banking-zones
titles are `<span>`s, so four major destinations are absent from the document outline entirely.

**Fix**

Footer headings become `<h3>` or a styled `<p>` inside a labelled `<nav>`. Banking-zone titles become
`<h3>`.

- [x] Fixed

---

# H. Motion, interaction & accessibility

## F42 · `MAJOR` · Scroll reveals are twice as slow as they should be

**Files:** `components/site/reveal.tsx`, `app/globals.css`

Nearly every element on the site is wrapped in `<Reveal>`: **0.9s** opacity + 28px translate, with
staggered delays on top. Scrolling at a normal reading pace leaves whole sections ghosted mid-fade —
during this review, screenshots repeatedly caught cards half-materialised. Combined with global
`scroll-behavior: smooth`, jumping to an anchor becomes a long animated slide.

The `prefers-reduced-motion` handling is correctly implemented, which is more than most sites manage.
The default is just too slow.

**Fix**

**350ms, 16px translate, stagger capped at 60ms.** Reveal section groups rather than every individual
element. Drop global smooth scroll and apply it per-anchor.

- [x] Fixed

---

## F43 · `MAJOR` · 26 interactive elements fall below minimum touch-target size

**Files:** `components/site/navbar.tsx`, `components/site/footer.tsx`, `components/site/primitives.tsx` (`ArrowLink`)

Measured on the homepage:

| Element | Size |
|---|---|
| Utility-bar links | 15px tall |
| Footer links | 16px tall, ~10px vertical gaps |
| Utility social icons | 24×24 |
| Arrow links ("Explore more", "All news and events") | 23px tall |

The footer links fail even **WCAG 2.2 AA's 24px minimum**, let alone the 44px `DESIGN.md` §4
specifies for itself.

**Fix**

Minimum 44px tap height via padding on every footer and utility link — the visual density does not
have to change, the hit area does. Arrow links get `py-2.5`. Social icons go to 44×44 hit areas.

- [x] Fixed

---

## F44 · `MAJOR` · "Dial now" is a `<div>` that looks like a button

**Files:** `components/site/home/ussd-band.tsx`

The green block inside the phone mockup is styled exactly like a CTA and does nothing. On mobile —
where this band's entire message is *"you can bank from any phone"* — the obvious behaviour is to
dial the USSD code.

**Fix**

```tsx
<a href="tel:*150*52%23">Dial now</a>
```

Escaping the `#` as `%23` is what makes USSD codes work in `tel:` on Android and iOS. **This is a free
conversion win on the bank's most-used digital channel.**

- [x] Fixed

---

## F45 · `MAJOR` · The chat panel is not a modal

**Files:** `components/chat/chat-panel.tsx`

It has `role="dialog"` and an Escape handler — a good start. Missing: `aria-modal`, a focus trap, and
focus return to the launcher on close, so **keyboard users tab straight out of the panel into the
page behind it.** On mobile it is `fixed inset-0`, covering the whole site, while the background
remains in the tab order. The input is 40px tall against `DESIGN.md`'s own 44px floor, and the four
suggestion chips wrap 1 / 2 / 1 with ragged widths.

**Fix**

Add `aria-modal="true"`, trap focus, restore focus on close, and set `aria-hidden` on the page behind
it in the mobile full-screen state. Input to 44px. Lay the chips out in a two-column grid so they
read as a set.

- [x] Fixed

---

## F46 · `POLISH` · Nav dropdowns are hover-only with no expanded state

**Files:** `components/site/navbar.tsx`

The "Reports" and "About us" triggers are `<button aria-haspopup="true">` with **no click handler and
no `aria-expanded`**. They open through `group-hover` and `group-focus-within`. Keyboard focus does
open them, but pressing Enter or Space — the expected action on a button with a popup — does nothing,
and assistive tech is never told whether the menu is open.

**Fix**

Add click-to-toggle state with `aria-expanded`, Escape to close, and arrow-key navigation between
items. **`@base-ui/react` is already a dependency** and ships a menu primitive that handles all of this.

- [x] Fixed

---

## F47 · `POLISH` · The chat panel has no visible edge on a white page

**Files:** `components/chat/chat-panel.tsx`, `app/globals.css`, `components/site/navbar.tsx`

`shadow-lift-2` is `0 8px 24px rgba(42,18,48,.08)`. Against a white page body, a white panel at 8%
shadow has effectively no boundary — only the dark header defines it. It reads as text floating on
the page rather than as a surface.

**Fix**

Add a 1px `--hairline` border to floating panels and take the shadow to ~14%. The nav dropdown menus
have the same issue and the same fix.

- [x] Fixed

---

# I. Content & compliance

## F48 · `MAJOR` · The forex table claims more than it can support

**Files:** `components/site/home/forex-widget.tsx`, `lib/rates.ts`, `app/api/rates/route.ts`

The badge reads *"Live: Bank of Tanzania"*. The BoT publishes an **indicative mean rate** — not
Maendeleo Bank's dealable buy and sell prices. Presenting BoT data under the bank's own "Buying (TZS)
/ Selling (TZS)" column headers implies a quote the bank has not made.

Also missing: a *"rates are indicative and subject to change"* line, a time alongside the date, a
spread, and a link to a full rates page.

**Fix**

Label the source accurately, add the standard disclaimer under the table, timestamp to the minute,
and link to treasury for dealable rates. If these are meant to be the bank's own rates they belong in
the `forex_rates` table with a treasury officer maintaining them — which the admin already supports.

- [x] Fixed

---

## F49 · `MAJOR` · The contact form is a `mailto:` composer

**Files:** `components/site/contact-form.tsx`

Submitting builds a `mailto:` URL and sets `window.location`. **No server delivery, no ticket, no
confirmation to the visitor, no spam protection, no routing by enquiry type.** It fails outright for
anyone using webmail without a registered mail handler — which is most people on a desktop. The
microcopy is honest about it, but honesty about a broken channel is not the same as a working one.

**Fix**

A server action writing to a Supabase `enquiries` table, with an enquiry-type select that routes to
the right inbox, an auto-acknowledgement, and BotID or a honeypot on the endpoint. The admin
dashboard is the natural place to read them.

- [x] Fixed

---

## F50 · `POLISH` · Hand-drawn flags in the most credibility-sensitive component

**Files:** `components/site/flag-icon.tsx`

The forex table's flags are hand-authored SVG approximations — the US canton has six dots standing in
for fifty stars, the Kenyan flag is missing its crossed spears, the Union Jack's diagonals are not
offset. They read acceptably at 36px, but this is the one place on the site displaying financial
quotes, and it is where a visitor decides whether the numbers are trustworthy.

**Fix**

Swap in a proper flag set (`flag-icons` SVGs are ~1 KB each and self-hostable). **Keep the current
circular mask and border treatment** — that is a nice detail.

- [x] Fixed

---

## Appendix — measurement method

- **Contrast:** live DOM, every text node, foreground and backdrop resolved through the full ancestor
  chain with alpha compositing via canvas. Thresholds per WCAG 2.2: 4.5:1 normal text, 3:1 large
  (≥24px, or ≥18.66px at weight ≥700).
- **Type inventory:** every rendered text node on `/` at 1440px, keyed on
  size + weight + line-height + letter-spacing.
- **Touch targets:** every `<a>` and `<button>` with a non-zero box, flagged below 40px on either axis.
- **Media:** `ffprobe` for codec/bitrate/duration; manual MP4 atom walk for `moov` position.
- **Viewports:** 1440×900 desktop, 820px tablet, 390px mobile (iframe-isolated so media queries resolve).

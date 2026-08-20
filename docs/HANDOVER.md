# Session Handover — Maendeleo Bank PLC website

> **Last updated:** 20 August 2026 · **Status:** demo-ready build, 44/50 audit findings fixed
> **Read first:** `docs/frontend-audit.md` (the work tracker), `DESIGN.md` (design tokens),
> `AGENTS.md` (project rules). This file is the "where are we" summary — the audit doc is the
> source of truth per finding.

---

## 1. What this project is

Next.js 16.3.1 (App Router, Tailwind v4, TypeScript) corporate website for Maendeleo Bank PLC,
built as a **demo submission for their Corporate Website Redesign RFQ** (tender closes
31 Aug 2026). Supabase CMS + admin at `/admin`, AI chat assistant, live forex via BoT.

**Never commit without being asked.** All work so far sits uncommitted in the working tree on
top of commit `b6b73b3`.

Verify anything with: `npm run build` (must pass; ~30s, 33 routes).

## 2. Audit progress (docs/frontend-audit.md)

**44 of 50 findings fixed and ticked.** Six remain open — all blocked on the client, each with a
`> Note:` under the finding explaining what shipped and what's missing:

| Finding | Waiting for |
|---|---|
| F08 | Real WhatsApp Business number (button kept for demo, `TODO(F08)` in `components/chat/chat-panel.tsx`) |
| F09 | Reversed/mono logo as SVG (white chips still in navbar/footer/chat header) |
| F26 | Indicative loan rates cleared by credit; repayment calculator (Apply CTAs + filler card already shipped) |
| F27 | Branch street addresses, phones, hours, ATM list (directions links already shipped) |
| F37 | Compliance-approved privacy policy text (Legal column exists, page not created) |
| F39 | BoT licence number, DIB statement, complaints procedure, T&Cs, tariffs guide |

**Raise these with the client immediately** — they're also listed in the audit's "Blocked on the
client" section at the top.

## 3. Architecture decisions made (don't undo these)

- **Type system lives in code:** `@theme` in `app/globals.css` defines `text-display-hero/xxl/xl/lg/md`,
  `text-heading-lg/md/sm`, `text-body-lg/md`, `text-body-tabular`, `text-button-md/sm`, `text-caption`,
  `text-micro` (12px floor), `text-eyebrow` (11px/500, only sub-12px exception). Use these, not
  arbitrary `text-[..]`. Body copy is weight 400; 300 only ≥32px. `font-heading` = Source Serif 4
  (display only), Inter for body.
- **Colour rules:** text-bearing accent CTAs use `bg-brand-green-deep` (#157a2f); #1b9f3c is
  non-text only. Text on dark plum uses `text-brand-soft-on-dark` (#c79bd4); #a86bb1 is
  fills/borders only.
- **CMS reads:** `lib/content.ts` — `unstable_cache` with tags `news`/`careers`/`tenders`/`reports`,
  read via **anon key** (RLS allows public read of published rows). Every `app/admin/actions/*.ts`
  mutation calls `revalidateTag(tag, "max")` (Next 16 two-arg signature — the one-arg form is
  deprecated). Public pages render CMS rows when present, **hardcoded content as fallback** —
  keep that fallback pattern. `site_content` has no public consumer yet.
- **Caching model:** classic (`unstable_cache` + `revalidateTag`), NOT Cache Components — the
  audit suggested `use cache`/`updateTag`; we deliberately stayed on the stable model. `next.config.ts`
  is untouched.
- **Dates:** one formatter, `lib/format.ts` (`formatDate`, `formatDateTime`, en-GB). Financial
  data gets a timestamp.
- **Contact form:** server action `app/(site)/contact/actions.ts` → `enquiries` table
  (**migration `supabase/migrations/0002_enquiries.sql` must be applied to the Supabase project**),
  honeypot field `company`. No admin UI for enquiries yet (follow-up).
- **Media:** hero video is 1.08 MB faststart H.264 (re-encoded from 17.7 MB; the ffmpeg box lacks
  libwebp — use `cwebp` for WebP). Logos: `public/logo.webp` (600px), `public/brand-mark.webp` (64px);
  PNGs kept only for OG/manifest. Corporate photos live in `public/images/` as semantic WebP slugs
  (old `Corporate images/` deleted). Flags: self-hosted lipis/flag-icons in `public/flags/`.

## 4. Known partial work / deliberate deviations

- **F02:** `site_content` table has invalidation wired but no public reader — first consumer TBD.
- **F28:** news list items have no thumbnails (CMS stories may lack images).
- **F38:** footer is a full sitemap but hardcoded — `TODO(F38)` in `components/site/footer.tsx`:
  derive from a shared route list with the navbar.
- **F10:** logo ships as optimized WebP, not SVG (no vector source until F09 unblocks).
- **F13 follow-up:** add an ESLint rule banning `text-[<px>]` arbitrary values once remaining
  components are migrated (several inner pages still have some).
- Chat header still uses the white-chip logo (F09) but now via `brand-mark.webp`.

## 5. Natural next tasks (priority order)

1. **Apply `supabase/migrations/0002_enquiries.sql`** and smoke-test the contact form end-to-end.
2. **Admin UI for enquiries** (read side of F49) — belongs in `app/admin/(dashboard)/`.
3. Client assets arrive → F09 reversed logo (delete the 3 white chips), F08 number, F26 rates,
   F27 branch data, F37/F39 legal pages.
4. Visual QA pass at 1440/820/390 against the audit's measurement method (appendix in audit doc).
5. Optional: migrate remaining `text-[..]` arbitrary values to tokens, then add the lint ban (F13).
6. Optional: `site_content` public consumer (e.g. announcement bar, hours).

## 6. House rules recap

- Reference finding IDs in commits (`fix(hero): ... (F01)`); tick checkboxes only when merged;
  add `> Note:` for deviations — never delete findings.
- Content only from `docs/maendeleo-bank-info/*.md` — never invent copy, figures, rates, or
  branch/legal details.
- Next.js 16 has breaking changes: check `node_modules/next/dist/docs/` before touching framework
  APIs (e.g. `revalidateTag` needs `"max"`).
- Design tokens in `app/globals.css` `@theme` + `DESIGN.md` — keep both in sync (AGENTS.md §1).

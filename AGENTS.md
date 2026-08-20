<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Maendeleo Bank — project rules

## Design system

`DESIGN.md` is the single source of truth for colour, type, spacing, elevation and component
behaviour. Reference its tokens; never invent new ones. Do not introduce arbitrary Tailwind values
(`text-[15px]`, `bg-[#843b8d]`) where a token exists.

The type scale and colour tokens live in `@theme` in `app/globals.css` as real utilities —
`text-display-hero/xxl/xl/lg/md`, `text-heading-lg/md/sm`, `text-body-lg/md`, `text-body-tabular`,
`text-button-md/sm`, `text-caption`, `text-micro`, `text-eyebrow`, `text-brand-soft-on-dark`,
`bg-brand-green-deep`, `border-hairline`, `font-heading`. Use them in components instead of raw
arbitrary values. Body copy is weight 400; 300 is display-only (≥32px). Text-bearing accent CTAs
use `#157a2f` (brand-green-deep); `#1b9f3c` is for non-text fills only.

## Open frontend audit

`docs/HANDOVER.md` summarises current progress, architecture decisions and next tasks — read it
first when resuming work.

`docs/frontend-audit.md` lists 50 open findings (`F01`–`F50`) with severity, affected files and the
agreed fix for each.

- **Read it before changing anything under `app/(site)/**` or `components/site/**`** — the change you
  are about to make may already be specified there.
- Reference the finding ID in commits and PRs: `fix(hero): re-encode background video (F01)`.
- Tick the checkbox in that file when a fix merges. Do not delete findings.
- If you deviate from a documented fix, say so in the PR and update the finding.

Eight findings are marked `BLOCKER` and must land before launch.

## Content

Site copy and product facts come from `docs/maendeleo-bank-info/*.md`. Never write placeholder copy,
lorem ipsum, or invented figures, branch names, rates or product names.

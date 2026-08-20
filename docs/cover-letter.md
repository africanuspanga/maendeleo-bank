# Cover Letter — RFQ for Corporate Website Revamp & Redesign

**To:** Maendeleo Bank Plc — tenders@maendeleobank.co.tz
**Reference:** Request for Proposal (RFQ) for Corporate Website Revamp & Redesign
**Date:** [Submission date — before the deadline of 31st August 2026]
**From:** [Company name] · [Contact person, title] · [Email / phone]

---

Dear Sir/Madam,

Thank you for the opportunity to respond to the **RFQ for Corporate Website Revamp &
Redesign**. Rather than describing what we would build, we have already built it: this
letter accompanies a working demonstration of the new Maendeleo Bank corporate website,
developed against the functional and non-functional scope in your RFQ. Every item below
can be seen live in the accompanying demo.

## What the demo delivers, mapped to your requirements

### 4.1 — Site structure and navigation
- The site is organised into the four zones you specified — **Personal Banking, Business
  Banking, Institutional Banking and Investor Relations** — each carrying its own subtle
  colour identity built on the Bank's core purple (blue, green, charcoal and grey accents
  respectively), so a visitor always knows which part of the Bank they are in.
- Top-level navigation follows your list exactly: Personal, Business, Institutional,
  Investor Relations, News & Media, About Us, Careers — with a News/Updates page included.

### 4.2 — Homepage and quick actions
- The homepage opens with the RFQ's task-based quick-action set — **Save, Borrow, Send
  money, Open an account, Check rates** — each one click from the right destination.
- A **live FX rates widget** sits on the homepage, always showing a last-updated time,
  fed by the Treasury backend (see 4.9) with a resilient fallback.

### 4.3 — Personal Banking
- All seven account products are presented with full features and requirements.
- A **compare-accounts view** shows the three core savings products (Maendeleo Saving,
  Ahadi, Wekeza) side by side — opening balance, withdrawal rules, charges, interest
  tier, card and mobile eligibility.
- A **loan calculator** (reducing balance, the same basis the Bank prices on) is live on
  the Loans page — the same calculator the Bank's current site refers customers to.

### 4.4 — Business Banking
- A fully separate Business zone: business accounts, SME support and trade-related
  content, with no personal-banking material in the way.

### 4.5 — Institutional Banking
- A distinct institutional landing page giving the Bank's founding relationship with the
  **Evangelical Lutheran Church in Tanzania, Eastern and Coastal Diocese** a proper home,
  with a clear relationship-manager contact path — exactly the phase-one scope you described.

### 4.6 — Investor Relations
- **On-page share information block**: share price, 2026 price range, market
  capitalisation and EPS — every figure labelled with its as-of date and source, with a
  direct link to the live DSE profile.
- **Investment trend calculator**: a visitor enters an amount and a past date and sees
  what that MBP investment would be worth today.
- Annual reports, audited financial statements and regulatory disclosures organised by
  year; AGM books 2018–2026; shareholding structure; share capital; AGM and dividend
  notices. The section is fast, document-first and analyst-friendly.

### 4.7 — News and Media
- A CMS-driven news feed with a designed article template, ready for category tagging
  and a separated press-release stream (both included in the build plan).

### 4.8 — AI customer assistant
- A custom assistant available site-wide ("Let's Chat" launcher), trained on the Bank's
  own published content — products, branches, agents, USSD, digital banking — and
  bilingual in English and Swahili.
- Clean human handoff: unanswered or account-specific queries direct to the toll-free
  line (0800750089), with a WhatsApp path inside the chat on mobile.
- The assistant's knowledge is structured so Corporate Affairs can maintain it; the admin
  feedback loop for unanswered questions is part of the delivery plan, and all data-handling
  terms are available for Risk & Compliance review before any provider is confirmed.

### 4.9 — Treasury and share price backends
- A working **Treasury backend** where staff update FX buy/sell rates directly, with the
  update time always visible on the public site.
- The share price module is built with a manual-update data seam (`lib/share-price.ts`)
  ready for a designated Finance/IR user or the DSE API once access is confirmed —
  exactly the fallback arrangement your RFQ allows.
- Role-restricted access for Treasury, Finance/IR and Corporate Affairs is configured at
  go-live (the demo runs open for review convenience).

### 4.10 — Content management and future scaling
- A full **CMS admin** where non-technical staff manage news, reports, careers, tenders,
  forex rates and site content without developer involvement.
- Built on a modern, component-based architecture (Next.js) that accommodates microsites,
  campaign pages and a later online account-opening phase without rebuilding the core site.
- A general enquiry form with spam protection, routed for delivery to the correct
  department mailbox.

### Section 5 — Non-functional requirements
- **Fully responsive, mobile-first** — verified across phone, tablet and desktop with no
  layout overflow.
- Performance-focused build (optimised fonts, media and rendering) targeting your
  sub-3-second requirement, with Investor Relations prioritised.
- HTTPS, minimal dependency footprint, and Tanzania Personal Data Protection Act-aligned
  form handling are part of the production hardening checklist; hosting, WAF, backups and
  maintenance windows are agreed with IT post-award as your RFQ anticipates.

## Delivery model

- Staging and production environments with source code and build documentation handed
  over, so the Bank is never dependent on a single developer or agency.
- CMS training for Corporate Affairs staff, and a post-launch support and maintenance
  proposal, are included in the accompanying quotation.

We would welcome the opportunity to walk your team through the demo live. The build is
ready for your feasibility, hosting and integration discussions with IT — including DSE
API access, analytics, and Risk & Compliance review of the AI assistant's data terms.

Yours faithfully,

[Name]
[Title], [Company name]
[Email] · [Phone]

---

*Note: bracketed fields are to be completed with the bidding company's details before
submission. Attach the company profile, portfolio with at least six client references,
proposed team, itemised quotation, timeline, business licence and tax clearance as
required by Section 11 of the RFQ.*

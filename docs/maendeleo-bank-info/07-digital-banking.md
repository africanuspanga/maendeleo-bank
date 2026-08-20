# Digital Banking — Maendeleo Bank Plc

Scraped: 2026-08-19

Sources:
- https://maendeleobank.co.tz/index.php/mbmobile/ (page title: "mbmobile – Maendeleo Bank PLc")
- https://maendeleobank.co.tz/index.php/lappage/ (page title: "cxlab – Maendeleo Bank PLc")
- Site-wide header/footer (present on all pages)

---

## MB Mobile / Mobile Banking (USSD)

Tagline on page: **"Banking at your fingertips — Dial *150*52#"**

Verbatim intro from the MB Mobile page:

> "Maendeleo Bank is committed to offering convenient, secure, and innovative banking solutions through our mobile banking platform. Access our services using the USSD code *150*52# for a seamless banking experience."

Mobile banking services listed on the page (verbatim headings + descriptions):

1. **Transfer Transactions Within the Bank** — "Easily transfer funds between accounts within Maendeleo Bank. This service is fast, secure, and available 24/7, ensuring that your money moves whenever needed."
2. **External Transfers** — "Send money to accounts outside Maendeleo Bank. Whether it's paying for services, sending money to friends and family, or handling business transactions, our platform makes it simple and secure."
3. **Bill Payments** — "Pay your utility bills, including electricity, directly from your mobile device. This feature helps you manage your bills effortlessly and on time."
4. **Withdrawals via Agency Banking** — "Use our One-Time Password (OTP) system to withdraw cash from our extensive network of agency banking locations. This service provides flexibility and convenience, especially for customers who need cash access in areas without physical bank branches." (OTP-based cash withdrawal at Maendeleo Bank wakala/agents.)
5. **Airtime Top-Up** — "Purchase airtime for any mobile network directly through our mobile banking service. This service is quick and convenient, ensuring that you stay connected at all times."
6. **Additional Services** — "Our mobile banking platform also offers services such as checking account balances, viewing transaction history, and managing your account settings. These features are designed to provide comprehensive banking solutions at your fingertips."

### App / download links
- **No Google Play or Apple App Store links exist anywhere on the MB Mobile page** (checked raw HTML for play.google / apps.apple / appstore — zero matches). The site presents MB Mobile as a USSD (*150*52#) service, not a downloadable app.
- No APK or other download links found either.

## Internet Banking
- The site-wide header menu contains an **"Internet Banking"** link pointing to: `http://ibanking.maendeleobank.co.tz` (note: plain HTTP, separate subdomain — external login portal).
- No dedicated internet-banking content page was found in the site menu; only this external portal link.
- Call Center number shown in the same header: **0800750089** (toll free).

---

## What `/index.php/lappage/` turned out to be

- **It is a homepage-style landing page** (WordPress page slug "lappage" = "landing page"; the browser `<title>` is the leftover theme name "cxlab"). It is not a separate digital-banking page.
- Contents found on it:
  - **"REQUEST FOR QUOTATION (Click to download)"** — a "Click here" link that actually points to `https://maendeleobank.co.tz/wp-content/uploads/2024/06/Annual-Report-2023-Final.pdf` — i.e. **the link label and target are mismatched** (an RFQ label linking to the Annual Report 2023 PDF). Noted as a site content error.
  - **News & Events section:**
    - **'Maendeleo Bank Launch "Hatua ya Faraja Msimu wa Pili"'** — "The Maendeleo Bank marathon's 'Hatua Ya Faraja Msimu wa Pili' season has kicked off with an event at Luther House. The race's goal this year is to raise more than Tsh 200 million to support the KCMC Moshi Hospital's autism program for kids." Has a "Register Now" button linking to `https://events.maendeleobank.co.tz/`. Dates shown near the item: March 20, 2026 and November 6, 2025. Links to the post: `https://maendeleobank.co.tz/index.php/2024/08/12/maendeleo-bank-launch-hatua-ya-faraja-msimu-wa-pili/`
    - **"Mkurugenzi Mtendaji aanza kazi rasmi"** (Swahili: "Managing Director officially starts work") — dated January 2, 2025; links to `https://maendeleobank.co.tz/index.php/2025/01/02/mkurugenzi-mtendaji-aanza-kazi-rasmi/`
  - The **same "Banking at your fingertips — Dial *150*52#"** MB Mobile summary block as on the mbmobile page, with a "Read More" link (points to the mbmobile page).

---

## Site-wide digital/contact touchpoints (header/footer of every page)
- Head Office: **Luther House, P.O. Box 216, Dar es Salaam**
- Email: **Info@maendeleobank.co.tz**
- Toll Free: **0800750089**
- Social links (footer): Facebook `https://www.facebook.com/maendeleobankplctz`, Instagram `https://www.instagram.com/maendeleobankplc/`, X/Twitter `https://twitter.com/Maendeleobanktz`, WhatsApp (icon present; no plain-text number captured)
- Other header links: "Where are we", Tender, Career, Whistle Blowing
- Footer open hours are **contradictory between two footer blocks on the same pages**:
  - Block A (©2026): Monday–Friday 8:30am–16:00pm; Saturday 8:30am–1:00pm; Sunday and Holiday Closed
  - Block B (©2024): Monday–Thursday 08–17:00; Saturday (09:00 AM–16:00 PM); Saturday (12:00 PM–16:00 PM) — note "Saturday" appears twice and Friday is missing; the ©2026 block is likely newer.

## Not retrieved / not found
- No standalone "internet banking" features page (only the external portal link above).
- No mobile-app store listings or download links on the site pages scraped.

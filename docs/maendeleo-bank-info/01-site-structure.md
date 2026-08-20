# 01 — Site Structure & Sitemap

Source: https://maendeleobank.co.tz/ and https://maendeleobank.co.tz/wp-sitemap.xml
Scraped: 2026-08-19

## Platform notes

- WordPress site (uses `index.php/` permalink style), built with Elementor + Pro Elements, Royal Elementor mega menu (`wpr_mega_menu`).
- Bilingual: primarily Swahili content on homepage/news; English and Swahili pages mixed.
- Homepage features a **live Forex Exchange Rates table** (buying/selling). Rates captured 2026-08-19:

| Currency | Code | Buying | Selling |
|---|---|---|---|
| USA CASH (50–100) | USD | 2,560.00 | 2,650.00 |
| USA CASH (1–20) | USD | 2,530.00 | 2,620.00 |
| Euro | EURO | 2,800.00 | 2,905.00 |
| United Kingdom | GBP | 3,200.00 | 3,320.00 |
| Kenya | KES | 18.50 | 19.20 |
| South Africa | ZAR | 124.00 | 128.90 |

- Homepage hero/news snippet (Swahili): KKKT Presiding Bishop Dr. Alex Malasusa officially launched a new Maendeleo Bank PLC branch in Arusha on Tuesday 24 Feb 2026 — the bank's 6th branch and first outside Dar es Salaam region.

## Sitemap index (wp-sitemap.xml)

Sub-sitemaps:
- wp-sitemap-posts-post-1.xml (6 posts)
- wp-sitemap-posts-page-1.xml (30 pages)
- wp-sitemap-posts-wpr_mega_menu-1.xml (1 mega-menu item — internal)
- wp-sitemap-taxonomies-category-1.xml (3 categories)
- wp-sitemap-users-1.xml (authors — not scraped)

## Main navigation (from homepage header links)

- Home — https://maendeleobank.co.tz/
- About Us — /index.php/about-us/ (anchors: #ourjourney, #corevalues)
- Personal Banking — /index.php/personal-banking/
- Business Banking — /index.php/business-banking/
- Loans — /index.php/loans/
- MB Mobile — /index.php/mbmobile/
- Board of Directors — /index.php/mbdirectors/
- Management — /index.php/mbmanagement/
- Investor Relations: Annual Reports (/index.php/annual-reports/), AGM Book (/index.php/agm-book/), Financial Report (/index.php/financial-report/), Reports (/index.php/reports-2/), Taarifa ya Mkutano Mkuu (/index.php/taarifa-ya-mkutano-mkuu/)
- Agents (Orodha ya Maendeleo Bank Wakala) — /index.php/orodha-ya-maendeleo-bank-wakala/
- News/Events — /index.php/events/
- Career — /index.php/career/
- Tender — /index.php/tender/
- Whistle Blowing — /index.php/whistle-blowing/
- Privacy Policy — /index.php/privacypolicy/

## All pages in wp-sitemap-posts-page-1.xml (30) — scrape status

| # | URL | Scraped | Notes |
|---|-----|---------|-------|
| 1 | https://maendeleobank.co.tz/ | ✅ | Homepage (FX table, news) |
| 2 | /index.php/personal-banking/ | see 04 | |
| 3 | /index.php/reachout/ | see 13 | Contact / reach out |
| 4 | /index.php/loans/ | see 06 | |
| 5 | /index.php/about-us/ | see 02 | |
| 6 | /index.php/business-banking/ | see 05 | |
| 7 | /index.php/investors-relations/ | see 10 | |
| 8 | /index.php/agents/ | see 09 | |
| 9 | /index.php/lappage/ | see 07 | Likely "LA page" (digital?) |
| 10 | /index.php/board_of_directors/ | see 03 | |
| 11 | /index.php/taarifa-ya-mkutano-mkuu/ | see 10 | AGM notice (SW) |
| 12 | /index.php/reports-2/ | see 10 | |
| 13 | /index.php/annual-reports/ | see 10 | |
| 14 | /index.php/agm-book/ | see 10 | |
| 15 | /index.php/orodha-ya-maendeleo-bank-wakala/ | see 09 | Agent list (SW) |
| 16 | /index.php/temp/ | see 14 | Unknown/temp page |
| 17 | /index.php/career/ | see 12 | |
| 18 | /index.php/insurance/ | see 05 | Bancassurance |
| 19 | /index.php/mbmobile/ | see 07 | |
| 20 | /index.php/events/ | see 11 | |
| 21 | /index.php/tender/ | see 14 | |
| 22 | /index.php/management/ | see 03 | |
| 23 | /index.php/privacypolicy/ | see 14 | |
| 24 | /index.php/mbmanagement/ | see 03 | |
| 25 | /index.php/mbdirectors/ | see 03 | |
| 26 | /index.php/maendeleo-benki-ya-kitaifa/ | see 02 | National-bank announcement (SW) |
| 27 | /index.php/maendeleo-bank-plc-yazindua-mtandao-wa-biashara-kupitia-sme-clinic/ | see 11 | SME Clinic launch (SW) |
| 28 | /index.php/maendeleo-bank-yazindua-tawi-jipya-arusha/ | see 11 | Arusha branch launch (SW) |
| 29 | /index.php/whistle-blowing/ | see 14 | |
| 30 | /index.php/financial-report/ | see 10 | |

## Posts in wp-sitemap-posts-post-1.xml (6) — scrape status

| URL | Scraped |
|-----|---------|
| /index.php/2024/08/06/2572/ | see 11 |
| /index.php/2024/08/06/share-dividend-and-share-sale-for-maendeleo-bank-shareholders/ | see 11 |
| /index.php/2024/08/02/maendeleo-bank-launch-hatua-ya-faraja-msimu-wa-pili/ | see 11 |
| /index.php/2025/01/02/mkurugenzi-mtendaji-aanza-kazi-rasmi/ | see 11 |
| /index.php/2025/11/06/maendeleo-bank-plc-sasa-ni-benki-ya-kibiashara-ya-kitaifa/ | see 11 |
| /index.php/2026/03/20/whistle-blowing/ | see 11 |

## Categories

- /index.php/category/uncategorized/
- /index.php/category/eventnews/
- /index.php/category/latest_news/

## Other endpoints discovered

- WP REST API available: /index.php/wp-json/ (e.g. /index.php/wp-json/wp/v2/pages/14)
- Feeds: /index.php/feed/, /index.php/comments/feed/
- Mega menu item: /?wpr_mega_menu=wpr-mega-menu-item-1229
- External portals: http://ibanking.maendeleobank.co.tz (internet banking, plain HTTP), http://events.maendeleobank.co.tz

## Scrape outcome summary (2026-08-19)

- All 30 sitemap pages + all 6 posts + 3 category pages were attempted; every URL returned HTTP 200. No page is marked "not retrieved" for access reasons.
- Content gaps are source-site gaps, not scrape failures:
  - /index.php/insurance/ — empty shell (header/footer only, no content published)
  - /index.php/investors-relations/ — landing page is empty (heading only)
  - /index.php/privacypolicy/ — mispublished HR-manual text, no actual privacy policy
  - /index.php/temp/ — empty WordPress placeholder page (ID 2374)
  - Posts /2024/08/06/2572/ ("Overview of Mobile Banking Services") and /2024/08/06/share-dividend-and-share-sale-for-maendeleo-bank-shareholders/ — bodies not retrievable (JS/page-builder render); headline + date captured only
  - /index.php/events/ — listing body not retrievable (boilerplate only)
  - /index.php/lappage/ — leftover landing page (browser title "cxlab"), content captured
- Two generations of leadership pages coexist: /mbdirectors/ + /mbmanagement/ (current, with bios) vs /board_of_directors/ + /management/ (stale legacy rosters still live)
- www.maendeleobank.co.tz does not resolve (DNS) — non-www only
- News category pagination: /page/2/ returns 404 on both news categories — listings are complete

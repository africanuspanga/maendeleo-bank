# Business Banking — Maendeleo Bank Plc (incl. Insurance/Bancassurance)

- **Source URL:** https://maendeleobank.co.tz/index.php/business-banking/
- **Scrape date:** 2026-08-19
- **Method:** FetchURL (main text) + raw HTML via `curl` (product names and feature lists live in Elementor tabs hidden from the text extractor; recovered from raw HTML).
- **Products found:** 4 — Business Current Account, Flexi Fixed Account, Fixed Deposit Account, Community Account.
- **Note:** Page renders each product twice (desktop + mobile widget); content de-duplicated. No numeric interest rates published.

---

## 1. Business Current Account

> "Business Current Account is a cheque account that is specifically designed to cater for your business banking needs. Enjoy the convenience of paying by cheque and drawing money without restrictions. A current account from MB Bank is ideal for managing and controlling your business transactions anytime, anywhere"

**Key features of business account:**
- Account can be opened and operated in TZS, USD, EURO, GBP
- Opening balance of TZS 100,000, and USD 100, GBP 100 and EURO 100.
- Cheque to facilitate cash withdrawal and transfers.
- Overdraft facility for those who meet loan conditions.

**Requirements for a Limited Company:**
- Certificate of incorporation (Original & Photocopy)
- Memorandum and Article of Association
- Business License
- Minutes with resolution to open an account at MB Bank
- Letter of application for account opening
- TIN number and or VAT registration certificate

## 2. Flexi Fixed Account

> "It is fixed deposit account with maximum tenure of a year, where a customer invests funds for a period of 12 months or less with an option to extend period at new agreed terms (Amount, Time and Rate) with an option to received interest income at the beginning, monthly or at the end."

**Key Features:**
- Operating Currency is TZS.
- Minimum fixing amount: TZS 200,000
- Maturity tenure is 12 months.
- Fixed Interest Rate for a period of one year
- Interest paid at beginning of the contract
- Interest paid Monthly on a different account selected by the customer (Normally Savings Account)
- Interest paid at the end of the contract
- Certificate of Deposit/Fixed Deposit Receipt (FDR) is issued
- Forego 50% of the interest earned on premature closure (recovered from the earned interest).

**Key Benefits:**
- High return investment – competitive interest rate is offered
- Ability to access interest income before maturity of the investment, at the beginning, monthly or at the end of the tenure.
- Risk free investment
- Emergency loan of up to 90% of the deposits (lien).

## 3. Fixed Deposit Account (Business)

> "It is a time deposit with fixed terms where a certain amount of money is kept in the account for predetermined fixed time (Investment duration ranges from 3 or 6 or 9 or 12 months) and competitive interest rate is given."

**Key Benefits:**
- Funds are invested in fixed period – for a maximum of one year
- Interest is paid on maturity
- Investment duration ranges from 3 or 6 or 12 or 24 months *(published inconsistently: "3/6/9/12" vs "3/6/12/24")*
- Fixed Deposit receipt is given to a customer as certificate of deposits which is presented for payment during maturity
- It can be renewed as per customer's instructions
- It can be opened in either of TZS, USD, GBP and EURO
- Opening balance is TZS 200,000
- Prematurely withdrawal attracts a penalty

*(Content identical to the Personal Banking Fixed Deposit Account as published.)*

## 4. Community Account

> "Community account is an account which can be opened and operated by a religious institution and NGO"

**Benefits of community account:**
- Available in TZS, EURO and GBP
- Low opening balance of TZS 50,000, EURO 50 and 50 GBP
- Access to MB treasury products and local & international payment facilities (TISS & TT)
- Transact through our Branch network
- Make deposits into your account easily
- Gives you access to the MB credit facilities
- Access to Cheque book free of cheque
- Local transfers to other banks at free of charge

**Requirements of a community account:**
- Signatories ID (Voter ID or Driving license or Passport.)
- Original and copy of the certificate of registration
- Original and copy of the Constitution
- Original and copy of the Tax Identification Number (TIN)
- Minutes of the meeting appointing names of the officers authorized to operate the account with mandate on how the account will be operated

---

## Insurance / Bancassurance

- **Source URL:** https://maendeleobank.co.tz/index.php/insurance/
- **Scrape date:** 2026-08-19
- **Status: NOT RETRIEVED (no content published).** The page loads successfully (HTTP 200) but contains **no insurance or bancassurance content at all** — verified via raw HTML (`curl`), which shows only the site header, navigation, and footer. No product names, no feature text, no mention of "bancassurance" anywhere in the page source.
- Related: several loan products mention embedded credit insurance ("The loan is insured against death and permanent disability") — see `06-loans.md` — but there is no standalone insurance product catalog on the site.

### Not retrieved / not published
- No interest rate figures on any business product ("competitive" only).
- No SME/corporate account variants beyond the four above (no dedicated "SME account" or "Corporate account" product — MSME is served via loans).
- Insurance/bancassurance page is an empty shell.

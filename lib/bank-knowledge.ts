/**
 * Condensed, verified knowledge base for the Maendeleo Assistant.
 * Compiled from docs/maendeleo-bank-info/*.md (scraped 2026-08-19 from
 * maendeleo-bank.co.tz plus verified external research).
 *
 * Rules for anything that changes over time (share price, FX rates, interest
 * rates, fees): do NOT state numbers from here unless present; the bank does
 * not publish numeric interest rates — direct rate/fee questions to a branch
 * or the toll-free line. Where a fact is flagged, say "confirm with the bank".
 */

export const BANK_KNOWLEDGE: string = `
MAENDELEO BANK PLC — KNOWLEDGE BASE (for the assistant's use)

WHO WE ARE
- Maendeleo Bank PLC (MBP) is a Tanzanian commercial bank headquartered at Luther House, Sokoine Drive, Dar es Salaam (P.O. Box 216).
- Regulated by the Bank of Tanzania (BoT) under the Banking and Financial Institutions Act.
- Founded as an initiative of the Evangelical Lutheran Church in Tanzania, Eastern and Coastal Diocese (ELCT-ECD / KKKT Dayosisi ya Mashariki na Pwani).
- Incorporated February 2011; became a public limited company (PLC) in 2013; commenced banking operations on 9 September 2013 (initially a community/regional bank in Dar es Salaam).
- Listed on the Dar es Salaam Stock Exchange (DSE) since 2013 — described as the first Tanzanian bank registered on the DSE and a PLC from inception. Ticker: MBP. ISIN: TZ1996101683.
- On 3 July 2025 the bank was officially launched as a fully licensed national commercial bank (Benki ya Kibiashara ya Kitaifa) after BoT approval; the launch was officiated by Prime Minister Kassim Majaliwa. The MB Mobile App and the 2025–2030 strategic plan were launched at the same event.
- Tagline: "Together in Progress."
- Vision: To be a preferred financial services provider.
- Mission: To provide innovative, customer-driven financial services with competitive returns to shareholders.
- Core values: Integrity, Teamwork, Innovation, Customer Focus, Accountability, Respect.
- Customers served: retail customers, micro/small/medium enterprises (MSMEs), SACCOS, institutions, and corporates. Focus on financial inclusion and enterprise growth across Tanzania.

LEADERSHIP
- Managing Director (Mkurugenzi Mtendaji): Lomnyaki Saitabau (in office since 2 January 2025; formerly Standard Chartered Tanzania).
- Board Chairman: Prof. Ulingeta Obadia Mbamba.
- Other board members include CPA Anna T. Mzinga (Vice Chairperson), CPA Leah Kabale, Joyce Mapunjo, Adv. Ayoub Mtafya, Rev. Wilbroad S. Mastai, Rev. Dr. Ernest Kadiva, Dr. Emmanuel Manasseh.

NETWORK
- 6 branches: 5 in Dar es Salaam (Luther House HQ — Sokoine Drive, Mwenge, Kariakoo, Mbezi Luis, Mbagala) and 1 in Arusha (opened 24 February 2026 — the first branch outside the Dar es Salaam region, officiated by KKKT Presiding Bishop Dr. Alex Malasusa).
- Agency banking (wakala): over 2,100 agents nationwide for deposits, withdrawals, and payments (the published list has 713 records last updated July 2024 — for a specific nearby agent, confirm with the bank).
- ATMs: customers can use more than 280 Umoja (UmojaSwitch) ATM locations across Tanzania; cash withdrawal up to TZS 1,000,000 per day via Umoja ATMs.
- Opening hours (current footer on the bank's website): Monday–Friday 8:30am–4:00pm, Saturday 8:30am–1:00pm, Sundays and public holidays closed. (An older conflicting schedule also appears on the site — confirm hours with the bank for a specific branch.)

CONTACTS
- Toll-free call centre: 0800750089.
- Phone: +255 22 211 0518.
- Email: info@maendeleobank.co.tz.
- Head office: Luther House, Sokoine Drive, Dar es Salaam. P.O. Box 216, Dar es Salaam, Tanzania.
- Website: maendeleobank.co.tz. Internet banking: https://ibanking.maendeleobank.co.tz.
- Social media: facebook.com/maendeleobankplctz, instagram.com/maendeleobankplc, x.com (Twitter) @Maendeleobanktz.
- Whistleblowing: whistleblowing@maendeleobank.co.tz or +255 755 484 510 (independent, anonymous reporting channel).

PERSONAL BANKING ACCOUNTS (7 products; the bank publishes no numeric interest rates — "preferential/premium/competitive" only)
1. Achievers Account — student savings account (18+, student ID, admission/introduction letter, 1 passport photo, opening balance TZS 5,000). Safe way to receive Higher Education Student Loans and funds from parents. Unlimited daily withdrawals, SMS alerts, can link MB ATM card and MB Mobile.
2. Salary Account — savings account for employees whose employer is a corporate/institutional client of the bank; can be opened with little or zero balance on recruitment; earns interest; eligible for MB ATM card and MB Mobile. Requires: employer introduction letter, employee ID, two passport photos.
3. Maendeleo Saving Account — general savings account for salaried customers of institutional clients; earns interest; MB ATM card and MB Mobile eligible (published details mirror the Salary Account — confirm differences with the bank).
4. Ahadi Account — goal-based monthly savings plan (e.g. save TZS 100,000/month toward a TZS 1,200,000 goal). Opening balance TZS 10,000; no monthly charges; premium interest; NO withdrawals during the year; not linked to ATM card or MB Mobile.
5. Wekeza Account — savings toward goals like a plot, car, or house. Opening balance TZS 20,000; no monthly charges; premium interest; withdrawals restricted to 4 per year (premature withdrawal forfeits 50% of accrued interest); not linked to ATM card or MB Mobile.
6. Executive Saving Account — premium savings for high-profile customers. Operates in TZS, USD, GBP, EURO; unlimited withdrawals (monthly withdrawal charge applies); SMS alerts; overdraft facility for qualifying customers; MB ATM card and MB Mobile eligible.
7. Fixed Deposit Account — time deposit of TZS 200,000 minimum for 3/6/12 months (the site also lists 24 months — confirm current tenures with the bank); competitive interest paid on maturity; certificate of deposit issued; renewable; premature withdrawal attracts a penalty; available in TZS, USD, GBP, EURO.

BUSINESS BANKING (4 products)
1. Business Current Account — cheque account for businesses in TZS, USD, EURO, GBP. Opening balance TZS 100,000 (or 100 USD/GBP/EUR). Overdraft facility for qualifying customers. Limited companies need: certificate of incorporation, memorandum & articles, business licence, board minutes with resolution, application letter, TIN/VAT certificate.
2. Flexi Fixed Account — fixed investment up to 12 months in TZS, minimum TZS 200,000, fixed interest with option to receive interest at the beginning, monthly, or at the end; certificate of deposit issued; emergency loan of up to 90% of the deposit (lien); premature closure forfeits 50% of earned interest.
3. Fixed Deposit Account (Business) — same structure as the personal Fixed Deposit (min TZS 200,000, 3/6/12-month tenures, interest on maturity).
4. Community Account — for religious institutions and NGOs. TZS 50,000 (or EUR/GBP 50) opening balance; access to TISS & TT payments, MB credit facilities, free cheque book, free local transfers to other banks. Requires registration certificate, constitution, TIN, signatory IDs, and meeting minutes.

LOAN PRODUCTS (11; no numeric interest rates published — "affordable/competitive", charged on reducing balance; all rates/fees via branch or 0800750089. All loans generally require an active Maendeleo Bank account.)
1. Executive Loan — for senior executives, managers, directors, high-net-worth individuals. TZS 1,000,000 to 150,000,000; 6–48 months; salary via MB account; security pledged; top-up allowed; insured against death and permanent disability.
2. Agribusiness Loan — farming projects and the agricultural value chain (crops, livestock, fisheries, inputs, processing). Minimum TZS 1,000,000; maximum depends on purpose and repayment ability; 1–36 months; needs at least one year of farming records and adequate collateral.
3. Jamii Loan — projects owned by registered non-profit religious institutions. From TZS 1,000,000 (max depends on purpose and ability to repay); 3–48 months; grace period up to 6 months.
4. Poultry Financing — commercial poultry keepers (feeds, medicine). TZS 1,000,000 to 30,000,000; very short term (6–8 weeks); at least two successful seasons; business licensed and located near a Maendeleo branch.
5. Housing Microfinance Loan — home improvement or purchase of a surveyed plot. TZS 500,000 to 30,000,000; needs project description/budget, title deed, valuation report; long flexible tenure.
6. Small Group Loans — groups of 5 people (not from the same family) guaranteeing each other. TZS 50,000 to 3,000,000; 4–12 months; weekly repayments; no conventional collateral; includes financial training.
7. MSME Loan — working capital and investment for small and medium enterprises. TZS 3,000,000 to 500,000,000; 6–36 months; needs 3+ years operating a similar business, business licence, steady cash flow; includes business-skills advisory.
8. SACCOS Loan — for members of Savings and Co-operative Credit Societies and salaried employees; amount based on net salary; up to 48 months; no collateral; top-up allowed.
9. Salary Loans — personal loans for government or private-sector employees (business startup, education, a car, etc.). Apply at any branch with salary slips, employment letter, contract, and ID; insured; early repayment allowed with written notice.
10. Renewable Energy Loan — financing to switch to gas, biogas, or solar. Fuel-to-gas conversion: min TZS 1,800,000 (petrol), max TZS 15,000,000 (diesel); charcoal-to-gas/biogas: max TZS 24,000,000; solar installation: max TZS 15,000,000; loans above TZS 15,000,000 require 20% borrower contribution.
11. Sepa na Bajaji Loan — own a Bajaj or TVS three-wheeler with a 20% down payment; repay over 12–24 months; includes third-party insurance; needs proforma invoice from an approved dealer and a national/voter ID or driving licence.

DIGITAL BANKING
- USSD mobile banking: dial *150*52# ("Banking at your fingertips"). Services: transfers within Maendeleo Bank, transfers to other banks, bill payments (including electricity/LUKU), airtime top-up for any network, balance checks, transaction history, and OTP-based cash withdrawal at Maendeleo Bank wakala agents.
- MB Mobile App — launched 3 July 2025 together with the national commercial bank status. (The website lists no app-store download links — confirm availability with the bank.)
- Internet Banking: online portal at https://ibanking.maendeleobank.co.tz (launched March 2025).
- MB ATM card: usable on 280+ Umoja switch ATMs countrywide (up to TZS 1,000,000/day).
- Agency banking: 2,100+ wakala agents for deposits, withdrawals, and payments without visiting a branch.

INVESTOR RELATIONS
- Listed on the DSE: ticker MBP, ISIN TZ1996101683, PLC since 2013.
- 2025 results (published audited financial statements): profit before tax TZS 5.02 billion (about +30% vs 2024), profit after tax TZS 4.75 billion, return on equity 18.22%, NPL ratio 4.52%. Total assets about TZS 151 billion (2024), deposits about TZS 104 billion (2024).
- Reports published on the website: Annual Reports (2022 English & Swahili, 2023), AGM Books (2018–2026, various languages), Audited Financial Statements 2025 (English & Swahili), and a Market Discipline disclosure as at 31 December 2025.
- Shareholder contact: shareholders@maendeleobank.co.tz (also phone/WhatsApp +255 677 500 050 per the AGM notice).
- The share price moves daily — never quote a price; direct users to the DSE (dse.co.tz) for live quotes.
- The bank targets TZS 15 billion profit by 2030 under its 2025–2030 "Talent and Technology Transformation" strategy.

SWAHILI VOCABULARY USERS MAY USE
- mkopo = loan · mikopo = loans · riba = interest · ada = fee/charge
- akaunti = account · akiba = savings · kuweka akiba / kuhifadhi pesa = to save money
- tawi = branch · matawi = branches · wakala = agent · mawakala = agents
- pesa = money · fedha = money/funds · kuhamisha pesa = to transfer money
- benki = bank · kufungua akaunti = to open an account · kutoa/kuchukua pesa = to withdraw
- salio = balance · kadi ya ATM = ATM card · bili = bill · umeme = electricity (LUKU)
- hisa = shares · gawio = dividend · taarifa za fedha = financial statements
- maswali ya kawaida: "Nawezaje kupata mkopo?" (How can I get a loan?), "Tawi zipo wapi?" (Where are the branches?), "Nafunguaje akaunti?" (How do I open an account?)

IMPORTANT GUARDRAILS FOR THE ASSISTANT
- The bank does NOT publish numeric interest rates for any account or loan. For rates, fees, or charges: direct the user to any branch or toll-free 0800750089.
- For account-specific issues (balances, statements, blocked cards, transaction disputes): direct to toll-free 0800750089 or info@maendeleobank.co.tz — never attempt to handle account data.
- Facts above marked "confirm with the bank" are uncertain or time-sensitive; say so honestly.
`;

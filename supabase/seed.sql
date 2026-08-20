-- Maendeleo Bank PLC — seed data
-- Run after supabase/migrations/0001_init.sql.
-- Idempotent: each section only inserts when the target data is absent,
-- so re-running never clobbers edits made in the admin.

-- ---------------------------------------------------------------------------
-- forex_rates — the six rows the public forex widget displays.
-- CONTRACT with lib/rates.ts: columns currency, label, buy, sell, sort_order.
-- ---------------------------------------------------------------------------
insert into public.forex_rates (currency, label, buy, sell, sort_order)
select v.currency, v.label, v.buy, v.sell, v.sort_order
from (values
  ('USD', 'USA CASH (50-100)', 2560.00, 2650.00, 1),
  ('USD', 'USA CASH (1-20)',   2530.00, 2620.00, 2),
  ('EUR', 'Euro',              2800.00, 2905.00, 3),
  ('GBP', 'United Kingdom',    3200.00, 3320.00, 4),
  ('KES', 'Kenya',               18.50,   19.20, 5),
  ('ZAR', 'South Africa',       124.00,  128.90, 6)
) as v(currency, label, buy, sell, sort_order)
where not exists (select 1 from public.forex_rates);

-- ---------------------------------------------------------------------------
-- site_content — hero copy, announcement bar, opening hours, contact block
-- ---------------------------------------------------------------------------
insert into public.site_content (key, value)
values
  ('hero_title',   '"Together in Progress"'::jsonb),
  ('hero_sub',     '"Your trusted partner in development, progress and financial growth across Tanzania."'::jsonb),
  ('announcement', '""'::jsonb),
  ('hours', '{"weekdays": "Monday - Friday, 8:30am - 4:00pm", "saturday": "Saturday, 8:30am - 1:00pm", "sunday": "Sunday & public holidays closed"}'::jsonb),
  ('contact', '{"address": "Head Office, Luther House, Sokoine Drive, P.O. Box 216, Dar es Salaam, Tanzania", "email": "info@maendeleobank.co.tz", "toll_free": "0800750089"}'::jsonb)
on conflict (key) do nothing;

-- ---------------------------------------------------------------------------
-- news — the 8 real posts from docs/maendeleo-bank-info/11-news.md
-- ---------------------------------------------------------------------------
insert into public.news (slug, title, title_sw, excerpt, body, published_at, status)
select v.slug, v.title, v.title_sw, v.excerpt, v.body, v.published_at::timestamptz, 'published'
from (values
  (
    'whistle-blowing',
    'Whistle Blowing',
    null,
    'Maendeleo Bank PLC reaffirms its commitment to integrity and ethical conduct, and invites the reporting of misconduct through confidential channels.',
    $$Maendeleo Bank Plc addresses employees, customers, suppliers, service providers, and the public, stating its commitment to the highest standards of integrity and ethical conduct. The Bank encourages reporting of any misconduct or unethical behavior involving the Bank's staff, agents, or associated parties - actions connected to official duties or that may impact professional responsibilities. Reports are treated with due seriousness and appropriate action is taken. The Bank upholds openness, accountability, integrity, honesty, and transparency per its Code of Conduct, and guarantees confidentiality, with access to an independent service provider for anonymous reporting; protection is assured for good-faith disclosures.

Reportable concerns include fraud, theft and forgery; corruption, bribery and kickbacks; conflict of interest and abuse of office; AML/KYC and suspicious transactions; financial statement and reporting manipulation; procurement misconduct; policy and procedure breaches; data misuse and privacy breaches; cybersecurity and system misuse; harassment, discrimination and abuse; wasteful use of resources; and retaliation against whistleblowers.

Reporting channels:
- Email: whistleblowing@maendeleobank.co.tz
- Phone: +255 755 484 510
- Postal: Managing Director (envelope marked "strictly private and confidential"), Maendeleo Bank Plc, P.O. Box 216, Dar es Salaam, Tanzania

Speak up. Stay protected. Help us do better.$$,
    '2026-03-20'
  ),
  (
    'maendeleo-bank-yazindua-tawi-jipya-arusha',
    'Maendeleo Bank Opens New Arusha Branch',
    'MAENDELEO BANK YAZINDUA TAWI JIPYA ARUSHA',
    'Bishop Dr. Alex Malasusa of KKKT officially inaugurated Maendeleo Bank PLC''s sixth branch - its first outside Dar es Salaam - in Arusha.',
    $$The head of the Evangelical Lutheran Church in Tanzania (KKKT), Bishop Dr. Alex Malasusa, officially inaugurated Maendeleo Bank PLC's new Arusha branch on Tuesday, 24 February 2026. It is the bank's sixth branch and its first outside the Dar es Salaam region. Bishop Malasusa was photographed holding a payment receipt after depositing money through the new branch to confirm its establishment.

Managing Director Lomnyaki Saitabau said the branch will transform financial services in Arusha by providing financial education and inclusive financial services to entrepreneurs and businesspeople in Arusha and neighboring regions. He added that the branch will serve all faith-based institutions, KKKT dioceses, all institutions under KKKT, and the general public - individuals, groups, companies, entrepreneurs, children, and families - across Arusha and nearby areas.

Also featured at the launch were CPA Anna T. Mzinga (Vice Chairperson of the Board of Directors), Ms. Anusiata Kimario (Arusha Branch Manager), and Mr. Emmanuel Mwaya (Head of Business Unit).$$,
    '2026-02-24'
  ),
  (
    'maendeleo-bank-sasa-ni-benki-ya-kibiashara-ya-kitaifa',
    'Maendeleo Bank PLC Is Now a National Commercial Bank',
    'Maendeleo Bank PLC sasa ni Benki ya Kibiashara ya Kitaifa',
    'Prime Minister Hon. Kassim Majaliwa Majaliwa officially launched Maendeleo Bank PLC as a National Commercial Bank, alongside the MB Mobile App and the 2025-2030 Strategic Plan.',
    $$The Prime Minister of the United Republic of Tanzania, Hon. Kassim Majaliwa Majaliwa, officially launched Maendeleo Bank PLC as a National Commercial Bank ("Benki ya Kibiashara ya Kitaifa") on 3 July 2025. At the same event, the Prime Minister also launched the MB Mobile App service and the Bank's Strategic Plan for 2025-2030. On that day, Maendeleo Bank PLC presented the Prime Minister with an award of appreciation for the government's work in bringing development to citizens and improving financial services in the country.$$,
    '2025-11-06'
  ),
  (
    'maendeleo-bank-yazindua-mtandao-wa-biashara-sme-clinic',
    'Maendeleo Bank Launches Business Network Through SME Clinic',
    'Maendeleo Bank Plc Yazindua Mtandao wa Biashara Kupitia SME Clinic',
    'Maendeleo Bank PLC launched the Maendeleo Bank Growth Network (MBGN) through its SME Clinic platform, connecting SMEs with advice, training, and market opportunities.',
    $$Maendeleo Bank Plc officially launched the Maendeleo Bank Growth Network (MBGN) through its SME Clinic platform, at a special session bringing together small and medium enterprises (SMEs) with financial and business stakeholders. SME Clinic is a Maendeleo Bank platform that convenes businesspeople and gives them access to professional advice, financial education, and innovative business strategies. MBGN is a new business network designed to connect customers, strengthen collaboration, and open new market opportunities.

MBGN benefits for SME Clinic participants include business networking, financial training and literacy through regular seminars, professional business advisory, and exposure to new market platforms and partnerships.

Launching the network, Managing Director Lomnyaki Saitabau said the bank is committed to ensuring businesspeople, especially SMEs, get financial solutions and friendly services that answer their daily challenges: "Tunataka wafanyabiashara wetu wajue kwamba hawako peke yao. Maendeleo Bank PLC ipo pamoja nao, si tu kama benki, bali kama mshirika wa karibu wa safari yao ya kibiashara."

Head of Business Department Emmanuel Mwaya urged participants to make full use of the bank's services, including insurance, internet banking, and the mobile app. Erick Chrispine of True Maisha presented a session on innovation and boldness in running a business.$$,
    null
  ),
  (
    'mkurugenzi-mtendaji-aanza-kazi-rasmi',
    'New Managing Director Officially Starts Work',
    'Mkurugenzi Mtendaji aanza kazi rasmi',
    'Mr. Lomnyaki Saitabau officially began his tenure as Managing Director of Maendeleo Bank PLC following a formal introduction by Board Chairman Prof. Ulingeta Obadia Mbamba.',
    $$Maendeleo Bank PLC's new Managing Director, Mr. Lomnyaki Saitabau, officially started work following a formal introduction by the Chairman of the Bank's Board, Prof. Ulingeta Obadia Mbamba. At the historic event, Mr. Saitabau spoke directly with Maendeleo Bank staff, thanking them for their welcome and promising to work closely with them to advance the bank's success.

Outgoing Acting Managing Director CPA Peter Tarimo offered heartfelt congratulations to the new MD, thanked the Maendeleo Bank PLC team for their exceptional cooperation during his interim leadership, and wished Mr. Saitabau every success in leading the bank to greater achievements.

Pastor Charles Mzinga of KKKT - Eastern and Coastal Diocese, Azania Front parish, was pictured serving cake to the new Managing Director at the welcome event.$$,
    '2025-01-02'
  ),
  (
    'gawio-la-hisa-na-mauzo-ya-hisa-kwa-wanahisa',
    'Share Dividend and Share Sale for Maendeleo Bank Shareholders',
    'Gawio la Hisa na Mauzo ya Hisa Kwa Wanahisa wa Maendeleo Bank',
    'Announcement on the share dividend and share sale for Maendeleo Bank PLC shareholders.',
    $$Announcement on the share dividend and share sale for Maendeleo Bank PLC shareholders. Shareholders are advised to contact the Bank Secretary at shareholders@maendeleobank.co.tz or by phone/WhatsApp +255 677 500 050 for further details.$$,
    '2024-08-06'
  ),
  (
    'overview-of-mobile-banking-services',
    'Overview of Mobile Banking Services',
    null,
    'An overview of Maendeleo Bank PLC mobile banking services.',
    $$An overview of Maendeleo Bank PLC mobile banking services, including the MB Mobile App, internet banking at ibanking.maendeleobank.co.tz, and USSD services available across all networks in Tanzania.$$,
    '2024-08-06'
  ),
  (
    'uzinduzi-wa-maendeleo-bank-marathon-hatua-ya-faraja-msimu-wa-pili',
    'Maendeleo Bank Launches "Hatua ya Faraja" Marathon Season Two',
    'Uzinduzi wa Maendeleo Bank Marathon "Hatua ya Faraja Msimu wa Pili"',
    'Maendeleo Bank PLC launched the second season of the "Hatua ya Faraja" marathon, held on 7 September 2024 at the Farasi grounds, Oysterbay.',
    $$On 2 August 2024, Maendeleo Bank PLC launched the second season of the Maendeleo Bank Marathon "Hatua ya Faraja" ("Step of Comfort"), scheduled to take place on 7 September 2024 at the Farasi grounds, Oysterbay in Dar es Salaam. The launch was led by the Chairman of the Board of Directors, Prof. Ulingeta Obadia Mbamba, accompanied by Acting Managing Director CPA Peter Tarimo and retired Managing Director Dr. Ibrahim Mwangalaba. After the launch, which included unveiling a new jersey, a fun run was held from the bank's headquarters at Luther House-Posta to the Farasi grounds, Oysterbay.

JISAJILI SASA - register now.$$,
    '2024-08-02'
  )
) as v(slug, title, title_sw, excerpt, body, published_at)
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- reports — the 21 real investor-relations PDFs from
-- docs/maendeleo-bank-info/10-investor-relations.md (external URLs)
-- ---------------------------------------------------------------------------
insert into public.reports (title, category, year, file_url, published_at, status)
select v.title, v.category, v.year, v.file_url, v.published_at::timestamptz, 'published'
from (values
  -- Annual reports
  ('Annual Report 2023',              'annual-report', 2023, 'https://maendeleobank.co.tz/wp-content/uploads/2024/06/Annual-Report-2023-Final.pdf',            '2024-06-01'),
  ('Annual Report 2022 (Swahili)',    'annual-report', 2022, 'https://maendeleobank.co.tz/wp-content/uploads/2024/06/SW-Annual-Report-June-9-2022.pdf',        '2024-06-01'),
  ('Annual Report 2022 (English)',    'annual-report', 2022, 'https://maendeleobank.co.tz/wp-content/uploads/2024/06/ENG-Annual-Report-June-10-2022.pdf',      '2024-06-01'),
  -- AGM books
  ('AGM Book 2026 (Swahili)',                    'agm-book', 2026, 'https://maendeleobank.co.tz/wp-content/uploads/2026/06/AGM-2026-SWAHILI-VERSION.pdf',               '2026-06-01'),
  ('AGM Book 2026 (English)',                    'agm-book', 2026, 'https://maendeleobank.co.tz/wp-content/uploads/2026/06/AGM-2026-ENGLISH-PREVIEW.pdf',               '2026-06-01'),
  ('Fomu ya Uwakilishi 2026 (Proxy Form)',       'agm-book', 2026, 'https://maendeleobank.co.tz/wp-content/uploads/2026/06/FOMU-YA-UWAKILISHI.pdf',                     '2026-06-01'),
  ('AGM Book 2025 (Swahili)',                    'agm-book', 2025, 'https://maendeleobank.co.tz/wp-content/uploads/2025/06/AGM-2025-Swahili-B5-FINALL-PRINT.pdf',       '2025-06-01'),
  ('AGM Book 2024 (English)',                    'agm-book', 2024, 'https://maendeleobank.co.tz/wp-content/uploads/2024/06/AGM-BOOK-24_Cx3-1.pdf',                      '2024-06-01'),
  ('AGM Book 2024 (Swahili)',                    'agm-book', 2024, 'https://maendeleobank.co.tz/wp-content/uploads/2024/06/AGM-BOOK-2024Sw-Final.pdf',                  '2024-06-01'),
  ('AGM Book 2023 (English)',                    'agm-book', 2023, 'https://maendeleobank.co.tz/wp-content/uploads/2024/06/AGM-BOOK-v2.pdf',                            '2024-06-01'),
  ('AGM Book 2023 (Swahili)',                    'agm-book', 2023, 'https://maendeleobank.co.tz/wp-content/uploads/2024/06/AGM-BOOK-SW-v1.pdf',                         '2024-06-01'),
  ('AGM Book 2021 (English)',                    'agm-book', 2021, 'https://maendeleobank.co.tz/wp-content/uploads/2024/06/AGM-2021-BOOK-ENGLISH-1.pdf',                '2024-06-01'),
  ('AGM Book 2021 (Swahili)',                    'agm-book', 2021, 'https://maendeleobank.co.tz/wp-content/uploads/2024/06/AGM-2021-BOOK-KISWAHILI-1-.pdf',              '2024-06-01'),
  ('AGM Book 2020 (English)',                    'agm-book', 2020, 'https://maendeleobank.co.tz/wp-content/uploads/2024/06/AGM-2020-ENG.pdf',                           '2024-06-01'),
  ('AGM Book 2020 (Swahili)',                    'agm-book', 2020, 'https://maendeleobank.co.tz/wp-content/uploads/2024/06/AGM-2020-SECOND-EDITION-KISWAHILI-2.pdf',     '2024-06-01'),
  ('AGM Book 2019',                              'agm-book', 2019, 'https://maendeleobank.co.tz/wp-content/uploads/2024/06/AGM-2019.pdf',                                 '2024-06-01'),
  ('AGM Book 2018 (English)',                    'agm-book', 2018, 'https://maendeleobank.co.tz/wp-content/uploads/2024/06/AGM-2018-ENG-VERSION.pdf',                   '2024-06-01'),
  ('AGM Book 2018 (Swahili)',                    'agm-book', 2018, 'https://maendeleobank.co.tz/wp-content/uploads/2024/06/AGM-2018-SWAHILI-VERSION.pdf',                '2024-06-01'),
  -- Financial statements
  ('Audited Financial Statements 2025 (English)',  'financial-statement', 2025, 'https://maendeleobank.co.tz/wp-content/uploads/2026/04/ENG-Published-Financial-Statements-for-the-Year-2025-Signed.pdf', '2026-04-01'),
  ('Taarifa za Fedha Zilizokaguliwa 2025 (Swahili)','financial-statement', 2025, 'https://maendeleobank.co.tz/wp-content/uploads/2026/04/SWA-Published-Financial-Statements-for-the-Year-2025-Signed.pdf', '2026-04-01'),
  -- Regulatory disclosure
  ('Market Discipline Guidelines as at 31 December 2025', 'disclosure', 2025, 'https://maendeleobank.co.tz/wp-content/uploads/2026/04/MARKET-DISCIPLINE-GUIDELINES-FOR-BANKS-AND-FINANCIAL-INSTITUTIONS-AS-AT-31-DECEMBER-2025.pdf', '2026-04-01')
) as v(title, category, year, file_url, published_at)
where not exists (select 1 from public.reports);

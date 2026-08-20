import type { Metadata } from "next";
import { ArrowUpRight, Download, FileText } from "lucide-react";
import {
	Container,
	Eyebrow,
	PageHero,
	SectionHeading,
} from "@/components/site/primitives";
import { InvestmentCalculator } from "@/components/site/ir/investment-calculator";
import { SharePriceCard } from "@/components/site/ir/share-price-card";
import { getPublishedReports } from "@/lib/content";

export const metadata: Metadata = {
	title: "Investor Relations",
	description:
		"Maendeleo Bank PLC (DSE: MBP, ISIN TZ1996101683), key figures, annual reports, audited financial statements, AGM books and shareholder information.",
	alternates: { canonical: "/investor-relations" },
	openGraph: {
		title: "Investor Relations",
		description:
			"Maendeleo Bank PLC (DSE: MBP, ISIN TZ1996101683), key figures, annual reports, audited financial statements, AGM books and shareholder information.",
		url: "/investor-relations",
	},
};

const keyFigures2025 = [
	{ value: "TZS 5.02bn", label: "Profit before tax", change: "+30% vs 2024" },
	{ value: "TZS 4.75bn", label: "Profit after tax", change: "+29% vs 2024" },
	{ value: "18.22%", label: "Return on equity", change: "16.17% in 2024" },
	{ value: "4.52%", label: "Non-performing loans", change: "Improved from 4.76%" },
	{ value: "+33.76%", label: "Total asset growth", change: "+21.27% in 2024" },
	{ value: "+30.93%", label: "Deposit growth", change: "+14.58% in 2024" },
];

const shareholders = [
	{ category: "Individual investors", shares: "19,104,910", pct: "63%" },
	{ category: "United Evangelical Mission", shares: "3,382,189", pct: "11%" },
	{ category: "ELCT-ECD Diocese institutions", shares: "3,120,978", pct: "10%" },
	{ category: "ELCT Eastern & Coastal Diocese", shares: "1,628,955", pct: "5%" },
	{ category: "ELCT Retirement Scheme", shares: "1,370,182", pct: "5%" },
	{ category: "Companies & SACCOS", shares: "992,001", pct: "3%" },
	{ category: "ELCT Tanzania", shares: "389,626", pct: "1%" },
];

const hardcodedAnnualReports = [
	{
		label: "Annual Report 2023",
		href: "https://maendeleobank.co.tz/wp-content/uploads/2024/06/Annual-Report-2023-Final.pdf",
	},
	{
		label: "Annual Report 2022 (English)",
		href: "https://maendeleobank.co.tz/wp-content/uploads/2024/06/ENG-Annual-Report-June-10-2022.pdf",
	},
	{
		label: "Annual Report 2022 (Swahili)",
		href: "https://maendeleobank.co.tz/wp-content/uploads/2024/06/SW-Annual-Report-June-9-2022.pdf",
	},
];

const hardcodedFinancialStatements = [
	{
		label: "Audited Financial Statements 2025 (English)",
		href: "https://maendeleobank.co.tz/wp-content/uploads/2026/04/ENG-Published-Financial-Statements-for-the-Year-2025-Signed.pdf",
	},
	{
		label: "Taarifa za Fedha Zilizokaguliwa 2025 (Swahili)",
		href: "https://maendeleobank.co.tz/wp-content/uploads/2026/04/SWA-Published-Financial-Statements-for-the-Year-2025-Signed.pdf",
	},
	{
		label: "Market Discipline Guidelines report, 31 December 2025",
		href: "https://maendeleobank.co.tz/wp-content/uploads/2026/04/MARKET-DISCIPLINE-GUIDELINES-FOR-BANKS-AND-FINANCIAL-INSTITUTIONS-AS-AT-31-DECEMBER-2025.pdf",
	},
];

const hardcodedAgmBooks = [
	{
		label: "AGM Book 2026 (English preview)",
		href: "https://maendeleobank.co.tz/wp-content/uploads/2026/06/AGM-2026-ENGLISH-PREVIEW.pdf",
	},
	{
		label: "AGM Book 2026 (Swahili)",
		href: "https://maendeleobank.co.tz/wp-content/uploads/2026/06/AGM-2026-SWAHILI-VERSION.pdf",
	},
	{
		label: "Fomu ya Uwakilishi 2026 (Proxy Form)",
		href: "https://maendeleobank.co.tz/wp-content/uploads/2026/06/FOMU-YA-UWAKILISHI.pdf",
	},
	{
		label: "AGM Book 2025 (Swahili)",
		href: "https://maendeleobank.co.tz/wp-content/uploads/2025/06/AGM-2025-Swahili-B5-FINALL-PRINT.pdf",
	},
	{
		label: "AGM Book 2024 (English)",
		href: "https://maendeleobank.co.tz/wp-content/uploads/2024/06/AGM-BOOK-24_Cx3-1.pdf",
	},
	{
		label: "AGM Book 2024 (Swahili)",
		href: "https://maendeleobank.co.tz/wp-content/uploads/2024/06/AGM-BOOK-2024Sw-Final.pdf",
	},
	{
		label: "AGM Book 2023 (English)",
		href: "https://maendeleobank.co.tz/wp-content/uploads/2024/06/AGM-BOOK-v2.pdf",
	},
	{
		label: "AGM Book 2023 (Swahili)",
		href: "https://maendeleobank.co.tz/wp-content/uploads/2024/06/AGM-BOOK-SW-v1.pdf",
	},
	{
		label: "AGM Book 2021 (English)",
		href: "https://maendeleobank.co.tz/wp-content/uploads/2024/06/AGM-2021-BOOK-ENGLISH-1.pdf",
	},
	{
		label: "AGM Book 2021 (Swahili)",
		href: "https://maendeleobank.co.tz/wp-content/uploads/2024/06/AGM-2021-BOOK-KISWAHILI-1-.pdf",
	},
	{
		label: "AGM Book 2020 (English)",
		href: "https://maendeleobank.co.tz/wp-content/uploads/2024/06/AGM-2020-ENG.pdf",
	},
	{
		label: "AGM Book 2020 (Swahili)",
		href: "https://maendeleobank.co.tz/wp-content/uploads/2024/06/AGM-2020-SECOND-EDITION-KISWAHILI-2.pdf",
	},
	{
		label: "AGM Book 2019",
		href: "https://maendeleobank.co.tz/wp-content/uploads/2024/06/AGM-2019.pdf",
	},
	{
		label: "AGM Book 2018 (English)",
		href: "https://maendeleobank.co.tz/wp-content/uploads/2024/06/AGM-2018-ENG-VERSION.pdf",
	},
	{
		label: "AGM Book 2018 (Swahili)",
		href: "https://maendeleobank.co.tz/wp-content/uploads/2024/06/AGM-2018-SWAHILI-VERSION.pdf",
	},
];

function ReportTable({
	documents,
}: {
	documents: { label: string; href: string }[];
}) {
	return (
		<ul className="overflow-hidden rounded-xl border border-hairline bg-white">
			{documents.map((doc) => (
				<li key={doc.href} className="border-b border-hairline last:border-b-0">
					<a
						href={doc.href}
						target="_blank"
						rel="noopener noreferrer"
						className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-canvas-soft"
					>
						<FileText
							className="h-4 w-4 shrink-0 text-brand"
							strokeWidth={1.5}
							aria-hidden
						/>
						<span className="flex-1 text-[15px] font-light text-ink group-hover:text-brand-deep">
							{doc.label}
						</span>
						<span className="inline-flex items-center gap-1 text-[13px] font-normal tracking-[-0.39px] text-ink-mute">
							PDF
							<Download className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
						</span>
					</a>
				</li>
			))}
		</ul>
	);
}

export default async function InvestorRelationsPage() {
	// F02: reports published in the CMS win; the hardcoded document archive
	// is the fallback while the CMS is empty or unconfigured.
	const cmsReports = await getPublishedReports();
	const byCategory = (category: string, fallback: { label: string; href: string }[]) => {
		const rows = cmsReports.filter((report) => report.category === category);
		return rows.length > 0
			? rows.map((report) => ({
					label: report.year ? `${report.title} ${report.year}` : report.title,
					href: report.file_url ?? "#",
				}))
			: fallback;
	};
	const annualReports = byCategory("annual-report", hardcodedAnnualReports);
	const financialStatements = [
		...byCategory("financial-statement", hardcodedFinancialStatements),
		...cmsReports
			.filter((report) => report.category === "disclosure")
			.map((report) => ({
				label: report.year ? `${report.title} ${report.year}` : report.title,
				href: report.file_url ?? "#",
			})),
	];
	const agmBooks = byCategory("agm-book", hardcodedAgmBooks);
	return (
		<>
			<PageHero
				eyebrow="Investor Relations"
				title="Listed, transparent and growing"
				lede="Maendeleo Bank PLC has been listed on the Dar es Salaam Stock Exchange since 2013, the first Tanzanian bank registered on the DSE and a public limited company from inception."
				breadcrumb={[{ label: "Home", href: "/" }, { label: "Investor Relations" }]}
				stat={{ value: "MBP", label: "listed on the DSE since 2013" }}
				accent="grey"
			/>

			{/* Share price (RFQ §4.6) + share capital */}
			<section className="bg-white">
				<Container className="py-16 md:py-24">
					<div className="grid gap-6 lg:grid-cols-3">
						<SharePriceCard />
						<div className="rounded-xl border border-hairline bg-white p-8 md:p-10">
							<Eyebrow>Share capital</Eyebrow>
							<dl className="mt-6 flex flex-col gap-5">
								<div>
									<dt className="text-[10px] font-normal uppercase leading-[1.15] tracking-[0.1px] text-ink-mute">
										Shares in issue
									</dt>
									<dd className="tnum mt-1 text-[22px] font-light text-ink">
										29,988,842
									</dd>
								</div>
								<div>
									<dt className="text-[10px] font-normal uppercase leading-[1.15] tracking-[0.1px] text-ink-mute">
										Authorized share capital
									</dt>
									<dd className="tnum mt-1 text-[22px] font-light text-ink">
										TZS 30bn
									</dd>
								</div>
								<div>
									<dt className="text-[10px] font-normal uppercase leading-[1.15] tracking-[0.1px] text-ink-mute">
										Issued & fully paid-up
									</dt>
									<dd className="tnum mt-1 text-[22px] font-light text-ink">
										TZS 14.23bn
									</dd>
								</div>
							</dl>
							<p className="mt-6 text-[13px] font-light leading-[1.4] tracking-[-0.39px] text-ink-mute">
								Authorized: 60,000,000 ordinary shares of TZS 500 each. Per
								the 2025 audited report.
							</p>
						</div>
					</div>
				</Container>
			</section>

			{/* Investment trend calculator (RFQ §4.6) */}
			<section className="bg-white">
				<Container className="border-t border-hairline py-16 md:py-24">
					<SectionHeading
						eyebrow="Investment trend"
						title="What would your investment be worth?"
						lede="Enter an amount and a past date to see what an MBP shareholding bought then would be worth at the latest documented price."
					/>
					<div className="mt-10">
						<InvestmentCalculator />
					</div>
				</Container>
			</section>

			{/* Key figures */}
			<section className="bg-canvas-soft">
				<Container className="py-16 md:py-24">
					<SectionHeading
						eyebrow="Financial year 2025"
						title="Key figures"
						lede="A year of strong, balanced growth: deposits up 31%, assets up 34%, loans up 23%, while non-performing loans improved to 4.52%."
					/>
					<div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{keyFigures2025.map((figure) => (
							<div
								key={figure.label}
								className="rounded-xl border border-hairline bg-white p-8"
							>
								<p className="tnum text-[26px] font-light leading-[1.1] tracking-display-lg text-ink md:text-[32px]">
									{figure.value}
								</p>
								<p className="mt-2 text-[13px] font-normal leading-[1.4] tracking-[-0.39px] text-ink">
									{figure.label}
								</p>
								<p className="mt-1 text-[13px] font-light leading-[1.4] tracking-[-0.39px] text-ink-mute">
									{figure.change}
								</p>
							</div>
						))}
					</div>
					<p className="mt-8 text-[13px] font-light leading-[1.4] tracking-[-0.39px] text-ink-mute">
						Source: Maendeleo Bank PLC audited financial statements for the
						year ended 31 December 2025.
					</p>
				</Container>
			</section>

			{/* Reports */}
			<section className="bg-white">
				<Container className="flex flex-col gap-16 py-16 md:py-24">
					<div id="annual-reports" className="scroll-mt-24">
						<SectionHeading eyebrow="Reports" title="Annual reports & financial statements" />
						<div className="mt-10 grid gap-10 lg:grid-cols-2">
							<div>
								<h3 className="text-[18px] font-light leading-[1.4] text-ink">
									Annual Reports
								</h3>
								<div className="mt-4">
									<ReportTable documents={annualReports} />
								</div>
							</div>
							<div>
								<h3 className="text-[18px] font-light leading-[1.4] text-ink">
									Audited Financial Statements & disclosures
								</h3>
								<div className="mt-4">
									<ReportTable documents={financialStatements} />
								</div>
							</div>
						</div>
					</div>
					<div id="agm-books" className="scroll-mt-24">
						<SectionHeading
							eyebrow="Annual General Meeting"
							title="AGM books, 2018 – 2026"
							lede="AGM books and proxy forms are also available at Head Office, Luther House, Sokoine Drive, ahead of each meeting."
						/>
						<div className="mt-10">
							<ReportTable documents={agmBooks} />
						</div>
					</div>
				</Container>
			</section>

			{/* Shareholding + AGM notice */}
			<section className="bg-canvas-soft">
				<Container className="py-16 md:py-24">
					<div className="grid gap-12 lg:grid-cols-2">
						<div>
							<SectionHeading
								eyebrow="Ownership"
								title="Shareholding structure"
								lede="Individual investors collectively own the majority of the bank, alongside our founding church institutions. Per the 2025 audited report."
							/>
							<div className="mt-8 overflow-hidden rounded-xl border border-hairline bg-white">
								<table className="w-full text-left">
									<thead>
										<tr className="border-b border-hairline bg-canvas-soft">
											<th scope="col" className="px-6 py-3 text-[10px] font-normal uppercase leading-[1.15] tracking-[0.1px] text-ink-mute">
												Shareholder category
											</th>
											<th scope="col" className="px-6 py-3 text-right text-[10px] font-normal uppercase leading-[1.15] tracking-[0.1px] text-ink-mute">
												Shares
											</th>
											<th scope="col" className="px-6 py-3 text-right text-[10px] font-normal uppercase leading-[1.15] tracking-[0.1px] text-ink-mute">
												%
											</th>
										</tr>
									</thead>
									<tbody>
										{shareholders.map((row) => (
											<tr key={row.category} className="border-b border-hairline last:border-b-0">
												<td className="px-6 py-3.5 text-[15px] font-light text-ink">
													{row.category}
												</td>
												<td className="tnum px-6 py-3.5 text-right text-[14px] font-light tracking-[-0.42px] text-ink">
													{row.shares}
												</td>
												<td className="tnum px-6 py-3.5 text-right text-[14px] font-light tracking-[-0.42px] text-ink">
													{row.pct}
												</td>
											</tr>
										))}
										<tr className="bg-canvas-soft">
											<td className="px-6 py-3.5 text-[15px] font-normal text-ink">Total</td>
											<td className="tnum px-6 py-3.5 text-right text-[14px] font-normal tracking-[-0.42px] text-ink">
												29,988,842
											</td>
											<td className="tnum px-6 py-3.5 text-right text-[14px] font-normal tracking-[-0.42px] text-ink">
												100%
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div>
							<SectionHeading eyebrow="AGM notices" title="For our shareholders" />
							<div className="mt-8 rounded-xl border border-hairline bg-white p-8">
								<p className="text-[15px] font-light leading-[1.4] text-ink-mute">
									Notices of each Annual General Meeting, including the agenda,
									venue and hybrid-attendance arrangements, are published and
									shared with all shareholders ahead of the meeting. Dividend
									proposals are tabled and approved at the AGM.
								</p>
								<p className="mt-4 text-[15px] font-light leading-[1.4] text-ink-mute">
									Shareholders wishing to attend online, lodge a proposal or
									submit a proxy form should contact the Bank Secretary at
									least 48 hours before the meeting. Proxy forms must bear a
									TZS 500 revenue stamp; corporate proxies must carry the
									company seal and secretary&apos;s signature.
								</p>
								<div className="mt-6 border-t border-hairline pt-6">
									<p className="text-[13px] font-normal leading-[1.4] tracking-[-0.39px] text-ink">
										Shareholder services
									</p>
									<p className="mt-1 text-[13px] font-light leading-[1.4] tracking-[-0.39px] text-ink-mute">
										<a
											href="mailto:shareholders@maendeleobank.co.tz"
											className="text-brand hover:text-brand-deep"
										>
											shareholders@maendeleobank.co.tz
										</a>
										{" · "}
										<a href="tel:+255677500050" className="tnum text-brand hover:text-brand-deep">
											+255 677 500 050
										</a>{" "}
										(phone & WhatsApp)
									</p>
								</div>
							</div>
							<a
								href="https://dse.co.tz/index.php/listed/company/profile?id=8"
								target="_blank"
								rel="noopener noreferrer"
								className="group mt-6 inline-flex items-center gap-1.5 text-[15px] font-normal text-brand hover:text-brand-deep"
							>
								DSE announcements for MBP
								<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden />
							</a>
						</div>
					</div>
				</Container>
			</section>
		</>
	);
}

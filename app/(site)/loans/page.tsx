import type { Metadata } from "next";
import { Check, FileText, Phone, Store } from "lucide-react";
import {
	Container,
	PageHero,
	SectionHeading,
} from "@/components/site/primitives";

export const metadata: Metadata = {
	title: "Loans",
	description:
		"Eleven loan products from Maendeleo Bank — Executive, Agribusiness, Jamii, Poultry, Housing Microfinance, Small Group, MSME, SACCOS, Salary, Renewable Energy and Sepa na Bajaji loans.",
};

interface Loan {
	id: string;
	name: string;
	amount: string;
	tenure: string;
	highlights: string[];
}

const loans: Loan[] = [
	{
		id: "executive",
		name: "Executive Loan",
		amount: "TZS 1M – 150M",
		tenure: "6 – 48 months",
		highlights: [
			"For senior executives, managers, directors and high-net-worth individuals",
			"Salary channelled through an MB account",
			"Top up your loan at any time",
			"Insured against death and permanent disability",
		],
	},
	{
		id: "agribusiness",
		name: "Agribusiness Loan",
		amount: "From TZS 1M",
		tenure: "1 – 36 months",
		highlights: [
			"For crop producers, processors, aggregators, input suppliers, livestock and fisheries",
			"Finance farm inputs, land lease, boreholes, biogas and farm houses",
			"At least one year of business records or transaction receipts",
		],
	},
	{
		id: "jamii",
		name: "Jamii Loan",
		amount: "From TZS 1M",
		tenure: "3 – 48 months",
		highlights: [
			"Boosts projects owned by registered, non-profit religious institutions",
			"Grace period of up to 6 months depending on the investment",
			"Insured against death and permanent disability",
		],
	},
	{
		id: "poultry",
		name: "Poultry Financing",
		amount: "TZS 1M – 30M",
		tenure: "6 – 8 weeks",
		highlights: [
			"For commercial poultry keepers — feeds, medicine and more",
			"At least two successful seasons in commercial farming",
			"Payment after harvesting",
		],
	},
	{
		id: "housing-microfinance",
		name: "Housing Microfinance Loan",
		amount: "TZS 500,000 – 30M",
		tenure: "Long, flexible tenure",
		highlights: [
			"For home improvement or purchase of a surveyed plot",
			"You remain the legal owner while you renovate",
			"Lower interest rates; insured against death and permanent disability",
		],
	},
	{
		id: "small-group",
		name: "Small Group Loans",
		amount: "TZS 50,000 – 3M",
		tenure: "4 – 12 months",
		highlights: [
			"Groups of five people with mutual trust and weekly repayments",
			"No conventional security required — group guarantee instead",
			"Financial training available for members",
		],
	},
	{
		id: "msme",
		name: "MSME Loan",
		amount: "TZS 3M – 500M",
		tenure: "6 – 36 months",
		highlights: [
			"Working capital and investment funds for viable enterprises",
			"Instalments matched to your business cash flow",
			"Advisory services on business skills and management",
		],
	},
	{
		id: "saccos",
		name: "SACCOS Loan",
		amount: "Based on net salary",
		tenure: "Up to 48 months",
		highlights: [
			"Helps Savings and Co-operative Credit Societies lend to their members",
			"No collateral required",
			"Top up and borrow again within your credit ratio",
		],
	},
	{
		id: "salary",
		name: "Salary Loan",
		amount: "Based on net salary",
		tenure: "Flexible",
		highlights: [
			"For government and private-sector employees — business, education, a car and more",
			"Credit experience not mandatory",
			"Early repayment allowed with written notice",
		],
	},
	{
		id: "renewable-energy",
		name: "Renewable Energy Loan",
		amount: "Up to TZS 24M",
		tenure: "Flexible",
		highlights: [
			"Convert vehicles or machines from fuel to gas (from TZS 1.8M)",
			"Solar installations up to TZS 15M; charcoal-to-gas or biogas up to TZS 24M",
			"Cut operating expenses by up to 60%",
		],
	},
	{
		id: "sepa-na-bajaji",
		name: "Sepa na Bajaji Loan",
		amount: "20% down payment",
		tenure: "12 – 24 months",
		highlights: [
			"Own a Bajaji or TVS with a 20% down payment",
			"Includes insurance against third-party damage and injury",
			"Affordable interest on a reducing balance",
		],
	},
];

const steps = [
	{
		icon: Store,
		title: "Visit a branch",
		body: "Loan applications are made at any Maendeleo Bank branch. Bring your ID, income evidence and any supporting documents listed for your product.",
	},
	{
		icon: FileText,
		title: "Assessment",
		body: "Our credit team assesses your application against the product criteria — most loans are processed quickly, and credit history is not mandatory for several products.",
	},
	{
		icon: Phone,
		title: "Disbursement & support",
		body: "Once approved, funds are disbursed to your Maendeleo Bank account. Our officers stay with you — including business-skills advice for MSME borrowers.",
	},
];

export default function LoansPage() {
	return (
		<>
			<PageHero
				eyebrow="Loans"
				title="Credit for every stage of growth"
				lede="Eleven loan products — from TZS 50,000 group loans to TZS 500 million MSME financing — all insured against death and permanent disability, at affordable or competitive rates on a reducing balance."
				breadcrumb={[{ label: "Home", href: "/" }, { label: "Loans" }]}
			/>

			<section className="bg-white">
				<Container className="py-16 md:py-24">
					<SectionHeading
						eyebrow="Our loan products"
						title="Compare and choose"
					/>
					<div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{loans.map((loan) => (
							<article
								key={loan.id}
								id={loan.id}
								className="flex h-full scroll-mt-24 flex-col rounded-xl border border-hairline bg-white p-8 transition-shadow hover:shadow-lift-1"
							>
								<h3 className="text-[22px] font-light leading-[1.12] tracking-display-md text-ink md:text-[26px]">
									{loan.name}
								</h3>
								<dl className="mt-4 flex gap-6">
									<div>
										<dt className="text-[10px] font-normal uppercase leading-[1.15] tracking-[0.1px] text-ink-mute">
											Amount
										</dt>
										<dd className="tnum mt-1 text-[14px] font-light leading-[1.4] tracking-[-0.42px] text-brand-deep">
											{loan.amount}
										</dd>
									</div>
									<div>
										<dt className="text-[10px] font-normal uppercase leading-[1.15] tracking-[0.1px] text-ink-mute">
											Tenure
										</dt>
										<dd className="tnum mt-1 text-[14px] font-light leading-[1.4] tracking-[-0.42px] text-brand-deep">
											{loan.tenure}
										</dd>
									</div>
								</dl>
								<ul className="mt-5 flex flex-1 flex-col gap-2.5">
									{loan.highlights.map((highlight) => (
										<li key={highlight} className="flex gap-2.5">
											<Check
												className="mt-1 h-4 w-4 shrink-0 text-brand"
												strokeWidth={1.5}
												aria-hidden
											/>
											<span className="text-[15px] font-light leading-[1.4] text-ink-mute">
												{highlight}
											</span>
										</li>
									))}
								</ul>
							</article>
						))}
					</div>
				</Container>
			</section>

			<section className="bg-canvas-soft">
				<Container className="py-16 md:py-24">
					<SectionHeading
						eyebrow="How to apply"
						title="Three steps to your loan"
					/>
					<div className="mt-10 grid gap-6 md:grid-cols-3">
						{steps.map((step, index) => (
							<div
								key={step.title}
								className="rounded-xl border border-hairline bg-white p-8"
							>
								<div className="flex items-center gap-4">
									<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-subdued text-brand">
										<step.icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
									</div>
									<span className="tnum text-[13px] font-normal tracking-[-0.39px] text-ink-mute">
										Step {index + 1}
									</span>
								</div>
								<h3 className="mt-6 text-[20px] font-light leading-[1.4] tracking-[-0.2px] text-ink">
									{step.title}
								</h3>
								<p className="mt-2 text-[15px] font-light leading-[1.4] text-ink-mute">
									{step.body}
								</p>
							</div>
						))}
					</div>
					<p className="mt-10 text-[13px] font-normal leading-[1.4] tracking-[-0.39px] text-ink-mute">
						Questions about eligibility? Call our toll-free line{" "}
						<a href="tel:0800750089" className="tnum text-brand">
							0800750089
						</a>{" "}
						or visit any branch.
					</p>
				</Container>
			</section>
		</>
	);
}

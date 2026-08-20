import type { Metadata } from "next";
import {
	Banknote,
	CalendarClock,
	Check,
	Crown,
	GraduationCap,
	PiggyBank,
	Sprout,
	Target,
	type LucideIcon,
} from "lucide-react";
import {
	ArrowLink,
	Container,
	Eyebrow,
	PageHero,
	PillLink,
	SectionHeading,
} from "@/components/site/primitives";

export const metadata: Metadata = {
	title: "Personal Banking",
	description:
		"Seven personal account types from Maendeleo Bank — Achievers, Salary, Maendeleo Saving, Ahadi, Wekeza, Executive Saving and Fixed Deposit accounts.",
};

interface Account {
	id: string;
	icon: LucideIcon;
	name: string;
	summary: string;
	description: string;
	features: string[];
	requirements?: string[];
}

const accounts: Account[] = [
	{
		id: "achievers",
		icon: GraduationCap,
		name: "Achievers Account",
		summary:
			"A savings account designed for students, built around their income and personal transactions.",
		description:
			"The Achievers Account is affordable, convenient and provides a safe way of receiving Higher Education Student Loans and funds from parents or guardians.",
		features: [
			"Affordable opening balance",
			"Preferential interest rates",
			"Simplified account opening procedures",
			"Account can be opened and operated in TZS, GBP and EURO",
			"Unlimited withdrawals in a day",
			"SMS alert on every deposit and withdrawal",
			"No prior notice needed on withdrawals",
			"Eligible to be linked with an MB ATM card",
			"Cash withdrawals on Umoja switch ATMs up to TZS 1,000,000 a day",
			"Eligible to be linked with MB Mobile",
		],
		requirements: [
			"Applicant should be aged 18 years and above",
			"Legally accepted student identity card",
			"Student admission letter or introduction letter",
			"One recent passport photo with a blue background",
			"Opening balance of TZS 5,000",
		],
	},
	{
		id: "salary",
		icon: Banknote,
		name: "Salary Account",
		summary:
			"A savings account that facilitates salary payment for employees of our corporate and institutional clients.",
		description:
			"The Salary Account is opened to facilitate salary payment by a customer whose employer is a corporate or institutional client of Maendeleo Bank.",
		features: [
			"Can be opened with little or zero balance on recruitment",
			"Minimum operating balance applies",
			"Monthly and transaction fees apply",
			"Earns interest on deposits",
			"Eligible for a Maendeleo ATM card",
			"Eligible for MB Banking services",
			"Non-joint account",
		],
		requirements: [
			"Must be a salaried employee of a recognized and registered company, institution or organization",
			"Employee's identity card",
			"Letter of introduction from the employer",
			"Two passport-size photographs",
		],
	},
	{
		id: "maendeleo-saving",
		icon: PiggyBank,
		name: "Maendeleo Saving Account",
		summary:
			"An everyday savings account that earns interest on your deposits and keeps your money within reach.",
		description:
			"The Maendeleo Saving Account is our standard savings account — simple to open, easy to run, and linked to our ATM and mobile banking services so your money is always accessible.",
		features: [
			"Can be opened with little or zero balance",
			"Minimum operating balance applies",
			"Monthly and transaction fees apply",
			"Earns interest on deposits",
			"Eligible for a Maendeleo ATM card",
			"Eligible for MB Banking services",
			"Non-joint account",
		],
		requirements: [
			"Valid identification document",
			"Letter of introduction",
			"Two passport-size photographs",
		],
	},
	{
		id: "ahadi",
		icon: Target,
		name: "Ahadi Account",
		summary:
			"A goal-based savings account that helps you set a monthly savings plan — and stick to it.",
		description:
			"Ahadi (Swahili for “promise”) helps you commit to a monthly savings plan and follow it through to your goal. Committed to raising TZS 1,200,000 in a year? This account can help you save TZS 100,000 every month to attain it.",
		features: [
			"Low opening balance of TZS 10,000",
			"No withdrawals allowed during the year",
			"No monthly charges",
			"Premium interest rate",
			"Not linked to an MB ATM card — your savings stay untouched",
			"Not linked to MB Mobile",
		],
	},
	{
		id: "wekeza",
		icon: Sprout,
		name: "Wekeza Account",
		summary:
			"For savers who want their money to grow into something more rewarding.",
		description:
			"Be it saving for a plot of land, a new car or your house — Wekeza (“invest”) walks with you on the journey and helps you fulfil your savings goals with ease.",
		features: [
			"Low opening balance of TZS 20,000",
			"Withdrawals restricted to four times per year",
			"Premature withdrawal beyond the limit forfeits 50% of accrued interest",
			"No monthly charges and no operation fees",
			"Premium interest rate",
			"Not linked to an MB ATM card or MB Mobile",
		],
	},
	{
		id: "executive",
		icon: Crown,
		name: "Executive Saving Account",
		summary:
			"A savings account designed for high-profile customers who want special attention.",
		description:
			"The Executive Saving Account is designed for high-profile individuals who value premium service and are willing to pay extra for special attention.",
		features: [
			"Can be opened and operated in TZS, USD, GBP and EURO",
			"Unlimited withdrawals in a day",
			"SMS alert on every deposit and withdrawal",
			"No prior notice needed on withdrawals",
			"Monthly withdrawal charge applies",
			"Eligible to be linked with an MB ATM card and MB Mobile",
			"Cash withdrawals on Umoja switch ATMs up to TZS 1,000,000 a day",
			"Overdraft facility for those who meet loan conditions",
		],
		requirements: [
			"Identification document (voter ID, driving licence or passport)",
			"Letter of introduction from the ward executive",
			"Passport-size photographs",
		],
	},
	{
		id: "fixed-deposit",
		icon: CalendarClock,
		name: "Fixed Deposit Account",
		summary:
			"A time deposit with fixed terms and a competitive interest rate, paid on maturity.",
		description:
			"Place a fixed amount aside for a predetermined period — from 3 up to 24 months — and earn a competitive interest rate on your investment.",
		features: [
			"Interest is paid on maturity",
			"Investment durations from 3 to 24 months",
			"A Fixed Deposit Receipt is issued as your certificate of deposit",
			"Can be renewed per your instructions",
			"Can be opened in TZS, USD, GBP and EURO",
			"Opening balance of TZS 200,000",
			"Premature withdrawal attracts a penalty",
		],
	},
];

export default function PersonalBankingPage() {
	return (
		<>
			<PageHero
				eyebrow="Personal Banking"
				title="Accounts built around your life"
				lede="From your first savings as a student to an executive account in four currencies — seven ways to save, earn and grow with Maendeleo Bank."
				breadcrumb={[{ label: "Home", href: "/" }, { label: "Personal Banking" }]}
			/>

			<section className="bg-white">
				<Container className="py-16 md:py-24">
					<SectionHeading
						eyebrow="Our accounts"
						title="Choose the account that fits"
					/>
					<div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{accounts.map((account) => (
							<div
								key={account.id}
								className="flex h-full flex-col rounded-xl border border-hairline bg-white p-8 transition-shadow hover:shadow-lift-1"
							>
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-subdued text-brand">
									<account.icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
								</div>
								<h3 className="mt-6 text-[22px] font-light leading-[1.12] tracking-display-md text-ink md:text-[26px]">
									{account.name}
								</h3>
								<p className="mt-3 flex-1 text-[15px] font-light leading-[1.4] text-ink-mute">
									{account.summary}
								</p>
								<ArrowLink href={`#${account.id}`} className="mt-6">
									Features and requirements
								</ArrowLink>
							</div>
						))}
					</div>
				</Container>
			</section>

			<section className="bg-canvas-soft">
				<Container className="flex flex-col gap-16 py-16 md:gap-24 md:py-24">
					{accounts.map((account) => (
						<article
							key={account.id}
							id={account.id}
							className="scroll-mt-24 border-t border-hairline pt-10 first:border-t-0 first:pt-0"
						>
							<Eyebrow>Personal Banking</Eyebrow>
							<h2 className="mt-3 text-[26px] font-light leading-[1.1] tracking-display-lg text-ink md:text-[32px]">
								{account.name}
							</h2>
							<p className="mt-4 max-w-2xl text-base font-light leading-[1.4] text-ink-secondary">
								{account.description}
							</p>
							<div
								className={`mt-8 grid gap-10 ${
									account.requirements ? "lg:grid-cols-2" : ""
								}`}
							>
								<div>
									<h3 className="text-[18px] font-light leading-[1.4] text-ink">
										Key features
									</h3>
									<ul className="mt-4 flex flex-col gap-2.5">
										{account.features.map((feature) => (
											<li key={feature} className="flex gap-2.5">
												<Check
													className="mt-1 h-4 w-4 shrink-0 text-brand"
													strokeWidth={1.5}
													aria-hidden
												/>
												<span className="text-[15px] font-light leading-[1.4] text-ink-mute">
													{feature}
												</span>
											</li>
										))}
									</ul>
								</div>
								{account.requirements ? (
									<div>
										<h3 className="text-[18px] font-light leading-[1.4] text-ink">
											What you need to open it
										</h3>
										<ul className="mt-4 flex flex-col gap-2.5">
											{account.requirements.map((requirement) => (
												<li key={requirement} className="flex gap-2.5">
													<Check
														className="mt-1 h-4 w-4 shrink-0 text-brand"
														strokeWidth={1.5}
														aria-hidden
													/>
													<span className="text-[15px] font-light leading-[1.4] text-ink-mute">
														{requirement}
													</span>
												</li>
											))}
										</ul>
									</div>
								) : null}
							</div>
						</article>
					))}
				</Container>
			</section>

			<section className="bg-white">
				<Container className="flex flex-col items-start gap-6 py-16 md:py-20">
					<SectionHeading
						eyebrow="Get started"
						title="Open your account at any branch"
						lede="Bring your documents to any of our six branches, or call our toll-free line and we will guide you through the process."
					/>
					<PillLink href="/contact#branches">Find a branch</PillLink>
				</Container>
			</section>
		</>
	);
}

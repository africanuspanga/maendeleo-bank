import type { Metadata } from "next";
import {
	Briefcase,
	CalendarClock,
	Check,
	Handshake,
	Users,
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
	title: "Business Banking",
	description:
		"Business Current, Flexi Fixed, Fixed Deposit and Community accounts from Maendeleo Bank, plus SME support through the SME Clinic and Maendeleo Bank Growth Network.",
	alternates: { canonical: "/business-banking" },
	openGraph: {
		title: "Business Banking",
		description:
			"Business Current, Flexi Fixed, Fixed Deposit and Community accounts from Maendeleo Bank, plus SME support through the SME Clinic and Maendeleo Bank Growth Network.",
		url: "/business-banking",
	},
};

interface Product {
	id: string;
	icon: LucideIcon;
	name: string;
	description: string;
	features: string[];
	requirements?: string[];
}

const products: Product[] = [
	{
		id: "business-current",
		icon: Briefcase,
		name: "Business Current Account",
		description:
			"A cheque account specifically designed to cater for your business banking needs. Enjoy the convenience of paying by cheque and drawing money without restrictions, ideal for managing and controlling your business transactions anytime, anywhere.",
		features: [
			"Can be opened and operated in TZS, USD, EURO and GBP",
			"Opening balance of TZS 100,000 (or USD 100, GBP 100, EURO 100)",
			"Cheque book to facilitate cash withdrawals and transfers",
			"Overdraft facility for those who meet loan conditions",
		],
		requirements: [
			"Certificate of incorporation (original and photocopy)",
			"Memorandum and Articles of Association",
			"Business licence",
			"Minutes with a resolution to open an account at Maendeleo Bank",
			"Letter of application for account opening",
			"TIN number and/or VAT registration certificate",
		],
	},
	{
		id: "flexi-fixed",
		icon: CalendarClock,
		name: "Flexi Fixed Account",
		description:
			"A fixed deposit account with a maximum tenure of one year. Invest for 12 months or less, with an option to extend at new agreed terms, and choose to receive your interest at the beginning, monthly, or at the end.",
		features: [
			"Operating currency is TZS",
			"Minimum fixing amount of TZS 200,000",
			"Maturity tenure of 12 months at a fixed interest rate",
			"Interest paid up front, monthly to an account of your choice, or at the end of the contract",
			"Certificate of Deposit (Fixed Deposit Receipt) issued",
			"Emergency loan of up to 90% of the deposit (lien)",
			"Premature closure forfeits 50% of the interest earned",
		],
	},
	{
		id: "fixed-deposit",
		icon: CalendarClock,
		name: "Fixed Deposit Account",
		description:
			"A time deposit with fixed terms: a set amount is held in the account for a predetermined period and earns a competitive interest rate.",
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
	{
		id: "community",
		icon: Users,
		name: "Community Account",
		description:
			"An account which can be opened and operated by a religious institution or NGO, with free local transfers and access to treasury and payment facilities.",
		features: [
			"Available in TZS, EURO and GBP",
			"Low opening balance of TZS 50,000 (or EURO 50, GBP 50)",
			"Access to MB treasury products and local & international payment facilities (TISS & TT)",
			"Transact through our branch network",
			"Access to MB credit facilities",
			"Cheque book free of charge",
			"Local transfers to other banks free of charge",
		],
		requirements: [
			"Signatories' ID (voter ID, driving licence or passport)",
			"Original and copy of the certificate of registration",
			"Original and copy of the constitution",
			"Original and copy of the Tax Identification Number (TIN)",
			"Minutes of the meeting appointing the officers authorized to operate the account, with the mandate on how it will be operated",
		],
	},
];

export default function BusinessBankingPage() {
	return (
		<>
			<PageHero
				eyebrow="Business Banking"
				title="Banking that means business"
				lede="Accounts for traders, SMEs, companies, religious institutions and NGOs, backed by a bank whose strategic focus is enterprise growth across Tanzania."
				breadcrumb={[{ label: "Home", href: "/" }, { label: "Business Banking" }]}
				stat={{ value: "SME Clinic", label: "dedicated support for small and medium enterprises" }}
				accent="green"
			/>

			<section className="bg-white">
				<Container className="flex flex-col gap-16 py-16 md:gap-24 md:py-24">
					{products.map((product) => (
						<article
							key={product.id}
							id={product.id}
							className="scroll-mt-24 border-t border-hairline pt-10 first:border-t-0 first:pt-0"
						>
							<div className="flex items-center gap-4">
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-subdued text-brand">
									<product.icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
								</div>
								<h2 className="text-[26px] font-light leading-[1.1] tracking-display-lg text-ink md:text-[32px]">
									{product.name}
								</h2>
							</div>
							<p className="mt-4 max-w-2xl text-base font-light leading-[1.4] text-ink-secondary">
								{product.description}
							</p>
							<div
								className={`mt-8 grid gap-10 ${
									product.requirements ? "lg:grid-cols-2" : ""
								}`}
							>
								<div>
									<h3 className="text-[18px] font-light leading-[1.4] text-ink">
										Key features
									</h3>
									<ul className="mt-4 flex flex-col gap-2.5">
										{product.features.map((feature) => (
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
								{product.requirements ? (
									<div>
										<h3 className="text-[18px] font-light leading-[1.4] text-ink">
											What you need to open it
										</h3>
										<ul className="mt-4 flex flex-col gap-2.5">
											{product.requirements.map((requirement) => (
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

			<section className="bg-canvas-soft">
				<Container className="py-16 md:py-24">
					<div className="grid items-center gap-12 lg:grid-cols-2">
						<div>
							<Eyebrow>Growing with you</Eyebrow>
							<h2 className="mt-3 text-[32px] font-light leading-[1.15] tracking-display-xl text-ink md:text-[48px]">
								SME Clinic and the Maendeleo Bank Growth Network
							</h2>
							<p className="mt-5 max-w-lg text-base font-light leading-[1.4] text-ink-secondary">
								Our SME Clinic brings businesspeople together for professional
								advice, financial education and innovative business strategies.
								Through it we launched the Maendeleo Bank Growth Network
								(MBGN), a business network connecting customers, strengthening
								collaboration and opening new market opportunities.
							</p>
							<ul className="mt-8 flex flex-col gap-3">
								{[
									"Business networking with other entrepreneurs",
									"Financial training and literacy through regular seminars",
									"Professional advisory for business challenges",
									"Exposure to new platforms, markets and partnerships",
								].map((item) => (
									<li key={item} className="flex gap-2.5">
										<Handshake
											className="mt-1 h-4 w-4 shrink-0 text-brand"
											strokeWidth={1.5}
											aria-hidden
										/>
										<span className="text-[15px] font-light leading-[1.4] text-ink-mute">
											{item}
										</span>
									</li>
								))}
							</ul>
						</div>
						<div className="rounded-xl border border-hairline bg-white p-8">
							<Eyebrow>For SMEs and corporates</Eyebrow>
							<h3 className="mt-3 text-[22px] font-light leading-[1.12] tracking-display-md text-ink md:text-[26px]">
								Financing when you are ready to expand
							</h3>
							<p className="mt-3 text-[15px] font-light leading-[1.4] text-ink-mute">
								Our MSME loans run from <span className="tnum">TZS 3,000,000</span> to{" "}
								<span className="tnum">TZS 500,000,000</span> with repayments of 6 to
								36 months matched to your cash flow, plus advisory services on
								business skills and management.
							</p>
							<ArrowLink href="/loans" className="mt-6">
								See business loan options
							</ArrowLink>
						</div>
					</div>
				</Container>
			</section>

			<section className="bg-white">
				<Container className="flex flex-col items-start gap-6 py-16 md:py-20">
					<SectionHeading
						eyebrow="Get started"
						title="Open a business account"
						lede="Visit any of our six branches with your documents, or call our toll-free line 0800750089 and our commercial team will guide you."
					/>
					<PillLink href="/contact#branches">Find a branch</PillLink>
				</Container>
			</section>
		</>
	);
}

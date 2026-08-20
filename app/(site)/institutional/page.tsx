import type { Metadata } from "next";
import {
	ArrowLeftRight,
	Building,
	Church,
	Handshake,
	Users,
} from "lucide-react";
import {
	ArrowLink,
	Container,
	Eyebrow,
	FeatureCard,
	PageHero,
	PillLink,
	SectionHeading,
} from "@/components/site/primitives";

export const metadata: Metadata = {
	title: "Institutional Banking",
	description:
		"Community accounts, SACCOS financing, Jamii loans for religious institutions, treasury and payment facilities, institutional banking from Maendeleo Bank.",
	alternates: { canonical: "/institutional" },
	openGraph: {
		title: "Institutional Banking",
		description:
			"Community accounts, SACCOS financing, Jamii loans for religious institutions, treasury and payment facilities, institutional banking from Maendeleo Bank.",
		url: "/institutional",
	},
};

const offerings = [
	{
		icon: Church,
		title: "Community Account",
		body: "For religious institutions and NGOs: TZS, EURO or GBP, opening balance from TZS 50,000, free cheque book and free local transfers to other banks.",
		href: "/business-banking#community",
		linkLabel: "See the Community Account",
	},
	{
		icon: Users,
		title: "SACCOS financing",
		body: "A credit scheme for Savings and Co-operative Credit Societies, helping SACCOS provide short-term loans to their members, no collateral, repayment up to 48 months.",
		href: "/loans#saccos",
		linkLabel: "See the SACCOS Loan",
	},
	{
		icon: Handshake,
		title: "Jamii Loan",
		body: "Designed to boost projects owned by religious institutions, from TZS 1,000,000 with a grace period of up to 6 months and tenures up to 48 months.",
		href: "/loans#jamii",
		linkLabel: "See the Jamii Loan",
	},
	{
		icon: ArrowLeftRight,
		title: "Treasury & payments",
		body: "Access MB treasury products and local & international payment facilities (TISS & TT), plus forex at competitive treasury rates.",
		href: "/contact",
		linkLabel: "Talk to our team",
	},
];

export default function InstitutionalPage() {
	return (
		<>
			<PageHero
				eyebrow="Institutional Banking"
				title="A bank built by an institution, for institutions"
				lede="Maendeleo Bank was founded by the Evangelical Lutheran Church in Tanzania, Eastern and Coastal Diocese. Serving churches, dioceses, SACCOS, NGOs and corporates is in our DNA."
				breadcrumb={[{ label: "Home", href: "/" }, { label: "Institutional" }]}
				stat={{ value: "ELCT", label: "founded by the Eastern and Coastal Diocese" }}
				accent="charcoal"
			/>

			<section className="bg-white">
				<Container className="py-16 md:py-24">
					<SectionHeading
						eyebrow="What we offer"
						title="Institutional services"
						lede="Accounts, credit and payment infrastructure for faith-based institutions, cooperatives, non-profits and companies."
					/>
					<div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{offerings.map((offering) => (
							<FeatureCard key={offering.title} {...offering} />
						))}
					</div>
				</Container>
			</section>

			<section className="bg-canvas-soft">
				<Container className="py-16 md:py-24">
					<div className="grid gap-12 lg:grid-cols-2">
						<div>
							<Eyebrow>Our heritage</Eyebrow>
							<h2 className="mt-3 text-[32px] font-light leading-[1.15] tracking-display-xl text-ink md:text-[48px]">
								Rooted in the ELCT, open to all
							</h2>
							<p className="mt-5 max-w-lg text-base font-light leading-[1.4] text-ink-secondary">
								The bank was established as an initiative of the Evangelical
								Lutheran Church in Tanzania, Eastern and Coastal Diocese
								(ELCT-ECD), and our head office remains at Luther House on
								Sokoine Drive. Today we serve faith-based institutions of all
								denominations, KKKT dioceses and their institutions, SACCOS,
								NGOs, companies and the general public.
							</p>
							<p className="mt-4 max-w-lg text-base font-light leading-[1.4] text-ink-secondary">
								Church-related shareholders, including the United Evangelical
								Mission, ELCT-ECD diocese institutions and the ELCT Retirement
								Scheme, remain anchor shareholders alongside thousands of
								individual investors.
							</p>
						</div>
						<div className="rounded-xl bg-brand-plum p-8 md:p-10">
							<Building className="h-5 w-5 text-white" strokeWidth={1.5} aria-hidden />
							<h3 className="mt-6 text-[22px] font-light leading-[1.12] tracking-display-md text-white md:text-[26px]">
								Cash management for institutions
							</h3>
							<p className="mt-3 text-[15px] font-light leading-[1.4] text-white/70">
								Collection accounts, bulk payments and treasury services for
								dioceses, parishes, schools, hospitals, SACCOS and corporates,
								with relationship officers who understand institutional
								governance and reporting.
							</p>
							<p className="mt-6 text-[15px] font-light leading-[1.4] text-white/70">
								Trade finance and corporate banking relationships are handled
								by our Commercial Services team at Head Office.
							</p>
							<ArrowLink href="/contact" onDark className="mt-6">
								Contact Commercial Services
							</ArrowLink>
						</div>
					</div>
				</Container>
			</section>

			<section className="bg-white">
				<Container className="flex flex-col items-start gap-6 py-16 md:py-20">
					<SectionHeading
						eyebrow="Get started"
						title="Partner with Maendeleo Bank"
						lede="Reach us at Head Office, Luther House, Sokoine Drive, or call toll-free 0800750089 to speak with our institutional banking team."
					/>
					<PillLink href="/contact">Contact us</PillLink>
				</Container>
			</section>
		</>
	);
}

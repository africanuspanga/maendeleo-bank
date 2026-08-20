import type { Metadata } from "next";
import {
	ArrowLeftRight,
	Banknote,
	Laptop,
	MapPin,
	Receipt,
	Send,
	Smartphone,
	Wallet,
} from "lucide-react";
import {
	Container,
	Eyebrow,
	FeatureCard,
	PageHero,
	PillLink,
	SectionHeading,
} from "@/components/site/primitives";

export const metadata: Metadata = {
	title: "Digital Banking",
	description:
		"MB Mobile USSD *150*52#, Internet Banking, the MB Mobile App, 280+ Umoja ATMs and 2,100+ agents, digital banking from Maendeleo Bank.",
	alternates: { canonical: "/digital-banking" },
	openGraph: {
		title: "Digital Banking",
		description:
			"MB Mobile USSD *150*52#, Internet Banking, the MB Mobile App, 280+ Umoja ATMs and 2,100+ agents, digital banking from Maendeleo Bank.",
		url: "/digital-banking",
	},
};

const ussdServices = [
	{
		icon: ArrowLeftRight,
		title: "Transfers within the bank",
		body: "Easily transfer funds between accounts within Maendeleo Bank, fast, secure and available 24/7.",
	},
	{
		icon: Send,
		title: "External transfers",
		body: "Send money to accounts outside Maendeleo Bank, paying for services, family and friends, or business transactions.",
	},
	{
		icon: Receipt,
		title: "Bill payments",
		body: "Pay your utility bills, including electricity, directly from your mobile device, effortlessly and on time.",
	},
	{
		icon: Banknote,
		title: "Withdrawals via agents",
		body: "Use our One-Time Password (OTP) system to withdraw cash at any of our 2,100+ agency banking locations.",
	},
	{
		icon: Smartphone,
		title: "Airtime top-up",
		body: "Purchase airtime for any mobile network directly through our mobile banking service.",
	},
	{
		icon: Wallet,
		title: "Balance & history",
		body: "Check account balances, view transaction history and manage your account settings, all from your phone.",
	},
];

export default function DigitalBankingPage() {
	return (
		<>
			<PageHero
				eyebrow="Digital Banking"
				title="Banking at your fingertips"
				lede="Maendeleo Bank is committed to offering convenient, secure and innovative banking solutions through our mobile banking platform."
				breadcrumb={[{ label: "Home", href: "/" }, { label: "Digital Banking" }]}
				stat={{ value: "*150*52#", label: "USSD banking, no smartphone needed" }}
			/>

			<section className="bg-white">
				<Container className="py-16 md:py-24">
					<div className="max-w-2xl">
						<Eyebrow>MB Mobile USSD</Eyebrow>
						<h2 className="mt-3 text-[32px] font-light leading-[1.15] tracking-display-xl text-ink md:text-[48px]">
							Dial <span className="tnum text-brand">*150*52#</span>
						</h2>
						<p className="mt-4 text-base font-light leading-[1.4] text-ink-secondary">
							Access our services using the USSD code *150*52# for a seamless
							banking experience, on any phone, with or without internet.
						</p>
					</div>
					<div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{ussdServices.map((service) => (
							<div
								key={service.title}
								className="rounded-xl border border-hairline bg-white p-8 transition-shadow hover:shadow-lift-1"
							>
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-subdued text-brand">
									<service.icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
								</div>
								<h3 className="mt-6 text-[20px] font-light leading-[1.4] tracking-[-0.2px] text-ink">
									{service.title}
								</h3>
								<p className="mt-2 text-[15px] font-light leading-[1.4] text-ink-mute">
									{service.body}
								</p>
							</div>
						))}
					</div>
				</Container>
			</section>

			<section className="bg-canvas-soft">
				<Container className="py-16 md:py-24">
					<SectionHeading
						eyebrow="More channels"
						title="Online, in-app and on every corner"
					/>
					<div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						<FeatureCard
							icon={Laptop}
							title="Internet Banking"
							body="Launched in March 2025, secure online banking for account access, transfers and payments from any browser."
							href="https://ibanking.maendeleobank.co.tz"
							linkLabel="Log in to Internet Banking"
						/>
						<FeatureCard
							icon={Smartphone}
							title="MB Mobile App"
							body="Launched by the Prime Minister on 3 July 2025 alongside our national commercial bank status, banking from your smartphone."
							href="/news"
							linkLabel="Read the launch story"
						/>
						<FeatureCard
							icon={MapPin}
							title="Umoja ATMs"
							body="Withdraw cash at more than 280 Umoja switch ATM locations across the country, up to TZS 1,000,000 a day with your MB card."
							href="/contact#branches"
							linkLabel="Find us near you"
						/>
						<FeatureCard
							icon={Banknote}
							title="Agency banking"
							body="Deposit, withdraw and pay at over 2,100 Maendeleo Bank agents (wakala) nationwide, including OTP withdrawals via *150*52#."
							href="/contact#branches"
							linkLabel="Our network"
						/>
					</div>
					<div className="mt-12">
						<PillLink href="/contact">Get set up at a branch</PillLink>
					</div>
				</Container>
			</section>
		</>
	);
}

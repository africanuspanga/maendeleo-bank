import {
	Briefcase,
	HandCoins,
	Laptop,
	Wallet,
} from "lucide-react";
import { Container, FeatureCard, SectionHeading } from "@/components/site/primitives";

const actions = [
	{
		icon: Wallet,
		title: "Personal Banking",
		body: "Savings, salary and fixed-deposit accounts built around your goals — from your first TZS 5,000.",
		href: "/personal-banking",
		linkLabel: "See accounts",
	},
	{
		icon: Briefcase,
		title: "Business Banking",
		body: "Current accounts, fixed deposits and community accounts for businesses, institutions and NGOs.",
		href: "/business-banking",
		linkLabel: "See business accounts",
	},
	{
		icon: HandCoins,
		title: "Loan Services",
		body: "Eleven loan products for individuals, farmers, groups and enterprises — from TZS 50,000 to TZS 500 million.",
		href: "/loans",
		linkLabel: "Explore loans",
	},
	{
		icon: Laptop,
		title: "Internet Banking",
		body: "Secure online banking for account access, transfers and payments — wherever you are, whenever you need it.",
		href: "https://ibanking.maendeleobank.co.tz",
		linkLabel: "Log in securely",
	},
];

export function QuickActions() {
	return (
		<section className="bg-white">
			<Container className="py-16 md:py-24">
				<SectionHeading
					eyebrow="Quick actions"
					title="Start where you are"
				/>
				<div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{actions.map((action) => (
						<FeatureCard key={action.title} {...action} />
					))}
				</div>
			</Container>
		</section>
	);
}

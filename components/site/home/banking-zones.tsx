import { Building2, Landmark, LineChart, User } from "lucide-react";
import { Container, FeatureCard, SectionHeading } from "@/components/site/primitives";

const zones = [
	{
		icon: User,
		title: "Personal Banking",
		body: "Seven account types for every stage of life — student, salaried, goal-based saving and fixed deposits.",
		href: "/personal-banking",
		linkLabel: "Bank as an individual",
	},
	{
		icon: Building2,
		title: "Business Banking",
		body: "Current, flexi fixed and fixed deposit accounts that keep your business moving, plus SME support through SME Clinic.",
		href: "/business-banking",
		linkLabel: "Bank as a business",
	},
	{
		icon: Landmark,
		title: "Institutional",
		body: "Community accounts, SACCOS financing and payment facilities for churches, NGOs, cooperatives and corporates.",
		href: "/institutional",
		linkLabel: "Bank as an institution",
	},
	{
		icon: LineChart,
		title: "Investor Relations",
		body: "Listed on the DSE since 2013 as MBP. Reports, AGM books, shareholding structure and key figures for shareholders.",
		href: "/investor-relations",
		linkLabel: "For shareholders",
		featured: true,
	},
];

export function BankingZones() {
	return (
		<section className="bg-canvas-soft">
			<Container className="py-16 md:py-24">
				<SectionHeading
					eyebrow="Who we serve"
					title="One bank, every ambition"
					lede="Retail customers, MSMEs and institutions — with a strategic focus on financial inclusion and enterprise growth across Tanzania."
				/>
				<div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{zones.map((zone) => (
						<FeatureCard key={zone.title} {...zone} />
					))}
				</div>
			</Container>
		</section>
	);
}

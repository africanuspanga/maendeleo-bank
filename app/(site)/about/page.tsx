import type { Metadata } from "next";
import Image from "next/image";
import {
	ShieldCheck,
	Users,
	Lightbulb,
	HeartHandshake,
	BadgeCheck,
	HandHeart,
	type LucideIcon,
} from "lucide-react";
	import {
	Container,
	Eyebrow,
	PageHero,
	PillLink,
	SectionHeading,
	Stat,
} from "@/components/site/primitives";

export const metadata: Metadata = {
	title: "About Us",
	description:
		"Maendeleo Bank PLC — a Tanzanian national commercial bank founded on the initiative of the ELCT Eastern and Coastal Diocese, listed on the Dar es Salaam Stock Exchange since 2013.",
};

const timeline: { year: string; title: string; body: string }[] = [
	{
		year: "2008",
		title: "The decision",
		body: "The Evangelical Lutheran Church in Tanzania, Eastern and Coastal Diocese (ELCT-ECD) resolves at its Annual General Meeting to establish a bank that expands access to reliable, affordable financial services.",
	},
	{
		year: "2011",
		title: "Incorporation",
		body: "Maendeleo Bank is incorporated in February 2011, and becomes a public limited company in 2013.",
	},
	{
		year: "2013",
		title: "Operations and listing",
		body: "Banking operations commence on 9 September 2013. In the same year the bank lists on the Dar es Salaam Stock Exchange — an early commitment to transparency and public participation.",
	},
	{
		year: "2025",
		title: "A national commercial bank",
		body: "Following approval by the Bank of Tanzania, Maendeleo Bank becomes a fully licensed national commercial bank — officially launched by the Prime Minister, Hon. Kassim Majaliwa Majaliwa, on 3 July 2025, alongside the MB Mobile App and the 2025–2030 Strategic Plan.",
	},
	{
		year: "2025",
		title: "New leadership",
		body: "Mr. Lomnyaki Saitabau officially starts work as Managing Director on 2 January 2025, introduced by Board Chairman Prof. Ulingeta Obadia Mbamba.",
	},
	{
		year: "2026",
		title: "Beyond Dar es Salaam",
		body: "On 24 February 2026 the bank opens its sixth branch — in Arusha, the first outside the Dar es Salaam region — officiated by ELCT Presiding Bishop Dr. Alex Malasusa.",
	},
];

const values: { icon: LucideIcon; name: string; statement: string }[] = [
	{
		icon: ShieldCheck,
		name: "Integrity",
		statement: "We are committed to do the right thing.",
	},
	{
		icon: Users,
		name: "Teamwork",
		statement:
			"We collaborate, support one another, and share ideas to continually learn and deliver the best for our customers and the bank.",
	},
	{
		icon: Lightbulb,
		name: "Innovation",
		statement:
			"We embrace creativity and the smart use of technology to overcome challenges, and deliver better solutions for our customers and the bank.",
	},
	{
		icon: HeartHandshake,
		name: "Customer Focus",
		statement: "We put customers first in everything we do.",
	},
	{
		icon: BadgeCheck,
		name: "Accountability",
		statement: "We are accountable for our actions and decisions.",
	},
	{
		icon: HandHeart,
		name: "Respect",
		statement: "We value diversity and unique contributions.",
	},
];

const board: { name: string; role: string }[] = [
	{ name: "Prof. Ulingeta Mbamba", role: "Board Chairman" },
	{ name: "CPA Anna T. Mzinga", role: "Vice Chairperson" },
	{ name: "Rev. Wilbroad S. Mastai", role: "Director" },
	{ name: "Mr. Eliudi Betri Sanga", role: "Director" },
	{ name: "Ms. Joyce Mapunjo", role: "Director" },
	{ name: "Adv. Ayoub Mtafya", role: "Director" },
	{ name: "Dr. Emmanuel Manasseh", role: "Director" },
	{ name: "Rev. Dr. Ernest W. Kadiva", role: "Director" },
	{ name: "CPA Leah Kabale", role: "Director" },
	{ name: "Mr. Lomnyaki Saitabau", role: "Director" },
];

const management: { name: string; role: string }[] = [
	{ name: "Mr. Lomnyaki Saitabau", role: "Managing Director" },
	{ name: "CPA Nolasco Charles", role: "Head of Finance" },
	{ name: "CPA Peter Tarimo", role: "Head of Risk and Compliance" },
	{ name: "CPA Said Kapilima", role: "Head of Internal Audit" },
	{ name: "Mr. Emmanuel Mwaya", role: "Head of Commercial Services" },
	{ name: "Mr. Dustan Henry", role: "Head of Operations & ICT" },
	{ name: "Ms. Angela Mwageni", role: "Head of Legal and Company Secretary" },
	{ name: "Ms. Hellen Munisi", role: "Head of Human Resource & Administration" },
	{ name: "Mr. Godwin Mngulu", role: "Head of Credit" },
];

function initials(name: string) {
	return name
		.replace(/^(Prof\.|Dr\.|Mr\.|Ms\.|Mrs\.|CPA\.?|Adv\.|Rev\.)\s*/i, "")
		.split(/\s+/)
		.slice(0, 2)
		.map((part) => part.charAt(0).toUpperCase())
		.join("");
}

function PersonTile({ name, role }: { name: string; role: string }) {
	return (
		<div className="flex items-center gap-4 rounded-xl border border-hairline bg-white p-5 transition-shadow hover:shadow-lift-1">
			<div
				aria-hidden
				className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-subdued text-[15px] font-normal text-brand"
			>
				{initials(name)}
			</div>
			<div>
				<p className="text-[15px] font-normal leading-[1.4] text-ink">{name}</p>
				<p className="text-[13px] font-normal leading-[1.4] tracking-[-0.39px] text-ink-mute">
					{role}
				</p>
			</div>
		</div>
	);
}

export default function AboutPage() {
	return (
		<>
			<PageHero
				eyebrow="About us"
				title="Banking on progress, together"
				lede="Maendeleo Bank PLC serves retail customers, MSMEs and institutions with deposit accounts, credit facilities and digital banking — regulated by the Bank of Tanzania and listed on the Dar es Salaam Stock Exchange."
				breadcrumb={[{ label: "Home", href: "/" }, { label: "About us" }]}
			/>

			{/* Who we are */}
			<section className="bg-white">
				<Container className="py-16 md:py-24">
					<div className="grid items-start gap-12 lg:grid-cols-2">
						<div>
							<Eyebrow>Who we are</Eyebrow>
							<h2 className="mt-3 text-[32px] font-light leading-[1.15] tracking-display-xl text-ink md:text-[48px]">
								Established to widen access to finance
							</h2>
							<p className="mt-5 text-base font-light leading-[1.4] text-ink-secondary">
								Maendeleo Bank PLC (MBP) was established as an initiative of the
								Evangelical Lutheran Church in Tanzania, Eastern and Coastal
								Diocese. Its mandate is to expand access to reliable and
								affordable financial services.
							</p>
							<p className="mt-4 text-base font-light leading-[1.4] text-ink-secondary">
								The bank operates under the regulatory oversight of the Bank of
								Tanzania and fully complies with the Banking and Financial
								Institutions Act. Its strategic focus is promoting financial
								inclusion and supporting enterprise growth across Tanzania.
							</p>
						</div>
						<div className="rounded-xl border border-hairline bg-canvas-soft p-8">
							<Eyebrow>Our reach</Eyebrow>
							<div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8">
								<Stat value="6" label="Branches — five in Dar es Salaam, one in Arusha" />
								<Stat value="2,100+" label="Agency banking agents nationwide" />
								<Stat value="280+" label="Umoja ATM locations across the country" />
								<Stat value="MBP" label="Listed on the Dar es Salaam Stock Exchange" />
							</div>
							<p className="mt-8 text-[15px] font-light leading-[1.4] text-ink-mute">
								Customers can deposit, withdraw and make payments through agents
								without visiting a branch — and access accounts, transfers and
								bill payments at any time through our digital channels.
							</p>
						</div>
					</div>
				</Container>
			</section>

			{/* History timeline */}
			<section className="bg-canvas-soft">
				<Container className="py-16 md:py-24">
					<SectionHeading
						eyebrow="Our history"
						title="From a diocesan resolution to a national bank"
					/>
					<ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{timeline.map((item) => (
							<li
								key={`${item.year}-${item.title}`}
								className="flex h-full flex-col rounded-xl border border-hairline bg-white p-8"
							>
								<p className="tnum text-[26px] font-light leading-[1.1] tracking-display-lg text-brand">
									{item.year}
								</p>
								<h3 className="mt-3 text-[18px] font-light leading-[1.4] text-ink">
									{item.title}
								</h3>
								<p className="mt-2 text-[15px] font-light leading-[1.4] text-ink-mute">
									{item.body}
								</p>
							</li>
						))}
					</ol>
				</Container>
			</section>

			{/* Vision / Mission / Values */}
			<section className="bg-white">
				<Container className="py-16 md:py-24">
					<div className="grid gap-6 lg:grid-cols-2">
						<div className="rounded-xl border border-hairline bg-white p-8">
							<Eyebrow>Vision</Eyebrow>
							<p className="mt-4 text-[26px] font-light leading-[1.12] tracking-display-md text-ink md:text-[32px]">
								To be a preferred financial services provider
							</p>
						</div>
						<div className="rounded-xl bg-brand-plum p-8">
							<Eyebrow className="text-brand-soft">Mission</Eyebrow>
							<p className="mt-4 text-[26px] font-light leading-[1.12] tracking-display-md text-white md:text-[32px]">
								To provide innovative, customer-driven financial services with
								competitive returns to shareholders
							</p>
						</div>
					</div>

					<SectionHeading
						eyebrow="Core values"
						title="How every Maendeleo banker works"
						lede="All employees of the bank are expected to demonstrate these values in their daily activities and in decision making."
						className="mt-16 md:mt-24"
					/>
					<div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{values.map((value) => (
							<div
								key={value.name}
								className="rounded-xl border border-hairline bg-white p-8 transition-shadow hover:shadow-lift-1"
							>
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-subdued text-brand">
									<value.icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
								</div>
								<h3 className="mt-6 text-[18px] font-light leading-[1.4] text-ink">
									{value.name}
								</h3>
								<p className="mt-2 text-[15px] font-light leading-[1.4] text-ink-mute">
									{value.statement}
								</p>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* Leadership */}
			<section id="leadership" className="scroll-mt-24 bg-canvas-soft">
				<Container className="py-16 md:py-24">
					<SectionHeading
						eyebrow="Leadership"
						title="Board of Directors"
						lede="The bank is guided by a Board of Directors and structured committees overseeing risk, audit and compliance — reinforcing transparency, accountability and customer trust."
					/>
					<div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{board.map((person) => (
							<PersonTile key={person.name} {...person} />
						))}
					</div>

					<h3 className="mt-16 text-[26px] font-light leading-[1.1] tracking-display-lg text-ink md:mt-24 md:text-[32px]">
						Management team
					</h3>
					<div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{management.map((person) => (
							<PersonTile key={person.name} {...person} />
						))}
					</div>
				</Container>
			</section>

			{/* Heritage band */}
			<section className="bg-canvas-warm">
				<Container className="py-16 md:py-24">
					<div className="grid items-center gap-12 lg:grid-cols-2">
						<div className="relative overflow-hidden rounded-2xl shadow-lift-2">
							<Image
								src="/Corporate%20images/WhatsApp-Image-2025-07-21-at-16.21.34-1.jpg"
								alt="Launch of Maendeleo Bank as a national commercial bank, the MB Mobile App and the 2025–2030 Strategic Plan"
								width={2560}
								height={1706}
								className="h-full w-full object-cover"
							/>
						</div>
						<div>
							<Eyebrow>Our heritage</Eyebrow>
							<h2 className="mt-3 text-[32px] font-light leading-[1.15] tracking-display-xl text-ink md:text-[48px]">
								Rooted in community, built for the nation
							</h2>
							<p className="mt-5 text-base font-light leading-[1.4] text-ink-secondary">
								Born of the Evangelical Lutheran Church in Tanzania, Maendeleo
								Bank has always existed to serve — congregations, small
								businesses, SACCOS and families. Today, as a publicly listed
								national commercial bank, that founding purpose scales to all of
								Tanzania while individual investors remain the bank&apos;s
								largest shareholder group.
							</p>
							<div className="mt-8 flex flex-wrap gap-3">
								<PillLink href="/investor-relations" variant="primary">
									Investor relations
								</PillLink>
								<PillLink href="/news" variant="outline">
									Latest news
								</PillLink>
							</div>
						</div>
					</div>
				</Container>
			</section>
		</>
	);
}

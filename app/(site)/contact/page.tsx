import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Landmark, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import {
	Container,
	Eyebrow,
	PageHero,
	SectionHeading,
} from "@/components/site/primitives";
import { ContactForm } from "@/components/site/contact-form";

export const metadata: Metadata = {
	title: "Contact Us",
	description:
		"Reach Maendeleo Bank PLC, head office at Luther House, Dar es Salaam, toll-free call centre 0800750089, and six branches in Dar es Salaam and Arusha.",
	alternates: { canonical: "/contact" },
	openGraph: {
		title: "Contact Us",
		description:
			"Reach Maendeleo Bank PLC, head office at Luther House, Dar es Salaam, toll-free call centre 0800750089, and six branches in Dar es Salaam and Arusha.",
		url: "/contact",
	},
};

const contactCards = [
	{
		icon: MapPin,
		title: "Head Office",
		lines: ["Luther House, Sokoine Drive", "P.O. Box 216, Dar es Salaam, Tanzania"],
		action: {
			label: "Get directions",
			href: "https://www.google.com/maps/search/?api=1&query=Maendeleo+Bank+Luther+House+Sokoine+Drive+Dar+es+Salaam",
			external: true,
		},
	},
	{
		icon: Phone,
		title: "Call us",
		lines: ["Toll free: 0800750089", "Tel: +255 22 211 0518"],
		tnum: true,
		action: { label: "Call now", href: "tel:0800750089", external: true },
	},
	{
		icon: Mail,
		title: "Email",
		lines: ["info@maendeleobank.co.tz", "Careers: hr@maendeleobank.co.tz"],
		action: {
			label: "Send email",
			href: "mailto:info@maendeleobank.co.tz",
			external: true,
		},
	},
	{
		icon: Clock,
		title: "Open hours",
		lines: [
			"Monday – Friday: 8:30am – 4:00pm",
			"Saturday: 8:30am – 1:00pm",
			"Sundays & public holidays: closed",
		],
		tnum: true,
		action: { label: "Find a branch", href: "#branches", external: false },
	},
];

const branches = [
	{
		name: "Luther House (Head Office)",
		city: "Dar es Salaam",
		note: "Sokoine Drive, Posta",
	},
	{ name: "Mwenge Branch", city: "Dar es Salaam", note: "Mwenge" },
	{ name: "Kariakoo Branch", city: "Dar es Salaam", note: "Kariakoo" },
	{ name: "Mbezi Luis Branch", city: "Dar es Salaam", note: "Mbezi" },
	{ name: "Mbagala Branch", city: "Dar es Salaam", note: "Mbagala" },
	{
		name: "Arusha Branch",
		city: "Arusha",
		note: "Opened February 2026, our first branch outside Dar es Salaam",
	},
];

export default function ContactPage() {
	return (
		<>
			<PageHero
				eyebrow="Contact us"
				title="Karibu, talk to us"
				lede="Visit a branch, call our toll-free line, or write to us. Our team is ready to help with accounts, loans, digital banking and more."
				breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
				stat={{ value: "6", label: "branches · 2,100+ agents · 280+ Umoja ATMs" }}
			/>

			{/* Contact cards */}
			<section className="bg-white">
				<Container className="py-16 md:py-24">
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{contactCards.map((card) => (
							<div
								key={card.title}
								className="flex h-full flex-col rounded-xl border border-hairline bg-white p-8 transition-shadow hover:shadow-lift-1"
							>
								<div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-subdued text-brand-deep">
									<card.icon className="h-[22px] w-[22px]" strokeWidth={1.75} aria-hidden />
								</div>
								<h2 className="mt-6 text-heading-sm text-ink">
									{card.title}
								</h2>
								<div className="mt-2 flex flex-1 flex-col gap-1">
									{card.lines.map((line) => (
										<p
											key={line}
											className={`text-body-md break-words text-ink-mute ${card.tnum ? "tnum" : ""}`}
										>
											{line}
										</p>
									))}
								</div>
								{/* F31: bottom-anchored action turns dead space into function */}
								{card.action.external ? (
									<a
										href={card.action.href}
										className="mt-6 inline-flex items-center gap-1.5 py-1 text-body-md text-brand hover:text-brand-deep"
									>
										{card.action.label}
									</a>
								) : (
									<Link
										href={card.action.href}
										className="mt-6 inline-flex items-center gap-1.5 py-1 text-body-md text-brand hover:text-brand-deep"
									>
										{card.action.label}
									</Link>
								)}
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* Branches */}
			<section id="branches" className="scroll-mt-24 bg-canvas-soft">
				<Container className="py-16 md:py-24">
					<SectionHeading
						eyebrow="Where are we"
						title="Six branches, one nationwide network"
						lede="Five branches in Dar es Salaam and one in Arusha, supported by over 2,100 agency banking agents and more than 280 Umoja ATM locations across the country."
					/>
					<div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{branches.map((branch) => (
							/* F27: the card itself is the directions link. Street addresses,
							   branch phones and ATM locations block on client data (F27 note). */
							<a
								key={branch.name}
								href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Maendeleo Bank ${branch.name} ${branch.city}`)}`}
								target="_blank"
								rel="noopener noreferrer"
								className="group flex items-start gap-4 rounded-xl border border-hairline bg-white p-6 transition-shadow hover:shadow-lift-1"
							>
								<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-subdued text-brand-deep">
									<Landmark className="h-[22px] w-[22px]" strokeWidth={1.75} aria-hidden />
								</div>
								<div className="flex-1">
									<h3 className="text-body-md font-medium text-ink">
										{branch.name}
									</h3>
									<p className="text-caption text-ink-mute">
										{branch.city} · {branch.note}
									</p>
									<p className="mt-2 inline-flex items-center gap-1 text-caption text-brand group-hover:text-brand-deep">
										<MapPin className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
										Get directions
									</p>
								</div>
							</a>
						))}
					</div>
				</Container>
			</section>

			{/* Form + whistleblowing */}
			<section className="bg-white">
				<Container className="py-16 md:py-24">
					<div className="grid gap-12 lg:grid-cols-5">
						<div className="lg:col-span-3">
							<Eyebrow>Write to us</Eyebrow>
							<h2 className="mt-3 text-display-lg text-ink">
								Send a message
							</h2>
							<p className="mb-8 mt-4 text-body-lg text-ink-secondary">
								Fill in the form and it lands directly with our team, no
								email app needed.
							</p>
							<ContactForm />
						</div>
						<aside className="lg:col-span-2">
							<div className="rounded-xl bg-brand-plum p-8">
								<div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-white">
									<ShieldCheck className="h-[22px] w-[22px]" strokeWidth={1.75} aria-hidden />
								</div>
								<h2 className="mt-6 text-display-md text-white">
									Whistle blowing
								</h2>
								<p className="mt-3 text-body-md text-white/70">
									Report fraud, corruption, misconduct or unethical behaviour,
									in confidence, anonymously if you prefer. Protection is
									assured for disclosures made in good faith.
								</p>
								<div className="mt-6 flex flex-col gap-2 text-body-md">
									<a
										href="mailto:whistleblowing@maendeleobank.co.tz"
										className="text-brand-soft-on-dark hover:text-white"
									>
										whistleblowing@maendeleobank.co.tz
									</a>
									<a href="tel:+255755484510" className="tnum text-brand-soft-on-dark hover:text-white">
										+255 755 484 510
									</a>
								</div>
								<p className="mt-6 text-caption text-white/50">
									Speak up. Stay protected. Help us do better.
								</p>
							</div>
						</aside>
					</div>
				</Container>
			</section>
		</>
	);
}

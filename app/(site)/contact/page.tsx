import type { Metadata } from "next";
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
		"Reach Maendeleo Bank PLC — head office at Luther House, Dar es Salaam, toll-free call centre 0800750089, and six branches in Dar es Salaam and Arusha.",
};

const contactCards = [
	{
		icon: MapPin,
		title: "Head Office",
		lines: ["Luther House, Sokoine Drive", "P.O. Box 216, Dar es Salaam, Tanzania"],
	},
	{
		icon: Phone,
		title: "Call us",
		lines: ["Toll free: 0800750089", "Tel: +255 22 211 0518"],
		tnum: true,
	},
	{
		icon: Mail,
		title: "Email",
		lines: ["info@maendeleobank.co.tz", "Careers: hr@maendeleobank.co.tz"],
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
	},
];

const branches = [
	{
		name: "Luther House — Head Office",
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
		note: "Opened February 2026 — our first branch outside Dar es Salaam",
	},
];

export default function ContactPage() {
	return (
		<>
			<PageHero
				eyebrow="Contact us"
				title="Karibu — talk to us"
				lede="Visit a branch, call our toll-free line, or write to us. Our team is ready to help with accounts, loans, digital banking and more."
				breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
			/>

			{/* Contact cards */}
			<section className="bg-white">
				<Container className="py-16 md:py-24">
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{contactCards.map((card) => (
							<div
								key={card.title}
								className="rounded-xl border border-hairline bg-white p-8 transition-shadow hover:shadow-lift-1"
							>
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-subdued text-brand">
									<card.icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
								</div>
								<h2 className="mt-6 text-[18px] font-light leading-[1.4] text-ink">
									{card.title}
								</h2>
								<div className="mt-2 flex flex-col gap-1">
									{card.lines.map((line) => (
										<p
											key={line}
											className={`text-[15px] font-light leading-[1.4] text-ink-mute ${card.tnum ? "tnum" : ""}`}
										>
											{line}
										</p>
									))}
								</div>
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
						lede="Five branches in Dar es Salaam and one in Arusha — supported by over 2,100 agency banking agents and more than 280 Umoja ATM locations across the country."
					/>
					<div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{branches.map((branch) => (
							<div
								key={branch.name}
								className="flex items-start gap-4 rounded-xl border border-hairline bg-white p-6 transition-shadow hover:shadow-lift-1"
							>
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-subdued text-brand">
									<Landmark className="h-5 w-5" strokeWidth={1.5} aria-hidden />
								</div>
								<div>
									<h3 className="text-[15px] font-normal leading-[1.4] text-ink">
										{branch.name}
									</h3>
									<p className="text-[13px] font-normal leading-[1.4] tracking-[-0.39px] text-ink-mute">
										{branch.city} · {branch.note}
									</p>
								</div>
							</div>
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
							<h2 className="mt-3 text-[32px] font-light leading-[1.15] tracking-display-xl text-ink">
								Send a message
							</h2>
							<p className="mb-8 mt-4 text-base font-light leading-[1.4] text-ink-secondary">
								Fill in the form and your email app will open with everything
								addressed to our team.
							</p>
							<ContactForm />
						</div>
						<aside className="lg:col-span-2">
							<div className="rounded-xl bg-brand-plum p-8">
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white">
									<ShieldCheck className="h-5 w-5" strokeWidth={1.5} aria-hidden />
								</div>
								<h2 className="mt-6 text-[22px] font-light leading-[1.12] tracking-display-md text-white">
									Whistle blowing
								</h2>
								<p className="mt-3 text-[15px] font-light leading-[1.4] text-white/70">
									Report fraud, corruption, misconduct or unethical behaviour —
									in confidence, anonymously if you prefer. Protection is
									assured for disclosures made in good faith.
								</p>
								<div className="mt-6 flex flex-col gap-2 text-[15px] font-light leading-[1.4]">
									<a
										href="mailto:whistleblowing@maendeleobank.co.tz"
										className="text-brand-soft hover:text-white"
									>
										whistleblowing@maendeleobank.co.tz
									</a>
									<a href="tel:+255755484510" className="tnum text-brand-soft hover:text-white">
										+255 755 484 510
									</a>
								</div>
								<p className="mt-6 text-[13px] font-normal leading-[1.4] tracking-[-0.39px] text-white/50">
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

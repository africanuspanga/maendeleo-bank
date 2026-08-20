import {
	ArrowUpRight,
	HandCoins,
	LineChart,
	PiggyBank,
	SendHorizontal,
	UserPlus,
} from "lucide-react";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";

// RFQ §4.2: task-based quick actions — Save, Borrow, Send money,
// Open an account, Check rates — one click to the right task.
const actions = [
	{
		icon: PiggyBank,
		title: "Save",
		body: "Savings and goal accounts for every stage of life.",
		href: "/personal-banking",
		external: false,
	},
	{
		icon: HandCoins,
		title: "Borrow",
		body: "Eleven loan products, from TZS 50,000 to TZS 500 million.",
		href: "/loans",
		external: false,
	},
	{
		icon: SendHorizontal,
		title: "Send money",
		body: "Mobile, USSD *150*52# and internet banking, wherever you are.",
		href: "/digital-banking",
		external: false,
	},
	{
		icon: UserPlus,
		title: "Open an account",
		body: "Start today — visit a branch or send us the enquiry form.",
		href: "/contact",
		external: false,
	},
	{
		icon: LineChart,
		title: "Check rates",
		body: "Today's forex buy and sell rates, always timestamped.",
		href: "/#rates",
		external: false,
	},
];

export function QuickActions() {
	return (
		<section className="bg-white">
			<Container className="py-16 md:py-24">
				<Reveal>
					<Eyebrow>Quick actions</Eyebrow>
					<h2 className="mt-3 max-w-2xl text-[36px] font-light leading-[1.05] tracking-display-xl text-ink md:text-[56px]">
						Start where you are
					</h2>
				</Reveal>
				<div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-5">
					{actions.map((action, index) => {
						const inner = (
							<>
								<div className="flex items-center justify-between">
									<div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white transition-colors group-hover:bg-brand-deep">
										<action.icon className="h-[22px] w-[22px]" strokeWidth={1.75} aria-hidden />
									</div>
									<ArrowUpRight
										className="h-5 w-5 text-ink-mute transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
										strokeWidth={1.5}
										aria-hidden
									/>
								</div>
								<h3 className="mt-8 text-heading-md text-ink">
									{action.title}
								</h3>
								<p className="mt-2 text-[14px] font-normal leading-[1.45] text-ink-mute">
									{action.body}
								</p>
							</>
						);
						const classes =
							"group flex h-full flex-col bg-white p-7 transition-colors hover:bg-canvas-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand";
						return (
							<Reveal key={action.title} delay={index * 60}>
								{action.external ? (
									<a
										href={action.href}
										target="_blank"
										rel="noopener noreferrer"
										className={classes}
									>
										{inner}
									</a>
								) : (
									<Link href={action.href} className={classes}>
										{inner}
									</Link>
								)}
							</Reveal>
						);
					})}
				</div>
			</Container>
		</section>
	);
}

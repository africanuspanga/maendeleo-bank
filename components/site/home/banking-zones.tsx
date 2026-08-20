import { Container, ArrowLink } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";

/**
 * F35: this section used to duplicate Quick Actions' navigation. It is now
 * proof, not routing — the milestones a visitor can verify. Every fact is
 * sourced from docs/maendeleo-bank-info/02-about.md.
 */
const milestones = [
	{
		year: "2011",
		title: "Incorporated",
		body: "Maendeleo Bank PLC is incorporated in February 2011, an initiative of the Evangelical Lutheran Church in Tanzania, Eastern and Coastal Diocese.",
	},
	{
		year: "2013",
		title: "Operations begin, and a DSE listing",
		body: "The bank commences operations as a regional bank and lists on the Dar es Salaam Stock Exchange (MBP) in the same year.",
	},
	{
		year: "2025",
		title: "A national commercial bank",
		body: "Full commercial-bank approval from the Bank of Tanzania. Launched nationally by Prime Minister Kassim Majaliwa on 3 July 2025, alongside the MB Mobile App and the 2025–2030 strategic plan.",
	},
	{
		year: "2026",
		title: "Six branches, and a first beyond Dar",
		body: "The Arusha branch opens on 24 February 2026, the bank's sixth branch, and its first outside the Dar es Salaam region.",
	},
];

export function BankingZones() {
	return (
		<section className="relative overflow-hidden bg-brand-plum">
			{/* Ambient brand glows */}
			<div
				aria-hidden
				className="pointer-events-none absolute -right-40 top-0 h-[480px] w-[480px] rounded-full bg-brand/30 blur-3xl"
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-brand-green/10 blur-3xl"
			/>
			<Container className="relative py-20 md:py-28">
				<Reveal>
					{/* F33: the heading row carries its own right-hand proof point
					    instead of leaving the right half empty */}
					<div className="flex flex-wrap items-end justify-between gap-8">
						<div>
							<p className="text-eyebrow uppercase text-brand-soft-on-dark">
								Our track record
							</p>
							<h2 className="mt-4 max-w-3xl text-display-xl text-white md:text-display-xxl">
								Fifteen years of steady progress
							</h2>
							<p className="mt-5 max-w-xl text-lg font-normal leading-[1.5] text-white/60">
								From a church initiative to a national commercial bank,
								regulated by the Bank of Tanzania, listed on the DSE, and
								accountable to public shareholders.
							</p>
						</div>
						<div className="border-l-2 border-brand-soft-on-dark/40 pl-6">
							<p className="tnum text-display-lg text-white">TZS 15bn</p>
							<p className="mt-1 max-w-[220px] text-caption text-brand-soft-on-dark">
								Profit target by 2030 under the 2025–2030 strategic plan
							</p>
						</div>
					</div>
				</Reveal>

				<div className="mt-14 border-t border-white/10">
					{milestones.map((milestone, index) => (
						<Reveal key={milestone.year} delay={index * 60}>
							<div className="grid grid-cols-[auto_1fr] items-baseline gap-5 border-b border-white/10 py-7 md:gap-10 md:py-9">
								<p className="tnum text-heading-md text-brand-soft-on-dark">
									{milestone.year}
								</p>
								<div>
									<h3 className="text-display-md text-white">
										{milestone.title}
									</h3>
									<p className="mt-2 max-w-2xl text-body-md text-white/60">
										{milestone.body}
									</p>
								</div>
							</div>
						</Reveal>
					))}
				</div>

				<Reveal delay={120}>
					<ArrowLink href="/about" onDark className="mt-10">
						More about the bank
					</ArrowLink>
				</Reveal>
			</Container>
		</section>
	);
}

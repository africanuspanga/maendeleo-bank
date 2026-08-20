import {
	Container,
	Eyebrow,
	MeshBlobs,
	PillLink,
	Stat,
} from "@/components/site/primitives";

const stats = [
	{ value: "6", label: "Branches" },
	{ value: "2,100+", label: "Agents nationwide" },
	{ value: "280+", label: "Umoja ATM locations" },
	{ value: "MBP", label: "Listed on the DSE" },
];

export function Hero() {
	return (
		<section className="relative overflow-hidden">
			<MeshBlobs />
			<Container className="relative pb-16 pt-14 md:pb-24 md:pt-24">
				<div className="grid items-center gap-12 lg:grid-cols-2">
					<div>
						<Eyebrow>Maendeleo Bank PLC</Eyebrow>
						<h1 className="mt-4 text-[36px] font-light leading-[1.03] tracking-display-xxl text-ink md:text-[56px]">
							Together in Progress
						</h1>
						<p className="mt-5 max-w-md text-base font-light leading-[1.4] text-ink-secondary">
							Your trusted partner in development, progress and financial
							growth across Tanzania.
						</p>
						<div className="mt-8 flex flex-wrap gap-3">
							<PillLink href="/contact">Open an Account</PillLink>
							<PillLink href="/digital-banking" variant="outline">
								Explore Digital Banking
							</PillLink>
						</div>
					</div>
					<div>
						<div className="overflow-hidden rounded-2xl shadow-lift-2">
							<div className="relative">
								<video
									className="aspect-video w-full object-cover"
									src="/Bandari-Towers-Hero-Video.mp4"
									autoPlay
									muted
									loop
									playsInline
									preload="metadata"
									aria-label="Bandari Towers on the Dar es Salaam waterfront"
								/>
								<div
									aria-hidden
									className="pointer-events-none absolute inset-0 bg-brand/10"
								/>
							</div>
							<p className="bg-white px-5 py-3 text-[13px] font-normal leading-[1.4] tracking-[-0.39px] text-ink-mute">
								Bandari Towers, Dar es Salaam — home to a growing financial
								district we are proud to serve.
							</p>
						</div>
					</div>
				</div>
				<div className="mt-14 grid grid-cols-2 gap-8 border-t border-hairline pt-8 md:mt-16 md:grid-cols-4">
					{stats.map((stat) => (
						<Stat key={stat.label} value={stat.value} label={stat.label} />
					))}
				</div>
			</Container>
		</section>
	);
}

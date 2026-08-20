import { ChevronDown } from "lucide-react";
import { Container, PillLink } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { HeroVideo } from "@/components/site/home/hero-video";

const stats = [
	{ value: "6", label: "Branches, Dar es Salaam & Arusha" },
	{ value: "2,100+", label: "Agents nationwide" },
	{ value: "280+", label: "Umoja ATM locations" },
	{ value: "MBP", label: "Listed on the DSE since 2013" },
];

export function Hero() {
	return (
		<section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-brand-plum">
			{/* Poster guarantees content at 0 ms; the video mounts on top when allowed */}
			<img
				src="/hero-poster.webp"
				alt=""
				aria-hidden
				className="absolute inset-0 h-full w-full object-cover"
			/>
			<HeroVideo />
			{/* Cinematic plum grade over the video */}
			<div
				aria-hidden
				className="absolute inset-0 bg-gradient-to-b from-brand-plum/80 via-brand-plum/35 to-brand-plum"
			/>
			<div
				aria-hidden
				className="absolute inset-0 bg-gradient-to-r from-brand-plum/70 via-transparent to-transparent"
			/>
			{/* Brand glow accents */}
			<div
				aria-hidden
				className="pointer-events-none absolute -left-40 top-1/4 h-[480px] w-[480px] rounded-full bg-brand/30 blur-3xl"
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-brand-green/20 blur-3xl"
			/>

			{/* Content, bottom-anchored, centered */}
			<Container className="relative z-10 flex flex-1 flex-col items-center justify-end pb-10 pt-40 text-center">
				<Reveal>
					<h1 className="mx-auto max-w-4xl text-[52px] font-light leading-[0.98] tracking-[-2px] text-white md:text-[88px] lg:text-[104px]">
						<span className="block">Together in</span>
						<span className="block">Progress</span>
					</h1>
				</Reveal>
				<Reveal delay={120}>
					<p className="mx-auto mt-6 max-w-md text-lg font-light leading-[1.5] text-white/75">
						Your trusted partner in development, progress and financial growth
						across Tanzania.
					</p>
				</Reveal>
				<Reveal delay={180}>
					<div className="mt-9 flex flex-wrap justify-center gap-3">
						<PillLink href="/contact" variant="onDark">
							Open an Account
						</PillLink>
						<PillLink href="/digital-banking" variant="glass">
							Explore Digital Banking
						</PillLink>
					</div>
				</Reveal>

				{/* Glass stats strip */}
				<Reveal delay={240}>
					<div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-6 rounded-2xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-md md:grid-cols-4 md:p-8">
						{stats.map((stat) => (
							<div key={stat.label} className="text-center">
								<p className="tnum text-[28px] font-light leading-[1.05] tracking-[-0.64px] text-white md:text-[36px]">
									{stat.value}
								</p>
								<p className="mt-1.5 text-[12px] font-normal leading-[1.4] tracking-[-0.2px] text-white/60">
									{stat.label}
								</p>
							</div>
						))}
					</div>
				</Reveal>

				<div className="mt-8 flex justify-center pb-2">
					<ChevronDown
						className="scroll-cue h-5 w-5 text-white/60"
						strokeWidth={1.5}
						aria-hidden
					/>
				</div>
			</Container>
		</section>
	);
}

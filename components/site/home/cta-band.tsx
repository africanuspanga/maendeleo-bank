import { Container, PillLink } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";

export function CtaBand() {
	return (
		<section className="relative overflow-hidden bg-brand-plum">
			<div
				aria-hidden
				className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-brand/40 blur-3xl"
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute -right-32 bottom-0 h-[320px] w-[320px] rounded-full bg-brand-green/15 blur-3xl"
			/>
			<Container className="relative flex flex-col items-start gap-10 py-20 md:py-28">
				<Reveal>
					<h2 className="max-w-3xl text-[40px] font-light leading-[1.02] tracking-display-xl text-white md:text-[64px]">
						<span className="block">Ready to bank</span>
						<span className="block">with us?</span>
					</h2>
					<p className="mt-6 max-w-xl text-lg font-normal leading-[1.5] text-white/70">
						Visit any of our six branches, meet one of our 2,100+ agents
						nationwide, or dial *150*52# to get started today.
					</p>
					<div className="mt-10 flex flex-wrap gap-3">
						{/* The page's single green accent */}
						<PillLink href="/contact" variant="accent">
							Open an account today
						</PillLink>
						<PillLink href="/contact#branches" variant="outlineOnDark">
							Find a branch
						</PillLink>
					</div>
				</Reveal>
			</Container>
		</section>
	);
}

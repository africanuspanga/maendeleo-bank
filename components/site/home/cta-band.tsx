import { Container, PillLink } from "@/components/site/primitives";

export function CtaBand() {
	return (
		<section className="bg-brand-plum">
			<Container className="flex flex-col items-start gap-8 py-16 md:flex-row md:items-center md:justify-between md:py-20">
				<div className="max-w-xl">
					<h2 className="text-[32px] font-light leading-[1.15] tracking-display-xl text-white md:text-[48px]">
						Ready to bank with us?
					</h2>
					<p className="mt-4 text-base font-light leading-[1.4] text-white/70">
						Visit any of our six branches, meet one of our 2,100+ agents
						nationwide, or dial *150*52# to get started today.
					</p>
				</div>
				{/* The page's single green accent */}
				<PillLink href="/contact" variant="accent">
					Open an account today
				</PillLink>
			</Container>
		</section>
	);
}

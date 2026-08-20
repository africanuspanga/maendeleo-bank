import Image from "next/image";
import { ArrowLink, Container } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";

export function HeritageBand() {
	return (
		<section className="relative overflow-hidden">
			{/* Full-bleed heritage image with cinematic plum grade.
			    F11: right stop lifted to /60 plus a full-width scrim so the busy
			    launch photo stops fighting the headline; 50% 30% keeps faces in
			    the upper third. A calmer frame blocks on client photography. */}
			<Image
				src="/images/national-bank-launch-2025-key-handover.webp"
				alt="Maendeleo Bank leadership and guests at the national commercial bank launch"
				fill
				className="object-cover object-[50%_30%]"
				sizes="100vw"
			/>
			<div
				aria-hidden
				className="absolute inset-0 bg-gradient-to-r from-brand-plum/95 via-brand-plum/75 to-brand-plum/60"
			/>
			<div aria-hidden className="absolute inset-0 bg-brand-plum/20" />
			<Container className="relative py-24 md:py-36">
				<Reveal>
					<p className="text-eyebrow uppercase text-brand-soft-on-dark">
						Our heritage
					</p>
					<h2 className="mt-4 max-w-2xl text-[36px] font-light leading-[1.05] tracking-display-xl text-white md:text-[56px]">
						Born of a church, built for a nation
					</h2>
					<p className="mt-6 max-w-lg text-lg font-normal leading-[1.5] text-white/75">
						Born from a 2008 resolution of the Evangelical Lutheran Church in
						Tanzania, Eastern and Coastal Diocese, to expand access to reliable
						and affordable financial services. Incorporated in 2011, open since
						2013, listed on the DSE the same year, and a fully licensed
						national commercial bank since 2025.
					</p>
					<ArrowLink href="/about" onDark className="mt-9">
						Our story, vision and leadership
					</ArrowLink>
				</Reveal>
			</Container>
		</section>
	);
}

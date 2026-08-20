import Image from "next/image";
import {
	ArrowLink,
	Container,
	Eyebrow,
} from "@/components/site/primitives";

export function HeritageBand() {
	return (
		<section className="bg-canvas-warm">
			<Container className="py-16 md:py-24">
				<div className="grid items-center gap-12 lg:grid-cols-2">
					<div>
						<Eyebrow>Our heritage</Eyebrow>
						<h2 className="mt-3 text-[32px] font-light leading-[1.15] tracking-display-xl text-ink md:text-[48px]">
							Born of a church, built for a nation
						</h2>
						<p className="mt-5 max-w-lg text-base font-light leading-[1.4] text-ink-secondary">
							Maendeleo Bank was born from a 2008 resolution of the Evangelical
							Lutheran Church in Tanzania, Eastern and Coastal Diocese, to
							expand access to reliable and affordable financial services.
							Incorporated in 2011, we opened our doors in 2013 and listed on
							the Dar es Salaam Stock Exchange in the same year. In 2025 we
							became a fully licensed national commercial bank — still guided
							by the same founding purpose.
						</p>
						<ArrowLink href="/about" className="mt-8">
							Our story, vision and leadership
						</ArrowLink>
					</div>
					<div className="overflow-hidden rounded-2xl shadow-lift-2">
						<Image
							src="/Corporate%20images/WhatsApp-Image-2025-07-17-at-11.34.45-2048x1365.jpg"
							alt="Maendeleo Bank leadership and guests at the national commercial bank launch"
							width={2048}
							height={1365}
							className="aspect-[3/2] w-full object-cover"
						/>
					</div>
				</div>
			</Container>
		</section>
	);
}

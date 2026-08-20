import Image from "next/image";
import Link from "next/link";
import {
	ArrowLink,
	Container,
	PillLink,
	SectionHeading,
} from "@/components/site/primitives";

const featured = {
	title: "Maendeleo Bank yazindua tawi jipya Arusha",
	date: "24 February 2026",
	body: "KKKT Presiding Bishop Dr. Alex Malasusa officially opened our Arusha branch — the bank's sixth branch and the first outside the Dar es Salaam region.",
	image: "/Corporate%20images/WhatsApp-Image-2025-07-03-at-15.20.15-2048x1365.jpg",
	imageAlt: "Guests and bank leadership at a Maendeleo Bank launch event",
};

const items = [
	{
		title: "Maendeleo Bank PLC sasa ni Benki ya Kibiashara ya Kitaifa",
		date: "3 July 2025",
		summary:
			"Prime Minister Hon. Kassim Majaliwa Majaliwa launched Maendeleo Bank PLC as a national commercial bank, alongside the MB Mobile App and the 2025–2030 strategic plan.",
	},
	{
		title: "Mkurugenzi Mtendaji aanza kazi rasmi",
		date: "2 January 2025",
		summary:
			"Mr. Lomnyaki Saitabau officially began work as Managing Director, introduced by Board Chairman Prof. Ulingeta Obadia Mbamba.",
	},
	{
		title: "Maendeleo Bank Marathon — Hatua ya Faraja, msimu wa pili",
		date: "2 August 2024",
		summary:
			"The second season of the Hatua ya Faraja marathon launched at Luther House, raising funds for the KCMC Moshi Hospital autism programme.",
	},
];

export function NewsBand() {
	return (
		<section className="bg-white">
			<Container className="py-16 md:py-24">
				<div className="flex flex-wrap items-end justify-between gap-6">
					<SectionHeading eyebrow="News & Events" title="The latest from the bank" />
					<PillLink href="/news" variant="outline">
						Explore More
					</PillLink>
				</div>
				<div className="mt-10 grid gap-10 lg:grid-cols-2">
					<Link
						href="/news"
						className="group block overflow-hidden rounded-xl border border-hairline bg-white transition-shadow hover:shadow-lift-1"
					>
						<div className="relative aspect-[3/2]">
							<Image
								src={featured.image}
								alt={featured.imageAlt}
								fill
								className="object-cover"
								sizes="(min-width: 1024px) 560px, 100vw"
							/>
						</div>
						<div className="p-8">
							<p className="tnum text-[13px] font-normal leading-[1.4] tracking-[-0.39px] text-ink-mute">
								{featured.date}
							</p>
							<h3 className="mt-2 text-[22px] font-light leading-[1.12] tracking-display-md text-ink transition-colors group-hover:text-brand md:text-[26px]">
								{featured.title}
							</h3>
							<p className="mt-3 text-[15px] font-light leading-[1.4] text-ink-mute">
								{featured.body}
							</p>
						</div>
					</Link>
					<ul className="flex flex-col divide-y divide-hairline">
						{items.map((item) => (
							<li key={item.title} className="py-6 first:pt-0">
								<p className="tnum text-[13px] font-normal leading-[1.4] tracking-[-0.39px] text-ink-mute">
									{item.date}
								</p>
								<h3 className="mt-2 text-[20px] font-light leading-[1.4] tracking-[-0.2px] text-ink">
									{item.title}
								</h3>
								<p className="mt-2 text-[15px] font-light leading-[1.4] text-ink-mute">
									{item.summary}
								</p>
							</li>
						))}
						<li className="pt-6">
							<ArrowLink href="/news">All news and events</ArrowLink>
						</li>
					</ul>
				</div>
			</Container>
		</section>
	);
}

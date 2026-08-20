import Image from "next/image";
import Link from "next/link";
import { ArrowLink, Container, Eyebrow } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { getPublishedNews } from "@/lib/content";
import { formatDate } from "@/lib/format";

interface BandItem {
	title: string;
	date: string;
	summary: string;
	href: string;
}

const hardcodedFeatured = {
	title: "Maendeleo Bank yazindua tawi jipya Arusha",
	date: "24 February 2026",
	body: "KKKT Presiding Bishop Dr. Alex Malasusa officially opened our Arusha branch, the bank's sixth branch and the first outside the Dar es Salaam region.",
	image: "/images/national-bank-launch-2025-strategic-plan-speech.webp",
	imageAlt: "Guests and bank leadership at a Maendeleo Bank launch event",
	href: "/news",
};

const hardcodedItems: BandItem[] = [
	{
		title: "Maendeleo Bank PLC sasa ni Benki ya Kibiashara ya Kitaifa",
		date: "3 July 2025",
		summary:
			"Prime Minister Hon. Kassim Majaliwa Majaliwa launched Maendeleo Bank PLC as a national commercial bank, alongside the MB Mobile App and the 2025–2030 strategic plan.",
		href: "/news",
	},
	{
		title: "Mkurugenzi Mtendaji aanza kazi rasmi",
		date: "2 January 2025",
		summary:
			"Mr. Lomnyaki Saitabau officially began work as Managing Director, introduced by Board Chairman Prof. Ulingeta Obadia Mbamba.",
		href: "/news",
	},
	{
		title: "Maendeleo Bank Marathon, Hatua ya Faraja, msimu wa pili",
		date: "2 August 2024",
		summary:
			"The second season of the Hatua ya Faraja marathon launched at Luther House, raising funds for the KCMC Moshi Hospital autism programme.",
		href: "/news",
	},
];

export async function NewsBand() {
	// F02: the homepage news band reads the CMS; hardcoded items are the
	// fallback while nothing is published. F28: every headline is a link.
	const cmsNews = await getPublishedNews();
	const featured =
		cmsNews.length > 0
			? {
					title: cmsNews[0].title,
					date: cmsNews[0].published_at
						? formatDate(cmsNews[0].published_at)
						: "",
					body: cmsNews[0].excerpt ?? "",
					image:
						cmsNews[0].image_url ??
						"/images/national-bank-launch-2025-strategic-plan-speech.webp",
					imageAlt: cmsNews[0].title,
					href: `/news/${cmsNews[0].slug}`,
				}
			: hardcodedFeatured;
	const items: BandItem[] =
		cmsNews.length > 0
			? cmsNews.slice(1, 4).map((item) => ({
					title: item.title,
					date: item.published_at ? formatDate(item.published_at) : "",
					summary: item.excerpt ?? "",
					href: `/news/${item.slug}`,
				}))
			: hardcodedItems;

	return (
		<section className="bg-white">
			<Container className="py-20 md:py-28">
				<Reveal>
					<div className="flex flex-wrap items-end justify-between gap-6">
						<div>
							<Eyebrow>News & Events</Eyebrow>
							<h2 className="mt-3 text-[36px] font-light leading-[1.05] tracking-display-xl text-ink md:text-[56px]">
								The latest from the bank
							</h2>
						</div>
						<ArrowLink href="/news">Explore more</ArrowLink>
					</div>
				</Reveal>
				<div className="mt-12 grid gap-10 lg:grid-cols-2">
					<Reveal>
						<Link href={featured.href} className="group block">
							<div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
								<Image
									src={featured.image}
									alt={featured.imageAlt}
									fill
									className="object-cover transition-transform duration-700 group-hover:scale-105"
									sizes="(min-width: 1024px) 560px, 100vw"
								/>
								<div
									aria-hidden
									className="absolute inset-0 bg-gradient-to-t from-brand-plum/90 via-brand-plum/20 to-transparent"
								/>
								<div className="absolute inset-x-0 bottom-0 p-7">
									<p className="tnum text-caption text-white/70">
										{featured.date}
									</p>
									<h3 className="mt-2 text-[22px] font-light leading-[1.15] tracking-display-md text-white md:text-[28px]">
										{featured.title}
									</h3>
								</div>
							</div>
							<p className="mt-5 max-w-xl text-body-md text-ink-mute">
								{featured.body}
							</p>
						</Link>
					</Reveal>
					<Reveal delay={60}>
						<ul className="flex flex-col divide-y divide-hairline">
							{items.map((item) => (
								<li key={item.title}>
									<Link
										href={item.href}
										className="group block py-7 first:pt-0"
									>
										<p className="tnum text-caption text-ink-mute">
											{item.date}
										</p>
										<h3 className="mt-2 text-heading-md text-ink transition-colors group-hover:text-brand">
											{item.title}
										</h3>
										<p className="mt-2 text-body-md text-ink-mute">
											{item.summary}
										</p>
									</Link>
								</li>
							))}
							<li className="pt-7">
								<ArrowLink href="/news">All news and events</ArrowLink>
							</li>
						</ul>
					</Reveal>
				</div>
			</Container>
		</section>
	);
}

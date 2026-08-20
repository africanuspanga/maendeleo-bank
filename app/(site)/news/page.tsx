import type { Metadata } from "next";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import {
	ArrowLink,
	Container,
	Eyebrow,
	PageHero,
} from "@/components/site/primitives";

export const metadata: Metadata = {
	title: "News & Events",
	description:
		"The latest news from Maendeleo Bank PLC — branch openings, digital banking launches, the SME Clinic and community events across Tanzania.",
};

interface NewsItem {
	date: string;
	title: string;
	summary: string;
	source: string;
}

const featured = {
	date: "24 February 2026",
	title: "Maendeleo Bank Plc yazindua rasmi tawi la Arusha",
	summary:
		"ELCT Presiding Bishop Dr. Alex Malasusa officially inaugurated our Arusha branch — the bank's sixth branch and the first outside the Dar es Salaam region. Managing Director Lomnyaki Saitabau said the branch will serve entrepreneurs, faith-based institutions, companies and families across Arusha and neighbouring regions with financial education and inclusive services.",
	image: "/Corporate%20images/WhatsApp-Image-2025-07-03-at-15.20.12-1-2048x1365.jpg",
	imageAlt: "Maendeleo Bank leadership at the launch of the 2025–2030 Strategic Plan",
	source: "https://maendeleobank.co.tz/index.php/maendeleo-bank-yazindua-tawi-jipya-arusha/",
};

const items: NewsItem[] = [
	{
		date: "20 March 2026",
		title: "Whistle Blowing",
		summary:
			"The bank reaffirmed its commitment to integrity and ethical conduct, encouraging employees, customers, suppliers and the public to report misconduct in confidence — anonymously if preferred — through its independent whistleblowing channels. Speak up. Stay protected. Help us do better.",
		source: "https://maendeleobank.co.tz/index.php/2026/03/20/whistle-blowing/",
	},
	{
		date: "3 July 2025",
		title: "Maendeleo Bank PLC sasa ni Benki ya Kibiashara ya Kitaifa",
		summary:
			"The Prime Minister of the United Republic of Tanzania, Hon. Kassim Majaliwa Majaliwa, officially launched Maendeleo Bank PLC as a national commercial bank — and, at the same ceremony, launched the MB Mobile App and the bank's Strategic Plan for 2025–2030.",
		source: "https://maendeleobank.co.tz/index.php/2025/11/06/maendeleo-bank-plc-sasa-ni-benki-ya-kibiashara-ya-kitaifa/",
	},
	{
		date: "2025",
		title: "Maendeleo Bank Plc yazindua mtandao wa biashara kupitia SME Clinic",
		summary:
			"Through its SME Clinic platform, the bank launched the Maendeleo Bank Growth Network (MBGN) — a business network giving SMEs access to professional advice, financial training, advisory support and new market opportunities.",
		source: "https://maendeleobank.co.tz/index.php/maendeleo-bank-plc-yazindua-mtandao-wa-biashara-kupitia-sme-clinic/",
	},
	{
		date: "2 January 2025",
		title: "Mkurugenzi Mtendaji aanza kazi rasmi",
		summary:
			"Mr. Lomnyaki Saitabau officially started work as Managing Director, introduced by Board Chairman Prof. Ulingeta Obadia Mbamba. Outgoing Acting MD CPA Peter Tarimo congratulated him and thanked staff for their cooperation.",
		source: "https://maendeleobank.co.tz/index.php/2025/01/02/mkurugenzi-mtendaji-aanza-kazi-rasmi/",
	},
	{
		date: "6 August 2024",
		title: "Gawio la hisa na mauzo ya hisa kwa wanahisa wa Maendeleo Bank",
		summary:
			"Share dividend and share sale communication for Maendeleo Bank shareholders.",
		source: "https://maendeleobank.co.tz/index.php/2024/08/06/share-dividend-and-share-sale-for-maendeleo-bank-shareholders/",
	},
	{
		date: "6 August 2024",
		title: "Overview of Mobile Banking Services",
		summary:
			"An overview of the bank's mobile banking services, including USSD banking on *150*52# for transfers and bill payments.",
		source: "https://maendeleobank.co.tz/index.php/2024/08/06/2572/",
	},
	{
		date: "2 August 2024",
		title: "Uzinduzi wa Maendeleo Bank Marathon — Hatua ya Faraja, msimu wa pili",
		summary:
			"Board Chairman Prof. Ulingeta Obadia Mbamba led the launch of the second season of the Maendeleo Bank Marathon, held at the Farasi grounds, Oysterbay — a community initiative supporting development projects.",
		source: "https://maendeleobank.co.tz/index.php/2024/08/02/maendeleo-bank-launch-hatua-ya-faraja-msimu-wa-pili/",
	},
];

function DateLine({ date }: { date: string }) {
	return (
		<p className="flex items-center gap-2 text-[13px] font-normal leading-[1.4] tracking-[-0.39px] text-ink-mute">
			<CalendarDays className="h-4 w-4 text-brand" strokeWidth={1.5} aria-hidden />
			<time>{date}</time>
		</p>
	);
}

export default function NewsPage() {
	return (
		<>
			<PageHero
				eyebrow="News & Events"
				title="The latest from Maendeleo Bank"
				lede="Branch openings, digital launches, shareholder news and community events — what the bank is doing across Tanzania."
				breadcrumb={[{ label: "Home", href: "/" }, { label: "News" }]}
			/>

			<section className="bg-white">
				<Container className="py-16 md:py-24">
					{/* Featured */}
					<article className="grid gap-10 lg:grid-cols-2 lg:items-center">
						<div className="relative overflow-hidden rounded-2xl shadow-lift-2">
							<Image
								src={featured.image}
								alt={featured.imageAlt}
								width={2048}
								height={1365}
								className="h-full w-full object-cover"
								priority
							/>
						</div>
						<div>
							<Eyebrow>Featured</Eyebrow>
							<h2 className="mt-3 text-[26px] font-light leading-[1.12] tracking-display-md text-ink md:text-[32px]">
								{featured.title}
							</h2>
							<div className="mt-4">
								<DateLine date={featured.date} />
							</div>
							<p className="mt-4 text-base font-light leading-[1.4] text-ink-secondary">
								{featured.summary}
							</p>
							<ArrowLink href={featured.source} external className="mt-6">
								Read the original announcement
							</ArrowLink>
						</div>
					</article>

					{/* All news */}
					<div className="mt-16 grid gap-6 md:mt-24 md:grid-cols-2 lg:grid-cols-3">
						{items.map((item) => (
							<article
								key={item.title}
								className="flex h-full flex-col rounded-xl border border-hairline bg-white p-8 transition-shadow hover:shadow-lift-1"
							>
								<DateLine date={item.date} />
								<h3 className="mt-4 text-[22px] font-light leading-[1.12] tracking-display-md text-ink">
									{item.title}
								</h3>
								<p className="mt-3 flex-1 text-[15px] font-light leading-[1.4] text-ink-mute">
									{item.summary}
								</p>
								<ArrowLink href={item.source} external className="mt-6">
									Read more
								</ArrowLink>
							</article>
						))}
					</div>
				</Container>
			</section>
		</>
	);
}

import Image from "next/image";
import Link from "next/link";
import {
	FacebookIcon,
	InstagramIcon,
	XIcon,
} from "@/components/site/social-icons";
import { Container } from "@/components/site/primitives";

const INTERNET_BANKING = "https://ibanking.maendeleobank.co.tz";

const socialLinks = [
	{
		label: "Facebook",
		href: "https://www.facebook.com/maendeleobankplctz",
		Icon: FacebookIcon,
	},
	{
		label: "Instagram",
		href: "https://www.instagram.com/maendeleobankplc/",
		Icon: InstagramIcon,
	},
	{ label: "X", href: "https://twitter.com/Maendeleobanktz", Icon: XIcon },
];

interface FooterItem {
	label: string;
	href?: string;
	external?: boolean;
	tnum?: boolean;
}

// TODO(F38): derive from shared route list with navbar
const columns: { heading: string; items: FooterItem[] }[] = [
	{
		heading: "Banking",
		items: [
			{ label: "Personal Banking", href: "/personal-banking" },
			{ label: "Business Banking", href: "/business-banking" },
			{ label: "Institutional", href: "/institutional" },
			{ label: "Loans", href: "/loans" },
			{ label: "Digital Banking", href: "/digital-banking" },
		],
	},
	{
		heading: "About",
		items: [
			{ label: "About Us", href: "/about" },
			{ label: "Leadership", href: "/about#leadership" },
			{ label: "News", href: "/news" },
			{ label: "Careers", href: "/careers" },
			{ label: "Tenders", href: "/tenders" },
		],
	},
	{
		heading: "Investors",
		items: [
			{ label: "Investor Relations", href: "/investor-relations" },
			{ label: "Annual Reports", href: "/investor-relations#annual-reports" },
			{ label: "AGM Books", href: "/investor-relations#agm-books" },
		],
	},
	{
		heading: "Support",
		items: [
			{ label: "Contact Us", href: "/contact" },
			{ label: "Where Are We", href: "/contact#branches" },
			{ label: "Internet Banking", href: INTERNET_BANKING, external: true },
		],
	},
	{
		heading: "Legal",
		items: [
			{ label: "Licensed by the Bank of Tanzania" },
			{ label: "Listed on the DSE (MBP)", tnum: true },
			{
				label: "Whistle Blowing",
				href: "mailto:whistleblowing@maendeleobank.co.tz",
				external: true,
			},
		],
	},
];

const linkClass =
	"flex min-h-[44px] items-center text-caption text-white/70 transition-colors hover:text-white";

function FooterLink({ item }: { item: FooterItem }) {
	const className = `${linkClass}${item.tnum ? " tnum" : ""}`;
	if (item.external && item.href) {
		const isHttp = item.href.startsWith("http");
		return (
			<a
				href={item.href}
				className={className}
				{...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
			>
				{item.label}
			</a>
		);
	}
	if (item.href) {
		return (
			<Link href={item.href} className={className}>
				{item.label}
			</Link>
		);
	}
	return (
		<p
			className={`flex min-h-[44px] items-center text-caption text-white/60${
				item.tnum ? " tnum" : ""
			}`}
		>
			{item.label}
		</p>
	);
}

export function Footer() {
	return (
		<footer className="border-t border-white/15 bg-brand-plum text-white">
			{/* pb-24 clears the fixed floating action buttons on mobile (F05) */}
			<Container className="pb-24 pt-14 md:pb-16 md:pt-16">
				<div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
					<div className="sm:col-span-2 md:col-span-2 lg:col-span-1">
						<Link href="/" aria-label="Maendeleo Bank PLC home">
							<Image
								src="/logo.webp"
								alt="Maendeleo Bank PLC"
								width={2400}
								height={518}
								className="h-10 w-auto rounded bg-white p-1.5"
							/>
						</Link>
						<p className="mt-5 max-w-xs text-caption text-white/60">
							A Tanzanian national commercial bank, licensed by the Bank of
							Tanzania and listed on the Dar es Salaam Stock Exchange.
						</p>
						<address className="mt-6 not-italic">
							<div className="flex flex-col gap-1 text-caption text-white/60">
								<p>Head Office, Luther House, Sokoine Drive</p>
								<p>P.O. Box 216, Dar es Salaam</p>
							</div>
							<div className="mt-2 flex flex-col">
								<a href="mailto:info@maendeleobank.co.tz" className={linkClass}>
									info@maendeleobank.co.tz
								</a>
								<a href="tel:0800750089" className={`${linkClass} tnum`}>
									Toll Free: 0800750089
								</a>
							</div>
							<div className="mt-2 flex flex-col gap-1 text-caption text-white/60">
								<p>Monday – Friday: 8:30am – 4:00pm</p>
								<p>Saturday: 8:30am – 1:00pm</p>
								<p>Sunday &amp; public holidays: Closed</p>
							</div>
						</address>
					</div>
					<nav aria-label="Footer" className="contents">
						{columns.map((column) => (
							<div key={column.heading}>
								<h3 className="text-eyebrow uppercase text-brand-soft-on-dark">
									{column.heading}
								</h3>
								<ul className="mt-2 flex flex-col">
									{column.items.map((item) => (
										<li key={item.label}>
											<FooterLink item={item} />
										</li>
									))}
								</ul>
							</div>
						))}
					</nav>
				</div>
				<div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center">
					<p className="text-micro text-white/50">
						© 2026 Maendeleo Bank Plc. All Rights Reserved · Licensed by the
						Bank of Tanzania · Listed on the DSE (<span className="tnum">MBP</span>)
					</p>
					<div className="flex items-center gap-3">
						{socialLinks.map(({ label, href, Icon }) => (
							<a
								key={label}
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={label}
								className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
							>
								<Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden />
							</a>
						))}
					</div>
				</div>
			</Container>
		</footer>
	);
}

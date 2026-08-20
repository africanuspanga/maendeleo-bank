import Image from "next/image";
import Link from "next/link";
import {
	FacebookIcon,
	InstagramIcon,
	XIcon,
} from "@/components/site/social-icons";
import { Container } from "@/components/site/primitives";

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

const columns = [
	{
		heading: "Contact",
		items: [
			{ label: "Head Office, Luther House, Sokoine Drive", href: "/contact" },
			{ label: "P.O. Box 216, Dar es Salaam", href: "/contact" },
			{ label: "info@maendeleobank.co.tz", href: "mailto:info@maendeleobank.co.tz" },
			{ label: "Toll Free: 0800750089", href: "tel:0800750089", tnum: true },
		],
	},
	{
		heading: "Open Hours",
		items: [
			{ label: "Monday – Friday: 8:30am – 4:00pm", href: "/contact" },
			{ label: "Saturday: 8:30am – 1:00pm", href: "/contact" },
			{ label: "Sunday & public holidays: Closed", href: "/contact" },
			{ label: "Privacy Policy", href: "/contact" },
		],
	},
	{
		heading: "Accounts",
		items: [
			{ label: "Personal Banking", href: "/personal-banking" },
			{ label: "Business Banking", href: "/business-banking" },
			{ label: "Loans", href: "/loans" },
		],
	},
	{
		heading: "Reports",
		items: [
			{ label: "AGM Book", href: "/investor-relations#agm-books" },
			{ label: "Annual Report", href: "/investor-relations#annual-reports" },
		],
	},
];

export function Footer() {
	return (
		<footer className="bg-brand-plum text-white">
			<Container className="py-14 md:py-16">
				<div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
					<div className="lg:col-span-1">
						<Link href="/" aria-label="Maendeleo Bank PLC — home">
							<Image
								src="/Maendeleo-bank-logo.png"
								alt="Maendeleo Bank PLC"
								width={2400}
								height={518}
								className="h-10 w-auto rounded bg-white p-1.5"
							/>
						</Link>
						<p className="mt-5 max-w-xs text-[13px] font-light leading-[1.4] tracking-[-0.39px] text-white/60">
							A Tanzanian national commercial bank, licensed by the Bank of
							Tanzania and listed on the Dar es Salaam Stock Exchange.
						</p>
					</div>
					{columns.map((column) => (
						<nav key={column.heading} aria-label={column.heading}>
							<h2 className="text-[10px] font-normal uppercase leading-[1.15] tracking-[0.1px] text-white/50">
								{column.heading}
							</h2>
							<ul className="mt-4 flex flex-col gap-2.5">
								{column.items.map((item) => (
									<li key={item.label}>
										<Link
											href={item.href}
											className={`text-[13px] font-light leading-[1.4] tracking-[-0.39px] text-white/70 transition-colors hover:text-white ${
												"tnum" in item && item.tnum ? "tnum" : ""
											}`}
										>
											{item.label}
										</Link>
									</li>
								))}
							</ul>
						</nav>
					))}
				</div>
				<div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center">
					<p className="text-[11px] font-light leading-[1.4] text-white/50">
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

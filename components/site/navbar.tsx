"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
	ChevronDown,
	Menu,
	Phone,
	X,
} from "lucide-react";
import {
	FacebookIcon,
	InstagramIcon,
	XIcon,
} from "@/components/site/social-icons";
import { pillStyles } from "@/components/site/primitives";

const INTERNET_BANKING = "https://ibanking.maendeleobank.co.tz";

const utilityLinks = [
	{ label: "Internet Banking", href: INTERNET_BANKING, external: true },
	{ label: "Where are we", href: "/contact#branches", external: false },
	{ label: "Tender", href: "/tenders", external: false },
	{ label: "Career", href: "/careers", external: false },
	{
		label: "Whistle Blowing",
		href: "mailto:whistleblowing@maendeleobank.co.tz",
		external: true,
	},
];

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

interface NavItem {
	label: string;
	href?: string;
	children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
	{ label: "Home", href: "/" },
	{ label: "Personal Banking", href: "/personal-banking" },
	{ label: "Business Banking", href: "/business-banking" },
	{ label: "Institutional", href: "/institutional" },
	{ label: "Loans", href: "/loans" },
	{ label: "Investor Relations", href: "/investor-relations" },
	{
		label: "Reports",
		children: [
			{ label: "Annual Reports", href: "/investor-relations#annual-reports" },
			{ label: "AGM Books", href: "/investor-relations#agm-books" },
		],
	},
	{
		label: "About us",
		children: [
			{ label: "Who We Are", href: "/about" },
			{ label: "Leadership", href: "/about#leadership" },
			{ label: "News", href: "/news" },
		],
	},
];

function TopBar() {
	return (
		<div className="bg-brand text-white">
			<div className="mx-auto flex h-9 w-full max-w-[1200px] items-center justify-between gap-4 px-5 md:px-8">
				<nav aria-label="Utility" className="hidden items-center gap-5 md:flex">
					{utilityLinks.map((link) =>
						link.external ? (
							<a
								key={link.label}
								href={link.href}
								className="text-[11px] font-light leading-[1.4] text-white/85 transition-colors hover:text-white"
							>
								{link.label}
							</a>
						) : (
							<Link
								key={link.label}
								href={link.href}
								className="text-[11px] font-light leading-[1.4] text-white/85 transition-colors hover:text-white"
							>
								{link.label}
							</Link>
						),
					)}
				</nav>
				<div className="flex items-center gap-4">
					<a
						href="tel:0800750089"
						className="tnum inline-flex items-center gap-1.5 text-[11px] font-normal leading-[1.4] text-white"
					>
						<Phone className="h-3 w-3" strokeWidth={1.5} aria-hidden />
						Call Center 0800750089
					</a>
					<div className="flex items-center gap-3">
						{socialLinks.map(({ label, href, Icon }) => (
							<a
								key={label}
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={label}
								className="inline-flex h-6 w-6 items-center justify-center text-white/85 transition-colors hover:text-white"
							>
								<Icon className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
							</a>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	// Close the mobile menu on navigation — adjusted during render, not in
	// an effect (react.dev: "you might not need an effect").
	const [lastPathname, setLastPathname] = useState(pathname);
	if (lastPathname !== pathname) {
		setLastPathname(pathname);
		if (open) setOpen(false);
	}

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	return (
		<>
			<TopBar />
			<header
				className={`sticky top-0 z-40 transition-colors ${
					scrolled || open
						? "border-b border-hairline bg-white/95 backdrop-blur"
						: "border-b border-transparent bg-white/60 backdrop-blur-sm"
				}`}
			>
				<div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-6 px-5 md:h-[72px] md:px-8">
					<Link
						href="/"
						aria-label="Maendeleo Bank PLC — home"
						className="flex shrink-0 items-center"
					>
						<Image
							src="/Maendeleo-bank-logo.png"
							alt="Maendeleo Bank PLC"
							width={2400}
							height={518}
							className="h-9 w-auto md:h-10"
							priority
						/>
					</Link>

					<nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
						{navItems.map((item) =>
							item.children ? (
								<div key={item.label} className="group relative">
									<button
										type="button"
										aria-haspopup="true"
										className="inline-flex h-11 items-center gap-1 rounded-full px-3 text-[14px] font-normal text-ink-secondary transition-colors hover:text-brand"
									>
										{item.label}
										<ChevronDown
											className="h-3.5 w-3.5 transition-transform group-hover:rotate-180"
											strokeWidth={1.5}
											aria-hidden
										/>
									</button>
									<div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
										<ul className="w-52 rounded-xl border border-hairline bg-white p-2 shadow-lift-2">
											{item.children.map((child) => (
												<li key={child.label}>
													<Link
														href={child.href}
														className="block rounded-lg px-3 py-2.5 text-[14px] font-normal text-ink-secondary transition-colors hover:bg-brand-subdued hover:text-brand-deep"
													>
														{child.label}
													</Link>
												</li>
											))}
										</ul>
									</div>
								</div>
							) : (
								<Link
									key={item.label}
									href={item.href!}
									className={`inline-flex h-11 items-center rounded-full px-3 text-[14px] font-normal transition-colors hover:text-brand ${
										pathname === item.href ? "text-brand" : "text-ink-secondary"
									}`}
								>
									{item.label}
								</Link>
							),
						)}
					</nav>

					<div className="flex items-center gap-3">
						<a
							href={INTERNET_BANKING}
							target="_blank"
							rel="noopener noreferrer"
							className={`${pillStyles.primary} hidden min-h-[40px] px-5 text-sm sm:inline-flex`}
						>
							Internet Banking
						</a>
						<button
							type="button"
							onClick={() => setOpen((value) => !value)}
							aria-expanded={open}
							aria-label={open ? "Close menu" : "Open menu"}
							className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-brand-subdued lg:hidden"
						>
							{open ? (
								<X className="h-5 w-5" strokeWidth={1.5} aria-hidden />
							) : (
								<Menu className="h-5 w-5" strokeWidth={1.5} aria-hidden />
							)}
						</button>
					</div>
				</div>
			</header>

			{/* Mobile full-screen sheet */}
			{open ? (
				<div className="fixed inset-0 z-30 bg-white pt-16 lg:hidden">
					<nav
						aria-label="Mobile"
						className="h-full overflow-y-auto px-5 pb-16 pt-6"
					>
						<ul className="flex flex-col divide-y divide-hairline">
							{navItems.map((item) =>
								item.children ? (
									<li key={item.label} className="py-4">
										<p className="text-[10px] font-normal uppercase leading-[1.15] tracking-[0.1px] text-ink-mute">
											{item.label}
										</p>
										<ul className="mt-2 flex flex-col">
											{item.children.map((child) => (
												<li key={child.label}>
													<Link
														href={child.href}
														className="flex min-h-[44px] items-center text-lg font-light text-ink"
													>
														{child.label}
													</Link>
												</li>
											))}
										</ul>
									</li>
								) : (
									<li key={item.label}>
										<Link
											href={item.href!}
											className="flex min-h-[44px] items-center py-2 text-lg font-light text-ink"
										>
											{item.label}
										</Link>
									</li>
								),
							)}
						</ul>
						<a
							href={INTERNET_BANKING}
							target="_blank"
							rel="noopener noreferrer"
							className={`${pillStyles.primary} mt-8 w-full`}
						>
							Internet Banking
						</a>
						<p className="mt-6 text-center">
							<a href="tel:0800750089" className="tnum text-[13px] text-ink-mute">
								Call Center 0800750089
							</a>
						</p>
					</nav>
				</div>
			) : null}
		</>
	);
}

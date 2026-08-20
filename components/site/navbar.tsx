"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
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

// RFQ §4.1: top-level navigation is Personal, Business, Institutional,
// Investor Relations, News & Media, About Us, Careers. Loans and Digital
// Banking fold into Personal; Contact into About Us.
const navItems: NavItem[] = [
	{
		label: "Personal",
		href: "/personal-banking",
		children: [
			{ label: "Personal Banking", href: "/personal-banking" },
			{ label: "Loans", href: "/loans" },
			{ label: "Digital Banking", href: "/digital-banking" },
		],
	},
	{ label: "Business", href: "/business-banking" },
	{ label: "Institutional", href: "/institutional" },
	{
		label: "Investor Relations",
		href: "/investor-relations",
		children: [
			{ label: "Investor Relations", href: "/investor-relations" },
			{ label: "Annual Reports", href: "/investor-relations#annual-reports" },
			{ label: "AGM Books", href: "/investor-relations#agm-books" },
		],
	},
	{ label: "News & Media", href: "/news" },
	{
		label: "About Us",
		href: "/about",
		children: [
			{ label: "Who We Are", href: "/about" },
			{ label: "Leadership", href: "/about#leadership" },
			{ label: "Contact", href: "/contact" },
		],
	},
	{ label: "Careers", href: "/careers" },
];

/**
 * Fixed navbar, floats transparent over the dark cinematic hero at the top
 * of every page (all page heroes are dark plum), then condenses to a solid
 * white bar on scroll.
 */
export function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	// Close the mobile menu on navigation, adjusted during render, not in
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

	const solid = scrolled || open;
	const linkColor = solid
		? "text-ink-secondary hover:text-brand"
		: "text-white/85 hover:text-white";
	const navLinkClass = `inline-flex h-11 items-center whitespace-nowrap rounded-full px-3 text-button-sm transition-colors ${linkColor}`;

	return (
		<>
			<div className="fixed inset-x-0 top-0 z-40">
				{/* Utility bar, only visible at the very top */}
				<div
					className={`overflow-hidden transition-all duration-300 ${
						solid ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
					}`}
				>
					<div className="border-b border-white/10 bg-brand-plum/80 text-white">
						<div className="mx-auto flex h-11 w-full max-w-[1280px] items-center justify-between gap-4 px-5 md:px-8 xl:max-w-[1440px]">
							<nav aria-label="Utility" className="hidden items-center gap-4 md:flex">
								{utilityLinks.map((link) =>
									link.external ? (
										<a
											key={link.label}
											href={link.href}
											className="inline-flex h-11 items-center whitespace-nowrap px-1 text-caption font-medium text-white transition-colors hover:text-white/75"
										>
											{link.label}
										</a>
									) : (
										<Link
											key={link.label}
											href={link.href}
											className="inline-flex h-11 items-center whitespace-nowrap px-1 text-caption font-medium text-white transition-colors hover:text-white/75"
										>
											{link.label}
										</Link>
									),
								)}
							</nav>
							<div className="flex items-center gap-4">
								<a
									href="tel:0800750089"
									className="tnum inline-flex h-11 items-center gap-1.5 whitespace-nowrap text-caption font-medium text-white transition-colors hover:text-white/75"
								>
									<Phone className="h-3 w-3" strokeWidth={1.5} aria-hidden />
									Call Center 0800750089
								</a>
								<div className="flex items-center">
									{socialLinks.map(({ label, href, Icon }) => (
										<a
											key={label}
											href={href}
											target="_blank"
											rel="noopener noreferrer"
											aria-label={label}
											className="inline-flex h-11 w-11 items-center justify-center text-white transition-colors hover:text-white/75"
										>
											<Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden />
										</a>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Main bar */}
				<header
					className={`transition-all duration-300 ${
						solid
							? "border-b border-hairline bg-white/95 shadow-lift-1 backdrop-blur"
							: "border-b border-transparent bg-transparent"
					}`}
				>
					<div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between gap-6 px-5 md:h-[72px] md:px-8 xl:max-w-[1440px]">
						<Link
							href="/"
							aria-label="Maendeleo Bank PLC home"
							className="flex shrink-0 items-center"
						>
							{/* The logo wordmark is blue, it sits on a white pill while
							    the bar is transparent over the dark hero */}
							<span
								className={`rounded-full transition-all duration-300 ${
									solid ? "" : "bg-white px-3 py-1.5"
								}`}
							>
								<Image
									src="/logo.webp"
									alt="Maendeleo Bank PLC"
									width={600}
									height={130}
									className="h-9 w-auto md:h-11"
									priority
								/>
							</span>
						</Link>

						<nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
							{navItems.map((item) =>
								item.children ? (
									<BaseMenu.Root key={item.label} modal={false}>
										<BaseMenu.Trigger
											openOnHover
											closeDelay={150}
											className={`group gap-1 ${navLinkClass}`}
										>
											{item.label}
											<ChevronDown
												className="h-3.5 w-3.5 transition-transform group-data-[popup-open]:rotate-180"
												strokeWidth={1.5}
												aria-hidden
											/>
										</BaseMenu.Trigger>
										<BaseMenu.Portal>
											<BaseMenu.Positioner
												side="bottom"
												align="start"
												sideOffset={8}
												className="z-50"
											>
												<BaseMenu.Popup className="w-52 rounded-xl border border-hairline bg-white p-2 shadow-lift-2 outline-none">
													{item.children.map((child) => (
														<BaseMenu.Item
															key={child.label}
															render={<Link href={child.href} />}
															className="block rounded-lg px-3 py-2.5 text-button-sm text-ink-secondary outline-none transition-colors data-[highlighted]:bg-brand-subdued data-[highlighted]:text-brand-deep"
														>
															{child.label}
														</BaseMenu.Item>
													))}
												</BaseMenu.Popup>
											</BaseMenu.Positioner>
										</BaseMenu.Portal>
									</BaseMenu.Root>
								) : (
									<Link
										key={item.label}
										href={item.href!}
										className={`${navLinkClass} ${
											pathname === item.href
												? solid
													? "text-brand"
													: "text-white"
												: ""
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
								className={`${
									solid ? pillStyles.primary : pillStyles.onDark
								} hidden min-h-[40px] whitespace-nowrap px-5 text-sm sm:inline-flex`}
							>
								Internet Banking
							</a>
							<button
								type="button"
								onClick={() => setOpen((value) => !value)}
								aria-expanded={open}
								aria-label={open ? "Close menu" : "Open menu"}
								className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
									solid
										? "text-ink hover:bg-brand-subdued"
										: "text-white hover:bg-white/10"
								} xl:hidden`}
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
			</div>

			{/* Mobile full-screen sheet */}
			{open ? (
				<div className="fixed inset-0 z-30 bg-white pt-24 xl:hidden">
					<nav
						aria-label="Mobile"
						className="h-full overflow-y-auto px-5 pb-16 pt-6"
					>
						<ul className="flex flex-col divide-y divide-hairline">
							{navItems.map((item) =>
								item.children ? (
									<li key={item.label} className="py-4">
										<p className="text-eyebrow uppercase text-ink-mute">
											{item.label}
										</p>
										<ul className="mt-2 flex flex-col">
											{item.children.map((child) => (
												<li key={child.label}>
													<Link
														href={child.href}
														className="flex min-h-[44px] items-center text-lg font-normal text-ink"
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
											className="flex min-h-[44px] items-center py-2 text-lg font-normal text-ink"
										>
											{item.label}
										</Link>
									</li>
								),
							)}
						</ul>

						{/* F06: utility links are unreachable on mobile without this */}
						<div className="mt-6 border-t border-hairline pt-6">
							<p className="text-eyebrow uppercase text-ink-mute">More</p>
							<ul className="mt-2 flex flex-col">
								{utilityLinks
									// Internet Banking already has the CTA below
									.filter((link) => link.href !== INTERNET_BANKING)
									.map((link) => (
										<li key={link.label}>
											{link.external ? (
												<a
													href={link.href}
													className="flex min-h-[44px] items-center text-base font-normal text-ink-secondary"
												>
													{link.label}
												</a>
											) : (
												<Link
													href={link.href}
													className="flex min-h-[44px] items-center text-base font-normal text-ink-secondary"
												>
													{link.label}
												</Link>
											)}
										</li>
									))}
							</ul>
						</div>

						<a
							href={INTERNET_BANKING}
							target="_blank"
							rel="noopener noreferrer"
							className={`${pillStyles.primary} mt-8 w-full`}
						>
							Internet Banking
						</a>
						<p className="mt-6 text-center">
							<a href="tel:0800750089" className="tnum text-caption text-ink-mute">
								Call Center 0800750089
							</a>
						</p>
					</nav>
				</div>
			) : null}
		</>
	);
}

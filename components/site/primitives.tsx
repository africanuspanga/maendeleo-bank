import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

export function Container({
	children,
	className = "",
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div className={`mx-auto w-full max-w-[1200px] px-5 md:px-8 ${className}`}>
			{children}
		</div>
	);
}

/* ------------------------------------------------------------------ */
/* Type                                                                */
/* ------------------------------------------------------------------ */

export function Eyebrow({
	children,
	className = "",
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<p
			className={`text-[10px] font-normal uppercase leading-[1.15] tracking-[0.1px] text-brand-deep ${className}`}
		>
			{children}
		</p>
	);
}

export function SectionHeading({
	eyebrow,
	title,
	lede,
	className = "",
}: {
	eyebrow?: string;
	title: string;
	lede?: string;
	className?: string;
}) {
	return (
		<div className={`max-w-2xl ${className}`}>
			{eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
			<h2 className="mt-3 text-[32px] font-light leading-[1.15] tracking-display-xl text-ink md:text-[48px]">
				{title}
			</h2>
			{lede ? (
				<p className="mt-4 text-base font-light leading-[1.4] text-ink-secondary">
					{lede}
				</p>
			) : null}
		</div>
	);
}

/* ------------------------------------------------------------------ */
/* Pills — buttons are always pills (DESIGN.md §4)                     */
/* ------------------------------------------------------------------ */

const pillBase =
	"inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-6 py-2.5 text-base font-normal leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2";

export const pillStyles = {
	primary: `${pillBase} bg-brand text-white hover:bg-brand-deep active:bg-brand-press`,
	outline: `${pillBase} border border-brand bg-white text-brand hover:bg-brand-subdued`,
	accent: `${pillBase} bg-brand-green text-white hover:bg-brand-green-deep`,
	onDark: `${pillBase} bg-white text-brand-plum hover:bg-brand-subdued`,
	outlineOnDark: `${pillBase} border border-white/40 text-white hover:bg-white/10`,
} as const;

export function PillLink({
	href,
	children,
	variant = "primary",
	external = false,
	className = "",
}: {
	href: string;
	children: ReactNode;
	variant?: keyof typeof pillStyles;
	external?: boolean;
	className?: string;
}) {
	const styles = `${pillStyles[variant]} ${className}`;
	if (external) {
		return (
			<a href={href} target="_blank" rel="noopener noreferrer" className={styles}>
				{children}
			</a>
		);
	}
	return (
		<Link href={href} className={styles}>
			{children}
		</Link>
	);
}

export function ArrowLink({
	href,
	children,
	external = false,
	onDark = false,
	className = "",
}: {
	href: string;
	children: ReactNode;
	external?: boolean;
	onDark?: boolean;
	className?: string;
}) {
	const styles = `group inline-flex items-center gap-1.5 text-[15px] font-normal ${
		onDark ? "text-brand-soft hover:text-white" : "text-brand hover:text-brand-deep"
	} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm ${className}`;
	const icon = (
		<ArrowRight
			className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
			strokeWidth={1.5}
			aria-hidden
		/>
	);
	if (external) {
		return (
			<a href={href} target="_blank" rel="noopener noreferrer" className={styles}>
				{children}
				{icon}
			</a>
		);
	}
	return (
		<Link href={href} className={styles}>
			{children}
			{icon}
		</Link>
	);
}

/* ------------------------------------------------------------------ */
/* Cards — the hand-crafted rule (DESIGN.md §5)                        */
/* ------------------------------------------------------------------ */

export function FeatureCard({
	icon: Icon,
	title,
	body,
	href,
	linkLabel,
	featured = false,
	className = "",
}: {
	icon: LucideIcon;
	title: string;
	body: string;
	href: string;
	linkLabel: string;
	featured?: boolean;
	className?: string;
}) {
	if (featured) {
		return (
			<div
				className={`flex h-full flex-col rounded-xl bg-brand-plum p-8 ${className}`}
			>
				<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white">
					<Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
				</div>
				<h3 className="mt-6 text-[22px] font-light leading-[1.12] tracking-display-md text-white md:text-[26px]">
					{title}
				</h3>
				<p className="mt-3 flex-1 text-[15px] font-light leading-[1.4] text-white/70">
					{body}
				</p>
				<ArrowLink href={href} onDark className="mt-6">
					{linkLabel}
				</ArrowLink>
			</div>
		);
	}
	return (
		<div
			className={`flex h-full flex-col rounded-xl border border-hairline bg-white p-8 transition-shadow hover:shadow-lift-1 ${className}`}
		>
			<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-subdued text-brand">
				<Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
			</div>
			<h3 className="mt-6 text-[22px] font-light leading-[1.12] tracking-display-md text-ink md:text-[26px]">
				{title}
			</h3>
			<p className="mt-3 flex-1 text-[15px] font-light leading-[1.4] text-ink-mute">
				{body}
			</p>
			<ArrowLink href={href} className="mt-6">
				{linkLabel}
			</ArrowLink>
		</div>
	);
}

/* ------------------------------------------------------------------ */
/* Gradient mesh (DESIGN.md §5)                                        */
/* ------------------------------------------------------------------ */

export function MeshBlobs({ subtle = false }: { subtle?: boolean }) {
	return (
		<div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
			<div className="absolute -left-24 -top-32 h-[420px] w-[540px] rounded-full bg-[#efe3f3] blur-3xl" />
			<div className="absolute -top-28 left-[18%] h-[380px] w-[500px] rounded-full bg-[#c79bd4]/60 blur-3xl" />
			<div
				className={`absolute -top-36 right-[12%] h-[400px] w-[460px] rounded-full blur-3xl ${
					subtle ? "bg-[#843b8d]/25" : "bg-[#843b8d]/40"
				}`}
			/>
			<div className="absolute -top-20 right-[-110px] h-[340px] w-[400px] rounded-full bg-[#56245d]/25 blur-3xl" />
			{/* One green wash at a corner — the 20% accent */}
			<div className="absolute -bottom-32 right-[24%] h-[280px] w-[340px] rounded-full bg-[#bfe8cb] blur-3xl" />
			<div className="absolute -bottom-40 right-[30%] h-[180px] w-[220px] rounded-full bg-[#1b9f3c]/15 blur-3xl" />
			{/* Fade into the white canvas below */}
			<div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white" />
		</div>
	);
}

/* ------------------------------------------------------------------ */
/* Mesh-mini page header for inner pages                               */
/* ------------------------------------------------------------------ */

export function PageHero({
	eyebrow,
	title,
	lede,
	breadcrumb,
}: {
	eyebrow: string;
	title: string;
	lede?: string;
	breadcrumb: { label: string; href?: string }[];
}) {
	return (
		<header className="relative overflow-hidden">
			<MeshBlobs subtle />
			<Container className="relative pb-14 pt-14 md:pb-20 md:pt-20">
				<nav aria-label="Breadcrumb">
					<ol className="flex flex-wrap items-center gap-1.5 text-[13px] font-normal leading-[1.4] tracking-[-0.39px] text-ink-mute">
						{breadcrumb.map((item, index) => (
							<li key={item.label} className="flex items-center gap-1.5">
								{index > 0 ? <span aria-hidden>/</span> : null}
								{item.href ? (
									<Link
										href={item.href}
										className="text-brand hover:text-brand-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
									>
										{item.label}
									</Link>
								) : (
									<span aria-current="page">{item.label}</span>
								)}
							</li>
						))}
					</ol>
				</nav>
				<Eyebrow className="mt-8">{eyebrow}</Eyebrow>
				<h1 className="mt-3 max-w-3xl text-[32px] font-light leading-[1.15] tracking-display-xl text-ink md:text-[48px]">
					{title}
				</h1>
				{lede ? (
					<p className="mt-4 max-w-2xl text-base font-light leading-[1.4] text-ink-secondary">
						{lede}
					</p>
				) : null}
			</Container>
		</header>
	);
}

/* ------------------------------------------------------------------ */
/* Stat figure — money/counts always tnum                              */
/* ------------------------------------------------------------------ */

export function Stat({
	value,
	label,
	onDark = false,
}: {
	value: string;
	label: string;
	onDark?: boolean;
}) {
	return (
		<div>
			<p
				className={`tnum text-[26px] font-light leading-[1.1] tracking-display-lg md:text-[32px] ${
					onDark ? "text-white" : "text-ink"
				}`}
			>
				{value}
			</p>
			<p
				className={`mt-1 text-[13px] font-normal leading-[1.4] tracking-[-0.39px] ${
					onDark ? "text-white/60" : "text-ink-mute"
				}`}
			>
				{label}
			</p>
		</div>
	);
}

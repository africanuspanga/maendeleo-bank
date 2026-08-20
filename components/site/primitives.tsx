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
			className={`text-eyebrow uppercase text-brand-deep ${className}`}
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
			<h2 className="mt-3 text-display-lg text-ink md:text-display-xl">
				{title}
			</h2>
			{lede ? (
				<p className="mt-4 text-body-lg text-ink-secondary">
					{lede}
				</p>
			) : null}
		</div>
	);
}

/* ------------------------------------------------------------------ */
/* Pills, buttons are always pills (DESIGN.md §4)                     */
/* ------------------------------------------------------------------ */

const pillBase =
	"inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-2.5 text-base font-normal leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2";

export const pillStyles = {
	primary: `${pillBase} bg-brand text-white hover:bg-brand-deep active:bg-brand-press`,
	outline: `${pillBase} border border-brand bg-white text-brand hover:bg-brand-subdued`,
	accent: `${pillBase} bg-brand-green-deep text-white hover:brightness-90 active:brightness-75`,
	onDark: `${pillBase} bg-white text-brand-plum hover:bg-brand-subdued`,
	outlineOnDark: `${pillBase} border border-white/40 text-white hover:bg-white/10`,
	glass: `${pillBase} border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20`,
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
	const styles = `group inline-flex items-center gap-1.5 py-2.5 text-body-md ${
		onDark ? "text-brand-soft-on-dark hover:text-white" : "text-brand hover:text-brand-deep"
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
/* Cards, the hand-crafted rule (DESIGN.md §5)                        */
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
				<div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-white">
					<Icon className="h-[22px] w-[22px]" strokeWidth={1.75} aria-hidden />
				</div>
				<h3 className="mt-6 text-display-md text-white">
					{title}
				</h3>
				<p className="mt-3 flex-1 text-body-md text-white/70">
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
			<div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-subdued text-brand-deep">
				<Icon className="h-[22px] w-[22px]" strokeWidth={1.75} aria-hidden />
			</div>
			<h3 className="mt-6 text-display-md text-ink">
				{title}
			</h3>
			<p className="mt-3 flex-1 text-body-md text-ink-mute">
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
			{/* One green wash at a corner, the 20% accent */}
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

/** RFQ §4.1: each zone pairs the core purple with its own accent colour. */
type ZoneAccent = "blue" | "green" | "charcoal" | "grey";

const accentGlow: Record<ZoneAccent, string> = {
	blue: "bg-[#5eb2f2]/20",
	green: "bg-brand-green/15",
	charcoal: "bg-[#9a9aa6]/20",
	grey: "bg-[#b9bec6]/25",
};

const accentLine: Record<ZoneAccent, string> = {
	blue: "bg-[#5eb2f2]/60",
	green: "bg-brand-green/60",
	charcoal: "bg-[#9a9aa6]/60",
	grey: "bg-[#c7ccd4]/70",
};

export function PageHero({
	eyebrow,
	title,
	lede,
	breadcrumb,
	stat,
	accent = "green",
}: {
	eyebrow: string;
	title: string;
	lede?: string;
	breadcrumb: { label: string; href?: string }[];
	/** F34: optional per-page proof point for the otherwise empty right side */
	stat?: { value: string; label: string };
	/** Zone accent colour wash (RFQ §4.1); defaults to the brand green. */
	accent?: ZoneAccent;
}) {
	return (
		<header className="relative overflow-hidden bg-brand-plum">
			{/* Purple glow mesh on dark plum, with the zone accent wash */}
			<div aria-hidden className="pointer-events-none absolute inset-0">
				<div className="absolute -left-32 -top-40 h-[480px] w-[600px] rounded-full bg-brand/40 blur-3xl" />
				<div className="absolute right-[8%] top-[-220px] h-[420px] w-[480px] rounded-full bg-brand-soft/25 blur-3xl" />
				<div
					className={`absolute -right-24 bottom-[-160px] h-[300px] w-[360px] rounded-full blur-3xl ${accentGlow[accent]}`}
				/>
				<div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
			</div>
			<Container className="relative pb-16 pt-36 md:pb-24 md:pt-44">
				<nav aria-label="Breadcrumb">
					<ol className="flex flex-wrap items-center gap-1.5 text-caption text-white/50">
						{breadcrumb.map((item, index) => (
							<li key={item.label} className="flex items-center gap-1.5">
								{index > 0 ? <span aria-hidden>/</span> : null}
								{item.href ? (
									<Link
										href={item.href}
										className="text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-sm"
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
				<div className="mt-10 flex flex-wrap items-end justify-between gap-8">
					<div>
						<p className="text-eyebrow uppercase text-brand-soft-on-dark">
							{eyebrow}
						</p>
						{/* Zone accent marker (RFQ §4.1) */}
						<div
							aria-hidden
							className={`mt-2 h-0.5 w-10 rounded-full ${accentLine[accent]}`}
						/>
						<h1 className="mt-4 max-w-3xl text-[40px] font-light leading-[1.05] tracking-display-xl text-white md:text-[64px]">
							{title}
						</h1>
						{lede ? (
							<p className="mt-6 max-w-2xl text-lg font-normal leading-[1.5] text-white/70">
								{lede}
							</p>
						) : null}
					</div>
					{stat ? (
						<div className="border-l-2 border-brand-soft-on-dark/40 pl-6">
							<p className="tnum text-display-lg text-white">{stat.value}</p>
							<p className="mt-1 max-w-[200px] text-caption text-brand-soft-on-dark">
								{stat.label}
							</p>
						</div>
					) : null}
				</div>
			</Container>
		</header>
	);
}

/* ------------------------------------------------------------------ */
/* Stat figure, money/counts always tnum                              */
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

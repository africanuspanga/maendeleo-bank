/**
 * Country flags for the forex widget (F50): the lipis/flag-icons set,
 * self-hosted in /public/flags, rendered inside the original circular
 * mask + border treatment. Falls back to a code circle for currencies
 * without a downloaded flag.
 */
type FlagProps = { code: string; className?: string };

const FLAG_FILES: Record<string, string> = {
	USD: "/flags/us.svg",
	EUR: "/flags/eu.svg",
	GBP: "/flags/gb.svg",
	KES: "/flags/ke.svg",
	ZAR: "/flags/za.svg",
};

/** Currency code → self-hosted flag file, for treatments that need their own sizing. */
export function flagFile(code: string): string | undefined {
	return FLAG_FILES[code];
}

export function FlagIcon({ code, className }: FlagProps) {
	const src = FLAG_FILES[code];
	return (
		<span className={className}>
			<span
				aria-hidden
				title={code}
				className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-black/10 bg-canvas-soft"
			>
				{src ? (
					// Decorative: the currency label next to it carries the meaning.
					// eslint-disable-next-line @next/next/no-img-element
					<img src={src} alt="" className="h-full w-full object-cover" />
				) : (
					<span className="text-micro text-brand-deep">{code}</span>
				)}
			</span>
		</span>
	);
}

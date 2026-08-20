import { ArrowLink, Eyebrow } from "@/components/site/primitives";
import { formatDate } from "@/lib/format";
import {
	EPS_2025_TZS,
	LATEST_SNAPSHOT,
	MARKET_CAP_TZS,
	PRICE_SNAPSHOTS,
	formatTzs,
	formatTzsCompact,
} from "@/lib/share-price";

/**
 * RFQ §4.6: on-page share price block — price, year range, market cap and
 * EPS, each labelled with its as-of date. Figures are documented snapshots
 * (lib/share-price.ts) until the DSE API integration is confirmed.
 */
export function SharePriceCard() {
	const low = Math.min(...PRICE_SNAPSHOTS.map((s) => s.price));
	const high = Math.max(...PRICE_SNAPSHOTS.map((s) => s.price));

	const figures = [
		{
			label: "2026 range",
			value: `${low.toLocaleString("en-US")} – ${high.toLocaleString("en-US")}`,
			asOf: `Documented ${formatDate(PRICE_SNAPSHOTS[0].date)} – ${formatDate(LATEST_SNAPSHOT.date)}`,
		},
		{
			label: "Market capitalisation",
			value: formatTzsCompact(MARKET_CAP_TZS),
			asOf: `At ${formatTzs(LATEST_SNAPSHOT.price)}, ${formatDate(LATEST_SNAPSHOT.date)}`,
		},
		{
			label: "Earnings per share",
			value: formatTzs(EPS_2025_TZS, 1),
			asOf: "From 2025 audited PAT of TZS 4.75bn",
		},
	];

	return (
		<div className="rounded-xl bg-brand-plum p-8 md:p-10 lg:col-span-2">
			<Eyebrow className="text-brand-soft">Share information</Eyebrow>
			<h2 className="mt-3 text-[26px] font-light leading-[1.1] tracking-display-lg text-white md:text-[32px]">
				Maendeleo Bank PLC, <span className="tnum">MBP</span>
			</h2>

			<div className="mt-8 flex flex-wrap items-end gap-x-10 gap-y-6 border-b border-white/10 pb-8">
				<div>
					<p className="text-[10px] font-normal uppercase leading-[1.15] tracking-[0.1px] text-white/50">
						Share price
					</p>
					<p className="tnum mt-1 text-[44px] font-light leading-none text-white">
						{formatTzs(LATEST_SNAPSHOT.price)}
					</p>
					<p className="mt-2 text-micro text-white/50">
						As of {formatDate(LATEST_SNAPSHOT.date)} ·{" "}
						{LATEST_SNAPSHOT.source}
					</p>
				</div>
				<div className="pb-1">
					<p className="text-[10px] font-normal uppercase leading-[1.15] tracking-[0.1px] text-white/50">
						Ticker / ISIN
					</p>
					<p className="tnum mt-1 text-[22px] font-light text-white">
						MBP · TZ1996101683
					</p>
					<p className="mt-2 text-micro text-white/50">
						Listed on the DSE since 2013
					</p>
				</div>
			</div>

			<dl className="mt-8 grid gap-6 sm:grid-cols-3">
				{figures.map((figure) => (
					<div key={figure.label}>
						<dt className="text-[10px] font-normal uppercase leading-[1.15] tracking-[0.1px] text-white/50">
							{figure.label}
						</dt>
						<dd className="tnum mt-1 text-[22px] font-light text-white">
							{figure.value}
						</dd>
						<dd className="mt-1 text-micro text-white/50">{figure.asOf}</dd>
					</div>
				))}
			</dl>

			<p className="mt-8 border-t border-white/10 pt-6 text-[13px] font-light leading-[1.4] tracking-[-0.39px] text-white/60">
				Figures are documented snapshots, not a live feed — later 2026 quotes
				ranged TZS 1,860–2,180 depending on source. Direct DSE integration is
				planned; confirm live prices on the official DSE company profile.
			</p>
			<ArrowLink
				href="https://dse.co.tz/index.php/listed/company/profile?id=8"
				external
				onDark
				className="mt-4"
			>
				View MBP live on the DSE
			</ArrowLink>
		</div>
	);
}

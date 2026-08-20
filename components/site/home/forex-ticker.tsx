"use client";

import { useEffect, useState } from "react";
import { flagFile } from "@/components/site/flag-icon";
import { formatDateTime } from "@/lib/format";

interface ForexRate {
	currency: string;
	label: string;
	buy: number;
	sell: number;
}

interface RatesResponse {
	rates: ForexRate[];
	source: "supabase" | "bot" | "fallback";
	updatedAt: string;
}

function formatRate(value: number): string {
	return value.toLocaleString("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
}

function TickerItem({ rate }: { rate: ForexRate }) {
	const flag = flagFile(rate.currency);
	return (
		<span className="flex items-center gap-2.5 px-6 whitespace-nowrap">
			<span
				aria-hidden
				className="inline-flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/25 bg-white/10"
			>
				{flag ? (
					// Decorative: the currency code next to it carries the meaning.
					// eslint-disable-next-line @next/next/no-img-element
					<img src={flag} alt="" className="h-full w-full object-cover" />
				) : (
					<span className="text-[9px] font-medium text-white">
						{rate.currency}
					</span>
				)}
			</span>
			<span className="text-[13px] font-medium text-white">{rate.currency}</span>
			<span className="tnum text-[13px] text-white/80">
				Buy {formatRate(rate.buy)}
			</span>
			<span aria-hidden className="text-white/40">
				·
			</span>
			<span className="tnum text-[13px] text-white/80">
				Sell {formatRate(rate.sell)}
			</span>
		</span>
	);
}

/**
 * Slim scrolling FX strip directly under the hero (RFQ §4.2) for visitors who
 * only come for the daily rates. The full rates table with buy/sell detail
 * stays further down the homepage. Same /api/rates feed as the main widget.
 */
export function ForexTicker() {
	const [data, setData] = useState<RatesResponse | null>(null);

	useEffect(() => {
		let cancelled = false;
		fetch("/api/rates")
			.then((response) => {
				if (!response.ok) throw new Error("rates request failed");
				return response.json() as Promise<RatesResponse>;
			})
			.then((json) => {
				if (!cancelled) setData(json);
			})
			.catch(() => {
				/* no rates, no strip — the full widget below still renders */
			});
		return () => {
			cancelled = true;
		};
	}, []);

	if (!data || data.rates.length === 0) return null;

	const updatedAt = new Date(data.updatedAt);

	return (
		<section
			aria-label="Daily forex rates ticker"
			className="mb-ticker relative z-10 flex items-stretch overflow-hidden border-y border-white/10 bg-brand"
		>
			<style>{`
				@keyframes mb-ticker-scroll {
					from { transform: translateX(0); }
					to { transform: translateX(-50%); }
				}
				.mb-ticker-track { animation: mb-ticker-scroll 45s linear infinite; }
				.mb-ticker:hover .mb-ticker-track { animation-play-state: paused; }
				@media (prefers-reduced-motion: reduce) {
					.mb-ticker-track { animation: none; }
				}
			`}</style>

			{/* Fixed label cell */}
			<div className="relative z-10 flex shrink-0 flex-col justify-center border-r border-white/15 bg-brand-deep px-4 py-2.5 sm:px-6">
				<p className="text-[11px] font-medium tracking-[0.08em] whitespace-nowrap text-white uppercase">
					Forex Rates
				</p>
				{!Number.isNaN(updatedAt.getTime()) && (
					<p className="tnum text-[10px] whitespace-nowrap text-white/60">
						Updated {formatDateTime(updatedAt)}
					</p>
				)}
			</div>

			{/* Scrolling track — two copies for a seamless loop */}
			<div className="relative flex flex-1 items-center overflow-hidden">
				<div className="mb-ticker-track flex w-max items-center py-2.5">
					{[0, 1].map((copy) => (
						<div
							key={copy}
							className="flex items-center divide-x divide-white/15"
							aria-hidden={copy === 1}
						>
							{data.rates.map((rate) => (
								<TickerItem key={`${copy}-${rate.currency}`} rate={rate} />
							))}
						</div>
					))}
				</div>
				{/* Soft fade at the edges */}
				<div
					aria-hidden
					className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-brand to-transparent"
				/>
				<div
					aria-hidden
					className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-brand to-transparent"
				/>
			</div>
		</section>
	);
}

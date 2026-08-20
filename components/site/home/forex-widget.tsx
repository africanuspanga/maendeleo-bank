"use client";

import { useEffect, useState } from "react";
import { Container, Eyebrow } from "@/components/site/primitives";
import { FlagIcon } from "@/components/site/flag-icon";
import { formatDateTime } from "@/lib/format";
import { Reveal } from "@/components/site/reveal";

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

/** F48/F20: one en-GB timestamp to the minute; tolerate non-ISO source dates. */
function formatUpdatedAt(raw: string): string {
	const parsed = new Date(raw);
	return Number.isNaN(parsed.getTime()) ? raw : formatDateTime(parsed);
}

export function ForexWidget() {
	const [data, setData] = useState<RatesResponse | null>(null);
	const [failed, setFailed] = useState(false);

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
				if (!cancelled) setFailed(true);
			});
		return () => {
			cancelled = true;
		};
	}, []);

	return (
		<section id="rates" className="scroll-mt-24 bg-white">
			<Container className="py-20 md:py-28">
				<div className="grid min-w-0 gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
					<Reveal>
						<Eyebrow>Treasury</Eyebrow>
						<h2 className="mt-3 text-[36px] font-light leading-[1.05] tracking-display-xl text-ink md:text-[56px]">
							Forex exchange rates
						</h2>
						<p className="mt-5 max-w-md text-base font-normal leading-[1.5] text-ink-secondary">
							Today&apos;s buying and selling rates against the Tanzanian
							Shilling, refreshed daily from official sources.
						</p>
						{data ? (
							<p className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-hairline bg-canvas-soft px-4 py-1.5 text-[12px] font-normal text-ink-mute">
								<span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-brand-green" />
								{/* F48: BoT publishes an indicative mean rate, not the bank's
								    dealable prices — the badge says so explicitly */}
								{data.source === "bot"
									? "Indicative rates: Bank of Tanzania"
									: "Maendeleo Bank Treasury"}
								{data.updatedAt ? ` · ${formatUpdatedAt(data.updatedAt)}` : ""}
							</p>
						) : null}
					</Reveal>

					<Reveal delay={150}>
						<div className="overflow-hidden rounded-2xl border border-hairline bg-white shadow-lift-1">
							{!data && !failed ? (
								<div role="status" aria-label="Loading exchange rates">
									{[0, 1, 2, 3, 4, 5].map((row) => (
										<div
											key={row}
											className="flex animate-pulse items-center gap-4 border-b border-hairline px-6 py-5 last:border-b-0"
										>
											<div className="h-9 w-9 rounded-full bg-brand-subdued" />
											<div className="h-4 w-40 rounded bg-canvas-soft" />
											<div className="ml-auto h-4 w-20 rounded bg-canvas-soft" />
											<div className="h-4 w-20 rounded bg-canvas-soft" />
										</div>
									))}
								</div>
							) : null}

							{failed ? (
								<p className="px-6 py-10 text-center text-[15px] font-normal text-ink-mute">
									Rates are temporarily unavailable. Please call our toll-free
									line{" "}
									<a href="tel:0800750089" className="tnum text-brand">
										0800750089
									</a>{" "}
									for today&apos;s rates.
								</p>
							) : null}

							{data ? (
								<table className="w-full text-left">
									<thead>
										<tr className="border-b border-hairline">
											<th
												scope="col"
												className="px-4 py-4 text-micro uppercase tracking-[0.06em] text-ink-mute sm:px-6"
											>
												Currency
											</th>
											<th
												scope="col"
												className="px-4 py-4 text-right text-micro uppercase tracking-[0.06em] text-ink-mute sm:px-6"
											>
												Buying (TZS)
											</th>
											<th
												scope="col"
												className="px-4 py-4 text-right text-micro uppercase tracking-[0.06em] text-ink-mute sm:px-6"
											>
												Selling (TZS)
											</th>
										</tr>
									</thead>
									<tbody>
										{data.rates.map((rate) => (
											<tr
												key={`${rate.currency}-${rate.label}`}
												className="border-b border-hairline transition-colors last:border-b-0 hover:bg-canvas-soft"
											>
												<td className="px-4 py-4 sm:px-6">
													<div className="flex items-center gap-3">
												<FlagIcon code={rate.currency} />
												<span className="text-[15px] font-normal text-ink">
															{rate.label}
														</span>
													</div>
												</td>
												<td className="tnum px-4 py-4 text-right text-[16px] font-normal tracking-[-0.42px] text-ink sm:px-6">
													{formatRate(rate.buy)}
												</td>
												<td className="tnum px-4 py-4 text-right text-[16px] font-normal tracking-[-0.42px] text-ink sm:px-6">
													{formatRate(rate.sell)}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							) : null}
						</div>
						{/* F48: the standard treasury disclaimer + route to dealable rates */}
						<p className="mt-4 text-micro text-ink-mute">
							Rates are indicative and subject to change. For dealable rates,
							contact Treasury via our{" "}
							<a href="/contact" className="text-brand underline underline-offset-2">
								contact page
							</a>{" "}
							or call{" "}
							<a href="tel:0800750089" className="tnum text-brand">
								0800750089
							</a>
							.
						</p>
					</Reveal>
				</div>
			</Container>
		</section>
	);
}

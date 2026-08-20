"use client";

import { useEffect, useState } from "react";
import { Container, SectionHeading } from "@/components/site/primitives";

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

function FlagCircle({ code }: { code: string }) {
	return (
		<span
			aria-hidden
			className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-subdued text-[10px] font-normal tracking-[0.1px] text-brand-deep"
		>
			{code}
		</span>
	);
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
		<section className="bg-white">
			<Container className="py-16 md:py-24">
				<div className="flex flex-wrap items-end justify-between gap-6">
					<SectionHeading
						eyebrow="Treasury"
						title="Forex Exchange Rates"
						lede="Today's buying and selling rates against the Tanzanian Shilling."
					/>
					{data ? (
						<p className="text-[13px] font-normal leading-[1.4] tracking-[-0.39px] text-ink-mute">
							{data.source === "bot"
								? "Indicative rates — Bank of Tanzania"
								: "Indicative rates — Maendeleo Bank Treasury"}
							{data.updatedAt ? ` · ${data.updatedAt}` : ""}
						</p>
					) : null}
				</div>

				<div className="mt-10 overflow-hidden rounded-xl border border-hairline bg-white">
					{!data && !failed ? (
						<div role="status" aria-label="Loading exchange rates">
							{[0, 1, 2, 3, 4, 5].map((row) => (
								<div
									key={row}
									className="flex animate-pulse items-center gap-4 border-b border-hairline px-6 py-4 last:border-b-0"
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
						<p className="px-6 py-10 text-center text-[15px] font-light text-ink-mute">
							Rates are temporarily unavailable. Please call our toll-free
							line <a href="tel:0800750089" className="tnum text-brand">0800750089</a> for
							today&apos;s rates.
						</p>
					) : null}

					{data ? (
						<table className="w-full text-left">
							<thead>
								<tr className="border-b border-hairline bg-canvas-soft">
									<th
										scope="col"
										className="px-6 py-3 text-[10px] font-normal uppercase leading-[1.15] tracking-[0.1px] text-ink-mute"
									>
										Currency
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-right text-[10px] font-normal uppercase leading-[1.15] tracking-[0.1px] text-ink-mute"
									>
										Buying (TZS)
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-right text-[10px] font-normal uppercase leading-[1.15] tracking-[0.1px] text-ink-mute"
									>
										Selling (TZS)
									</th>
								</tr>
							</thead>
							<tbody>
								{data.rates.map((rate) => (
									<tr
										key={`${rate.currency}-${rate.label}`}
										className="border-b border-hairline last:border-b-0"
									>
										<td className="px-6 py-3.5">
											<div className="flex items-center gap-3">
												<FlagCircle code={rate.currency} />
												<span className="text-[15px] font-normal text-ink">
													{rate.label}
												</span>
											</div>
										</td>
										<td className="tnum px-6 py-3.5 text-right text-[14px] font-light tracking-[-0.42px] text-ink">
											{formatRate(rate.buy)}
										</td>
										<td className="tnum px-6 py-3.5 text-right text-[14px] font-light tracking-[-0.42px] text-ink">
											{formatRate(rate.sell)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : null}
				</div>
			</Container>
		</section>
	);
}

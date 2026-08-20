"use client";

import { useMemo, useState } from "react";
import {
	LATEST_SNAPSHOT,
	PRICE_SNAPSHOTS,
	formatTzs,
} from "@/lib/share-price";
import { formatDate } from "@/lib/format";

const inputClass =
	"h-11 w-full rounded-lg border border-hairline bg-white px-3 text-sm text-ink placeholder:text-ink-mute focus:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

/**
 * RFQ §4.6: investment trend calculator — enter an amount and a past
 * documented date, see what that investment would be worth at the latest
 * documented price. Indicative only: MBP prices are documented snapshots,
 * not a live feed, so every figure carries its as-of date.
 */
export function InvestmentCalculator() {
	const [amount, setAmount] = useState("");
	const [snapshotDate, setSnapshotDate] = useState(PRICE_SNAPSHOTS[0].date);

	const result = useMemo(() => {
		const invested = Number(amount.replace(/[^0-9.]/g, ""));
		const snapshot = PRICE_SNAPSHOTS.find((s) => s.date === snapshotDate);
		if (!snapshot || !Number.isFinite(invested) || invested <= 0) return null;

		const shares = invested / snapshot.price;
		const valueToday = shares * LATEST_SNAPSHOT.price;
		const gain = valueToday - invested;
		const gainPct = (gain / invested) * 100;
		return { invested, shares, valueToday, gain, gainPct, snapshot };
	}, [amount, snapshotDate]);

	return (
		<div className="rounded-xl border border-hairline bg-white p-6 md:p-10">
			<div className="grid gap-5 sm:grid-cols-2">
				<label className="flex flex-col gap-1.5">
					<span className="text-eyebrow uppercase text-ink-mute">
						Amount invested (TZS)
					</span>
					<input
						type="text"
						inputMode="numeric"
						value={amount}
						onChange={(event) => setAmount(event.target.value)}
						placeholder="e.g. 1,000,000"
						className={`${inputClass} tnum`}
					/>
				</label>
				<label className="flex flex-col gap-1.5">
					<span className="text-eyebrow uppercase text-ink-mute">
						On this date
					</span>
					<select
						value={snapshotDate}
						onChange={(event) => setSnapshotDate(event.target.value)}
						className={inputClass}
					>
						{PRICE_SNAPSHOTS.map((snapshot) => (
							<option key={snapshot.date} value={snapshot.date}>
								{formatDate(snapshot.date)} — {formatTzs(snapshot.price)} /share
							</option>
						))}
					</select>
				</label>
			</div>

			{result ? (
				<dl className="mt-8 grid gap-6 border-t border-hairline pt-8 sm:grid-cols-3">
					<div>
						<dt className="text-eyebrow uppercase text-ink-mute">
							Shares you would hold
						</dt>
						<dd className="tnum mt-1 text-[22px] font-light text-ink">
							{result.shares.toLocaleString("en-US", {
								maximumFractionDigits: 0,
							})}
						</dd>
					</div>
					<div>
						<dt className="text-eyebrow uppercase text-ink-mute">
							Value at {formatDate(LATEST_SNAPSHOT.date)}
						</dt>
						<dd className="tnum mt-1 text-[22px] font-light text-ink">
							{formatTzs(result.valueToday)}
						</dd>
					</div>
					<div>
						<dt className="text-eyebrow uppercase text-ink-mute">
							Change since then
						</dt>
						<dd
							className={`tnum mt-1 text-[22px] font-light ${
								result.gain >= 0 ? "text-brand-green-deep" : "text-ink"
							}`}
						>
							{result.gain >= 0 ? "+" : "−"}
							{formatTzs(Math.abs(result.gain))} ({result.gainPct.toFixed(0)}%)
						</dd>
					</div>
				</dl>
			) : (
				<p className="mt-8 border-t border-hairline pt-8 text-sm text-ink-mute">
					Enter an amount and pick a date to see how an MBP investment would
					have performed.
				</p>
			)}

			<p className="mt-6 text-micro leading-relaxed text-ink-mute">
				Indicative only, based on documented price snapshots (
				{PRICE_SNAPSHOTS.map((s) => s.source).join(", ")}). Later 2026 quotes
				ranged TZS 1,860–2,180 by source. Not investment advice — confirm live
				prices on dse.co.tz before making any decision.
			</p>
		</div>
	);
}

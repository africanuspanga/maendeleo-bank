"use client";

import { useMemo, useState } from "react";

const inputClass =
	"h-11 w-full rounded-lg border border-hairline bg-white px-3 text-sm text-ink placeholder:text-ink-mute focus:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

function formatTzs(value: number): string {
	return `TZS ${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

/**
 * RFQ §4.3: loan calculator on a reducing balance, matching how the bank
 * prices its loans ("affordable interest rate is charged on reducing
 * balance"). The bank does not publish numeric rates, so the rate is a
 * user input — the figure quoted by the loan officer goes here.
 */
export function LoanCalculator() {
	const [amount, setAmount] = useState("5,000,000");
	const [months, setMonths] = useState("24");
	const [rate, setRate] = useState("");

	const result = useMemo(() => {
		const principal = Number(amount.replace(/[^0-9.]/g, ""));
		const term = Number(months.replace(/[^0-9]/g, ""));
		const annualRate = Number(rate.replace(/[^0-9.]/g, ""));
		if (
			!Number.isFinite(principal) || principal <= 0 ||
			!Number.isFinite(term) || term <= 0 ||
			!Number.isFinite(annualRate) || annualRate <= 0
		) {
			return null;
		}

		// Reducing balance (equal instalments): M = P·i / (1 − (1+i)^−n)
		const i = annualRate / 100 / 12;
		const monthly = (principal * i) / (1 - Math.pow(1 + i, -term));
		const total = monthly * term;
		return { monthly, total, interest: total - principal };
	}, [amount, months, rate]);

	return (
		<div className="rounded-xl border border-hairline bg-white p-6 md:p-10">
			<div className="grid gap-5 sm:grid-cols-3">
				<label className="flex flex-col gap-1.5">
					<span className="text-eyebrow uppercase text-ink-mute">
						Loan amount (TZS)
					</span>
					<input
						type="text"
						inputMode="numeric"
						value={amount}
						onChange={(event) => setAmount(event.target.value)}
						placeholder="e.g. 5,000,000"
						className={`${inputClass} tnum`}
					/>
				</label>
				<label className="flex flex-col gap-1.5">
					<span className="text-eyebrow uppercase text-ink-mute">
						Period (months)
					</span>
					<input
						type="text"
						inputMode="numeric"
						value={months}
						onChange={(event) => setMonths(event.target.value)}
						placeholder="e.g. 24"
						className={`${inputClass} tnum`}
					/>
				</label>
				<label className="flex flex-col gap-1.5">
					<span className="text-eyebrow uppercase text-ink-mute">
						Interest rate (% per year)
					</span>
					<input
						type="text"
						inputMode="decimal"
						value={rate}
						onChange={(event) => setRate(event.target.value)}
						placeholder="Rate quoted by the bank"
						className={`${inputClass} tnum`}
					/>
				</label>
			</div>

			{result ? (
				<dl className="mt-8 grid gap-6 border-t border-hairline pt-8 sm:grid-cols-3">
					<div>
						<dt className="text-eyebrow uppercase text-ink-mute">
							Monthly repayment
						</dt>
						<dd className="tnum mt-1 text-[26px] font-light text-ink md:text-[32px]">
							{formatTzs(result.monthly)}
						</dd>
					</div>
					<div>
						<dt className="text-eyebrow uppercase text-ink-mute">
							Total interest
						</dt>
						<dd className="tnum mt-1 text-[22px] font-light text-ink">
							{formatTzs(result.interest)}
						</dd>
					</div>
					<div>
						<dt className="text-eyebrow uppercase text-ink-mute">
							Total payable
						</dt>
						<dd className="tnum mt-1 text-[22px] font-light text-ink">
							{formatTzs(result.total)}
						</dd>
					</div>
				</dl>
			) : (
				<p className="mt-8 border-t border-hairline pt-8 text-sm text-ink-mute">
					Enter the amount, period and the interest rate quoted by the bank
					to see your monthly repayment.
				</p>
			)}

			<p className="mt-6 text-micro leading-relaxed text-ink-mute">
				Indicative only, calculated on a reducing balance. Maendeleo Bank
				does not publish numeric rates online — your loan officer confirms
				the rate for your product, and the final repayment schedule may
				include insurance and fees. Call 0800750089 (toll free) for a quote.
			</p>
		</div>
	);
}

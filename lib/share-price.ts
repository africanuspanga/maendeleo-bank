/**
 * MBP share data (RFQ §4.6/§4.9) — documented snapshots only, never live
 * figures. Every number here traces to docs/maendeleo-bank-info/
 * 15-external-research.md (compiled Aug 2026 from DSE, audited reports and
 * market coverage). When the DSE API integration lands, this module is the
 * seam to replace; until then the UI labels every figure with its as-of date.
 */

export interface ShareSnapshot {
	/** ISO date */
	date: string;
	/** TZS per share */
	price: number;
	source: string;
}

export const SHARES_IN_ISSUE = 29_988_842; // 2025 audited report
export const PAT_2025_TZS = 4_754_000_000; // 2025 audited profit after tax

export const PRICE_SNAPSHOTS: ShareSnapshot[] = [
	{
		date: "2026-01-02",
		price: 755,
		source: "Shore Africa market report",
	},
	{
		date: "2026-01-30",
		price: 2110,
		source: "Shore Africa market report",
	},
];

export const LATEST_SNAPSHOT = PRICE_SNAPSHOTS[PRICE_SNAPSHOTS.length - 1];

/** Market capitalisation at the latest documented price (≈ TZS 63.3bn). */
export const MARKET_CAP_TZS = LATEST_SNAPSHOT.price * SHARES_IN_ISSUE;

/** Earnings per share, computed from the 2025 audited PAT (≈ TZS 158.5). */
export const EPS_2025_TZS = PAT_2025_TZS / SHARES_IN_ISSUE;

/** "TZS 2,110" */
export function formatTzs(value: number, decimals = 0): string {
	return `TZS ${value.toLocaleString("en-US", {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	})}`;
}

/** "TZS 63.3bn" — compact billions/millions for large money figures. */
export function formatTzsCompact(value: number): string {
	if (value >= 1e9) return `TZS ${(value / 1e9).toFixed(1)}bn`;
	if (value >= 1e6) return `TZS ${(value / 1e6).toFixed(1)}m`;
	return formatTzs(value);
}

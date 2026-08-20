/**
 * Forex rates for the public site.
 *
 * Resolution order (first success wins):
 *   1. "supabase" — the `forex_rates` table managed by the admin CMS
 *      (only attempted when NEXT_PUBLIC_SUPABASE_URL and
 *      SUPABASE_SERVICE_ROLE_KEY are both set).
 *   2. "bot" — Bank of Tanzania indicative rates, parsed from the
 *      server-rendered HTML table at bot.go.tz (verified 2026-08-19:
 *      the page returns plain HTML, no JS rendering needed).
 *   3. "fallback" — the bank's published treasury rates as captured
 *      from maendeleobank.co.tz on 2026-08-19.
 *
 * Any failure at any tier degrades gracefully to the next one; this
 * module never throws.
 */
import { createClient } from "@supabase/supabase-js";

export interface ForexRate {
	currency: string;
	label: string;
	buy: number;
	sell: number;
}

export type RatesSource = "supabase" | "bot" | "fallback";

export interface RatesResult {
	rates: ForexRate[];
	source: RatesSource;
	updatedAt: string;
}

/** Treasury rates published on maendeleobank.co.tz, captured 2026-08-19. */
export const FALLBACK_RATES: ForexRate[] = [
	{ currency: "USD", label: "USD CASH (50–100)", buy: 2560.0, sell: 2650.0 },
	{ currency: "USD", label: "USD CASH (1–20)", buy: 2530.0, sell: 2620.0 },
	{ currency: "EUR", label: "Euro", buy: 2800.0, sell: 2905.0 },
	{ currency: "GBP", label: "United Kingdom", buy: 3200.0, sell: 3320.0 },
	{ currency: "KES", label: "Kenya", buy: 18.5, sell: 19.2 },
	{ currency: "ZAR", label: "South Africa", buy: 124.0, sell: 128.9 },
];

const FALLBACK_UPDATED_AT = "2026-08-19";

interface ForexRateRow {
	id: number | string;
	currency: string;
	label: string;
	buy: number;
	sell: number;
	sort_order: number;
	updated_at: string;
}

async function ratesFromSupabase(): Promise<RatesResult | null> {
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
	if (!url || !serviceKey) return null;

	try {
		const supabase = createClient(url, serviceKey, {
			auth: { persistSession: false },
		});
		const { data, error } = await supabase
			.from("forex_rates")
			.select("id, currency, label, buy, sell, sort_order, updated_at")
			.order("sort_order", { ascending: true });

		if (error || !data || data.length === 0) return null;

		const rows = data as ForexRateRow[];
		const updatedAt = rows.reduce(
			(latest, row) => (row.updated_at > latest ? row.updated_at : latest),
			rows[0].updated_at,
		);

		return {
			rates: rows.map((row) => ({
				currency: row.currency,
				label: row.label,
				buy: Number(row.buy),
				sell: Number(row.sell),
			})),
			source: "supabase",
			updatedAt,
		};
	} catch {
		return null;
	}
}

/** Currencies the bank publishes, mapped to Bank of Tanzania table codes. */
const BOT_CURRENCIES: Array<{ code: string; label: string }> = [
	{ code: "USD", label: "US Dollar" },
	{ code: "EUR", label: "Euro" },
	{ code: "GBP", label: "Pound Sterling" },
	{ code: "KES", label: "Kenya Shilling" },
	{ code: "ZAR", label: "South African Rand" },
];

const BOT_URL = "https://www.bot.go.tz/ExchangeRate/excRates";
const BOT_TIMEOUT_MS = 4000;

/**
 * Best-effort parse of the BoT indicative-rates table. The page is
 * server-rendered (verified with curl on 2026-08-19): each row is
 * `<td>S/NO</td><td>CODE</td><td>Buying</td><td>Selling</td><td>Mean</td><td>Date</td>`.
 * If BoT ever switches to JS rendering this simply returns null and the
 * caller falls back — the route is never broken by the fetch.
 */
async function ratesFromBot(): Promise<RatesResult | null> {
	try {
		const response = await fetch(BOT_URL, {
			next: { revalidate: 21600 }, // 6 hours
			signal: AbortSignal.timeout(BOT_TIMEOUT_MS),
			headers: { "User-Agent": "MaendeleoBank-Website/1.0" },
		});
		if (!response.ok) return null;
		const html = await response.text();

		const rates: ForexRate[] = [];
		let transactionDate = "";
		for (const { code, label } of BOT_CURRENCIES) {
			const rowPattern = new RegExp(
				`<td[^>]*>\\s*${code}\\s*</td>\\s*` +
					`<td[^>]*>\\s*([\\d,]+(?:\\.\\d+)?)\\s*</td>\\s*` +
					`<td[^>]*>\\s*([\\d,]+(?:\\.\\d+)?)\\s*</td>\\s*` +
					`<td[^>]*>\\s*[\\d,]+(?:\\.\\d+)?\\s*</td>\\s*` +
					`<td[^>]*>\\s*([0-9]{2}-[A-Za-z]{3}-[0-9]{2,4})\\s*</td>`,
				"i",
			);
			const match = html.match(rowPattern);
			if (!match) continue;
			rates.push({
				currency: code,
				label,
				buy: Number(match[1].replace(/,/g, "")),
				sell: Number(match[2].replace(/,/g, "")),
			});
			transactionDate = match[3];
		}

		if (rates.length < 3) return null;
		return {
			rates,
			source: "bot",
			updatedAt: transactionDate || new Date().toISOString(),
		};
	} catch {
		return null;
	}
}

export async function getRates(): Promise<RatesResult> {
	const supabase = await ratesFromSupabase();
	if (supabase) return supabase;

	const bot = await ratesFromBot();
	if (bot) return bot;

	return {
		rates: FALLBACK_RATES,
		source: "fallback",
		updatedAt: FALLBACK_UPDATED_AT,
	};
}

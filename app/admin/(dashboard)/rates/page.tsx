import { DbError } from "@/components/admin/db-error";
import { PageHeader } from "@/components/admin/page-header";
import { RatesTable } from "@/components/admin/rates-table";
import { formatDateTime } from "@/components/admin/format";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export default async function RatesPage() {
	// DEMO MODE: without Supabase, render the page with empty data.
	const result = isSupabaseConfigured()
		? await (await createClient())
				.from("forex_rates")
				.select("*")
				.order("sort_order", { ascending: true })
				.order("created_at", { ascending: true })
		: null;
	const data = result?.data ?? null;
	const error = result?.error ?? null;

	if (error) {
		return (
			<>
				<PageHeader title="Forex Rates" />
				<DbError message={error.message} />
			</>
		);
	}

	const lastUpdated = data?.length
		? data.reduce((latest, row) =>
				row.updated_at > latest ? row.updated_at : latest
			, data[0].updated_at)
		: null;

	return (
		<>
			<PageHeader
				title="Forex Rates"
				description={`Treasury buy/sell rates shown in the public forex widget.${lastUpdated ? ` Last updated ${formatDateTime(lastUpdated)}.` : ""}`}
			/>
			<RatesTable rates={data ?? []} />
		</>
	);
}

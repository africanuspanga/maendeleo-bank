import { ContentForm, type ContentValues } from "@/components/admin/content-form";
import { DbError } from "@/components/admin/db-error";
import { PageHeader } from "@/components/admin/page-header";
import { SetupScreen } from "@/components/admin/setup-screen";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

function asString(value: unknown, fallback = ""): string {
	return typeof value === "string" ? value : fallback;
}

function asRecord(value: unknown): Record<string, string> {
	if (value && typeof value === "object" && !Array.isArray(value)) {
		const out: Record<string, string> = {};
		for (const [key, entry] of Object.entries(value)) {
			out[key] = typeof entry === "string" ? entry : String(entry ?? "");
		}
		return out;
	}
	return {};
}

export default async function ContentPage() {
	if (!isSupabaseConfigured()) {
		return <SetupScreen />;
	}

	const supabase = await createClient();
	const { data, error } = await supabase.from("site_content").select("*");

	if (error) {
		return (
			<>
				<PageHeader title="Site Content" />
				<DbError message={error.message} />
			</>
		);
	}

	const byKey = new Map((data ?? []).map((row) => [row.key, row.value]));
	const hours = asRecord(byKey.get("hours"));
	const contact = asRecord(byKey.get("contact"));

	const values: ContentValues = {
		hero_title: asString(byKey.get("hero_title")),
		hero_sub: asString(byKey.get("hero_sub")),
		announcement: asString(byKey.get("announcement")),
		hours_weekdays: hours.weekdays ?? "",
		hours_saturday: hours.saturday ?? "",
		hours_sunday: hours.sunday ?? "",
		contact_address: contact.address ?? "",
		contact_email: contact.email ?? "",
		contact_toll_free: contact.toll_free ?? "",
	};

	return (
		<>
			<PageHeader
				title="Site Content"
				description="Hero copy, announcement bar, opening hours and contact details shown across the public site."
			/>
			<ContentForm initial={values} />
		</>
	);
}

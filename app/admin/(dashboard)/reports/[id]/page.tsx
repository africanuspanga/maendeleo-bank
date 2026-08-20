import { notFound } from "next/navigation";

import { DbError } from "@/components/admin/db-error";
import { PageHeader } from "@/components/admin/page-header";
import { ReportForm } from "@/components/admin/report-form";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export default async function ReportEditorPage({
	params,
}: PageProps<"/admin/reports/[id]">) {
	const { id } = await params;

	if (id === "new") {
		return (
			<>
				<PageHeader
					title="Add report"
					description="Upload a PDF or link an external document."
				/>
				<ReportForm />
			</>
		);
	}

	// DEMO MODE: without Supabase there is no stored report to edit.
	if (!isSupabaseConfigured()) {
		notFound();
	}

	const supabase = await createClient();
	const { data, error } = await supabase
		.from("reports")
		.select("*")
		.eq("id", id)
		.maybeSingle();

	if (error) {
		return (
			<>
				<PageHeader title="Edit report" />
				<DbError message={error.message} />
			</>
		);
	}
	if (!data) {
		notFound();
	}

	return (
		<>
			<PageHeader title="Edit report" description={data.title} />
			<ReportForm initial={data} />
		</>
	);
}

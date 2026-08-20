import { notFound } from "next/navigation";

import { DbError } from "@/components/admin/db-error";
import { PageHeader } from "@/components/admin/page-header";
import { PostingForm } from "@/components/admin/posting-form";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export default async function TenderEditorPage({
	params,
}: PageProps<"/admin/tenders/[id]">) {
	const { id } = await params;

	if (id === "new") {
		return (
			<>
				<PageHeader
					title="New tender"
					description="Create a tender. Save as draft, publish when ready."
				/>
				<PostingForm kind="tender" />
			</>
		);
	}

	// DEMO MODE: without Supabase there is no stored tender to edit.
	if (!isSupabaseConfigured()) {
		notFound();
	}

	const supabase = await createClient();
	const { data, error } = await supabase
		.from("tenders")
		.select("*")
		.eq("id", id)
		.maybeSingle();

	if (error) {
		return (
			<>
				<PageHeader title="Edit tender" />
				<DbError message={error.message} />
			</>
		);
	}
	if (!data) {
		notFound();
	}

	return (
		<>
			<PageHeader title="Edit tender" description={data.title} />
			<PostingForm kind="tender" initial={data} />
		</>
	);
}

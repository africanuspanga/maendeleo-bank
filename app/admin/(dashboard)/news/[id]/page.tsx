import { DbError } from "@/components/admin/db-error";
import { NewsForm } from "@/components/admin/news-form";
import { PageHeader } from "@/components/admin/page-header";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function NewsEditorPage({
	params,
}: PageProps<"/admin/news/[id]">) {
	const { id } = await params;

	if (id === "new") {
		return (
			<>
				<PageHeader
					title="New post"
					description="Create a news post. Save as draft, publish when ready."
				/>
				<NewsForm />
			</>
		);
	}

	// DEMO MODE: without Supabase there is no stored post to edit.
	if (!isSupabaseConfigured()) {
		notFound();
	}

	const supabase = await createClient();
	const { data, error } = await supabase
		.from("news")
		.select("*")
		.eq("id", id)
		.maybeSingle();

	if (error) {
		return (
			<>
				<PageHeader title="Edit post" />
				<DbError message={error.message} />
			</>
		);
	}
	if (!data) {
		notFound();
	}

	return (
		<>
			<PageHeader title="Edit post" description={data.title} />
			<NewsForm initial={data} />
		</>
	);
}

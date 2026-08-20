import { DbError } from "@/components/admin/db-error";
import { NewsForm } from "@/components/admin/news-form";
import { PageHeader } from "@/components/admin/page-header";
import { SetupScreen } from "@/components/admin/setup-screen";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function NewsEditorPage({
	params,
}: PageProps<"/admin/news/[id]">) {
	if (!isSupabaseConfigured()) {
		return <SetupScreen />;
	}

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

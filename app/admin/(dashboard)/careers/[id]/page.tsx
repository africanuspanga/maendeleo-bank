import { notFound } from "next/navigation";

import { DbError } from "@/components/admin/db-error";
import { PageHeader } from "@/components/admin/page-header";
import { PostingForm } from "@/components/admin/posting-form";
import { SetupScreen } from "@/components/admin/setup-screen";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export default async function CareerEditorPage({
	params,
}: PageProps<"/admin/careers/[id]">) {
	if (!isSupabaseConfigured()) {
		return <SetupScreen />;
	}

	const { id } = await params;

	if (id === "new") {
		return (
			<>
				<PageHeader
					title="New vacancy"
					description="Create a vacancy. Save as draft, publish when ready."
				/>
				<PostingForm kind="career" />
			</>
		);
	}

	const supabase = await createClient();
	const { data, error } = await supabase
		.from("careers")
		.select("*")
		.eq("id", id)
		.maybeSingle();

	if (error) {
		return (
			<>
				<PageHeader title="Edit vacancy" />
				<DbError message={error.message} />
			</>
		);
	}
	if (!data) {
		notFound();
	}

	return (
		<>
			<PageHeader title="Edit vacancy" description={data.title} />
			<PostingForm kind="career" initial={data} />
		</>
	);
}

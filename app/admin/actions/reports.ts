"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import type { ContentStatus, ReportCategory } from "@/lib/supabase/types";
import { failure, type ActionResult } from "./types";

export type ReportInput = {
	id?: string;
	title: string;
	category: ReportCategory;
	year: number | null;
	file_url: string | null;
	published_at: string | null;
	status: ContentStatus;
};

async function requireUser() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	return { supabase, user };
}

export async function saveReport(input: ReportInput): Promise<ActionResult> {
	const { supabase, user } = await requireUser();
	if (!user) return { ok: false, error: "Not authenticated." };

	const row = {
		title: input.title.trim(),
		category: input.category,
		year: input.year,
		file_url: input.file_url?.trim() || null,
		published_at:
			input.status === "published"
				? (input.published_at ?? new Date().toISOString())
				: input.published_at,
		status: input.status,
	};

	const { error } = input.id
		? await supabase.from("reports").update(row).eq("id", input.id)
		: await supabase.from("reports").insert(row);
	if (error) return failure(error);

	revalidatePath("/admin/reports");
	return { ok: true };
}

export async function setReportStatus(
	id: string,
	status: ContentStatus
): Promise<ActionResult> {
	const { supabase, user } = await requireUser();
	if (!user) return { ok: false, error: "Not authenticated." };

	const { error } = await supabase
		.from("reports")
		.update({ status })
		.eq("id", id);
	if (error) return failure(error);

	revalidatePath("/admin/reports");
	return { ok: true };
}

export async function deleteReport(id: string): Promise<ActionResult> {
	const { supabase, user } = await requireUser();
	if (!user) return { ok: false, error: "Not authenticated." };

	const { error } = await supabase.from("reports").delete().eq("id", id);
	if (error) return failure(error);

	revalidatePath("/admin/reports");
	return { ok: true };
}

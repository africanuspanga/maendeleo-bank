"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import type { ContentStatus } from "@/lib/supabase/types";
import { failure, type ActionResult } from "./types";

export type TenderInput = {
	id?: string;
	title: string;
	reference: string | null;
	deadline: string | null;
	description: string | null;
	pdf_url: string | null;
	status: ContentStatus;
};

async function requireUser() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	return { supabase, user };
}

export async function saveTender(input: TenderInput): Promise<ActionResult> {
	const { supabase, user } = await requireUser();
	if (!user) return { ok: false, error: "Not authenticated." };

	const row = {
		title: input.title.trim(),
		reference: input.reference?.trim() || null,
		deadline: input.deadline || null,
		description: input.description?.trim() || null,
		pdf_url: input.pdf_url?.trim() || null,
		status: input.status,
	};

	const { error } = input.id
		? await supabase.from("tenders").update(row).eq("id", input.id)
		: await supabase.from("tenders").insert(row);
	if (error) return failure(error);

	revalidatePath("/admin/tenders");
	return { ok: true };
}

export async function setTenderStatus(
	id: string,
	status: ContentStatus
): Promise<ActionResult> {
	const { supabase, user } = await requireUser();
	if (!user) return { ok: false, error: "Not authenticated." };

	const { error } = await supabase
		.from("tenders")
		.update({ status })
		.eq("id", id);
	if (error) return failure(error);

	revalidatePath("/admin/tenders");
	return { ok: true };
}

export async function deleteTender(id: string): Promise<ActionResult> {
	const { supabase, user } = await requireUser();
	if (!user) return { ok: false, error: "Not authenticated." };

	const { error } = await supabase.from("tenders").delete().eq("id", id);
	if (error) return failure(error);

	revalidatePath("/admin/tenders");
	return { ok: true };
}

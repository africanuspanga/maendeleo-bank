"use server";

import { revalidatePath, revalidateTag } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import type { ContentStatus } from "@/lib/supabase/types";
import { failure, type ActionResult } from "./types";

export type CareerInput = {
	id?: string;
	title: string;
	location: string | null;
	type: string | null;
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

export async function saveCareer(input: CareerInput): Promise<ActionResult> {
	const { supabase, user } = await requireUser();
	if (!user) return { ok: false, error: "Not authenticated." };

	const row = {
		title: input.title.trim(),
		location: input.location?.trim() || null,
		type: input.type?.trim() || null,
		deadline: input.deadline || null,
		description: input.description?.trim() || null,
		pdf_url: input.pdf_url?.trim() || null,
		status: input.status,
	};

	const { error } = input.id
		? await supabase.from("careers").update(row).eq("id", input.id)
		: await supabase.from("careers").insert(row);
	if (error) return failure(error);

	revalidatePath("/admin/careers");
	revalidateTag("careers", "max"); // F02: invalidate the public site's cached reads
	return { ok: true };
}

export async function setCareerStatus(
	id: string,
	status: ContentStatus
): Promise<ActionResult> {
	const { supabase, user } = await requireUser();
	if (!user) return { ok: false, error: "Not authenticated." };

	const { error } = await supabase
		.from("careers")
		.update({ status })
		.eq("id", id);
	if (error) return failure(error);

	revalidatePath("/admin/careers");
	revalidateTag("careers", "max"); // F02: invalidate the public site's cached reads
	return { ok: true };
}

export async function deleteCareer(id: string): Promise<ActionResult> {
	const { supabase, user } = await requireUser();
	if (!user) return { ok: false, error: "Not authenticated." };

	const { error } = await supabase.from("careers").delete().eq("id", id);
	if (error) return failure(error);

	revalidatePath("/admin/careers");
	revalidateTag("careers", "max"); // F02: invalidate the public site's cached reads
	return { ok: true };
}

"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import type { ContentStatus } from "@/lib/supabase/types";
import { failure, type ActionResult } from "./types";

export type NewsInput = {
	id?: string;
	slug: string;
	title: string;
	title_sw: string | null;
	excerpt: string | null;
	body: string | null;
	image_url: string | null;
	published_at: string | null;
	status: ContentStatus;
};

function slugify(value: string): string {
	return value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

async function requireUser() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	return { supabase, user };
}

export async function saveNews(input: NewsInput): Promise<ActionResult> {
	const { supabase, user } = await requireUser();
	if (!user) return { ok: false, error: "Not authenticated." };

	const row = {
		slug: slugify(input.slug || input.title),
		title: input.title.trim(),
		title_sw: input.title_sw?.trim() || null,
		excerpt: input.excerpt?.trim() || null,
		body: input.body?.trim() || null,
		image_url: input.image_url?.trim() || null,
		published_at:
			input.status === "published"
				? (input.published_at ?? new Date().toISOString())
				: input.published_at,
		status: input.status,
	};

	const { error } = input.id
		? await supabase.from("news").update(row).eq("id", input.id)
		: await supabase.from("news").insert(row);
	if (error) return failure(error);

	revalidatePath("/admin/news");
	return { ok: true };
}

export async function setNewsStatus(
	id: string,
	status: ContentStatus
): Promise<ActionResult> {
	const { supabase, user } = await requireUser();
	if (!user) return { ok: false, error: "Not authenticated." };

	const patch =
		status === "published"
			? { status, published_at: new Date().toISOString() }
			: { status };
	const { error } = await supabase.from("news").update(patch).eq("id", id);
	if (error) return failure(error);

	revalidatePath("/admin/news");
	return { ok: true };
}

export async function deleteNews(id: string): Promise<ActionResult> {
	const { supabase, user } = await requireUser();
	if (!user) return { ok: false, error: "Not authenticated." };

	const { error } = await supabase.from("news").delete().eq("id", id);
	if (error) return failure(error);

	revalidatePath("/admin/news");
	return { ok: true };
}

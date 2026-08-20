"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import type { Json } from "@/lib/supabase/types";
import { failure, type ActionResult } from "./types";

export async function saveSiteContent(
	key: string,
	value: Json
): Promise<ActionResult> {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return { ok: false, error: "Not authenticated." };

	const { error } = await supabase
		.from("site_content")
		.upsert({ key, value }, { onConflict: "key" });
	if (error) return failure(error);

	revalidatePath("/admin/content");
	return { ok: true };
}

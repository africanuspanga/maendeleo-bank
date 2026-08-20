"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { failure, type ActionResult } from "./types";

export async function updateRate(
	id: string,
	buy: number,
	sell: number
): Promise<ActionResult> {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return { ok: false, error: "Not authenticated." };

	const { error } = await supabase
		.from("forex_rates")
		.update({ buy, sell })
		.eq("id", id);
	if (error) return failure(error);

	revalidatePath("/admin/rates");
	return { ok: true };
}

export async function addRate(input: {
	currency: string;
	label: string;
	buy: number;
	sell: number;
	sort_order: number;
}): Promise<ActionResult> {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return { ok: false, error: "Not authenticated." };

	const { error } = await supabase.from("forex_rates").insert({
		currency: input.currency.trim().toUpperCase(),
		label: input.label.trim(),
		buy: input.buy,
		sell: input.sell,
		sort_order: input.sort_order,
	});
	if (error) return failure(error);

	revalidatePath("/admin/rates");
	return { ok: true };
}

export async function deleteRate(id: string): Promise<ActionResult> {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return { ok: false, error: "Not authenticated." };

	const { error } = await supabase.from("forex_rates").delete().eq("id", id);
	if (error) return failure(error);

	revalidatePath("/admin/rates");
	return { ok: true };
}

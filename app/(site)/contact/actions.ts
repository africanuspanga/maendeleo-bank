"use server";

import { createClient } from "@supabase/supabase-js";

export interface EnquiryState {
	status: "idle" | "success" | "error";
	message: string;
}

/**
 * F49: server-side delivery for the contact form — writes to the
 * `enquiries` table (migration 0002) instead of composing a mailto:.
 * Spam control: a honeypot field ("company") that humans never fill in.
 * Degrades honestly when Supabase is not configured.
 */
export async function submitEnquiry(
	_prev: EnquiryState,
	formData: FormData,
): Promise<EnquiryState> {
	// Honeypot: real users never see or fill this field.
	if (String(formData.get("company") ?? "").trim() !== "") {
		return { status: "success", message: "Thank you, your message has been received." };
	}

	const name = String(formData.get("name") ?? "").trim();
	const email = String(formData.get("email") ?? "").trim();
	const topic = String(formData.get("topic") ?? "").trim();
	const message = String(formData.get("message") ?? "").trim();

	if (!name || !email || !message) {
		return { status: "error", message: "Please fill in your name, email and message." };
	}

	const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
	if (!url || !serviceKey) {
		return {
			status: "error",
			message:
				"Online delivery is not configured yet. Please email info@maendeleobank.co.tz or call 0800750089 (toll free).",
		};
	}

	try {
		const supabase = createClient(url, serviceKey, {
			auth: { persistSession: false },
		});
		const { error } = await supabase
			.from("enquiries")
			.insert({ name, email, topic: topic || null, message });
		if (error) throw error;
		return {
			status: "success",
			message:
				"Thank you — your message has been received. Our team will respond within two working days.",
		};
	} catch {
		return {
			status: "error",
			message:
				"Something went wrong on our side. Please email info@maendeleobank.co.tz or call 0800750089 (toll free).",
		};
	}
}

export type ActionResult = { ok: true } | { ok: false; error: string };

export function failure(error: unknown): ActionResult {
	if (error && typeof error === "object" && "message" in error) {
		return { ok: false, error: String((error as { message: unknown }).message) };
	}
	return { ok: false, error: "Something went wrong. Please try again." };
}

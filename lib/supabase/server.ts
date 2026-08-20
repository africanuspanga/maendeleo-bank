import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { supabaseAnonKey, supabaseUrl } from "./config";
import type { Database } from "./types";

/**
 * Server-side Supabase client bound to the request cookie store.
 * Create a new client per render — never share one across requests.
 * Only call this after checking `isSupabaseConfigured()`.
 */
export async function createClient() {
	const cookieStore = await cookies();

	return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
		cookies: {
			getAll() {
				return cookieStore.getAll();
			},
			setAll(cookiesToSet) {
				try {
					cookiesToSet.forEach(({ name, value, options }) =>
						cookieStore.set(name, value, options)
					);
				} catch {
					// Called from a Server Component where cookies cannot be
					// written. Safe to ignore because `proxy.ts` refreshes the
					// session on every /admin request.
				}
			},
		},
	});
}

/**
 * Returns the authenticated user for the current request, or null.
 * Uses `getUser()` (validated against the Supabase Auth server), not
 * the raw session cookie.
 */
export async function getUser() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	return user;
}

import { createBrowserClient } from "@supabase/ssr";

import { supabaseAnonKey, supabaseUrl } from "./config";
import type { Database } from "./types";

/**
 * Browser-side Supabase client (uses cookies via @supabase/ssr so the
 * session is shared with the server). Only call this after checking
 * `isSupabaseConfigured()`.
 */
export function createClient() {
	return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}

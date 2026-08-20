/**
 * Central configuration check for the Supabase integration.
 *
 * The admin/CMS must degrade gracefully when the project has not been
 * connected to a Supabase project yet (env values left blank in
 * `.env.local`): every admin screen renders a setup guide instead of
 * crashing, and the public site is never affected.
 */
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export function isSupabaseConfigured(): boolean {
	return supabaseUrl.trim() !== "" && supabaseAnonKey.trim() !== "";
}

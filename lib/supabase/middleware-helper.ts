import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "./config";

/**
 * Proxy (Next.js 16 middleware) helper for the /admin area.
 *
 * - When Supabase is not configured yet, every request passes through
 *   untouched so the admin can render its setup screen.
 * - Otherwise the session is refreshed on each request and unauthenticated
 *   visitors are redirected to /admin/login (and back to /admin once they
 *   are signed in).
 */
export async function updateSession(request: NextRequest) {
	if (!isSupabaseConfigured()) {
		return NextResponse.next({ request });
	}

	let response = NextResponse.next({ request });

	const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
		cookies: {
			getAll() {
				return request.cookies.getAll();
			},
			setAll(cookiesToSet) {
				cookiesToSet.forEach(({ name, value }) =>
					request.cookies.set(name, value)
				);
				response = NextResponse.next({ request });
				cookiesToSet.forEach(({ name, value, options }) =>
					response.cookies.set(name, value, options)
				);
			},
		},
	});

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const isLoginPage = request.nextUrl.pathname === "/admin/login";

	if (!user && !isLoginPage) {
		const url = request.nextUrl.clone();
		url.pathname = "/admin/login";
		url.search = "";
		return NextResponse.redirect(url);
	}

	if (user && isLoginPage) {
		const url = request.nextUrl.clone();
		url.pathname = "/admin";
		url.search = "";
		return NextResponse.redirect(url);
	}

	return response;
}

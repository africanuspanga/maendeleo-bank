import { NextResponse, type NextRequest } from "next/server";

/**
 * Next.js 16 renamed the `middleware` file convention to `proxy`
 * (functionality is the same; the runtime is Node.js).
 *
 * DEMO MODE: the Supabase auth check is disabled so the /admin dashboard
 * opens directly for tender reviewers. To re-enable auth, delegate to
 * `updateSession` from "@/lib/supabase/middleware-helper" again.
 */
export async function proxy(request: NextRequest) {
	return NextResponse.next({ request });
}

export const config = {
	matcher: ["/admin/:path*"],
};

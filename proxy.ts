import type { NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/middleware-helper";

/**
 * Next.js 16 renamed the `middleware` file convention to `proxy`
 * (functionality is the same; the runtime is Node.js). It protects the
 * /admin area with a Supabase auth session check.
 */
export async function proxy(request: NextRequest) {
	return updateSession(request);
}

export const config = {
	matcher: ["/admin/:path*"],
};

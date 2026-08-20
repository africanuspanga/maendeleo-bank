import { AdminShell } from "@/components/admin/admin-shell";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getUser } from "@/lib/supabase/server";

export default async function AdminDashboardLayout({
	children,
}: LayoutProps<"/admin">) {
	// Before Supabase is connected, pages render their setup screen without
	// the shell chrome. The proxy redirects unauthenticated visitors away,
	// so a missing user here simply renders bare while the redirect lands.
	if (!isSupabaseConfigured()) {
		return children;
	}

	const user = await getUser();
	if (!user) {
		return children;
	}

	return <AdminShell email={user.email ?? "admin"}>{children}</AdminShell>;
}

import { AdminShell } from "@/components/admin/admin-shell";

export default async function AdminDashboardLayout({
	children,
}: LayoutProps<"/admin">) {
	// DEMO MODE: no Supabase auth — the dashboard always renders inside the
	// admin shell with a demo identity.
	return <AdminShell email="demo@maendeleobank.co.tz">{children}</AdminShell>;
}

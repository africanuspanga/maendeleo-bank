import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export function AdminShell({
	email,
	children,
}: {
	email: string;
	children: React.ReactNode;
}) {
	return (
		<SidebarProvider>
			<AdminSidebar />
			<SidebarInset>
				<AdminHeader email={email} />
				<div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 p-4 md:p-8">
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}

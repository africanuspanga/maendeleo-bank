"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { CustomSidebarTrigger } from "@/components/custom-sidebar-trigger";
import { AdminNavUser } from "@/components/admin/admin-nav-user";

const sectionTitles: Record<string, string> = {
	"/admin": "Dashboard",
	"/admin/content": "Site Content",
	"/admin/news": "News",
	"/admin/media": "Media",
	"/admin/rates": "Forex Rates",
	"/admin/reports": "Reports",
	"/admin/careers": "Careers",
	"/admin/tenders": "Tenders",
	"/admin/settings": "Settings",
};

function currentSection(pathname: string): string {
	const match = Object.keys(sectionTitles)
		.sort((a, b) => b.length - a.length)
		.find((path) =>
			path === "/admin" ? pathname === "/admin" : pathname.startsWith(path)
		);
	return match ? sectionTitles[match] : "Admin";
}

export function AdminHeader({ email }: { email: string }) {
	const pathname = usePathname();

	return (
		<header className="sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between gap-2 border-b bg-background/95 px-4 backdrop-blur-sm supports-backdrop-filter:bg-background/50 md:px-6">
			<div className="flex items-center gap-3">
				<CustomSidebarTrigger />
				<Separator
					className="mr-2 h-4 data-[orientation=vertical]:self-center"
					orientation="vertical"
				/>
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink render={<Link href="/admin" />}>
								Admin
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>{currentSection(pathname)}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			<div className="flex items-center gap-3">
				<AdminNavUser email={email} />
			</div>
		</header>
	);
}

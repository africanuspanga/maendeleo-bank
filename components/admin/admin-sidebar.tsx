"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	BriefcaseIcon,
	FileTextIcon,
	FilesIcon,
	ImagesIcon,
	LayoutGridIcon,
	NewspaperIcon,
	PercentIcon,
	SettingsIcon,
} from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

type NavItem = {
	title: string;
	path: string;
	icon: React.ReactNode;
};

const navGroups: { label: string; items: NavItem[] }[] = [
	{
		label: "Overview",
		items: [
			{ title: "Dashboard", path: "/admin", icon: <LayoutGridIcon /> },
		],
	},
	{
		label: "Content",
		items: [
			{ title: "Site Content", path: "/admin/content", icon: <FileTextIcon /> },
			{ title: "News", path: "/admin/news", icon: <NewspaperIcon /> },
			{ title: "Media", path: "/admin/media", icon: <ImagesIcon /> },
		],
	},
	{
		label: "Treasury",
		items: [
			{ title: "Forex Rates", path: "/admin/rates", icon: <PercentIcon /> },
		],
	},
	{
		label: "Investors",
		items: [{ title: "Reports", path: "/admin/reports", icon: <FilesIcon /> }],
	},
	{
		label: "People",
		items: [
			{ title: "Careers", path: "/admin/careers", icon: <BriefcaseIcon /> },
			{ title: "Tenders", path: "/admin/tenders", icon: <FileTextIcon /> },
		],
	},
];

function isItemActive(pathname: string, path: string): boolean {
	if (path === "/admin") return pathname === "/admin";
	return pathname === path || pathname.startsWith(`${path}/`);
}

export function AdminSidebar() {
	const pathname = usePathname();

	return (
		<Sidebar collapsible="icon" variant="sidebar">
			<SidebarHeader className="h-14 justify-center border-b border-sidebar-border px-2">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							size="lg"
							render={<Link href="/admin" />}
							tooltip="Maendeleo Bank Admin"
						>
							<Image
								src="/Maendeleo-bank-logo.png"
								alt="Maendeleo Bank PLC"
								width={120}
								height={28}
								className="h-6 w-auto brightness-0 invert"
							/>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				{navGroups.map((group) => (
					<SidebarGroup key={group.label}>
						<SidebarGroupLabel>{group.label}</SidebarGroupLabel>
						<SidebarMenu>
							{group.items.map((item) => (
								<SidebarMenuItem key={item.path}>
									<SidebarMenuButton
										isActive={isItemActive(pathname, item.path)}
										render={<Link href={item.path} />}
										tooltip={item.title}
									>
										{item.icon}
										<span>{item.title}</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarFooter className="gap-0 p-0">
				<SidebarMenu className="border-t border-sidebar-border p-2">
					<SidebarMenuItem>
						<SidebarMenuButton
							size="sm"
							isActive={isItemActive(pathname, "/admin/settings")}
							render={<Link href="/admin/settings" />}
							tooltip="Settings"
						>
							<SettingsIcon />
							<span>Settings</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
				<div className="px-4 pt-3 pb-2 transition-opacity group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:opacity-0">
					<p className="text-nowrap text-[9px] text-sidebar-foreground/50">
						© {new Date().getFullYear()} Maendeleo Bank PLC
					</p>
				</div>
			</SidebarFooter>
		</Sidebar>
	);
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import Link from "next/link";

import {
	Avatar,
	AvatarFallback,
} from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";

export function AdminNavUser({ email }: { email: string }) {
	const router = useRouter();
	const [signingOut, setSigningOut] = useState(false);
	const initial = (email.charAt(0) || "A").toUpperCase();

	async function handleSignOut() {
		setSigningOut(true);
		const supabase = createClient();
		await supabase.auth.signOut();
		router.push("/admin/login");
		router.refresh();
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={<Avatar className="size-8 cursor-pointer" />}
			>
				<AvatarFallback className="bg-[#f3e9f5] text-[#6f2f78]">
					{initial}
				</AvatarFallback>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-60">
				<DropdownMenuItem className="flex items-center justify-start gap-2">
					<DropdownMenuLabel className="flex items-center gap-3">
						<Avatar className="size-10">
							<AvatarFallback className="bg-[#f3e9f5] text-[#6f2f78]">
								{initial}
							</AvatarFallback>
						</Avatar>
						<div>
							<span className="font-medium text-foreground">Administrator</span>{" "}
							<br />
							<div className="max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-muted-foreground text-xs">
								{email}
							</div>
						</div>
					</DropdownMenuLabel>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem render={<Link href="/admin/settings" />}>
						<UserIcon />
						Account
					</DropdownMenuItem>
					<DropdownMenuItem render={<Link href="/admin/settings" />}>
						<SettingsIcon />
						Settings
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem
						className="w-full cursor-pointer"
						variant="destructive"
						disabled={signingOut}
						onClick={handleSignOut}
					>
						<LogOutIcon />
						{signingOut ? "Signing out…" : "Log out"}
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

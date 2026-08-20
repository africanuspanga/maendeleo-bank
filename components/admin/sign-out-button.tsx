"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
	const router = useRouter();
	const [pending, setPending] = useState(false);

	async function handleSignOut() {
		setPending(true);
		const supabase = createClient();
		await supabase.auth.signOut();
		router.push("/admin/login");
		router.refresh();
	}

	return (
		<Button
			variant="outline"
			className="h-9 rounded-full"
			disabled={pending}
			onClick={() => void handleSignOut()}
		>
			<LogOutIcon />
			{pending ? "Signing out…" : "Sign out"}
		</Button>
	);
}

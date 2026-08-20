"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FormMessage } from "@/components/admin/form";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [pending, startTransition] = useTransition();

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError(null);
		startTransition(async () => {
			const supabase = createClient();
			const { error: signInError } =
				await supabase.auth.signInWithPassword({ email, password });
			if (signInError) {
				setError(signInError.message);
				return;
			}
			router.push("/admin");
			router.refresh();
		});
	}

	return (
		<Card className="w-full max-w-sm rounded-xl border-[#e9e2ec] shadow-[0_1px_3px_rgba(42,18,48,0.08)]">
			<CardHeader className="gap-3">
				<Image
					src="/Maendeleo-bank-logo.png"
					alt="Maendeleo Bank PLC"
					width={160}
					height={40}
					className="h-9 w-auto"
				/>
				<CardTitle className="text-xl font-light tracking-tight text-[#241128]">
					Admin sign in
				</CardTitle>
				<CardDescription className="text-[#71637a]">
					Content management for maendeleobank.co.tz
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<Field label="Email" htmlFor="email">
						<Input
							id="email"
							type="email"
							required
							autoComplete="email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							className="h-10 rounded-md border-[#c9b8d0]"
							placeholder="you@maendeleobank.co.tz"
						/>
					</Field>
					<Field label="Password" htmlFor="password">
						<Input
							id="password"
							type="password"
							required
							autoComplete="current-password"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							className="h-10 rounded-md border-[#c9b8d0]"
						/>
					</Field>
					<FormMessage
						state={error ? { kind: "error", text: error } : null}
					/>
					<Button
						type="submit"
						disabled={pending}
						className="h-10 w-full rounded-full bg-[#843b8d] text-white hover:bg-[#6f2f78]"
					>
						{pending ? "Signing in…" : "Sign in"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}

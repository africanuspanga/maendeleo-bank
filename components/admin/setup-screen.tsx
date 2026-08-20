import Image from "next/image";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const steps = [
	{
		title: "Create a Supabase project",
		body: "Sign in at supabase.com and create a new project (the free tier is enough).",
	},
	{
		title: "Run the database SQL",
		body: "In the project SQL Editor, run supabase/migrations/0001_init.sql, then supabase/seed.sql from this repository.",
	},
	{
		title: "Add the environment values",
		body: "Copy the Project URL, anon key and service-role key (Project Settings → API) into .env.local: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY.",
	},
	{
		title: "Restart and sign in",
		body: "Restart the dev server, create an admin user under Authentication → Users, then sign in at /admin/login.",
	},
];

/**
 * Shown by every admin screen until the Supabase environment variables are
 * configured. The public site never renders this.
 */
export function SetupScreen() {
	return (
		<div className="flex min-h-svh items-center justify-center bg-[#faf7fb] p-6">
			<Card className="w-full max-w-lg rounded-xl border-[#e9e2ec] shadow-[0_1px_3px_rgba(42,18,48,0.08)]">
				<CardHeader className="gap-3">
					<Image
						src="/Maendeleo-bank-logo.png"
						alt="Maendeleo Bank PLC"
						width={160}
						height={40}
						className="h-9 w-auto"
					/>
					<CardTitle className="text-xl font-light tracking-tight text-[#241128]">
						Connect Supabase
					</CardTitle>
					<CardDescription className="text-[#71637a]">
						The admin system stores content, forex rates, reports and media in
						Supabase. Four steps to go live:
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ol className="flex flex-col gap-4">
						{steps.map((step, index) => (
							<li key={step.title} className="flex gap-3">
								<span className="tnum flex size-6 shrink-0 items-center justify-center rounded-full bg-[#f3e9f5] text-xs font-medium text-[#6f2f78]">
									{index + 1}
								</span>
								<div className="flex flex-col gap-0.5">
									<p className="text-sm font-medium text-[#241128]">
										{step.title}
									</p>
									<p className="text-sm text-[#71637a]">{step.body}</p>
								</div>
							</li>
						))}
					</ol>
				</CardContent>
			</Card>
		</div>
	);
}

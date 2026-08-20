import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/admin/page-header";
import { SignOutButton } from "@/components/admin/sign-out-button";
import { formatDate } from "@/components/admin/format";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
	// DEMO MODE: no auth — show the demo identity when Supabase is absent.
	let email = "demo@maendeleobank.co.tz";
	let lastSignIn: string | null = null;
	if (isSupabaseConfigured()) {
		const supabase = await createClient();
		const {
			data: { user },
		} = await supabase.auth.getUser();
		email = user?.email ?? email;
		lastSignIn = user?.last_sign_in_at ?? null;
	}

	return (
		<>
			<PageHeader
				title="Settings"
				description="Your administrator account and workspace."
			/>
			<div className="grid gap-4 lg:grid-cols-2">
				<Card className="rounded-xl border-[#e9e2ec]">
					<CardContent className="p-6">
						<h2 className="text-base font-light text-[#241128]">
							Signed-in account
						</h2>
						<dl className="mt-4 flex flex-col gap-3 text-sm">
							<div className="flex justify-between gap-4">
								<dt className="text-[#71637a]">Email</dt>
								<dd className="text-[#241128]">{email}</dd>
							</div>
							<div className="flex justify-between gap-4">
								<dt className="text-[#71637a]">Last sign in</dt>
								<dd className="tnum text-[#241128]">
									{formatDate(lastSignIn)}
								</dd>
							</div>
						</dl>
						<div className="mt-6 border-t border-[#e9e2ec] pt-6">
							<SignOutButton />
						</div>
					</CardContent>
				</Card>
				<Card className="rounded-xl border-[#e9e2ec]">
					<CardContent className="p-6">
						<h2 className="text-base font-light text-[#241128]">
							Managing administrators
						</h2>
						<p className="mt-3 text-sm leading-relaxed text-[#71637a]">
							Admin access is managed in Supabase, add or remove users under
							Authentication, then Users, in your Supabase project. Anyone with
							an account there can sign in to this admin area, so keep the user
							list limited to the website team.
						</p>
					</CardContent>
				</Card>
			</div>
		</>
	);
}

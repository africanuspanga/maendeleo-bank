import { Card, CardContent } from "@/components/ui/card";

/**
 * Shown when a query fails — most commonly because the migration SQL has
 * not been run in the Supabase project yet.
 */
export function DbError({ message }: { message: string }) {
	return (
		<Card className="rounded-xl border-[#c0392b]/30">
			<CardContent className="flex flex-col gap-1 p-6">
				<p className="text-sm font-medium text-[#c0392b]">
					The database is not ready yet
				</p>
				<p className="text-sm text-[#71637a]">
					Run supabase/migrations/0001_init.sql and supabase/seed.sql in your
					project&apos;s SQL Editor, then reload this page.
				</p>
				<p className="tnum mt-2 text-xs text-[#71637a]/70">{message}</p>
			</CardContent>
		</Card>
	);
}

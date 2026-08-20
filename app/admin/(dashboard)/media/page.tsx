import { Card, CardContent } from "@/components/ui/card";
import { MediaBrowser } from "@/components/admin/media-browser";
import { PageHeader } from "@/components/admin/page-header";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function MediaPage() {
	return (
		<>
			<PageHeader
				title="Media"
				description="Images and documents stored in the media bucket. Copy a file's URL to use it in news posts, careers, tenders and reports."
			/>
			{/* DEMO MODE: without Supabase there is no storage bucket to browse. */}
			{isSupabaseConfigured() ? (
				<MediaBrowser />
			) : (
				<Card className="rounded-xl border-[#e9e2ec]">
					<CardContent className="py-10 text-center text-sm text-[#71637a]">
						No media yet — storage is not connected in this demo.
					</CardContent>
				</Card>
			)}
		</>
	);
}

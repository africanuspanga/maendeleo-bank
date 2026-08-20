import { MediaBrowser } from "@/components/admin/media-browser";
import { PageHeader } from "@/components/admin/page-header";
import { SetupScreen } from "@/components/admin/setup-screen";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function MediaPage() {
	if (!isSupabaseConfigured()) {
		return <SetupScreen />;
	}

	return (
		<>
			<PageHeader
				title="Media"
				description="Images and documents stored in the media bucket. Copy a file's URL to use it in news posts, careers, tenders and reports."
			/>
			<MediaBrowser />
		</>
	);
}

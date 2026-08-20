import Link from "next/link";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { DbError } from "@/components/admin/db-error";
import { PageHeader, StatusBadge } from "@/components/admin/page-header";
import { RowActions } from "@/components/admin/row-actions";
import { SetupScreen } from "@/components/admin/setup-screen";
import { formatDate } from "@/components/admin/format";
import { deleteNews, setNewsStatus } from "@/app/admin/actions/news";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export default async function NewsPage() {
	if (!isSupabaseConfigured()) {
		return <SetupScreen />;
	}

	const supabase = await createClient();
	const { data, error } = await supabase
		.from("news")
		.select("*")
		.order("published_at", { ascending: false, nullsFirst: false })
		.order("updated_at", { ascending: false });

	if (error) {
		return (
			<>
				<PageHeader title="News" />
				<DbError message={error.message} />
			</>
		);
	}

	return (
		<>
			<PageHeader
				title="News"
				description="News and events posts for the public site, in English and Swahili."
				actions={
					<Button
						className="h-9 rounded-full bg-[#843b8d] text-white hover:bg-[#6f2f78]"
						render={<Link href="/admin/news/new" />}
					>
						<PlusIcon />
						New post
					</Button>
				}
			/>
			<Card className="rounded-xl border-[#e9e2ec]">
				<CardContent className="p-0">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Title</TableHead>
								<TableHead>Published</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{(data ?? []).length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={4}
										className="py-10 text-center text-sm text-[#71637a]"
									>
										No posts yet — create the first one.
									</TableCell>
								</TableRow>
							) : (
								(data ?? []).map((item) => (
									<TableRow key={item.id}>
										<TableCell>
											<div className="flex flex-col">
												<span className="text-[#241128]">{item.title}</span>
												{item.title_sw ? (
													<span className="text-xs text-[#71637a]">
														{item.title_sw}
													</span>
												) : null}
											</div>
										</TableCell>
										<TableCell className="tnum text-xs text-[#71637a]">
											{formatDate(item.published_at)}
										</TableCell>
										<TableCell>
											<StatusBadge status={item.status} />
										</TableCell>
										<TableCell>
											<RowActions
												id={item.id}
												status={item.status}
												editHref={`/admin/news/${item.id}`}
												onSetStatus={setNewsStatus}
												onDelete={deleteNews}
												confirmText={`Delete "${item.title}"? This cannot be undone.`}
											/>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</>
	);
}

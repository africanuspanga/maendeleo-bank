import Link from "next/link";
import { ExternalLinkIcon, PlusIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
import { deleteReport, setReportStatus } from "@/app/admin/actions/reports";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import type { ReportCategory } from "@/lib/supabase/types";

const categoryLabels: Record<ReportCategory, string> = {
	"annual-report": "Annual report",
	"agm-book": "AGM book",
	"financial-statement": "Financial statement",
	disclosure: "Disclosure",
};

export default async function ReportsPage() {
	if (!isSupabaseConfigured()) {
		return <SetupScreen />;
	}

	const supabase = await createClient();
	const { data, error } = await supabase
		.from("reports")
		.select("*")
		.order("year", { ascending: false, nullsFirst: false })
		.order("title", { ascending: true });

	if (error) {
		return (
			<>
				<PageHeader title="Reports" />
				<DbError message={error.message} />
			</>
		);
	}

	return (
		<>
			<PageHeader
				title="Reports"
				description="Annual reports, AGM books, financial statements and disclosures for investor relations."
				actions={
					<Button
						className="h-9 rounded-full bg-[#843b8d] text-white hover:bg-[#6f2f78]"
						render={<Link href="/admin/reports/new" />}
					>
						<PlusIcon />
						Add report
					</Button>
				}
			/>
			<Card className="rounded-xl border-[#e9e2ec]">
				<CardContent className="p-0">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Title</TableHead>
								<TableHead>Category</TableHead>
								<TableHead>Year</TableHead>
								<TableHead>File</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{(data ?? []).length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={6}
										className="py-10 text-center text-sm text-[#71637a]"
									>
										No reports yet — add the first document.
									</TableCell>
								</TableRow>
							) : (
								(data ?? []).map((item) => (
									<TableRow key={item.id}>
										<TableCell className="max-w-72">
											<span className="line-clamp-2 text-[#241128]">
												{item.title}
											</span>
										</TableCell>
										<TableCell>
											<Badge
												variant="outline"
												className="rounded-full border-0 bg-[#f3e9f5] px-2.5 text-[11px] font-normal text-[#6f2f78]"
											>
												{categoryLabels[item.category]}
											</Badge>
										</TableCell>
										<TableCell className="tnum text-xs text-[#71637a]">
											{item.year ?? "—"}
										</TableCell>
										<TableCell>
											{item.file_url ? (
												<a
													href={item.file_url}
													target="_blank"
													rel="noreferrer"
													className="inline-flex items-center gap-1 text-xs text-[#843b8d] hover:underline"
												>
													<ExternalLinkIcon className="size-3" />
													View PDF
												</a>
											) : (
												<span className="text-xs text-[#71637a]">—</span>
											)}
										</TableCell>
										<TableCell>
											<StatusBadge status={item.status} />
										</TableCell>
										<TableCell>
											<RowActions
												id={item.id}
												status={item.status}
												editHref={`/admin/reports/${item.id}`}
												onSetStatus={setReportStatus}
												onDelete={deleteReport}
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

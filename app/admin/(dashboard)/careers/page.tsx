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
import { deleteCareer, setCareerStatus } from "@/app/admin/actions/careers";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export default async function CareersPage() {
	if (!isSupabaseConfigured()) {
		return <SetupScreen />;
	}

	const supabase = await createClient();
	const { data, error } = await supabase
		.from("careers")
		.select("*")
		.order("deadline", { ascending: false, nullsFirst: false })
		.order("updated_at", { ascending: false });

	if (error) {
		return (
			<>
				<PageHeader title="Careers" />
				<DbError message={error.message} />
			</>
		);
	}

	return (
		<>
			<PageHeader
				title="Careers"
				description="Vacancies shown on the public careers page."
				actions={
					<Button
						className="h-9 rounded-full bg-[#843b8d] text-white hover:bg-[#6f2f78]"
						render={<Link href="/admin/careers/new" />}
					>
						<PlusIcon />
						New vacancy
					</Button>
				}
			/>
			<Card className="rounded-xl border-[#e9e2ec]">
				<CardContent className="p-0">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Title</TableHead>
								<TableHead>Location</TableHead>
								<TableHead>Deadline</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{(data ?? []).length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={5}
										className="py-10 text-center text-sm text-[#71637a]"
									>
										No vacancies yet — create the first one.
									</TableCell>
								</TableRow>
							) : (
								(data ?? []).map((item) => (
									<TableRow key={item.id}>
										<TableCell className="text-[#241128]">{item.title}</TableCell>
										<TableCell className="text-xs text-[#71637a]">
											{item.location ?? "—"}
										</TableCell>
										<TableCell className="tnum text-xs text-[#71637a]">
											{formatDate(item.deadline)}
										</TableCell>
										<TableCell>
											<StatusBadge status={item.status} />
										</TableCell>
										<TableCell>
											<RowActions
												id={item.id}
												status={item.status}
												editHref={`/admin/careers/${item.id}`}
												onSetStatus={setCareerStatus}
												onDelete={deleteCareer}
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

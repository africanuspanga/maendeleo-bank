"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FormMessage, Select } from "@/components/admin/form";
import { FileUpload } from "@/components/admin/file-upload";
import { saveReport } from "@/app/admin/actions/reports";
import type {
	ContentStatus,
	Report,
	ReportCategory,
} from "@/lib/supabase/types";

const categories: { value: ReportCategory; label: string }[] = [
	{ value: "annual-report", label: "Annual report" },
	{ value: "agm-book", label: "AGM book" },
	{ value: "financial-statement", label: "Financial statement" },
	{ value: "disclosure", label: "Disclosure" },
];

type Message = { kind: "success" | "error"; text: string } | null;

export function ReportForm({ initial }: { initial?: Report }) {
	const router = useRouter();
	const [title, setTitle] = useState(initial?.title ?? "");
	const [category, setCategory] = useState<ReportCategory>(
		initial?.category ?? "annual-report"
	);
	const [year, setYear] = useState(initial?.year ? String(initial.year) : "");
	const [fileUrl, setFileUrl] = useState(initial?.file_url ?? "");
	const [status, setStatus] = useState<ContentStatus>(
		initial?.status ?? "draft"
	);
	const [message, setMessage] = useState<Message>(null);
	const [pending, startTransition] = useTransition();

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setMessage(null);
		startTransition(async () => {
			const result = await saveReport({
				id: initial?.id,
				title,
				category,
				year: year ? Number(year) : null,
				file_url: fileUrl || null,
				published_at: initial?.published_at ?? null,
				status,
			});
			if (result.ok) {
				router.push("/admin/reports");
				router.refresh();
			} else {
				setMessage({ kind: "error", text: result.error });
			}
		});
	}

	return (
		<form onSubmit={handleSubmit}>
			<Card className="rounded-xl border-[#e9e2ec]">
				<CardContent className="flex flex-col gap-4 p-6">
					<Field label="Title" htmlFor="title">
						<Input
							id="title"
							required
							value={title}
							onChange={(event) => setTitle(event.target.value)}
							className="h-9 rounded-md border-[#c9b8d0]"
							placeholder="Annual Report 2024"
						/>
					</Field>
					<div className="grid gap-4 sm:grid-cols-3">
						<Field label="Category" htmlFor="category">
							<Select
								id="category"
								value={category}
								onChange={(event) =>
									setCategory(event.target.value as ReportCategory)
								}
							>
								{categories.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</Select>
						</Field>
						<Field label="Year" htmlFor="year">
							<Input
								id="year"
								type="number"
								min="2000"
								max="2100"
								value={year}
								onChange={(event) => setYear(event.target.value)}
								className="tnum h-9 rounded-md border-[#c9b8d0]"
								placeholder="2024"
							/>
						</Field>
						<Field label="Status" htmlFor="status">
							<Select
								id="status"
								value={status}
								onChange={(event) =>
									setStatus(event.target.value as ContentStatus)
								}
							>
								<option value="draft">Draft</option>
								<option value="published">Published</option>
							</Select>
						</Field>
					</div>
					<Field
						label="PDF document"
						hint="Upload to the media library or paste an external PDF URL."
					>
						<FileUpload
							value={fileUrl}
							onChange={setFileUrl}
							folder="reports"
							accept="application/pdf"
						/>
					</Field>
					<FormMessage state={message} />
					<div className="flex items-center justify-end gap-2">
						<Button
							type="button"
							variant="outline"
							className="h-9 rounded-full"
							onClick={() => router.push("/admin/reports")}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={pending}
							className="h-9 rounded-full bg-[#843b8d] text-white hover:bg-[#6f2f78]"
						>
							{pending ? "Saving…" : "Save report"}
						</Button>
					</div>
				</CardContent>
			</Card>
		</form>
	);
}

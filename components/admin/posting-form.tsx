"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Field,
	FormMessage,
	Select,
	Textarea,
} from "@/components/admin/form";
import { FileUpload } from "@/components/admin/file-upload";
import { saveCareer } from "@/app/admin/actions/careers";
import { saveTender } from "@/app/admin/actions/tenders";
import type { Career, ContentStatus, Tender } from "@/lib/supabase/types";

type Message = { kind: "success" | "error"; text: string } | null;

/**
 * Shared editor for careers and tenders — both are deadline-driven
 * postings with an optional PDF. `kind` switches the labels and the
 * second metadata field (location + type vs. reference).
 */
export function PostingForm({
	kind,
	initial,
}: {
	kind: "career" | "tender";
	initial?: Career | Tender;
}) {
	const router = useRouter();
	const [title, setTitle] = useState(initial?.title ?? "");
	const [meta, setMeta] = useState(
		kind === "career"
			? ((initial as Career | undefined)?.location ?? "")
			: ((initial as Tender | undefined)?.reference ?? "")
	);
	const [jobType, setJobType] = useState(
		(initial as Career | undefined)?.type ?? ""
	);
	const [deadline, setDeadline] = useState(initial?.deadline ?? "");
	const [description, setDescription] = useState(initial?.description ?? "");
	const [pdfUrl, setPdfUrl] = useState(initial?.pdf_url ?? "");
	const [status, setStatus] = useState<ContentStatus>(
		initial?.status ?? "draft"
	);
	const [message, setMessage] = useState<Message>(null);
	const [pending, startTransition] = useTransition();

	const listHref = kind === "career" ? "/admin/careers" : "/admin/tenders";

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setMessage(null);
		startTransition(async () => {
			const result =
				kind === "career"
					? await saveCareer({
							id: initial?.id,
							title,
							location: meta || null,
							type: jobType || null,
							deadline: deadline || null,
							description: description || null,
							pdf_url: pdfUrl || null,
							status,
						})
					: await saveTender({
							id: initial?.id,
							title,
							reference: meta || null,
							deadline: deadline || null,
							description: description || null,
							pdf_url: pdfUrl || null,
							status,
						});
			if (result.ok) {
				router.push(listHref);
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
							placeholder={
								kind === "career"
									? "Senior Credit Officer"
									: "Supply of office stationery"
							}
						/>
					</Field>
					<div
						className={`grid gap-4 ${kind === "career" ? "sm:grid-cols-4" : "sm:grid-cols-3"}`}
					>
						<Field
							label={kind === "career" ? "Location" : "Reference"}
							htmlFor="meta"
						>
							<Input
								id="meta"
								value={meta}
								onChange={(event) => setMeta(event.target.value)}
								className="h-9 rounded-md border-[#c9b8d0]"
								placeholder={
									kind === "career" ? "Dar es Salaam" : "MBP/2026/001"
								}
							/>
						</Field>
						{kind === "career" ? (
							<Field label="Employment type" htmlFor="job-type">
								<Input
									id="job-type"
									value={jobType}
									onChange={(event) => setJobType(event.target.value)}
									className="h-9 rounded-md border-[#c9b8d0]"
									placeholder="Full-time"
								/>
							</Field>
						) : null}
						<Field label="Deadline" htmlFor="deadline">
							<Input
								id="deadline"
								type="date"
								value={deadline}
								onChange={(event) => setDeadline(event.target.value)}
								className="tnum h-9 rounded-md border-[#c9b8d0]"
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
					<Field label="Description" htmlFor="description">
						<Textarea
							id="description"
							className="min-h-40"
							value={description}
							onChange={(event) => setDescription(event.target.value)}
						/>
					</Field>
					<Field
						label="Attachment (PDF)"
						hint="Upload to the media library or paste an external PDF URL."
					>
						<FileUpload
							value={pdfUrl}
							onChange={setPdfUrl}
							folder={kind === "career" ? "careers" : "tenders"}
							accept="application/pdf"
						/>
					</Field>
					<FormMessage state={message} />
					<div className="flex items-center justify-end gap-2">
						<Button
							type="button"
							variant="outline"
							className="h-9 rounded-full"
							onClick={() => router.push(listHref)}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={pending}
							className="h-9 rounded-full bg-[#843b8d] text-white hover:bg-[#6f2f78]"
						>
							{pending
								? "Saving…"
								: `Save ${kind === "career" ? "vacancy" : "tender"}`}
						</Button>
					</div>
				</CardContent>
			</Card>
		</form>
	);
}

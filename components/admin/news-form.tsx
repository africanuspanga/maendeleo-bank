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
import { saveNews } from "@/app/admin/actions/news";
import type { ContentStatus, NewsItem } from "@/lib/supabase/types";

type Message = { kind: "success" | "error"; text: string } | null;

export function NewsForm({ initial }: { initial?: NewsItem }) {
	const router = useRouter();
	const [title, setTitle] = useState(initial?.title ?? "");
	const [titleSw, setTitleSw] = useState(initial?.title_sw ?? "");
	const [slug, setSlug] = useState(initial?.slug ?? "");
	const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
	const [body, setBody] = useState(initial?.body ?? "");
	const [imageUrl, setImageUrl] = useState(initial?.image_url ?? "");
	const [status, setStatus] = useState<ContentStatus>(
		initial?.status ?? "draft"
	);
	const [message, setMessage] = useState<Message>(null);
	const [pending, startTransition] = useTransition();

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setMessage(null);
		startTransition(async () => {
			const result = await saveNews({
				id: initial?.id,
				title,
				title_sw: titleSw || null,
				slug,
				excerpt: excerpt || null,
				body: body || null,
				image_url: imageUrl || null,
				published_at: initial?.published_at ?? null,
				status,
			});
			if (result.ok) {
				router.push("/admin/news");
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
					<div className="grid gap-4 sm:grid-cols-2">
						<Field label="Title (English)" htmlFor="title">
							<Input
								id="title"
								required
								value={title}
								onChange={(event) => setTitle(event.target.value)}
								className="h-9 rounded-md border-[#c9b8d0]"
							/>
						</Field>
						<Field label="Title (Swahili)" htmlFor="title-sw">
							<Input
								id="title-sw"
								value={titleSw}
								onChange={(event) => setTitleSw(event.target.value)}
								className="h-9 rounded-md border-[#c9b8d0]"
							/>
						</Field>
					</div>
					<Field
						label="Slug"
						htmlFor="slug"
						hint="Used in the URL. Leave empty to generate from the English title."
					>
						<Input
							id="slug"
							value={slug}
							onChange={(event) => setSlug(event.target.value)}
							className="tnum h-9 rounded-md border-[#c9b8d0]"
							placeholder="maendeleo-bank-news-post"
						/>
					</Field>
					<Field label="Excerpt" htmlFor="excerpt">
						<Textarea
							id="excerpt"
							className="min-h-16"
							value={excerpt}
							onChange={(event) => setExcerpt(event.target.value)}
						/>
					</Field>
					<Field label="Body" htmlFor="body">
						<Textarea
							id="body"
							className="min-h-48"
							value={body}
							onChange={(event) => setBody(event.target.value)}
						/>
					</Field>
					<Field
						label="Featured image"
						hint="Upload to the media library or paste an external image URL."
					>
						<FileUpload
							value={imageUrl}
							onChange={setImageUrl}
							folder="news"
							accept="image/*"
						/>
					</Field>
					<div className="grid gap-4 sm:grid-cols-2">
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
					<FormMessage state={message} />
					<div className="flex items-center justify-end gap-2">
						<Button
							type="button"
							variant="outline"
							className="h-9 rounded-full"
							onClick={() => router.push("/admin/news")}
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
								: status === "published"
									? "Save & publish"
									: "Save draft"}
						</Button>
					</div>
				</CardContent>
			</Card>
		</form>
	);
}

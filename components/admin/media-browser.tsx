"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
	CheckIcon,
	CopyIcon,
	FileIcon,
	FolderIcon,
	ImageIcon,
	Trash2Icon,
	UploadIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

const BUCKET = "media";
const ROOT_FOLDERS = ["news", "careers", "tenders", "reports", "site"];

type FileEntry = {
	name: string;
	path: string;
	size: number | null;
	updatedAt: string | null;
	publicUrl: string;
	isImage: boolean;
};

function sanitizeFileName(name: string): string {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9.\-_]+/g, "-")
		.replace(/-+/g, "-");
}

/**
 * Media library browser for the public `media` storage bucket.
 * Files are organised under fixed folders (news, careers, tenders,
 * reports, site), matching the folders used by the content editors.
 */
export function MediaBrowser() {
	const supabase = createClient();
	const inputRef = useRef<HTMLInputElement>(null);
	const [folder, setFolder] = useState("site");
	const [files, setFiles] = useState<FileEntry[]>([]);
	const [loading, setLoading] = useState(true);
	const [uploading, setUploading] = useState(false);
	const [copied, setCopied] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const load = useCallback(async () => {
		setLoading(true);
		setError(null);
		const { data, error: listError } = await supabase.storage
			.from(BUCKET)
			.list(folder, { limit: 100, sortBy: { column: "name", order: "asc" } });
		if (listError) {
			setError(listError.message);
			setFiles([]);
		} else {
			setFiles(
				(data ?? [])
					.filter((item) => item.id !== null) // real files only
					.map((item) => {
						const path = `${folder}/${item.name}`;
						return {
							name: item.name,
							path,
							size: item.metadata?.size ?? null,
							updatedAt: item.updated_at ?? null,
							publicUrl: supabase.storage.from(BUCKET).getPublicUrl(path)
								.data.publicUrl,
							isImage: /\.(png|jpe?g|webp|gif|svg)$/i.test(item.name),
						};
					})
			);
		}
		setLoading(false);
	}, [supabase, folder]);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect -- data fetch on mount/folder change; load() sets loading state
		void load();
	}, [load]);

	async function handleUpload(file: File) {
		setUploading(true);
		setError(null);
		const path = `${folder}/${Date.now()}-${sanitizeFileName(file.name)}`;
		const { error: uploadError } = await supabase.storage
			.from(BUCKET)
			.upload(path, file, { cacheControl: "3600", upsert: false });
		setUploading(false);
		if (uploadError) {
			setError(uploadError.message);
			return;
		}
		await load();
	}

	async function handleDelete(entry: FileEntry) {
		if (!window.confirm(`Delete "${entry.name}"? This cannot be undone.`))
			return;
		const { error: deleteError } = await supabase.storage
			.from(BUCKET)
			.remove([entry.path]);
		if (deleteError) {
			setError(deleteError.message);
			return;
		}
		await load();
	}

	async function handleCopy(url: string) {
		await navigator.clipboard.writeText(url);
		setCopied(url);
		setTimeout(() => setCopied(null), 1500);
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div className="flex flex-wrap gap-2">
					{ROOT_FOLDERS.map((name) => (
						<button
							key={name}
							type="button"
							onClick={() => setFolder(name)}
							className={`inline-flex h-9 items-center gap-2 rounded-full border px-4 text-sm transition-colors ${
								folder === name
									? "border-[#843b8d] bg-[#843b8d] text-white"
									: "border-[#e9e2ec] bg-white text-[#3d2a44] hover:bg-[#f3e9f5]"
							}`}
						>
							<FolderIcon className="size-4" />
							{name}
						</button>
					))}
				</div>
				<div>
					<input
						ref={inputRef}
						type="file"
						className="hidden"
						onChange={(event) => {
							const file = event.target.files?.[0];
							if (file) void handleUpload(file);
							event.target.value = "";
						}}
					/>
					<Button
						className="h-9 rounded-full bg-[#843b8d] text-white hover:bg-[#6f2f78]"
						disabled={uploading}
						onClick={() => inputRef.current?.click()}
					>
						<UploadIcon />
						{uploading ? "Uploading…" : `Upload to ${folder}`}
					</Button>
				</div>
			</div>

			{error ? (
				<p className="rounded-lg border border-[#c0392b]/30 bg-[#c0392b]/5 px-4 py-3 text-sm text-[#c0392b]">
					{error}
				</p>
			) : null}

			<Card className="rounded-xl border-[#e9e2ec]">
				<CardContent className="p-6">
					{loading ? (
						<p className="py-10 text-center text-sm text-[#71637a]">
							Loading media…
						</p>
					) : files.length === 0 ? (
						<div className="py-10 text-center">
							<p className="text-sm text-[#71637a]">
								No files in the {folder} folder yet.
							</p>
							<p className="mt-1 text-xs text-[#71637a]">
								Upload images and PDFs here, then paste their URLs into news
								posts, careers, tenders and reports.
							</p>
						</div>
					) : (
						<ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
							{files.map((file) => (
								<li
									key={file.path}
									className="overflow-hidden rounded-xl border border-[#e9e2ec] bg-white"
								>
									<div className="flex h-28 items-center justify-center bg-[#faf7fb]">
										{file.isImage ? (
											// eslint-disable-next-line @next/next/no-img-element
											<img
												src={file.publicUrl}
												alt={file.name}
												className="h-full w-full object-cover"
											/>
										) : file.name.endsWith(".pdf") ? (
											<FileIcon className="size-8 text-[#843b8d]" />
										) : (
											<ImageIcon className="size-8 text-[#843b8d]" />
										)}
									</div>
									<div className="p-3">
										<p className="truncate text-xs text-[#241128]" title={file.name}>
											{file.name}
										</p>
										<p className="tnum mt-0.5 text-[11px] text-[#71637a]">
											{file.size ? `${Math.round(file.size / 1024)} KB` : "—"}
										</p>
										<div className="mt-2 flex gap-1">
											<Button
												variant="outline"
												size="sm"
												className="h-7 flex-1 rounded-full text-xs"
												onClick={() => void handleCopy(file.publicUrl)}
											>
												{copied === file.publicUrl ? (
													<CheckIcon />
												) : (
													<CopyIcon />
												)}
												{copied === file.publicUrl ? "Copied" : "Copy URL"}
											</Button>
											<Button
												variant="outline"
												size="sm"
												className="h-7 rounded-full px-2 text-xs text-[#c0392b] hover:bg-[#c0392b]/5"
												onClick={() => void handleDelete(file)}
											>
												<Trash2Icon />
											</Button>
										</div>
									</div>
								</li>
							))}
						</ul>
					)}
				</CardContent>
			</Card>
		</div>
	);
}

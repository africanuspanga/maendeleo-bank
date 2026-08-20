"use client";

import { useRef, useState } from "react";
import { UploadIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

function sanitizeFileName(name: string): string {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9.\-_]+/g, "-")
		.replace(/-+/g, "-");
}

/**
 * Uploads a file to the public `media` storage bucket (as the signed-in
 * admin user; storage RLS allows authenticated writes) or accepts an
 * external URL. Calls `onChange` with the resulting public URL.
 */
export function FileUpload({
	value,
	onChange,
	folder,
	accept,
	hint,
}: {
	value: string;
	onChange: (url: string) => void;
	folder: string;
	accept: string;
	hint?: string;
}) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function handleFile(file: File) {
		setUploading(true);
		setError(null);
		const supabase = createClient();
		const path = `${folder}/${Date.now()}-${sanitizeFileName(file.name)}`;
		const { error: uploadError } = await supabase.storage
			.from("media")
			.upload(path, file, { cacheControl: "3600", upsert: false });
		if (uploadError) {
			setError(uploadError.message);
			setUploading(false);
			return;
		}
		const {
			data: { publicUrl },
		} = supabase.storage.from("media").getPublicUrl(path);
		onChange(publicUrl);
		setUploading(false);
	}

	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-wrap items-center gap-2">
				<Input
					value={value}
					onChange={(event) => onChange(event.target.value)}
					placeholder="https://… or upload a file"
					className="h-9 flex-1 rounded-md border-[#c9b8d0]"
				/>
				<input
					ref={inputRef}
					type="file"
					accept={accept}
					className="hidden"
					onChange={(event) => {
						const file = event.target.files?.[0];
						if (file) void handleFile(file);
						event.target.value = "";
					}}
				/>
				<Button
					type="button"
					variant="outline"
					className="h-9 rounded-full"
					disabled={uploading}
					onClick={() => inputRef.current?.click()}
				>
					<UploadIcon />
					{uploading ? "Uploading…" : "Upload"}
				</Button>
				{value ? (
					<Button
						type="button"
						variant="ghost"
						size="icon"
						className="size-9 rounded-full"
						aria-label="Clear file"
						onClick={() => onChange("")}
					>
						<XIcon />
					</Button>
				) : null}
			</div>
			{error ? (
				<p className="text-xs text-[#c0392b]" role="alert">
					{error}
				</p>
			) : hint ? (
				<p className="text-xs text-[#71637a]">{hint}</p>
			) : null}
		</div>
	);
}

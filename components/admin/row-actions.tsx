"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { PencilIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { ContentStatus } from "@/lib/supabase/types";
import type { ActionResult } from "@/app/admin/actions/types";

/**
 * Shared row actions for content tables: edit link, publish/unpublish
 * toggle, and delete with confirmation.
 */
export function RowActions({
	id,
	status,
	editHref,
	onSetStatus,
	onDelete,
	confirmText,
}: {
	id: string;
	status: ContentStatus;
	editHref: string;
	onSetStatus: (id: string, status: ContentStatus) => Promise<ActionResult>;
	onDelete: (id: string) => Promise<ActionResult>;
	confirmText: string;
}) {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [pending, startTransition] = useTransition();

	function run(action: () => Promise<ActionResult>) {
		setError(null);
		startTransition(async () => {
			const result = await action();
			if (!result.ok) {
				setError(result.error);
				return;
			}
			router.refresh();
		});
	}

	return (
		<div className="flex flex-col items-end gap-1">
			<div className="flex items-center justify-end gap-1">
				<Button
					size="sm"
					variant="outline"
					className="h-8 rounded-full"
					render={<Link href={editHref} />}
				>
					<PencilIcon />
					Edit
				</Button>
				<Button
					size="sm"
					variant="outline"
					className="h-8 rounded-full"
					disabled={pending}
					onClick={() =>
						run(() =>
							onSetStatus(
								id,
								status === "published" ? "draft" : "published"
							)
						)
					}
				>
					{status === "published" ? "Unpublish" : "Publish"}
				</Button>
				<Button
					size="icon-sm"
					variant="ghost"
					className="rounded-full text-[#c0392b]"
					aria-label="Delete"
					disabled={pending}
					onClick={() => {
						if (window.confirm(confirmText)) {
							run(() => onDelete(id));
						}
					}}
				>
					<Trash2Icon />
				</Button>
			</div>
			{error ? (
				<p className="text-xs text-[#c0392b]" role="alert">
					{error}
				</p>
			) : null}
		</div>
	);
}

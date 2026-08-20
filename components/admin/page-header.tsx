import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/** Section heading used at the top of every admin page. */
export function PageHeader({
	title,
	description,
	actions,
}: {
	title: string;
	description?: string;
	actions?: React.ReactNode;
}) {
	return (
		<div className="flex flex-wrap items-end justify-between gap-4">
			<div className="flex flex-col gap-1">
				<h1 className="text-2xl font-light tracking-tight text-[#241128]">
					{title}
				</h1>
				{description ? (
					<p className="text-sm text-[#71637a]">{description}</p>
				) : null}
			</div>
			{actions ? <div className="flex items-center gap-2">{actions}</div> : null}
		</div>
	);
}

/** Draft/published status pill, green accent for published, per design tokens. */
export function StatusBadge({ status }: { status: string }) {
	const published = status === "published";
	return (
		<Badge
			variant="outline"
			className={cn(
				"rounded-full border-0 px-2.5 text-[11px] font-normal",
				published
					? "bg-[#e6f5ea] text-[#157a2f]"
					: "bg-[#f3e9f5] text-[#6f2f78]"
			)}
		>
			{published ? "Published" : "Draft"}
		</Badge>
	);
}

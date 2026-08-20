import { cn } from "@/lib/utils";

/** Labelled field wrapper used across admin forms. */
export function Field({
	label,
	hint,
	htmlFor,
	children,
}: {
	label: string;
	hint?: string;
	htmlFor?: string;
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col gap-1.5">
			<label
				htmlFor={htmlFor}
				className="text-[13px] font-medium text-[#3d2a44]"
			>
				{label}
			</label>
			{children}
			{hint ? <p className="text-xs text-[#71637a]">{hint}</p> : null}
		</div>
	);
}

const controlStyles =
	"w-full min-w-0 rounded-md border border-[#c9b8d0] bg-white px-2.5 py-1.5 text-sm text-[#241128] transition-colors outline-none placeholder:text-[#71637a]/70 focus-visible:border-[#843b8d] focus-visible:ring-2 focus-visible:ring-[#843b8d]/20 disabled:cursor-not-allowed disabled:opacity-50";

export function Textarea({
	className,
	...props
}: React.ComponentProps<"textarea">) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(controlStyles, "min-h-28 leading-relaxed", className)}
			{...props}
		/>
	);
}

export function Select({
	className,
	children,
	...props
}: React.ComponentProps<"select">) {
	return (
		<select
			data-slot="select"
			className={cn(controlStyles, "h-9", className)}
			{...props}
		>
			{children}
		</select>
	);
}

/** Inline success / error feedback for forms. */
export function FormMessage({
	state,
}: {
	state: { kind: "success" | "error"; text: string } | null;
}) {
	if (!state) return null;
	return (
		<p
			className={cn(
				"rounded-md px-3 py-2 text-sm",
				state.kind === "success"
					? "bg-[#e6f5ea] text-[#157a2f]"
					: "bg-[#c0392b]/10 text-[#c0392b]"
			)}
			role={state.kind === "error" ? "alert" : "status"}
		>
			{state.text}
		</p>
	);
}

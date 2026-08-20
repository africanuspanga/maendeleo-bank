"use client";

import { useState, useTransition } from "react";
import { CheckIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Field, FormMessage } from "@/components/admin/form";
import { formatDateTime, formatRate } from "@/components/admin/format";
import {
	addRate,
	deleteRate,
	updateRate,
} from "@/app/admin/actions/rates";
import type { ForexRate } from "@/lib/supabase/types";

type Message = { kind: "success" | "error"; text: string } | null;

function RateRow({ rate }: { rate: ForexRate }) {
	const router = useRouter();
	const [buy, setBuy] = useState(String(rate.buy));
	const [sell, setSell] = useState(String(rate.sell));
	const [message, setMessage] = useState<Message>(null);
	const [pending, startTransition] = useTransition();

	const dirty =
		Number(buy) !== rate.buy || Number(sell) !== rate.sell;

	function handleSave() {
		setMessage(null);
		startTransition(async () => {
			const result = await updateRate(rate.id, Number(buy), Number(sell));
			if (result.ok) {
				setMessage({ kind: "success", text: "Saved." });
				router.refresh();
			} else {
				setMessage({ kind: "error", text: result.error });
			}
		});
	}

	function handleDelete() {
		if (!window.confirm(`Remove ${rate.label} from the rate board?`)) return;
		setMessage(null);
		startTransition(async () => {
			const result = await deleteRate(rate.id);
			if (result.ok) {
				router.refresh();
			} else {
				setMessage({ kind: "error", text: result.error });
			}
		});
	}

	return (
		<>
			<TableRow>
				<TableCell>
					<span className="rounded-full bg-[#f3e9f5] px-2 py-0.5 text-[11px] font-medium tracking-wide text-[#6f2f78]">
						{rate.currency}
					</span>
				</TableCell>
				<TableCell className="text-[#3d2a44]">{rate.label}</TableCell>
				<TableCell>
					<Input
						type="number"
						step="0.01"
						min="0"
						value={buy}
						onChange={(event) => setBuy(event.target.value)}
						className="tnum h-8 w-28 rounded-md border-[#c9b8d0] text-right"
						aria-label={`${rate.label} buy rate`}
					/>
				</TableCell>
				<TableCell>
					<Input
						type="number"
						step="0.01"
						min="0"
						value={sell}
						onChange={(event) => setSell(event.target.value)}
						className="tnum h-8 w-28 rounded-md border-[#c9b8d0] text-right"
						aria-label={`${rate.label} sell rate`}
					/>
				</TableCell>
				<TableCell className="tnum text-xs text-[#71637a]">
					{formatDateTime(rate.updated_at)}
				</TableCell>
				<TableCell>
					<div className="flex items-center justify-end gap-1">
						<Button
							size="sm"
							className="h-8 rounded-full bg-[#1b9f3c] text-white hover:bg-[#157a2f]"
							disabled={pending || !dirty}
							onClick={handleSave}
						>
							<CheckIcon />
							Save
						</Button>
						<Button
							size="icon-sm"
							variant="ghost"
							className="rounded-full text-[#c0392b]"
							aria-label={`Delete ${rate.label}`}
							disabled={pending}
							onClick={handleDelete}
						>
							<Trash2Icon />
						</Button>
					</div>
				</TableCell>
			</TableRow>
			{message ? (
				<TableRow>
					<TableCell colSpan={6} className="py-1">
						<FormMessage state={message} />
					</TableCell>
				</TableRow>
			) : null}
		</>
	);
}

export function RatesTable({ rates }: { rates: ForexRate[] }) {
	const router = useRouter();
	const [currency, setCurrency] = useState("");
	const [label, setLabel] = useState("");
	const [buy, setBuy] = useState("");
	const [sell, setSell] = useState("");
	const [message, setMessage] = useState<Message>(null);
	const [pending, startTransition] = useTransition();

	function handleAdd(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setMessage(null);
		startTransition(async () => {
			const result = await addRate({
				currency,
				label,
				buy: Number(buy),
				sell: Number(sell),
				sort_order: rates.length + 1,
			});
			if (result.ok) {
				setCurrency("");
				setLabel("");
				setBuy("");
				setSell("");
				setMessage({ kind: "success", text: "Currency added." });
				router.refresh();
			} else {
				setMessage({ kind: "error", text: result.error });
			}
		});
	}

	return (
		<div className="flex flex-col gap-6">
			<Card className="rounded-xl border-[#e9e2ec]">
				<CardContent className="p-0">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Currency</TableHead>
								<TableHead>Label</TableHead>
								<TableHead className="text-right">Buy</TableHead>
								<TableHead className="text-right">Sell</TableHead>
								<TableHead>Last updated</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{rates.length === 0 ? (
								<TableRow>
									<TableCell
										colSpan={6}
										className="py-10 text-center text-sm text-[#71637a]"
									>
										No rates yet, add the first currency below.
									</TableCell>
								</TableRow>
							) : (
								rates.map((rate) => <RateRow key={rate.id} rate={rate} />)
							)}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			<Card className="rounded-xl border-[#e9e2ec]">
				<CardContent className="flex flex-col gap-4 p-6">
					<h2 className="text-base font-light tracking-tight text-[#241128]">
						Add currency
					</h2>
					<form
						onSubmit={handleAdd}
						className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
					>
						<Field label="Currency code" htmlFor="new-currency">
							<Input
								id="new-currency"
								required
								maxLength={3}
								placeholder="USD"
								value={currency}
								onChange={(event) => setCurrency(event.target.value)}
								className="h-9 rounded-md border-[#c9b8d0] uppercase"
							/>
						</Field>
						<Field label="Label" htmlFor="new-label">
							<Input
								id="new-label"
								required
								placeholder="USA CASH (50-100)"
								value={label}
								onChange={(event) => setLabel(event.target.value)}
								className="h-9 rounded-md border-[#c9b8d0]"
							/>
						</Field>
						<Field label="Buy" htmlFor="new-buy">
							<Input
								id="new-buy"
								required
								type="number"
								step="0.01"
								min="0"
								placeholder={formatRate(0)}
								value={buy}
								onChange={(event) => setBuy(event.target.value)}
								className="tnum h-9 rounded-md border-[#c9b8d0]"
							/>
						</Field>
						<Field label="Sell" htmlFor="new-sell">
							<Input
								id="new-sell"
								required
								type="number"
								step="0.01"
								min="0"
								placeholder={formatRate(0)}
								value={sell}
								onChange={(event) => setSell(event.target.value)}
								className="tnum h-9 rounded-md border-[#c9b8d0]"
							/>
						</Field>
						<div className="flex items-end">
							<Button
								type="submit"
								disabled={pending}
								className="h-9 w-full rounded-full bg-[#843b8d] text-white hover:bg-[#6f2f78]"
							>
								<PlusIcon />
								{pending ? "Adding…" : "Add"}
							</Button>
						</div>
					</form>
					<FormMessage state={message} />
				</CardContent>
			</Card>
		</div>
	);
}

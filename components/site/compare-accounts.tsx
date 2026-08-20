import { Check, Minus } from "lucide-react";

/**
 * RFQ §4.3: compare accounts — the three core savings products side by
 * side. All facts from docs/maendeleo-bank-info/04-personal-banking.md
 * (scraped from the bank's own product page; no numeric rates are
 * published, so interest appears as the bank's own qualitative tiers).
 */

type CellValue = string | boolean;

interface CompareRow {
	label: string;
	values: [CellValue, CellValue, CellValue];
}

const columns = ["Maendeleo Saving", "Ahadi", "Wekeza"] as const;

const rows: CompareRow[] = [
	{
		label: "Opening balance",
		values: ["Little or zero", "TZS 10,000", "TZS 20,000"],
	},
	{
		label: "Withdrawals",
		values: ["Flexible, ATM card access", "None during the year", "4 per year"],
	},
	{
		label: "Monthly charges",
		values: ["Fees apply", "None", "None"],
	},
	{
		label: "Interest",
		values: ["Earns interest", "Premium rate", "Premium rate"],
	},
	{ label: "MB ATM card", values: [true, false, false] },
	{ label: "MB Mobile", values: [true, false, false] },
	{
		label: "Best for",
		values: [
			"Everyday salary and savings",
			"A locked monthly savings goal",
			"Growing savings towards a big goal",
		],
	},
];

function Cell({ value }: { value: CellValue }) {
	if (typeof value === "boolean") {
		return value ? (
			<Check className="mx-auto h-4 w-4 text-brand-green-deep" strokeWidth={2} aria-label="Yes" />
		) : (
			<Minus className="mx-auto h-4 w-4 text-ink-mute" strokeWidth={2} aria-label="No" />
		);
	}
	return <span className="text-[13px] leading-[1.4] text-ink">{value}</span>;
}

export function CompareAccounts() {
	return (
		<div className="overflow-x-auto rounded-xl border border-hairline bg-white">
			<table className="w-full min-w-[640px] border-collapse text-left">
				<thead>
					<tr className="border-b border-hairline">
						<th scope="col" className="p-5">
							<span className="sr-only">Feature</span>
						</th>
						{columns.map((column) => (
							<th
								key={column}
								scope="col"
								className="p-5 text-center text-[15px] font-medium text-ink"
							>
								{column}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((row, rowIndex) => (
						<tr
							key={row.label}
							className={rowIndex % 2 === 0 ? "bg-canvas-soft" : "bg-white"}
						>
							<th
								scope="row"
								className="p-5 text-[13px] font-normal text-ink-mute"
							>
								{row.label}
							</th>
							{row.values.map((value, columnIndex) => (
								<td key={columns[columnIndex]} className="p-5 text-center">
									<Cell value={value} />
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

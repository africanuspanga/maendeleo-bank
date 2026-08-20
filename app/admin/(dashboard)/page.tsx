import Link from "next/link";
import {
	ArrowRightIcon,
	BriefcaseIcon,
	FilesIcon,
	NewspaperIcon,
	PercentIcon,
	PlusIcon,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader, StatusBadge } from "@/components/admin/page-header";
import { SetupScreen } from "@/components/admin/setup-screen";
import { formatDateTime } from "@/components/admin/format";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

type ActivityItem = {
	id: string;
	kind: "News" | "Report";
	title: string;
	status: string;
	updated_at: string;
	href: string;
};

export default async function AdminDashboardPage() {
	if (!isSupabaseConfigured()) {
		return <SetupScreen />;
	}

	const supabase = await createClient();

	const [newsCount, reportsCount, careersCount, latestRate, recentNews, recentReports] =
		await Promise.all([
			supabase
				.from("news")
				.select("id", { count: "exact", head: true })
				.eq("status", "published"),
			supabase.from("reports").select("id", { count: "exact", head: true }),
			supabase
				.from("careers")
				.select("id", { count: "exact", head: true })
				.eq("status", "published"),
			supabase
				.from("forex_rates")
				.select("updated_at")
				.order("updated_at", { ascending: false })
				.limit(1)
				.maybeSingle(),
			supabase
				.from("news")
				.select("id, title, status, updated_at")
				.order("updated_at", { ascending: false })
				.limit(4),
			supabase
				.from("reports")
				.select("id, title, status, updated_at")
				.order("updated_at", { ascending: false })
				.limit(4),
		]);

	const stats = [
		{
			label: "Published news",
			value: newsCount.error ? "—" : String(newsCount.count ?? 0),
			icon: <NewspaperIcon className="size-4 text-[#843b8d]" />,
			href: "/admin/news",
		},
		{
			label: "Rates last updated",
			value: latestRate.data
				? formatDateTime(latestRate.data.updated_at)
				: "—",
			icon: <PercentIcon className="size-4 text-[#843b8d]" />,
			href: "/admin/rates",
		},
		{
			label: "Investor reports",
			value: reportsCount.error ? "—" : String(reportsCount.count ?? 0),
			icon: <FilesIcon className="size-4 text-[#843b8d]" />,
			href: "/admin/reports",
		},
		{
			label: "Open careers",
			value: careersCount.error ? "—" : String(careersCount.count ?? 0),
			icon: <BriefcaseIcon className="size-4 text-[#843b8d]" />,
			href: "/admin/careers",
		},
	];

	const activity: ActivityItem[] = [
		...(recentNews.data ?? []).map((item) => ({
			id: item.id,
			kind: "News" as const,
			title: item.title,
			status: item.status,
			updated_at: item.updated_at,
			href: `/admin/news/${item.id}`,
		})),
		...(recentReports.data ?? []).map((item) => ({
			id: item.id,
			kind: "Report" as const,
			title: item.title,
			status: item.status,
			updated_at: item.updated_at,
			href: `/admin/reports/${item.id}`,
		})),
	]
		.sort((a, b) => b.updated_at.localeCompare(a.updated_at))
		.slice(0, 6);

	return (
		<>
			<PageHeader
				title="Dashboard"
				description="Content, treasury and investor-relations overview for maendeleobank.co.tz."
			/>

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{stats.map((stat) => (
					<Link key={stat.label} href={stat.href}>
						<Card className="h-full rounded-xl border-[#e9e2ec] transition-shadow hover:shadow-[0_1px_3px_rgba(42,18,48,0.08)]">
							<CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
								<CardTitle className="text-[13px] font-normal text-[#71637a]">
									{stat.label}
								</CardTitle>
								<span className="flex size-8 items-center justify-center rounded-lg bg-[#f3e9f5]">
									{stat.icon}
								</span>
							</CardHeader>
							<CardContent>
								<p className="tnum text-lg font-light tracking-tight text-[#241128]">
									{stat.value}
								</p>
							</CardContent>
						</Card>
					</Link>
				))}
			</div>

			<div className="grid gap-4 lg:grid-cols-3">
				<Card className="rounded-xl border-[#e9e2ec] lg:col-span-2">
					<CardHeader>
						<CardTitle className="text-base font-light tracking-tight text-[#241128]">
							Recent activity
						</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col divide-y divide-[#e9e2ec]">
						{activity.length === 0 ? (
							<p className="py-6 text-center text-sm text-[#71637a]">
								Nothing yet — publish your first news item or report.
							</p>
						) : (
							activity.map((item) => (
								<Link
									key={`${item.kind}-${item.id}`}
									href={item.href}
									className="flex items-center justify-between gap-3 py-3 text-sm transition-colors hover:bg-[#faf7fb]"
								>
									<div className="flex min-w-0 items-center gap-3">
										<span className="shrink-0 rounded-full bg-[#f3e9f5] px-2 py-0.5 text-[10px] tracking-wide text-[#6f2f78] uppercase">
											{item.kind}
										</span>
										<span className="truncate text-[#3d2a44]">
											{item.title}
										</span>
									</div>
									<div className="flex shrink-0 items-center gap-3">
										<span className="tnum hidden text-xs text-[#71637a] sm:inline">
											{formatDateTime(item.updated_at)}
										</span>
										<StatusBadge status={item.status} />
									</div>
								</Link>
							))
						)}
					</CardContent>
				</Card>

				<Card className="rounded-xl border-[#e9e2ec]">
					<CardHeader>
						<CardTitle className="text-base font-light tracking-tight text-[#241128]">
							Quick actions
						</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col gap-2">
						<Button
							className="h-9 justify-start rounded-full bg-[#843b8d] text-white hover:bg-[#6f2f78]"
							render={<Link href="/admin/news/new" />}
						>
							<PlusIcon />
							New news post
						</Button>
						<Button
							variant="outline"
							className="h-9 justify-start rounded-full"
							render={<Link href="/admin/rates" />}
						>
							<PercentIcon />
							Update forex rates
						</Button>
						<Button
							variant="outline"
							className="h-9 justify-start rounded-full"
							render={<Link href="/admin/reports/new" />}
						>
							<PlusIcon />
							Add investor report
						</Button>
						<Button
							variant="outline"
							className="h-9 justify-start rounded-full"
							render={<Link href="/admin/content" />}
						>
							<ArrowRightIcon />
							Edit site content
						</Button>
					</CardContent>
				</Card>
			</div>
		</>
	);
}

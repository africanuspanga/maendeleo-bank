"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FormMessage, Textarea } from "@/components/admin/form";
import { saveSiteContent } from "@/app/admin/actions/content";

export type ContentValues = {
	hero_title: string;
	hero_sub: string;
	announcement: string;
	hours_weekdays: string;
	hours_saturday: string;
	hours_sunday: string;
	contact_address: string;
	contact_email: string;
	contact_toll_free: string;
};

type Message = { kind: "success" | "error"; text: string } | null;

export function ContentForm({ initial }: { initial: ContentValues }) {
	const router = useRouter();
	const [values, setValues] = useState<ContentValues>(initial);
	const [message, setMessage] = useState<Message>(null);
	const [pending, startTransition] = useTransition();

	function set(key: keyof ContentValues) {
		return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
			setValues((prev) => ({ ...prev, [key]: event.target.value }));
	}

	function handleSave(section: "hero" | "announcement" | "hours" | "contact") {
		setMessage(null);
		startTransition(async () => {
			const writes =
				section === "hero"
					? [
							saveSiteContent("hero_title", values.hero_title),
							saveSiteContent("hero_sub", values.hero_sub),
						]
					: section === "announcement"
						? [saveSiteContent("announcement", values.announcement)]
						: section === "hours"
							? [
									saveSiteContent("hours", {
										weekdays: values.hours_weekdays,
										saturday: values.hours_saturday,
										sunday: values.hours_sunday,
									}),
								]
							: [
									saveSiteContent("contact", {
										address: values.contact_address,
										email: values.contact_email,
										toll_free: values.contact_toll_free,
									}),
								];

			const results = await Promise.all(writes);
			const failed = results.find((result) => !result.ok);
			if (failed && !failed.ok) {
				setMessage({ kind: "error", text: failed.error });
			} else {
				setMessage({ kind: "success", text: "Saved." });
				router.refresh();
			}
		});
	}

	function renderSaveBar(section: "hero" | "announcement" | "hours" | "contact") {
		return (
			<div className="flex justify-end">
				<Button
					className="h-9 rounded-full bg-[#843b8d] text-white hover:bg-[#6f2f78]"
					disabled={pending}
					onClick={() => handleSave(section)}
				>
					{pending ? "Saving…" : "Save changes"}
				</Button>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6">
			<Card className="rounded-xl border-[#e9e2ec]">
				<CardHeader>
					<CardTitle className="text-base font-light tracking-tight text-[#241128]">
						Homepage hero
					</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<Field label="Hero title" htmlFor="hero-title">
						<Input
							id="hero-title"
							value={values.hero_title}
							onChange={set("hero_title")}
							className="h-9 rounded-md border-[#c9b8d0]"
						/>
					</Field>
					<Field
						label="Hero sub-heading"
						htmlFor="hero-sub"
						hint="Keep it under 15 words."
					>
						<Textarea
							id="hero-sub"
							className="min-h-16"
							value={values.hero_sub}
							onChange={set("hero_sub")}
						/>
					</Field>
					{renderSaveBar("hero")}
				</CardContent>
			</Card>

			<Card className="rounded-xl border-[#e9e2ec]">
				<CardHeader>
					<CardTitle className="text-base font-light tracking-tight text-[#241128]">
						Announcement bar
					</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<Field
						label="Announcement text"
						htmlFor="announcement"
						hint="Leave empty to hide the announcement bar."
					>
						<Input
							id="announcement"
							value={values.announcement}
							onChange={set("announcement")}
							className="h-9 rounded-md border-[#c9b8d0]"
						/>
					</Field>
					{renderSaveBar("announcement")}
				</CardContent>
			</Card>

			<Card className="rounded-xl border-[#e9e2ec]">
				<CardHeader>
					<CardTitle className="text-base font-light tracking-tight text-[#241128]">
						Opening hours
					</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<div className="grid gap-4 sm:grid-cols-3">
						<Field label="Monday - Friday" htmlFor="hours-weekdays">
							<Input
								id="hours-weekdays"
								value={values.hours_weekdays}
								onChange={set("hours_weekdays")}
								className="h-9 rounded-md border-[#c9b8d0]"
							/>
						</Field>
						<Field label="Saturday" htmlFor="hours-saturday">
							<Input
								id="hours-saturday"
								value={values.hours_saturday}
								onChange={set("hours_saturday")}
								className="h-9 rounded-md border-[#c9b8d0]"
							/>
						</Field>
						<Field label="Sunday & holidays" htmlFor="hours-sunday">
							<Input
								id="hours-sunday"
								value={values.hours_sunday}
								onChange={set("hours_sunday")}
								className="h-9 rounded-md border-[#c9b8d0]"
							/>
						</Field>
					</div>
					{renderSaveBar("hours")}
				</CardContent>
			</Card>

			<Card className="rounded-xl border-[#e9e2ec]">
				<CardHeader>
					<CardTitle className="text-base font-light tracking-tight text-[#241128]">
						Contact block
					</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<Field label="Head office address" htmlFor="contact-address">
						<Textarea
							id="contact-address"
							className="min-h-16"
							value={values.contact_address}
							onChange={set("contact_address")}
						/>
					</Field>
					<div className="grid gap-4 sm:grid-cols-2">
						<Field label="Email" htmlFor="contact-email">
							<Input
								id="contact-email"
								type="email"
								value={values.contact_email}
								onChange={set("contact_email")}
								className="h-9 rounded-md border-[#c9b8d0]"
							/>
						</Field>
						<Field label="Toll-free line" htmlFor="contact-toll-free">
							<Input
								id="contact-toll-free"
								value={values.contact_toll_free}
								onChange={set("contact_toll_free")}
								className="tnum h-9 rounded-md border-[#c9b8d0]"
							/>
						</Field>
					</div>
					{renderSaveBar("contact")}
				</CardContent>
			</Card>

			<FormMessage state={message} />
		</div>
	);
}

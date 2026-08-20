"use client";

import { useActionState } from "react";
import { submitEnquiry, type EnquiryState } from "@/app/(site)/contact/actions";

const inputClasses =
	"min-h-[44px] w-full rounded-md border border-[#c9b8d0] bg-white px-3 py-2 text-[15px] font-normal text-ink transition-colors placeholder:text-ink-mute focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/60";

const labelClasses = "mb-1.5 block text-caption text-ink-mute";

const topics = [
	"General enquiry",
	"Personal banking",
	"Business banking",
	"Loans",
	"Digital banking",
	"Investor relations",
	"Careers",
];

const initialState: EnquiryState = { status: "idle", message: "" };

/**
 * F49: the form now delivers server-side into the `enquiries` table
 * (see actions.ts) with a honeypot for spam, instead of composing a
 * mailto: in the visitor's mail client.
 */
export function ContactForm() {
	const [state, formAction, pending] = useActionState(
		submitEnquiry,
		initialState,
	);

	if (state.status === "success") {
		return (
			<div
				role="status"
				className="rounded-xl border border-hairline bg-canvas-soft p-8"
			>
				<p className="text-heading-sm text-ink">Message sent</p>
				<p className="mt-2 text-body-md text-ink-mute">{state.message}</p>
			</div>
		);
	}

	return (
		<form action={formAction} className="flex flex-col gap-4">
			<div className="grid gap-4 sm:grid-cols-2">
				<div>
					<label htmlFor="contact-name" className={labelClasses}>
						Full name
					</label>
					<input
						id="contact-name"
						name="name"
						required
						className={inputClasses}
						autoComplete="name"
					/>
				</div>
				<div>
					<label htmlFor="contact-email" className={labelClasses}>
						Your email
					</label>
					<input
						id="contact-email"
						name="email"
						type="email"
						required
						className={inputClasses}
						autoComplete="email"
					/>
				</div>
			</div>
			{/* Honeypot: hidden from humans, irresistible to bots */}
			<div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
				<label htmlFor="contact-company">Company</label>
				<input
					id="contact-company"
					name="company"
					tabIndex={-1}
					autoComplete="off"
				/>
			</div>
			<div>
				<label htmlFor="contact-topic" className={labelClasses}>
					What is it about?
				</label>
				<select id="contact-topic" name="topic" className={inputClasses}>
					{topics.map((topic) => (
						<option key={topic} value={topic}>
							{topic}
						</option>
					))}
				</select>
			</div>
			<div>
				<label htmlFor="contact-message" className={labelClasses}>
					Message
				</label>
				<textarea
					id="contact-message"
					name="message"
					required
					rows={5}
					className={`${inputClasses} min-h-[120px] resize-y`}
				/>
			</div>
			{state.status === "error" ? (
				<p role="alert" className="text-body-md text-[#a4252f]">
					{state.message}
				</p>
			) : null}
			<div className="flex flex-wrap items-center gap-4">
				<button
					type="submit"
					disabled={pending}
					className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-brand px-6 py-2.5 text-base font-normal leading-none text-white transition-colors hover:bg-brand-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 active:bg-brand-press disabled:cursor-not-allowed disabled:opacity-60"
				>
					{pending ? "Sending…" : "Send message"}
				</button>
				<p className="text-caption text-ink-mute">
					Delivered straight to our team, no email app needed.
				</p>
			</div>
		</form>
	);
}

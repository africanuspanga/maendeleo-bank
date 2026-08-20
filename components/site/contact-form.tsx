"use client";

import { useState, type FormEvent } from "react";

const inputClasses =
	"min-h-[44px] w-full rounded-md border border-[#c9b8d0] bg-white px-3 py-2 text-[15px] font-light text-ink transition-colors placeholder:text-ink-mute focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

/**
 * Contact form that composes an email in the visitor's own mail client.
 * No backend delivery is claimed — the message opens in their email app,
 * addressed to the bank's published info address.
 */
export function ContactForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const body = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");
		const mailto = `mailto:info@maendeleobank.co.tz?subject=${encodeURIComponent(
			subject || "Website enquiry",
		)}&body=${encodeURIComponent(body)}`;
		window.location.href = mailto;
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
			<div className="grid gap-4 sm:grid-cols-2">
				<div>
					<label htmlFor="contact-name" className="mb-1.5 block text-[13px] font-normal leading-[1.4] tracking-[-0.39px] text-ink-mute">
						Full name
					</label>
					<input
						id="contact-name"
						required
						value={name}
						onChange={(e) => setName(e.target.value)}
						className={inputClasses}
						autoComplete="name"
					/>
				</div>
				<div>
					<label htmlFor="contact-email" className="mb-1.5 block text-[13px] font-normal leading-[1.4] tracking-[-0.39px] text-ink-mute">
						Your email
					</label>
					<input
						id="contact-email"
						type="email"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className={inputClasses}
						autoComplete="email"
					/>
				</div>
			</div>
			<div>
				<label htmlFor="contact-subject" className="mb-1.5 block text-[13px] font-normal leading-[1.4] tracking-[-0.39px] text-ink-mute">
					Subject
				</label>
				<input
					id="contact-subject"
					value={subject}
					onChange={(e) => setSubject(e.target.value)}
					className={inputClasses}
					placeholder="e.g. Opening a business account"
				/>
			</div>
			<div>
				<label htmlFor="contact-message" className="mb-1.5 block text-[13px] font-normal leading-[1.4] tracking-[-0.39px] text-ink-mute">
					Message
				</label>
				<textarea
					id="contact-message"
					required
					rows={5}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					className={`${inputClasses} min-h-[120px] resize-y`}
				/>
			</div>
			<div className="flex flex-wrap items-center gap-4">
				<button
					type="submit"
					className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-brand px-6 py-2.5 text-base font-normal leading-none text-white transition-colors hover:bg-brand-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 active:bg-brand-press"
				>
					Compose email
				</button>
				<p className="text-[13px] font-normal leading-[1.4] tracking-[-0.39px] text-ink-mute">
					Opens in your email app, addressed to info@maendeleobank.co.tz
				</p>
			</div>
		</form>
	);
}

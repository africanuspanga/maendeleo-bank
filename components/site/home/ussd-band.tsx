import { Check } from "lucide-react";
import { Container, Eyebrow, PillLink } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";

const checklist = [
	{
		title: "Transfers within the bank",
		body: "Move money between Maendeleo Bank accounts, fast, secure and available 24/7.",
	},
	{
		title: "External transfers",
		body: "Send money to accounts at other banks, for family, friends or business.",
	},
	{
		title: "Bill payments",
		body: "Pay utility bills, including electricity (LUKU), directly from your phone.",
	},
];

function PhoneMockup() {
	return (
		<div className="relative mx-auto w-[280px]">
			{/* Purple glow behind the phone */}
			<div
				aria-hidden
				className="absolute -inset-10 rounded-full bg-brand/25 blur-3xl"
			/>
			<div
				aria-hidden
				className="relative rounded-[2.5rem] border border-hairline bg-white p-3 shadow-lift-2"
			>
				<div className="rounded-[2rem] bg-brand-plum px-5 pb-6 pt-5">
					<div className="mx-auto h-1 w-12 rounded-full bg-white/20" />
					<p className="mt-8 flex items-center justify-center gap-2 text-eyebrow uppercase text-white/50">
						<span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-brand-green" />
						Maendeleo Bank Mobile
					</p>
					<p className="tnum mt-2 text-[34px] font-light leading-[1.1] tracking-display-lg text-white">
						*150*52#
					</p>
					<div className="mt-7 grid grid-cols-3 gap-2">
						{["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map(
							(key) => (
								<div
									key={key}
									className="tnum flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[15px] font-light text-white"
								>
									{key}
								</div>
							),
						)}
					</div>
					{/* F44: a real tel: link (%23 escapes the # so USSD works in tel:);
					    F24: purple CTA — the band's green accent is the status dot above */}
					<a
						href="tel:*150*52%23"
						className="mt-4 flex h-11 items-center justify-center rounded-full bg-brand text-[14px] font-normal text-white transition-colors hover:bg-brand-deep"
					>
						Dial now
					</a>
				</div>
			</div>
		</div>
	);
}

export function UssdBand() {
	return (
		<section className="bg-canvas-soft">
			<Container className="py-20 md:py-28">
				<div className="grid items-center gap-16 lg:grid-cols-2">
					<Reveal>
						<Eyebrow>Digital banking</Eyebrow>
						<h2 className="mt-3 text-[36px] font-light leading-[1.05] tracking-display-xl text-ink md:text-[56px]">
							Banking at your fingertips
						</h2>
						<p className="tnum mt-5 text-[32px] font-light leading-[1.1] tracking-display-lg text-brand md:text-[40px]">
							Dial *150*52#
						</p>
						<p className="mt-5 max-w-md text-base font-normal leading-[1.5] text-ink-secondary">
							Convenient, secure banking through our mobile platform, no
							smartphone or internet connection needed. Access your account,
							transfer funds and pay bills from any phone.
						</p>
						<ul className="mt-9 flex flex-col gap-5">
							{checklist.map((item) => (
								<li key={item.title} className="flex gap-3">
									<span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-subdued text-brand">
										<Check className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
									</span>
									<div>
										<p className="text-[15px] font-normal text-ink">{item.title}</p>
										<p className="mt-0.5 text-[14px] font-normal text-ink-mute">
											{item.body}
										</p>
									</div>
								</li>
							))}
						</ul>
						<div className="mt-10">
							<PillLink href="/digital-banking">More on Digital Banking</PillLink>
						</div>
					</Reveal>
					<Reveal delay={200}>
						<PhoneMockup />
					</Reveal>
				</div>
			</Container>
		</section>
	);
}

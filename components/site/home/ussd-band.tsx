import { Check } from "lucide-react";
import {
	Container,
	Eyebrow,
	PillLink,
} from "@/components/site/primitives";

const checklist = [
	{
		title: "Transfers within the bank",
		body: "Move money between Maendeleo Bank accounts — fast, secure and available 24/7.",
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
		<div
			aria-hidden
			className="mx-auto w-[260px] rounded-3xl border border-hairline bg-white p-3 shadow-lift-2"
		>
			<div className="rounded-2xl bg-canvas-soft px-5 pb-6 pt-5">
				<div className="mx-auto h-1 w-12 rounded-full bg-hairline" />
				<p className="mt-6 text-[10px] font-normal uppercase leading-[1.15] tracking-[0.1px] text-ink-mute">
					Maendeleo Bank Mobile
				</p>
				<p className="tnum mt-2 text-[32px] font-light leading-[1.1] tracking-display-lg text-brand">
					*150*52#
				</p>
				<div className="mt-6 grid grid-cols-3 gap-2">
					{["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map(
						(key) => (
							<div
								key={key}
								className="flex h-11 items-center justify-center rounded-lg border border-hairline bg-white text-[15px] font-light text-ink"
							>
								{key}
							</div>
						),
					)}
				</div>
				<div className="mt-4 flex h-11 items-center justify-center rounded-full bg-brand text-[14px] font-normal text-white">
					Dial now
				</div>
			</div>
		</div>
	);
}

export function UssdBand() {
	return (
		<section className="bg-canvas-soft">
			<Container className="py-16 md:py-24">
				<div className="grid items-center gap-12 lg:grid-cols-2">
					<div>
						<Eyebrow>Digital banking</Eyebrow>
						<h2 className="mt-3 text-[32px] font-light leading-[1.15] tracking-display-xl text-ink md:text-[48px]">
							Banking at your fingertips
						</h2>
						<p className="tnum mt-4 text-[26px] font-light leading-[1.1] tracking-display-lg text-brand md:text-[32px]">
							Dial *150*52#
						</p>
						<p className="mt-4 max-w-md text-base font-light leading-[1.4] text-ink-secondary">
							Maendeleo Bank is committed to convenient, secure and innovative
							banking through our mobile banking platform. Access our services
							using the USSD code *150*52# for a seamless banking experience —
							no smartphone or internet connection needed.
						</p>
						<ul className="mt-8 flex flex-col gap-5">
							{checklist.map((item) => (
								<li key={item.title} className="flex gap-3">
									<span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-subdued text-brand">
										<Check className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
									</span>
									<div>
										<p className="text-[15px] font-normal text-ink">{item.title}</p>
										<p className="mt-0.5 text-[14px] font-light text-ink-mute">
											{item.body}
										</p>
									</div>
								</li>
							))}
						</ul>
						<div className="mt-10">
							<PillLink href="/digital-banking">More on Digital Banking</PillLink>
						</div>
					</div>
					<PhoneMockup />
				</div>
			</Container>
		</section>
	);
}

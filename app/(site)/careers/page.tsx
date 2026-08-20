import type { Metadata } from "next";
import { Briefcase, FileDown, Mail, ShieldAlert, Users } from "lucide-react";
import {
	ArrowLink,
	Container,
	PageHero,
	SectionHeading,
} from "@/components/site/primitives";
import { getPublishedCareers } from "@/lib/content";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
	title: "Careers",
	description:
		"Career opportunities at Maendeleo Bank PLC, join a dynamic, innovative and inclusive team driving financial inclusion across Tanzania.",
	alternates: { canonical: "/careers" },
	openGraph: {
		title: "Careers",
		description:
			"Career opportunities at Maendeleo Bank PLC, join a dynamic, innovative and inclusive team driving financial inclusion across Tanzania.",
		url: "/careers",
	},
};

interface Vacancy {
	title: string;
	location: string;
	positions: string;
	deadline: string;
	closed: boolean;
	summary: string;
	requirements: string;
	pdf?: string;
}

const hardcodedVacancies: Vacancy[] = [
	{
		title: "Relationship Manager, Trade Finance",
		location: "Dar es Salaam",
		positions: "1 position",
		deadline: "25 May 2026",
		closed: true,
		summary:
			"Drive growth, innovation and strong customer relationships in trade finance, relationship management and corporate banking.",
		requirements: "Experience in trade finance, relationship management and corporate banking.",
		pdf: "https://maendeleobank.co.tz/wp-content/uploads/2026/05/RELATIONSHIP-MANAGER.pdf",
	},
	{
		title: "Relationship Officers, SME (3) and Micro (1)",
		location: "Arusha",
		positions: "4 positions",
		deadline: "3 October 2025",
		closed: true,
		summary:
			"Manage and grow a portfolio of SME clients with tailored financial solutions, identifying business opportunities, assessing credit needs, preparing loan proposals and ensuring timely service delivery.",
		requirements:
			"Bachelor's degree in business management, banking and finance or a related field. Two years' experience in similar roles in banking or financial institutions is preferred.",
		pdf: "https://maendeleobank.co.tz/wp-content/uploads/2025/09/job-post-arusha.pdf",
	},
	{
		title: "Bank Officers, Teller, Customer Service, Back Office, Agency Banking, Direct Sales",
		location: "Arusha",
		positions: "11 positions",
		deadline: "3 October 2025",
		closed: true,
		summary:
			"Deliver high-quality customer service while performing teller and operational duties, handling day-to-day transactions, responding to enquiries, promoting banking products and ensuring compliance with internal policies and regulatory standards.",
		requirements:
			"Bachelor's degree from a recognized university. Experience in similar roles in banking or financial institutions is an added advantage.",
		pdf: "https://maendeleobank.co.tz/wp-content/uploads/2025/09/job-post-arusha.pdf",
	},
];

export default async function CareersPage() {
	// F02: CMS vacancies win when HR has published any; the hardcoded list
	// below is the fallback while the CMS is empty or unconfigured.
	const cmsCareers = await getPublishedCareers();
	const now = Date.now();
	const vacancies: Vacancy[] =
		cmsCareers.length > 0
			? cmsCareers.map((job) => {
					const deadlineMs = job.deadline
						? new Date(job.deadline).getTime()
						: null;
					return {
						title: job.title,
						location: job.location ?? "Dar es Salaam",
						positions: job.type ?? "",
						deadline: job.deadline ? formatDate(job.deadline) : "",
						closed: deadlineMs !== null ? deadlineMs < now : false,
						summary: job.description ?? "",
						requirements: "",
						pdf: job.pdf_url ?? undefined,
					};
				})
			: hardcodedVacancies;
	return (
		<>
			<PageHero
				eyebrow="Careers"
				title="Build the bank that builds Tanzania"
				lede="Maendeleo Bank Plc is committed to building a dynamic, innovative and inclusive team that drives financial inclusion across Tanzania."
				breadcrumb={[{ label: "Home", href: "/" }, { label: "Careers" }]}
			/>

			<section className="bg-white">
				<Container className="py-16 md:py-24">
					<SectionHeading
						eyebrow="Open roles"
						title="Current vacancies"
						lede="Applications go to hr@maendeleobank.co.tz, addressed to the Managing Director, with the position title as the email subject."
					/>

					<div className="mt-12 flex flex-col gap-6">
						{vacancies.map((job) => (
							<article
								key={job.title}
								className="rounded-xl border border-hairline bg-white p-8 transition-shadow hover:shadow-lift-1"
							>
								<div className="flex flex-wrap items-start justify-between gap-4">
									<div className="flex items-start gap-4">
										<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-subdued text-brand">
											<Briefcase className="h-5 w-5" strokeWidth={1.5} aria-hidden />
										</div>
										<div>
											<h3 className="text-[22px] font-light leading-[1.12] tracking-display-md text-ink">
												{job.title}
											</h3>
											<p className="mt-1 text-[13px] font-normal leading-[1.4] tracking-[-0.39px] text-ink-mute">
												{[job.location, job.positions].filter(Boolean).join(" · ")}
											</p>
										</div>
									</div>
									<span
										className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-normal uppercase leading-[1.15] tracking-[0.1px] ${
											job.closed
												? "bg-canvas-soft text-ink-mute"
												: "bg-brand-green-subdued text-brand-green-deep"
										}`}
									>
										{job.deadline
											? job.closed
												? `Closed. Deadline was ${job.deadline}`
												: `Open, closes ${job.deadline}`
											: "Open"}
									</span>
								</div>
								<p className="mt-5 max-w-3xl text-[15px] font-light leading-[1.4] text-ink-mute">
									{job.summary}
								</p>
								{job.requirements ? (
									<p className="mt-3 max-w-3xl text-[15px] font-light leading-[1.4] text-ink-secondary">
										<span className="text-ink">Requirements: </span>
										{job.requirements}
									</p>
								) : null}
								{job.pdf ? (
									<ArrowLink href={job.pdf} external className="mt-5">
										<span className="inline-flex items-center gap-1.5">
											<FileDown className="h-4 w-4" strokeWidth={1.5} aria-hidden />
											Download the advert (PDF)
										</span>
									</ArrowLink>
								) : null}
							</article>
						))}
					</div>

					<p className="mt-8 text-[13px] font-normal leading-[1.4] tracking-[-0.39px] text-ink-mute">
						These listings are shown for reference. New vacancies are posted on
						this page as they open, check back soon.
					</p>
				</Container>
			</section>

			<section className="bg-canvas-soft">
				<Container className="py-16 md:py-24">
					<div className="grid gap-6 lg:grid-cols-3">
						<div className="rounded-xl border border-hairline bg-white p-8">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-subdued text-brand">
								<Mail className="h-5 w-5" strokeWidth={1.5} aria-hidden />
							</div>
							<h3 className="mt-6 text-[18px] font-light leading-[1.4] text-ink">
								How to apply
							</h3>
							<p className="mt-2 text-[15px] font-light leading-[1.4] text-ink-mute">
								Send an updated CV, your full contacts and three referees to{" "}
								<a
									href="mailto:hr@maendeleobank.co.tz"
									className="text-brand hover:text-brand-deep"
								>
									hr@maendeleobank.co.tz
								</a>{" "}
								addressed to the Managing Director. The email subject should be
								the title of the position you are applying for.
							</p>
						</div>
						<div className="rounded-xl border border-hairline bg-white p-8">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-subdued text-brand">
								<Users className="h-5 w-5" strokeWidth={1.5} aria-hidden />
							</div>
							<h3 className="mt-6 text-[18px] font-light leading-[1.4] text-ink">
								An inclusive workplace
							</h3>
							<p className="mt-2 text-[15px] font-light leading-[1.4] text-ink-mute">
								Maendeleo Bank Plc promotes an inclusive workplace, qualified
								women and people with disability are encouraged to apply. All
								positions carry a competitive salary and packages commensurate
								with qualifications and experience.
							</p>
						</div>
						<div className="rounded-xl border border-hairline bg-white p-8">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-subdued text-brand">
								<ShieldAlert className="h-5 w-5" strokeWidth={1.5} aria-hidden />
							</div>
							<h3 className="mt-6 text-[18px] font-light leading-[1.4] text-ink">
								No recruitment fees, ever
							</h3>
							<p className="mt-2 text-[15px] font-light leading-[1.4] text-ink-mute">
								Maendeleo Bank does not charge any fees at any stage of the
								application or recruitment process. Any request for payment
								should be treated as fraudulent.
							</p>
						</div>
					</div>
				</Container>
			</section>
		</>
	);
}

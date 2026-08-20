import type { Metadata } from "next";
import { FileDown, FileText, Scale } from "lucide-react";
import {
	ArrowLink,
	Container,
	PageHero,
} from "@/components/site/primitives";
import { getPublishedTenders } from "@/lib/content";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
	title: "Tenders",
	description:
		"Procurement opportunities at Maendeleo Bank PLC, requests for proposals and tender documents for qualified suppliers and partners.",
	alternates: { canonical: "/tenders" },
	openGraph: {
		title: "Tenders",
		description:
			"Procurement opportunities at Maendeleo Bank PLC, requests for proposals and tender documents for qualified suppliers and partners.",
		url: "/tenders",
	},
};

interface Tender {
	icon: "web" | "legal" | "events" | "creative";
	title: string;
	description: string;
	deadline?: string;
	pdf?: string;
	pdfLabel?: string;
}

const hardcodedTenders: Tender[] = [
	{
		icon: "web",
		title: "Request for Proposal (RFQ): Corporate Website Revamp & Redesign",
		description:
			"Maendeleo Bank Plc invites qualified web design and development companies to submit proposals for a full revamp of its corporate website, a modern, secure, multi-audience website that meets the disclosure standards expected of a DSE-listed company and functions as a genuine self-service channel for personal, business and institutional customers.",
		deadline: "31 August 2026",
		pdf: "https://maendeleobank.co.tz/wp-content/uploads/2026/08/Corporate-Website-Redesign-and-Development-RFQ-31.08.26.pdf",
		pdfLabel: "Download the RFQ (PDF)",
	},
	{
		icon: "events",
		title: "Request for Proposal (RFP): Events and Experiential Marketing Services",
		description:
			"Qualified and experienced events and experiential marketing suppliers are invited to submit proposals for the planning, decor, branding execution and on-site delivery of the bank's corporate events, consistent with designs and briefs approved by the bank.",
		deadline: "25 August 2026",
		pdf: "https://maendeleobank.co.tz/wp-content/uploads/2026/08/RFP-Event-Planner-25.08.26.pdf",
		pdfLabel: "Download the RFP (PDF)",
	},
	{
		icon: "creative",
		title: "Request for Proposal (RFP): Creative and Social Media Management Services",
		description:
			"Qualified creative and digital communications agencies are invited to submit proposals for creative and social media management services for the bank.",
		deadline: "25 August 2026",
		pdf: "https://maendeleobank.co.tz/wp-content/uploads/2026/08/Creative-and-Digital-Comm-RFP-25.08.26.pdf",
		pdfLabel: "Download the RFP (PDF)",
	},
	{
		icon: "legal",
		title: "Legal Services: Security Documentation & Registration",
		description:
			"Qualified, experienced and reputable law firms are invited to submit proposals for legal services relating to security documentation and registration for the bank's credit facilities, strengthening collateral enforceability and supporting the bank's lending operations.",
	},
];

const icons = {
	web: FileText,
	legal: Scale,
	events: FileText,
	creative: FileText,
};

export default async function TendersPage() {
	// F02: CMS tenders win when any are published; hardcoded list is the
	// fallback while the CMS is empty or unconfigured.
	const cmsTenders = await getPublishedTenders();
	const tenders: Tender[] =
		cmsTenders.length > 0
			? cmsTenders.map((tender) => ({
					icon: "web" as const,
					title: tender.title,
					description: tender.description ?? "",
					deadline: tender.deadline ? formatDate(tender.deadline) : undefined,
					pdf: tender.pdf_url ?? undefined,
					pdfLabel: "Download the tender document (PDF)",
				}))
			: hardcodedTenders;
	return (
		<>
			<PageHero
				eyebrow="Procurement"
				title="Tenders and requests for proposals"
				lede="Maendeleo Bank Plc procures goods and services through open, competitive processes. Download each tender document for full requirements and submission instructions."
				breadcrumb={[{ label: "Home", href: "/" }, { label: "Tenders" }]}
				stat={{ value: "Open", label: "competitive procurement, published publicly" }}
			/>

			<section className="bg-white">
				<Container className="py-16 md:py-24">
					<div className="flex flex-col gap-6">
						{tenders.map((tender) => {
							const Icon = icons[tender.icon];
							return (
								<article
									key={tender.title}
									className="rounded-xl border border-hairline bg-white p-8 transition-shadow hover:shadow-lift-1"
								>
									<div className="flex flex-wrap items-start justify-between gap-4">
										<div className="flex items-start gap-4">
											<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-subdued text-brand">
												<Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
											</div>
											<h3 className="max-w-2xl text-[22px] font-light leading-[1.12] tracking-display-md text-ink">
												{tender.title}
											</h3>
										</div>
										{tender.deadline ? (
											<span className="inline-flex items-center rounded-full bg-brand-green-subdued px-3 py-1 text-[10px] font-normal uppercase leading-[1.15] tracking-[0.1px] text-brand-green-deep">
												Open, closes {tender.deadline}
											</span>
										) : (
											<span className="inline-flex items-center rounded-full bg-canvas-soft px-3 py-1 text-[10px] font-normal uppercase leading-[1.15] tracking-[0.1px] text-ink-mute">
												Details on enquiry
											</span>
										)}
									</div>
									<p className="mt-5 max-w-3xl text-[15px] font-light leading-[1.4] text-ink-mute">
										{tender.description}
									</p>
									{tender.pdf ? (
										<ArrowLink href={tender.pdf} external className="mt-5">
											<span className="inline-flex items-center gap-1.5">
												<FileDown className="h-4 w-4" strokeWidth={1.5} aria-hidden />
												{tender.pdfLabel}
											</span>
										</ArrowLink>
									) : null}
								</article>
							);
						})}
					</div>

					<p className="mt-8 max-w-3xl text-[13px] font-normal leading-[1.4] tracking-[-0.39px] text-ink-mute">
						Submission instructions, evaluation criteria and deadlines are set
						out in each tender document. For procurement enquiries, contact the
						head office at Luther House, P.O. Box 216, Dar es Salaam, or email{" "}
						<a
							href="mailto:info@maendeleobank.co.tz"
							className="text-brand hover:text-brand-deep"
						>
							info@maendeleobank.co.tz
						</a>
						.
					</p>
				</Container>
			</section>
		</>
	);
}

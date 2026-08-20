import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLink, Container, PageHero } from "@/components/site/primitives";
import { getNewsBySlug } from "@/lib/content";
import { formatDate } from "@/lib/format";

export const revalidate = 300;

interface ArticlePageProps {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({
	params,
}: ArticlePageProps): Promise<Metadata> {
	const { slug } = await params;
	const article = await getNewsBySlug(slug);
	if (!article) return { title: "News" };
	return {
		title: article.title,
		description: article.excerpt ?? undefined,
	};
}

export default async function NewsArticlePage({ params }: ArticlePageProps) {
	const { slug } = await params;
	const article = await getNewsBySlug(slug);
	if (!article) notFound();

	return (
		<>
			<PageHero
				eyebrow="News & Events"
				title={article.title}
				lede={
					article.published_at ? formatDate(article.published_at) : undefined
				}
				breadcrumb={[
					{ label: "Home", href: "/" },
					{ label: "News", href: "/news" },
					{ label: article.title },
				]}
			/>
			<section className="bg-white">
				<Container className="py-16 md:py-24">
					<article className="mx-auto max-w-3xl">
						{article.image_url ? (
							<div className="relative mb-10 aspect-[3/2] overflow-hidden rounded-2xl shadow-lift-2">
								<Image
									src={article.image_url}
									alt={article.title}
									fill
									className="object-cover"
									sizes="(min-width: 1024px) 768px, 100vw"
									priority
								/>
							</div>
						) : null}
						{article.body ? (
							article.body
								.split(/\n{2,}/)
								.map((paragraph) => (
									<p
										key={paragraph.slice(0, 40)}
										className="mb-5 text-body-lg text-ink-secondary"
									>
										{paragraph}
									</p>
								))
						) : (
							<p className="text-body-lg text-ink-secondary">
								{article.excerpt}
							</p>
						)}
						<ArrowLink href="/news" className="mt-10">
							All news and events
						</ArrowLink>
					</article>
				</Container>
			</section>
		</>
	);
}

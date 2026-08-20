import type { MetadataRoute } from "next";

const siteUrl =
	process.env.NEXT_PUBLIC_SITE_URL ?? "https://maendeleobank.co.tz";

const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
	{ path: "/", priority: 1, changeFrequency: "weekly" },
	{ path: "/personal-banking", priority: 0.9, changeFrequency: "monthly" },
	{ path: "/business-banking", priority: 0.9, changeFrequency: "monthly" },
	{ path: "/institutional", priority: 0.8, changeFrequency: "monthly" },
	{ path: "/loans", priority: 0.9, changeFrequency: "monthly" },
	{ path: "/digital-banking", priority: 0.8, changeFrequency: "monthly" },
	{ path: "/investor-relations", priority: 0.8, changeFrequency: "weekly" },
	{ path: "/about", priority: 0.7, changeFrequency: "monthly" },
	{ path: "/news", priority: 0.7, changeFrequency: "weekly" },
	{ path: "/careers", priority: 0.6, changeFrequency: "weekly" },
	{ path: "/tenders", priority: 0.6, changeFrequency: "weekly" },
	{ path: "/contact", priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
	return routes.map(({ path, priority, changeFrequency }) => ({
		url: `${siteUrl}${path}`,
		lastModified: new Date(),
		changeFrequency,
		priority,
	}));
}

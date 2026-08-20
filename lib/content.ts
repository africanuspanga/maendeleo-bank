/**
 * Public reads for the CMS tables (F02).
 *
 * Each read is wrapped in `unstable_cache` with a cache tag; the matching
 * admin server action calls `revalidateTag(tag, "max")` on publish so the
 * public page picks up new content. Every read degrades to an empty result
 * when Supabase is not configured or errors — public pages keep their
 * hardcoded fallback content in that case, so the site never breaks.
 *
 * Reads use the anon key: the migration's RLS policies already allow
 * anonymous reads of `status = 'published'` rows.
 */
import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";

import {
	isSupabaseConfigured,
	supabaseAnonKey,
	supabaseUrl,
} from "@/lib/supabase/config";

export interface PublicNews {
	id: string;
	slug: string;
	title: string;
	excerpt: string | null;
	body: string | null;
	image_url: string | null;
	published_at: string | null;
}

export interface PublicCareer {
	id: string;
	title: string;
	location: string | null;
	type: string | null;
	deadline: string | null;
	description: string | null;
	pdf_url: string | null;
}

export interface PublicTender {
	id: string;
	title: string;
	reference: string | null;
	deadline: string | null;
	description: string | null;
	pdf_url: string | null;
}

export interface PublicReport {
	id: string;
	title: string;
	category: "annual-report" | "agm-book" | "financial-statement" | "disclosure";
	year: number | null;
	file_url: string | null;
	published_at: string | null;
}

function anonClient() {
	return createClient(supabaseUrl, supabaseAnonKey, {
		auth: { persistSession: false },
	});
}

async function fetchNews(): Promise<PublicNews[]> {
	if (!isSupabaseConfigured()) return [];
	try {
		const { data, error } = await anonClient()
			.from("news")
			.select("id, slug, title, excerpt, body, image_url, published_at")
			.eq("status", "published")
			.order("published_at", { ascending: false });
		return error || !data ? [] : (data as PublicNews[]);
	} catch {
		return [];
	}
}

async function fetchCareers(): Promise<PublicCareer[]> {
	if (!isSupabaseConfigured()) return [];
	try {
		const { data, error } = await anonClient()
			.from("careers")
			.select("id, title, location, type, deadline, description, pdf_url")
			.eq("status", "published")
			.order("deadline", { ascending: false });
		return error || !data ? [] : (data as PublicCareer[]);
	} catch {
		return [];
	}
}

async function fetchTenders(): Promise<PublicTender[]> {
	if (!isSupabaseConfigured()) return [];
	try {
		const { data, error } = await anonClient()
			.from("tenders")
			.select("id, title, reference, deadline, description, pdf_url")
			.eq("status", "published")
			.order("deadline", { ascending: false });
		return error || !data ? [] : (data as PublicTender[]);
	} catch {
		return [];
	}
}

async function fetchReports(): Promise<PublicReport[]> {
	if (!isSupabaseConfigured()) return [];
	try {
		const { data, error } = await anonClient()
			.from("reports")
			.select("id, title, category, year, file_url, published_at")
			.eq("status", "published")
			.order("year", { ascending: false });
		return error || !data ? [] : (data as PublicReport[]);
	} catch {
		return [];
	}
}

export const getPublishedNews = unstable_cache(fetchNews, ["public-news"], {
	tags: ["news"],
	revalidate: 300,
});

export const getPublishedCareers = unstable_cache(
	fetchCareers,
	["public-careers"],
	{ tags: ["careers"], revalidate: 300 },
);

export const getPublishedTenders = unstable_cache(
	fetchTenders,
	["public-tenders"],
	{ tags: ["tenders"], revalidate: 300 },
);

export const getPublishedReports = unstable_cache(
	fetchReports,
	["public-reports"],
	{ tags: ["reports"], revalidate: 300 },
);

/** Single article for /news/[slug]; tagged "news" so publishes invalidate it. */
export async function getNewsBySlug(slug: string): Promise<PublicNews | null> {
	const all = await getPublishedNews();
	return all.find((item) => item.slug === slug) ?? null;
}

import { NextResponse } from "next/server";
import { getRates } from "@/lib/rates";

// Cached GET handler (Cache Components not enabled in this project, so the
// previous caching model applies): prerendered and revalidated every 6h.
export const dynamic = "force-static";
export const revalidate = 21600;

export async function GET() {
	const { rates, source, updatedAt } = await getRates();
	return NextResponse.json({ rates, source, updatedAt });
}

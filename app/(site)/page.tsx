import type { Metadata } from "next";
import { BankingZones } from "@/components/site/home/banking-zones";
import { CtaBand } from "@/components/site/home/cta-band";
import { ForexTicker } from "@/components/site/home/forex-ticker";
import { ForexWidget } from "@/components/site/home/forex-widget";
import { HeritageBand } from "@/components/site/home/heritage-band";
import { Hero } from "@/components/site/home/hero";
import { NewsBand } from "@/components/site/home/news-band";
import { QuickActions } from "@/components/site/home/quick-actions";
import { UssdBand } from "@/components/site/home/ussd-band";

export const metadata: Metadata = {
	title: { absolute: "Maendeleo Bank PLC | Together in Progress" },
	description:
		"Maendeleo Bank PLC is a Tanzanian national commercial bank listed on the DSE (MBP). Personal, business and institutional banking, loans and digital banking across Tanzania.",
	alternates: { canonical: "/" },
	openGraph: {
		title: "Maendeleo Bank PLC | Together in Progress",
		description:
			"Maendeleo Bank PLC is a Tanzanian national commercial bank listed on the DSE (MBP). Personal, business and institutional banking, loans and digital banking across Tanzania.",
		url: "/",
	},
};

export default function HomePage() {
	return (
		<>
			<Hero />
			<ForexTicker />
			<QuickActions />
			<BankingZones />
			<ForexWidget />
			<UssdBand />
			<NewsBand />
			<HeritageBand />
			<CtaBand />
		</>
	);
}

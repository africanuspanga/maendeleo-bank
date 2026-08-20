import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Maendeleo Bank PLC",
		short_name: "Maendeleo Bank",
		description:
			"Maendeleo Bank PLC is a Tanzanian national commercial bank listed on the Dar es Salaam Stock Exchange (MBP). Personal, business and institutional banking across Tanzania.",
		start_url: "/",
		display: "standalone",
		background_color: "#ffffff",
		theme_color: "#843b8d",
		icons: [
			{
				src: "/favicon.ico",
				sizes: "any",
				type: "image/x-icon",
			},
			{
				src: "/icon.png",
				sizes: "512x512",
				type: "image/png",
			},
			{
				src: "/apple-icon.png",
				sizes: "180x180",
				type: "image/png",
			},
		],
	};
}

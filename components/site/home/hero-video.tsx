"use client";

import { useEffect, useState } from "react";

/**
 * Renders the hero background video only when it can actually do its job:
 * never under `prefers-reduced-motion`, never on `saveData` connections.
 * The poster <img> in hero.tsx stays underneath either way, so the hero
 * has content at 0 ms regardless. (F01)
 */
export function HeroVideo() {
	const [enabled, setEnabled] = useState(false);

	useEffect(() => {
		const reducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		const connection = (
			navigator as Navigator & { connection?: { saveData?: boolean } }
		).connection;
		if (!reducedMotion && !connection?.saveData) {
			setEnabled(true);
		}
	}, []);

	if (!enabled) return null;

	return (
		<video
			className="hero-video absolute inset-0 h-full w-full object-cover"
			src="/Bandari-Towers-Hero-Video.mp4"
			poster="/hero-poster.webp"
			autoPlay
			muted
			loop
			playsInline
			preload="metadata"
			aria-label="Bandari Towers on the Dar es Salaam waterfront"
		/>
	);
}

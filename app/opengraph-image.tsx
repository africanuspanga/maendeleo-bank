import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Maendeleo Bank PLC — Together in Progress";

export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

export default async function Image() {
	const logoData = await readFile(
		join(process.cwd(), "public", "Maendeleo-bank-logo.png"),
	);
	const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				background: "linear-gradient(135deg, #5b2463 0%, #843b8d 60%, #a85cb1 100%)",
				padding: 64,
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					background: "#ffffff",
					borderRadius: 32,
					padding: "56px 72px",
					boxShadow: "0 24px 64px rgba(0, 0, 0, 0.25)",
				}}
			>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src={logoSrc} width={720} height={156} alt="Maendeleo Bank PLC" />
			</div>
			<div
				style={{
					marginTop: 48,
					fontSize: 40,
					color: "#ffffff",
					fontWeight: 300,
					letterSpacing: 2,
				}}
			>
				maendeleobank.co.tz
			</div>
		</div>,
		{ ...size },
	);
}

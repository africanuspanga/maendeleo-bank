import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FloatingActions } from "@/components/floating-actions";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

/* Display/headings only (F17) — two weights, wired to --font-heading */
const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://maendeleobank.co.tz";

const description =
  "Maendeleo Bank PLC is a Tanzanian national commercial bank listed on the Dar es Salaam Stock Exchange (MBP). Personal, business and institutional banking, loans and digital banking across Tanzania — your trusted partner in development.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Maendeleo Bank PLC | Together in Progress",
    template: "%s | Maendeleo Bank PLC",
  },
  description,
  applicationName: "Maendeleo Bank PLC",
  keywords: [
    "Maendeleo Bank",
    "Maendeleo Bank PLC",
    "Tanzania bank",
    "banking in Tanzania",
    "personal banking Tanzania",
    "business banking Tanzania",
    "institutional banking",
    "loans Tanzania",
    "digital banking Tanzania",
    "MB Mobile",
    "Dar es Salaam Stock Exchange",
    "MBP shares",
  ],
  authors: [{ name: "Maendeleo Bank PLC", url: siteUrl }],
  creator: "Maendeleo Bank PLC",
  publisher: "Maendeleo Bank PLC",
  category: "Financial Services",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_TZ",
    url: "/",
    siteName: "Maendeleo Bank PLC",
    title: "Maendeleo Bank PLC | Together in Progress",
    description,
  },
  twitter: {
    card: "summary_large_image",
    site: "@Maendeleobanktz",
    creator: "@Maendeleobanktz",
    title: "Maendeleo Bank PLC | Together in Progress",
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#843b8d",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BankOrCreditUnion",
  name: "Maendeleo Bank PLC",
  alternateName: "Maendeleo Bank",
  url: siteUrl,
  logo: `${siteUrl}/Maendeleo-bank-logo.png`,
  image: `${siteUrl}/Maendeleo-bank-logo.png`,
  description,
  slogan: "Together in Progress",
  email: "info@maendeleobank.co.tz",
  telephone: "0800750089",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Luther House, Sokoine Drive",
    addressLocality: "Dar es Salaam",
    addressCountry: "TZ",
    postalCode: "P.O. Box 216",
  },
  sameAs: [
    "https://www.facebook.com/maendeleobankplctz",
    "https://www.instagram.com/maendeleobankplc/",
    "https://x.com/Maendeleobanktz",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <TooltipProvider>{children}</TooltipProvider>
        <FloatingActions />
      </body>
    </html>
  );
}

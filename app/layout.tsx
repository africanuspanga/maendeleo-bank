import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FloatingActions } from "@/components/floating-actions";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Maendeleo Bank PLC — Together in Progress",
    template: "%s | Maendeleo Bank PLC",
  },
  description:
    "Maendeleo Bank PLC is a Tanzanian national commercial bank listed on the Dar es Salaam Stock Exchange (MBP). Personal, business and institutional banking — your trusted partner in development.",
  icons: { icon: "/Maendeleo-Bank-Favicon.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <TooltipProvider>{children}</TooltipProvider>
        <FloatingActions />
      </body>
    </html>
  );
}

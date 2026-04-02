import type { Metadata } from "next";
import { Playfair_Display, Inter, DM_Serif_Display, Plus_Jakarta_Sans, DM_Sans, Urbanist } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NetjesOnline — AI Automatiseringen & Websites voor MKB",
  description:
    "AI-automatiseringen en professionele websites voor MKB-bedrijven. Stop met handmatig werk — binnen weken operationeel.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="nl"
      className={`${playfair.variable} ${inter.variable} ${urbanist.variable}`}
    >
      <body className={`font-[family-name:var(--font-inter)] antialiased ${dmSerifDisplay.variable} ${plusJakartaSans.variable} ${dmSans.variable}`}>
        {children}
      </body>
    </html>
  );
}

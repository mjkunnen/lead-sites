import type { Metadata } from "next";
import { Playfair_Display, Inter, DM_Serif_Display, Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
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

export const metadata: Metadata = {
  title: "NetjesOnline — Professionele Websites voor MKB",
  description:
    "Webdesign bureau gespecialiseerd in professionele websites voor MKB-bedrijven. Van ontwerp tot oplevering in 5 werkdagen.",
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
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className={`font-[family-name:var(--font-inter)] antialiased ${dmSerifDisplay.variable} ${plusJakartaSans.variable} ${dmSans.variable}`}>
        {children}
      </body>
    </html>
  );
}

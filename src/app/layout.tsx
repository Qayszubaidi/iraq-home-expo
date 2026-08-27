import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingRegister from "@/components/FloatingRegister";
import ScrollProgress from "@/components/ScrollProgress";

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const display = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://iraqhomeexpo.com"),
  title: { default: "Iraq Home Expo 2027", template: "%s | Iraq Home Expo 2027" },
  description:
    "Iraq Home Expo 2027 — 12–15 May 2027 at Baghdad International Fair, Baghdad, Iraq.",
  openGraph: {
    title: "Iraq Home Expo 2027",
    description: "Meet the home, interiors and residential market in Baghdad.",
    type: "website",
    images: ["/assets/hero-interior.webp"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>
        <ScrollProgress />
        <Header />
        <main>{children}</main>
        <FloatingRegister />
        <Footer />
      </body>
    </html>
  );
}

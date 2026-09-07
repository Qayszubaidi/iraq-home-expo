import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingRegister from "@/components/FloatingRegister";
import ScrollProgress from "@/components/ScrollProgress";
import { getPublicSiteSettings } from "@/lib/cms/public";

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

const GTM_ID = "GTM-K4TSR6C3";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cmsSettings = await getPublicSiteSettings();

  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <head>
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>

        <ScrollProgress />
        <Header cmsSettings={cmsSettings} />
        <main>{children}</main>
        <FloatingRegister />
        <Footer cmsSettings={cmsSettings} />
      </body>
    </html>
  );
}

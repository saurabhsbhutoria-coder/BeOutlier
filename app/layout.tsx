import type { Metadata, Viewport } from "next";
import { Anton, Archivo_Black, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { MetaPixel } from "@/components/tracking/MetaPixel";
import { GoogleAnalytics } from "@/components/tracking/GoogleAnalytics";
import { AttributionCapture } from "@/components/tracking/AttributionCapture";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const archivo = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});
const inter = Inter_Tight({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "BeOutlier. A school beyond classrooms.",
    template: "%s · BeOutlier",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: "BeOutlier",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#1b1f4b",
  width: "device-width",
  initialScale: 1,
};

/**
 * Runs before first paint: removes no-js and applies the remembered
 * Student / Parent mode (or ?mode=parent from an ad link), so there is no flash.
 */
const bootScript = `(function(){var d=document.documentElement;d.classList.remove('no-js');try{var q=new URLSearchParams(location.search).get('mode');var m=(q==='parent'||q==='student')?q:localStorage.getItem('bo_mode');if(q)localStorage.setItem('bo_mode',q);if(m==='parent')d.setAttribute('data-mode','parent');}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      data-mode="student"
      data-scroll-behavior="smooth"
      className={`no-js ${anton.variable} ${archivo.variable} ${inter.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        {children}
        <AttributionCapture />
        <MetaPixel />
        <GoogleAnalytics />
      </body>
    </html>
  );
}

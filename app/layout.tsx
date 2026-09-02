import type { Metadata } from "next";
import { Poppins, Satisfy } from "next/font/google";
import { siteConfig } from "@/lib/siteConfig";
import "./globals.css";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { getMenuItems } from "@/lib/api";
import { developer, developerAttributionGraph } from "@/lib/developer-attribution";

const SITE_URL = "https://lovelytrips.com.np";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

const satisfy = Satisfy({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-satisfy",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    creator: developer.name,
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = await getMenuItems();

  return (
    <html lang="en" className={`${poppins.variable} ${satisfy.variable}`}>
      <body>
        <Nav items={menuItems} />
        {children}
        <Footer/>
        <script
          id="schema-attribution"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(developerAttributionGraph(siteConfig.name, SITE_URL)),
          }}
        />
      </body>
    </html>
  );
}

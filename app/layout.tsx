import type { Metadata } from "next";
import { Poppins, Satisfy } from "next/font/google";
import "./globals.css";

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
  title: "Lovable App",
  description: "Lovable Generated Project",
  authors: [{ name: "Lovable" }],
  openGraph: {
    title: "Lovable App",
    description: "Lovable Generated Project",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Lovable",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${satisfy.variable}`}>
      <body>{children}</body>
    </html>
  );
}

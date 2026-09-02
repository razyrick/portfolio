import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import {
  SOCIAL_IMAGE_ALT,
  SOCIAL_IMAGE_HEIGHT,
  SOCIAL_IMAGE_PATH,
  SOCIAL_IMAGE_WIDTH,
  absoluteUrl,
  CANONICAL_ORIGIN,
} from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const DEFAULT_TITLE =
  "John Charlie Catedrilla — AI & Full-Stack Product Engineer";
const DEFAULT_DESCRIPTION =
  "Portfolio of John Charlie Catedrilla (razyrick), an AI and full-stack product engineer building production web applications end to end.";

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_ORIGIN),
  title: {
    default: DEFAULT_TITLE,
    template: "%s — John Charlie Catedrilla",
  },
  description: DEFAULT_DESCRIPTION,
  authors: [{ name: "John Charlie Catedrilla" }],
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "website",
    siteName: "John Charlie Catedrilla",
    locale: "en_US",
    url: absoluteUrl("/"),
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: SOCIAL_IMAGE_PATH,
        width: SOCIAL_IMAGE_WIDTH,
        height: SOCIAL_IMAGE_HEIGHT,
        alt: SOCIAL_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [SOCIAL_IMAGE_PATH],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}

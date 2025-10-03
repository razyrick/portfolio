import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Charlie's Portfolio",
  description: "Portfolio of John Charlie Catedrilla (razyrick) - Full Stack Developer specializing in React, Next.js, Node.js, Python, and AI/ML technologies including ElizaOS and CrewAI.",
  keywords: ["John Charlie Catedrilla", "razyrick", "Full Stack Developer", "React", "Next.js", "AI Engineer", "Machine Learning", "TypeScript", "Node.js", "Python"],
  authors: [{ name: "John Charlie Catedrilla" }],
  openGraph: {
    title: "Charlie's Portfolio",
    description: "Portfolio showcasing expertise in Frontend, Backend, and AI/ML technologies",
    type: "website",
  },
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
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Martin Manjoro – Software Developer",
  description:
    "Software developer based in Harare, Zimbabwe. I build thoughtful, performant systems that bridge elegant design with solid engineering.",
  openGraph: {
    title: "Martin Manjoro – Software Developer",
    description: "I make systems come alive.",
    url: "https://martinmanjoro.vercel.app",
    siteName: "Martin Manjoro",
    locale: "en_US",
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
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${spaceMono.variable} antialiased`}
      >
        <Navbar />
        <main className="relative z-2 pb-17 md:pb-0 md:pt-16">{children}</main>
      </body>
    </html>
  );
}

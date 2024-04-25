import "./globals.css";

import Navbar from "@/components/nav-bar";
import Footer from "@/components/footer";

import type { Metadata } from "next";
import { KodeMono } from "./font/font";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio | Martin Manjoro",
  description: "My Personal Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={`${inter.className} ${KodeMono.variable} bg-primary text-white`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

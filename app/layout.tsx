import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}

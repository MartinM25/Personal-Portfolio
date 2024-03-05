import localFont from "next/font/local";

export const kodeMono = localFont({
  src: [
    {
      path: "KodeMono-Bold.woff2",
      weight: "700",
      style: "normal"
    },
    {
      path: "KodeMono-Medium.woff2",
      weight: "500",
      style: "normal"
    },
    {
      path: "KodeMono-Regular.woff2",
      weight: "400",
      style: "normal"
    },
    {
      path: "KodeMono-SemiBold.woff2",
      weight: "600",
      style: "normal"
    }
  ],
  variable: "--kodeMono",
  display: "swap",
})
import localFont from "next/font/local";

export const kodeMono = localFont({
  src: [
    {
      path: "kodeMono-Bold.woff2",
      weight: "700",
      style: "normal"
    },
    {
      path: "kodeMono-Medium.woff2",
      weight: "500",
      style: "normal"
    },
    {
      path: "kodeMono-Regular.woff2",
      weight: "400",
      style: "normal"
    },
    {
      path: "kodeMono-SemiBold.woff2",
      weight: "600",
      style: "normal"
    }
  ],
  variable: "--kodeMono",
  display: "swap",
})
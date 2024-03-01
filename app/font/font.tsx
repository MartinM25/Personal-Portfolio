import localFont from "next/font/local";

export const kodeMono = localFont({
  src: [
    {
      path: "kodeMono-Bold.ttf",
      weight: "700",
      style: "normal"
    },
    {
      path: "kodeMono-Medium.ttf",
      weight: "500",
      style: "normal"
    },
    {
      path: "kodeMono-Regular.ttf",
      weight: "400",
      style: "normal"
    },
    {
      path: "kodeMono-SemiBold.ttf",
      weight: "600",
      style: "normal"
    }
  ],
  variable: "--kodeMono",
  display: "swap",
})
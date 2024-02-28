import { HiBeaker, HiUser } from "react-icons/hi";
import nextjslogo from "@/public/SVG/next.svg";
import shadcnlogo from "@/public/SVG/shadcn.svg";
import sanitylogo from "@/public/PNG/sanity.png";
import tailwindlogo from "@/public/SVG/tailwind.svg";

export const HEADER_LINKS = [
  {
    title: "About",
    href: "/about",
    icon: HiUser,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: HiBeaker,
  },
]

export const FOOTER_LINKS = [
  {
    title: "Next.js",
    href: "https://nextjs.org",
    logo: nextjslogo
  },
  {
    title: "Sanity",
    href: "https://sanity.io",
    logo: sanitylogo
  },
  {
    title: "Shadcn/ui",
    href: "https://ui.shadcn.com",
    logo: shadcnlogo
  },
  {
    title: "Tailwind",
    href: "https://tailwindcss.com",
    logo: tailwindlogo
  },
]
import nextjslogo from "@/public/SVG/next.svg";
import shadcnlogo from "@/public/SVG/shadcn.svg";
import sanitylogo from "@/public/PNG/sanity.png";
import tailwindlogo from "@/public/SVG/tailwind.svg";

import { HiBeaker, HiUser, HiHome } from "react-icons/hi";
import { BiLogoGithub, BiLogoTwitter, BiLogoInstagram, BiLogoLinkedinSquare } from "react-icons/bi";

export const HEADER_LINKS = [
  {
    title: "Home",
    href: "/",
    icon: HiHome,
  },
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

export const SOCIALS = [
  {
    name: "GitHub",
    url: "https://github.com/MartinM25",
    icon: BiLogoGithub,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/martin-t-manjoro/",
    icon: BiLogoLinkedinSquare,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/martin_manjoro",
    icon: BiLogoTwitter,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/cozzyboimartin/",
    icon: BiLogoInstagram,
  },
]
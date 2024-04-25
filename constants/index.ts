import { HiBeaker, HiUser, HiHome, HiBriefcase, HiPhone } from "react-icons/hi";
import { BiLogoGithub, BiLogoTwitter, BiLogoInstagram, BiLogoLinkedinSquare } from "react-icons/bi";

export const HEADER_LINKS = [
  {
    title: "Home",
    href: "/",
    icon: HiHome,
  },
  {
    title: "About",
    href: "/#about",
    icon: HiUser,
  },
  {
    title: "Experience",
    href: "/#work",
    icon: HiBriefcase,
  },
  {
    title: "Projects",
    href: "/#projects",
    icon: HiBeaker,
  },
  {
    title: "Contact",
    href: "/#contact",
    icon: HiPhone,
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
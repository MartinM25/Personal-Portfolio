import Link from "next/link";
import Image from "next/image";
import UnmountStudio from "./unmount";
import MobileMenu from "./mobile-menu";
import ThemeToggle  from "./theme-toggle";
import Logo from "../public/PNG/logo.png";

import { HEADER_LINKS } from "@/constants";

const Navbar = () => {
  return (
    <UnmountStudio>
      <header className="text-sm py-6 md:px-16 px-6 border-b dark:border-zinc-800 border-zinc-200 z-30 md:mb-28 mb-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* logo */}
          <Link href="/">
            <Image src={Logo} width={150} height={150} alt="logo" />
          </Link>
          {/* nav links */}
          <nav className="md:block hidden">
            <ul className="flex items-center gap-x-8">
              {HEADER_LINKS.map((link, id) => (
                <li key={id}>
                  <Link
                    href={link.href}
                    className="font-incognito dark:text-white text-zinc-600 dark:hover:text-primary-color hover:text-zinc-900 duration-300 text-base"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {/* mobile menu and theme toggle */}
          <div className="flex items-center gap-x-4">
            <ThemeToggle />
            <MobileMenu />
          </div>
        </div>  
      </header>
    </UnmountStudio>
  )
}
export default Navbar

"use client"

import Link from "next/link";
import Image from "next/image";
import UnmountStudio from "./unmount";
import MobileMenu from "./mobile-menu";
import Logo from "../public/PNG/logo.png";

import { HEADER_LINKS } from "@/constants";
import { useEffect, useState } from 'react';
import { ResumeButton } from "../components/button";

const Navbar = () => {
 
  return (
    <UnmountStudio>
      <header className="py-4 w-full bg-primary shadow-md fixed top-0 z-10" style={{transition: "transform 0.3s ease-in-out"}}>
        <div className="flex max-w-7xl mx-5 md:mx-20 justify-between items-center">
          {/* logo */}
          <Link href="/">
            <Image src={Logo} width={50} height={45} alt="logo" />
          </Link>

          <div className="flex items-center ">
            {/* nav links */}
            <nav className="md:block hidden flex-end">
              <ul className="flex items-center gap-x-8">
                {HEADER_LINKS.map((link, id) => (
                  <li 
                    key={id}
                    className="text-sm text-white hover:text-blue duration-300" 
                  >
                    <Link href={link.href}>
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>  
            </nav>
            
            <div className="pl-10 md:block hidden">
              <ResumeButton />
            </div>
            {/* mobile menu and theme toggle */}
            <div className="flex justify-center items-center">
              <MobileMenu />
            </div>
          </div>
        </div>  
      </header>
    </UnmountStudio>
  )
}
export default Navbar

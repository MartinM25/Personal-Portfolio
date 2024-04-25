"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "../public/PNG/logo.png";

import { useState } from "react";
import { HEADER_LINKS } from "@/constants";
import { HiOutlineX, HiMenuAlt3  } from "react-icons/hi";


export default function MobileMenu() {
  const [navShow, setNavShow] = useState(false);

  // function for toggling the mobile menu
  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = "auto";
      } else {
        document.body.style.overflow = "hidden";
      }
      return !status;
    });
  };

  return (
    <>
      {/* toggle button - hidden on medium and large devices */}
      <button
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        className="md:hidden"
      >
        <HiMenuAlt3 className="text-xl w-8 h-8" />
      </button>
      <div
        className={`md:hidden fixed left-0 top-0 z-10 h-full w-full transform duration-[600ms] ease-[cubic-bezier(0.7,0,0,1)] dark:bg-zinc-900 bg-primary ${
          navShow ? "translate-x-0 rounded-none" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between pt-4 mx-5">
          {/* logo */}
          <Link href="/" onClick={onToggleNav}>
            <Image src={Logo} width={50} height={45} alt="logo" />
          </Link>
          {/* button for closing menu */}
          <button
            aria-label="Toggle Menu"
            onClick={onToggleNav}
            className={`md:hidden duration-500 ${
              !navShow ? "-rotate-[360deg]" : null
            }`}
          >
            <HiOutlineX className="text-xl w-8 h-8" />
          </button>
        </div>
        {/* nav links */}
        <nav className="flex flex-col mt-6">
          {HEADER_LINKS.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="flex items-center gap-x-2 font-incognito font-semibold text-lg dark:shadow-line-dark shadow-line-light p-6 group"
              onClick={onToggleNav}
            >
              <link.icon
                className="text-zinc-500 group-hover:dark:text-white group-hover:text-white duration-300"
                aria-hidden="true"
              />
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
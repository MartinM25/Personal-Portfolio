import Link from "next/link";
import UnmountStudio from "./unmount";

import { SOCIALS } from "@/constants";

const Footer = () => {
  return (
    <UnmountStudio>
      <footer className="border-t border-[#233554] mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-y-4 md:px-20 px-6 py-16">

          {/* Left Side: Text */}
          <div className="text-center md:text-start md:flex-1">
            <small>
              Designed and Developed{" "}
              <Link href="https://github.com/MartinM25" className="hover:underline">
                Martin Manjoro
              </Link>
            </small>
          </div>

          {/* Right Side: Icons */}
          <div className="flex justify-center md:justify-end items-center flex-wrap gap-x-5 gap-y-4 md:flex-1">
            {SOCIALS.map((social) => (
              <li key={social.name} className="list-none">
                <Link href={social.url} target="_blank" className="flex items-center group">
                  <social.icon
                    className="h-8 w-8 text-zinc-500 group-hover:text-[#c55545] transition-colors duration-300"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </div>

        </div>
      </footer>
    </UnmountStudio>
  )
}

export default Footer
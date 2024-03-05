import Image from "next/image";
import UnmountStudio from "./unmount";

import { FOOTER_LINKS } from "@/constants";


const Footer = () => {
  return (
    <UnmountStudio>
      <footer className="border-t dark:border-zinc-800 border-zinc-200  mt-10">
        <div className=" max-w-7xl mx-auto flex lg:flex-row flex-col items-center lg:justify-between justify-center gap-y-4 md:px-16 px-6 py-16">
          <div className="flex flex-col lg:items-end items-center lg:text-start text-center">
            <small className="text-zinc-500">
              Copyright &copy; Martin Manjoro {new Date().getFullYear()} All rights Reserved
            </small>
          </div>
          <div className="flex md:flex-row flex-col items-center gap-x-2">
            <h3 className="font-inter">Built with:</h3>
            <ul className="flex items-center gap-x-2 text-sm dark:text-zinc-600 text-zinc-400 md:mt-0 mt-3">
              {FOOTER_LINKS.map((link)=> (
                <li key={link.title}>
                  <a
                    href={link.href}
                    rel="noreferrer noopener"
                    target="_blank"
                    className="flex items-center gap-x-2 dark:text-white text-zinc-600 hover:underline"
                  >
                  <Image
                    src={link.logo}
                    width={20}
                    height={20}
                    alt="nextjs logo"
                  />{" "}
                  {link.title}
                </a>
              </li>           
              ))}  
            </ul>
          </div>    
        </div>
      </footer>
    </UnmountStudio>
  )
}

export default Footer
import { SOCIALS } from "@/constants";
import Link from "next/link";

const Social = () => {
  return (
    <ul className="flex items-center flex-wrap gap-x-5 gap-y-4 my-10">
      {SOCIALS.map((social) => (
        <li key={social.name}>
          <Link href={social.url} target="_blank" className="flex items-center border-b border-b-zinc-500 group">
            <social.icon
              className="flex-shrink-0 h-5 w-5 text-zinc-500 group-hover:text-[#c55545]  duration-300"
              aria-hidden="true"
            />{" "}
            &nbsp;
            <span className="">{social.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Social


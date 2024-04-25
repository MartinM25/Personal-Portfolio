import Link from "next/link";
import HashScroll from "./ui/hash-scroll";

import { BiLinkExternal } from "react-icons/bi";
import { PortableTextComponents } from "@portabletext/react";

export const CustomPortableText: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-2 mb-6">{children}</p>,
    h2: ({ children }) => (
      <h2
        id={children // TODO: Export slugify code to reusable function
          ?.toString()
          .toLowerCase()
          .replaceAll(/[^-\w]+/g, "-")
          .replaceAll(/--+/g, "-")
          .replace(/^-|-$/g, "")}
        className="before:content-['#'] before:hidden hover:before:sm:inline-block hover:before:hidden before:absolute lg:before:-left-5 before:-left-4 lg:before:text-2xl before:text-xl block before:top-1/2 before:-translate-y-1/2 before:opacity-80 before:text-zinc-500 relative font-bold tracking-tight lg:text-4xl text-3xl text-zinc-100 my-8"
      >
        <HashScroll text={children} />
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        id={children
          ?.toString()
          .toLowerCase()
          .replaceAll(/[^-\w]+/g, "-")
          .replaceAll(/--+/g, "-")
          .replace(/^-|-$/g, "")}
        className="before:content-['#'] before:hidden hover:before:sm:inline-block hover:before:hidden before:absolute lg:before:-left-5 before:-left-4 lg:before:text-2xl before:text-xl before:top-1/2 before:-translate-y-1/2 before:opacity-80  before:text-zinc-500 relative block lg:font-bold font-semibold tracking-tight lg:text-3xl text-2xl  text-zinc-100 my-6"
      >
        <HashScroll text={children} />
      </h3>
    ),
    h4: ({ children }) => (
      <h4
        id={children
          ?.toString()
          .toLowerCase()
          .replaceAll(/[^-\w]+/g, "-")
          .replaceAll(/--+/g, "-")
          .replace(/^-|-$/g, "")}
        className="before:content-['#'] before:hidden hover:before:sm:inline-block hover:before:hidden before:absolute lg:before:-left-6 before:-left-4 lg:before:text-2xl before:text-xl before:top-1/2 before:-translate-y-1/2 before:opacity-80 before:text-zinc-500 relative inline-block font-semibold tracking-tight text-xl text-zinc-100 mb-2 mt-4"
      >
        <HashScroll text={children} />
      </h4>
    ),
  },
  marks: {
    em: ({ children }) => (
      <em className="font-semibold dark:text-primary-color text-tertiary-color">
        {children}
      </em>
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-zinc-300">
        {children}
      </strong>
    ),
    link: ({ children, value }) => {
      return (
        <Link
          className=" text-blue-400 hover:underline"
          href={value?.href}
          rel="noreferrer noopener"
          target="_blank"
        >
          {children} <BiLinkExternal className="inline" aria-hidden="true" />
        </Link>
      );
    },

  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-[square] ml-5">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal mt-5 ml-5">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-4">{children}</li>,
    number: ({ children }) => <li className="mb-4">{children}</li>,
  },
};

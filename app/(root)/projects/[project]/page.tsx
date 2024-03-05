import Link from "next/link";
import Image from "next/image";

import { Slide } from "@/components/animation";
import { PortableText } from "@portabletext/react";
import type { ProjectsType } from "@/sanity/types";
import { getSingleProject } from "@/sanity/actions";
import { CustomPortableText } from "@/components/custom-portable-text";

type Props = {
  params: {
    project: string
  }
}

export default async function Project({ params }: Props) {
  const slug = params.project;
  const project: ProjectsType = await getSingleProject(slug)

  return (
    <main className="max-w-6xl mx-auto lg:px-16 px-8">
    <Slide>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-start justify-between mb-4">
          <h1 className="font-KodeMono tracking-tight sm:text-5xl text-3xl mb-4 max-w-sm">
            {project.projectName}
          </h1>

          <Link
            href={project.projectUrl}
            rel="noreferrer noopener"
            target="_blank"
            className={`dark:text-white text-zinc-700 border border-zinc-200 dark:border-zinc-700 dark:hover:border-zinc-500 rounded-md px-4 py-2 ${
              !project.projectUrl
                ? "cursor-not-allowed opacity-80"
                : "cursor-pointer hover:border-zinc-400"
            }`}
          >
            {project.projectUrl ? "Explore" : "Coming Soon"}
          </Link>
        </div>

        <div className="relative w-full h-40 pt-[52.5%]">
          <Image
            className="rounded-xl border dark:border-zinc-800 border-zinc-100 object-cover"
            layout="fill"
            src={project.coverImage?.image}
            alt={project.coverImage?.alt || project.projectName}
            quality={100}
            placeholder={project.coverImage?.lqip ? `blur` : "empty"}
            blurDataURL={project.coverImage?.lqip || ""}
          />
        </div>

        <div className="mt-8 dark:text-zinc-400 text-zinc-600 leading-relaxed">
          <PortableText
            value={project.description}
            components={CustomPortableText}
          />
        </div>
      </div>
    </Slide>
  </main>
  )
}
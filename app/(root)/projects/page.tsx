import Link from "next/link";
import Image from "next/image";
import EmptyState from "@/components/empty-state";

import { Slide } from "@/components/animation";
import { getProjects } from "@/sanity/actions";
import type { ProjectsType } from "@/sanity/types";

export const revalidate = 10;

export default async function Projects() {
  // calling getProfile request
  const projects: ProjectsType[] = await getProjects();
  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6">
      <header className="mb-10">
        <Slide>
          <h1 className="max-w-3xl font-kodeMono font-semibold tracking-tight sm:text-5xl text-3xl mb-6 lg:leading-[3.7rem]">
            Projects
          </h1>
          <p className="max-w-2xl text-base dark:text-zinc-400 text-zinc-600 leading-relaxed">
            I've worked on tons of little projects over the years but
            these are the ones that I'm most proud of. Many of them
            are open-source, so if you see something that piques your
            interest, check out the code and contribute if you have
            ideas on how it can be improved."
          </p>
        </Slide>
      </header>
      <Slide delay={0.1}>
        {projects.length > 0 ? (
          <section className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mb-12">
            {projects.map((project) => (
              
                <Link
                  // 
                  href={`/projects/${project.slug}`}
                  key={project._id}
                  className="flex items-center gap-x-4 border border-zinc-200 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-500 p-4 rounded-lg"
                >
                  {/* #030c24] */}
                  <Image
                    src={project.logo}
                    width={60}
                    height={60}
                    alt={project.projectName}
                    className="rounded-md p-2"
                  />
                  <div>
                    <h2 className="text-lg tracking-wide mb-1">
                      {project.projectName}
                    </h2>
                    <div className="text-sm dark:text-zinc-400 text-zinc-600">
                      {project.tagline}
                    </div>
                  </div>
                </Link>
            ))}
          </section>
        ) : (
          <EmptyState value="Projects" />
        )}
      </Slide>
    </main>
  );
}

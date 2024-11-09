import Link from "next/link";
import ImageCarousel from "@/components/image-carousel";

import { Suspense } from "react";
import { Slide } from "@/components/animation";
import { PortableText } from "@portabletext/react";
import type { ProjectsType } from "@/sanity/types";
import { getSingleProject } from "@/sanity/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { BiLogoGithub, BiLinkExternal } from "react-icons/bi";
import { CustomPortableText } from "@/components/custom-portable-text";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  params: {
    project: string
  }
}

export default async function Project({ params }: Props) {

  const slug = params.project;
  const project: ProjectsType = await getSingleProject(slug)

  return (
    <Suspense fallback={<Loading />}>
      <main className="max-w-7xl mt-[130px] px-4 md:px-10 lg:px-20 w-full">
        <Slide>
          <div className="">
            <div className="">
              <div className="flex space-y-0.5 justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">{project.projectName}</h2>

                  <ul className="flex text-xs gap-x-3 mt-4">
                    {project.toolsUsed.map((language) => (
                      <li
                        key={language}
                        className="p-1 cursor-pointer hover:text-blue text-muted-foreground rounded-lg bg-[#1e293b]"
                      >
                        {language}
                      </li>
                    ))}
                  </ul>

                </div>
                <div className="flex gap-x-4 text-zinc-500 ">
                  {project.githubUrl && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Link href={project.githubUrl}>
                            <BiLogoGithub className="w-6 h-6 hover:text-blue cursor-pointer" />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent className="bg-[#1e293b] text-gray border-none">
                          <p>Github</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  {project.projectUrl && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Link href={project.projectUrl}>
                            <BiLinkExternal className="w-6 h-6 hover:text-blue cursor-pointer" />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent className="bg-[#1e293b] text-gray border-none">
                          <p>External Link</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
              <Separator className="my-6" />
            </div>

            {/* array of images */}
            <div className="mt-8 mx-auto">
              <ImageCarousel images={project.images} />
            </div>

            <div className="mt-8 text-zinc-400 mx-auto leading-relaxed">
              <PortableText
                value={project.description}
                components={CustomPortableText}
              />
            </div>
          </div>
        </Slide>
      </main>
    </Suspense>
  )
}

function Loading() {
  return (
    <div className="flex flex-col mt-[130px] space-y-6 px-4 md:px-10 lg:px-20 w-full max-w-7xl">
      <div className="space-y-4">
        <Skeleton className="h-8 bg-slate-800 w-[75%]" />
        <Skeleton className="h-4 bg-slate-800 w-[55%]" />
      </div>

      <Skeleton className="h-[200px] md:h-[280px] lg:h-[350px] rounded-xl bg-slate-800 w-[93%]" />

      <div className="space-y-4">
        <Skeleton className="h-8 bg-slate-800 w-[50%]" />
        <Skeleton className="h-4 bg-slate-800 w-[40%]" />
        <Skeleton className="h-4 bg-slate-800 w-[40%]" />
      </div>
    </div>
  )
}
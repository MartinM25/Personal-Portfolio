import Link from "next/link";
import ImageCarousel from "@/components/image-carousel";

import { Slide } from "@/components/animation";
import { PortableText } from "@portabletext/react";
import type { ProjectsType } from "@/sanity/types";
import { getSingleProject } from "@/sanity/actions";
import { Separator } from "@/components/ui/separator";
import { BiLogoGithub, BiLinkExternal } from "react-icons/bi";
import { CustomPortableText } from "@/components/custom-portable-text";

const programmingLanguages = ["Tailwind", "Shadcn", "Sanity", "TypeScript"];

type Props = {
  params: {
    project: string
  }
}

export default async function Project({ params }: Props) {
  
  const slug = params.project;
  const project: ProjectsType = await getSingleProject(slug)

  return (
    <main className="max-w-7xl mt-[130px] mx-5 md:mx-20">
    <Slide>
      <div className="">
        <div className="">
        <div className="flex space-y-0.5 justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{project.projectName}</h2>
            
            <ul className="flex text-xs gap-x-3 mt-4">
              {programmingLanguages.map((language) => (
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
              <Link href={project.githubUrl}>
                <BiLogoGithub className="w-10 h-10 hover:text-blue cursor-pointer" />
              </Link>
            )}
            {project.projectUrl && (
              <Link href={project.projectUrl}>
                <BiLinkExternal className="w-10 h-10 hover:text-blue cursor-pointer" />
              </Link>
            )}
          </div>
        </div>
        <Separator className="my-6" />

        </div>

        {/* array of images */}
          <div className="mt-8 mx-auto">
            <ImageCarousel images={project.images}  />
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
  )
}
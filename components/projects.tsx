import Link from "next/link";
import EmptyState from "@/components/empty-state";

import { CiFolderOn } from "react-icons/ci";
import { getProjects } from "@/sanity/actions";
import { HiArrowRight } from "react-icons/hi";
import type { ProjectsType } from "@/sanity/types";
import { BiLogoGithub, BiLinkExternal } from "react-icons/bi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "./ui/button";

export const revalidate = 10;

const Projects = async () => {
  // calling getProfile request
  const projects: ProjectsType[] = await getProjects();

  return (
    <main className="">
      {projects.length > 0 ? (
        <section className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 mb-12">
          {projects.map((project) => (
            <Card key={project._id} className="bg-primary border-[#233554] shadow-lg cursor-pointer hover:-translate-y-2 transition ease-in-out delay-150 duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CiFolderOn className="w-12 h-12 text-blue" />

                  <div className="flex gap-x-2 text-zinc-500 ">
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
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-x-2 pb-4">
                  <Avatar>
                    <AvatarImage src={project.logo} className="" />
                    <AvatarFallback>Logo</AvatarFallback>
                  </Avatar>

                  <h2 className="text-gray font-semibold text-xl">
                    {project.projectName}
                  </h2>
                </div>
                <p className="text-base text-[#a1a1aa] line-clamp-2">
                  {project.tagline}
                </p>
                <ul className="flex text-xs text-zinc-500 gap-x-3 mt-4">
                  {project.toolsUsed.map((tool, index) => (
                    <li
                      key={index}
                      className="p-1 rounded-lg bg-[#1e293b]"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="">
                <Button
                  asChild
                  className="bg-blue text-foreground w-full hover:bg-blue/60"
                >
                  <Link href={`/${project.slug}`} className="flex flex-row gap-x-3 items-center">
                    Read More
                    <HiArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </section>
      ) : (
        <EmptyState value="Projects" />
      )}
    </main>
  );
};

export default Projects;

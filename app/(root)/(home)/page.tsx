import Link from "next/link";
import Image from "next/image";
import Work from "@/components/work";
import Social from "@/components/socials";
import herosvg from "@/public/desk-setup.png";

import { getSkills } from "@/sanity/actions";
import { getProfile } from "@/sanity/actions";
import { Slide } from "@/components/animation";
import type { ProfileType, SkillsType } from "@/sanity/types";

export const revalidate = 10;

export default async function Home() {
  // calling getProfile request
  const profile: ProfileType[] = await getProfile();
  // calling getSkills request
  const skills: SkillsType[] = await getSkills();

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6 lg:mt-32 mt-20">
      <section className="flex xl:flex-row flex-col xl:items-center items-center xl:justify-center justify-between gap-x-12 mb-16">
        {profile &&
          profile.map((data) => (
            <div key={data._id} className="lg:max-w-2xl max-w-2xl">
              <Slide>
                <h1 className="font-kodeMono font-semibold tracking-tight text-4xl sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight lg:min-w-[700px] min-w-full">
                  {data.headline}
                </h1>
                <p className="text-base dark:text-zinc-400 text-zinc-600 leading-relaxed">
                  {data.shortBio}
                </p>
              </Slide>
              <Slide delay={0.1}>
                <Social />
              </Slide>
            </div>
          ))}
        <Slide delay={0.14}>
          <Image
            src={herosvg}
            width={450}
            height={350}
            alt="image of desktop setup"
          />
        </Slide>
      </section>

      <section className="">
        <Slide delay={0.16}>
          <div className="mb-16">
            <h2 className="font-kodeMono text-4xl mb-4 font-bold traking-tight">
              Skills & Tools
            </h2>
          </div>
        </Slide>
        <Slide delay={0.18}>
          <div className="grid xl:grid-cols-6 md:grid-cols-2 grid-cols-1 gap-5 mb-12">
            {skills.map((skill) => (
              <Link
                href={skill.url}
                key={skill._id}
                className="flex items-center border border-transparent gap-x-4 dark:hover:border-zinc-400 hover:border-zinc-200 p-2 rounded-lg"
              >
                <Image
                  src={skill.logo}
                  width={40}
                  height={40}
                  alt={skill.name}
                  className="bg-zinc-100 rounded-md p-2"
                />
                <div>
                  <h2 className="text-sm tracking-wide mb-1">{skill.name}</h2>
                </div>
              </Link>
            ))}
          </div>
        </Slide>
      </section>

      <Work />
    </main>
  );
}

import Link from "next/link"
import Image from "next/image"

import { Slide } from "./animation"
import { getSkills } from "@/sanity/actions"
import type { SkillsType } from "@/sanity/types"


export default async function Skills({ type }: { type: string }) {

  const skills: SkillsType[] = await getSkills();

  return (
    <section className="grid pt-4 xl:grid-cols-6 md:grid-cols-2 grid-cols-1 gap-5 mb-12">
      {skills.map((skill) => (
          <div 
            key={skill._id}
            className="flex items-center border border-transparent gap-x-4 dark:hover:border-zinc-400 hover:border-zinc-600 p-2 rounded-lg"
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
          </div>
        ))}
    </section>
  )
};
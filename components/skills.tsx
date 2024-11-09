import Image from "next/image"
import { Card } from "@/components/ui/card";
import { getSkills } from "@/sanity/actions"
import type { SkillsType } from "@/sanity/types"


const Skills = async () => {

  const skills: SkillsType[] = await getSkills();

  return (
    <section className="grid pt-4 xl:grid-cols-6 md:grid-cols-2 grid-cols-1 gap-5 mb-12">
      {skills.map((skill) => (
        <div
          key={skill._id}
          className="flex items-center border border-transparent gap-x-4 cursor-pointer hover:border-zinc-600 p-2 rounded-lg  hover:-translate-y-2 transition ease-in-out delay-75 duration-300"
        >
          <Image
            src={skill.logo}
            width={40}
            height={40}
            alt={skill.name}
            className="bg-[#1e293b] rounded-md p-2"
          />
          <div>
            <h2 className="text-sm tracking-wide mb-1">{skill.name}</h2>
          </div>
        </div>
      ))}
    </section>
  )
};

export default Skills;
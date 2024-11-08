import Image from "next/image"

import { Slide } from "@/components/animation"
import type { ProfileType } from "@/sanity/types"
import { PortableText } from "@portabletext/react"
import { CustomPortableText } from "@/components/custom-portable-text"

type AboutProps = {
  profile: ProfileType;
};

const About = ({ profile }: AboutProps) => {
  const { fullBio, softSkills, profileImage } = profile
  return (
    <>
      <div>
        <section className="relative grid lg:grid-cols-2 grid-cols-1">
          <div className="order-2 lg:order-none">
            <Slide>
              <div className="text-zinc-400 leading-relaxed">
                <PortableText value={fullBio} components={CustomPortableText} />
              </div>
              <div className="text-zinc-400 leading-relaxed">
                <PortableText value={softSkills} components={CustomPortableText} />
              </div>
            </Slide>
          </div>

          <aside className="mx-auto flex flex-col lg:justify-self-end gap-y-8 lg:order-1 order-none mb-12 ">
            <Slide delay={0.15}>
              <div className=" hover:scale-110 hover:cursor-pointer p-2 rounded">
                <Image
                  className="object-contain rounded transition duration-300 ease-in-out hover:scale-105"
                  src={profileImage.image}
                  width={300}
                  height={200}
                  quality={100}
                  alt={profileImage.alt}
                  blurDataURL={profileImage.lqip}
                  priority
                />
              </div>
            </Slide>
          </aside>
        </section>
      </div>


    </>
  )
}

export default About
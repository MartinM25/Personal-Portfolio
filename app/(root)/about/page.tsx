import Link from "next/link"
import Image from "next/image"

import { getProfile } from "@/sanity/actions"
import { Slide } from "@/components/animation"
import { Button } from "@/components/ui/button"
import type { ProfileType } from "@/sanity/types"
import { PortableText } from "@portabletext/react"
import { CustomPortableText } from "@/components/custom-portable-text"
import { BiEnvelope, BiLinkExternal, BiSolidDownload } from "react-icons/bi"
import Skills from "@/components/skills"

export default async function About(){

  // calling getProfile request
  const profile: ProfileType[] = await getProfile();

  return (
    <main className="relative lg:max-w-7xl mx-auto max-w-3xl md:px-16 px-6">
      {profile && 
        profile.map((data) => (
          <div key={data._id}>
            <section className="relative grid lg:grid-cols-2 grid-cols-1">
              <div className="order-2 lg:order-none">
                <Slide>
                  <h1 className="font-KodeMono font-semibold tracking-tight sm:text-5xl text-3xl lg:leading-tight mb-8">
                    My name is {data.fullName}. I currently reside in {data.location}.
                  </h1>
                  <div className="dark:text-zinc-400 text-zinc-600 leading-relaxed">
                    <PortableText value={data.fullBio} components={CustomPortableText} />
                  </div>
                </Slide>
              </div>

              <aside className="mx-auto flex flex-col lg:justify-self-end gap-y-8 lg:order-1 order-none mb-12 ">
                <Slide delay={0.15}>
                  <div className="">
                    <Image
                      className="rounded-2xl mb-4 object-cover max-h-96 min-h-96 bg-top align-middle"
                      src={data.profileImage.image}
                      width={400}
                      height={400}
                      quality={100} 
                      alt={data.profileImage.alt}
                      blurDataURL={data.profileImage.lqip}
                      priority
                    />
                    <div className="flex flex-row justify-between gap-4">
                      <Button variant="outline" className="justify-center gap-2 basis-[90%]">
                        View Resumé <BiLinkExternal className="text-base" />
                      </Button>
                      <Link  href="" className="basis-[10%]" title="Download Resume">
                        <Button variant="outline" size="icon">
                          <BiSolidDownload className="text-lg" aria-label="Download Resume"/> 
                        </Button>
                      </Link>
                    </div>
                  </div>  
                  <div className="py-4 text-center align-middle justify-center">
                    <Link
                      href={`mailto:${data.email}`}
                      className="flex items-center gap-x-2 duration-300 hover:underline"
                    >
                      <BiEnvelope className="text-medium" />
                      {data.email}
                    </Link>
                  </div>
                </Slide>
              </aside>
            </section>
            <section className="mt-4 max-w-2xl">
              <Slide delay={0.1}>
                <h2 className="font-KodeMono font-semibold text-4xl mb-8">Soft Skills</h2>
                <div className="dark:text-zinc-400 text-zinc-600 leading-relaxed">
                  <PortableText value={data.softSkills} components={CustomPortableText} />
                </div>
              </Slide>
            </section>

            <section className="mt-24 w-full">
              <Slide delay={0.14}>
                <h2 className="font-KodeMono font-semibold text-4xl mb-4">Expertise</h2>
                <p className="dark:text-zinc-400 text-zinc-600">
                  I&apos;ve spent few years working on my skills. In no particular
                  order, here are a few of them.
                </p>
                <div className="pt-10">
                  <h4 className="font-KodeMono font-semibold text-2xl">Technologies:</h4>
                  <Skills type="Technologies" />
                  <h4 className="font-KodeMono font-semibold text-2xl">Tools:</h4>
                  <Skills type="Tools" />
                  <h4 className="font-KodeMono font-semibold text-2xl">Platform:</h4>
                  <Skills type="Platform" />
                </div>
              </Slide>  
            </section>
          </div>
        ))  
      }
    </main>
  )
}

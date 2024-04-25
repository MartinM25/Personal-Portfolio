import Image from "next/image"

import { Slide } from "@/components/animation"
import type { ProfileType } from "@/sanity/types"
import { PortableText } from "@portabletext/react"
import { CustomPortableText } from "@/components/custom-portable-text"

type AboutProps = {
  profile: ProfileType;
};

const About = ({ profile }: AboutProps) => {
  const {fullBio, softSkills, profileImage} = profile
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
                    {/* <div className="flex flex-row justify-between gap-4">
                      <Link href="https://drive.google.com/file/d/195E10JOwYAuHdq785eW-8aXT82ZPEanC/view" className="">
                        <Button variant="outline" className="justify-center gap-2 basis-[90%]">
                          View Resumé <BiLinkExternal className="text-base" />
                        </Button>
                      </Link>
                      <Link  href="https://drive.usercontent.google.com/uc?id=195E10JOwYAuHdq785eW-8aXT82ZPEanC&export=download" className="basis-[10%]" title="Download Resume">
                        <Button variant="outline" size="icon">
                          <BiSolidDownload className="text-lg" aria-label="Download Resume"/> 
                        </Button>
                      </Link>
                    </div> */}
                  </div>  
                  {/* <div className="py-4 text-center align-middle justify-center">
                    <Link
                      href={`mailto:${data.email}`}
                      className="flex items-center gap-x-2 duration-300 hover:underline"
                    >
                      <BiEnvelope className="text-medium" />
                      {data.email}
                    </Link>
                  </div> */}
                </Slide>
              </aside>
            </section>
            {/* <section className="mt-4 max-w-2xl">
              <Slide delay={0.1}>
                <h2 className="font-KodeMono font-semibold text-4xl mb-8">Soft Skills</h2>
                <div className="dark:text-zinc-400 text-zinc-600 leading-relaxed">
                  <PortableText value={data.softSkills} components={CustomPortableText} />
                </div>
              </Slide>
            </section> */}

            {/* <section className="mt-24 w-full">
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
            </section> */}
          </div>
         
      
    </>
  )
}

export default About
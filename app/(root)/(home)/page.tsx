import Image from "next/image";
import herosvg from "@/public/desk-setup.svg"

import { getProfile } from "@/sanity/actions";
import { Slide } from "@/components/animation";
import type { ProfileType } from "@/sanity/types";

export const revalidate = 10;

export default async function Home() {

  // calling getProfile request
  const profile: ProfileType[] = await getProfile();


  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6 lg:mt-32 mt-20">
      <section className="flex xl:flex-row flex-col xl:items-center items-start xl:justify-center justify-between gap-x-12 mb-16">
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
                <></>
                {/* <Social type="social" /> */}
              </Slide>
            </div>
          ))}
        <Slide delay={0.14}>
          <Image
            src={herosvg}
            width={350}
            height={250}
            alt="image of desktop setup" 
          />
        </Slide>
      </section>
      <></>
    </main>
  );
}

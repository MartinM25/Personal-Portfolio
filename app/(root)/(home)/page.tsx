import Work from "@/components/work";
import Social from "@/components/socials";

import { getProfile } from "@/sanity/actions";
import { Slide } from "@/components/animation";
import type { ProfileType } from "@/sanity/types";

import Heading from "@/components/heading";
import About from "@/components/about";
import Projects from "@/components/projects";
import Contact from "@/components/contact";
import Skills from "@/components/skills";
import HeroAnimation from "@/components/hero-animation";

export const revalidate = 10;

export default async function Home() {
  // calling getProfile request
  const profile: ProfileType = await getProfile();

  return (
    <main className="max-w-7xl mt-[130px] mx-5 md:mx-20">

      {/* 1st section which contains hero element */}
      <section className="flex flex-col lg:flex-row items-center justify-between space-x-6">
        {profile && (
          <div className="lg:max-w-2xl max-w-2xl">
            <Slide>
              <p className="text-base font-bold pb-3 text-dark_gray leading-relaxed">
                Hey there, my name is
              </p>
              <h1 className="text-gray pb-4 text-4xl md:text-5xl lg:text-6xl font-extrabold lg:leading-[3.7rem] leading-tight">
                Martin Manjoro.
              </h1>
              <h1 className="font-extrabold pb-4 text-dark_gray tracking-tight text-4xl sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight lg:min-w-[780px] min-w-full">
                {profile.headline}.
              </h1>
              <p className="text-base text-zinc-400 leading-relaxed">
                {profile.shortBio}
              </p>
            </Slide>
            <Slide delay={0.1}>
              <Social />
            </Slide>
          </div>
        )}
        <Slide>
          <div className="w-[400px] h-[400px] flex-shrink-0">
            <HeroAnimation />
          </div>
        </Slide>

      </section>

      {/* 2nd section with the about element */}
      <section id="about" className="pt-[130px]">
        <Slide delay={0.16}>
          <Heading title="About Me" centerHorizontally={false} />
        </Slide>
        <Slide delay={0.18}>
          <About profile={profile} />
        </Slide>
      </section>

      {/* 3rd section with work experience  */}
      <section id="work" className="pt-[130px]">
        <Slide delay={0.20}>
          <Heading title="Work Experience" centerHorizontally={false} />
        </Slide>
        <Slide delay={0.22}>
          <Work />
        </Slide>
      </section>

      {/* 4th section with projects  */}
      <section id="projects" className="pt-[130px]">
        <Slide delay={0.24}>
          <Heading title="Projects" centerHorizontally={true} />
        </Slide>
        <Slide delay={0.26}>
          <Projects />
        </Slide>
      </section>

      {/* 5th section that shows skills */}
      <section className="pt-[130px]">
        <Slide delay={0.16}>
          <Heading title="Skills & Tools" centerHorizontally={true} />
        </Slide>
        <Slide delay={0.18}>
          <Skills />
        </Slide>
      </section>

      {/* 6th section for contact */}
      <section id="contact" className="py-[130px]">
        <Slide delay={0.24}>
          <Heading title="Get In Touch" centerHorizontally={true} />
        </Slide>
        <Slide delay={0.26}>
          <Contact email={profile.email} />
        </Slide>
      </section>


    </main>
  );
}

import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <>
      <div
        id="glow"
        className="fixed z-1 pointer-events-none w-95 h-95 rounded-full
                   -left-2499.75 -top-2499.75
                   transition-[left,top] duration-120
                   [background:radial-gradient(circle,rgba(200,80,42,.06)_0%,transparent_70%)]
                   hidden lg:block"
      />
      <Hero />
      <Work />
      <Projects />
      <About />
      <Contact />
    </>
  );
}

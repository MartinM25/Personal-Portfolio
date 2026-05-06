"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Replace with Sanity-fetched values later
const PHOTO_SRC = "/images/martin.jpg"; // drop your photo here

const STATS = [
  { num: 3,  suffix: "+", label: "Years of\nexperience" },
  { num: 20, suffix: "+", label: "Projects\nshipped"    },
  { num: 5,  suffix: "+", label: "Countries\nworked with" },
  { num: 99, suffix: "",  label: "Cups of\ncoffee"      },
];

const CURRENTLY = [
  { label: "Role",     value: "Frontend Dev @ Growit"  },
  { label: "Location", value: "Harare, Zimbabwe"        },
  { label: "Stack",    value: "Next.js · TypeScript"    },
];

export default function About() {
  const sectionRef  = useRef<HTMLElement>(null);
  const labelRef    = useRef<HTMLParagraphElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const storyRef    = useRef<HTMLDivElement>(null);
  const cardRef     = useRef<HTMLDivElement>(null);

  // counting animation state
  const [counts, setCounts] = useState(STATS.map(() => 0));
  const hasAnimated = useRef(false);

  // Scroll entrance + count trigger
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(labelRef.current, {
        opacity: 0, y: 20, duration: 0.6, ease: "expo.out",
        scrollTrigger: { trigger: labelRef.current, start: "top 88%" },
      });

      gsap.from(headingRef.current, {
        opacity: 0, y: 40, skewY: 1.5, duration: 0.9, ease: "expo.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 88%" },
      });

      // stagger stat cards entrance
      gsap.from(".about-stat", {
        opacity: 0, y: 32, stagger: 0.1, duration: 0.7, ease: "expo.out",
        scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
      });

      gsap.from(storyRef.current, {
        opacity: 0, x: -24, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: storyRef.current, start: "top 85%" },
      });

      gsap.from(cardRef.current, {
        opacity: 0, x: 24, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 85%" },
      });

      // trigger counting when stats enter viewport
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 85%",
        onEnter: () => {
          if (hasAnimated.current) return;
          hasAnimated.current = true;
          animateCounts();
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const animateCounts = () => {
    const duration = 1800; // ms
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCounts(STATS.map(s => Math.floor(eased * s.num)));

      if (progress < 1) requestAnimationFrame(tick);
      else setCounts(STATS.map(s => s.num));
    };

    requestAnimationFrame(tick);
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="border-t border-pg-border bg-pg-surface"
    >
      <div
        className="max-w-300 mx-auto
                   py-[clamp(60px,10vw,120px)]
                   px-[clamp(24px,7vw,100px)]"
      >
        {/* Label */}
        <p
          ref={labelRef}
          className="font-mono text-[0.68rem] tracking-[0.22em] uppercase
                     text-pg-accent mb-3.5"
        >
          About Me
        </p>

        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-sans font-black
                     text-[clamp(2rem,5vw,3.6rem)]
                     tracking-[-0.035em] leading-[1.06]
                     mb-[clamp(32px,5vw,52px)]"
        >
          Built on <em className="not-italic text-pg-accent">curiosity.</em>
        </h2>

        {/* ── Stats row ── */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4
                     border border-pg-border rounded-lg
                     overflow-hidden mb-[clamp(40px,6vw,64px)]"
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              className="about-stat
                         flex flex-col justify-between
                         px-5 py-6
                         bg-pg-bg
                         border-r border-pg-border last:border-r-0
                         nth-2:max-md:border-r-0
                         nth-3:max-md:border-t max-md:nth-3:border-t-pg-border"
            >
              {/* number */}
              <div
                className="font-sans font-black leading-none
                           text-[clamp(2rem,4.5vw,3rem)]
                           tracking-[-0.04em] text-pg-text mb-2"
              >
                {counts[i]}
                <span className="text-pg-accent">{s.suffix}</span>
              </div>

              {/* label */}
              <p className="font-mono text-[0.54rem] tracking-[0.12em]
                            uppercase text-pg-muted leading-[1.55]
                            whitespace-pre-line">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Story + Currently card */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-[clamp(32px,5vw,56px)]">

          {/* Story */}
          <div ref={storyRef} className="flex flex-col gap-5">
            <p className="font-sans text-[clamp(0.88rem,1.5vw,1rem)]
                          text-pg-muted leading-[1.82]">
              I&apos;m Martin Manjoro — a software developer based in Harare, Zimbabwe.
              I care deeply about the craft: clean architecture, thoughtful UI,
              and systems that scale beyond the brief.
            </p>
            <p className="font-sans text-[clamp(0.88rem,1.5vw,1rem)]
                          text-pg-muted leading-[1.82]">
              I started programming out of curiosity and never stopped. Over the
              years I&apos;ve worked across the full stack — from designing pixel-perfect
              interfaces to engineering the APIs and databases that power them.
              I&apos;m remote-first and globally minded, building for clients across
              Zimbabwe, South Africa, and beyond.
            </p>
            <p className="font-sans text-[clamp(0.88rem,1.5vw,1rem)]
                          text-pg-muted leading-[1.82]">
              When I&apos;m not writing code, I&apos;m thinking about markets, design,
              and what the next project should be.
            </p>
          </div>

          {/* Currently card */}
          <div
            ref={cardRef}
            className="border border-pg-border rounded-[2px] overflow-hidden self-start"
          >
            {/* Photo */}
            <div className="relative w-full aspect-square bg-pg-surface border-b border-pg-border overflow-hidden">
              <Image
                src={PHOTO_SRC}
                alt="Martin Manjoro"
                fill
                className="object-cover object-top"
                sizes="300px"
                onError={(e) => {
                  // fallback if photo not found
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              {/* grain overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E")`,
                  backgroundSize: "160px",
                }}
              />
            </div>

            {/* Card header */}
            <div className="px-4 py-3 bg-pg-bg border-b border-pg-border">
              <p className="font-mono text-[0.56rem] tracking-[0.14em]
                            uppercase text-pg-muted">
                Currently
              </p>
            </div>

            {/* Rows */}
            {CURRENTLY.map((row, i) => (
              <div
                key={i}
                className="flex justify-between items-center gap-3
                           px-4 py-3 bg-pg-bg
                           border-b border-pg-border last:border-b-0"
              >
                <span className="font-mono text-[0.5rem] tracking-widest
                                 uppercase text-pg-muted shrink-0">
                  {row.label}
                </span>
                <span className="font-sans text-[0.8rem] text-pg-text text-right">
                  {row.value}
                </span>
              </div>
            ))}

            {/* Status row */}
            <div className="flex justify-between items-center gap-3 px-4 py-3 bg-pg-bg">
              <span className="font-mono text-[0.5rem] tracking-widest
                               uppercase text-pg-muted shrink-0">
                Status
              </span>
              <span className="flex items-center gap-1.5 font-sans text-[0.8rem]
                               text-pg-green">
                <span className="inline-block w-1.5 h-1.5 rounded-full
                                 bg-pg-green animate-pulse" />
                Open to work
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

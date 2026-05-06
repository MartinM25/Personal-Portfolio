"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import HeroCanvas from "./HeroCanvas";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const eyeRef = useRef<HTMLSpanElement>(null);
  const linesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const ruleRef = useRef<HTMLDivElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const navMob = document.getElementById("nav-mob");

      gsap.set(topBarRef.current, { scaleX: 0 });
      gsap.set(eyeRef.current, { y: "110%" });
      gsap.set(linesRef.current, { y: "106%" });
      gsap.set(ruleRef.current, { scaleX: 0 });
      gsap.set(ctasRef.current, { opacity: 0, y: 16 });
      gsap.set(scrollRef.current, { opacity: 0 });

      if (navMob) gsap.set(navMob, { y: "100%" });

      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .to(topBarRef.current, {
          scaleX: 1,
          duration: 0.9,
          ease: "expo.inOut",
        })
        .to(eyeRef.current, { y: "0%", duration: 0.75 }, "-=0.4")
        .to(
          linesRef.current,
          { y: "0%", duration: 1.1, stagger: 0.12 },
          "-=0.5",
        )
        .to(ruleRef.current, { scaleX: 1, duration: 0.85 }, "-=0.4")
        .to(ctasRef.current, { opacity: 1, y: 0, duration: 0.65 }, "-=0.4")
        .to(scrollRef.current, { opacity: 1, duration: 0.5 }, "-=0.2");

      if (navMob) {
        gsap.to(navMob, {
          y: "0%",
          duration: 0.7,
          ease: "back.out(1.3)",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="max-w-300 mx-auto relative min-h-screen flex flex-col justify-center overflow-hidden
                 px-[clamp(24px,7vw,100px)]
                 md:pt-[clamp(48px,12vw,72px)]
                 pb-[clamp(60px,10vw,100px)]"
    >
      <HeroCanvas />

      {/* Grain Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 pointer-events-none grain"
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col">
        {/* Top Accent Bar */}
        <div
          ref={topBarRef}
          className="absolute top-0 left-0 right-0
                     h-0.75 bg-pg-accent origin-left"
        />

        {/* Eyebrow */}
        <div className="overflow-hidden mb-[clamp(14px,3vw,24px)]">
          <span
            ref={eyeRef}
            className="inline-block font-mono
                       text-[clamp(0.58rem,1.3vw,0.72rem)]
                       tracking-[0.22em] uppercase
                       text-pg-accent"
          >
            Software Developer
          </span>
        </div>

        {/* Headline */}
        <div>
          {["Hi,", "my name is", "Martin."].map((text, i) => (
            <div key={i} className="overflow-hidden">
              <span
                ref={(el) => {
                  linesRef.current[i] = el;
                }}
                className={`block font-sans font-black
                            text-[clamp(3.2rem,11vw,7rem)]
                            tracking-[-0.04em]
                            leading-[0.97]
                            will-change-transform
                            ${
                              text === "Martin."
                                ? "text-pg-accent"
                                : "text-pg-text"
                            }`}
              >
                {text}
              </span>
            </div>
          ))}
        </div>

        {/* Rule */}
        <div
          ref={ruleRef}
          className="h-px bg-pg-border w-full max-w-[85%]
                     origin-left
                     mt-[clamp(18px,3.5vw,24px)]
                     mb-[clamp(14px,3vw,28px)]"
        />

        {/* CTAs */}
        <div
          ref={ctasRef}
          className="flex flex-col sm:flex-row
                     items-start sm:items-center
                     gap-4 sm:gap-6"
        >
          <a
            href="#work"
            className="font-mono btn-fill 
                       text-[clamp(0.62rem,1.4vw,0.74rem)]
                       tracking-[0.12em]
                       uppercase
                       text-pg-bg bg-pg-text
                       px-7 py-3.5
                       rounded-[2px]
                       transition-transform duration-200
                       hover:scale-[1.02]"
          >
            <span>View my work</span>
          </a>

          <a
            href="#contact"
            className="flex items-center gap-2
                       font-mono
                       text-[clamp(0.62rem,1.4vw,0.72rem)]
                       tracking-[0.12em]
                       uppercase
                       text-pg-muted
                       transition-colors duration-300
                       hover:text-pg-accent
                       group"
          >
            Let&apos;s work
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-2"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

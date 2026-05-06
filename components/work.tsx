"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Placeholder data — replace with Sanity later
const jobs = [
  {
    id: "growit",
    company: "Growit Management Consulting",
    role: "Frontend Developer",
    start: "Jan 2023",
    end: null, // null = Present
    location: "Harare, Zimbabwe",
    bullets: [
      "Built and maintained client-facing web platforms used by hundreds of users daily.",
      "Led migration of the company site to Next.js, improving performance scores significantly.",
      "Collaborated with the design team to ship pixel-perfect interfaces from Figma.",
      "Integrated third-party APIs including WhatsApp Business and payment gateways.",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind", "Vercel", "Sanity"],
  },
  {
    id: "freelance",
    company: "Freelance",
    role: "Full Stack Developer",
    start: "2022",
    end: null,
    location: "Remote",
    bullets: [
      "Delivered full-stack web applications for clients across Zimbabwe and South Africa.",
      "Built WhatsApp automation bots using the Meta Cloud API for business use cases.",
      "Developed offline-capable PWAs with background sync and push notifications.",
      "Managed all aspects from scoping and design to deployment and client handoff.",
    ],
    tags: ["React", "Node.js", "Supabase", "Railway", "WhatsApp API"],
  },
];

export default function WorkExperience() {
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(0);

  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabEls = useRef<(HTMLButtonElement | null)[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);

  // Scroll-triggered entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(labelRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "expo.out",
        scrollTrigger: { trigger: labelRef.current, start: "top 88%" },
      });
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 40,
        skewY: 2,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 88%" },
      });
      gsap.from(tabsRef.current, {
        opacity: 0,
        x: -24,
        duration: 0.8,
        ease: "expo.out",
        scrollTrigger: { trigger: tabsRef.current, start: "top 88%" },
      });
      gsap.from(panelRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "expo.out",
        scrollTrigger: { trigger: panelRef.current, start: "top 88%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Sliding indicator (desktop)
  useEffect(() => {
    const el = tabEls.current[active];
    const indicator = indicatorRef.current;
    if (!el || !indicator) return;

    gsap.to(indicator, {
      y: el.offsetTop,
      height: el.offsetHeight,
      duration: 0.45,
      ease: "expo.out",
    });
  }, [active]);

  // Panel swap animation
  const handleTabChange = (i: number) => {
    if (i === active) return;
    if (!panelRef.current) return;

    gsap.to(panelRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.18,
      ease: "power2.in",
      onComplete: () => {
        setActive(i);
        gsap.fromTo(
          panelRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.4, ease: "expo.out" },
        );
      },
    });
  };

  const job = jobs[active];

  return (
    <section
      id="experience"
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
          Experience
        </p>

        {/* Heading */}
        <div
          ref={headingRef}
          className="overflow-hidden mb-[clamp(32px,5vw,56px)]"
        >
          <h2
            className="font-sans font-black
                     text-[clamp(2rem,5vw,3.6rem)]
                     tracking-[-0.035em] leading-[1.06]"
          >
            Where I&apos;ve{" "}
            <em className="not-italic text-pg-accent">worked.</em>
          </h2>
        </div>

        {/* DESKTOP: vertical card tabs */}
        <div className="hidden md:grid md:grid-cols-[260px_1fr] gap-0 border border-pg-border overflow-hidden">
          {/* Tab list */}
          <div
            ref={tabsRef}
            className="relative flex flex-col border-r border-pg-border"
          >
            {/* Sliding indicator — sits behind tabs */}
            <div
              ref={indicatorRef}
              className="absolute left-0 top-0 w-full pointer-events-none z-0
                       bg-pg-bg border-l-2 border-pg-accent
                       transition-none"
              style={{ height: 0 }}
            />

            {jobs.map((j, i) => (
              <button
                key={j.id}
                ref={(el) => {
                  tabEls.current[i] = el;
                }}
                onClick={() => handleTabChange(i)}
                className={`relative z-10 text-left px-5 py-5
                          border-b last:border-b-0
                          transition-colors duration-200 cursor-pointer
                          ${
                            active === i
                              ? "bg-pg-bg border-l-2 border-l-pg-accent "

                              : "bg-pg-surface border-pg-border hover:bg-pg-bg/60"
                          }`}
              >
                {/* Index */}
                <span
                  className="block font-mono text-[0.5rem] tracking-[0.14em]
                               uppercase text-pg-accent/70 mb-2"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Company */}
                <span
                  className={`block font-sans font-extrabold text-[0.95rem]
                               tracking-[-0.02em] leading-tight mb-1
                               transition-colors duration-200
                               ${active === i ? "text-pg-text" : "text-pg-muted"}`}
                >
                  {j.company}
                </span>

                {/* Role */}
                <span
                  className="block font-mono text-[0.56rem] tracking-widest
                               uppercase text-pg-muted mb-2.5 leading-snug"
                >
                  {j.role}
                </span>

                {/* Date */}
                <span
                  className="flex items-center gap-1.5 font-mono text-[0.55rem]
                               tracking-[0.06em] uppercase text-pg-accent"
                >
                  {j.end === null && (
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full
                                   bg-pg-accent animate-pulse"
                    />
                  )}
                  {j.start} – {j.end ?? "Present"}
                </span>
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div ref={panelRef} className="bg-pg-bg p-8 lg:p-10">
            <p
              className="font-mono text-[0.6rem] tracking-[0.14em] uppercase
                        text-pg-accent mb-1"
            >
              {job.company}
            </p>

            <h3
              className="font-sans font-black text-[clamp(1.3rem,2.5vw,1.8rem)]
                         tracking-[-0.03em] leading-tight mb-1"
            >
              {job.role}
            </h3>

            <p
              className="font-mono text-[0.58rem] tracking-[0.08em] uppercase
                        text-pg-muted mb-6 pb-6 border-b border-pg-border"
            >
              {job.start} – {job.end ?? "Present"} · {job.location}
            </p>

            <ul className="flex flex-col gap-3 mb-6">
              {job.bullets.map((b, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-[0.88rem] text-pg-muted leading-[1.75]"
                >
                  <span className="text-pg-accent mt-0.75 shrink-0 text-[0.75rem]">
                    →
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {job.tags.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[0.55rem] tracking-widest uppercase
                           px-3 py-1.5 border border-pg-border rounded-[2px]
                           text-pg-muted transition-colors duration-200
                           hover:border-pg-accent hover:text-pg-accent"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ══ MOBILE: timeline ══ */}
        <div className="md:hidden relative pl-7">
          {/* Vertical line */}
          <div className="absolute left-1.25 top-3 bottom-3 w-px bg-pg-border" />

          {jobs.map((j, i) => {
            const isOpen = openMobile === i;
            return (
              <div
                key={j.id}
                className="relative border-b border-pg-border last:border-b-0"
              >
                {/* Dot */}
                <div
                  className={`absolute -left-6.5 top-6 w-3 h-3 rounded-full border-2
                             transition-all duration-250
                             ${
                               isOpen
                                 ? "border-pg-accent bg-pg-accent"
                                 : "border-pg-border bg-pg-bg"
                             }`}
                />

                {/* Trigger */}
                <button
                  onClick={() => setOpenMobile(isOpen ? null : i)}
                  className="w-full text-left py-5 flex justify-between items-start gap-3"
                >
                  <div>
                    <p
                      className="font-sans font-extrabold text-[1rem]
                                tracking-[-0.02em] text-pg-text mb-1"
                    >
                      {j.company}
                    </p>
                    <p
                      className="font-mono text-[0.56rem] tracking-[0.08em]
                                uppercase text-pg-muted mb-2"
                    >
                      {j.role}
                    </p>
                    <p
                      className="flex items-center gap-1.5 font-mono text-[0.54rem]
                                tracking-[0.06em] uppercase text-pg-accent"
                    >
                      {j.end === null && (
                        <span
                          className="inline-block w-1.25 h-1.25 rounded-full
                                       bg-pg-accent animate-pulse"
                        />
                      )}
                      {j.start} – {j.end ?? "Present"}
                    </p>
                  </div>
                  <span
                    className={`text-pg-muted text-xl shrink-0 mt-1
                               transition-transform duration-300 ease-in-out
                               ${isOpen ? "rotate-45 text-pg-accent" : ""}`}
                  >
                    +
                  </span>
                </button>

                {/* Expandable body */}
                <div
                  className={`overflow-hidden transition-all duration-400
                             ease-in-out
                             ${isOpen ? "max-h-150 pb-5" : "max-h-0"}`}
                >
                  <ul className="flex flex-col gap-3 mb-4">
                    {j.bullets.map((b, bi) => (
                      <li
                        key={bi}
                        className="flex gap-3 text-[0.86rem] text-pg-muted leading-[1.75]"
                      >
                        <span className="text-pg-accent shrink-0 text-[0.75rem] mt-0.75">
                          →
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {j.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[0.52rem] tracking-widest uppercase
                                 px-2.5 py-1 border border-pg-border rounded-[2px]
                                 text-pg-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

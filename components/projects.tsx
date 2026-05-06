"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { Project } from "@/lib/projects";

import { projects as ALL_PROJECTS } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger);

const PAGE_SIZE = 6;

const totalPages = Math.ceil(ALL_PROJECTS.length / PAGE_SIZE);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef   = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  const [page, setPage]         = useState(1);
  const [animating, setAnimating] = useState(false);

  const start   = (page - 1) * PAGE_SIZE;
  const current = ALL_PROJECTS.slice(start, start + PAGE_SIZE);

  // Section entrance
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
      gsap.from(".project-card", {
        opacity: 0, y: 40, stagger: 0.08, duration: 0.7, ease: "expo.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate in cards on page change
  useEffect(() => {
    if (animating) return;
    gsap.fromTo(
      ".project-card",
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, stagger: 0.07, duration: 0.55, ease: "expo.out" }
    );
  }, [page, animating]);

  const changePage = (next: number) => {
    if (animating || next === page || next < 1 || next > totalPages) return;
    setAnimating(true);

    gsap.to(".project-card", {
      opacity: 0, y: -16, stagger: 0.04, duration: 0.22, ease: "power2.in",
      onComplete: () => {
        setPage(next);
        setAnimating(false);
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      },
    });
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="border-t border-pg-border"
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
          Projects
        </p>

        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-sans font-black
                     text-[clamp(2rem,5vw,3.6rem)]
                     tracking-[-0.035em] leading-[1.06]
                     "
        >
          Things I&apos;ve <em className="not-italic text-pg-accent">built.</em>
        </h2>

        {/* Body */}
      <p
        ref={bodyRef}
        className="text-pg-muted 
                   text-[clamp(0.88rem,1.6vw,1rem)] 
                   leading-[1.75] 
                   max-w-130
                   mb-[clamp(36px,5vw,64px)]"
      >
        A selection of systems, products and interfaces I&apos;ve built.
        From full-stack web apps to API integrations and design systems.
      </p>

        {/* Grid: 1 col mobile · 2 col tablet · 3 col desktop */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                     gap-px bg-pg-border
                     border border-pg-border overflow-hidden
                     mb-10"
        >
          {current.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between gap-4">

            {/* Prev */}
            <button
              onClick={() => changePage(page - 1)}
              disabled={page === 1 || animating}
              className="group flex items-center gap-2
                         font-mono text-[0.62rem] tracking-[0.12em] uppercase
                         text-pg-muted border border-pg-border
                         px-5 py-3 rounded-[2px]
                         disabled:opacity-30 disabled:cursor-not-allowed
                         transition-all duration-200
                         enabled:hover:border-pg-text enabled:hover:text-pg-text"
            >
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                className="transition-transform duration-200
                           group-enabled:group-hover:-translate-x-0.5"
              >
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
              Prev
            </button>

            {/* Page dots + counter */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => changePage(i + 1)}
                    disabled={animating}
                    aria-label={`Page ${i + 1}`}
                    className={`rounded-full transition-all duration-300
                                ${page === i + 1
                                  ? "w-5 h-1.25 bg-pg-accent"
                                  : "w-1.25 h-1.25 bg-pg-border hover:bg-pg-muted"
                                }`}
                  />
                ))}
              </div>
              <span className="font-mono text-[0.55rem] tracking-widest
                               uppercase text-pg-muted hidden sm:block">
                {page} / {totalPages}
              </span>
            </div>

            {/* Next */}
            <button
              onClick={() => changePage(page + 1)}
              disabled={page === totalPages || animating}
              className="group flex items-center gap-2
                         font-mono text-[0.62rem] tracking-[0.12em] uppercase
                         text-pg-muted border border-pg-border
                         px-5 py-3 rounded-[2px]
                         disabled:opacity-30 disabled:cursor-not-allowed
                         transition-all duration-200
                         enabled:hover:border-pg-text enabled:hover:text-pg-text"
            >
              Next
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                className="transition-transform duration-200
                           group-enabled:group-hover:translate-x-0.5"
              >
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>

          </div>
        )}
      </div>
    </section>
  );
}

// ── Project Card ──
function ProjectCard({ project }: { project: Project }) {
  const hasImage = false; // flip to true once images are in public/images/projects/

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex flex-col bg-pg-bg
                 transition-colors duration-200 hover:bg-pg-surface"
    >
      {/* Image */}
      <div
        className="relative w-full aspect-16/10 overflow-hidden
                   bg-pg-surface border-b border-pg-border shrink-0"
      >
        {hasImage ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500
                       group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw,
                   (max-width: 1024px) 50vw,
                   33vw"
          />
        ) : (
          /* Diagonal line placeholder */
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.04]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id={`g-${project.slug}`}
                width="24" height="24"
                patternUnits="userSpaceOnUse"
              >
                <path d="M 24 0 L 0 24" stroke="#1a1209" strokeWidth="0.8"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#g-${project.slug})`}/>
          </svg>
        )}

        <div className="absolute inset-0 bg-pg-text/0 transition-colors
                        duration-300 group-hover:bg-pg-text/4" />

        {/* Year */}
        <span
          className="absolute top-3 right-3 font-mono text-[0.48rem]
                     tracking-[0.12em] uppercase text-pg-muted
                     bg-pg-bg/80 backdrop-blur-sm border border-pg-border
                     px-2 py-1 rounded-[2px]"
        >
          {project.year}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3
          className="font-sans font-extrabold text-[0.98rem]
                     tracking-[-0.02em] leading-snug text-pg-text mb-2
                     transition-colors duration-200 group-hover:text-pg-accent"
        >
          {project.title}
        </h3>

        <p className="font-sans text-[0.81rem] text-pg-muted leading-[1.72]
                      mb-4 flex-1 line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map(t => (
            <span
              key={t}
              className="font-mono text-[0.46rem] tracking-widest uppercase
                         px-2 py-1 border border-pg-border rounded-[2px]
                         text-pg-muted"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 pt-4 border-t border-pg-border">
          <span
            className="font-mono text-[0.61rem] tracking-widest uppercase
                       text-pg-accent flex items-center gap-1.5"
          >
            View details
            <svg
              width="11" height="11" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </span>

          <div className="flex items-center gap-3 ml-auto">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={e => e.stopPropagation()}
                className="text-pg-muted hover:text-pg-text
                           transition-colors duration-200"
                aria-label="GitHub"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={e => e.stopPropagation()}
                className="text-pg-muted hover:text-pg-text
                           transition-colors duration-200"
                aria-label="Live site"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2"
                     strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

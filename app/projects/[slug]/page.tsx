import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getProject, getRelatedProjects, getAllSlugs } from "@/lib/projects";

// Static params for Next.js build
export function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

// Dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Martin Manjoro`,
    description: project.description,
  };
}

const STATUS_STYLES = {
  live:        { dot: "bg-pg-green animate-pulse", text: "text-pg-green border-pg-green", label: "Live" },
  "in-progress": { dot: "bg-pg-accent animate-pulse", text: "text-pg-accent border-pg-accent", label: "In Progress" },
  archived:    { dot: "bg-pg-muted",               text: "text-pg-muted border-pg-border",  label: "Archived" },
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related  = getRelatedProjects(project.related);
  const status   = STATUS_STYLES[project.status];
  const hasImage = false; // flip to true once real images exist

  const waMessage = encodeURIComponent(
    `Hi Martin, I saw your ${project.title} project and I'd like to discuss something similar.`
  );
  const waUrl     = `https://wa.me/263771969177?text=${waMessage}`;
  const emailUrl  = `mailto:hello@martinmanjoro.dev?subject=Re: ${project.title}`;

  return (
    <>
      {/* Hero Banner */}
      <div className="relative w-full aspect-16/7 bg-pg-surface border-b border-pg-border overflow-hidden">
        {hasImage ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          /* diagonal pattern placeholder */
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="diag" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 32" stroke="#1a1209" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diag)"/>
          </svg>
        )}

        {/* Status badge */}
        <div className={`absolute top-5 left-5 flex items-center gap-2
                         font-mono text-[0.54rem] tracking-widest uppercase
                         px-3 py-1.5 rounded-full border
                         bg-pg-bg/85 backdrop-blur-sm ${status.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}/>
          {status.label}
        </div>

        {/* Year */}
        <div className="absolute top-5 right-5 font-mono text-[0.54rem]
                        tracking-widest uppercase text-pg-muted
                        border border-pg-border px-3 py-1.5 rounded-[2px]
                        bg-pg-bg/85 backdrop-blur-sm">
          {project.year}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-300 mx-auto px-[clamp(24px,7vw,80px)]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px]
                        gap-[clamp(40px,5vw,72px)]
                        py-[clamp(48px,7vw,80px)]
                        items-start">

          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-14">

            {/* Header */}
            <div>
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map(t => (
                  <span key={t}
                    className="font-mono text-[0.5rem] tracking-widest uppercase
                               px-2.5 py-1 border border-pg-border rounded-[2px]
                               text-pg-muted">
                    {t}
                  </span>
                ))}
              </div>

              <h1 className="font-sans font-black
                             text-[clamp(2.2rem,6vw,4rem)]
                             tracking-[-0.04em] leading-[1.02]
                             mb-5">
                {project.title.split(" ").slice(0, -1).join(" ")}{" "}
                <em className="not-italic text-pg-accent">
                  {project.title.split(" ").slice(-1)[0]}.
                </em>
              </h1>

              <div className="flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 font-mono text-[0.6rem]
                               tracking-widest uppercase bg-pg-text text-pg-bg
                               px-5 py-3 rounded-[2px] transition-colors duration-200
                               hover:bg-pg-accent">
                    <ExternalIcon/>
                    Live demo
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 font-mono text-[0.6rem]
                               tracking-widest uppercase border border-pg-border
                               text-pg-muted px-5 py-3 rounded-[2px]
                               transition-all duration-200
                               hover:border-pg-text hover:text-pg-text">
                    <GithubIcon/>
                    GitHub
                  </a>
                )}
              </div>
            </div>

            {/* The Problem */}
            <Block label="The Problem">
              <h2 className="font-sans font-black text-[clamp(1.1rem,2.5vw,1.5rem)]
                             tracking-[-0.025em] leading-[1.15] mb-4">
                {project.problem.split(".")[0]}.
              </h2>
              {project.problem.split(". ").slice(1).join(". ") && (
                <p className="text-pg-muted text-[clamp(.88rem,1.5vw,.96rem)] leading-[1.82]">
                  {project.problem.split(". ").slice(1).join(". ")}
                </p>
              )}
            </Block>

            {/* My Role */}
            <Block label="My Role">
              <p className="text-pg-muted text-[clamp(.88rem,1.5vw,.96rem)] leading-[1.82]">
                {project.role}
              </p>
            </Block>

            {/* Key Decisions */}
            {project.decisions.length > 0 && (
              <Block label="Key Decisions">
                <div className="flex flex-col border border-pg-border rounded-[2px] overflow-hidden">
                  {project.decisions.map((d, i) => (
                    <div key={i}
                      className="flex gap-4 p-5 border-b border-pg-border last:border-b-0">
                      <span className="font-mono text-[0.52rem] tracking-widest
                                       uppercase text-pg-accent shrink-0
                                       mt-0.5 w-6">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-sans font-bold text-[0.92rem]
                                      tracking-[-0.01em] mb-2">
                          {d.title}
                        </p>
                        <p className="text-pg-muted text-[0.83rem] leading-[1.72]">
                          {d.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Block>
            )}

            {/* Challenges */}
            {project.challenges.length > 0 && (
              <Block label="Challenges & Solutions">
                <div className="flex flex-col gap-3">
                  {project.challenges.map((c, i) => (
                    <div key={i}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-0
                                 border border-pg-border rounded-[2px] overflow-hidden
                                 bg-pg-surface">
                      <div className="p-5 sm:border-r border-b sm:border-b-0 border-pg-border">
                        <p className="font-mono text-[0.5rem] tracking-[0.12em]
                                      uppercase text-pg-muted mb-2 flex items-center gap-1.5">
                          <span>⚠</span> Challenge
                        </p>
                        <p className="text-[0.83rem] text-pg-muted leading-[1.7]">{c.problem}</p>
                      </div>
                      <div className="p-5">
                        <p className="font-mono text-[0.5rem] tracking-[0.12em]
                                      uppercase text-pg-muted mb-2 flex items-center gap-1.5">
                          <span>✓</span> Solution
                        </p>
                        <p className="text-[0.83rem] text-pg-text leading-[1.7]">{c.solution}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Block>
            )}

            {/* Screenshots */}
            <Block label="Screenshots">
              <div className="flex flex-col gap-6">
                {/* Desktop */}
                {project.screenshots.desktop.length > 0 && (
                  <div>
                    <p className="font-mono text-[0.52rem] tracking-widest
                                  uppercase text-pg-muted mb-3">
                      Desktop view
                    </p>
                    <div className="flex flex-col gap-3">
                      {project.screenshots.desktop.map((ss, i) => (
                        <ScreenshotPlaceholder
                          key={i}
                          src={ss.src}
                          label={ss.label}
                          index={i + 1}
                          type="desktop"
                          hasImage={hasImage}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Mobile */}
                {project.screenshots.mobile.length > 0 && (
                  <div>
                    <p className="font-mono text-[0.52rem] tracking-widest
                                  uppercase text-pg-muted mb-3">
                      Mobile view
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {project.screenshots.mobile.map((ss, i) => (
                        <ScreenshotPlaceholder
                          key={i}
                          src={ss.src}
                          label={ss.label}
                          index={i + 1}
                          type="mobile"
                          hasImage={hasImage}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Block>

            {/* Hindsight */}
            <Block label="Hindsight">
              <div className="flex gap-4 bg-pg-surface border border-pg-border
                              rounded-[2px] p-5">
                <span className="text-xl shrink-0 mt-0.5">🔭</span>
                <div>
                  <p className="font-sans font-bold text-[0.92rem]
                                tracking-[-0.01em] mb-2">
                    What I&apos;d do differently
                  </p>
                  <p className="text-pg-muted text-[0.83rem] leading-[1.75]">
                    {project.hindsight}
                  </p>
                </div>
              </div>
            </Block>

          </div>

          {/* SIDEBAR */}
          <div className="border border-pg-border rounded-[2px] overflow-hidden
                          lg:sticky lg:top-22 self-start">

            {/* Tech stack */}
            <div className="border-b border-pg-border">
              <div className="px-4 py-3 bg-pg-surface border-b border-pg-border">
                <p className="font-mono text-[0.61rem] tracking-[0.14em]
                               uppercase text-pg-muted">
                  Tech Stack
                </p>
              </div>
              <div className="divide-y divide-pg-border">
                {project.tech.map((t, i) => (
                  <div key={i}
                    className="flex items-center gap-3 px-4 py-3">
                    <span className="w-1.75 h-1.75 rounded-full bg-pg-accent shrink-0"/>
                    <span className="font-sans text-[0.84rem] text-pg-text">{t.name}</span>
                    <span className="font-mono text-[0.48rem] tracking-[0.08em]
                                     uppercase text-pg-muted ml-auto">
                      {t.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project meta */}
            <div>
              <div className="px-4 py-3 bg-pg-surface border-b border-pg-border">
                <p className="font-mono text-[0.61rem] tracking-[0.14em]
                               uppercase text-pg-muted">
                  Details
                </p>
              </div>
              <div className="divide-y divide-pg-border">
                {[
                  { label: "Year",     value: project.year     },
                  { label: "Type",     value: project.type     },
                  { label: "Duration", value: project.duration },
                  { label: "Role",     value: "Solo developer" },
                ].map((row, i) => (
                  <div key={i}
                    className="flex items-center justify-between gap-3 px-4 py-3">
                    <span className="font-mono text-[0.5rem] tracking-widest
                                     uppercase text-pg-muted">
                      {row.label}
                    </span>
                    <span className="font-sans text-[0.82rem] text-pg-text text-right">
                      {row.value}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between gap-3 px-4 py-3">
                  <span className="font-mono text-[0.5rem] tracking-widest
                                   uppercase text-pg-muted">
                    Status
                  </span>
                  <span className={`flex items-center gap-1.5 font-sans text-[0.82rem]
                                    ${status.text.split(" ")[0]}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}/>
                    {status.label}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="border-t border-b border-pg-border bg-pg-surface">
        <div className="max-w-300 mx-auto
                        px-[clamp(24px,7vw,80px)]
                        py-[clamp(48px,7vw,80px)]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto]
                          gap-[clamp(32px,5vw,64px)] items-center">
            <div>
              <p className="font-mono text-[0.62rem] tracking-[0.2em] uppercase
                            text-pg-accent mb-3">
                Interested in something similar?
              </p>
              <h2 className="font-sans font-black
                             text-[clamp(1.6rem,4vw,2.8rem)]
                             tracking-[-0.035em] leading-[1.06] mb-4">
                Want to build<br/>
                something like <em className="not-italic text-pg-accent">this?</em>
              </h2>
              <p className="font-sans text-[clamp(.84rem,1.5vw,.94rem)]
                            text-pg-muted leading-[1.75] max-width-[480px]">
                Got a project in mind? Reach out directly and let&apos;s talk
                about what you need. I respond fast.
              </p>
            </div>

            <div className="flex flex-row lg:flex-col gap-3">
              <a href={waUrl} target="_blank" rel="noreferrer"
                className="flex items-center gap-2.5 font-mono text-[0.62rem]
                           tracking-widest uppercase bg-[#25D366] text-white
                           px-5 py-3.5 rounded-[2px]
                           transition-all duration-200
                           hover:bg-[#1db954] hover:scale-[1.02]">
                <WhatsAppIcon/>
                Chat on WhatsApp
              </a>
              <a href={emailUrl}
                className="flex items-center gap-2.5 font-mono text-[0.62rem]
                           tracking-widest uppercase border border-pg-border
                           text-pg-muted px-5 py-3.5 rounded-[2px]
                           transition-all duration-200
                           hover:border-pg-text hover:text-pg-text">
                <EmailIcon/>
                Email me about this
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Related Projects */}
      {related.length > 0 && (
        <div className="max-w-300 mx-auto
                        px-[clamp(24px,7vw,80px)]
                        py-[clamp(48px,7vw,80px)]">
          <p className="font-mono text-[0.62rem] tracking-[0.2em] uppercase
                        text-pg-accent flex items-center gap-3 mb-6">
            Related Projects
            <span className="flex-1 h-px bg-pg-border block"/>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px
                          bg-pg-border border border-pg-border
                          rounded-[2px] overflow-hidden">
            {related.map(p => (
              <Link key={p.slug} href={`/projects/${p.slug}`}
                className="group bg-pg-bg hover:bg-pg-surface
                           transition-colors duration-200 p-6
                           flex flex-col gap-3">
                <span className="font-mono text-[0.5rem] tracking-widest
                                 uppercase text-pg-accent">
                  {p.tagline}
                </span>
                <h3 className="font-sans font-extrabold text-[1rem]
                               tracking-[-0.02em] leading-snug text-pg-text
                               transition-colors duration-200 group-hover:text-pg-accent">
                  {p.title}
                </h3>
                <p className="font-sans text-[0.82rem] text-pg-muted
                              leading-[1.65] line-clamp-2">
                  {p.description}
                </p>
                <div className="flex items-center gap-2 mt-auto pt-4
                                border-t border-pg-border
                                font-mono text-[0.52rem] tracking-widest
                                uppercase text-pg-accent">
                  View project
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="2"
                       strokeLinecap="round" strokeLinejoin="round"
                       className="transition-transform duration-200 group-hover:translate-x-1">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// Block wrapper
function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase
                    text-pg-accent flex items-center gap-3 mb-5">
        {label}
        <span className="flex-1 h-px bg-pg-border block"/>
      </p>
      {children}
    </div>
  );
}

// Screenshot
function ScreenshotPlaceholder({
  src, label, index, type, hasImage,
}: {
  src: string; label: string; index: number;
  type: "desktop" | "mobile"; hasImage: boolean;
}) {
  return (
    <div className={`relative bg-pg-surface border border-pg-border rounded-lg
                     overflow-hidden flex items-center justify-center
                     ${type === "desktop" ? "aspect-video" : "aspect-9/16"}`}>
      {hasImage ? (
        <Image src={src} alt={label} fill className="object-cover" sizes="100vw"/>
      ) : (
        <span className="font-mono text-[0.48rem] tracking-[0.12em]
                         uppercase text-pg-muted/50">
          {label}
        </span>
      )}
      <span className="absolute top-2 left-2 font-mono text-[0.44rem]
                       tracking-widest uppercase text-pg-muted
                       border border-pg-border px-1.5 py-0.5 rounded-[2px]
                       bg-pg-bg/80 backdrop-blur-sm">
        {type === "desktop" ? "Desktop" : "Mobile"} · {index}
      </span>
    </div>
  );
}

// Icons
function ExternalIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
      <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}

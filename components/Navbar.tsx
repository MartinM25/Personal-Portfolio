"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { label: "Home",    href: "#hero" },
  { label: "Work",    href: "#experience" },
  { label: "Projects",   href: "#projects" },
  { label: "About",   href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── DESKTOP ── */}
      <nav className="hidden lg:flex fixed top-0 left-0 right-0 h-16 z-500
                      bg-pg-bg/93 backdrop-blur-md border-b border-pg-border
                      items-center justify-between px-[clamp(32px,6vw,80px)]">
        <Logo />
        <ul className="flex gap-10 list-none">
          {links.map(l => (
            <li key={l.label}>
              <a
                href={l.href}
                className="font-space-mono text-[0.79rem] tracking-widest uppercase text-pg-muted
                           relative transition-colors duration-200 hover:text-pg-text
                           after:absolute after:-bottom-0.75 after:left-0 after:right-0
                           after:h-px after:bg-pg-accent after:scale-x-0 after:origin-left
                           after:transition-transform after:duration-250
                           hover:after:scale-x-100"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── TABLET ── */}
      <nav className="hidden md:flex lg:hidden fixed top-0 left-0 right-0 h-16 z-500
                      bg-pg-bg/93 backdrop-blur-md border-b border-pg-border
                      items-center justify-between px-7">
        <Logo />
        <button
          onClick={() => setOpen(true)}
          className="font-space-mono text-[0.68rem] tracking-[0.08em] uppercase text-pg-text
                     border border-pg-border rounded-sm px-4 py-2
                     transition-colors duration-200 hover:bg-pg-surface hover:border-pg-accent"
        >
          ☰ &nbsp;Menu
        </button>
      </nav>

      {/* ── OVERLAY ── */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-590 bg-pg-text/38 transition-opacity duration-300
                    ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* ── SIDE PANEL ── */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-72.5 z-600
                    bg-pg-surface border-l border-pg-border
                    flex flex-col gap-8 pt-22 px-9 pb-9
                    transition-transform duration-350 ease-in-out
                    ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-5.5 right-5.5 text-[1.4rem] text-pg-muted
                     bg-transparent border-none cursor-pointer transition-colors hover:text-pg-accent"
        >
          ✕
        </button>
        <ul className="flex flex-col gap-6 list-none">
          {links.map(l => (
            <li key={l.label}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-space-mono text-[0.82rem] tracking-[0.07em] uppercase text-pg-text
                           flex items-center gap-3 no-underline transition-colors hover:text-pg-accent
                           before:content-['→'] before:text-pg-accent before:opacity-0
                           before:transition-opacity hover:before:opacity-100"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* ── MOBILE BOTTOM BAR (<768px) ── */}
      <nav
        id="nav-mob"
        className="flex md:hidden fixed bottom-0 left-0 right-0 h-17 z-500
                   bg-pg-bg/97 backdrop-blur-md border-t border-pg-border
                   items-center justify-around translate-y-full"
        /* GSAP animates translate-y-full → 0 after loader */
      >
        {[
          {
            label: "Home", href: "#hero",
            icon: <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
          },
          {
            label: "Work", href: "#work",
            icon: <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></>,
          },
          {
            label: "About", href: "#about",
            icon: <><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></>,
          },
          {
            label: "Contact", href: "#contact",
            icon: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>,
          },
        ].map(item => (
          <a
            key={item.label}
            href={item.href}
            className="mob-item flex flex-col items-center gap-1 flex-1 text-pg-muted
                       font-space-mono text-[0.54rem] tracking-[0.06em] uppercase py-2
                       no-underline transition-colors duration-200 hover:text-pg-accent"
          >
            <svg
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
              className="w-5 h-5"
            >
              {item.icon}
            </svg>
            {item.label}
          </a>
        ))}
      </nav>
    </>
  );
}

function Logo() {
  return (
    <Link href="#hero" className="font-space-mono font-bold text-[1.25rem] text-pg-text no-underline">
      MM<span className="text-pg-accent">.</span>
    </Link>
  );
}
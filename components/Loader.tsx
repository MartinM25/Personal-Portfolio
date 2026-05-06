"use client";

import { useEffect, useRef } from "react";

export default function Loader({ onDone }: { onDone: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const el = loaderRef.current
      if (!el) return
      el.style.opacity = "0"
      el.style.visibility = "hidden"
      setTimeout(onDone, 700)
    }, 2600);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-9999 bg-bg flex flex-col items-center justify-center
                 transition-[opacity,visibility] duration-700"
    >
      {/* Steam lines */}
      <div className="flex gap-3 items-end h-14 mb-2">
        <span className="w-1.25 h-9.5 rounded-full bg-muted origin-bottom animate-squiggle [animation-delay:0s]" />
        <span className="w-1.25 h-7 rounded-full bg-muted origin-bottom animate-squiggle [animation-delay:350ms]" />
        <span className="w-1.25 h-11 rounded-full bg-muted origin-bottom animate-squiggle [animation-delay:700ms]" />
      </div>

      {/* Coffee mug */}
      <svg className="w-24 block mx-auto" viewBox="0 0 90 82" fill="none">
        <rect x="6" y="22" width="58" height="48" rx="7" fill="#2a2018" />
        <rect x="6" y="18" width="58" height="8" rx="4" fill="#3a3020" />
        <rect x="10" y="26" width="50" height="16" rx="3" fill="#5c3d1e" />
        <circle cx="20" cy="34" r="4.5" fill="#7a5230" />
        <circle cx="32" cy="31" r="6" fill="#7a5230" />
        <circle cx="46" cy="32" r="5.5" fill="#7a5230" />
        <circle cx="57" cy="35" r="3.5" fill="#7a5230" />
        <path d="M64 36 Q82 36 82 52 Q82 68 64 68" stroke="#2a2018" strokeWidth="8" fill="none" strokeLinecap="round" />
        <ellipse cx="35" cy="74" rx="34" ry="5" fill="#1a1209" opacity=".2" />
      </svg>

      {/* Label */}
      <p className="mt-7 font-mono text-[0.72rem] tracking-[0.16em] uppercase text-muted loader-dots">
        Brewing something good
      </p>
    </div>
  )
}

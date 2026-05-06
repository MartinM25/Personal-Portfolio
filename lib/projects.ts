// Placeholder data — replace each item with a Sanity fetch later.
// The shape of each object maps directly to what your Sanity schema will return.

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  role: string;
  status: "live" | "archived" | "in-progress";
  year: string;
  duration: string;
  type: string;
  image: string; // cover / hero image
  screenshots: {
    desktop: { src: string; label: string }[];
    mobile:  { src: string; label: string }[];
  };
  tags: string[];
  tech: { name: string; role: string }[];
  decisions: { title: string; body: string }[];
  challenges: { problem: string; solution: string }[];
  hindsight: string;
  liveUrl:   string | null;
  githubUrl: string | null;
  related:   string[]; // slugs of related projects
};

export const projects: Project[] = [
  {
    slug: "galaxy-coaches-bot",
    title: "Galaxy Coaches WhatsApp Bot",
    tagline: "WhatsApp Bot · 2024",
    description:
      "A full-featured booking bot for a Zimbabwean bus company. Passengers can browse routes, select seats on a dynamically generated seat map, and pay via EcoCash — all inside WhatsApp.",
    problem:
      "Galaxy Coaches was handling all bookings manually. Customers had to call an agent, confirm seat availability verbally, then find a way to pay. It was slow, error-prone, and created a bottleneck at peak travel times. The goal was to automate the entire booking flow inside WhatsApp — the one app every Zimbabwean already uses daily.",
    role:
      "Solo build end to end. I designed the conversation flow, built the backend in TypeScript on Node.js/Express, integrated the Meta WhatsApp Cloud API, implemented seat map generation (SVG → PNG via sharp), and wired up EcoCash payments through the Paynow gateway. I also built the boarding pass ticket image sent on confirmation.",
    status: "live",
    year: "2024",
    duration: "6 weeks",
    type: "Client project",
    image: "/images/projects/galaxy-coaches.jpg",
    screenshots: {
      desktop: [
        { src: "/images/projects/galaxy-coaches-d1.jpg", label: "Booking flow" },
        { src: "/images/projects/galaxy-coaches-d2.jpg", label: "Seat map" },
      ],
      mobile: [
        { src: "/images/projects/galaxy-coaches-m1.jpg", label: "Welcome" },
        { src: "/images/projects/galaxy-coaches-m2.jpg", label: "Seat select" },
        { src: "/images/projects/galaxy-coaches-m3.jpg", label: "Ticket" },
      ],
    },
    tags: ["WhatsApp Bot", "TypeScript", "Node.js"],
    tech: [
      { name: "TypeScript", role: "Language"  },
      { name: "Node.js",    role: "Runtime"   },
      { name: "Express",    role: "Server"    },
      { name: "WhatsApp API", role: "Messaging" },
      { name: "sharp",      role: "Image gen" },
      { name: "Paynow",     role: "Payments"  },
      { name: "ngrok",      role: "Tunneling" },
    ],
    decisions: [
      {
        title: "sharp over canvas for image generation",
        body: "Generating seat map PNGs server-side in a serverless environment ruled out browser canvas. sharp handles SVG → PNG conversion with zero browser dependency and is significantly faster at the file sizes needed.",
      },
      {
        title: "Stateless conversation with session store",
        body: "WhatsApp webhooks are inherently stateless — each message is a fresh request. I built a lightweight in-memory session store keyed on phone number to track booking state across the multi-step flow.",
      },
      {
        title: "Meta Cloud API over Twilio",
        body: "Started on Twilio sandbox for speed, migrated to Meta Cloud API for production. Meta gives direct access to the WhatsApp Business Platform with better rate limits and no per-message cost at scale.",
      },
    ],
    challenges: [
      {
        problem:
          "Webhook verification kept failing during local development, blocking all message testing.",
        solution:
          "Set up ngrok with a persistent subdomain so the tunnel URL stayed stable across restarts and matched the verified webhook in Meta's dashboard.",
      },
      {
        problem:
          "EcoCash payment confirmation had no reliable webhook — polling was needed but created race conditions.",
        solution:
          "Implemented an exponential backoff polling strategy with a maximum retry window, then moved the user to a 'pending confirmation' state rather than blocking the flow.",
      },
    ],
    hindsight:
      "I'd move the session store to Redis from day one instead of in-memory. The in-memory approach works for a single instance but breaks the moment you scale horizontally or restart the server — active booking sessions are lost. Redis would also open the door to cross-device session recovery.",
    liveUrl:   null,
    githubUrl: "https://github.com/MartinM25",
    related:   ["zimbus-demo", "expense-tracker-pwa"],
  },
  {
    slug: "expense-tracker-pwa",
    title: "Expense Tracker PWA",
    tagline: "PWA · 2024",
    description:
      "A fully offline-capable PWA with receipt photo management, WhatsApp sharing, jsPDF exports, and silent email backup via Resend.",
    problem:
      "Most expense tracking apps require a constant internet connection and sync to a cloud service. For users in Zimbabwe where connectivity is inconsistent, this makes them unreliable. The goal was a PWA that works completely offline — with all data stored locally — while still offering sharing and backup options when connectivity is available.",
    role:
      "Solo build. Designed the full UI, implemented offline storage with Dexie.js (IndexedDB wrapper), built the receipt photo pipeline using the Canvas API, wired up jsPDF for exports, integrated WhatsApp share, and set up silent backup email delivery via Resend on a Vercel serverless function.",
    status: "in-progress",
    year: "2024",
    duration: "Ongoing",
    type: "Side project",
    image: "/images/projects/expense-tracker.jpg",
    screenshots: {
      desktop: [
        { src: "/images/projects/expense-d1.jpg", label: "Dashboard" },
        { src: "/images/projects/expense-d2.jpg", label: "Reports" },
      ],
      mobile: [
        { src: "/images/projects/expense-m1.jpg", label: "Home" },
        { src: "/images/projects/expense-m2.jpg", label: "Add expense" },
        { src: "/images/projects/expense-m3.jpg", label: "Receipt" },
      ],
    },
    tags: ["PWA", "React", "TypeScript"],
    tech: [
      { name: "React",      role: "UI"        },
      { name: "Vite",       role: "Bundler"   },
      { name: "TypeScript", role: "Language"  },
      { name: "Dexie.js",   role: "Storage"   },
      { name: "jsPDF",      role: "Exports"   },
      { name: "Canvas API", role: "Receipts"  },
      { name: "Resend",     role: "Email"     },
      { name: "Vercel",     role: "Deploy"    },
    ],
    decisions: [
      {
        title: "Dexie.js over raw IndexedDB",
        body: "Raw IndexedDB API is verbose and difficult to work with. Dexie provides a clean promise-based wrapper with excellent TypeScript support, making complex queries readable and maintainable.",
      },
      {
        title: "Silent backup over active sync",
        body: "Rather than requiring the user to explicitly export or sync, backup emails fire automatically when connectivity is detected. The user stays focused on tracking expenses, not managing their data.",
      },
    ],
    challenges: [
      {
        problem: "Canvas-generated receipt images had inconsistent quality across different device pixel ratios.",
        solution: "Applied devicePixelRatio scaling to the canvas context before drawing, ensuring crisp output on retina and high-DPI screens.",
      },
    ],
    hindsight:
      "I'd use a service worker background sync queue from the start to handle the backup email delivery more reliably. The current connectivity-detection approach works but a proper sync queue would handle edge cases like the app closing mid-send.",
    liveUrl:   null,
    githubUrl: "https://github.com/MartinM25",
    related:   ["galaxy-coaches-bot", "victory-advisory"],
  },
  {
    slug: "victory-advisory",
    title: "Victory Advisory",
    tagline: "Web · 2024",
    description:
      "Client site built with Next.js featuring image optimization, Framer Motion carousel, WhatsApp contact integration, and Vercel deployment.",
    problem:
      "Victory Advisory needed a professional web presence that reflected their positioning as a serious financial advisory firm. The existing site was outdated, not mobile-optimised, and had no clear call-to-action for prospective clients.",
    role:
      "Full project responsibility — design direction, development, and deployment. Conducted a code review of the initial codebase, refactored into proper server/client component architecture, optimised images, and built the WhatsApp contact integration.",
    status: "live",
    year: "2024",
    duration: "3 weeks",
    type: "Client project",
    image: "/images/projects/victory-advisory.jpg",
    screenshots: {
      desktop: [
        { src: "/images/projects/victory-d1.jpg", label: "Homepage" },
        { src: "/images/projects/victory-d2.jpg", label: "Services" },
      ],
      mobile: [
        { src: "/images/projects/victory-m1.jpg", label: "Hero" },
        { src: "/images/projects/victory-m2.jpg", label: "Contact" },
        { src: "/images/projects/victory-m3.jpg", label: "Footer" },
      ],
    },
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    tech: [
      { name: "Next.js",       role: "Framework"  },
      { name: "Tailwind",      role: "Styling"    },
      { name: "Framer Motion", role: "Animation"  },
      { name: "Vercel",        role: "Deploy"     },
    ],
    decisions: [
      {
        title: "Server/client component split",
        body: "The original codebase marked everything as 'use client', blocking server-side rendering. Refactoring into proper server components for static content and client components only where interactivity was needed significantly improved performance.",
      },
    ],
    challenges: [
      {
        problem: "The Framer Motion carousel conflicted with the server component refactor.",
        solution: "Isolated the carousel into its own client component boundary, preserving the animation while keeping the surrounding page server-rendered.",
      },
    ],
    hindsight:
      "I'd push for a CMS integration (Sanity) from the start on client projects of this nature. Currently content updates require a code deployment — that's friction the client shouldn't have to deal with.",
    liveUrl:   "https://victoryadvisory.co.za",
    githubUrl: null,
    related:   ["portfolio-v1", "expense-tracker-pwa"],
  },
  {
    slug: "zimbus-demo",
    title: "ZimBus Pitch Demo",
    tagline: "WhatsApp Bot · 2023",
    description:
      "End-to-end WhatsApp booking demo built on Twilio sandbox, later migrated to Meta Cloud API. Included dynamic seat maps generated via SVG to PNG.",
    problem:
      "Needed a working prototype to pitch the concept of WhatsApp-based bus booking to stakeholders — fast, without a production WhatsApp Business Account.",
    role: "Solo build — everything from conversation flow design to image generation and the pitch presentation.",
    status: "archived",
    year: "2023",
    duration: "2 weeks",
    type: "Pitch demo",
    image: "/images/projects/zimbus.jpg",
    screenshots: {
      desktop: [
        { src: "/images/projects/zimbus-d1.jpg", label: "Architecture" },
      ],
      mobile: [
        { src: "/images/projects/zimbus-m1.jpg", label: "Chat flow" },
        { src: "/images/projects/zimbus-m2.jpg", label: "Seat map" },
        { src: "/images/projects/zimbus-m3.jpg", label: "Ticket" },
      ],
    },
    tags: ["WhatsApp Bot", "Node.js", "Twilio"],
    tech: [
      { name: "Node.js",    role: "Runtime"   },
      { name: "Express",    role: "Server"    },
      { name: "Twilio",     role: "Messaging" },
      { name: "sharp",      role: "Image gen" },
    ],
    decisions: [
      {
        title: "Twilio sandbox for speed",
        body: "Twilio's sandbox allows rapid prototyping without Meta Business Account approval — the right trade-off for a pitch demo where speed mattered more than production readiness.",
      },
    ],
    challenges: [
      {
        problem: "SVG seat map rendering had font inconsistencies across different sharp versions.",
        solution: "Switched to using geometric shapes only in the SVG — no text rendering — which made output consistent regardless of system fonts.",
      },
    ],
    hindsight:
      "This demo directly led to the Galaxy Coaches project. In hindsight I'd have built it on Meta Cloud API from the start — the Twilio → Meta migration added unnecessary rework.",
    liveUrl:   null,
    githubUrl: "https://github.com/MartinM25",
    related:   ["galaxy-coaches-bot"],
  },
  {
    slug: "portfolio-v1",
    title: "Portfolio v1",
    tagline: "Web · 2023",
    description:
      "First iteration of my personal portfolio built with Next.js and Sanity CMS. Clean layout with skeleton loading states and dynamic project pages.",
    problem:
      "Needed a professional online presence to showcase work to international clients and employers.",
    role: "Full ownership — design, development, content, and deployment.",
    status: "archived",
    year: "2023",
    duration: "2 weeks",
    type: "Personal project",
    image: "/images/projects/portfolio-v1.jpg",
    screenshots: {
      desktop: [
        { src: "/images/projects/pv1-d1.jpg", label: "Home" },
        { src: "/images/projects/pv1-d2.jpg", label: "Projects" },
      ],
      mobile: [
        { src: "/images/projects/pv1-m1.jpg", label: "Hero" },
        { src: "/images/projects/pv1-m2.jpg", label: "Work" },
        { src: "/images/projects/pv1-m3.jpg", label: "Contact" },
      ],
    },
    tags: ["Next.js", "Sanity", "TypeScript"],
    tech: [
      { name: "Next.js",    role: "Framework" },
      { name: "Sanity",     role: "CMS"       },
      { name: "TypeScript", role: "Language"  },
      { name: "Tailwind",   role: "Styling"   },
      { name: "Vercel",     role: "Deploy"    },
    ],
    decisions: [
      {
        title: "Sanity as CMS from day one",
        body: "Even for a personal portfolio, hardcoding project data makes updates tedious. Sanity lets me add or update projects through a studio UI without touching code.",
      },
    ],
    challenges: [
      {
        problem: "Work section fetched client-side with useEffect, preventing SSR.",
        solution: "Refactored to a server component with a direct Sanity fetch, enabling full server-side rendering and removing the loading flash.",
      },
    ],
    hindsight:
      "The design was too generic — it didn't say anything distinctive about me as a developer. That's the main reason this v2 portfolio exists.",
    liveUrl:   "https://martinmanjoro.vercel.app",
    githubUrl: "https://github.com/MartinM25",
    related:   ["victory-advisory"],
  },
];

// Helpers
export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

export function getRelatedProjects(slugs: string[]): Project[] {
  return slugs
    .map(s => projects.find(p => p.slug === s))
    .filter(Boolean) as Project[];
}

export function getAllSlugs(): string[] {
  return projects.map(p => p.slug);
}

# 🗂️ Martin Manjoro — Portfolio

> My dev world in one place. A showcase of personal projects and client work — built for recruiters, clients, and anyone curious about what I do.



![Portfolio Home](screenshots/home.png)



---

## The story

I needed a place where my work could speak for itself. Most of what I build is either for clients or personal projects I care about — and they all deserve a proper home rather than just living in a GitHub repo. The portfolio is also a living template — something I can point clients and recruiters to and say *this is the baseline of what I can do*.

V1 is minimal and clean. V2 is a full redesign with a warmer palette, new typography, and animation throughout via GSAP.

---

## Sections

- **Hero** — First impression, name, title, and a quick read on who I am
- **About** — A bit more on my background and how I work
- **Projects** — Personal builds and client work, each with its own detail page
- **Experience** — Where I've worked and what I've done
- **Contact** — How to reach me

---

## Tech stack

### V1 — Current

| Layer | Technology |
|---|---|
| Framework | Next.js |
| Styling | Tailwind CSS + Shadcn |
| CMS | Sanity |
| Deployment | Vercel |

### V2 — In progress

| Layer | Technology |
|---|---|
| Framework | Next.js |
| Styling | Tailwind CSS |
| Animations | GSAP |
| CMS | Sanity |
| Deployment | Vercel |

---

## Live

| Version | URL |
|---|---|
| V1 | [martinmanjoro.vercel.app](https://martinmanjoro.vercel.app) |
| V2 | `coming soon` |

---

## Screenshots

> V1



![Home](screenshots/home.png)




![Projects](screenshots/projects.png)




![Contact](screenshots/contact.png)



> V2 — update screenshots here when live

---

## Getting started

### Prerequisites
- Node.js 18+
- A [Sanity](https://sanity.io) account for CMS

### Local development

```bash
git clone https://github.com/MartinM25/portfolio.git
cd portfolio
npm install
```

Create a `.env.local` file in the root:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

Start the dev server:

```bash
npm run dev
```

### CMS

Visit `/studio` on your local or live URL to manage content through Sanity.

### Deploy

1. Push to GitHub
2. Import the repo on Vercel
3. Add Sanity environment variables
4. Deploy — content updates auto-trigger a new build via webhook

---

## Updating for V2

When V2 is ready, update the following:

- [ ] Replace screenshots in `/screenshots`
- [ ] Update the V2 live URL in the Live table
- [ ] Update the tech stack table if anything changed
- [ ] Remove this checklist

---

## License

MIT

---

Built by [Martin Manjoro](https://martinmanjoro.vercel.app)

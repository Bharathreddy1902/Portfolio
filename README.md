# Rajasekhar Naidu: AI Engineer Portfolio

A cinematic, fully animated personal portfolio for an AI / ML / GenAI engineer. It is built with **Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, React Three Fiber (Three.js), GSAP ScrollTrigger, Framer Motion, Lenis and Lucide icons**.

All content comes from the resume (`public/resume/Rajasekhar_Naidu_Chinnapothula_Resume.pdf`) and lives in **one place**: `src/data/`.

---

## Features

| Section | What it does |
|---|---|
| **Loader** | ~1.3s boot screen. Shown once per browser session and skipped for reduced-motion users. |
| **Hero** | Three.js neural network with signals moving through its layers, a particle field, mouse parallax, word-by-word name reveal, rotating role titles, magnetic CTAs and animated impact counters. |
| **About** | Summary, focus areas with pointer spotlight, and an interactive *end-to-end ownership* lifecycle explorer (Data → Model → Orchestrate → Serve → Deploy → Monitor → Improve). |
| **Experience** | Vertical timeline whose glowing rail fills as you scroll (GSAP scrub). Roles, impact bullets and tech chips. |
| **Projects** | Filterable 3D-tilt cards with generative SVG visuals per category. Each card opens an accessible case-study dialog covering problem, solution, architecture, contribution, results, tech and links. |
| **Architecture** | Interactive SVG system diagrams (Ayuh LangGraph agent, MLOps agent, PODClassifier, Demand Engine, MediGuide RAG). Edges draw themselves, pulses show data flow, hover traces connections, and clicking a node shows its details. |
| **Skills** | 10 categories with animated icon cards and a scrolling technology strip. |
| **Impact** | Animated counters for the real resume metrics, plus honors and certifications. |
| **Portfolio Assistant** | Chat UI that answers recruiter questions with a client-side BM25 retrieval over the resume content. **No LLM, no backend.** It returns resume passages verbatim with their source and says so in the UI. |
| **Contact** | Validated form (`/api/contact`). It sends via [Resend](https://resend.com) if configured, and otherwise opens the visitor's email client with the message pre-filled. Also includes copy-email, LinkedIn, GitHub and resume download. |

Also included:
- Custom cursor (fine pointers only), scroll progress bar, and active-section nav pill.
- A mobile menu.
- SEO metadata, JSON-LD `Person` schema, `robots.txt`, `sitemap.xml` and an SVG favicon.
- Error and 404 pages.

### Performance & accessibility
- The Three.js scene is code-split (`next/dynamic`, `ssr: false`) and pauses when off-screen or when the tab is hidden. It lowers point counts and DPR on mobile.
- `prefers-reduced-motion` is honoured globally: no Lenis smooth scrolling, a static 3D frame, instant counters, no loader, and CSS animations disabled.
- Semantic landmarks, a skip link, keyboard-operable diagram nodes, tabs and dialog (Esc to close, focus restore), `aria-live` regions for the chat and form status, and visible focus rings.

---

## Project structure

```
src/
  app/
    layout.tsx          # fonts, metadata, JSON-LD
    page.tsx            # section composition
    globals.css         # design tokens + utilities (glass, gradients, spotlight)
    api/contact/route.ts
    robots.ts  sitemap.ts  icon.svg  not-found.tsx  error.tsx
  components/
    layout/             # Navbar, Footer
    providers/          # ClientShell (MotionConfig), SmoothScroll (Lenis + GSAP)
    sections/           # Hero, About, Experience, Projects, Architecture, Skills, Achievements, Assistant, Contact
    three/NeuralScene.tsx
    ui/                 # MagneticButton, TiltCard, Counter, Reveal/SplitReveal, SectionHeading, Loader, Cursor, ScrollProgress, ProjectVisual
  data/
    profile.ts          # ← ALL resume content (experience, projects, skills, metrics, links)
    architectures.ts    # ← diagram nodes/edges
  lib/
    assistant.ts        # client-side retrieval engine for the assistant
    utils.ts  site.ts  useBootReady.ts
public/resume/          # downloadable resume PDF
```

---

## Local setup

Requires **Node.js 18.17+** (tested on Node 20).

```bash
npm install
cp .env.example .env.local   # optional, see below
npm run dev                  # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm start          # serve the production build
npm run lint
npm run typecheck
```

### Environment variables (all optional)

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your deployed URL. Used for canonical/OG metadata, sitemap and robots. |
| `RESEND_API_KEY` | Enables real email delivery from the contact form. Without it the form falls back to `mailto:`. |
| `CONTACT_TO_EMAIL` | Inbox that receives messages (defaults to the resume email). |
| `CONTACT_FROM_EMAIL` | Sender. Use `Portfolio <onboarding@resend.dev>` until you verify a domain in Resend. |

---

## Deploying to Vercel

1. Push this folder to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) → **Import** the repository. Vercel auto-detects Next.js, so no build settings are needed.
3. Under **Environment Variables**, add `NEXT_PUBLIC_SITE_URL` (e.g. `https://rajasekhar.vercel.app`) and, optionally, the Resend variables.
4. Click **Deploy**.
5. Optional: add a custom domain under *Project → Settings → Domains*, then update `NEXT_PUBLIC_SITE_URL` and redeploy.

CLI alternative:

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production
```

---

## Updating content

- **Text, metrics, projects, skills, links** → `src/data/profile.ts`
- **Architecture diagrams** → `src/data/architectures.ts` (node `x`/`y` are centers in a ~1200-wide canvas)
- **Resume PDF** → replace `public/resume/Rajasekhar_Naidu_Chinnapothula_Resume.pdf` (keep the filename or update `profile.resumeUrl`)
- **Project links**: each project accepts optional `github` and `demo` fields. They're empty because the resume lists no public repos or demos. Production projects show a "proprietary" notice and personal projects link to the GitHub profile. Add real URLs when available.
- **Assistant knowledge**: built automatically from `profile.ts`, plus curated answers in `src/lib/assistant.ts`.

### Upgrading the assistant to a real LLM (optional)
Add an API route that sends the user's question plus the knowledge chunks from `src/lib/assistant.ts` to an LLM provider, and call it from `Assistant.tsx`. Update the in-UI "How this works" note when you do, so it stays accurate.

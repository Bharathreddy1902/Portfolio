/**
 * Portfolio assistant: a lightweight, fully client-side retrieval engine.
 * It does NOT call an LLM. It scores curated knowledge chunks (built from the resume data)
 * with a BM25-style ranking plus synonym expansion and returns the best-matching answers verbatim.
 */
import { profile, experience, projects, skillGroups, education, certifications, honors, additionalWork } from "@/data/profile";

export type Chunk = { id: string; source: string; title: string; text: string; keywords?: string[] };

const links = [profile.linkedin && `LinkedIn: ${profile.linkedin}`, profile.github && `GitHub: ${profile.github}`].filter(Boolean).join(" · ");

const curated: Chunk[] = [
  {
    id: "intro",
    source: "Profile",
    title: `Who is ${profile.firstName}?`,
    text: `${profile.name} is a ${profile.currentTitle} at ${profile.currentCompany} in ${profile.location}. ${profile.summary} ${profile.tagline}`,
    keywords: ["who", "about", "introduce", "summary", "background", "overview", "yourself", "tell"],
  },
  {
    id: "years",
    source: "Profile",
    title: "Experience level",
    text: "2 years of professional .NET experience: Junior .NET Developer at Neolotex Business Solutions since Aug 2025 (current), preceded by Trainee .NET Developer at ASCENT Technologies (Feb 2025 – Jul 2025), both in Bangalore.",
    keywords: ["years", "experience", "senior", "level", "long", "how much", "duration"],
  },
  {
    id: "contact",
    source: "Contact",
    title: "How to reach him",
    text: `Email: ${profile.email} · Phone: ${profile.phone}${links ? ` · ${links}` : ""}. The resume can be downloaded from the Contact section.`,
    keywords: ["contact", "email", "reach", "hire", "linkedin", "github", "phone", "connect", "resume", "cv"],
  },
  {
    id: "dotnet",
    source: "Expertise",
    title: ".NET & backend experience",
    text: "He builds web modules following MVC architecture with ASP.NET MVC, ASP.NET Core and C#, implements CRUD / REST-based data operations, and has worked through the full SDLC from requirements and design to testing, deployment and maintenance.",
    keywords: ["dotnet", ".net", "asp.net", "core", "mvc", "c#", "csharp", "backend", "api", "rest", "server"],
  },
  {
    id: "frontend",
    source: "Expertise",
    title: "Frontend experience",
    text: "He designs responsive user interfaces with HTML5, CSS3 and Bootstrap, and uses jQuery and JavaScript for client-side validation and dynamic UI behavior.",
    keywords: ["frontend", "front-end", "ui", "html", "css", "bootstrap", "jquery", "javascript", "responsive", "design"],
  },
  {
    id: "db",
    source: "Expertise",
    title: "Database experience",
    text: "He works with MySQL and SQL Server: stored procedures, functions, indexing and query optimization. At Neolotex he optimized MySQL queries and database indexes to improve data retrieval performance.",
    keywords: ["database", "sql", "mysql", "sql server", "stored procedure", "index", "indexing", "query", "optimization", "performance"],
  },
  {
    id: "edu",
    source: "Education",
    title: "Education & achievements",
    text: `${education.degree}, ${education.school} (${education.period}). ${honors.join(". ")}. ${certifications.join(", ")}.`,
    keywords: ["education", "degree", "college", "university", "btech", "study", "certification", "award", "ieee", "intern", "jntu"],
  },
  {
    id: "why",
    source: "Profile",
    title: "Why hire him",
    text: "He has shipped a production background-verification web application end to end, covering MVC modules, CRUD operations, a responsive Bootstrap UI with jQuery validation, and MySQL query and index optimization. He writes clean, maintainable, scalable code and works well in Agile teams.",
    keywords: ["why", "hire", "strength", "fit", "unique", "different", "good"],
  },
];

function buildChunks(): Chunk[] {
  const out: Chunk[] = [...curated];
  experience.forEach((r, i) =>
    out.push({ id: `exp-${i}`, source: "Experience", title: `${r.title} at ${r.company} (${r.period})`, text: `${r.summary} ${r.highlights.join(" ")}`, keywords: [r.company.toLowerCase(), ...r.tech.map((t) => t.toLowerCase())] }),
  );
  projects.forEach((p) =>
    out.push({
      id: `proj-${p.id}`,
      source: p.context,
      title: `${p.title}: ${p.subtitle}`,
      text: `${p.solution} Stack: ${p.tech.join(", ")}.`,
      keywords: [p.title.toLowerCase(), p.category.toLowerCase(), "project", "fadv", "verification", ...p.tech.map((t) => t.toLowerCase())],
    }),
  );
  additionalWork.forEach((w, i) => out.push({ id: `work-${i}`, source: "Experience", title: w.title, text: w.points.join(". ") + ".", keywords: w.tech.map((t) => t.toLowerCase()) }));
  skillGroups.forEach((g) => out.push({ id: `skill-${g.name}`, source: "Skills", title: g.name, text: `${g.name}: ${g.items.join(", ")}.`, keywords: g.items.map((t) => t.toLowerCase()) }));
  return out;
}

const STOP = new Set("a an the is are was were be of to in on for and or with what which who how does do did has have his he him your you me i it its about tell can could please any some there this that from by at as".split(" "));
const SYN: Record<string, string[]> = {
  dotnet: [".net", "asp.net", "c#"],
  csharp: ["c#"],
  backend: ["asp.net", "mvc", "c#"],
  frontend: ["html", "bootstrap", "jquery"],
  db: ["database", "mysql", "sql"],
  projects: ["project", "fadv"],
  hire: ["contact", "why"],
  salary: ["contact"],
  location: ["bangalore", "contact"],
  skills: ["skills", "stack"],
};

const tokenize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s/-]/g, " ")
    .split(/[\s/]+/)
    .map((t) => t.replace(/^[.-]+|[.-]+$/g, ""))
    .filter((t) => t && !STOP.has(t));

type Indexed = Chunk & { tf: Map<string, number>; len: number; kw: Set<string> };
let INDEX: { docs: Indexed[]; df: Map<string, number>; avg: number } | null = null;

function index() {
  if (INDEX) return INDEX;
  const docs = buildChunks().map((c) => {
    const toks = tokenize(`${c.title} ${c.text}`);
    const tf = new Map<string, number>();
    toks.forEach((t) => tf.set(t, (tf.get(t) ?? 0) + 1));
    return { ...c, tf, len: toks.length, kw: new Set((c.keywords ?? []).flatMap(tokenize)) };
  });
  const df = new Map<string, number>();
  docs.forEach((d) => d.tf.forEach((_, t) => df.set(t, (df.get(t) ?? 0) + 1)));
  INDEX = { docs, df, avg: docs.reduce((s, d) => s + d.len, 0) / docs.length };
  return INDEX;
}

export type Answer = { found: boolean; results: Chunk[] };

export function ask(question: string): Answer {
  const { docs, df, avg } = index();
  let q = tokenize(question);
  q = [...q, ...q.flatMap((t) => SYN[t] ?? [])];
  if (!q.length) return { found: false, results: [] };
  const N = docs.length, k1 = 1.4, b = 0.75;
  const scored = docs
    .map((d) => {
      let s = 0;
      q.forEach((t) => {
        const f = d.tf.get(t) ?? 0;
        if (f) {
          const idf = Math.log(1 + (N - (df.get(t) ?? 0) + 0.5) / ((df.get(t) ?? 0) + 0.5));
          s += (idf * f * (k1 + 1)) / (f + k1 * (1 - b + (b * d.len) / avg));
        }
        if (d.kw.has(t)) s += 2.2;
      });
      return { d, s };
    })
    .filter((x) => x.s > 1.5)
    .sort((a, b) => b.s - a.s);
  if (!scored.length) return { found: false, results: [] };
  const top = scored[0].s;
  const results = scored.filter((x) => x.s >= top * 0.6).slice(0, 2).map((x) => x.d);
  return { found: true, results };
}

export const suggestedQuestions = [
  "What .NET experience does he have?",
  "Tell me about the FADV project",
  "What databases has he worked with?",
  "Does he do frontend work?",
  "Where did he study?",
  "How can I contact him?",
];

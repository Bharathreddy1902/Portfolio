/**
 * Interactive architecture diagrams. Coordinates are in a 1200 x H SVG viewBox (node centers).
 * Every component reflects what the resume states for that system.
 */

export type NodeKind = "input" | "api" | "agent" | "model" | "store" | "process" | "output" | "monitor";

export type ArchNode = { id: string; label: string; sub?: string; x: number; y: number; kind: NodeKind; detail: string };
export type ArchEdge = { from: string; to: string; curve?: number; dashed?: boolean; label?: string };

export type Architecture = {
  id: string;
  title: string;
  tagline: string;
  height: number;
  nodes: ArchNode[];
  edges: ArchEdge[];
};

export const kindMeta: Record<NodeKind, { label: string; color: string }> = {
  input: { label: "User / Browser", color: "#7ee8fa" },
  api: { label: "Controller", color: "#5b9bff" },
  agent: { label: "Validation", color: "#a78bfa" },
  model: { label: "Model / Business Logic", color: "#c084fc" },
  store: { label: "Database", color: "#38bdf8" },
  process: { label: "Processing", color: "#8fb8ff" },
  output: { label: "View / Output", color: "#34d399" },
  monitor: { label: "Performance", color: "#fbbf24" },
};

export const architectures: Architecture[] = [
  {
    id: "fadv",
    title: "FADV: ASP.NET MVC Web App",
    tagline: "Bootstrap UI · jQuery validation · MVC controllers · C# modules · optimized MySQL",
    height: 500,
    nodes: [
      { id: "user", label: "HR / Verifier", sub: "browser", x: 90, y: 250, kind: "input", detail: "Users manage candidates and track the status of their background verification." },
      { id: "ui", label: "Responsive UI", sub: "HTML · CSS · Bootstrap", x: 260, y: 250, kind: "output", detail: "Responsive user interfaces built with HTML, CSS and Bootstrap." },
      { id: "client", label: "Client Validation", sub: "jQuery · JavaScript", x: 260, y: 90, kind: "agent", detail: "jQuery and JavaScript provide client-side validation and dynamic UI behavior before a request reaches the server." },
      { id: "ctrl", label: "MVC Controllers", sub: "ASP.NET MVC / Core", x: 450, y: 250, kind: "api", detail: "Web modules follow MVC architecture with ASP.NET MVC/Core controllers handling each request." },
      { id: "cand", label: "Candidate Module", sub: "C# · CRUD", x: 650, y: 130, kind: "model", detail: "C# module implementing create, read, update and delete for candidate data." },
      { id: "verif", label: "Verification Module", sub: "status tracking", x: 650, y: 370, kind: "model", detail: "Manages verification records and tracks each candidate's verification status to support secure business workflows." },
      { id: "db", label: "MySQL", sub: "candidates · verifications", x: 860, y: 250, kind: "store", detail: "MySQL stores candidate and verification records." },
      { id: "opt", label: "Query Optimization", sub: "indexes · tuned queries", x: 860, y: 430, kind: "monitor", detail: "Optimized MySQL queries and database indexes to improve data retrieval performance." },
      { id: "views", label: "Razor Views", sub: "status dashboards", x: 1080, y: 250, kind: "output", detail: "Results rendered back to the user as views showing records and verification status." },
    ],
    edges: [
      { from: "user", to: "ui" },
      { from: "ui", to: "client" },
      { from: "client", to: "ctrl" },
      { from: "ui", to: "ctrl" },
      { from: "ctrl", to: "cand" },
      { from: "ctrl", to: "verif" },
      { from: "cand", to: "db" },
      { from: "verif", to: "db" },
      { from: "opt", to: "db", dashed: true },
      { from: "db", to: "views" },
      { from: "views", to: "user", curve: -170, dashed: true, label: "response" },
    ],
  },
  {
    id: "mvc",
    title: "How I Structure MVC Apps",
    tagline: "Request lifecycle across the full stack · SDLC & Agile delivery",
    height: 440,
    nodes: [
      { id: "req", label: "HTTP Request", sub: "browser", x: 90, y: 220, kind: "input", detail: "A user action in the browser sends an HTTP request." },
      { id: "route", label: "Routing", sub: "ASP.NET Core", x: 260, y: 220, kind: "process", detail: "ASP.NET routing maps the URL to the right controller action." },
      { id: "controller", label: "Controller", sub: "C# actions", x: 440, y: 220, kind: "api", detail: "Controllers receive input, call business logic and pick a view." },
      { id: "model", label: "Model", sub: "business logic + data", x: 620, y: 100, kind: "model", detail: "Models hold the data and business rules, keeping controllers thin and code maintainable." },
      { id: "sql", label: "SQL Server / MySQL", sub: "stored procs · functions", x: 820, y: 100, kind: "store", detail: "Data stored in SQL Server or MySQL, using stored procedures, functions and indexing." },
      { id: "view", label: "View", sub: "HTML · Bootstrap", x: 620, y: 340, kind: "output", detail: "Views render responsive HTML with Bootstrap; jQuery adds validation and interactivity." },
      { id: "res", label: "HTTP Response", sub: "rendered page", x: 1050, y: 220, kind: "output", detail: "The rendered page is returned to the browser." },
    ],
    edges: [
      { from: "req", to: "route" },
      { from: "route", to: "controller" },
      { from: "controller", to: "model" },
      { from: "model", to: "sql" },
      { from: "sql", to: "model", curve: 60, dashed: true, label: "data" },
      { from: "controller", to: "view" },
      { from: "view", to: "res" },
    ],
  },
];

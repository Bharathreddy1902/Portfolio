"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Building2, FlaskConical, Github, Lock, Network, Target, Wrench, X, Lightbulb, TrendingUp, Layers } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { profile, projects, type Project } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import ProjectVisual from "@/components/ui/ProjectVisual";
import { cn, scrollToId } from "@/lib/utils";

const FILTERS = ["All", "Agentic AI", "RAG / LLM", "MLOps Agent", "Forecasting", "Computer Vision", "Predictive ML"] as const;
type Filter = (typeof FILTERS)[number];

export function openArchitecture(id: string) {
  window.dispatchEvent(new CustomEvent("rn:arch", { detail: id }));
  scrollToId("architecture");
}

function ProjectCard({ p, onOpen, large }: { p: Project; onOpen: () => void; large?: boolean }) {
  return (
    <TiltCard className="glass gradient-border group flex h-full flex-col overflow-hidden rounded-3xl transition-colors hover:border-electric-400/30" max={large ? 4 : 6}>
      <button onClick={onOpen} className="focus-ring flex h-full flex-col rounded-3xl text-left" aria-haspopup="dialog" aria-label={`Open case study: ${p.title}`}>
        <ProjectVisual category={p.category} className={cn("w-full border-b border-white/5 transition-transform duration-700 group-hover:scale-[1.02]", large ? "h-48 md:h-56" : "h-36")} />
        <div className="flex flex-1 flex-col p-6" style={{ transform: "translateZ(30px)" }}>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-violet-500/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-violet-300">{p.category}</span>
            <span className="inline-flex items-center gap-1 font-mono text-[10px] text-mist-500">
              {p.context.startsWith("Production") ? <Building2 className="h-3 w-3" /> : <FlaskConical className="h-3 w-3" />}
              {p.context}
            </span>
          </div>
          <h3 className={cn("mt-4 font-display font-semibold text-mist-100", large ? "text-2xl md:text-3xl" : "text-xl")}>{p.title}</h3>
          <p className="mt-1 text-sm text-electric-300">{p.subtitle}</p>
          <p className={cn("mt-4 text-sm leading-relaxed text-mist-300", large ? "line-clamp-4" : "line-clamp-3")}>{p.solution}</p>

          <div className="mt-5 flex flex-wrap gap-4">
            {p.results.slice(0, large ? 4 : 2).map((r) => (
              <div key={r.label}>
                <p className="font-display text-xl font-semibold text-white">{r.value}</p>
                <p className="max-w-[9rem] text-[11px] leading-tight text-mist-400">{r.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-6">
            <div className="flex flex-wrap gap-1.5">
              {p.tech.slice(0, large ? 8 : 5).map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
              {p.tech.length > (large ? 8 : 5) && <span className="chip text-mist-500">+{p.tech.length - (large ? 8 : 5)}</span>}
            </div>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-electric-300 transition group-hover:gap-2.5 group-hover:text-white">
              Explore case study <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </button>
    </TiltCard>
  );
}

function Block({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-electric-300">
        <Icon className="h-3.5 w-3.5" /> {title}
      </h4>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function ProjectDialog({ p, onClose }: { p: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const prevFocus = useRef<Element | null>(null);

  useEffect(() => {
    prevFocus.current = document.activeElement;
    closeRef.current?.focus();
    window.__lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.__lenis?.start();
      document.documentElement.style.overflow = "";
      (prevFocus.current as HTMLElement | null)?.focus?.();
    };
  }, [onClose]);

  const isProd = p.context.startsWith("Production");

  return (
    <motion.div className="fixed inset-0 z-[75] flex items-end justify-center p-0 sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }}>
      <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-md" onClick={onClose} />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pd-title"
        data-lenis-prevent
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.98, transition: { duration: 0.18, ease: "easeIn" } }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="glass-strong relative max-h-[92svh] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-t-3xl sm:rounded-3xl"
      >
        <ProjectVisual category={p.category} className="h-40 w-full border-b border-white/5 sm:h-48" />
        <button ref={closeRef} onClick={onClose} aria-label="Close case study" className="focus-ring absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-ink-900/80 text-mist-100 transition hover:bg-ink-800">
          <X className="h-4 w-4" />
        </button>

        <div className="p-6 md:p-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-violet-500/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-violet-300">{p.category}</span>
            <span className="font-mono text-[11px] text-mist-400">{p.context}</span>
          </div>
          <h3 id="pd-title" className="mt-3 font-display text-3xl font-semibold text-white md:text-4xl">{p.title}</h3>
          <p className="mt-1 text-electric-300">{p.subtitle}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {p.results.map((r) => (
              <div key={r.label} className="rounded-2xl border border-electric-400/15 bg-electric-400/[0.05] p-4">
                <p className="font-display text-2xl font-semibold text-white">{r.value}</p>
                <p className="mt-1 text-xs text-mist-300">{r.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <Block icon={Target} title="Business problem">
              <p className="text-sm leading-relaxed text-mist-200">{p.problem}</p>
            </Block>
            <Block icon={Lightbulb} title="Solution">
              <p className="text-sm leading-relaxed text-mist-200">{p.solution}</p>
            </Block>
            <Block icon={Layers} title="Technical architecture">
              <ol className="space-y-2">
                {p.architecture.map((a, i) => (
                  <li key={a} className="flex gap-3 text-sm text-mist-300">
                    <span className="mt-0.5 font-mono text-[10px] text-violet-300">{String(i + 1).padStart(2, "0")}</span>
                    {a}
                  </li>
                ))}
              </ol>
            </Block>
            <Block icon={Wrench} title="My contribution">
              <ul className="space-y-2">
                {p.contribution.map((c) => (
                  <li key={c} className="flex gap-2.5 text-sm text-mist-300">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-electric-400" />
                    {c}
                  </li>
                ))}
              </ul>
            </Block>
          </div>

          <div className="mt-10">
            <Block icon={TrendingUp} title="Technologies">
              <div className="flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </Block>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-white/5 pt-6">
            {p.architectureId && (
              <button onClick={() => { onClose(); setTimeout(() => openArchitecture(p.architectureId!), 50); }} className="focus-ring inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-electric-500 to-violet-500 px-5 py-2.5 text-sm font-medium text-white">
                <Network className="h-4 w-4" /> View interactive architecture
              </button>
            )}
            {p.github ? (
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-mist-100">
                <Github className="h-4 w-4" /> Source code
              </a>
            ) : isProd ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-xs text-mist-400">
                <Lock className="h-3.5 w-3.5" /> Proprietary production system: source and demo are not public
              </span>
            ) : (
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-mist-100 transition hover:border-electric-400/50">
                <Github className="h-4 w-4" /> Browse my GitHub
              </a>
            )}
            {p.demo && (
              <a href={p.demo} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-mist-100">
                <ArrowUpRight className="h-4 w-4" /> Live demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const list = useMemo(() => (filter === "All" ? projects : projects.filter((p) => p.category === filter)), [filter]);
  const open = projects.find((p) => p.id === openId) ?? null;
  const close = useCallback(() => setOpenId(null), []);

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute left-0 top-40 h-96 w-96 rounded-full bg-electric-500/10 blur-[120px]" />
      <div className="container-x">
        <SectionHeading
          index="03"
          label="Featured Work"
          title="AI systems running in production, not notebooks."
          intro="Case studies from production work at Country Delight, plus personal agentic-AI builds. Open any card for the problem, architecture, my contribution and measured results."
        />

        <div role="tablist" aria-label="Filter projects by category" className="-mx-4 mb-10 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {FILTERS.map((f) => (
            <button key={f} role="tab" aria-selected={filter === f} onClick={() => setFilter(f)} className={cn("focus-ring relative shrink-0 rounded-full px-4 py-2 text-sm transition-colors", filter === f ? "text-white" : "text-mist-400 hover:text-mist-100")}>
              {filter === f && <motion.span layoutId="proj-filter" className="absolute inset-0 -z-10 rounded-full border border-electric-400/30 bg-electric-400/10" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-6 [&>*:last-child:nth-child(odd)]:md:col-span-2 [&>*:last-child:nth-child(odd)]:lg:col-span-2">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => {
              const large = filter === "All" && i < 3;
              return (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
                  className="lg:col-span-2"
                >
                  <ProjectCard p={p} large={large} onOpen={() => setOpenId(p.id)} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>{open && <ProjectDialog key={open.id} p={open} onClose={close} />}</AnimatePresence>
    </section>
  );
}

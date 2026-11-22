"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bug, ClipboardList, Code2, Database, GraduationCap, Layout, PenTool, Rocket, Server, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { education, profile } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import { cn, trackSpotlight } from "@/lib/utils";

const pillars = [
  { Icon: Server, title: "Backend Development", text: "Web modules in C# with ASP.NET MVC and ASP.NET Core, following MVC architecture with CRUD / REST-based data operations." },
  { Icon: Layout, title: "Responsive Frontend", text: "Clean interfaces with HTML5, CSS3 and Bootstrap, plus jQuery / JavaScript for client-side validation and dynamic behavior." },
  { Icon: Database, title: "Databases & Performance", text: "MySQL and SQL Server: stored procedures, functions, indexing and query optimization for faster data retrieval." },
  { Icon: ShieldCheck, title: "Clean, Maintainable Code", text: "Scalable, readable codebases, careful debugging and the full SDLC in Agile teams." },
];

const lifecycle = [
  { id: "req", Icon: ClipboardList, label: "Requirements", text: "Gathering requirements and understanding the business workflow, such as how candidates move through background verification.", tools: ["SDLC", "Agile"] },
  { id: "design", Icon: PenTool, label: "Design", text: "Planning MVC modules, database tables and indexes, and responsive page layouts before writing code.", tools: ["MVC Architecture", "MySQL", "Bootstrap"] },
  { id: "build", Icon: Code2, label: "Develop", text: "Building controllers, models and views in C#, CRUD operations against MySQL, and jQuery-powered client-side validation.", tools: ["C#", "ASP.NET Core", "jQuery", "Visual Studio"] },
  { id: "test", Icon: Bug, label: "Test & Debug", text: "Debugging issues end to end and tuning slow SQL queries and indexes to improve data retrieval performance.", tools: ["Debugging", "Query Optimization"] },
  { id: "deploy", Icon: Rocket, label: "Deploy & Maintain", text: "Shipping releases through Git, then maintaining and improving the application as business needs change.", tools: ["Git", "Maintenance"] },
];

export default function About() {
  const [stage, setStage] = useState(lifecycle[0].id);
  const current = lifecycle.find((l) => l.id === stage)!;

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading index="01" label="About" title="Full stack .NET, from database to browser." />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-lg leading-relaxed text-mist-200">{profile.summary}</p>
            </Reveal>
            {profile.summaryLong.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.1}>
                <p className="mt-5 leading-relaxed text-mist-300">{p}</p>
              </Reveal>
            ))}

            <Reveal delay={0.3} className="mt-8 grid grid-cols-3 gap-3">
              {[
                { v: 2, s: "", l: "years of experience" },
                { v: 2, s: "", l: "companies" },
                { v: 15, s: "+", l: "technologies" },
              ].map((x) => (
                <div key={x.l} className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
                  <Counter value={x.v} suffix={x.s} className="font-display text-2xl font-semibold text-white" />
                  <p className="mt-1 text-[11px] leading-tight text-mist-400">{x.l}</p>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.4} className="glass mt-6 flex items-start gap-4 rounded-2xl p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-500/15 text-violet-300">
                <GraduationCap className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-medium text-mist-100">{education.degree}</p>
                <p className="mt-0.5 text-sm text-mist-400">{education.school}</p>
                <p className="mt-1 font-mono text-xs text-electric-300">
                  {education.period}{education.gpa && ` · GPA ${education.gpa}`}
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {pillars.map(({ Icon, title, text }, i) => (
                <Reveal key={title} delay={i * 0.08}>
                  <div onPointerMove={trackSpotlight} className="spotlight glass group h-full rounded-2xl p-5 transition-colors hover:border-electric-400/30">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-electric-500/20 to-violet-500/20 text-electric-300 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-medium text-mist-100">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist-300">{text}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Interactive lifecycle */}
            <Reveal delay={0.2} className="glass mt-4 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <p className="eyebrow">End-to-end ownership</p>
                <p className="hidden font-mono text-[10px] text-mist-500 sm:block">select a stage</p>
              </div>
              <div role="tablist" aria-label="Development lifecycle stages" className="relative mt-5 flex flex-wrap gap-2">
                {lifecycle.map(({ id, Icon, label }, i) => (
                  <button
                    key={id}
                    role="tab"
                    aria-selected={stage === id}
                    aria-controls="lifecycle-panel"
                    onClick={() => setStage(id)}
                    onMouseEnter={() => setStage(id)}
                    className={cn("focus-ring relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition-colors", stage === id ? "text-white" : "text-mist-400 hover:text-mist-100")}
                  >
                    {stage === id && <motion.span layoutId="life-pill" className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-electric-500/30 to-violet-500/30 ring-1 ring-electric-400/40" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                    <span className="font-mono text-[9px] text-electric-400/70">{i + 1}</span>
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </button>
                ))}
              </div>
              <div id="lifecycle-panel" role="tabpanel" className="mt-5 min-h-[112px]">
                <AnimatePresence mode="wait">
                  <motion.div key={current.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                    <p className="text-sm leading-relaxed text-mist-200">{current.text}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {current.tools.map((t) => (
                        <span key={t} className="chip">{t}</span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

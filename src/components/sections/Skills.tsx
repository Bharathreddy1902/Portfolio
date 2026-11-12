"use client";

import { motion } from "framer-motion";
import { Boxes, Brain, Cloud, Code2, Database, GitBranch, Layers, Server, Sparkles, Workflow, type LucideIcon } from "lucide-react";
import { skillGroups } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import { trackSpotlight } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = { Code2, Brain, Layers, Sparkles, Workflow, Boxes, Database, Server, Cloud, GitBranch };

const marquee = ["LangGraph", "OpenAI GPT", "RAG", "FAISS", "Qdrant", "PyTorch", "EfficientNet", "LightGBM", "XGBoost", "Prophet", "FastAPI", "Redis", "Langfuse", "AWS", "GCP Vertex AI", "Docker", "Jenkins", "Kafka", "MLflow", "SHAP", "Hugging Face", "MCP"];

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading index="05" label="Technical Skills" title="A production-grade AI toolkit." intro="Grouped the way I use them, and limited to tools I have worked with." />
      </div>

      {/* floating technology strip */}
      <div className="relative mb-14 overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]" aria-hidden>
        <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
          {[...marquee, ...marquee].map((t, i) => (
            <span key={i} className="glass rounded-full px-4 py-2 font-mono text-xs text-mist-200">
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-electric-400 to-violet-400 align-middle" />
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="container-x">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {skillGroups.map((g, gi) => {
            const Icon = ICONS[g.icon] ?? Sparkles;
            return (
              <motion.article
                key={g.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: (gi % 5) * 0.07 }}
                onPointerMove={trackSpotlight}
                className="spotlight glass group flex flex-col rounded-2xl p-5 transition-colors duration-300 hover:border-electric-400/30"
              >
                <div className="flex items-center gap-3">
                  <motion.span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-electric-500/25 to-violet-500/25 text-electric-200 ring-1 ring-white/10" whileHover={{ rotate: 12, scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Icon className="h-5 w-5 text-electric-300 transition-colors group-hover:text-violet-300" />
                  </motion.span>
                  <div>
                    <h3 className="font-display text-[15px] font-medium leading-tight text-mist-100">{g.name}</h3>
                    <p className="text-[11px] text-mist-500">{g.blurb}</p>
                  </div>
                </div>
                <motion.ul className="mt-4 flex flex-wrap gap-1.5" initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ show: { transition: { staggerChildren: 0.025, delayChildren: 0.2 } } }}>
                  {g.items.map((s) => (
                    <motion.li key={s} variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }} className="chip transition-colors hover:border-electric-400/50 hover:text-white">
                      {s}
                    </motion.li>
                  ))}
                </motion.ul>
                <p className="mt-auto pt-4 font-mono text-[10px] text-mist-500">{g.items.length} tools</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

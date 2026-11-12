"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Activity, Bot, Database, Eye, GraduationCap, LineChart, Rocket, Server, Workflow, RefreshCcw, BrainCircuit } from "lucide-react";
import { useState } from "react";
import { education, profile } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import { cn, trackSpotlight } from "@/lib/utils";

const pillars = [
  { Icon: Bot, title: "Agentic & GenAI Systems", text: "LangGraph state machines, RAG with hybrid reranking, tool-calling agents, prompt caching and Langfuse tracing." },
  { Icon: Eye, title: "Computer Vision", text: "Config-driven PyTorch platform: EfficientNet / MobileNetV3 fine-tuning, TorchScript, batch and real-time inference." },
  { Icon: LineChart, title: "Forecasting & Predictive ML", text: "SKU-level demand forecasting, explainable churn models and customer segmentation feeding the CRM." },
  { Icon: Rocket, title: "MLOps & Deployment", text: "FastAPI / Flask services, Jenkins CI/CD, AWS and GCP deployment, monitoring and human-in-the-loop feedback." },
];

const lifecycle = [
  { id: "data", Icon: Database, label: "Data", text: "Python / SQL ETL with automated validation and data-quality checks; Kafka for real-time customer event streaming; Redshift and S3 data layers.", tools: ["SQL", "Kafka", "Redshift", "S3", "Airflow"] },
  { id: "model", Icon: BrainCircuit, label: "Model", text: "Feature engineering, gradient boosting, time-series, deep-learning vision models and LLM pipelines, with SHAP explainability and error analysis.", tools: ["PyTorch", "LightGBM", "XGBoost", "Prophet", "SHAP"] },
  { id: "agent", Icon: Workflow, label: "Orchestrate", text: "LangGraph graphs with routing, parallel retrieval, slot filling, confidence gates and strict JSON decision contracts.", tools: ["LangGraph", "RAG", "FAISS", "Redis", "OpenAI"] },
  { id: "serve", Icon: Server, label: "Serve", text: "REST APIs with defined contracts and model versioning; Gunicorn workers; batch pipelines with worker threads.", tools: ["FastAPI", "Flask", "Gunicorn", "Docker"] },
  { id: "deploy", Icon: Rocket, label: "Deploy", text: "Jenkins CI/CD; AWS EC2, S3, Lambda, ElastiCache Redis; GCP Vertex AI and Cloud Run.", tools: ["Jenkins", "AWS", "GCP", "GitHub Actions"] },
  { id: "monitor", Icon: Activity, label: "Monitor", text: "Langfuse node and token tracing, forecast-accuracy dashboards, and an autonomous agent watching production ML jobs.", tools: ["Langfuse", "CloudWatch", "Power BI"] },
  { id: "feedback", Icon: RefreshCcw, label: "Improve", text: "Human-in-the-loop review apps (FastAPI, Gradio) that turn reviewer corrections into new labelled training data.", tools: ["Gradio", "FastAPI", "MySQL"] },
];

export default function About() {
  const [stage, setStage] = useState(lifecycle[0].id);
  const current = lifecycle.find((l) => l.id === stage)!;

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading index="01" label="About" title="Production AI, from raw data to monitored decisions." />

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
                { v: 2, s: "+", l: "years in production" },
                { v: 6, s: "", l: "vision models live" },
                { v: 5, s: "+", l: "pipelines on my ML package" },
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
                  {education.period} · GPA {education.gpa}
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
              <div role="tablist" aria-label="ML lifecycle stages" className="relative mt-5 flex flex-wrap gap-2">
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

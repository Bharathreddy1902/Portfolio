"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, CornerDownLeft, Info, RotateCcw, Search, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ask, suggestedQuestions, type Chunk } from "@/lib/assistant";
import { profile } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn, scrollToId } from "@/lib/utils";

type Msg = { id: number; role: "user" | "bot"; text?: string; results?: Chunk[]; notFound?: boolean };

const GREETING: Msg = {
  id: 0,
  role: "bot",
  text: "Hi! I can answer questions about Rajasekhar's experience, projects, skills and impact. I search his resume and portfolio content, so every answer comes straight from those sources.",
};

export default function Assistant() {
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [msgs, busy]);

  const send = (q: string) => {
    const question = q.trim();
    if (!question || busy) return;
    setInput("");
    setMsgs((m) => [...m, { id: idRef.current++, role: "user", text: question }]);
    setBusy(true);
    // Small delay so the retrieval step is visible; the search itself is synchronous and instant.
    window.setTimeout(() => {
      try {
        const res = ask(question);
        setMsgs((m) => [...m, res.found ? { id: idRef.current++, role: "bot", results: res.results } : { id: idRef.current++, role: "bot", notFound: true }]);
      } catch {
        setMsgs((m) => [...m, { id: idRef.current++, role: "bot", text: "Sorry, something went wrong while searching. Please try rephrasing." }]);
      } finally {
        setBusy(false);
      }
    }, 450);
  };

  return (
    <section id="assistant" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute right-10 top-20 h-80 w-80 rounded-full bg-violet-600/15 blur-[120px]" />
      <div className="container-x">
        <SectionHeading index="07" label="Portfolio Assistant" title="Ask about my background." intro="Recruiters can ask direct questions about my experience, skills or projects. The assistant pulls the answer from my resume and portfolio content." />

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="glass-strong gradient-border flex h-[560px] flex-col overflow-hidden rounded-3xl lg:col-span-8">
            <div className="flex items-center justify-between border-b border-white/5 px-5 py-3.5">
              <div className="flex items-center gap-3">
                <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-electric-500 to-violet-500">
                  <Bot className="h-[18px] w-[18px] text-white" />
                </span>
                <div>
                  <p className="text-sm font-medium text-mist-100">Portfolio Assistant</p>
                  <p className="font-mono text-[10px] text-emerald-300">● local retrieval · no data leaves your browser</p>
                </div>
              </div>
              <button onClick={() => setMsgs([GREETING])} className="focus-ring grid h-8 w-8 place-items-center rounded-lg text-mist-400 transition hover:bg-white/5 hover:text-white" aria-label="Reset conversation">
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>

            <div ref={scroller} data-lenis-prevent className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-5" aria-live="polite" aria-busy={busy}>
              <AnimatePresence initial={false}>
                {msgs.map((m) => (
                  <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className={cn("flex gap-3", m.role === "user" && "flex-row-reverse")}>
                    <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-lg", m.role === "user" ? "bg-white/10" : "bg-electric-500/20")}>
                      {m.role === "user" ? <User className="h-3.5 w-3.5 text-mist-200" /> : <Bot className="h-3.5 w-3.5 text-electric-300" />}
                    </span>
                    <div className={cn("max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed", m.role === "user" ? "bg-gradient-to-r from-electric-500/80 to-violet-500/80 text-white" : "border border-white/5 bg-white/[0.03] text-mist-200")}>
                      {m.text && <p>{m.text}</p>}
                      {m.results?.map((r, i) => (
                        <div key={r.id} className={cn(i > 0 && "mt-3 border-t border-white/5 pt-3")}>
                          <p className="font-medium text-mist-100">{r.title}</p>
                          <p className="mt-1">{r.text}</p>
                          <p className="mt-2 font-mono text-[10px] text-electric-300">source · {r.source}</p>
                        </div>
                      ))}
                      {m.notFound && (
                        <p>
                          I couldn&apos;t find that in the resume. Try asking about GenAI agents, RAG, computer vision, forecasting, MLOps, skills or education. For anything else,{" "}
                          <button onClick={() => scrollToId("contact")} className="text-electric-300 underline underline-offset-2 hover:text-white">
                            reach out directly
                          </button>{" "}
                          at {profile.email}.
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {busy && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-electric-500/20">
                    <Search className="h-3.5 w-3.5 animate-pulse text-electric-300" />
                  </span>
                  <span className="flex items-center gap-1 font-mono text-xs text-mist-400">
                    searching resume
                    {[0, 1, 2].map((d) => (
                      <motion.span key={d} className="h-1 w-1 rounded-full bg-electric-400" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }} />
                    ))}
                  </span>
                </motion.div>
              )}
            </div>

            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="border-t border-white/5 p-3">
              <label htmlFor="assistant-input" className="sr-only">Ask a question</label>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-ink-900/60 p-1.5 pl-4 focus-within:border-electric-400/50">
                <input id="assistant-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="e.g. What RAG systems has he built?" maxLength={300} className="min-w-0 flex-1 bg-transparent text-sm text-mist-100 placeholder:text-mist-500 focus:outline-none" autoComplete="off" />
                <button type="submit" disabled={!input.trim() || busy} className="focus-ring inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-electric-500 to-violet-500 px-3.5 py-2 text-xs font-medium text-white transition disabled:opacity-40">
                  Ask <CornerDownLeft className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          </div>

          <aside className="flex flex-col gap-4 lg:col-span-4">
            <div className="glass rounded-3xl p-5">
              <p className="eyebrow">Try asking</p>
              <ul className="mt-4 space-y-2">
                {suggestedQuestions.map((q) => (
                  <li key={q}>
                    <button onClick={() => send(q)} disabled={busy} className="focus-ring w-full rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-left text-sm text-mist-200 transition hover:border-electric-400/40 hover:bg-electric-400/[0.06] hover:text-white disabled:opacity-50">
                      {q}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-3 rounded-2xl border border-amber-300/15 bg-amber-300/[0.04] p-4 text-xs leading-relaxed text-mist-300">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
              <p>
                <span className="font-medium text-mist-100">How this works:</span> this assistant is not connected to an LLM. It runs a keyword-ranking (BM25-style) search over my resume content in your browser and returns the matching passages word for word, so it can&apos;t make things up.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

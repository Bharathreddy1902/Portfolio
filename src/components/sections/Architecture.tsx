"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { MousePointerClick, MoveHorizontal } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { architectures, kindMeta, type ArchEdge, type ArchNode, type Architecture as Arch } from "@/data/architectures";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const XS = 1.18; // horizontal stretch applied to data coordinates
const W = 150;
const H = 54;

type P = { x: number; y: number };

function edgeGeometry(e: ArchEdge, a: ArchNode, b: ArchNode) {
  const A = { x: a.x * XS, y: a.y }, B = { x: b.x * XS, y: b.y };
  let p0: P, p1: P, p2: P, p3: P;
  if (e.curve !== undefined) {
    const up = e.curve < 0;
    p0 = { x: A.x, y: up ? A.y - H / 2 : A.y + H / 2 };
    p3 = { x: B.x, y: up ? B.y - H / 2 : B.y + H / 2 };
    const cy = (up ? Math.min(p0.y, p3.y) : Math.max(p0.y, p3.y)) + e.curve;
    p1 = { x: A.x, y: cy };
    p2 = { x: B.x, y: cy };
  } else if (Math.abs(B.x - A.x) > W + 20) {
    const dir = Math.sign(B.x - A.x);
    p0 = { x: A.x + (dir * W) / 2, y: A.y };
    p3 = { x: B.x - (dir * W) / 2, y: B.y };
    const mx = (p0.x + p3.x) / 2;
    p1 = { x: mx, y: p0.y };
    p2 = { x: mx, y: p3.y };
  } else {
    const dir = Math.sign(B.y - A.y) || 1;
    p0 = { x: A.x, y: A.y + (dir * H) / 2 };
    p3 = { x: B.x, y: B.y - (dir * H) / 2 };
    const my = (p0.y + p3.y) / 2;
    p1 = { x: p0.x, y: my };
    p2 = { x: p3.x, y: my };
  }
  const d = `M${p0.x},${p0.y} C${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`;
  const mid = { x: 0.125 * p0.x + 0.375 * p1.x + 0.375 * p2.x + 0.125 * p3.x, y: 0.125 * p0.y + 0.375 * p1.y + 0.375 * p2.y + 0.125 * p3.y };
  return { d, mid };
}

function Diagram({ arch, selected, onSelect }: { arch: Arch; selected: string | null; onSelect: (id: string) => void }) {
  const reduce = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hover, setHover] = useState<string | null>(null);
  const focus = hover ?? selected;
  const nodes = useMemo(() => Object.fromEntries(arch.nodes.map((n) => [n.id, n])), [arch]);
  const edges = useMemo(() => arch.edges.map((e) => ({ e, ...edgeGeometry(e, nodes[e.from], nodes[e.to]) })), [arch, nodes]);
  const connected = (id: string) => !focus || id === focus || arch.edges.some((e) => (e.from === focus && e.to === id) || (e.to === focus && e.from === id));
  const vb = useMemo(() => {
    const xs = arch.nodes.map((n) => n.x * XS), ys = arch.nodes.map((n) => n.y);
    const x0 = Math.min(...xs) - W / 2 - 24, x1 = Math.max(...xs) + W / 2 + 24;
    const y0 = Math.min(...ys) - H / 2 - 28, y1 = Math.max(...ys) + H / 2 + 28;
    return `${x0} ${y0} ${x1 - x0} ${y1 - y0}`;
  }, [arch]);

  return (
    <svg ref={ref} viewBox={vb} className="h-auto w-full" role="img" aria-label={`${arch.title} architecture diagram`}>
      <defs>
        <marker id={`arrow-${arch.id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#8fb8ff" />
        </marker>
        <linearGradient id={`edge-${arch.id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#5b9bff" />
          <stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* edges */}
      {edges.map(({ e, d, mid }, i) => {
        const active = !focus || e.from === focus || e.to === focus;
        return (
          <g key={`${e.from}-${e.to}`} style={{ opacity: active ? 1 : 0.15, transition: "opacity .3s" }}>
            <motion.path
              d={d}
              fill="none"
              stroke={`url(#edge-${arch.id})`}
              strokeOpacity={0.35}
              strokeWidth={1.5}
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : undefined}
              transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.2 + i * 0.07, ease: "easeInOut" }}
            />
            <path d={d} fill="none" stroke={e.dashed ? "#fbbf24" : "#8fb8ff"} strokeOpacity={e.dashed ? 0.7 : 0.55} strokeWidth={1.4} className={reduce ? undefined : "flow-edge"} strokeDasharray="6 6" markerEnd={`url(#arrow-${arch.id})`} style={{ opacity: inView ? 1 : 0, transition: `opacity .4s ${0.6 + i * 0.07}s` }} />
            {!reduce && inView && (
              <circle r={3.2} fill={e.dashed ? "#fbbf24" : "#7ee8fa"} filter="url(#glow)">
                <animateMotion dur={`${2.2 + (i % 4) * 0.35}s`} repeatCount="indefinite" path={d} begin={`${(i % 5) * 0.3}s`} />
              </circle>
            )}
            {e.label && (
              <text x={mid.x} y={mid.y - 6} textAnchor="middle" className="fill-amber-300 font-mono" fontSize={10}>
                {e.label}
              </text>
            )}
          </g>
        );
      })}

      {/* nodes */}
      {arch.nodes.map((n, i) => {
        const c = kindMeta[n.kind].color;
        const isSel = selected === n.id;
        const dim = !connected(n.id);
        return (
          <motion.g
            key={n.id}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: dim ? 0.3 : 1, scale: 1 } : undefined}
            transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : i * 0.06 }}
            style={{ transformOrigin: `${n.x * XS}px ${n.y}px`, cursor: "pointer" }}
            onMouseEnter={() => setHover(n.id)}
            onMouseLeave={() => setHover(null)}
            onClick={() => onSelect(n.id)}
            onKeyDown={(ev) => (ev.key === "Enter" || ev.key === " ") && (ev.preventDefault(), onSelect(n.id))}
            onFocus={() => setHover(n.id)}
            onBlur={() => setHover(null)}
            tabIndex={0}
            role="button"
            aria-label={`${n.label}: ${n.detail}`}
            aria-pressed={isSel}
            className="outline-none [&:focus-visible>rect:first-child]:stroke-white"
          >
            <rect x={n.x * XS - W / 2 - 4} y={n.y - H / 2 - 4} width={W + 8} height={H + 8} rx={16} fill={c} opacity={isSel ? 0.18 : 0} style={{ transition: "opacity .3s" }} />
            <rect x={n.x * XS - W / 2} y={n.y - H / 2} width={W} height={H} rx={12} fill="#0a1020" stroke={c} strokeOpacity={isSel || hover === n.id ? 1 : 0.45} strokeWidth={isSel ? 2 : 1.2} style={{ transition: "stroke-opacity .2s" }} />
            <rect x={n.x * XS - W / 2} y={n.y - H / 2 + 12} width={3} height={H - 24} rx={1.5} fill={c} />
            <text x={n.x * XS} y={n.sub ? n.y - 3 : n.y + 4} textAnchor="middle" fill="#eef2ff" fontSize={12.5} fontWeight={600} fontFamily="var(--font-display)">
              {n.label}
            </text>
            {n.sub && (
              <text x={n.x * XS} y={n.y + 14} textAnchor="middle" fill="#a3aecf" fontSize={9} fontFamily="var(--font-mono)">
                {n.sub}
              </text>
            )}
          </motion.g>
        );
      })}
    </svg>
  );
}

export default function Architecture() {
  const [archId, setArchId] = useState(architectures[0].id);
  const arch = architectures.find((a) => a.id === archId)!;
  const [selected, setSelected] = useState<string | null>(null);
  const node = arch.nodes.find((n) => n.id === selected);

  useEffect(() => {
    const on = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (architectures.some((a) => a.id === id)) { setArchId(id); setSelected(null); }
    };
    window.addEventListener("rn:arch", on);
    return () => window.removeEventListener("rn:arch", on);
  }, []);

  const usedKinds = Array.from(new Set(arch.nodes.map((n) => n.kind)));

  return (
    <section id="architecture" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-[500px] -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(91,155,255,0.08),transparent_65%)]" />
      <div className="container-x relative">
        <SectionHeading
          index="04"
          label="Architecture"
          title="How the systems are actually wired."
          intro="Interactive diagrams of how my web applications are built. Hover a component to trace its connections, or click it for details. The moving pulses show a request flowing through the stack."
        />

        <div role="tablist" aria-label="Select a system" className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {architectures.map((a, i) => (
            <button
              key={a.id}
              role="tab"
              aria-selected={a.id === archId}
              onClick={() => { setArchId(a.id); setSelected(null); }}
              className={cn("focus-ring relative shrink-0 rounded-xl border px-4 py-2.5 text-left text-sm transition-colors", a.id === archId ? "border-electric-400/40 bg-electric-400/10 text-white" : "border-white/5 text-mist-400 hover:border-white/15 hover:text-mist-100")}
            >
              <span className="mr-2 font-mono text-[10px] text-violet-300">{String(i + 1).padStart(2, "0")}</span>
              {a.title.split(":")[0]}
            </button>
          ))}
        </div>

        <div className="glass gradient-border overflow-hidden rounded-3xl">
          <div className="flex flex-col gap-2 border-b border-white/5 px-5 py-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-display text-lg font-medium text-mist-100">{arch.title}</h3>
              <p className="font-mono text-[11px] text-mist-400">{arch.tagline}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {usedKinds.map((k) => (
                <span key={k} className="inline-flex items-center gap-1.5 text-[11px] text-mist-400">
                  <span className="h-2 w-2 rounded-full" style={{ background: kindMeta[k].color }} />
                  {kindMeta[k].label}
                </span>
              ))}
            </div>
          </div>

          <div className="relative overflow-x-auto" data-lenis-prevent-horizontal>
            <div className="min-w-[860px] p-4 md:p-6">
              <AnimatePresence mode="wait">
                <motion.div key={arch.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <Diagram arch={arch} selected={selected} onSelect={(id) => setSelected((s) => (s === id ? null : id))} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <p className="flex items-center gap-1.5 px-5 pb-3 font-mono text-[10px] text-mist-500 md:hidden">
            <MoveHorizontal className="h-3 w-3" /> swipe to explore the diagram
          </p>

          <div className="min-h-[96px] border-t border-white/5 px-5 py-5" aria-live="polite">
            <AnimatePresence mode="wait">
              {node ? (
                <motion.div key={node.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="flex flex-col gap-2 md:flex-row md:items-start md:gap-6">
                  <div className="flex shrink-0 items-center gap-2 md:w-60">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: kindMeta[node.kind].color, boxShadow: `0 0 10px ${kindMeta[node.kind].color}` }} />
                    <span className="font-display font-medium text-white">{node.label}</span>
                    <span className="font-mono text-[10px] text-mist-500">{kindMeta[node.kind].label}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-mist-200">{node.detail}</p>
                </motion.div>
              ) : (
                <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-sm text-mist-400">
                  <MousePointerClick className="h-4 w-4 text-electric-400" /> Click any component to see what it does and how it was built.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

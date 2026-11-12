"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { Bot, Cloud, Eye } from "lucide-react";
import { useEffect } from "react";
import portrait from "@/assets/rajasekhar-portrait.webp";
import { profile } from "@/data/profile";

const chips = [
  { Icon: Bot, label: "LangGraph · RAG", sub: "Agentic AI", pos: "left-[-14%] top-[14%] sm:left-[-18%]", depth: 26, delay: 0.9, float: "0s" },
  { Icon: Eye, label: "PyTorch · Vision", sub: "6 models live", pos: "right-[-14%] top-[46%] lg:right-[-5%]", depth: 34, delay: 1.05, float: "1.5s" },
  { Icon: Cloud, label: "AWS · MLOps", sub: "~92% less monitoring", pos: "left-[-8%] bottom-[10%] sm:left-[-12%]", depth: 20, delay: 1.2, float: "3s" },
];

function Chip({ c, mx, my, play }: { c: (typeof chips)[number]; mx: MotionValue<number>; my: MotionValue<number>; play: boolean }) {
  const x = useTransform(mx, (v) => v * c.depth);
  const y = useTransform(my, (v) => v * c.depth);
  return (
    <motion.div style={{ x, y }} className={`absolute z-20 hidden sm:block ${c.pos}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: 12 }}
        animate={play ? { opacity: 1, scale: 1, y: 0 } : undefined}
        transition={{ delay: c.delay, type: "spring", stiffness: 220, damping: 18 }}
      >
        <div className="glass-strong flex animate-float items-center gap-2.5 rounded-2xl py-2 pl-2 pr-3.5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)]" style={{ animationDelay: c.float }}>
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-electric-500/30 to-violet-500/30 text-electric-300">
            <c.Icon className="h-4 w-4" />
          </span>
          <span className="leading-tight">
            <span className="block whitespace-nowrap text-xs font-medium text-mist-100">{c.label}</span>
            <span className="block whitespace-nowrap font-mono text-[10px] text-mist-400">{c.sub}</span>
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Animated portrait: curtain reveal, spinning gradient ring, AI scan line, floating chips with pointer parallax. */
export default function HeroPortrait({ play }: { play: boolean }) {
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 18 });
  const my = useSpring(rawY, { stiffness: 60, damping: 18 });
  const rotY = useTransform(mx, [-1, 1], [-7, 7]);
  const rotX = useTransform(my, [-1, 1], [6, -6]);
  const imgX = useTransform(mx, (v) => v * -10);
  const imgY = useTransform(my, (v) => v * -10);

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const on = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth) * 2 - 1);
      rawY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", on, { passive: true });
    return () => window.removeEventListener("pointermove", on);
  }, [reduce, rawX, rawY]);

  return (
    <div className="relative mx-auto w-[min(56vw,230px)] sm:w-[300px] lg:w-full lg:max-w-[420px]" style={{ perspective: 1200 }}>
      {/* ambient glow */}
      <motion.div
        aria-hidden
        className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(91,155,255,0.35),rgba(139,92,246,0.18)_45%,transparent_70%)] blur-2xl"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={play ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />

      <motion.div style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }} className="relative">
        {/* spinning gradient ring */}
        <motion.div
          className="relative overflow-hidden rounded-[2rem] p-[2px] lg:rounded-[2.5rem]"
          initial={{ opacity: 0, y: 40, scale: 0.92 }}
          animate={play ? { opacity: 1, y: 0, scale: 1 } : undefined}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div aria-hidden className="absolute -inset-[60%] animate-[spin_7s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,#5b9bff_70deg,#a78bfa_140deg,transparent_200deg,#7ee8fa_290deg,transparent_360deg)]" />

          <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(2rem-2px)] bg-ink-900 lg:rounded-[calc(2.5rem-2px)]">
            {/* curtain reveal */}
            <motion.div
              className="absolute inset-0"
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              animate={play ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
            >
              <motion.div className="absolute -inset-4" style={{ x: imgX, y: imgY }}>
                <motion.div className="absolute inset-0" initial={{ scale: 1.25 }} animate={play ? { scale: 1 } : undefined} transition={{ duration: 1.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                  <Image
                    src={portrait}
                    alt={`Portrait of ${profile.name}`}
                    fill
                    priority
                    placeholder="blur"
                    sizes="(max-width: 640px) 62vw, (max-width: 1024px) 300px, 420px"
                    className="object-cover object-[50%_22%]"
                  />
                </motion.div>
              </motion.div>
              {/* tint + fade into page */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-electric-500/10" />
              <div className="absolute inset-0 mix-blend-overlay [background:linear-gradient(140deg,rgba(91,155,255,0.25),transparent_40%,rgba(167,139,250,0.25))]" />
            </motion.div>

            {/* AI scan line */}
            {!reduce && (
              <motion.div
                aria-hidden
                className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-cyan-300/25 to-transparent"
                initial={{ top: "-25%", opacity: 0 }}
                animate={play ? { top: ["-25%", "110%"], opacity: [0, 1, 1, 0] } : undefined}
                transition={{ duration: 2.2, delay: 1.3, ease: "easeInOut", repeat: Infinity, repeatDelay: 5 }}
              >
                <div className="absolute inset-x-0 top-1/2 h-px bg-cyan-300/80 shadow-[0_0_12px_#7ee8fa]" />
              </motion.div>
            )}

            {/* detection corners */}
            {[
              "left-3 top-3 border-l-2 border-t-2 rounded-tl-lg",
              "right-3 top-3 border-r-2 border-t-2 rounded-tr-lg",
              "bottom-3 left-3 border-b-2 border-l-2 rounded-bl-lg",
              "bottom-3 right-3 border-b-2 border-r-2 rounded-br-lg",
            ].map((c, i) => (
              <motion.span
                key={c}
                aria-hidden
                className={`absolute h-6 w-6 border-cyan-300/80 ${c}`}
                initial={{ opacity: 0, scale: 1.6 }}
                animate={play ? { opacity: 1, scale: 1 } : undefined}
                transition={{ delay: 1.1 + i * 0.06, duration: 0.4 }}
              />
            ))}

            {/* name plate */}
            <motion.div
              className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-2xl border border-white/10 bg-ink-950/55 px-3.5 py-2.5 backdrop-blur-md sm:inset-x-4 sm:bottom-4"
              initial={{ opacity: 0, y: 16 }}
              animate={play ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 1.35, duration: 0.6 }}
            >
              <span className="leading-tight">
                <span className="block whitespace-nowrap font-display text-sm font-medium text-white">{profile.shortName}</span>
                <span className="block font-mono text-[10px] text-electric-300">AI / ML Engineer</span>
              </span>
              <span className="hidden items-center gap-1.5 font-mono text-[10px] text-emerald-300 sm:flex">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                {profile.currentCompany}
              </span>
            </motion.div>
          </div>
        </motion.div>

        {chips.map((c) => (
          <Chip key={c.label} c={c} mx={mx} my={my} play={play} />
        ))}
      </motion.div>
    </div>
  );
}

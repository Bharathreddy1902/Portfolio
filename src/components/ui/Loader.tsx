"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { signalBootReady } from "@/lib/useBootReady";

const STEPS = ["loading embeddings", "building graph", "warming inference", "ready"];

/** Short cinematic boot screen (~1.3s). Skipped on repeat visits within a session and for reduced motion. */
export default function Loader() {
  const [show, setShow] = useState(true);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("rn-boot") === "1"; } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) { setShow(false); return; }

    document.documentElement.style.overflow = "hidden";
    const start = performance.now();
    const DURATION = 1300;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      setPct(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        try { sessionStorage.setItem("rn-boot", "1"); } catch {}
        setTimeout(() => setShow(false), 180);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); document.documentElement.style.overflow = ""; };
  }, []);

  useEffect(() => {
    if (show) return;
    document.documentElement.style.overflow = "";
    signalBootReady();
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[90] grid place-items-center bg-ink-950"
          exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
          aria-hidden
        >
          <div className="w-[min(320px,80vw)]">
            <div className="flex items-end justify-between font-mono text-xs text-mist-400">
              <span className="text-electric-300">RN://boot</span>
              <span className="tabular-nums text-mist-100">{pct}%</span>
            </div>
            <div className="mt-3 h-px w-full overflow-hidden bg-ink-700">
              <div className="h-full bg-gradient-to-r from-electric-400 via-violet-400 to-cyan-300 transition-[width] duration-75" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-3 font-mono text-[11px] text-mist-500">
              {">"} {STEPS[Math.min(STEPS.length - 1, Math.floor(pct / 26))]}
              <span className="ml-1 inline-block h-3 w-1.5 animate-pulse bg-electric-400 align-middle" />
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

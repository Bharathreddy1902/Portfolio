"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/** Fade/slide-in when scrolled into view. */
export function Reveal({ children, className, delay = 0, y = 24, as = "div" }: { children: React.ReactNode; className?: string; delay?: number; y?: number; as?: "div" | "li" | "article" }) {
  const M = motion[as];
  return (
    <M className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </M>
  );
}

const wordV: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: (i: number) => ({ y: "0%", opacity: 1, transition: { delay: i * 0.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] } }),
};

/** Word-by-word masked text reveal. */
export function SplitReveal({ text, className, wordClassName, delay = 0, play }: { text: string; className?: string; wordClassName?: string; delay?: number; play?: boolean }) {
  const words = text.split(" ");
  const trigger = play !== undefined ? { animate: play ? "show" : "hidden" } : { whileInView: "show", viewport: { once: true, margin: "-40px" } };
  return (
    <motion.span className={cn("inline", className)} initial="hidden" {...trigger} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden>
          <motion.span className={cn("inline-block", wordClassName)} variants={wordV} custom={i + delay * 20}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

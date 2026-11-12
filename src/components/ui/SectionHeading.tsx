"use client";

import { motion } from "framer-motion";
import { SplitReveal } from "./Reveal";
import { cn } from "@/lib/utils";

/** Numbered section header: "// 03 — Label", large title, optional intro. */
export default function SectionHeading({ index, label, title, intro, align = "left", className }: { index: string; label: string; title: string; intro?: string; align?: "left" | "center"; className?: string }) {
  return (
    <header className={cn("mb-12 md:mb-16", align === "center" && "mx-auto text-center", className)}>
      <motion.div
        className={cn("flex items-center gap-3", align === "center" && "justify-center")}
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-mono text-xs text-violet-300">{`// ${index}`}</span>
        <motion.span className="h-px w-10 origin-left bg-gradient-to-r from-electric-400 to-transparent" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }} />
        <span className="eyebrow">{label}</span>
      </motion.div>
      <h2 className="mt-5 max-w-4xl font-display text-3xl font-semibold leading-[1.1] tracking-tight text-mist-100 sm:text-4xl md:text-5xl">
        <SplitReveal text={title} />
      </h2>
      {intro && (
        <motion.p
          className={cn("mt-5 max-w-2xl text-base leading-relaxed text-mist-300 md:text-lg", align === "center" && "mx-auto")}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          {intro}
        </motion.p>
      )}
    </header>
  );
}

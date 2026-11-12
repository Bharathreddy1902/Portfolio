"use client";

import { motion } from "framer-motion";
import { Award, BadgeCheck, Trophy } from "lucide-react";
import { achievements, certifications, honors } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import Counter from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { trackSpotlight } from "@/lib/utils";

export default function Achievements() {
  return (
    <section id="impact" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-electric-400/40 to-transparent" />
      <div className="container-x">
        <SectionHeading index="06" label="Impact" title="Measured in production, not in slides." intro="Every number below comes from systems I built and shipped." />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {achievements.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (i % 5) * 0.06 }}
              onPointerMove={trackSpotlight}
              className={`spotlight glass group relative overflow-hidden rounded-2xl p-5 ${i < 2 ? "gradient-border" : ""}`}
            >
              <Counter value={a.value} prefix={a.prefix} suffix={a.suffix} className="font-display text-3xl font-semibold text-white md:text-4xl" />
              <p className="mt-2 text-sm font-medium leading-snug text-mist-100">{a.label}</p>
              <p className="mt-2 text-xs leading-relaxed text-mist-400">{a.detail}</p>
              <motion.span className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-electric-400 to-violet-400" initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.3 + (i % 5) * 0.06 }} />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <Reveal className="glass rounded-2xl p-6">
            <h3 className="flex items-center gap-2 font-display text-lg text-mist-100">
              <Trophy className="h-5 w-5 text-amber-300" /> Honors & recognition
            </h3>
            <ul className="mt-4 space-y-3">
              {honors.map((h) => (
                <li key={h} className="flex gap-3 text-sm leading-relaxed text-mist-300">
                  <Award className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="glass rounded-2xl p-6">
            <h3 className="flex items-center gap-2 font-display text-lg text-mist-100">
              <BadgeCheck className="h-5 w-5 text-electric-300" /> Certifications
            </h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {certifications.map((c) => (
                <li key={c} className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-mist-200">
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

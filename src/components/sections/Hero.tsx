"use client";

import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowRight, Download, Github, Linkedin, Mail, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroStats, profile } from "@/data/profile";
import MagneticButton from "@/components/ui/MagneticButton";
import Counter from "@/components/ui/Counter";
import { SplitReveal } from "@/components/ui/Reveal";
import HeroPortrait from "@/components/ui/HeroPortrait";
import { scrollToId } from "@/lib/utils";
import { useBootReady } from "@/lib/useBootReady";

gsap.registerPlugin(ScrollTrigger);

const NeuralScene = dynamic(() => import("@/components/three/NeuralScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,rgba(91,155,255,0.18),transparent_55%)]" />,
});

function RotatingRole({ play }: { play: boolean }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!play) return;
    const id = setInterval(() => setI((v) => (v + 1) % profile.roles.length), 2800);
    return () => clearInterval(id);
  }, [play]);
  return (
    <span className="relative inline-flex h-[1.25em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span key={i} initial={{ y: "100%", opacity: 0 }} animate={{ y: "0%", opacity: 1 }} exit={{ y: "-100%", opacity: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="text-gradient whitespace-nowrap">
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const ready = useBootReady();
  const content = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLElement>(null);

  // Cinematic scroll-out: content drifts up and fades as the hero leaves the viewport.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.to(content.current, { yPercent: -18, opacity: 0.1, ease: "none", scrollTrigger: { trigger: section.current, start: "top top", end: "bottom top", scrub: true } });
    }, section);
    return () => ctx.revert();
  }, []);

  const fade = (d: number) => ({ initial: { opacity: 0, y: 18 }, animate: ready ? { opacity: 1, y: 0 } : undefined, transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] as const } });

  return (
    <section id="top" ref={section} className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28" aria-label="Introduction">
      {/* layered background */}
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[520px] w-[520px] rounded-full bg-electric-500/20 blur-[140px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-[460px] w-[460px] rounded-full bg-violet-600/20 blur-[140px]" />
      <NeuralScene />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />

      <div ref={content} className="container-x relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="order-2 lg:order-1 lg:col-span-7">
          <motion.div {...fade(0.05)} className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pl-2 pr-4 text-xs text-mist-200">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulseRing rounded-full bg-emerald-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono">
              {profile.currentTitle} @ {profile.currentCompany}
              <span className="text-mist-500"> · {profile.location.split(",")[0]}</span>
            </span>
          </motion.div>

          <h1 className="mt-7 font-display text-[clamp(2.6rem,7.5vw,6rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-mist-100">
            <SplitReveal text={profile.firstName} play={ready} delay={0.1} />
            <br />
            <SplitReveal text={profile.lastName} play={ready} delay={0.2} wordClassName="text-gradient" />
          </h1>

          <motion.p {...fade(0.45)} className="mt-6 font-display text-xl text-mist-200 sm:text-2xl md:text-3xl">
            <RotatingRole play={ready} />
          </motion.p>

          <motion.p {...fade(0.6)} className="mt-6 max-w-xl text-base leading-relaxed text-mist-300 md:text-lg">
            I build <span className="text-mist-100">responsive, secure web applications with ASP.NET MVC, ASP.NET Core and C#</span> end to end, from clean MVC modules and optimized MySQL databases to Bootstrap interfaces with jQuery validation.
          </motion.p>

          <motion.div {...fade(0.75)} className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticButton onClick={() => scrollToId("projects")}>
              View Projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </MagneticButton>
            <MagneticButton href={profile.resumeUrl} download variant="outline">
              <Download className="h-4 w-4" /> Download Resume
            </MagneticButton>
            <MagneticButton onClick={() => scrollToId("contact")} variant="ghost">
              <Mail className="h-4 w-4" /> Contact Me
            </MagneticButton>
          </motion.div>

          <motion.div {...fade(0.9)} className="mt-8 flex flex-wrap items-center gap-4 font-mono text-xs text-mist-400">
            <a href={`mailto:${profile.email}`} className="focus-ring inline-flex items-center gap-1.5 rounded transition hover:text-white">
              <Mail className="h-4 w-4" /> {profile.email}
            </a>
            <span className="h-3 w-px bg-white/15" />
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="focus-ring inline-flex items-center gap-1.5 rounded transition hover:text-white">
              <Phone className="h-4 w-4" /> {profile.phone}
            </a>
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center gap-1.5 rounded transition hover:text-white">
                <Github className="h-4 w-4" /> GitHub
              </a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex items-center gap-1.5 rounded transition hover:text-white">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            )}
          </motion.div>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-5 lg:pl-6">
          <HeroPortrait play={ready} />
        </div>
        </div>

        <motion.dl {...fade(1.05)} className="mt-14 grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4">
          {heroStats.map((s) => (
            <div key={s.label} className="glass gradient-border rounded-2xl p-4">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} className="font-display text-2xl font-semibold text-white md:text-3xl" />
                <p className="mt-1 text-xs leading-snug text-mist-300">{s.label}</p>
                <p className="mt-1 font-mono text-[10px] text-electric-300/80">{s.detail}</p>
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ delay: 1.4 }}
        onClick={() => scrollToId("about")}
        className="focus-ring absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 rounded font-mono text-[10px] uppercase tracking-[0.3em] text-mist-500 md:flex"
        aria-label="Scroll to About section"
      >
        scroll
        <ArrowDown className="h-4 w-4 animate-float text-electric-400" />
      </motion.button>
    </section>
  );
}

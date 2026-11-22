"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, CheckCircle2, MapPin } from "lucide-react";
import { additionalWork, experience } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { trackSpotlight } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const wrap = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (line.current) line.current.style.transform = "scaleY(1)";
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(line.current, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: wrap.current, start: "top 70%", end: "bottom 60%", scrub: 0.6 } });
      gsap.utils.toArray<HTMLElement>("[data-tl-dot]").forEach((dot) => {
        gsap.fromTo(dot, { scale: 0.4, opacity: 0.3 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)", scrollTrigger: { trigger: dot, start: "top 70%", toggleActions: "play none none reverse" } });
      });
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />
      <div className="container-x">
        <SectionHeading index="02" label="Experience" title="Where I build and ship." intro="Two years building ASP.NET MVC / Core web applications in Bangalore, from trainee to junior developer." />

        <div ref={wrap} className="relative">
          {/* rail */}
          <div className="absolute bottom-0 left-[11px] top-2 w-px bg-white/[0.06] md:left-[calc(25%+11px)]" />
          <div ref={line} className="absolute bottom-0 left-[11px] top-2 w-px origin-top bg-gradient-to-b from-electric-400 via-violet-400 to-cyan-300 shadow-[0_0_12px_rgba(91,155,255,0.8)] md:left-[calc(25%+11px)]" />

          <ol className="space-y-14">
            {experience.map((r) => (
              <li key={r.company} className="relative grid gap-6 md:grid-cols-4">
                <div className="pl-10 md:pl-0 md:pr-10 md:text-right">
                  <p className="font-mono text-sm text-electric-300">{r.period}</p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-mist-500">{r.type}</p>
                  <p className="mt-3 hidden items-center gap-1 text-xs text-mist-500 md:inline-flex">
                    <MapPin className="h-3 w-3" /> {r.location}
                  </p>
                </div>

                <span data-tl-dot className="absolute left-0 top-1 grid h-[23px] w-[23px] place-items-center rounded-full border border-electric-400/50 bg-ink-950 md:left-[25%]">
                  <span className="h-2 w-2 rounded-full bg-electric-400 shadow-[0_0_10px_#5b9bff]" />
                </span>

                <Reveal className="pl-10 md:col-span-3 md:pl-12">
                  <div onPointerMove={trackSpotlight} className="spotlight glass gradient-border rounded-3xl p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-electric-500/15 text-electric-300">
                        <Briefcase className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-display text-xl font-semibold text-mist-100 md:text-2xl">{r.title}</h3>
                        <p className="text-sm text-violet-300">{r.company}</p>
                      </div>
                    </div>
                    <p className="mt-5 text-mist-300">{r.summary}</p>
                    <ul className="mt-5 space-y-3">
                      {r.highlights.map((h, i) => (
                        <li key={i} className="flex gap-3 text-sm leading-relaxed text-mist-200">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-electric-400" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {r.tech.map((t) => (
                        <span key={t} className="chip">{t}</span>
                      ))}
                    </div>
                  </div>

                  {r === experience[0] && additionalWork.length > 0 && (
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      {additionalWork.map((w) => (
                        <div key={w.title} className="rounded-2xl border border-white/5 bg-white/[0.015] p-5">
                          <h4 className="text-sm font-medium text-mist-100">{w.title}</h4>
                          <ul className="mt-3 space-y-2">
                            {w.points.map((p) => (
                              <li key={p} className="flex gap-2 text-xs leading-relaxed text-mist-400">
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, profile } from "@/data/profile";
import { cn, scrollToId } from "@/lib/utils";
import { useBootReady } from "@/lib/useBootReady";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const ready = useBootReady();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["top", ...navLinks.map((l) => l.id)].forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); obs.disconnect(); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => { e.preventDefault(); setOpen(false); scrollToId(id); };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : undefined}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <nav aria-label="Primary" className={cn("container-x mt-3 flex items-center justify-between rounded-2xl py-2.5 transition-all duration-500", scrolled ? "glass-strong shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]" : "border border-transparent")}>
        <a href="#top" onClick={go("top")} className="focus-ring group flex items-center gap-2.5 rounded-lg" aria-label="Back to top">
          <span className="relative grid h-9 w-9 place-items-center rounded-xl border border-electric-400/30 bg-ink-850 font-display text-sm font-bold">
            <span className="text-gradient">{profile.initials}</span>
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          </span>
          <span className="hidden font-mono text-xs text-mist-300 sm:block">
            bharath<span className="text-electric-400">.dev</span>
          </span>
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((l, i) => (
            <li key={l.id}>
              <a href={`#${l.id}`} onClick={go(l.id)} className={cn("focus-ring relative block rounded-full px-3 py-1.5 text-[13px] transition-colors", active === l.id ? "text-white" : "text-mist-300 hover:text-white")}>
                {active === l.id && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full border border-electric-400/25 bg-electric-400/10" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                <span className="mr-1 font-mono text-[10px] text-electric-400/70">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href={profile.resumeUrl} download className="focus-ring hidden items-center gap-1.5 rounded-full border border-electric-300/25 px-3.5 py-1.5 text-[13px] text-mist-100 transition hover:border-electric-300/60 hover:bg-electric-400/10 sm:inline-flex">
            <Download className="h-3.5 w-3.5" /> Resume
          </a>
          <button onClick={() => setOpen((o) => !o)} className="focus-ring grid h-9 w-9 place-items-center rounded-xl border border-white/10 text-mist-100 lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu">
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="container-x lg:hidden">
            <ul className="glass-strong mt-2 grid gap-1 rounded-2xl p-3">
              {navLinks.map((l, i) => (
                <motion.li key={l.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                  <a href={`#${l.id}`} onClick={go(l.id)} className={cn("focus-ring flex items-center gap-3 rounded-xl px-3 py-3 text-sm", active === l.id ? "bg-electric-400/10 text-white" : "text-mist-200")}>
                    <span className="font-mono text-[10px] text-electric-400">0{i + 1}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
              <li className="mt-1 border-t border-white/5 pt-2">
                <a href={profile.resumeUrl} download className="focus-ring flex items-center gap-2 rounded-xl px-3 py-3 text-sm text-electric-300">
                  <Download className="h-4 w-4" /> Download resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

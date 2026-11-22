"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowUpRight, Check, CheckCircle2, Copy, Download, Github, Linkedin, Loader2, Mail, Phone, Send } from "lucide-react";
import { useState } from "react";
import { profile } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { trackSpotlight } from "@/lib/utils";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "mailto"; note: string } | { kind: "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "", website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [copied, setCopied] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: "" }));
  };

  const validate = () => {
    const er: Record<string, string> = {};
    if (!form.name.trim()) er.name = "Please enter your name.";
    if (!EMAIL_RE.test(form.email.trim())) er.email = "Please enter a valid email.";
    if (form.message.trim().length < 10) er.message = "Please write at least 10 characters.";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const openMailto = () => {
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}${form.company ? ` (${form.company})` : ""}`);
    const body = encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}${form.company ? `\n${form.company}` : ""}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus({ kind: "sending" });
    // Static hosting (GitHub Pages) has no server: go straight to the visitor's mail app.
    if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "true") {
      openMailto();
      setStatus({ kind: "mailto", note: "Your email app has been opened with your message pre-filled. Just press send." });
      return;
    }
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; fallback?: string; error?: string };
      if (res.ok && data.ok) {
        setStatus({ kind: "sent" });
        setForm({ name: "", email: "", company: "", message: "", website: "" });
      } else if (data.fallback === "mailto" || !data.error) {
        openMailto();
        setStatus({ kind: "mailto", note: "Your email app has been opened with your message pre-filled. Just press send." });
      } else {
        setStatus({ kind: "error", message: data.error || "Something went wrong. Please try again." });
      }
    } catch {
      openMailto();
      setStatus({ kind: "mailto", note: "Network issue. Your email app has been opened with your message pre-filled instead." });
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const channels = [
    { Icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
    { Icon: Linkedin, label: "LinkedIn", value: profile.linkedinHandle, href: profile.linkedin },
    { Icon: Github, label: "GitHub", value: profile.githubHandle, href: profile.github },
  ].filter((c) => c.href);

  const field = "w-full rounded-xl border bg-ink-900/60 px-4 py-3 text-sm text-mist-100 placeholder:text-mist-500 transition focus:border-electric-400/60 focus:outline-none focus:ring-2 focus:ring-electric-400/20";

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-electric-600/10 blur-[140px]" />
      <div className="container-x relative">
        <SectionHeading index="08" label="Contact" title="Let's build something together." intro="Open to .NET Developer, ASP.NET Core Developer and Full Stack Developer roles. The fastest way to reach me is email or phone." />

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-5">
            <Reveal>
              <div onPointerMove={trackSpotlight} className="spotlight glass gradient-border rounded-3xl p-6">
                <p className="eyebrow">Email</p>
                <a href={`mailto:${profile.email}`} className="focus-ring mt-3 block break-all rounded font-display text-xl text-white transition hover:text-electric-300 sm:text-2xl">
                  {profile.email}
                </a>
                <div className="mt-5 flex flex-wrap gap-2">
                  <MagneticButton href={`mailto:${profile.email}`} className="!px-4 !py-2.5">
                    <Mail className="h-4 w-4" /> Send email
                  </MagneticButton>
                  <MagneticButton onClick={copy} variant="outline" className="!px-4 !py-2.5" ariaLabel="Copy email address">
                    {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied" : "Copy"}
                  </MagneticButton>
                </div>
              </div>
            </Reveal>

            {channels.map(({ Icon, label, value, href }, i) => (
              <Reveal key={label} delay={0.08 * (i + 1)}>
                <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="focus-ring glass group flex items-center gap-4 rounded-2xl p-5 transition hover:border-electric-400/30">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-electric-500/15 text-electric-300 transition group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm text-mist-100">{label}</span>
                    <span className="block truncate font-mono text-xs text-mist-400">{value}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-mist-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.24}>
              <a href={profile.resumeUrl} download className="focus-ring group flex items-center gap-4 rounded-2xl border border-violet-400/20 bg-gradient-to-r from-violet-500/10 to-electric-500/10 p-5 transition hover:border-violet-400/50">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-violet-500/20 text-violet-200">
                  <Download className="h-5 w-5" />
                </span>
                <span className="flex-1">
                  <span className="block text-sm text-mist-100">Download resume</span>
                  <span className="block font-mono text-xs text-mist-400">PDF · 2 pages</span>
                </span>
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-7">
            <form onSubmit={submit} noValidate className="glass-strong rounded-3xl p-6 md:p-8" aria-describedby="form-status">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className="mb-1.5 block text-xs text-mist-300">Name *</label>
                  <input id="c-name" value={form.name} onChange={set("name")} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} className={`${field} ${errors.name ? "border-rose-400/60" : "border-white/10"}`} placeholder="Your name" />
                  {errors.name && <p id="e-name" className="mt-1 text-xs text-rose-300">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="c-email" className="mb-1.5 block text-xs text-mist-300">Email *</label>
                  <input id="c-email" type="email" value={form.email} onChange={set("email")} autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "e-email" : undefined} className={`${field} ${errors.email ? "border-rose-400/60" : "border-white/10"}`} placeholder="you@company.com" />
                  {errors.email && <p id="e-email" className="mt-1 text-xs text-rose-300">{errors.email}</p>}
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="c-company" className="mb-1.5 block text-xs text-mist-300">Company / role (optional)</label>
                <input id="c-company" value={form.company} onChange={set("company")} autoComplete="organization" className={`${field} border-white/10`} placeholder="e.g. Hiring for .NET Developer" />
              </div>
              <div className="mt-4">
                <label htmlFor="c-msg" className="mb-1.5 block text-xs text-mist-300">Message *</label>
                <textarea id="c-msg" rows={6} value={form.message} onChange={set("message")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "e-msg" : undefined} className={`${field} resize-none ${errors.message ? "border-rose-400/60" : "border-white/10"}`} placeholder="Tell me about the role or project…" />
                {errors.message && <p id="e-msg" className="mt-1 text-xs text-rose-300">{errors.message}</p>}
              </div>
              {/* honeypot */}
              <input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} className="hidden" aria-hidden />

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <MagneticButton type="submit" disabled={status.kind === "sending"}>
                  {status.kind === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {status.kind === "sending" ? "Sending…" : "Send message"}
                </MagneticButton>
                <div id="form-status" aria-live="polite" className="min-h-[20px] text-sm">
                  <AnimatePresence mode="wait">
                    {status.kind === "sent" && (
                      <motion.p key="ok" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-emerald-300">
                        <CheckCircle2 className="h-4 w-4" /> Message sent. I&apos;ll get back to you soon.
                      </motion.p>
                    )}
                    {status.kind === "mailto" && (
                      <motion.p key="mt" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-start gap-2 text-electric-300">
                        <Mail className="mt-0.5 h-4 w-4 shrink-0" /> {status.note}
                      </motion.p>
                    )}
                    {status.kind === "error" && (
                      <motion.p key="er" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-start gap-2 text-rose-300">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {status.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

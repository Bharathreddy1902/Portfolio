"use client";

import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { scrollToId } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-10">
      <div className="container-x flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-display text-sm text-mist-100">{profile.name}</p>
          <p className="mt-1 font-mono text-[11px] text-mist-500">.NET Full Stack Developer · ASP.NET Core · C# · © {new Date().getFullYear()}</p>
        </div>
        <div className="flex items-center gap-2">
          {[
            { href: profile.github, label: "GitHub", Icon: Github, ext: true },
            { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin, ext: true },
            { href: `mailto:${profile.email}`, label: "Email", Icon: Mail, ext: false },
          ].filter((c) => Boolean(c.href)).map(({ href, label, Icon, ext }) => (
            <a key={label} href={href} aria-label={label} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="focus-ring grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-mist-300 transition hover:border-electric-400/40 hover:text-white">
              <Icon className="h-4 w-4" />
            </a>
          ))}
          <button onClick={() => scrollToId("top")} aria-label="Back to top" className="focus-ring ml-2 grid h-10 w-10 place-items-center rounded-xl bg-electric-500/15 text-electric-300 transition hover:bg-electric-500/25">
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}

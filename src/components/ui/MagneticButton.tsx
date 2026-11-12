"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline";

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  external?: boolean;
  download?: boolean | string;
  ariaLabel?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

const styles: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-electric-500 to-violet-500 text-white shadow-[0_0_30px_-6px_rgba(91,155,255,0.6)] hover:shadow-[0_0_44px_-4px_rgba(139,92,246,0.7)]",
  outline: "border border-electric-300/25 bg-white/[0.02] text-mist-100 hover:border-electric-300/60 hover:bg-electric-400/10",
  ghost: "text-mist-200 hover:text-white hover:bg-white/5",
};

/** Button / link that is gently attracted toward the pointer. */
export default function MagneticButton({ children, href, onClick, variant = "primary", className, external, download, ariaLabel, type = "button", disabled }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 15, mass: 0.3 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 15, mass: 0.3 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const reset = () => { x.set(0); y.set(0); };

  const cls = cn(
    "focus-ring group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-3 text-sm font-medium transition-[background,box-shadow,border-color,color] duration-300 disabled:cursor-not-allowed disabled:opacity-60",
    styles[variant],
    className,
  );

  return (
    <motion.div ref={ref} onPointerMove={onMove} onPointerLeave={reset} style={{ x, y }} className="inline-block">
      {href ? (
        <a href={href} onClick={onClick} className={cls} aria-label={ariaLabel} download={download} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {children}
        </a>
      ) : (
        <button type={type} onClick={onClick} className={cls} aria-label={ariaLabel} disabled={disabled}>
          {children}
        </button>
      )}
    </motion.div>
  );
}

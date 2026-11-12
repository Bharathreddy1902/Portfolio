"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { cn, trackSpotlight } from "@/lib/utils";

/** Card with 3D pointer tilt and a following spotlight glow. */
export default function TiltCard({ children, className, max = 7 }: { children: React.ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 200, damping: 20 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    trackSpotlight(e);
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => { px.set(0.5); py.set(0.5); };

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div onPointerMove={onMove} onPointerLeave={reset} style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className={cn("spotlight h-full", className)}>
        {children}
      </motion.div>
    </div>
  );
}

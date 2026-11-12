"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/** Subtle dot + trailing ring cursor. Only on fine pointers (mouse/trackpad) without reduced motion. */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!mq.matches) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a,button,[role=button],input,textarea,select,[data-cursor]"));
    };
    const d = () => setDown(true);
    const u = () => setDown(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", d);
    window.addEventListener("pointerup", u);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", d);
      window.removeEventListener("pointerup", u);
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[80] h-1.5 w-1.5 rounded-full bg-electric-300" style={{ x, y, translateX: "-50%", translateY: "-50%" }} />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] rounded-full border border-electric-300/50 mix-blend-screen"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: hover ? 46 : 28, height: hover ? 46 : 28, opacity: hover ? 0.9 : 0.5, scale: down ? 0.8 : 1, backgroundColor: hover ? "rgba(91,155,255,0.08)" : "rgba(91,155,255,0)" }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </>
  );
}

"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** Number that counts up when it enters the viewport. */
export default function Counter({ value, prefix = "", suffix = "", decimals = 0, duration = 1.8, className }: { value: number; prefix?: string; suffix?: string; decimals?: number; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) { setDisplay(value); return; }
    const c = animate(0, value, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: setDisplay });
    return () => c.stop();
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{`${prefix}${value}${suffix}`}</span>
      <span aria-hidden className="tabular-nums">
        {prefix}
        {display.toFixed(decimals)}
        {suffix}
      </span>
    </span>
  );
}

"use client";

import { MotionConfig } from "framer-motion";
import SmoothScroll from "./SmoothScroll";
import Loader from "@/components/ui/Loader";
import Cursor from "@/components/ui/Cursor";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <Loader />
        <ScrollProgress />
        <Cursor />
        {children}
      </SmoothScroll>
    </MotionConfig>
  );
}

"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    __rnReady?: boolean;
  }
}

/** Becomes true once the loading screen has finished (or immediately if it was skipped). */
export function useBootReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (window.__rnReady) { setReady(true); return; }
    const on = () => setReady(true);
    window.addEventListener("rn:ready", on);
    return () => window.removeEventListener("rn:ready", on);
  }, []);
  return ready;
}

export function signalBootReady() {
  window.__rnReady = true;
  window.dispatchEvent(new Event("rn:ready"));
}

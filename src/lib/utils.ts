export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

type LenisLike = { scrollTo: (t: HTMLElement | number, o?: { offset?: number; duration?: number; immediate?: boolean }) => void; stop: () => void; start: () => void };

declare global {
  interface Window {
    __lenis?: LenisLike;
  }
}

/** Smooth-scroll to a section id, using Lenis when active, native scrolling otherwise. */
export function scrollToId(id: string) {
  const el = id === "top" ? document.body : document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (window.__lenis) window.__lenis.scrollTo(id === "top" ? 0 : el, { offset: -72, immediate: reduce });
  else if (id === "top") window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", id === "top" ? " " : `#${id}`);
}

/** Track pointer position inside an element as CSS vars for the .spotlight effect. */
export function trackSpotlight(e: React.PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

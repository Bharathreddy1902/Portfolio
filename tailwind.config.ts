import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { 950: "#03050b", 900: "#060a16", 850: "#0a1020", 800: "#0e1630", 700: "#16203f" },
        electric: { 300: "#8fb8ff", 400: "#5b9bff", 500: "#3b7bff", 600: "#2a5ef0" },
        violet: { 300: "#c4b0ff", 400: "#a78bfa", 500: "#8b5cf6", 600: "#7c3aed" },
        cyan: { 300: "#7ee8fa", 400: "#22d3ee" },
        mist: { 100: "#eef2ff", 200: "#cdd5ee", 300: "#a3aecf", 400: "#7783a8", 500: "#566089" },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        flow: { to: { strokeDashoffset: "-24" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        pulseRing: { "0%": { transform: "scale(.9)", opacity: ".7" }, "100%": { transform: "scale(1.8)", opacity: "0" } },
        marquee: { to: { transform: "translateX(-50%)" } },
      },
      animation: {
        flow: "flow 1.2s linear infinite",
        shimmer: "shimmer 6s linear infinite",
        float: "float 6s ease-in-out infinite",
        pulseRing: "pulseRing 2s ease-out infinite",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;

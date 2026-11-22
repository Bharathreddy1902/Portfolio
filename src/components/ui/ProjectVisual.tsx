import type { ProjectCategory } from "@/data/profile";

/** Lightweight generative SVG motif per project category (pure CSS/SVG animation, no images). */
export default function ProjectVisual({ category, className }: { category: ProjectCategory; className?: string }) {
  const common = "absolute inset-0 h-full w-full";
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`} aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(91,155,255,0.22),transparent_60%),radial-gradient(ellipse_at_80%_90%,rgba(167,139,250,0.2),transparent_55%)]" />
      <div className="grid-bg absolute inset-0 opacity-60" />
      {category === "Full Stack Web" && (
        <svg viewBox="0 0 300 140" className={common}>
          {[[40, 70, 110, 35], [40, 70, 110, 70], [40, 70, 110, 105], [110, 35, 190, 70], [110, 70, 190, 70], [110, 105, 190, 70], [190, 70, 260, 40], [190, 70, 260, 100]].map(([a, b, c, d], i) => (
            <line key={i} x1={a} y1={b} x2={c} y2={d} stroke="url(#ga)" strokeWidth="1.2" className="flow-edge" />
          ))}
          {[[40, 70], [110, 35], [110, 70], [110, 105], [190, 70], [260, 40], [260, 100]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="9" fill="#0a1020" stroke={i === 4 ? "#a78bfa" : "#5b9bff"} strokeWidth="1.5" />
              <circle cx={x} cy={y} r="3" fill={i === 4 ? "#a78bfa" : "#7ee8fa"}>
                <animate attributeName="opacity" values="1;.3;1" dur={`${1.4 + i * 0.2}s`} repeatCount="indefinite" />
              </circle>
            </g>
          ))}
          <defs>
            <linearGradient id="ga" x1="0" x2="1"><stop offset="0" stopColor="#5b9bff" /><stop offset="1" stopColor="#a78bfa" /></linearGradient>
          </defs>
        </svg>
      )}
      {category === "Backend / Database" && (
        <svg viewBox="0 0 300 140" className={common}>
          {Array.from({ length: 5 }).map((_, i) => (
            <rect key={i} x={30} y={22 + i * 20} width={70} height={12} rx={3} fill="#16203f" stroke="#5b9bff55">
              <animate attributeName="fill" values="#16203f;#2a5ef0;#16203f" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
            </rect>
          ))}
          <path d="M105 70 C 140 70, 150 70, 180 70" stroke="#7ee8fa" strokeWidth="1.5" className="flow-edge" fill="none" />
          <circle cx="215" cy="70" r="28" fill="none" stroke="#a78bfa" strokeWidth="1.5" />
          <circle cx="215" cy="70" r="28" fill="none" stroke="#a78bfa55" strokeWidth="1">
            <animate attributeName="r" values="28;44" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <text x="215" y="75" textAnchor="middle" fill="#c4b0ff" fontSize="13" fontFamily="monospace">SQL</text>
        </svg>
      )}
      {category === "Frontend / UI" && (
        <svg viewBox="0 0 300 140" className={common}>
          <rect x="95" y="20" width="110" height="100" rx="6" fill="#0a1020" stroke="#5b9bff66" />
          {[[95, 20], [205, 20], [95, 120], [205, 120]].map(([x, y], i) => (
            <path key={i} d={`M${x + (x > 150 ? -14 : 14)} ${y} H${x} V${y + (y > 70 ? -14 : 14)}`} stroke="#7ee8fa" strokeWidth="2.5" fill="none" />
          ))}
          <rect x="95" y="20" width="110" height="3" fill="#7ee8fa" opacity=".8">
            <animate attributeName="y" values="20;117;20" dur="2.6s" repeatCount="indefinite" />
          </rect>
          <rect x="120" y="45" width="60" height="50" rx="4" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x="150" y="40" textAnchor="middle" fill="#c4b0ff" fontSize="9" fontFamily="monospace">valid ✓</text>
        </svg>
      )}
    </div>
  );
}

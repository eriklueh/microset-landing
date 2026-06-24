/** Small shared building blocks: motion helpers, a count-up, live GH stats, icons. */
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { C, mono, REPO_URL, DOWNLOAD_WIN, DOWNLOAD_LINUX, RELEASES_URL } from "./site";

// ---- Marathon HUD chrome -----------------------------------------------------
/** Lime corner brackets framing a card/mock. */
export function Corners({ color = C.acc, size = 10, inset = 6 }: { color?: string; size?: number; inset?: number }) {
  const base: CSSProperties = { position: "absolute", width: size, height: size, pointerEvents: "none" };
  const b = `1.5px solid ${color}`;
  return (
    <>
      <span style={{ ...base, top: inset, left: inset, borderTop: b, borderLeft: b }} />
      <span style={{ ...base, top: inset, right: inset, borderTop: b, borderRight: b }} />
      <span style={{ ...base, bottom: inset, left: inset, borderBottom: b, borderLeft: b }} />
      <span style={{ ...base, bottom: inset, right: inset, borderBottom: b, borderRight: b }} />
    </>
  );
}

const GRID_WORDS = ["SYS", "OK", "PAUSA", "RELAY", "HO-01", "MOV", "SET", "RUN", "MIT", "OSS", "0x28", "CMD", "SYNC", "IDLE", "TAU", "93"];
/** Faint mono micro-text grid for the hero background. */
export function BgGrid() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        gridTemplateColumns: "repeat(8,1fr)",
        gridAutoRows: "42px",
        padding: "92px 74px",
        pointerEvents: "none",
        zIndex: 1,
        alignContent: "start",
        overflow: "hidden",
      }}
    >
      {Array.from({ length: 88 }).map((_, i) => (
        <div key={i} style={{ fontFamily: mono, fontSize: 7, letterSpacing: "0.2em", color: C.grid }}>
          {GRID_WORDS[i % GRID_WORDS.length]}
        </div>
      ))}
    </div>
  );
}

/** Decorative barcode for HUD readouts. */
export function Barcode({ color = "#3a3a32" }: { color?: string }) {
  return (
    <span style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 12 }}>
      {[2, 1, 3, 1, 2, 4, 1].map((w, i) => (
        <span key={i} style={{ width: w, height: 12, background: color }} />
      ))}
    </span>
  );
}

/** Fade + rise into view, once. The default "modern detail" applied across sections. */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  style,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  style?: CSSProperties;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Counts from 0 → `to` the first time it scrolls into view. */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1.2,
  decimals = 0,
  style,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    let raf = 0;
    let start = 0;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / (duration * 1000));
      setVal(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} style={style}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/** Live star/fork counts from the GitHub API (honest, self-updating). null while loading. */
export function useGithubStats() {
  const [stats, setStats] = useState<{ stars: number; forks: number } | null>(null);
  useEffect(() => {
    let alive = true;
    const api = REPO_URL.replace("github.com", "api.github.com/repos");
    fetch(api, { headers: { Accept: "application/vnd.github+json" } })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => {
        if (alive)
          setStats({ stars: d.stargazers_count ?? 0, forks: d.forks_count ?? 0 });
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  return stats;
}

/** Best-effort client OS detection (for tailoring the download CTA). */
export type OS = "windows" | "mac" | "linux" | "other";
export function detectOS(): OS {
  if (typeof navigator === "undefined") return "other";
  const ua = (navigator.userAgent + " " + ((navigator as { platform?: string }).platform ?? "")).toLowerCase();
  if (ua.includes("win")) return "windows";
  if (ua.includes("mac")) return "mac";
  if (ua.includes("linux") || ua.includes("x11") || ua.includes("android")) return "linux";
  return "other";
}
export function useOS(): OS {
  const [os, setOS] = useState<OS>("other");
  useEffect(() => setOS(detectOS()), []);
  return os;
}
/** Pick the right stable installer URL for the detected OS. Mac/other → the releases page,
 *  where every platform's bundle is listed (we ship Windows + Linux). */
export function downloadFor(os: OS): string {
  if (os === "windows") return DOWNLOAD_WIN;
  if (os === "linux") return DOWNLOAD_LINUX;
  return RELEASES_URL;
}

// ---- icons (from the design) -------------------------------------------------
type IP = { size?: number; fill?: string };

export const IconCheck = ({ size = 13, fill = "none" }: IP) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth={3} strokeLinecap="square" strokeLinejoin="miter">
    <path d="M4 12.5l5 5L20 6.5" />
  </svg>
);

export const IconGithub = ({ size = 16, fill = "currentColor" }: IP) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.4 9.4 0 015 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9v2.81c0 .27.18.59.69.49A10.26 10.26 0 0022 12.25C22 6.58 17.52 2 12 2z" />
  </svg>
);

export const IconStar = ({ size = 13, fill = "currentColor" }: IP) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export const IconGrid = ({ size = 15, fill = "currentColor" }: IP) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
    <path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z" />
  </svg>
);

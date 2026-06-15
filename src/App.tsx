import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { HeroMock } from "./components/HeroMock";
import {
  CountUp,
  IconCheck,
  IconGithub,
  IconGrid,
  IconStar,
  Reveal,
  useGithubStats,
  useOS,
} from "./lib/bits";
import { useI18n, LangToggle } from "./lib/i18n";
import {
  C,
  CLONE_CMD,
  DOWNLOAD_URL,
  INSTALLER_SIZE,
  mono,
  REPO_URL,
  RELEASES_URL,
} from "./lib/site";

const wrap: CSSProperties = { maxWidth: 1180, margin: "0 auto", padding: "0 36px" };
const monoLabel: CSSProperties = {
  fontFamily: mono,
  fontSize: 11,
  letterSpacing: "0.2em",
  color: C.acc,
};

export default function App() {
  return (
    <div style={{ background: C.ink, color: C.paper, overflow: "hidden" }}>
      <Nav />
      <Hero />
      <Ticker />
      <How />
      <Method />
      <Features />
      <OpenSource />
      <Brand />
      <FinalCTA />
      <Footer />
    </div>
  );
}

// ---- buttons ----------------------------------------------------------------
function DownloadBtn({ big = false }: { big?: boolean }) {
  const { t } = useI18n();
  const os = useOS();
  const label = os === "windows" ? t.hero.downloadWin : t.hero.downloadFree;
  return (
    <motion.a
      href={DOWNLOAD_URL}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: big ? "16px 30px" : "15px 26px",
        background: C.acc,
        color: C.ink,
        fontFamily: mono,
        fontSize: big ? 14 : 13.5,
        fontWeight: 600,
        letterSpacing: "0.04em",
      }}
    >
      <IconGrid fill={C.ink} />
      {label}
    </motion.a>
  );
}

function GithubBtn() {
  const { t } = useI18n();
  return (
    <motion.a
      href={REPO_URL}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -2, borderColor: C.paper }}
      whileTap={{ scale: 0.97 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "15px 24px",
        border: `2px solid ${C.rule2}`,
        color: C.paper,
        fontFamily: mono,
        fontSize: 13.5,
        fontWeight: 600,
        letterSpacing: "0.04em",
      }}
    >
      <IconGithub fill={C.paper} />
      {t.hero.github}
    </motion.a>
  );
}

// ---- nav --------------------------------------------------------------------
function Nav() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const stats = useGithubStats();
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: `1px solid ${C.rule}`,
        background: scrolled ? "rgba(10,10,10,0.72)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "background 0.3s, backdrop-filter 0.3s",
      }}
    >
      <div
        style={{
          ...wrap,
          padding: "18px 36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <Mark size={26} font={18} />
          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.03em" }}>microset</span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div className="ms-nav-secondary" style={{ display: "flex", alignItems: "center", gap: 26 }}>
            <NavLink href="#how">{t.nav.how}</NavLink>
            <NavLink href="#oss">{t.nav.oss}</NavLink>
          </div>
          <motion.a
            className="ms-nav-star"
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            whileHover={{ borderColor: C.acc }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "7px 12px",
              border: `1px solid ${C.rule2}`,
              fontFamily: mono,
              fontSize: 11,
              letterSpacing: "0.04em",
              color: C.paper,
            }}
          >
            <IconStar fill={C.acc} />
            {stats && stats.stars > 0 ? formatK(stats.stars) : "GitHub"}
          </motion.a>
          <LangToggle />
          <motion.a
            href={DOWNLOAD_URL}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.96 }}
            style={{
              padding: "9px 18px",
              background: C.acc,
              color: C.ink,
              fontFamily: mono,
              fontSize: 11.5,
              fontWeight: 600,
              letterSpacing: "0.06em",
            }}
          >
            {t.nav.download}
          </motion.a>
        </div>
      </div>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <motion.a
      href={href}
      whileHover={{ color: C.paper }}
      style={{ fontFamily: mono, fontSize: 11.5, letterSpacing: "0.1em", color: C.dim }}
    >
      {children}
    </motion.a>
  );
}

/** The lime brand tile with a black "m". */
function Mark({ size, font }: { size: number; font: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        background: C.acc,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "none",
      }}
    >
      <span style={{ fontSize: font, fontWeight: 900, color: C.ink, lineHeight: 1, marginTop: -1 }}>
        m
      </span>
    </div>
  );
}

// ---- hero -------------------------------------------------------------------
function Hero() {
  const { t } = useI18n();
  return (
    <div
      id="top"
      style={{ position: "relative", borderBottom: `1px solid ${C.rule}`, overflow: "hidden" }}
    >
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-5%",
          width: "55%",
          height: "140%",
          background: "radial-gradient(circle at 60% 40%,rgba(196,248,42,0.1),transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <Grain />
      <div
        className="ms-hero"
        style={{
          ...wrap,
          position: "relative",
          padding: "72px 36px 80px",
          display: "flex",
          alignItems: "center",
          gap: 56,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <Reveal y={18}>
            <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 28 }}>
              <span className="ms-blink" style={{ width: 8, height: 8, background: C.acc }} />
              <span
                style={{ fontFamily: mono, fontSize: 11.5, letterSpacing: "0.16em", color: C.acc }}
              >
                {t.hero.badge}
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(48px, 8vw, 84px)",
                fontWeight: 900,
                letterSpacing: "-0.055em",
                lineHeight: 0.88,
                textTransform: "uppercase",
              }}
            >
              {t.hero.titleL1}
              <br />
              {t.hero.titleL2}{" "}
              <span style={{ background: C.acc, color: C.ink, padding: "0 14px" }}>
                {t.hero.titleHi}
              </span>
              .
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p
              style={{
                margin: "30px 0 0",
                maxWidth: 470,
                fontSize: 16.5,
                lineHeight: 1.6,
                color: C.text,
              }}
            >
              {t.hero.lead} <span style={{ color: C.acc }}>{t.hero.leadAccent}</span>
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
              <DownloadBtn />
              <GithubBtn />
            </div>
            <p
              style={{
                margin: "14px 0 0",
                fontFamily: mono,
                fontSize: 11,
                lineHeight: 1.5,
                letterSpacing: "0.02em",
                color: C.faint,
                maxWidth: 470,
              }}
            >
              {t.hero.smartscreen}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                marginTop: 26,
                fontFamily: mono,
                fontSize: 11,
                letterSpacing: "0.06em",
                color: C.faint2,
                flexWrap: "wrap",
              }}
            >
              {t.platform.map((p, i) => (
                <span key={p} style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  {i > 0 && <Dot />}
                  {p}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
        <HeroMock />
      </div>
    </div>
  );
}

function Dot() {
  return <span style={{ width: 3, height: 3, background: C.faint2 }} />;
}

/** Animated film-grain overlay. */
function Grain() {
  return (
    <div
      className="ms-grain"
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.05,
        mixBlendMode: "overlay",
        pointerEvents: "none",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

// ---- ticker -----------------------------------------------------------------
function Ticker() {
  const { t } = useI18n();
  const run = (
    <div style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap", width: "50%" }}>
      {t.ticker.map((p, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              fontFamily: mono,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: C.ink,
              padding: "12px 0",
            }}
          >
            {p}
          </span>
          <span
            style={{
              width: 8,
              height: 8,
              background: C.ink,
              transform: "rotate(45deg)",
              margin: "0 22px",
              flex: "none",
            }}
          />
        </span>
      ))}
    </div>
  );
  return (
    <div style={{ background: C.acc, overflow: "hidden", borderBottom: `1px solid ${C.rule}` }}>
      <div className="ms-marq" style={{ display: "flex", width: "200%" }}>
        {run}
        {run}
      </div>
    </div>
  );
}

// ---- how it works -----------------------------------------------------------
function How() {
  const { t } = useI18n();
  return (
    <div id="how" style={{ borderBottom: `1px solid ${C.rule}` }}>
      <div style={{ ...wrap, padding: "80px 36px" }}>
        <Reveal>
          <div style={{ marginBottom: 48 }}>
            <div style={monoLabel}>{t.how.label}</div>
            <h2
              style={{
                margin: "14px 0 0",
                fontSize: "clamp(32px, 5vw, 46px)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                textTransform: "uppercase",
              }}
            >
              {t.how.titleL1}
              <br />
              {t.how.titleL2}
            </h2>
          </div>
        </Reveal>
        <div
          className="ms-steps"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            borderTop: `1px solid ${C.rule2}`,
            borderLeft: `1px solid ${C.rule2}`,
          }}
        >
          {t.how.steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <motion.div
                whileHover={{ backgroundColor: "rgba(196,248,42,0.04)" }}
                style={{
                  padding: "28px 24px 32px",
                  borderRight: `1px solid ${C.rule2}`,
                  borderBottom: `1px solid ${C.rule2}`,
                  height: "100%",
                }}
              >
                <div style={{ fontFamily: mono, fontSize: 13, color: C.acc, fontWeight: 500 }}>
                  {s.n}
                </div>
                <div
                  style={{
                    fontSize: 19,
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    marginTop: 18,
                    textTransform: "uppercase",
                  }}
                >
                  {s.t}
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.55, color: C.faint, marginTop: 10 }}>
                  {s.d}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- method -----------------------------------------------------------------
function Method() {
  const { t } = useI18n();
  return (
    <div style={{ borderBottom: `1px solid ${C.rule}`, background: C.panel2 }}>
      <div
        className="ms-method"
        style={{ ...wrap, padding: "80px 36px", display: "flex", alignItems: "center", gap: 60 }}
      >
        <Reveal style={{ flex: 1 }}>
          <div style={monoLabel}>{t.method.label}</div>
          <h2
            style={{
              margin: "16px 0 0",
              fontSize: "clamp(34px, 5.5vw, 52px)",
              fontWeight: 900,
              letterSpacing: "-0.045em",
              lineHeight: 0.92,
              textTransform: "uppercase",
            }}
          >
            {t.method.titleL1}
            <br />
            {t.method.titleL2}
            <br />
            {t.method.titleL3}
          </h2>
          <p style={{ margin: "22px 0 0", maxWidth: 430, fontSize: 15, lineHeight: 1.65, color: C.dim }}>
            {t.method.body}
          </p>
        </Reveal>
        <Reveal delay={0.12} style={{ flex: "none" }}>
          <div style={{ display: "flex", border: `1px solid ${C.rule2}` }}>
            <Stat>
              <CountUp to={8} suffix="×" style={statNum(C.acc)} />
              <StatLabel>{t.method.stats[0]}</StatLabel>
            </Stat>
            <Stat>
              <span style={statNum(C.paper)}>~1'</span>
              <StatLabel>{t.method.stats[1]}</StatLabel>
            </Stat>
            <Stat last>
              <span style={statNum(C.paper)}>0</span>
              <StatLabel>{t.method.stats[2]}</StatLabel>
            </Stat>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

const statNum = (color: string): CSSProperties => ({
  fontFamily: mono,
  fontSize: 46,
  fontWeight: 600,
  color,
  letterSpacing: "-0.03em",
  lineHeight: 1,
});

function Stat({ children, last }: { children: ReactNode; last?: boolean }) {
  return (
    <div
      style={{
        padding: "32px 30px",
        borderRight: last ? "none" : `1px solid ${C.rule2}`,
        textAlign: "center",
      }}
    >
      {children}
    </div>
  );
}
function StatLabel({ children }: { children: ReactNode }) {
  return (
    <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.1em", color: C.faint, marginTop: 12 }}>
      {children}
    </div>
  );
}

// ---- features (bento) -------------------------------------------------------
function Features() {
  const { t } = useI18n();
  const f = t.features;
  return (
    <div style={{ borderBottom: `1px solid ${C.rule}` }}>
      <div style={{ ...wrap, padding: "80px 36px" }}>
        <Reveal>
          <div style={monoLabel}>{f.label}</div>
          <h2
            style={{
              margin: "14px 0 44px",
              fontSize: "clamp(32px, 5vw, 46px)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              textTransform: "uppercase",
            }}
          >
            {f.title}
          </h2>
        </Reveal>
        <div
          className="ms-features"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr",
            gridAutoRows: "minmax(220px,auto)",
          }}
        >
          <Cell delay={0}>
            <FLabel>{f.panel.l}</FLabel>
            <FTitle>{f.panel.t}</FTitle>
            <FDesc>{f.panel.d}</FDesc>
            <MiniPanel />
          </Cell>
          <Cell delay={0.06}>
            <FLabel>{f.levels.l}</FLabel>
            <FTitle>{f.levels.t}</FTitle>
            <FDesc>{f.levels.d}</FDesc>
            <MiniLadder />
          </Cell>
          <Cell delay={0.12}>
            <FLabel>{f.sed.l}</FLabel>
            <FTitle>{f.sed.t}</FTitle>
            <FDesc>{f.sed.d}</FDesc>
            <MiniSed />
          </Cell>
          <Cell delay={0.18}>
            <FLabel>{f.notif.l}</FLabel>
            <FTitle>{f.notif.t}</FTitle>
            <FDesc>{f.notif.d}</FDesc>
          </Cell>
          <Cell
            delay={0.24}
            style={{ gridColumn: "span 2", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
          >
            <div>
              <FLabel>{f.gear.l}</FLabel>
              <FTitle>{f.gear.t}</FTitle>
              <FDesc>{f.gear.d}</FDesc>
            </div>
            <div style={{ flex: "none", marginLeft: 24, width: 230 }}>
              <MiniChips />
            </div>
          </Cell>
        </div>
      </div>
    </div>
  );
}

function Cell({
  children,
  style,
  delay = 0,
}: {
  children: ReactNode;
  style?: CSSProperties;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ borderColor: C.faint2 }}
      style={{
        border: `1px solid ${C.rule2}`,
        padding: "26px 26px 28px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

const FLabel = ({ children }: { children: ReactNode }) => (
  <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.14em", color: C.acc }}>{children}</div>
);
const FTitle = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      fontSize: 21,
      fontWeight: 800,
      letterSpacing: "-0.025em",
      marginTop: 12,
      textTransform: "uppercase",
    }}
  >
    {children}
  </div>
);
const FDesc = ({ children }: { children: ReactNode }) => (
  <div style={{ fontSize: 13, lineHeight: 1.55, color: C.faint, marginTop: 8 }}>{children}</div>
);

function MiniPanel() {
  const { t } = useI18n();
  return (
    <div style={{ marginTop: 20, width: "100%", border: `1px solid ${C.rule2}`, background: "#0c0c0c", padding: "11px 13px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, textTransform: "uppercase" }}>{t.mock.ex}</div>
          <div style={{ fontFamily: mono, fontSize: 9.5, color: C.faint, marginTop: 2 }}>{t.features.miniMeta}</div>
        </div>
        <div style={{ fontFamily: mono, fontSize: 15, fontWeight: 600, color: C.ink, background: C.acc, padding: "3px 7px" }}>
          {t.features.miniNow}
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 11 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: 7, background: C.acc, color: C.ink, fontFamily: mono, fontSize: 10, fontWeight: 600 }}>
          <IconCheck size={11} /> {t.features.miniDone}
        </div>
        <div style={{ padding: "7px 12px", border: `1px solid ${C.rule2}`, color: C.dim, fontFamily: mono, fontSize: 10 }}>
          {t.features.miniNo}
        </div>
      </div>
    </div>
  );
}

function MiniLadder() {
  const { t } = useI18n();
  return (
    <div style={{ display: "flex", gap: 4, marginTop: 22 }}>
      {t.features.ladder.map((lv, i) => (
        <div key={lv} style={{ flex: 1 }}>
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{
              height: 9,
              transformOrigin: "bottom",
              background: i < 1 ? "rgba(196,248,42,0.3)" : i === 1 ? C.acc : C.bar0,
            }}
          />
          <div style={{ fontFamily: mono, fontSize: 9, color: i === 1 ? C.acc : C.faint2, marginTop: 7, textAlign: "center" }}>
            {lv}
          </div>
        </div>
      ))}
    </div>
  );
}

function MiniSed() {
  const active = new Set([1, 4, 6]);
  return (
    <div style={{ display: "flex", gap: 4, marginTop: 22 }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0.2, opacity: 0.4 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: i * 0.05, ease: "easeOut" }}
          style={{ flex: 1, height: 30, transformOrigin: "bottom", background: active.has(i) ? C.acc : C.bar0 }}
        />
      ))}
    </div>
  );
}

function MiniChips() {
  const { t } = useI18n();
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
      {t.features.chips.map((c, i) => (
        <motion.span
          key={c}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.07 }}
          style={{
            fontFamily: mono,
            fontSize: 10,
            letterSpacing: "0.04em",
            color: C.dim,
            border: `1px solid ${C.rule2}`,
            padding: "6px 10px",
          }}
        >
          {c}
        </motion.span>
      ))}
    </div>
  );
}

// ---- open source ------------------------------------------------------------
function OpenSource() {
  const { t } = useI18n();
  const stats = useGithubStats();
  const [copied, setCopied] = useState(false);
  const hasTraction = !!stats && stats.stars > 0;
  const copy = () => {
    navigator.clipboard?.writeText(CLONE_CMD).then(
      () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      },
      () => {},
    );
  };

  return (
    <div id="oss" style={{ borderBottom: `1px solid ${C.rule}`, background: C.panel2 }}>
      <div
        className="ms-oss"
        style={{ ...wrap, padding: "80px 36px", display: "flex", alignItems: "center", gap: 56 }}
      >
        <Reveal style={{ flex: 1 }}>
          <div style={monoLabel}>{t.oss.label}</div>
          <h2
            style={{
              margin: "16px 0 0",
              fontSize: "clamp(36px, 6vw, 54px)",
              fontWeight: 900,
              letterSpacing: "-0.045em",
              lineHeight: 0.9,
              textTransform: "uppercase",
            }}
          >
            {t.oss.titleL1}
            <br />
            {t.oss.titleL2}
            <br />
            {t.oss.titleL3}
          </h2>
          <p style={{ margin: "22px 0 0", maxWidth: 420, fontSize: 15, lineHeight: 1.65, color: C.dim }}>
            {t.oss.bodyPre}
            <span style={{ color: C.paper }}>{t.oss.bodyMit}</span>
            {t.oss.bodyMid}
            <span style={{ color: C.paper }}>{t.oss.bodyTauri}</span>
            {t.oss.bodyEnd}
          </p>
          <div style={{ display: "flex", gap: 24, marginTop: 30 }}>
            {hasTraction ? (
              <>
                <OssStat value={formatK(stats!.stars)} label={t.oss.statStars} />
                <OssStat value={formatK(stats!.forks)} label={t.oss.statForks} />
                <OssStat value={INSTALLER_SIZE} label={t.oss.statInstaller} />
              </>
            ) : (
              <>
                <OssStat value={INSTALLER_SIZE} label={t.oss.statInstaller} />
                <OssStat value="MIT" label={t.oss.statLicense} />
                <OssStat value="0" label={t.oss.statTelemetry} />
              </>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.12} className="ms-oss-card" style={{ flex: "none", width: 420 }}>
          <div style={{ border: `1px solid ${C.rule2}`, background: C.ink }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 18px",
                borderBottom: `1px solid ${C.rule2}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <IconGithub size={17} fill={C.dim} />
                <span style={{ fontFamily: mono, fontSize: 13, color: C.paper }}>
                  eriklueh<span style={{ color: C.faint2 }}>/</span>microset
                </span>
              </div>
              <span
                style={{
                  fontFamily: mono,
                  fontSize: 9.5,
                  letterSpacing: "0.06em",
                  color: C.dim,
                  border: `1px solid ${C.rule2}`,
                  padding: "3px 7px",
                }}
              >
                {t.oss.public}
              </span>
            </div>
            <div style={{ padding: "16px 18px" }}>
              <div style={{ fontSize: 13, lineHeight: 1.5, color: C.dim }}>{t.oss.cardDesc}</div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  marginTop: 16,
                  fontFamily: mono,
                  fontSize: 11,
                  color: C.faint,
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 9, height: 9, borderRadius: "50%", background: C.acc }} />
                  Rust
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <IconStar size={12} fill={C.faint} />
                  {hasTraction ? formatK(stats!.stars) : "—"}
                </span>
                <span>⑂ {hasTraction ? formatK(stats!.forks) : "—"}</span>
                <span>MIT</span>
              </div>
            </div>
            <button
              onClick={copy}
              style={{
                width: "100%",
                border: "none",
                borderTop: `1px solid ${C.rule2}`,
                padding: "14px 18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: C.panel2,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span style={{ fontFamily: mono, fontSize: 12, color: C.paper }}>
                <span style={{ color: C.acc }}>$</span> {CLONE_CMD}
              </span>
              <span style={{ fontFamily: mono, fontSize: 9.5, color: copied ? C.acc : C.faint2, letterSpacing: "0.08em" }}>
                {copied ? t.oss.copied : t.oss.copy}
              </span>
            </button>
          </div>
          <motion.a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 9,
              marginTop: 14,
              padding: 14,
              background: C.acc,
              color: C.ink,
              fontFamily: mono,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            <IconStar size={15} fill={C.ink} />
            {t.oss.star}
          </motion.a>
        </Reveal>
      </div>
    </div>
  );
}

function OssStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div style={{ fontFamily: mono, fontSize: 26, fontWeight: 600, color: C.paper }}>{value}</div>
      <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.08em", color: C.faint, marginTop: 5 }}>
        {label}
      </div>
    </div>
  );
}

// ---- brand (lime invert) ----------------------------------------------------
function Brand() {
  const { t } = useI18n();
  return (
    <div style={{ background: C.acc, borderBottom: `1px solid ${C.rule}` }}>
      <div
        style={{
          ...wrap,
          padding: "64px 36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 30,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              fontSize: "clamp(44px, 8vw, 74px)",
              fontWeight: 900,
              letterSpacing: "-0.06em",
              color: C.ink,
              lineHeight: 0.9,
            }}
          >
            microset
          </span>
          <span style={{ display: "inline-block", width: 22, height: 58, background: C.ink, marginLeft: 12 }} />
        </div>
        <div
          style={{
            fontFamily: mono,
            fontSize: 11,
            letterSpacing: "0.14em",
            color: C.ink,
            textAlign: "right",
            lineHeight: 1.9,
            opacity: 0.7,
          }}
        >
          {t.brand.map((l) => (
            <span key={l}>
              {l}
              <br />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- final CTA --------------------------------------------------------------
function FinalCTA() {
  const { t } = useI18n();
  return (
    <div style={{ position: "relative", borderBottom: `1px solid ${C.rule}`, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          bottom: "-40%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          height: "120%",
          background: "radial-gradient(ellipse at 50% 100%,rgba(196,248,42,0.12),transparent 62%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ ...wrap, position: "relative", padding: "96px 36px", textAlign: "center" }}>
        <Reveal>
          <div style={{ display: "inline-flex", marginBottom: 24 }}>
            <Mark size={40} font={28} />
          </div>
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(40px, 7vw, 64px)",
              fontWeight: 900,
              letterSpacing: "-0.05em",
              lineHeight: 0.9,
              textTransform: "uppercase",
            }}
          >
            {t.cta.titleL1}
            <br />
            {t.cta.titleL2}
          </h2>
          <p style={{ margin: "22px auto 0", maxWidth: 420, fontSize: 16, lineHeight: 1.6, color: C.dim }}>
            {t.cta.body}
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 34, flexWrap: "wrap" }}>
            <DownloadBtn big />
            <motion.a
              href={RELEASES_URL}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2, borderColor: C.paper }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: "16px 26px",
                border: `2px solid ${C.rule2}`,
                color: C.paper,
                fontFamily: mono,
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.04em",
              }}
            >
              {t.cta.releases}
            </motion.a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// ---- footer -----------------------------------------------------------------
function Footer() {
  const { t } = useI18n();
  return (
    <div
      style={{
        ...wrap,
        padding: "44px 36px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 30,
        flexWrap: "wrap",
      }}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Mark size={22} font={15} />
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.03em" }}>microset</span>
        </div>
        <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: "0.06em", color: C.faint2, marginTop: 14 }}>
          {t.footer.copyright}
        </div>
      </div>
      <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
        <FootCol title={t.footer.product}>
          <FootLink href={DOWNLOAD_URL}>{t.footer.download}</FootLink>
          <FootLink href="#how">{t.footer.how}</FootLink>
          <FootLink href={`${REPO_URL}/releases`}>{t.footer.changelog}</FootLink>
        </FootCol>
        <FootCol title={t.footer.ossCol}>
          <FootLink href={REPO_URL}>{t.footer.github}</FootLink>
          <FootLink href={`${REPO_URL}/blob/main/LICENSE`}>{t.footer.license}</FootLink>
          <FootLink href={`${REPO_URL}/blob/main/CONTRIBUTING.md`}>{t.footer.contribute}</FootLink>
        </FootCol>
      </div>
    </div>
  );
}

function FootCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <span style={{ fontFamily: mono, fontSize: 9.5, letterSpacing: "0.14em", color: C.faint2 }}>{title}</span>
      {children}
    </div>
  );
}
function FootLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("#") ? undefined : "_blank"}
      rel="noreferrer"
      whileHover={{ color: C.paper }}
      style={{ fontSize: 13, color: C.dim }}
    >
      {children}
    </motion.a>
  );
}

/** 1500 → 1.5k. */
function formatK(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : String(n);
}

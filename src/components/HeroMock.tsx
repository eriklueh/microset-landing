/** The "Hoy"/"Today" app screenshot mock shown in the hero, ported from the design. */
import { motion, useReducedMotion } from "framer-motion";
import { Corners, IconCheck } from "../lib/bits";
import { useI18n } from "../lib/i18n";
import { C, mono, pixel } from "../lib/site";

const ROWS = [
  { idx: "01", t: "09:00", st: "done" },
  { idx: "02", t: "10:07", st: "done" },
  { idx: "05", t: "14:00", st: "now" },
  { idx: "06", t: "15:07", st: "todo" },
] as const;

export function HeroMock() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="ms-hero-mock"
      initial={reduce ? false : { opacity: 0, x: 40, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: 440, flex: "none" }}
    >
      <div
        style={{
          position: "relative",
          border: `1px solid ${C.rule2}`,
          background: C.ink,
          boxShadow: "0 50px 100px -30px rgba(0,0,0,0.8)",
        }}
      >
        <Corners />
        {/* title bar */}
        <div
          style={{
            height: 38,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "0 14px",
            borderBottom: `1px solid ${C.rule2}`,
          }}
        >
          <div style={{ width: 13, height: 13, background: C.acc }} />
          <span style={{ fontSize: 12, color: C.faint }}>microset</span>
        </div>

        <div style={{ padding: "22px 24px 24px" }}>
          {/* masthead */}
          <div
            style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}
          >
            <div
              style={{
                fontSize: 38,
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 0.85,
                textTransform: "uppercase",
              }}
            >
              {t.mock.hoy}
            </div>
            <div style={{ fontFamily: pixel, fontSize: 26, fontWeight: 700, color: C.paper }}>
              03<span style={{ color: C.faint2 }}>/08</span>
            </div>
          </div>
          <div style={{ height: 2, background: C.paper, margin: "14px 0 0" }} />
          <div style={{ display: "flex", height: 4, marginBottom: 18 }}>
            <div style={{ width: "37.5%", background: C.acc }} />
            <div style={{ flex: 1, background: C.bar0 }} />
          </div>

          {/* NOW block */}
          <div
            style={{
              background: C.acc,
              color: C.ink,
              padding: "16px 18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{ fontFamily: mono, fontSize: 10, letterSpacing: "0.16em", fontWeight: 600 }}
              >
                {t.mock.now}
              </div>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.95,
                  marginTop: 5,
                }}
              >
                {t.mock.ex}
              </div>
              <div
                style={{
                  fontFamily: mono,
                  fontSize: 10,
                  letterSpacing: "0.04em",
                  marginTop: 6,
                  opacity: 0.72,
                }}
              >
                {t.mock.meta}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "11px 16px",
                background: C.ink,
                color: C.acc,
                fontFamily: mono,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.06em",
                flex: "none",
              }}
            >
              <IconCheck size={12} /> {t.mock.done}
            </div>
          </div>

          {/* day list */}
          <div
            style={{
              fontFamily: mono,
              fontSize: 9.5,
              letterSpacing: "0.16em",
              color: C.faint,
              margin: "22px 0 4px",
            }}
          >
            {t.mock.day}
          </div>
          <div>
            {ROWS.map((r, i) => {
              const on = r.st === "now";
              const done = r.st === "done";
              const status = done ? t.mock.stDone : on ? t.mock.stNow : t.mock.stTodo;
              return (
                <div
                  key={r.idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: on ? "11px 0 11px 10px" : "11px 0",
                    borderBottom: `1px solid ${C.rule}`,
                    position: "relative",
                    background: on ? "rgba(196,248,42,0.05)" : "transparent",
                  }}
                >
                  {on && (
                    <div
                      style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: C.acc }}
                    />
                  )}
                  <span
                    style={{
                      fontFamily: mono,
                      fontSize: 10,
                      color: on ? C.acc : C.faint2,
                      width: 18,
                      flex: "none",
                    }}
                  >
                    {r.idx}
                  </span>
                  <span
                    style={{
                      fontFamily: mono,
                      fontSize: 14,
                      fontWeight: 500,
                      color: done ? C.faint2 : on ? C.acc : C.dim,
                      width: 52,
                      flex: "none",
                    }}
                  >
                    {r.t}
                  </span>
                  <span
                    style={{
                      flex: 1,
                      fontSize: 15,
                      fontWeight: 700,
                      letterSpacing: "-0.015em",
                      color: done ? C.faint2 : on ? C.paper : C.text,
                    }}
                  >
                    {t.mock.rows[i]}
                  </span>
                  <span
                    style={{
                      fontFamily: mono,
                      fontSize: 9,
                      letterSpacing: "0.08em",
                      fontWeight: 600,
                      color: on ? C.acc : C.faint2,
                    }}
                  >
                    {status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

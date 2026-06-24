/** Tiny dependency-free i18n: EN/ES dictionary + provider + hook + language toggle. */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { C, mono } from "./site";

export type Lang = "es" | "en";

export const STRINGS = {
  es: {
    nav: { how: "CÓMO FUNCIONA", oss: "OPEN SOURCE", download: "DESCARGAR" },
    hero: {
      badge: "EJERCICIO EN CASA · CONTRA EL SEDENTARISMO",
      titleL1: "Entrá en",
      titleL2: "las",
      titleHi: "pausas",
      lead: "microset no es otro recordatorio de estirar: arma una rutina real con tu equipo y la reparte en micro-pausas a lo largo de tu jornada de home office. Te avisa, te movés un minuto, seguís.",
      leadAccent: "Open source, nativo, sin nube.",
      downloadWin: "DESCARGAR PARA WINDOWS",
      downloadLinux: "DESCARGAR PARA LINUX",
      downloadFree: "DESCARGAR GRATIS",
      github: "VER EN GITHUB",
      smartscreen:
        "Sin firmar todavía: si Windows muestra un aviso, tocá Más info → Ejecutar de todos modos.",
    },
    platform: ["WINDOWS 11", "LINUX · APPIMAGE", "TAURI · RUST", "MIT"],
    ticker: [
      "MICRO-PAUSAS DE MOVIMIENTO",
      "8 PAUSAS AL DÍA",
      "CONTRA EL SEDENTARISMO",
      "EJERCICIO DESDE CASA",
      "OPEN SOURCE · MIT",
      "NATIVO · SIN NUBE",
    ],
    how: {
      label: "CÓMO FUNCIONA",
      titleL1: "Configurás una vez.",
      titleL2: "Te movés todo el día.",
      steps: [
        { n: "01", t: "Decí qué tenés", d: "Barra, paraletas, bandas. Solo ejercicios que podés hacer en casa." },
        { n: "02", t: "Armá tu rutina", d: "Elegí ejercicios por tipo de día, ordenálos y planificá tu semana y mes (con días de descarga). Ves qué músculos cubrís y la intensidad la ponés vos." },
        { n: "03", t: "Se reparte solo", d: "Distribuye las series en tu horario, respetando almuerzo y descansos." },
        { n: "04", t: "Te avisa y se adapta", d: "Llega el aviso. Hacés, posponés o decís ahora no y reacomoda." },
      ],
    },
    method: {
      label: "CÓMO SE REPARTE",
      titleL1: "Tu rutina,",
      titleL2: "repartida",
      titleL3: "en el día.",
      body: "microset toma tu rutina y la distribuye en pausas cortas a lo largo de tu jornada, respetando tu horario. La intensidad la elegís vos (descarga / normal / fuerte) sobre Grease the Groove; si te salteás una, reacomoda el resto del día.",
      stats: ["PAUSAS / DÍA", "POR PAUSA", "EXCUSAS"],
    },
    coach: {
      label: "COACH IA",
      titleL1: "Un agente",
      titleL2: "que te arma",
      titleL3: "la rutina.",
      body: "Pedíle a un coach con IA que ajuste tu rutina, tu semana y tu equipo según tu objetivo. Corre con Claude Code, la API de Anthropic o un modelo local — y siempre aprobás los cambios antes de que se apliquen.",
      modesLabel: "3 MODOS",
      modes: ["CLAUDE CODE", "API ANTHROPIC", "LOCAL · OPENAI-COMPAT"],
      review: "Vos aprobás antes de que se aplique.",
      reviewLabel: "REVIEW",
    },
    features: {
      label: "TODO INCLUIDO",
      title: "Una herramienta, no una app más.",
      panel: { l: "SIEMPRE ENCIMA", t: "Panel flotante", d: "Un widget chiquito, always-on-top, con tu próxima serie y la cuenta regresiva." },
      levels: { l: "PROGRESÁ", t: "Niveles", d: "De asistido con banda a lastrado." },
      sed: { l: "CONTRA EL SEDENTARISMO", t: "Salí de la silla", d: "Cortás las horas sentado con pausas cortas repartidas en tu jornada." },
      notif: { l: "AVISOS", t: "Que respetan", d: "Notificaciones nativas, submáximas, sin culpa. Posponé o saltá." },
      gear: { l: "CON LO QUE TENÉS", t: "Tu equipo, tus ejercicios", d: "Decís qué tenés en casa y microset arma la rutina con eso. Nada de membresías." },
      ladder: ["BANDA", "P.CORP", "PESO", "LASTRE"],
      chips: ["BARRA", "PARALETAS", "BANDAS", "ANILLAS"],
      miniNow: "AHORA",
      miniMeta: "5 · PESO CORPORAL",
      miniDone: "HECHO",
      miniNo: "NO",
    },
    oss: {
      label: "CÓDIGO ABIERTO",
      titleL1: "Abierto",
      titleL2: "de par",
      titleL3: "en par.",
      bodyPre: "Sin telemetría, sin cuenta, sin nube. El código vive en GitHub bajo licencia ",
      bodyMit: "MIT",
      bodyMid: " — auditalo, forkealo, hacelo tuyo. Construido con ",
      bodyTauri: "Tauri + Rust",
      bodyEnd: ": liviano, nativo y rápido.",
      statStars: "STARS",
      statForks: "FORKS",
      statInstaller: "INSTALADOR",
      statLicense: "LICENCIA",
      statTelemetry: "TELEMETRÍA",
      cardDesc: "Coach de pausas activas para home office. Movimiento repartido, automático.",
      public: "PUBLIC",
      copy: "COPIAR",
      copied: "COPIADO",
      star: "STAR EN GITHUB",
    },
    brand: ["OPEN SOURCE", "MIT · TAURI · RUST", "WINDOWS · LINUX"],
    cta: {
      titleL1: "Tu próxima serie",
      titleL2: "es en un rato.",
      body: "Instalá microset y dejá que tu día te empuje a moverte.",
      releases: "VER RELEASES →",
    },
    footer: {
      product: "PRODUCTO",
      download: "Descargar",
      how: "Cómo funciona",
      changelog: "Changelog",
      ossCol: "OPEN SOURCE",
      github: "GitHub",
      license: "Licencia MIT",
      contribute: "Contribuir",
      copyright: "© 2026 · MIT · HECHO PARA MOVERSE",
    },
    mock: {
      hoy: "Hoy",
      now: "AHORA — 14:00",
      ex: "FONDOS",
      meta: "5 REPS · PESO CORPORAL",
      done: "HECHO",
      day: "EL DÍA — 8 SERIES",
      rows: ["Dominadas", "Fondos", "Fondos", "L-sit"],
      stDone: "HECHO",
      stNow: "AHORA",
      stTodo: "PENDIENTE",
    },
    marathon: {
      systemName: "SISTEMA DE PAUSA ACTIVA",
      online: "EN LÍNEA",
      relay: "PAUSA ACTIVA RELAY",
      taglinePre: "MICROSET / HOME OFFICE /",
      taglineQuote: "MOVÉS O TE OXIDÁS",
      rec: "REC · VISTA HOY",
      uptime: "UPTIME",
      linuxNote: "TAMBIÉN PARA LINUX",
      freeMit: "GRATIS · MIT",
      proc: "PROC · 4 PASOS",
      session: "INICIAR SESIÓN DE MOVIMIENTO",
    },
  },
  en: {
    nav: { how: "HOW IT WORKS", oss: "OPEN SOURCE", download: "DOWNLOAD" },
    hero: {
      badge: "HOME WORKOUTS · BEAT THE SITTING",
      titleL1: "Train in",
      titleL2: "the",
      titleHi: "breaks",
      lead: "microset isn't another stretch reminder: it builds a real routine from your gear and spreads it into micro-breaks across your work-from-home day. It nudges you, you move for a minute, you carry on.",
      leadAccent: "Open source, native, no cloud.",
      downloadWin: "DOWNLOAD FOR WINDOWS",
      downloadLinux: "DOWNLOAD FOR LINUX",
      downloadFree: "DOWNLOAD FREE",
      github: "VIEW ON GITHUB",
      smartscreen:
        "Not signed yet: if Windows shows a warning, click More info → Run anyway.",
    },
    platform: ["WINDOWS 11", "LINUX · APPIMAGE", "TAURI · RUST", "MIT"],
    ticker: [
      "MOVEMENT MICRO-BREAKS",
      "8 BREAKS A DAY",
      "BEAT SEDENTARISM",
      "EXERCISE FROM HOME",
      "OPEN SOURCE · MIT",
      "NATIVE · NO CLOUD",
    ],
    how: {
      label: "HOW IT WORKS",
      titleL1: "Set it up once.",
      titleL2: "Move all day.",
      steps: [
        { n: "01", t: "Say what you have", d: "Bar, parallettes, bands. Only exercises you can do at home." },
        { n: "02", t: "Build your routine", d: "Pick exercises per day type, reorder them and plan your week and month (with deload days). See which muscles you cover; intensity is up to you." },
        { n: "03", t: "It spreads itself", d: "It distributes the sets across your schedule, respecting lunch and breaks." },
        { n: "04", t: "It nudges and adapts", d: "The reminder pops. You do it, snooze, or say not now and it reshuffles." },
      ],
    },
    method: {
      label: "HOW IT SPREADS",
      titleL1: "Your routine,",
      titleL2: "spread across",
      titleL3: "your day.",
      body: "microset takes your routine and distributes it into short breaks throughout your day, respecting your schedule. Intensity is your call (deload / normal / push) on top of Grease the Groove; skip one and it reshuffles the rest of the day.",
      stats: ["BREAKS / DAY", "PER BREAK", "EXCUSES"],
    },
    coach: {
      label: "AI COACH",
      titleL1: "An agent",
      titleL2: "that builds",
      titleL3: "your routine.",
      body: "Ask an AI coach to adjust your routine, week and gear toward your goal. It runs with Claude Code, the Anthropic API or a local model — and you always approve the changes before they apply.",
      modesLabel: "3 MODES",
      modes: ["CLAUDE CODE", "ANTHROPIC API", "LOCAL · OPENAI-COMPAT"],
      review: "You approve before it applies.",
      reviewLabel: "REVIEW",
    },
    features: {
      label: "ALL INCLUDED",
      title: "A tool, not just another app.",
      panel: { l: "ALWAYS ON TOP", t: "Floating panel", d: "A tiny always-on-top widget with your next set and the countdown." },
      levels: { l: "PROGRESS", t: "Levels", d: "From band-assisted to weighted." },
      sed: { l: "BEAT SEDENTARISM", t: "Get off the chair", d: "Break up sitting hours with short sets spread across your day." },
      notif: { l: "REMINDERS", t: "That respect you", d: "Native, submaximal notifications, no guilt. Snooze or skip." },
      gear: { l: "WITH WHAT YOU HAVE", t: "Your gear, your exercises", d: "Tell it what you have at home and microset builds the routine around it. No memberships." },
      ladder: ["BAND", "BODYWT", "WEIGHT", "LOADED"],
      chips: ["BAR", "PARALLETTES", "BANDS", "RINGS"],
      miniNow: "NOW",
      miniMeta: "5 · BODYWEIGHT",
      miniDone: "DONE",
      miniNo: "NO",
    },
    oss: {
      label: "OPEN SOURCE",
      titleL1: "Open",
      titleL2: "wide",
      titleL3: "open.",
      bodyPre: "No telemetry, no account, no cloud. The code lives on GitHub under the ",
      bodyMit: "MIT",
      bodyMid: " license — audit it, fork it, make it yours. Built with ",
      bodyTauri: "Tauri + Rust",
      bodyEnd: ": light, native and fast.",
      statStars: "STARS",
      statForks: "FORKS",
      statInstaller: "INSTALLER",
      statLicense: "LICENSE",
      statTelemetry: "TELEMETRY",
      cardDesc: "Active-break coach for working from home. Movement, spread out and automatic.",
      public: "PUBLIC",
      copy: "COPY",
      copied: "COPIED",
      star: "STAR ON GITHUB",
    },
    brand: ["OPEN SOURCE", "MIT · TAURI · RUST", "WINDOWS · LINUX"],
    cta: {
      titleL1: "Your next set",
      titleL2: "is coming up.",
      body: "Install microset and let your day push you to move.",
      releases: "VIEW RELEASES →",
    },
    footer: {
      product: "PRODUCT",
      download: "Download",
      how: "How it works",
      changelog: "Changelog",
      ossCol: "OPEN SOURCE",
      github: "GitHub",
      license: "MIT license",
      contribute: "Contribute",
      copyright: "© 2026 · MIT · MADE TO MOVE",
    },
    mock: {
      hoy: "Today",
      now: "NOW — 14:00",
      ex: "DIPS",
      meta: "5 REPS · BODYWEIGHT",
      done: "DONE",
      day: "THE DAY — 8 SETS",
      rows: ["Pull-ups", "Dips", "Dips", "L-sit"],
      stDone: "DONE",
      stNow: "NOW",
      stTodo: "PENDING",
    },
    marathon: {
      systemName: "ACTIVE-BREAK SYSTEM",
      online: "ONLINE",
      relay: "ACTIVE BREAK RELAY",
      taglinePre: "MICROSET / HOME OFFICE /",
      taglineQuote: "MOVE OR YOU RUST",
      rec: "REC · TODAY VIEW",
      uptime: "UPTIME",
      linuxNote: "ALSO FOR LINUX",
      freeMit: "FREE · MIT",
      proc: "PROC · 4 STEPS",
      session: "START MOVEMENT SESSION",
    },
  },
} as const;

export type Dict = (typeof STRINGS)["es"];

const I18nCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({
  lang: "es",
  setLang: () => {},
  t: STRINGS.es,
});

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem("ms-lang");
    if (saved === "es" || saved === "en") return saved;
  } catch {
    /* ignore */
  }
  if (typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("es"))
    return "es";
  return "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("ms-lang", l);
    } catch {
      /* ignore */
    }
  };
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return (
    <I18nCtx.Provider value={{ lang, setLang, t: STRINGS[lang] as Dict }}>
      {children}
    </I18nCtx.Provider>
  );
}

export function useI18n() {
  return useContext(I18nCtx);
}

/** ES / EN segmented toggle for the nav. */
export function LangToggle() {
  const { lang, setLang } = useI18n();
  return (
    <div style={{ display: "flex", border: `1px solid ${C.rule2}` }}>
      {(["es", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          style={{
            border: "none",
            cursor: "pointer",
            padding: "6px 9px",
            fontFamily: mono,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.06em",
            background: lang === l ? C.acc : "transparent",
            color: lang === l ? C.ink : C.dim,
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

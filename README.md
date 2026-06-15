# microset — landing

Landing page de [**microset**](https://github.com/eriklueh/microset), el coach de pausas
activas para home office.

Diseño "Manifiesto" (brutalista-editorial): superficies opacas, sin bordes redondeados,
reglas finas de 1px, mastheads grandes en mayúsculas, mono para labels/números (Geist Mono),
acento lima sólido. Mismo lenguaje visual que la app de escritorio.

## Stack

- **Vite + React 19 + TypeScript** — sin framework de UI; los estilos del diseño son
  inline-style, portados casi 1:1.
- **Framer Motion** — reveals al scrollear, count-up, barras animadas, micro-interacciones
  de hover, nav con blur al hacer scroll. Todo respeta `prefers-reduced-motion`.
- **Geist / Geist Mono** vía `@fontsource-variable`.

Las cifras de GitHub (stars/forks) se leen en vivo desde la API pública, así que son reales
y se actualizan solas.

## Desarrollo

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # type-check + build de producción → dist/
pnpm preview    # sirve dist/
```

## Descarga del instalador

El botón "Descargar" apunta al asset estable del último release del repo de la app:
`https://github.com/eriklueh/microset/releases/latest/download/microset-setup-x64.exe`.
Cada release debe subir el instalador NSIS con ese nombre para que el link sobreviva los
cambios de versión.

## Estructura

```
src/
├── App.tsx              # todas las secciones de la landing
├── components/
│   └── HeroMock.tsx     # el mock de la vista "Hoy" del hero
├── lib/
│   ├── site.ts          # paleta (tokens Manifiesto) + links/constantes
│   └── bits.tsx         # Reveal, CountUp, useGithubStats, iconos
├── index.css            # reset + keyframes (marquee/blink/grain) + responsive
└── main.tsx
```

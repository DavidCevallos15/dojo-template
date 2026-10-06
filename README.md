# Dojo Academia — template de landing para academias de karate

Vite + React 19 + TypeScript + Tailwind CSS v4 + `motion`. Sin fotos ni logo: el visual es tipográfico (kanji, ensō, cinturones).

```bash
npm i
npm run dev          # desarrollo
npm run build        # producción → dist/
npm run build:demo   # un solo HTML autocontenido → dist-demo/index.html (para enviar la demo a un cliente)
```

## Adaptar a un cliente

| Qué | Dónde |
|---|---|
| Nombre, textos, programas, horarios, testimonios, FAQ, contacto, redes | `src/data/content.ts` |
| Color de marca (un solo token) | `--color-brand` / `--color-brand-deep` / `--color-brand-soft` en `src/styles/globals.css` |
| Kanji usados | `src/assets/fonts/kanji-subset.woff2` (subset de Noto Serif JP). Si cambias un kanji, regenera el subset (abajo) |
| Easings / duraciones | `src/lib/motion.ts` + `@theme` en `globals.css` |

Regenerar el subset de kanji (Fedora: `sudo dnf install python3-fonttools python3-brotli`):

```bash
npm i -D @fontsource/noto-serif-jp
pyftsubset node_modules/@fontsource/noto-serif-jp/files/noto-serif-jp-japanese-700-normal.woff2 \
  --text="空手道子型組礼心武" --flavor=woff2 --output-file=src/assets/fonts/kanji-subset.woff2
npm uninstall @fontsource/noto-serif-jp
```

## Animaciones

| Componente | Técnica |
|---|---|
| `components/motion/Reveal` | fade + translate (+ blur opcional) `whileInView`, una sola vez |
| `components/motion/RevealLines` | titular por líneas que suben desde una máscara |
| `components/motion/Stagger` | contenedor + items escalonados (cards, stats, FAQ, footer) |
| `components/brand/Enso` | círculo zen dibujado con `pathLength`; modos `mount` / `view` / `inherit` |
| Story | reveal del panel con `clip-path` (trigger en el wrapper, no en el elemento recortado) |
| Programas | hover: barrido circular con `clip-path` + kanji escala + flecha rota |
| Horario | pill activa con `layoutId` + filas escalonadas con `AnimatePresence` |
| Testimonios | slider con dirección, autoplay pausable y barra de progreso en `scaleX` |

Todo respeta `prefers-reduced-motion` (`MotionConfig reducedMotion="user"` + media query en CSS) y solo anima `transform`, `opacity`, `filter` y `clip-path` (la excepción es la altura del acordeón FAQ, que se dispara por click, no por scroll).

## Estructura

```
src/
  data/content.ts          # todo el copy del template
  styles/globals.css       # tokens @theme + utilities
  lib/{motion,cn}.ts
  components/motion/       # Reveal, RevealLines, Stagger
  components/brand/        # Enso, belts
  components/ui/           # Eyebrow, ButtonLink, TextLink, Wordmark
  components/layout/       # SiteHeader, SiteFooter
  sections/                # Hero, Story, Programs, WhyUs, Schedule, Testimonials, CtaBanner, Faq
```

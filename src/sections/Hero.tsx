import { motion, useReducedMotion } from 'motion/react';
import { hero } from '@/data/content';
import { dur, ease } from '@/lib/motion';
import { RevealLines } from '@/components/motion/RevealLines';
import { ButtonLink } from '@/components/ui/primitives';
import { Enso } from '@/components/brand/Enso';
import { BELT_ORDER, beltBg } from '@/components/brand/belts';
import { cn } from '@/lib/cn';

const fadeUp = (delay: number, reduce: boolean | null) => ({
  initial: reduce ? { opacity: 0 } : { opacity: 0, y: 20, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: dur.reveal, ease: ease.reveal, delay },
});

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="inicio" className="relative overflow-hidden pt-[72px]">
      <div className="container-page grid min-h-[calc(100svh-72px)] items-center gap-12 py-12 lg:grid-cols-[1.2fr_1fr] lg:py-0">
        {/* Copy */}
        <div className="relative z-10">
          <motion.p {...fadeUp(0.1, reduce)} className="mb-7 inline-flex items-center gap-2 rounded-full border border-line bg-white py-1 pl-1 pr-3 text-[13px] shadow-sm">
            <span className="rounded-full bg-brand px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">{hero.badge.tag}</span>
            <span className="text-muted">
              {hero.badge.text} <strong className="font-semibold text-brand">{hero.badge.highlight}</strong>
            </span>
          </motion.p>

          <RevealLines
            as="h1"
            trigger="mount"
            delay={0.2}
            className="text-[clamp(2.6rem,6vw,4.25rem)] font-bold leading-[0.98] tracking-[-0.045em]"
            lines={[
              ...hero.title,
              { content: hero.titleAccent, className: 'bg-linear-to-r from-brand via-brand to-brand/50 bg-clip-text pb-1 text-transparent' },
            ]}
          />

          <motion.p {...fadeUp(0.55, reduce)} className="mt-7 max-w-md text-[17px] leading-relaxed text-muted">
            {hero.subtitle}
          </motion.p>

          <motion.div {...fadeUp(0.7, reduce)} className="mt-9 flex flex-wrap items-center gap-6">
            <ButtonLink href={hero.primary.href}>{hero.primary.label}</ButtonLink>
            <ButtonLink href={hero.secondary.href} variant="ghost">
              {hero.secondary.label}
            </ButtonLink>
          </motion.div>
        </div>

        {/* Visual tipográfico */}
        <HeroVisual reduce={reduce} />
      </div>
    </section>
  );
}

function HeroVisual({ reduce }: { reduce: boolean | null }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]" aria-hidden>
      {/* Grid de puntos */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.2 }}
        className="dot-grid absolute inset-0 text-ink/10 [mask-image:radial-gradient(circle_at_center,#000_30%,transparent_70%)]"
      />

      {/* Sol */}
      <motion.div
        initial={reduce ? { opacity: 0 } : { scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.3, ease: ease.disclosure, delay: 0.25 }}
        className="absolute right-[8%] top-[10%] size-[52%] rounded-full bg-linear-to-br from-brand to-brand-deep shadow-[0_40px_80px_-30px_var(--color-brand)]"
      />

      {/* Ensō */}
      <Enso className="absolute inset-[6%] size-[88%] animate-spin-slow will-change-transform" delay={0.6} />

      {/* Kanji vertical */}
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: ease.reveal, delay: 0.5 }}
        className="absolute left-[24%] top-[14%] font-kanji text-[clamp(6rem,17vw,12.5rem)] font-bold leading-[0.95] text-ink [writing-mode:vertical-rl]"
      >
        {hero.kanji}
      </motion.div>

      {/* Etiqueta flotante */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: dur.reveal, ease: ease.reveal, delay: 1.2 }}
        className="absolute bottom-[14%] right-[2%]"
      >
        <div className="animate-float rounded-2xl border border-line bg-white/90 px-4 py-3 shadow-xl shadow-black/5 backdrop-blur">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">Significado</p>
          <p className="mt-0.5 text-sm font-semibold">{hero.kanjiReading}</p>
        </div>
      </motion.div>

      {/* Cinturones */}
      <motion.ul
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.9 } } }}
        className="absolute bottom-[6%] left-[2%] flex flex-col gap-1.5"
      >
        {BELT_ORDER.map((belt, i) => (
          <motion.li
            key={belt}
            variants={{
              hidden: reduce ? { opacity: 0 } : { opacity: 0, scaleX: 0 },
              show: { opacity: 1, scaleX: 1, transition: { duration: 0.7, ease: ease.disclosure } },
            }}
            style={{ width: `${56 + i * 10}px` }}
            className={cn('h-2 origin-left rounded-full ring-1 ring-black/5', beltBg[belt])}
          />
        ))}
      </motion.ul>
    </div>
  );
}

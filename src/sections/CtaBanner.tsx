import { motion, useReducedMotion } from 'motion/react';
import { cta } from '@/data/content';
import { ease, viewportOnce } from '@/lib/motion';
import { RevealLines } from '@/components/motion/RevealLines';
import { Reveal } from '@/components/motion/Reveal';
import { ButtonLink } from '@/components/ui/primitives';
import { Enso } from '@/components/brand/Enso';

export function CtaBanner() {
  const reduce = useReducedMotion();

  return (
    <section className="px-3 sm:px-5">
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92, clipPath: 'inset(8% 6% 8% 6% round 40px)' }}
        whileInView={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0% round 32px)' }}
        viewport={viewportOnce}
        transition={{ duration: 1.2, ease: ease.disclosure }}
        className="relative mx-auto max-w-[90rem] overflow-hidden rounded-[32px] bg-ink px-6 py-24 text-center text-white sm:py-32"
      >
        <div aria-hidden className="absolute left-1/2 top-full size-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-brand/40 blur-[120px]" />
        <div aria-hidden className="dot-grid absolute inset-0 text-white/[0.06]" />
        <Enso
          trigger="view"
          delay={0.4}
          strokeClassName="stroke-white/10"
          className="pointer-events-none absolute left-1/2 top-1/2 size-[min(760px,140vw)] -translate-x-1/2 -translate-y-1/2"
        />
        <span aria-hidden className="pointer-events-none absolute -left-6 -top-10 font-kanji text-[16rem] font-bold leading-none text-white/[0.04]">
          武
        </span>

        <div className="relative">
          <Reveal y={12} className="mb-5 text-[13px] font-medium uppercase tracking-[0.14em] text-brand">
            <p>{cta.eyebrow}</p>
          </Reveal>
          <RevealLines
            className="mx-auto max-w-3xl text-[clamp(2.4rem,6vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.045em]"
            lines={[cta.title]}
            delay={0.15}
          />
          <Reveal delay={0.3} className="mx-auto mt-6 max-w-lg text-[17px] leading-relaxed text-white/70">
            <p>{cta.text}</p>
          </Reveal>
          <Reveal delay={0.45} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href={cta.primary.href} target="_blank" rel="noreferrer">
              {cta.primary.label}
            </ButtonLink>
            <ButtonLink href={cta.secondary.href} variant="light">
              {cta.secondary.label}
            </ButtonLink>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}

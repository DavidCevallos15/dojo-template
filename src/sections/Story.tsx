import { motion, useReducedMotion } from 'motion/react';
import { story } from '@/data/content';
import { dur, ease, viewportOnce } from '@/lib/motion';
import { Reveal } from '@/components/motion/Reveal';
import { RevealLines } from '@/components/motion/RevealLines';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { Eyebrow, TextLink } from '@/components/ui/primitives';
import { Enso } from '@/components/brand/Enso';

export function Story() {
  const reduce = useReducedMotion();

  return (
    <section id="nosotros" className="section-y">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* Panel visual con reveal por clip-path */}
        {/* El trigger vive en el wrapper: un target con clip-path al 100% no tiene área visible para el IntersectionObserver */}
        <motion.div className="relative" initial="hidden" whileInView="show" viewport={viewportOnce}>
          <motion.div
            variants={{
              hidden: reduce ? { opacity: 0 } : { clipPath: 'inset(100% 0% 0% 0% round 28px)' },
              show: { clipPath: 'inset(0% 0% 0% 0% round 28px)', opacity: 1 },
            }}
            transition={{ duration: 1.2, ease: ease.disclosure }}
            className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-ink text-white"
          >
            <div className="dot-grid absolute inset-0 text-white/10" aria-hidden />
            <div className="absolute -right-1/4 -top-1/4 size-[80%] rounded-full bg-brand/25 blur-3xl" aria-hidden />
            <Enso trigger="inherit" delay={0.5} strokeClassName="stroke-brand" className="absolute left-1/2 top-[44%] size-[78%] -translate-x-1/2 -translate-y-1/2" />
            <motion.span
              variants={{
                hidden: reduce ? { opacity: 0 } : { opacity: 0, scale: 1.15 },
                show: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: ease.reveal, delay: 0.35 } },
              }}
              className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 font-kanji text-[clamp(7rem,18vw,13rem)] font-bold leading-none"
              aria-hidden
            >
              {story.kanji}
            </motion.span>
            <p className="absolute bottom-7 left-7 text-sm text-white/70">{story.kanjiReading}</p>
          </motion.div>

          {/* Badge de años */}
          <motion.div
            variants={{
              hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 30, rotate: -6 },
              show: { opacity: 1, y: 0, rotate: 0, transition: { duration: dur.reveal, ease: ease.disclosure, delay: 0.7 } },
            }}
            className="absolute -bottom-6 right-4 rounded-2xl bg-brand px-7 py-5 text-center text-white shadow-[0_24px_50px_-18px_var(--color-brand)] sm:-right-6"
          >
            <p className="text-4xl font-bold tracking-tight">{story.badge.value}</p>
            <p className="mt-1 text-sm text-white/85">{story.badge.label}</p>
          </motion.div>
        </motion.div>

        {/* Texto */}
        <div>
          <Eyebrow>{story.eyebrow}</Eyebrow>
          <RevealLines
            className="text-[clamp(2.1rem,4.4vw,3.4rem)] font-bold leading-[1.04] tracking-[-0.04em]"
            lines={[story.title[0], { content: story.title[1], className: 'text-ink/35' }]}
          />
          <div className="mt-7 space-y-5">
            {story.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.15 + i * 0.1} className="max-w-xl text-[16px] leading-relaxed text-muted">
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <Stagger className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-8" delay={0.2}>
            {story.stats.map((s) => (
              <StaggerItem key={s.label}>
                <p className="text-3xl font-bold tracking-tight text-brand">{s.value}</p>
                <p className="mt-1 text-sm text-muted">{s.label}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.4} className="mt-10">
            <TextLink href={story.cta.href}>{story.cta.label}</TextLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

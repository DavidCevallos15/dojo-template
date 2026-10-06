import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { site, testimonials } from '@/data/content';
import { cn } from '@/lib/cn';
import { ease } from '@/lib/motion';
import { RevealLines } from '@/components/motion/RevealLines';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { Eyebrow } from '@/components/ui/primitives';

const AUTOPLAY_MS = 6500;
const initials = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('');

export function Testimonials() {
  return (
    <section className="section-y">
      <div className="container-page">
        <Eyebrow>{testimonials.eyebrow}</Eyebrow>
        <RevealLines
          className="text-[clamp(2.1rem,4.4vw,3.4rem)] font-bold leading-[1.04] tracking-[-0.04em]"
          lines={[testimonials.title[0], { content: testimonials.title[1], className: 'text-ink/35' }]}
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <Stagger className="grid grid-cols-2 gap-5" stagger={0.08}>
              {testimonials.stats.map((s) => (
                <StaggerItem key={s.label} className="rounded-2xl bg-mist p-6 transition-colors duration-300 hover:bg-brand-soft">
                  <p className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold tracking-tight text-brand">{s.value}</p>
                  <p className="mt-1 text-sm text-muted">{s.label}</p>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.25} y={32} className="relative flex-1 overflow-hidden rounded-[var(--radius-card)] bg-linear-to-br from-brand to-brand-deep p-8 text-white">
              <span aria-hidden className="pointer-events-none absolute -bottom-10 -right-4 font-kanji text-[11rem] font-bold leading-none text-white/10">
                礼
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">{testimonials.promo.eyebrow}</p>
              <p className="mt-3 max-w-sm text-[clamp(1.5rem,2.6vw,2rem)] font-bold leading-tight tracking-tight">{testimonials.promo.title}</p>
              <a
                href={site.contact.whatsapp}
                className="relative mt-6 inline-flex rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brand transition-transform duration-200 hover:-translate-y-0.5 active:scale-95"
              >
                {testimonials.promo.cta}
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.15} y={40}>
            <TestimonialSlider />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function TestimonialSlider() {
  const items = testimonials.items;
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const go = useCallback(
    (delta: number) => setState(([i]) => [(i + delta + items.length) % items.length, delta]),
    [items.length],
  );

  useEffect(() => {
    if (paused || reduce) return;
    const t = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, reduce, go]);

  const t = items[index];

  return (
    <div
      className="relative flex h-full min-h-[420px] flex-col justify-between overflow-hidden rounded-[var(--radius-card)] bg-ink p-8 text-white sm:p-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carrusel"
      aria-label="Testimonios"
    >
      <div aria-hidden className="absolute -left-20 -top-20 size-72 rounded-full bg-brand/30 blur-3xl" />
      <div aria-hidden className="dot-grid absolute inset-0 text-white/[0.06]" />
      <span aria-hidden className="pointer-events-none absolute -right-6 bottom-6 font-kanji text-[14rem] font-bold leading-none text-white/[0.04]">
        心
      </span>

      <div className="relative">
        <Quote className="size-9 text-brand" fill="currentColor" aria-hidden />
        <div className="relative mt-6 min-h-[220px]">
          <AnimatePresence mode="popLayout" custom={dir} initial={false}>
            <motion.figure
              key={index}
              custom={dir}
              variants={{
                enter: (d: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: d * 60, filter: 'blur(6px)' }),
                center: { opacity: 1, x: 0, filter: 'blur(0px)' },
                exit: (d: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: d * -60, filter: 'blur(6px)' }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: ease.disclosure }}
              aria-live="polite"
            >
              <div className="flex gap-1 text-amber-400" aria-label="5 de 5 estrellas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4" fill="currentColor" aria-hidden />
                ))}
              </div>
              <blockquote className="mt-4 text-[clamp(1.1rem,1.8vw,1.35rem)] leading-relaxed text-white/90">“{t.quote}”</blockquote>
              <figcaption className="mt-7 flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-full bg-brand text-sm font-bold">{initials(t.name)}</span>
                <span>
                  <span className="block font-semibold">{t.name}</span>
                  <span className="block text-sm text-white/55">{t.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>

      <div className="relative mt-8 flex items-center justify-between">
        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setState([i, i > index ? 1 : -1])}
              aria-label={`Testimonio ${i + 1}`}
              aria-current={i === index}
              className="relative h-1.5 w-8 overflow-hidden rounded-full bg-white/15"
            >
              {i === index && (
                <motion.span
                  key={`${index}-${paused}`}
                  className="absolute inset-0 origin-left rounded-full bg-brand"
                  initial={{ scaleX: reduce || paused ? 1 : 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: reduce || paused ? 0 : AUTOPLAY_MS / 1000, ease: 'linear' }}
                />
              )}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {[
            { d: -1, Icon: ChevronLeft, label: 'Anterior' },
            { d: 1, Icon: ChevronRight, label: 'Siguiente' },
          ].map(({ d, Icon, label }) => (
            <button
              key={label}
              type="button"
              onClick={() => go(d)}
              aria-label={label}
              className={cn(
                'grid size-11 place-items-center rounded-full border border-white/20 transition-all duration-200 hover:border-brand hover:bg-brand active:scale-90',
              )}
            >
              <Icon className="size-5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

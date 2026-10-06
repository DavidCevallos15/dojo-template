import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { days, schedule, type DayKey, type Level } from '@/data/content';
import { cn } from '@/lib/cn';
import { dur, ease } from '@/lib/motion';
import { RevealLines } from '@/components/motion/RevealLines';
import { Reveal } from '@/components/motion/Reveal';
import { Eyebrow, TextLink } from '@/components/ui/primitives';

const LEVEL_STYLE: Record<Level, string> = {
  INI: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  INT: 'bg-amber-50 text-amber-700 ring-amber-200',
  AVZ: 'bg-brand-soft text-brand ring-brand/25',
  TODOS: 'bg-mist text-muted ring-line',
};

export function Schedule() {
  const [day, setDay] = useState<DayKey>('lun');
  const reduce = useReducedMotion();
  const rows = schedule.byDay[day];

  return (
    <section id="horarios" className="section-y bg-mist/60">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>{schedule.eyebrow}</Eyebrow>
            <RevealLines className="text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-none tracking-[-0.045em]" lines={[schedule.title]} />
          </div>
          <Reveal delay={0.2}>
            <TextLink href={schedule.link.href}>{schedule.link.label}</TextLink>
          </Reveal>
        </div>

        {/* Tabs */}
        <Reveal delay={0.1} className="mt-10 -mx-[var(--spacing-section-x)] overflow-x-auto px-[var(--spacing-section-x)] [scrollbar-width:none]">
          <div role="tablist" aria-label="Día de la semana" className="flex w-max gap-2">
            {days.map((d) => {
              const active = d.key === day;
              return (
                <button
                  key={d.key}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  aria-controls="schedule-panel"
                  onClick={() => setDay(d.key)}
                  className={cn(
                    'relative rounded-xl px-4 py-2.5 text-[15px] font-medium transition-colors duration-200',
                    active ? 'text-white' : 'bg-white text-ink/75 ring-1 ring-line hover:text-ink',
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="day-pill"
                      className="absolute inset-0 rounded-xl bg-brand shadow-[0_8px_20px_-8px_var(--color-brand)]"
                      transition={{ duration: dur.disclosure, ease: ease.disclosure }}
                    />
                  )}
                  <span className="relative">{d.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Tabla */}
        <Reveal delay={0.2} className="mt-6 overflow-hidden rounded-[var(--radius-card)] bg-white ring-1 ring-line">
          <div id="schedule-panel" role="tabpanel" className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left">
              <thead>
                <tr className="bg-ink text-sm text-white">
                  {['Hora', 'Nivel', 'Clase', 'Instructor'].map((h) => (
                    <th key={h} scope="col" className="px-6 py-4 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <AnimatePresence mode="wait" initial={false}>
                <motion.tbody
                  key={day}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.06 } },
                    exit: { opacity: 0, transition: { duration: 0.12 } },
                  }}
                >
                  {rows.map((r) => (
                    <motion.tr
                      key={r.time + r.course}
                      variants={{
                        hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 14 },
                        show: { opacity: 1, y: 0, transition: { duration: dur.disclosure * 1.4, ease: ease.disclosure } },
                      }}
                      className="border-t border-line text-[15px] transition-colors hover:bg-mist/70"
                    >
                      <td className="whitespace-nowrap px-6 py-5 font-medium tabular-nums">{r.time}</td>
                      <td className="px-6 py-5">
                        <span className={cn('rounded-md px-2 py-1 text-xs font-semibold ring-1', LEVEL_STYLE[r.level])}>{r.level}</span>
                      </td>
                      <td className="px-6 py-5">{r.course}</td>
                      <td className="px-6 py-5 text-muted">{r.coach}</td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </AnimatePresence>
            </table>
          </div>
        </Reveal>
        <Reveal delay={0.3} className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
          <span>INI = Inicial</span>
          <span>INT = Intermedio</span>
          <span>AVZ = Avanzado</span>
          <span>TODOS = Todos los niveles</span>
        </Reveal>
      </div>
    </section>
  );
}

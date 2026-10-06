import { ArrowUpRight } from 'lucide-react';
import { programs } from '@/data/content';
import { cn } from '@/lib/cn';
import { RevealLines } from '@/components/motion/RevealLines';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { Eyebrow, TextLink } from '@/components/ui/primitives';
import { beltBg } from '@/components/brand/belts';

export function Programs() {
  return (
    <section id="programas" className="section-y bg-mist/60">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>{programs.eyebrow}</Eyebrow>
            <RevealLines className="text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-none tracking-[-0.045em]" lines={[programs.title]} />
          </div>
          <Reveal delay={0.2}>
            <TextLink href={programs.link.href}>{programs.link.label}</TextLink>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-3" stagger={0.12} amount={0.15}>
          {programs.items.map((p, i) => (
            <StaggerItem key={p.title} y={48}>
              <a href="#horarios" className="group block focus-visible:outline-offset-8">
                {/* Panel */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-white ring-1 ring-line">
                  <div className="dot-grid absolute inset-0 text-ink/[0.07]" aria-hidden />
                  {/* Barrido de color al hover (clip-path) */}
                  <div
                    className="absolute inset-0 bg-ink [clip-path:circle(0%_at_50%_100%)] transition-[clip-path] duration-700 ease-[var(--ease-disclosure)] group-hover:[clip-path:circle(150%_at_50%_100%)]"
                    aria-hidden
                  />
                  <span className="absolute left-6 top-5 text-sm font-semibold tabular-nums text-ink/40 transition-colors duration-500 group-hover:text-white/50">
                    0{i + 1}
                  </span>
                  <span className="absolute right-5 top-4 rounded-full border border-line bg-white/80 px-3 py-1 text-xs font-medium text-muted backdrop-blur">
                    {p.meta}
                  </span>
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 font-kanji text-[clamp(7rem,14vw,10rem)] font-bold leading-none text-ink transition-[color,scale] duration-700 ease-[var(--ease-disclosure)] group-hover:scale-110 group-hover:text-white"
                  >
                    {p.kanji}
                  </span>
                  {/* Cinturón */}
                  <div aria-hidden className="absolute inset-x-0 bottom-[18%] flex items-center">
                    <div className={cn('h-4 w-full shadow-sm ring-1 ring-black/10', beltBg[p.belt])} />
                    <div className={cn('absolute left-1/2 h-8 w-5 -translate-x-1/2 rounded-sm ring-1 ring-black/10', beltBg[p.belt])} />
                  </div>
                </div>

                {/* Info */}
                <div className="mt-6 flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-soft text-brand transition-all duration-300 ease-[var(--ease-interactive)] group-hover:rotate-45 group-hover:bg-brand group-hover:text-white">
                    <ArrowUpRight className="size-4" strokeWidth={2.4} />
                  </span>
                </div>
                <p className="mt-2 max-w-[34ch] text-[15px] leading-relaxed text-muted">{p.text}</p>
                <div className="mt-5 h-0.5 w-full origin-left scale-x-0 bg-brand transition-transform duration-500 ease-[var(--ease-disclosure)] group-hover:scale-x-100" />
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

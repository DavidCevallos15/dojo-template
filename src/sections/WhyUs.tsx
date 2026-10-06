import { Award, Shield, Star, Target, Users, type LucideIcon } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { reasons } from '@/data/content';
import { dur, ease } from '@/lib/motion';
import { RevealLines } from '@/components/motion/RevealLines';
import { Reveal } from '@/components/motion/Reveal';
import { Eyebrow, TextLink } from '@/components/ui/primitives';

const ICONS: Record<(typeof reasons.items)[number]['icon'], LucideIcon> = {
  award: Award,
  target: Target,
  shield: Shield,
  star: Star,
  users: Users,
};

export function WhyUs() {
  const reduce = useReducedMotion();

  return (
    <section className="section-y">
      <div className="container-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>{reasons.eyebrow}</Eyebrow>
          <RevealLines
            className="text-[clamp(2.1rem,4.4vw,3.4rem)] font-bold leading-[1.04] tracking-[-0.04em]"
            lines={[reasons.title[0], { content: reasons.title[1], className: 'text-ink/35' }]}
          />
          <Reveal delay={0.2} className="mt-6 max-w-sm text-[16px] leading-relaxed text-muted">
            <p>{reasons.subtitle}</p>
          </Reveal>
          <Reveal delay={0.3} className="mt-8">
            <TextLink href={reasons.link.href}>{reasons.link.label}</TextLink>
          </Reveal>
        </div>

        <ol className="flex flex-col gap-5">
          {reasons.items.map((r, i) => {
            const Icon = ICONS[r.icon];
            return (
              <motion.li
                key={r.title}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: 80, filter: 'blur(10px)', scale: 0.96 }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)', scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: dur.reveal, ease: ease.reveal }}
                className="group flex items-start gap-6 rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.03),0_20px_40px_-28px_rgba(0,0,0,0.25)] transition-[border-color,translate] duration-300 ease-[var(--ease-interactive)] hover:-translate-y-1 hover:border-brand/40 sm:p-7"
              >
                <span className="text-4xl font-semibold tabular-nums tracking-tight text-ink/25 transition-colors duration-300 group-hover:text-brand">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
                    <Icon className="size-[18px] text-brand" strokeWidth={2.2} aria-hidden />
                    {r.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{r.text}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

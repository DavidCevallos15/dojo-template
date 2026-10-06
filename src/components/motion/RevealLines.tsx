import { motion, useReducedMotion } from 'motion/react';
import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { dur, ease, viewportOnce } from '@/lib/motion';

type Line = { content: ReactNode; className?: string };

type Props = {
  lines: (ReactNode | Line)[];
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  /** `view` = al entrar en viewport, `mount` = al cargar (hero). */
  trigger?: 'view' | 'mount';
};

const isLine = (l: ReactNode | Line): l is Line =>
  typeof l === 'object' && l !== null && 'content' in (l as object);

/**
 * Titular con reveal por línea: cada línea sube desde una máscara (overflow-hidden).
 * Mantiene el texto completo accesible en un solo heading.
 */
export function RevealLines({ lines, as: Tag = 'h2', className, delay = 0, stagger = 0.09, trigger = 'view' }: Props) {
  const reduce = useReducedMotion();
  const animateProps =
    trigger === 'mount' ? { animate: 'show' as const } : { whileInView: 'show' as const, viewport: viewportOnce };

  return (
    <Tag className={className}>
      <motion.span
        className="block"
        initial="hidden"
        {...animateProps}
        variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      >
        {lines.map((line, i) => {
          const l = isLine(line) ? line : { content: line };
          return (
            <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
              <motion.span
                className={cn('block will-change-transform', l.className)}
                variants={{
                  hidden: reduce ? { opacity: 0 } : { y: '110%', rotate: 2 },
                  show: { y: '0%', rotate: 0, opacity: 1, transition: { duration: dur.reveal, ease: ease.reveal } },
                }}
              >
                {l.content}
              </motion.span>
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}

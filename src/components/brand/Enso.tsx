import { motion, useReducedMotion } from 'motion/react';
import { useId } from 'react';
import { ease } from '@/lib/motion';

type Props = {
  className?: string;
  /** `mount` dibuja al cargar; `view` al entrar en viewport; `inherit` hereda las variantes `hidden/show` del padre. */
  trigger?: 'mount' | 'view' | 'inherit';
  delay?: number;
  strokeClassName?: string;
};

const C = 200;
const R = 158;
const polar = (deg: number) => {
  const rad = (deg * Math.PI) / 180;
  return [C + R * Math.cos(rad), C + R * Math.sin(rad)] as const;
};
const [sx, sy] = polar(-62);
const [ex, ey] = polar(250);
const ARC = `M ${sx.toFixed(1)} ${sy.toFixed(1)} A ${R} ${R} 0 1 1 ${ex.toFixed(1)} ${ey.toFixed(1)}`;

/** Ensō (círculo zen) que se dibuja con `pathLength`. Textura de pincel vía feTurbulence. */
export function Enso({ className, trigger = 'mount', delay = 0, strokeClassName = 'stroke-ink' }: Props) {
  const reduce = useReducedMotion();
  const filterId = useId().replace(/:/g, '');
  const draw = {
    hidden: { pathLength: reduce ? 1 : 0, opacity: 0 },
    show: (d: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration: 1.8, ease: ease.disclosure, delay: d }, opacity: { duration: 0.2, delay: d } },
    }),
  };
  const trig =
    trigger === 'inherit'
      ? {}
      : {
          initial: 'hidden',
          ...(trigger === 'mount' ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, amount: 0.4 } }),
        };

  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden fill="none">
      <defs>
        <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="7" />
        </filter>
      </defs>
      <motion.g {...trig} filter={`url(#${filterId})`} strokeLinecap="round" className={strokeClassName}>
        <motion.path d={ARC} strokeWidth={26} variants={draw} custom={delay} />
        <motion.path d={ARC} strokeWidth={10} variants={draw} custom={delay + 0.12} transform="translate(6 -4)" opacity={0.6} />
      </motion.g>
    </svg>
  );
}

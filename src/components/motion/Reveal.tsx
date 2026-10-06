import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react';
import { dur, ease, viewportOnce } from '@/lib/motion';

type RevealProps = HTMLMotionProps<'div'> & {
  delay?: number;
  y?: number;
  x?: number;
  blur?: boolean;
};

/** Entrada on-view: fade + desplazamiento (+ blur opcional). Se ejecuta una sola vez. */
export function Reveal({ delay = 0, y = 24, x = 0, blur = false, ...props }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, x, filter: blur ? 'blur(8px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: 'blur(0px)' }}
      viewport={viewportOnce}
      transition={{ duration: reduce ? 0.3 : dur.reveal, ease: ease.reveal, delay }}
      {...props}
    />
  );
}

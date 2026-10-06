import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';

type StaggerProps = HTMLMotionProps<'div'> & { stagger?: number; delay?: number; amount?: number };

/** Contenedor que escalona la entrada de sus `StaggerItem` al entrar en viewport. */
export function Stagger({ stagger = 0.08, delay = 0, amount = viewportOnce.amount, ...props }: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={staggerContainer(stagger, delay)}
      {...props}
    />
  );
}

type ItemProps = HTMLMotionProps<'div'> & { y?: number; x?: number };

export function StaggerItem({ y = 24, x = 0, ...props }: ItemProps) {
  const reduce = useReducedMotion();
  return <motion.div variants={staggerItem(reduce ? 0 : y, reduce ? 0 : x)} {...props} />;
}

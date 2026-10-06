import type { Variants } from 'motion/react';

export const ease = {
  feedback: [0.3, 0.08, 0.18, 1],
  interactive: [0.2, 0.8, 0.2, 1],
  disclosure: [0.16, 1, 0.3, 1],
  reveal: [0.32, 0.04, 0.18, 1],
} as const;

export const dur = {
  feedback: 0.16,
  interactive: 0.24,
  disclosure: 0.32,
  reveal: 0.98,
} as const;

export const viewportOnce = { once: true, amount: 0.3 } as const;

/** Contenedor que escalona a sus hijos `staggerItem`. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

export const staggerItem = (y = 24, x = 0): Variants => ({
  hidden: { opacity: 0, y, x, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: dur.reveal, ease: ease.reveal },
  },
});

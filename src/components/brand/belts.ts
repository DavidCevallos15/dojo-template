import type { BeltKey } from '@/data/content';

export const BELT_ORDER: BeltKey[] = ['white', 'yellow', 'orange', 'green', 'blue', 'brown', 'black'];

export const beltBg: Record<BeltKey, string> = {
  white: 'bg-belt-white',
  yellow: 'bg-belt-yellow',
  orange: 'bg-belt-orange',
  green: 'bg-belt-green',
  blue: 'bg-belt-blue',
  brown: 'bg-belt-brown',
  black: 'bg-belt-black',
};

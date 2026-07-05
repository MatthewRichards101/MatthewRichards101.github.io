import type { Variants } from 'framer-motion';

// Shared stagger container used across sections so reveal timing feels
// consistent throughout the whole page.
export const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.4, 0.25, 1];

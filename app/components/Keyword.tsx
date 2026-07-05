'use client';

import { m } from 'framer-motion';
import { EASE_SMOOTH } from '../lib/motion';

// Keyword — the tasteful animated-gradient treatment applied to words
// that carry the site's philosophy (Curiosity, Momentum, Systems, etc.)
// so emphasis is felt rather than repeated.
export function Keyword({ children, delay = 0 }: { children: string; delay?: number }) {
  return (
    <m.span
      className="inline-flex premium-keyword"
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: EASE_SMOOTH }}
    >
      {children}
    </m.span>
  );
}

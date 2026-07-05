'use client';

import { m } from 'framer-motion';

// A faint blueprint scan-line divider between sections — one continuous
// technical motif that ties the whole page together as it animates in.
export function SectionDivider() {
  return (
    <div className="relative h-24 overflow-hidden md:h-32" aria-hidden="true">
      <m.div
        className="blueprint-divider absolute inset-0 opacity-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1.2 }}
      />
      <m.svg
        viewBox="0 0 400 60"
        className="absolute inset-x-0 top-1/2 mx-auto w-full max-w-3xl -translate-y-1/2 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6 }}
      >
        <defs>
          <linearGradient id="divider-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(125,211,252,0.2)" />
            <stop offset="45%" stopColor="rgba(129,140,248,0.55)" />
            <stop offset="75%" stopColor="rgba(168,85,247,0.4)" />
            <stop offset="100%" stopColor="rgba(250,204,21,0.22)" />
          </linearGradient>
        </defs>
        <m.path
          d="M0 30 Q100 5 200 30 T400 30"
          fill="none"
          stroke="url(#divider-line)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.6, ease: [0.25, 0.4, 0.25, 1] }}
        />
        <circle cx="200" cy="30" r="2.5" fill="rgba(250,204,21,0.7)" />
      </m.svg>
    </div>
  );
}

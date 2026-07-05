'use client';

import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Keyword } from './Keyword';
import { container, item } from '../lib/motion';

const constellationNodes = [
  { id: 'a', x: 18, y: 30, size: 7 },
  { id: 'b', x: 37, y: 18, size: 5 },
  { id: 'c', x: 55, y: 32, size: 8 },
  { id: 'd', x: 73, y: 22, size: 6 },
  { id: 'e', x: 82, y: 50, size: 7 },
  { id: 'f', x: 61, y: 65, size: 5 },
  { id: 'g', x: 36, y: 58, size: 6 },
  { id: 'h', x: 22, y: 74, size: 4 },
];

const constellationPaths = [
  ['a', 'b'],
  ['b', 'c'],
  ['c', 'd'],
  ['c', 'g'],
  ['g', 'h'],
  ['c', 'f'],
  ['f', 'e'],
] as const;

function getNodePosition(id: string) {
  return constellationNodes.find((node) => node.id === id);
}

// The emotional centerpiece of the homepage: a slowly evolving
// constellation standing in for a mind connecting unrelated ideas —
// discovery rather than technology as the visual language.
function HeroSystemMap({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <m.div
      className="hero-orbit pointer-events-none absolute inset-x-0 top-1/2 z-0 mx-auto hidden h-[32rem] w-[32rem] -translate-y-1/2 md:block"
      animate={reduceMotion ? undefined : { rotate: [0, 4, 0], scale: [1, 1.02, 1] }}
      transition={reduceMotion ? undefined : { duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      <div className="absolute inset-10 rounded-full border border-white/10" />
      <div className="absolute inset-20 rounded-full border border-cyan-300/10" />
      <m.div
        className="absolute inset-16 rounded-full border border-violet-300/10"
        animate={reduceMotion ? undefined : { rotate: [0, -6, 0] }}
        transition={reduceMotion ? undefined : { duration: 34, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.16),transparent_58%)] blur-3xl" />

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="hero-constellation-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(125,211,252,0.2)" />
            <stop offset="45%" stopColor="rgba(129,140,248,0.55)" />
            <stop offset="75%" stopColor="rgba(168,85,247,0.4)" />
            <stop offset="100%" stopColor="rgba(250,204,21,0.22)" />
          </linearGradient>
        </defs>

        {constellationPaths.map(([startId, endId]) => {
          const start = getNodePosition(startId);
          const end = getNodePosition(endId);
          if (!start || !end) return null;

          return (
            <m.line
              key={`${startId}-${endId}`}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="url(#hero-constellation-line)"
              strokeWidth="0.45"
              strokeLinecap="round"
              initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0.2 }}
              animate={reduceMotion ? undefined : { pathLength: 1, opacity: [0.2, 0.65, 0.3] }}
              transition={
                reduceMotion ? undefined : { duration: 5, delay: 0.2, repeat: Infinity, repeatType: 'mirror' }
              }
            />
          );
        })}

        {constellationNodes.map((node, index) => {
          const fill =
            index % 3 === 0 ? 'rgba(250,204,21,0.85)' : index % 3 === 1 ? 'rgba(167,139,250,0.85)' : 'rgba(125,211,252,0.85)';

          return (
            <m.circle
              key={node.id}
              cx={node.x}
              cy={node.y}
              r={node.size / 10 + 0.6}
              fill={fill}
              animate={reduceMotion ? undefined : { opacity: [0.5, 1, 0.5] }}
              transition={reduceMotion ? undefined : { duration: 4 + (index % 3), repeat: Infinity, delay: index * 0.3 }}
            />
          );
        })}
      </svg>
    </m.div>
  );
}

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <section ref={heroRef} className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      <m.div style={shouldReduceMotion ? undefined : { y: parallaxY }}>
        <HeroSystemMap reduceMotion={!!shouldReduceMotion} />
      </m.div>

      <m.div
        className="relative z-10 text-center"
        variants={container}
        initial={false}
        animate="visible"
        style={shouldReduceMotion ? undefined : { opacity: parallaxOpacity, y: parallaxY }}
      >
        <m.p className="mb-10 text-xs font-medium uppercase tracking-[0.35em] text-zinc-500" variants={item}>
          Matthew Richards
        </m.p>

        <m.h1 className="mb-6 text-5xl font-bold leading-[1.02] tracking-tightest text-white sm:text-7xl md:text-8xl" variants={item}>
          <Keyword delay={0.1}>Curiosity</Keyword>
          <br />
          Creates{' '}
          <m.span
            className="inline-flex bg-gradient-to-r from-cyan-200 via-indigo-200 to-amber-100 bg-clip-text text-transparent"
            animate={shouldReduceMotion ? undefined : { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={shouldReduceMotion ? undefined : { duration: 14, repeat: Infinity, ease: 'linear' }}
            style={{ backgroundSize: '180% 180%' }}
          >
            <Keyword delay={0.2}>Momentum</Keyword>
          </m.span>
        </m.h1>

        <m.p className="mx-auto mt-10 max-w-3xl text-lg font-light tracking-wide text-zinc-300 md:text-xl" variants={item}>
          Building better <Keyword delay={0.35}>Systems</Keyword>. Creating memorable{' '}
          <span className="text-zinc-500">
            <Keyword delay={0.45}>Experiences</Keyword>.
          </span>
        </m.p>

        <m.div
          className="mx-auto mt-16 flex flex-col items-center gap-2 text-zinc-600"
          variants={item}
          animate={shouldReduceMotion ? undefined : { opacity: [0.4, 0.9, 0.4] }}
          transition={shouldReduceMotion ? undefined : { duration: 2.6, repeat: Infinity }}
          aria-hidden="true"
        >
          <span className="text-[0.65rem] uppercase tracking-[0.3em]">Scroll to explore</span>
          <span className="h-8 w-px bg-gradient-to-b from-zinc-600 to-transparent" />
        </m.div>
      </m.div>
    </section>
  );
}

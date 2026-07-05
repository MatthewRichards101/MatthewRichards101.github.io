'use client';

import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.25, 0.4, 0.25, 1] },
  },
};

const STAR_HORIZONTAL_SPREAD = 17;
const STAR_VERTICAL_SPREAD = 29;
const STAR_DELAY_INCREMENT = 0.8;
const CURSOR_GLOW_OFFSET = 80;

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mattrichards101',
    accent: 'from-sky-400/20 via-cyan-400/10 to-transparent',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/MatthewRichards101',
    accent: 'from-violet-400/20 via-indigo-400/10 to-transparent',
  },
  {
    name: 'X',
    href: 'https://x.com/search?q=MatthewRichards101',
    accent: 'from-white/10 via-zinc-200/5 to-transparent',
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@mcc_444?si=Q1DhJes0191ekxwU',
    accent: 'from-amber-300/20 via-orange-400/10 to-transparent',
  },
  {
    name: 'Email',
    href: 'mailto:126410050+MatthewRichards101@users.noreply.github.com',
    accent: 'from-cyan-400/20 via-indigo-400/10 to-transparent',
  },
];

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

const stars = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  left: `${(index * STAR_HORIZONTAL_SPREAD) % 100}%`,
  top: `${(index * STAR_VERTICAL_SPREAD) % 100}%`,
  size: index % 3 === 0 ? 2 : 1,
  delay: (index % 6) * STAR_DELAY_INCREMENT,
}));

function getNodePosition(id: string) {
  return constellationNodes.find((node) => node.id === id);
}

function Keyword({ children, delay = 0 }: { children: string; delay?: number }) {
  return (
    <m.span
      className="inline-flex premium-keyword"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </m.span>
  );
}

function SocialIcon({ name }: { name: string }) {
  const common = 'h-4 w-4';

  switch (name) {
    case 'LinkedIn':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={common}>
          <path d="M6.5 8.5V18" />
          <path d="M11 18v-5.2c0-1.7 1.1-2.8 2.6-2.8 1.6 0 2.4 1 2.4 2.8V18" />
          <circle cx="6.5" cy="5.8" r="1.2" fill="currentColor" stroke="none" />
          <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" />
        </svg>
      );
    case 'GitHub':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={common}>
          <path d="M9 19c-4 1.2-4-2-6-2" />
          <path d="M15 21v-3.5c0-1 .2-1.6.7-2 2.1-.2 4.3-1 4.3-5.1 0-1.2-.4-2.2-1.2-3 .1-.3.5-1.5-.1-3.1 0 0-1-.3-3.3 1.2a11.4 11.4 0 0 0-6 0C7 4 6 4.3 6 4.3c-.6 1.6-.2 2.8-.1 3.1-.8.8-1.2 1.8-1.2 3 0 4.1 2.2 4.9 4.3 5.1.5.4.7 1 .7 2V21" />
        </svg>
      );
    case 'X':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
          <path d="M4 4l16 16" />
          <path d="M20 4L8.5 17" />
          <path d="M14 4H20" />
          <path d="M4 20h6" />
        </svg>
      );
    case 'YouTube':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={common}>
          <rect x="3.5" y="6" width="17" height="12" rx="3.5" />
          <path d="M10 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={common}>
          <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
          <path d="M5.5 8l6.5 5 6.5-5" />
        </svg>
      );
  }
}

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
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.16),transparent_58%)] blur-3xl" />

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="constellation-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(125,211,252,0.2)" />
            <stop offset="50%" stopColor="rgba(129,140,248,0.55)" />
            <stop offset="100%" stopColor="rgba(250,204,21,0.18)" />
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
              stroke="url(#constellation-line)"
              strokeWidth="0.45"
              strokeLinecap="round"
              initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0.2 }}
              animate={
                reduceMotion
                  ? undefined
                  : { pathLength: 1, opacity: [0.2, 0.65, 0.3] }
              }
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 5, delay: 0.2, repeat: Infinity, repeatType: 'mirror' }
              }
            />
          );
        })}
      </svg>
    </m.div>
  );
}

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const [navVisible, setNavVisible] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => setNavVisible(!entry.isIntersecting), {
      threshold: 0.05,
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMove = (event: PointerEvent) => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        setPointer({ x: event.clientX, y: event.clientY });
        rafRef.current = null;
      });
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handleMove);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [shouldReduceMotion]);

  const cursorStyle = useMemo(
    () => ({ transform: `translate(${pointer.x - CURSOR_GLOW_OFFSET}px, ${pointer.y - CURSOR_GLOW_OFFSET}px)` }),
    [pointer.x, pointer.y]
  );

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative min-h-screen overflow-hidden bg-[#05060a] text-white">
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div className="ambient-grid absolute inset-0 opacity-40" />
          <div className="ambient-noise absolute inset-0 opacity-30" />

          {!shouldReduceMotion && (
            <>
              <m.div
                className="absolute -left-24 top-16 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.16),transparent_60%)] blur-3xl"
                animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
                transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
              />
              <m.div
                className="absolute right-[-8rem] top-[28rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.14),transparent_58%)] blur-3xl"
                animate={{ x: [0, -28, 0], y: [0, -16, 0] }}
                transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
              />
            </>
          )}

          {stars.map((star) => (
            <m.span
              key={star.id}
              className="absolute rounded-full bg-white/70"
              style={{ left: star.left, top: star.top, width: star.size, height: star.size }}
              animate={shouldReduceMotion ? undefined : { opacity: [0.15, 0.7, 0.15], scale: [1, 1.4, 1] }}
              transition={shouldReduceMotion ? undefined : { duration: 5 + star.delay, repeat: Infinity, delay: star.delay }}
            />
          ))}
        </div>

        {!shouldReduceMotion && (
          <div
            className="pointer-events-none fixed left-0 top-0 z-10 hidden h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(125,211,252,0.16),rgba(129,140,248,0)_65%)] blur-2xl md:block"
            style={cursorStyle}
            aria-hidden="true"
          />
        )}

        <m.nav
          className="fixed top-0 z-50 w-full px-8 py-5"
          animate={shouldReduceMotion ? undefined : { opacity: navVisible ? 1 : 0, y: navVisible ? 0 : -12 }}
          transition={shouldReduceMotion ? undefined : { duration: 0.4 }}
          style={{ pointerEvents: navVisible ? 'auto' : 'none' }}
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-black/25 px-5 py-3 backdrop-blur-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300">MR</span>
            <a href="#contact" className="text-sm text-zinc-300 transition-colors duration-200 hover:text-white">
              Let&apos;s talk →
            </a>
          </div>
        </m.nav>

        <section ref={heroRef} className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
          <HeroSystemMap reduceMotion={!!shouldReduceMotion} />

          <m.div className="relative z-10 text-center" variants={container} initial="hidden" animate="visible">
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
          </m.div>
        </section>

        <section id="contact" className="relative border-t border-white/6 px-6 py-44">
          <div className="mx-auto max-w-4xl text-center">
            <m.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
              <m.h2 className="mb-6 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl" variants={item}>
                Let&apos;s Build
                <br />
                <span className="bg-gradient-to-r from-white via-cyan-100 to-indigo-100 bg-clip-text text-transparent">
                  Something Together.
                </span>
              </m.h2>

              <m.div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5" variants={container}>
                {socialLinks.map((link) => (
                  <m.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="premium-panel group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.045] px-4 py-5 text-left"
                    variants={item}
                    whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${link.accent} opacity-80`} />
                    <div className="relative flex items-center justify-between gap-3">
                      <div>
                        <p className="mb-1 text-sm font-medium text-white">{link.name}</p>
                        <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Open link</p>
                      </div>
                      <div className="rounded-full border border-white/10 bg-black/20 p-2 text-zinc-200 transition-colors duration-200 group-hover:text-white">
                        <SocialIcon name={link.name} />
                      </div>
                    </div>
                  </m.a>
                ))}
              </m.div>
            </m.div>
          </div>
        </section>

        <footer className="border-t border-white/6 px-6 py-10">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 md:flex-row">
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">Matthew Richards</span>
            <span className="text-xs text-zinc-700">&copy; 2026</span>
          </div>
        </footer>
      </div>
    </LazyMotion>
  );
}

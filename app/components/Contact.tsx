'use client';

import { m, useReducedMotion } from 'framer-motion';
import { container, item } from '../lib/motion';
import { SocialIcon } from './SocialIcon';

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
] as const;

const footerNodes = [
  { x: 20, y: 30 },
  { x: 50, y: 15 },
  { x: 80, y: 32 },
  { x: 65, y: 60 },
  { x: 35, y: 62 },
];

const footerLines: ReadonlyArray<readonly [number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 0],
  [1, 3],
];

// The one footer surprise: a tiny constellation quietly reconnects
// itself, then two lines reveal in sequence — a small echo of the
// Curiosity Map, saved for the very last moment of the page.
function FooterConstellation() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 100 70"
      className="mx-auto mb-8 h-16 w-40 overflow-visible"
      aria-hidden="true"
    >
      {footerLines.map(([startIdx, endIdx], i) => {
        const start = footerNodes[startIdx];
        const end = footerNodes[endIdx];
        return (
          <m.line
            key={i}
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke="rgba(139,92,246,0.45)"
            strokeWidth="0.6"
            strokeLinecap="round"
            initial={shouldReduceMotion ? undefined : { pathLength: 0, opacity: 0 }}
            whileInView={shouldReduceMotion ? undefined : { pathLength: 1, opacity: 0.7 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 * i, ease: 'easeOut' }}
          />
        );
      })}
      {footerNodes.map((node, i) => (
        <m.circle
          key={i}
          cx={node.x}
          cy={node.y}
          r="2.2"
          fill="rgba(250,204,21,0.85)"
          initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 * i }}
        />
      ))}
    </svg>
  );
}

export function Contact() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="contact" className="relative border-t border-white/6 px-6 py-44">
      <div className="mx-auto max-w-4xl text-center">
        <m.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          <FooterConstellation />

          <m.p
            className="mb-4 text-lg font-light tracking-wide text-zinc-400 md:text-xl"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            What are you curious about?
          </m.p>

          <m.h2
            className="mb-6 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 1.6 }}
          >
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
  );
}

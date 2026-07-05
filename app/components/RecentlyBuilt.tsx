'use client';

import { m, useReducedMotion } from 'framer-motion';
import type { MouseEvent } from 'react';
import { container, item } from '../lib/motion';
import { Keyword } from './Keyword';

// Recently shipped work — a quick, chronological complement to the more
// reflective "Currently Exploring" section. Kept intentionally small
// and easy to extend as new things get built.
const recentBuilds: ReadonlyArray<{
  id: string;
  name: string;
  blurb: string;
  tech: readonly string[];
  liveUrl: string;
}> = [
  {
    id: 'cosmic-outpost',
    name: 'Cosmic Outpost',
    blurb: 'A space-themed product experience built end to end, from concept to launch.',
    tech: ['React', 'Vite', 'Tailwind'],
    liveUrl: 'https://cosmicoutposts.lovable.app',
  },
];

function BuildCard({ project }: { project: (typeof recentBuilds)[number] }) {
  const shouldReduceMotion = useReducedMotion();

  const handleMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    event.currentTarget.style.setProperty('--mx', `${x}%`);
    event.currentTarget.style.setProperty('--my', `${y}%`);
  };

  return (
    <m.a
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="spotlight-card premium-panel relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6"
      variants={item}
      onMouseMove={handleMove}
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.25 }}
    >
      <p className="mb-2 text-[0.65rem] uppercase tracking-[0.3em] text-zinc-500">Shipped</p>
      <h4 className="mb-2 text-lg font-semibold text-white">{project.name}</h4>
      <p className="mb-4 text-sm leading-relaxed text-zinc-400">{project.blurb}</p>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span key={tech} className="premium-tag rounded-full px-3 py-1 text-xs text-zinc-300">
            {tech}
          </span>
        ))}
      </div>
    </m.a>
  );
}

export function RecentlyBuilt() {
  return (
    <section id="recently-built" className="relative px-6 py-32 md:py-40">
      <div className="mx-auto max-w-5xl">
        <m.div
          className="mb-14 text-center md:mb-16"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <m.p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-zinc-500" variants={item}>
            Recently Built
          </m.p>
          <m.h2 className="mb-4 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl" variants={item}>
            Curiosity, <Keyword delay={0.1}>Shipped</Keyword>.
          </m.h2>
          <m.p className="mx-auto max-w-xl text-base text-zinc-400 md:text-lg" variants={item}>
            A running log of ideas that made it out of my head and onto the internet.
          </m.p>
        </m.div>

        <m.div
          className="grid gap-6 md:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {recentBuilds.map((project) => (
            <BuildCard key={project.id} project={project} />
          ))}
        </m.div>
      </div>
    </section>
  );
}

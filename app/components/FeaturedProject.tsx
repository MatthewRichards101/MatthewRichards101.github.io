'use client';

import { m, useReducedMotion } from 'framer-motion';
import type { MouseEvent } from 'react';
import { container, item } from '../lib/motion';
import { Keyword } from './Keyword';

const flagshipProject = {
  id: 'cosmic-outpost',
  name: 'Cosmic Outpost',
  tagline: 'The flagship exploration',
  story:
    'A self-contained space-themed product experience, designed the way a small system should be \u2014 with its own visual language, its own momentum, and no wasted motion. Built to feel discovered, not browsed.',
  tech: ['React', 'Vite', 'Tailwind CSS', 'Lovable'],
  liveUrl: 'https://cosmicoutposts.lovable.app',
} as const;

// Future work fits here as simple data entries — the layout below
// automatically renders them as secondary cards under the flagship.
const otherProjects: ReadonlyArray<{
  id: string;
  name: string;
  description: string;
  tech: readonly string[];
  liveUrl: string;
  githubUrl: string;
}> = [];

function FlagshipVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="group/visual relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 md:aspect-[16/9]">
      <m.img
        src="/images/cosmic-outpost.jpg"
        alt="Live preview of the Cosmic Outpost site"
        className="h-full w-full object-cover object-top"
        loading="lazy"
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.05, 1] }}
        transition={shouldReduceMotion ? undefined : { duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-violet-400/10 opacity-0 transition-opacity duration-500 group-hover/visual:opacity-100" />
    </div>
  );
}

function FlagshipCard() {
  const shouldReduceMotion = useReducedMotion();

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    event.currentTarget.style.setProperty('--mx', `${x}%`);
    event.currentTarget.style.setProperty('--my', `${y}%`);
  };

  return (
    <m.div
      className="spotlight-card premium-panel relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-10"
      variants={item}
      onMouseMove={handleMove}
      whileHover={shouldReduceMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.3 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-violet-400/10 to-transparent" />

      <div className="relative grid gap-8 md:grid-cols-[1.1fr,0.9fr] md:items-center md:gap-12">
        <FlagshipVisual />

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">{flagshipProject.tagline}</p>
          <h3 className="mb-4 text-3xl font-bold leading-tight text-white md:text-4xl">{flagshipProject.name}</h3>
          <p className="mb-6 max-w-md text-base leading-relaxed text-zinc-400 md:text-lg">{flagshipProject.story}</p>

          <div className="mb-8 flex flex-wrap gap-2">
            {flagshipProject.tech.map((tech, i) => (
              <m.span
                key={tech}
                className="premium-tag rounded-full px-3 py-1 text-xs text-zinc-300"
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                {tech}
              </m.span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={flagshipProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-black transition-transform duration-200 hover:scale-[1.03]"
            >
              Visit Experience →
            </a>
          </div>
        </div>
      </div>
    </m.div>
  );
}

function OtherProjectCard({ project }: { project: (typeof otherProjects)[number] }) {
  const shouldReduceMotion = useReducedMotion();

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    event.currentTarget.style.setProperty('--mx', `${x}%`);
    event.currentTarget.style.setProperty('--my', `${y}%`);
  };

  return (
    <m.div
      className="spotlight-card premium-panel relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6"
      variants={item}
      onMouseMove={handleMove}
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.25 }}
    >
      <h4 className="mb-2 text-lg font-semibold text-white">{project.name}</h4>
      <p className="mb-4 text-sm leading-relaxed text-zinc-400">{project.description}</p>
      <div className="mb-4 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span key={tech} className="premium-tag rounded-full px-3 py-1 text-xs text-zinc-300">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium uppercase tracking-[0.15em] text-white underline-offset-4 hover:underline"
        >
          Live Website →
        </a>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-400 underline-offset-4 hover:text-white hover:underline"
        >
          GitHub
        </a>
      </div>
    </m.div>
  );
}

export function FeaturedProject() {
  return (
    <section id="work" className="relative px-6 py-32 md:py-40">
      <div className="mx-auto max-w-5xl">
        <m.div
          className="mb-16 text-center md:mb-20"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <m.p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-zinc-500" variants={item}>
            Selected Work
          </m.p>
          <m.h2 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl" variants={item}>
            Systems Worth
            <br />
            <span className="bg-gradient-to-r from-white via-cyan-100 to-indigo-100 bg-clip-text text-transparent">
              <Keyword delay={0.15}>Exploring</Keyword>
            </span>
          </m.h2>
        </m.div>

        <m.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          <FlagshipCard />
        </m.div>

        {otherProjects.length > 0 && (
          <m.div
            className="mt-6 grid gap-6 md:grid-cols-2"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {otherProjects.map((project) => (
              <OtherProjectCard key={project.id} project={project} />
            ))}
          </m.div>
        )}
      </div>
    </section>
  );
}

'use client';

import { m } from 'framer-motion';
import { container, item } from '../lib/motion';
import { Keyword } from './Keyword';

// "Currently Exploring" — deliberately not "Skills" or "Expertise".
// This list is meant to evolve; add an entry here to grow the section.
const explorations = [
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    insight: 'Less interested in the hype, more in how intelligence gets embedded into products people actually trust.',
  },
  {
    id: 'blockchain',
    title: 'Blockchain',
    insight: 'What changes when trust is designed into the architecture itself, instead of bolted on afterward.',
  },
  {
    id: 'manufacturing-innovation',
    title: 'Manufacturing Innovation',
    insight: 'Physical systems taught me that momentum comes from precision — that lesson keeps showing up everywhere.',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    insight: 'Thinking like the system under attack is one of the best design habits I\u2019ve picked up.',
  },
  {
    id: 'web-experiences',
    title: 'Web Experiences',
    insight: 'The web is the fastest way to turn a curious idea into something someone else can feel.',
  },
  {
    id: 'product-design',
    title: 'Product Design',
    insight: 'Craftsmanship people can feel, even if they can\u2019t explain why \u2014 that\u2019s the standard I hold work to.',
  },
  {
    id: 'financial-markets',
    title: 'Financial Markets',
    insight: 'Markets are systems built entirely from human behavior \u2014 endlessly interesting to model and question.',
  },
  {
    id: 'automation',
    title: 'Automation',
    insight: 'The best automation disappears \u2014 it just makes the right thing the easy thing to do.',
  },
] as const;

function ExploringCard({ exploration }: { exploration: (typeof explorations)[number] }) {
  return (
    <m.div
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6"
      variants={item}
      whileHover={{ y: -4 }}
      whileFocus={{ y: -4 }}
      transition={{ duration: 0.25 }}
      tabIndex={0}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-violet-400/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100" />

      <div className="relative">
        <p className="mb-4 text-sm font-semibold text-white md:text-base">{exploration.title}</p>

        <div className="grid transition-[grid-template-rows] duration-300 ease-out [grid-template-rows:0fr] group-hover:[grid-template-rows:1fr] group-focus:[grid-template-rows:1fr]">
          <div className="overflow-hidden">
            <p className="pt-1 text-sm leading-relaxed text-zinc-400">{exploration.insight}</p>
          </div>
        </div>

        <span className="mt-3 block text-xs uppercase tracking-[0.2em] text-zinc-600 transition-opacity duration-300 group-hover:opacity-0 group-focus:opacity-0">
          Hover to explore
        </span>
      </div>
    </m.div>
  );
}

export function Exploring() {
  return (
    <section id="exploring" className="relative px-6 py-32 md:py-40">
      <div className="mx-auto max-w-5xl">
        <m.div
          className="mb-16 text-center md:mb-20"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <m.p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-zinc-500" variants={item}>
            Not Skills. Not Expertise.
          </m.p>
          <m.h2 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl" variants={item}>
            Currently{' '}
            <span className="bg-gradient-to-r from-cyan-200 via-violet-200 to-amber-100 bg-clip-text text-transparent">
              <Keyword delay={0.1}>Exploring</Keyword>
            </span>
          </m.h2>
        </m.div>

        <m.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {explorations.map((exploration) => (
            <ExploringCard key={exploration.id} exploration={exploration} />
          ))}
        </m.div>
      </div>
    </section>
  );
}

'use client';

import { m } from 'framer-motion';
import { container, item } from '../lib/motion';
import { Keyword } from './Keyword';

// Not a résumé — every chapter is framed around what it taught, not the
// title held. Chronological, company by company.
const journeyMoments = [
  {
    id: 'abbott',
    company: 'Abbott',
    themes: ['Quality', 'Continuous Improvement', 'Learning', 'Manufacturing Systems'],
    lesson:
      'This is where quality stopped being a checkbox and became a mindset — learning to see a manufacturing system as something you continuously question and refine, never just maintain.',
  },
  {
    id: 'takeda',
    company: 'Takeda',
    themes: ['Precision', 'Attention to Detail', 'Regulated Manufacturing', 'Trust'],
    lesson:
      'In a regulated environment, precision isn\u2019t optional \u2014 it\u2019s the whole job. I learned that trust is built one exact, well-documented detail at a time.',
  },
  {
    id: 'vxi',
    company: 'VXI',
    themes: ['Communication', 'Empathy', 'HIPAA', 'Problem Solving'],
    lesson:
      'Working directly with people in sensitive, regulated conversations taught me that the best problem solving starts with listening \u2014 empathy is a system skill too.',
  },
] as const;

export function Journey() {
  return (
    <section id="journey" className="relative px-6 py-32 md:py-40">
      <div className="mx-auto max-w-4xl">
        <m.div
          className="mb-16 text-center md:mb-24"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <m.p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-zinc-500" variants={item}>
            Professional Journey
          </m.p>
          <m.h2 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl" variants={item}>
            Every Chapter Taught Me
            <br />
            <span className="bg-gradient-to-r from-cyan-200 via-violet-200 to-amber-100 bg-clip-text text-transparent">
              Something <Keyword delay={0.1}>Different</Keyword>
            </span>
          </m.h2>
        </m.div>

        <div className="relative pl-10 md:pl-14">
          <div className="journey-rail absolute left-3 top-1 h-[calc(100%-0.5rem)] w-px md:left-5" aria-hidden="true" />

          <m.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
            {journeyMoments.map((moment) => (
              <m.div key={moment.id} className="relative mb-14 last:mb-0" variants={item}>
                <span
                  className="journey-node absolute -left-10 top-1.5 h-3 w-3 rounded-full bg-cyan-300 md:-left-14"
                  aria-hidden="true"
                />
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">{moment.company}</p>
                <p className="mb-3 max-w-2xl text-lg leading-relaxed text-zinc-300 md:text-xl">{moment.lesson}</p>
                <div className="flex flex-wrap gap-2">
                  {moment.themes.map((theme) => (
                    <span key={theme} className="premium-tag rounded-full px-3 py-1 text-xs text-zinc-400">
                      {theme}
                    </span>
                  ))}
                </div>
              </m.div>
            ))}
          </m.div>
        </div>
      </div>
    </section>
  );
}

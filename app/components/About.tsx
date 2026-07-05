'use client';

import { m } from 'framer-motion';
import { Keyword } from './Keyword';
import { container, item } from '../lib/motion';

// Short, visual statements about how curiosity operates rather than a
// resume-style paragraph — each line is a small reveal, not a wall of text.
const thoughts = [
  "I don't ask what something is. I ask how it works.",
  'A factory line, a codebase, a blockchain, a market — every system is just questions waiting to be asked.',
  'Curiosity is the habit of connecting dots most people never think to draw.',
  'I build things the way I explore ideas — carefully, and because I want to understand them completely.',
];

export function About() {
  return (
    <section id="about" className="relative px-6 py-32 md:py-40">
      <div className="mx-auto max-w-3xl">
        <m.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }}>
          <m.p className="mb-6 text-xs font-medium uppercase tracking-[0.35em] text-zinc-500" variants={item}>
            How I Think
          </m.p>

          <m.h2 className="mb-16 max-w-2xl text-3xl font-bold leading-[1.15] tracking-tight text-white md:text-5xl" variants={item}>
            Not a developer.
            <br />
            Not a manufacturer.
            <br />
            <span className="bg-gradient-to-r from-cyan-200 via-violet-200 to-amber-100 bg-clip-text text-transparent">
              An explorer of <Keyword delay={0.1}>Systems</Keyword>.
            </span>
          </m.h2>

          <div className="space-y-8">
            {thoughts.map((thought, index) => (
              <m.p
                key={thought}
                className="max-w-xl text-xl font-light leading-relaxed tracking-wide text-zinc-300 md:text-2xl"
                variants={item}
                custom={index}
              >
                {thought}
              </m.p>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}

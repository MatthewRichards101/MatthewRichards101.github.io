'use client';

import { m } from 'framer-motion';
import { container, item } from '../lib/motion';

// The one quote moment on the site — not motivational copy, just the
// belief that quietly explains everything else on the page.
export function BeliefQuote() {
  return (
    <section className="relative px-6 py-28 md:py-36">
      <m.div
        className="mx-auto max-w-2xl text-center"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <m.span className="mx-auto mb-8 block h-px w-16 bg-gradient-to-r from-transparent via-zinc-600 to-transparent" variants={item} />
        <m.p
          className="text-2xl font-light leading-relaxed tracking-wide text-zinc-200 md:text-4xl"
          variants={item}
        >
          &ldquo;I don&apos;t chase technologies.
          <br />
          I follow curiosity wherever it leads.&rdquo;
        </m.p>
        <m.span className="mx-auto mt-8 block h-px w-16 bg-gradient-to-r from-transparent via-zinc-600 to-transparent" variants={item} />
      </m.div>
    </section>
  );
}

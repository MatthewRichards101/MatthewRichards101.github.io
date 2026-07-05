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

export function Contact() {
  const shouldReduceMotion = useReducedMotion();

  return (
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
  );
}

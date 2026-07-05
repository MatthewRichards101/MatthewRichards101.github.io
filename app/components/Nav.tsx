'use client';

import { m, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Nav fades in once the visitor scrolls past the hero — driven by scroll
// position so it works independently of any other section's internals.
export function Nav() {
  const shouldReduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <m.nav
      className="fixed top-0 z-50 w-full px-8 py-5"
      animate={shouldReduceMotion ? undefined : { opacity: visible ? 1 : 0, y: visible ? 0 : -12 }}
      transition={shouldReduceMotion ? undefined : { duration: 0.4 }}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-black/25 px-5 py-3 backdrop-blur-xl">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300">MR</span>
        <div className="hidden items-center gap-6 text-xs uppercase tracking-[0.15em] text-zinc-400 md:flex">
          <a href="#about" className="transition-colors duration-200 hover:text-white">About</a>
          <a href="#journey" className="transition-colors duration-200 hover:text-white">Journey</a>
          <a href="#exploring" className="transition-colors duration-200 hover:text-white">Exploring</a>
          <a href="#curiosity-map" className="transition-colors duration-200 hover:text-white">Curiosity Map</a>
          <a href="#work" className="transition-colors duration-200 hover:text-white">Work</a>
        </div>
        <a href="#contact" className="text-sm text-zinc-300 transition-colors duration-200 hover:text-white">
          Let&apos;s talk →
        </a>
      </div>
    </m.nav>
  );
}

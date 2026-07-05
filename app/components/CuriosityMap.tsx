'use client';

import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { useId, useState } from 'react';
import { container, item } from '../lib/motion';
import { Keyword } from './Keyword';

type MapNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  summary: string;
  tags: readonly string[];
};

const nodes: MapNode[] = [
  {
    id: 'manufacturing',
    label: 'Manufacturing',
    x: 50,
    y: 12,
    color: 'rgba(250,204,21,0.9)',
    summary: 'Where I learned that momentum comes from precision, not speed \u2014 physical systems don\u2019t forgive shortcuts.',
    tags: ['Abbott', 'Takeda', 'Quality Systems'],
  },
  {
    id: 'ai',
    label: 'Artificial Intelligence',
    x: 76.9,
    y: 23.1,
    color: 'rgba(167,139,250,0.9)',
    summary: 'Exploring how intelligence gets embedded into real products, not just demos \u2014 genuine capability over hype.',
    tags: ['Currently Exploring', 'Product Thinking'],
  },
  {
    id: 'cybersecurity',
    label: 'Cybersecurity',
    x: 88,
    y: 50,
    color: 'rgba(125,211,252,0.9)',
    summary: 'Thinking like the system under attack \u2014 one of the best design habits curiosity ever gave me.',
    tags: ['HIPAA at VXI', 'Systems Thinking'],
  },
  {
    id: 'blockchain',
    label: 'Blockchain',
    x: 76.9,
    y: 76.9,
    color: 'rgba(59,130,246,0.9)',
    summary: 'Investigating what changes when trust is designed into the architecture itself, not bolted on after.',
    tags: ['Currently Exploring', 'Trust by Design'],
  },
  {
    id: 'product-design',
    label: 'Product Design',
    x: 50,
    y: 88,
    color: 'rgba(250,204,21,0.9)',
    summary: 'Bringing every other thread together into experiences that feel considered \u2014 craftsmanship you can feel.',
    tags: ['This Website', 'Craft'],
  },
  {
    id: 'web-development',
    label: 'Web Development',
    x: 23.1,
    y: 76.9,
    color: 'rgba(34,211,238,0.9)',
    summary: 'The fastest way to turn a curious idea into something someone else can actually feel and use.',
    tags: ['Cosmic Outpost', 'This Website'],
  },
  {
    id: 'quality-systems',
    label: 'Quality Systems',
    x: 12,
    y: 50,
    color: 'rgba(167,139,250,0.9)',
    summary: 'Quality isn\u2019t a checkbox \u2014 it\u2019s a mindset of continuously questioning and refining a system.',
    tags: ['Abbott', 'Continuous Improvement'],
  },
  {
    id: 'business',
    label: 'Business',
    x: 23.1,
    y: 23.1,
    color: 'rgba(125,211,252,0.9)',
    summary: 'Markets and organizations are systems built entirely from human behavior \u2014 endlessly worth studying.',
    tags: ['Financial Markets', 'Strategy'],
  },
];

const connections: ReadonlyArray<readonly [string, string]> = [
  ['manufacturing', 'ai'],
  ['ai', 'cybersecurity'],
  ['cybersecurity', 'blockchain'],
  ['blockchain', 'product-design'],
  ['product-design', 'web-development'],
  ['web-development', 'quality-systems'],
  ['quality-systems', 'business'],
  ['business', 'manufacturing'],
  ['manufacturing', 'quality-systems'],
  ['ai', 'blockchain'],
  ['cybersecurity', 'product-design'],
  ['business', 'web-development'],
];

function getNode(id: string) {
  return nodes.find((node) => node.id === id);
}

// The signature feature: an interactive constellation where every star is
// a domain curiosity has led through. Clicking a star reveals why it
// matters and how it connects to everything else — the map visually
// argues that curiosity, not a job title, is the throughline.
export function CuriosityMap() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [focusMode, setFocusMode] = useState(false);
  const detailId = useId();

  const selected = selectedId ? getNode(selectedId) : null;

  const isConnected = (id: string) => {
    if (!selectedId) return false;
    return connections.some(
      ([a, b]) => (a === selectedId && b === id) || (b === selectedId && a === id)
    );
  };

  // The site's one deliberate "hero moment": the first time a visitor
  // selects a star, the rest of the page dims, every connection lights
  // up at once, and the map itself grows for a few unforgettable
  // seconds before quietly returning to normal.
  const handleSelect = (id: string) => {
    setSelectedId((current) => (current === id ? null : id));
    if (!shouldReduceMotion) {
      setFocusMode(true);
      window.setTimeout(() => setFocusMode(false), 5000);
    }
  };

  return (
    <section id="curiosity-map" className="relative px-6 py-32 md:py-40">
      <AnimatePresence>
        {focusMode && (
          <m.div
            className="fixed inset-0 z-40 bg-black/92 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <div className={`relative mx-auto max-w-4xl ${focusMode ? 'z-50' : ''}`}>
        <m.div
          className="mb-14 text-center md:mb-16"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <m.p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-zinc-500" variants={item}>
            The Signature Experience
          </m.p>
          <m.h2 className="mb-4 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl" variants={item}>
            The <Keyword delay={0.1}>Curiosity</Keyword> Map
          </m.h2>
          <m.p className="mx-auto max-w-xl text-base text-zinc-400 md:text-lg" variants={item}>
            Every star is somewhere curiosity has led. Click one to see how it connects to everything else.
          </m.p>
        </m.div>

        <m.div
          className="relative mx-auto aspect-square w-full max-w-xl"
          variants={item}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <m.div
            className="absolute inset-0"
            animate={focusMode ? { scale: 1.18 } : { scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
            <defs>
              <linearGradient id="map-line" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(125,211,252,0.35)" />
                <stop offset="50%" stopColor="rgba(139,92,246,0.4)" />
                <stop offset="100%" stopColor="rgba(250,204,21,0.3)" />
              </linearGradient>
            </defs>
            {connections.map(([startId, endId]) => {
              const start = getNode(startId);
              const end = getNode(endId);
              if (!start || !end) return null;
              const active = selectedId === startId || selectedId === endId;

              return (
                <m.line
                  key={`${startId}-${endId}`}
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke="url(#map-line)"
                  strokeWidth={active || focusMode ? 0.6 : 0.3}
                  strokeLinecap="round"
                  animate={{
                    opacity: focusMode
                      ? 0.95
                      : selectedId
                        ? active
                          ? 0.9
                          : 0.15
                        : shouldReduceMotion
                          ? 0.4
                          : [0.25, 0.5, 0.25],
                  }}
                  transition={
                    focusMode || selectedId
                      ? { duration: 0.4 }
                      : shouldReduceMotion
                        ? undefined
                        : { duration: 6, repeat: Infinity, repeatType: 'mirror' }
                  }
                />
              );
            })}
          </svg>

          {nodes.map((node) => {
            const active = selectedId === node.id;
            const connected = isConnected(node.id);

            return (
              <button
                key={node.id}
                type="button"
                aria-pressed={active}
                aria-controls={detailId}
                onClick={() => handleSelect(node.id)}
                className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-full p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <m.span
                  className="block rounded-full"
                  style={{
                    width: active ? 16 : 11,
                    height: active ? 16 : 11,
                    backgroundColor: node.color,
                    boxShadow:
                      active || connected || focusMode ? `0 0 18px ${node.color}` : '0 0 8px rgba(255,255,255,0.15)',
                  }}
                  animate={shouldReduceMotion ? undefined : { scale: active ? [1, 1.15, 1] : 1 }}
                  transition={{ duration: 1.6, repeat: active ? Infinity : 0 }}
                />
                <span
                  className={`whitespace-nowrap text-[0.6rem] uppercase tracking-[0.15em] transition-colors duration-200 ${
                    active ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'
                  }`}
                >
                  {node.label}
                </span>
              </button>
            );
          })}
          </m.div>
        </m.div>

        <div id={detailId} className="mx-auto mt-10 min-h-[9rem] max-w-lg">
          <AnimatePresence mode="wait">
            {selected ? (
              <m.div
                key={selected.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="premium-panel rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center"
              >
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">{selected.label}</p>
                <p className="mb-4 text-base leading-relaxed text-zinc-200 md:text-lg">{selected.summary}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {selected.tags.map((tag) => (
                    <span key={tag} className="premium-tag rounded-full px-3 py-1 text-xs text-zinc-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </m.div>
            ) : (
              <m.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pt-4 text-center text-sm uppercase tracking-[0.2em] text-zinc-600"
              >
                Select a star to reveal its story
              </m.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

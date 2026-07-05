'use client';

import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// ─── Animation variants ──────────────────────────────────────────────────────

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.25, 0.4, 0.25, 1] },
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const explorations = [
  {
    title: 'Artificial Intelligence',
    insight:
      "The most interesting part isn't the models — it's learning how to ask better questions.",
  },
  {
    title: 'Blockchain',
    insight: 'Trust as infrastructure. Still early, still fascinating.',
  },
  {
    title: 'Web Experiences',
    insight:
      "The gap between what's possible and what's built is enormous. I'm interested in closing it.",
  },
  {
    title: 'Cybersecurity',
    insight:
      "Understanding how systems break is the first step to building ones that don't.",
  },
  {
    title: 'Digital Products',
    insight: 'A good product is a solved problem that someone actually enjoys using.',
  },
  {
    title: 'Financial Markets',
    insight: 'Every market is a system. Systems have patterns. Patterns can be learned.',
  },
  {
    title: 'Manufacturing Innovation',
    insight: 'The most underrated intersection of technology and craftsmanship.',
  },
];

const projects = [
  {
    name: 'Cosmic Outpost',
    description:
      'A digital product that began as an NFT concept and evolved into an interactive AI-assisted experience. Part creative experiment, part exploration into how digital ownership and AI can coexist within a single product.',
    tags: ['Digital Product', 'AI', 'Interactive Experience'],
    status: 'Ongoing',
    featured: true,
  },
  {
    name: 'Personal Brand Systems',
    description:
      'Building the infrastructure behind a personal brand — from content pipelines to digital presence. An exercise in treating identity like a product worth engineering.',
    tags: ['Strategy', 'Web', 'Automation'],
    status: 'Active',
    featured: false,
  },
];

const timeline = [
  {
    company: 'Abbott',
    role: 'Quality Systems',
    skills: ['Quality', 'Compliance', 'Trust'],
    description:
      "Developed expertise in quality systems within a global medical device environment. Learned that trust isn't claimed — it's built through consistency, precision, and doing the invisible work well.",
  },
  {
    company: 'Takeda',
    role: 'Quality & Operations',
    skills: ['Continuous Improvement', 'Attention to Detail', 'Process Management'],
    description:
      'Worked within pharmaceutical manufacturing standards where precision is non-negotiable. Quality became a mindset, not a department — and that perspective has shaped everything since.',
  },
  {
    company: 'VXI',
    role: 'Operations',
    skills: ['Communication', 'Problem Solving', 'Customer Experience'],
    description:
      "Developed foundational communication and problem-solving skills working directly with people under pressure. A reminder that every system ultimately serves a human being — and that's worth remembering.",
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

function ExplorationCard({ title, insight }: { title: string; insight: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 cursor-default select-none min-h-[120px] flex items-center"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ borderColor: 'rgba(99, 102, 241, 0.35)', y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <AnimatePresence mode="wait">
        {!hovered ? (
          <motion.div
            key="label"
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mb-4" />
            <p className="text-white font-medium">{title}</p>
          </motion.div>
        ) : (
          <motion.div
            key="insight"
            className="w-full"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-zinc-300 text-sm leading-relaxed">
              &ldquo;{insight}&rdquo;
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [navVisible, setNavVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNavVisible(!entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#09090b] text-white min-h-screen">

      {/* ── Minimal nav (fades in after hero scrolls away) ── */}
      <motion.nav
        className="fixed top-0 w-full z-50 px-8 py-5"
        animate={{ opacity: navVisible ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ pointerEvents: navVisible ? 'auto' : 'none' }}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="text-xs font-semibold tracking-[0.2em] text-zinc-400 uppercase">
            MR
          </span>
          <a
            href="#contact"
            className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
          >
            Let's talk →
          </a>
        </div>
      </motion.nav>

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-indigo-900/20 blur-[140px]" />
        </div>

        <motion.div
          className="relative z-10 text-center"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="text-zinc-500 text-xs tracking-[0.35em] uppercase font-medium mb-10"
            variants={item}
          >
            Matthew Richards
          </motion.p>

          <motion.h1
            className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tightest text-white leading-[1.02] mb-6"
            variants={item}
          >
            Curiosity
            <br />
            Creates{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              Momentum
            </span>
          </motion.h1>

          <motion.p
            className="text-zinc-400 text-lg md:text-xl mt-10 font-light tracking-wide"
            variants={item}
          >
            Building Better Systems.{' '}
            <span className="text-zinc-600">Creating Better Experiences.</span>
          </motion.p>
        </motion.div>

        {/* Scroll line */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          <motion.div
            className="w-px h-14 bg-gradient-to-b from-zinc-600 to-transparent mx-auto"
            animate={{ scaleY: [0, 1, 0] }}
            style={{ originY: 0 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
        </motion.div>
      </section>

      {/* ── Chapter 01: Who I Am ── */}
      <section className="py-36 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p
              className="text-indigo-400 text-xs tracking-[0.25em] uppercase font-medium mb-6"
              variants={item}
            >
              Chapter 01
            </motion.p>
            <motion.h2
              className="text-4xl md:text-5xl font-bold tracking-tight mb-14"
              variants={item}
            >
              Who I Am
            </motion.h2>

            <motion.div
              className="space-y-6 text-zinc-300 text-lg leading-relaxed"
              variants={item}
            >
              <p>
                I'm someone who is genuinely obsessed with understanding how things work — not
                just the surface, but the systems underneath. The reasons behind decisions. The
                patterns that repeat across industries most people treat as unrelated.
              </p>
              <p>
                My background sits at an unusual intersection: manufacturing quality, emerging
                technology, and product thinking. I've spent time inside pharmaceutical and
                medical device environments where the cost of imprecision is measured in more than
                dollars. That shapes how I approach everything I build.
              </p>
              <p>
                Right now I'm applying that same rigour to AI, cybersecurity, blockchain, and
                web experiences — not because they're trending, but because they're the
                next frontier of systems worth understanding.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 mt-16"
              variants={item}
            >
              {[
                'Systems Thinking',
                'Quality First',
                'Cross-Industry',
                'Continuous Learning',
                'Product Minded',
                'Honest Work',
              ].map((q) => (
                <div key={q} className="flex items-center gap-3 text-zinc-500 text-sm">
                  <div className="w-1 h-1 rounded-full bg-indigo-500 flex-shrink-0" />
                  {q}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Chapter 02: Selected Projects ── */}
      <section className="py-36 px-6 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p
              className="text-indigo-400 text-xs tracking-[0.25em] uppercase font-medium mb-6"
              variants={item}
            >
              Chapter 02
            </motion.p>
            <motion.h2
              className="text-4xl md:text-5xl font-bold tracking-tight mb-16"
              variants={item}
            >
              Selected Projects
            </motion.h2>

            <div className="space-y-5">
              {projects.map((project) => (
                <motion.div
                  key={project.name}
                  className={`relative group rounded-2xl border p-8 md:p-10 transition-colors duration-300 ${
                    project.featured
                      ? 'border-zinc-700 bg-zinc-900/70 hover:border-indigo-500/40'
                      : 'border-zinc-800/60 bg-zinc-900/30 hover:border-zinc-700'
                  }`}
                  variants={item}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25 }}
                >
                  {project.featured && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-900/10 via-transparent to-purple-900/5 pointer-events-none" />
                  )}

                  <div className="relative">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <h3 className="text-xl font-semibold">{project.name}</h3>
                      {project.featured && (
                        <span className="text-xs text-indigo-400 border border-indigo-500/30 rounded-full px-2.5 py-0.5">
                          Featured
                        </span>
                      )}
                      <span className="text-xs text-zinc-600 border border-zinc-800 rounded-full px-2.5 py-0.5">
                        {project.status}
                      </span>
                    </div>
                    <p className="text-zinc-400 leading-relaxed mb-6 max-w-2xl">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-zinc-500 bg-zinc-800/50 rounded-full px-3 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Chapter 03: Professional Journey ── */}
      <section className="py-36 px-6 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p
              className="text-indigo-400 text-xs tracking-[0.25em] uppercase font-medium mb-6"
              variants={item}
            >
              Chapter 03
            </motion.p>
            <motion.h2
              className="text-4xl md:text-5xl font-bold tracking-tight mb-16"
              variants={item}
            >
              Professional Journey
            </motion.h2>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-3 top-2 bottom-0 w-px bg-gradient-to-b from-indigo-500/60 via-zinc-800/80 to-transparent" />

              <div className="space-y-16 pl-12">
                {timeline.map((entry) => (
                  <motion.div key={entry.company} className="relative" variants={item}>
                    {/* Dot */}
                    <div className="absolute -left-[2.35rem] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-indigo-500 bg-[#09090b]" />

                    <h3 className="text-xl font-semibold mb-1">{entry.company}</h3>
                    <p className="text-zinc-600 text-sm mb-4 font-medium tracking-wide">
                      {entry.role}
                    </p>
                    <p className="text-zinc-400 leading-relaxed mb-5 max-w-xl">
                      {entry.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {entry.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs text-indigo-400/80 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Chapter 04: Currently Exploring ── */}
      <section className="py-36 px-6 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p
              className="text-indigo-400 text-xs tracking-[0.25em] uppercase font-medium mb-6"
              variants={item}
            >
              Chapter 04
            </motion.p>
            <motion.h2
              className="text-4xl md:text-5xl font-bold tracking-tight mb-3"
              variants={item}
            >
              Currently Exploring
            </motion.h2>
            <motion.p className="text-zinc-500 text-lg mb-14" variants={item}>
              Hover to see where the curiosity is leading.
            </motion.p>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              variants={container}
            >
              {explorations.map((exp) => (
                <motion.div key={exp.title} variants={item}>
                  <ExplorationCard title={exp.title} insight={exp.insight} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Chapter 05: Let's Build Something Together ── */}
      <section id="contact" className="py-44 px-6 border-t border-zinc-900">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p
              className="text-indigo-400 text-xs tracking-[0.25em] uppercase font-medium mb-6"
              variants={item}
            >
              Chapter 05
            </motion.p>
            <motion.h2
              className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-6"
              variants={item}
            >
              Let's Build
              <br />
              <span className="text-zinc-600">Something Together.</span>
            </motion.h2>
            <motion.p
              className="text-zinc-400 text-lg mb-14 leading-relaxed max-w-xl mx-auto"
              variants={item}
            >
              If you're working on something that requires genuine curiosity and careful
              thinking, I'd like to hear about it.
            </motion.p>
            <motion.div variants={item}>
              <motion.a
                href="https://github.com/MatthewRichards101"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-zinc-900 rounded-xl font-semibold text-sm hover:bg-zinc-100 transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get in touch →
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-zinc-900 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <span className="text-xs text-zinc-700 tracking-[0.2em] uppercase">
            Matthew Richards
          </span>
          <span className="text-xs text-zinc-800">&copy; 2026</span>
        </div>
      </footer>
    </div>
  );
}

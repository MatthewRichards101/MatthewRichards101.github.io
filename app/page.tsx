'use client';

import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { useEffect, useRef, useState, type CSSProperties } from 'react';

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

const storyMoments = [
  {
    era: 'Learning',
    title: 'Questions before certainty',
    description:
      'The starting point has always been curiosity — following the threads behind how systems behave, where friction lives, and why certain experiences feel inevitable while others fall apart.',
    accent: 'from-cyan-400/30 via-sky-500/20 to-transparent',
  },
  {
    era: 'Manufacturing',
    title: 'Precision shaped the mindset',
    description:
      'Pharmaceutical and medical-device environments made rigor non-negotiable. Process, compliance, and repeatability became foundations rather than constraints.',
    accent: 'from-indigo-500/30 via-violet-500/15 to-transparent',
  },
  {
    era: 'Cybersecurity',
    title: 'Understanding failure paths',
    description:
      'Security sharpened the instinct to inspect surfaces less and assumptions more. The most useful systems are often the ones built to survive pressure gracefully.',
    accent: 'from-violet-500/25 via-fuchsia-500/15 to-transparent',
  },
  {
    era: 'AI',
    title: 'Better questions, better leverage',
    description:
      'AI is most compelling as a thinking partner and force multiplier — a way to transform ambiguity into momentum through better prompts, experiments, and product decisions.',
    accent: 'from-sky-400/20 via-cyan-400/15 to-transparent',
  },
  {
    era: 'Blockchain',
    title: 'Trust as a design material',
    description:
      'Distributed systems introduced a new design language around ownership, incentives, and credibility — ideas that continue to influence how digital products are imagined.',
    accent: 'from-amber-300/20 via-orange-400/10 to-transparent',
  },
  {
    era: 'Product Design',
    title: 'Experiences people remember',
    description:
      'The through-line is building things that feel deliberate. Not just functional, but meaningful — clear systems with an emotional signature.',
    accent: 'from-indigo-500/20 via-cyan-400/10 to-transparent',
  },
];

const projects = [
  {
    name: 'Cosmic Outpost',
    description:
      'A digital product that began as an NFT concept and evolved into an interactive AI-assisted experience. Part creative experiment, part exploration into how digital ownership and AI can coexist within a single product.',
    stack: ['Next.js', 'AI Workflows', 'Interactive UX'],
    tags: ['Digital Product', 'AI', 'Interactive Experience'],
    status: 'Ongoing',
    featured: true,
    liveUrl: 'https://cosmicoutposts.lovable.app',
    githubUrl: 'https://github.com/MatthewRichards101?tab=repositories',
    imageLabel: 'Orbital system diagram',
  },
  {
    name: 'Personal Brand Systems',
    description:
      'Building the infrastructure behind a personal brand — from content pipelines to digital presence. An exercise in treating identity like a product worth engineering.',
    stack: ['Next.js', 'Framer Motion', 'Brand Systems'],
    tags: ['Strategy', 'Web', 'Automation'],
    status: 'Active',
    featured: false,
    liveUrl: 'https://matthewrichards101.github.io',
    githubUrl: 'https://github.com/MatthewRichards101/MatthewRichards101.github.io',
    imageLabel: 'Blueprint exploration grid',
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
    href: 'https://www.youtube.com/results?search_query=MatthewRichards101',
    accent: 'from-amber-300/20 via-orange-400/10 to-transparent',
  },
  {
    name: 'Email',
    href: 'mailto:',
    accent: 'from-cyan-400/20 via-indigo-400/10 to-transparent',
  },
];

const constellationNodes = [
  { id: 'a', x: 18, y: 30, size: 7 },
  { id: 'b', x: 37, y: 18, size: 5 },
  { id: 'c', x: 55, y: 32, size: 8 },
  { id: 'd', x: 73, y: 22, size: 6 },
  { id: 'e', x: 82, y: 50, size: 7 },
  { id: 'f', x: 61, y: 65, size: 5 },
  { id: 'g', x: 36, y: 58, size: 6 },
  { id: 'h', x: 22, y: 74, size: 4 },
];

const constellationPaths = [
  ['a', 'b'],
  ['b', 'c'],
  ['c', 'd'],
  ['c', 'g'],
  ['g', 'h'],
  ['c', 'f'],
  ['f', 'e'],
];

const stars = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  left: `${(index * 17) % 100}%`,
  top: `${(index * 29) % 100}%`,
  size: index % 3 === 0 ? 2 : 1,
  delay: (index % 6) * 0.8,
}));

function getNodePosition(id: string) {
  return constellationNodes.find((node) => node.id === id);
}

function Keyword({ children, delay = 0 }: { children: string; delay?: number }) {
  return (
    <motion.span
      className="inline-flex premium-keyword"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.span>
  );
}

function SocialIcon({ name }: { name: string }) {
  const common = 'h-4 w-4';

  switch (name) {
    case 'LinkedIn':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={common}>
          <path d="M6.5 8.5V18" />
          <path d="M11 18v-5.2c0-1.7 1.1-2.8 2.6-2.8 1.6 0 2.4 1 2.4 2.8V18" />
          <circle cx="6.5" cy="5.8" r="1.2" fill="currentColor" stroke="none" />
          <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" />
        </svg>
      );
    case 'GitHub':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={common}>
          <path d="M9 19c-4 1.2-4-2-6-2" />
          <path d="M15 21v-3.5c0-1 .2-1.6.7-2 2.1-.2 4.3-1 4.3-5.1 0-1.2-.4-2.2-1.2-3 .1-.3.5-1.5-.1-3.1 0 0-1-.3-3.3 1.2a11.4 11.4 0 0 0-6 0C7 4 6 4.3 6 4.3c-.6 1.6-.2 2.8-.1 3.1-.8.8-1.2 1.8-1.2 3 0 4.1 2.2 4.9 4.3 5.1.5.4.7 1 .7 2V21" />
        </svg>
      );
    case 'X':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
          <path d="M4 4l16 16" />
          <path d="M20 4L8.5 17" />
          <path d="M14 4H20" />
          <path d="M4 20h6" />
        </svg>
      );
    case 'YouTube':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={common}>
          <rect x="3.5" y="6" width="17" height="12" rx="3.5" />
          <path d="M10 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={common}>
          <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
          <path d="M5.5 8l6.5 5 6.5-5" />
        </svg>
      );
  }
}

function HeroSystemMap() {
  return (
    <motion.div
      className="hero-orbit pointer-events-none absolute inset-x-0 top-1/2 z-0 mx-auto hidden h-[32rem] w-[32rem] -translate-y-1/2 md:block"
      animate={{ rotate: [0, 4, 0], scale: [1, 1.02, 1] }}
      transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      <div className="absolute inset-10 rounded-full border border-white/10" />
      <div className="absolute inset-20 rounded-full border border-cyan-300/10" />
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.16),transparent_58%)] blur-3xl" />

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="constellation-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(125,211,252,0.2)" />
            <stop offset="50%" stopColor="rgba(129,140,248,0.55)" />
            <stop offset="100%" stopColor="rgba(250,204,21,0.18)" />
          </linearGradient>
        </defs>

        {constellationPaths.map(([startId, endId]) => {
          const start = getNodePosition(startId);
          const end = getNodePosition(endId);

          if (!start || !end) return null;

          return (
            <motion.line
              key={`${startId}-${endId}`}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="url(#constellation-line)"
              strokeWidth="0.45"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0.2 }}
              animate={{ pathLength: 1, opacity: [0.2, 0.65, 0.3] }}
              transition={{ duration: 5, delay: 0.2, repeat: Infinity, repeatType: 'mirror' }}
            />
          );
        })}

        {constellationNodes.map((node, index) => (
          <motion.g
            key={node.id}
            animate={{ y: [0, -1.8, 0], x: [0, 1.4, 0] }}
            transition={{ duration: 8 + index, repeat: Infinity, ease: 'easeInOut' }}
          >
            <circle cx={node.x} cy={node.y} r={node.size * 1.7} fill="rgba(125, 211, 252, 0.07)" />
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={node.size / 2.3}
              fill={index % 3 === 0 ? '#facc15' : index % 2 === 0 ? '#7dd3fc' : '#818cf8'}
              animate={{ opacity: [0.35, 0.95, 0.35], scale: [1, 1.18, 1] }}
              transition={{ duration: 3.2 + index * 0.15, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.g>
        ))}

        <motion.path
          d="M12 62C24 54 28 47 40 45C50 43 54 52 63 50C73 48 79 37 88 40"
          fill="none"
          stroke="rgba(255,255,255,0.13)"
          strokeDasharray="1 3"
          strokeWidth="0.35"
          animate={{ opacity: [0.12, 0.32, 0.12], pathOffset: [0, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        />
      </svg>
    </motion.div>
  );
}

function SectionIllustration({
  tone = 'violet',
  align = 'right',
}: {
  tone?: 'violet' | 'cyan' | 'gold';
  align?: 'left' | 'right';
}) {
  const toneClass =
    tone === 'cyan'
      ? 'from-cyan-400/12 via-sky-400/8 to-transparent'
      : tone === 'gold'
        ? 'from-amber-300/12 via-orange-400/8 to-transparent'
        : 'from-violet-400/12 via-indigo-400/8 to-transparent';

  return (
    <motion.div
      className={`pointer-events-none absolute ${align === 'right' ? 'right-0' : 'left-0'} top-10 hidden h-56 w-72 lg:block`}
      initial={{ opacity: 0.15, y: 10 }}
      whileInView={{ opacity: 0.4, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      aria-hidden="true"
    >
      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${toneClass} blur-3xl`} />
      <svg viewBox="0 0 320 180" className="absolute inset-0 h-full w-full">
        <path d="M20 140H150L190 100H300" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />
        <path d="M40 38H130L160 66H280" stroke="rgba(125,211,252,0.15)" strokeWidth="1" fill="none" strokeDasharray="5 8" />
        <circle cx="78" cy="38" r="5" fill="rgba(129,140,248,0.25)" />
        <circle cx="189" cy="100" r="4" fill="rgba(250,204,21,0.22)" />
        <circle cx="242" cy="66" r="6" fill="rgba(125,211,252,0.18)" />
        <rect x="128" y="118" width="62" height="24" rx="12" stroke="rgba(255,255,255,0.08)" fill="rgba(255,255,255,0.02)" />
      </svg>
    </motion.div>
  );
}

function StoryCard({
  era,
  title,
  description,
  accent,
}: {
  era: string;
  title: string;
  description: string;
  accent: string;
}) {
  return (
    <motion.div
      className="premium-panel group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6"
      variants={item}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
    >
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent} opacity-80`} />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-30" />
      <div className="relative">
        <span className="mb-4 inline-flex rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-zinc-400">
          {era}
        </span>
        <h3 className="mb-3 text-xl font-semibold text-white">{title}</h3>
        <p className="text-sm leading-7 text-zinc-300">{description}</p>
      </div>
    </motion.div>
  );
}

function ProjectThumbnail({ label, featured }: { label: string; featured: boolean }) {
  return (
    <div className="relative mb-8 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#090b14] p-5">
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
        transition={{ duration: featured ? 20 : 24, repeat: Infinity, ease: 'linear' }}
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(96,165,250,0.22), transparent 35%), radial-gradient(circle at 80% 25%, rgba(168,85,247,0.18), transparent 30%), radial-gradient(circle at 50% 85%, rgba(250,204,21,0.1), transparent 28%)',
          backgroundSize: '160% 160%',
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />
      <motion.div
        className="relative aspect-[16/9] rounded-[1.2rem] border border-white/10 bg-black/20"
        animate={{ rotate: [0, 0.6, 0], scale: [1, 1.015, 1] }}
        transition={{ duration: featured ? 12 : 16, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 320 180" className="h-full w-full text-white/40">
          <defs>
            <linearGradient id={`project-line-${label}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(125,211,252,0.16)" />
              <stop offset="50%" stopColor="rgba(129,140,248,0.55)" />
              <stop offset="100%" stopColor="rgba(250,204,21,0.18)" />
            </linearGradient>
          </defs>
          <path d="M34 118H92L122 88H194L230 58H286" stroke={`url(#project-line-${label})`} strokeWidth="1.3" fill="none" />
          <path d="M48 56H126L158 84H246" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" strokeDasharray="5 6" />
          <circle cx="92" cy="118" r="5" fill="rgba(125,211,252,0.75)" />
          <circle cx="194" cy="88" r="6" fill="rgba(129,140,248,0.7)" />
          <circle cx="230" cy="58" r="4" fill="rgba(250,204,21,0.8)" />
          <rect x="118" y="116" width="88" height="22" rx="11" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.08)" />
        </svg>
        <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-zinc-300">
          {label}
        </div>
      </motion.div>
    </div>
  );
}

function LinkButton({ href, label, subtle = false }: { href: string; label: string; subtle?: boolean }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        subtle
          ? 'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-200 transition-colors duration-200 hover:border-cyan-300/30 hover:text-white'
          : 'inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-white text-sm font-medium text-zinc-950 px-4 py-2 transition-transform duration-200 hover:-translate-y-0.5'
      }
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      {label}
      <span aria-hidden="true">↗</span>
    </motion.a>
  );
}

function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  const overlayStyle = {
    background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(125,211,252,0.14), transparent 32%), radial-gradient(circle at ${spotlight.x + 10}% ${spotlight.y - 8}%, rgba(167,139,250,0.12), transparent 26%)`,
  } satisfies CSSProperties;

  return (
    <motion.div
      className={`premium-panel group relative overflow-hidden rounded-[2rem] border p-8 md:p-10 ${
        project.featured
          ? 'border-white/12 bg-white/[0.055] shadow-[0_0_80px_rgba(79,70,229,0.08)]'
          : 'border-white/8 bg-white/[0.04]'
      }`}
      variants={item}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width) * 100;
        const y = ((event.clientY - bounds.top) / bounds.height) * 100;
        setSpotlight({ x, y });
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={overlayStyle} />
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-35" />
      <div className="relative">
        <ProjectThumbnail label={project.imageLabel} featured={project.featured} />

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <h3 className="text-2xl font-semibold text-white">{project.name}</h3>
          {project.featured && (
            <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.24em] text-cyan-200">
              Featured
            </span>
          )}
          <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.24em] text-zinc-400">
            {project.status}
          </span>
        </div>

        <p className="mb-6 max-w-2xl leading-8 text-zinc-300">{project.description}</p>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <motion.span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-300"
              whileHover={{ y: -1 }}
              transition={{ delay: index * 0.02 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-indigo-400/15 bg-indigo-400/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-indigo-100/80"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:translate-y-2 md:opacity-80">
          <LinkButton href={project.liveUrl} label="Live website" />
          <LinkButton href={project.githubUrl} label="GitHub" subtle />
        </div>
      </div>
    </motion.div>
  );
}

function ExplorationCard({ title, insight }: { title: string; insight: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="premium-panel relative flex min-h-[150px] cursor-default items-center overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.045] p-6 select-none"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ borderColor: 'rgba(125, 211, 252, 0.28)', y: -3 }}
      transition={{ duration: 0.2 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.12),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(129,140,248,0.14),transparent_42%)] opacity-80" />
      <AnimatePresence mode="wait">
        {!hovered ? (
          <motion.div
            key="label"
            className="relative w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="mb-4 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(125,211,252,0.8)]" />
            <p className="font-medium text-white">{title}</p>
          </motion.div>
        ) : (
          <motion.div
            key="insight"
            className="relative w-full"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-sm leading-7 text-zinc-300">&ldquo;{insight}&rdquo;</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Home() {
  const [navVisible, setNavVisible] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => setNavVisible(!entry.isIntersecting), {
      threshold: 0.05,
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      setPointer({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05060a] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="ambient-grid absolute inset-0 opacity-40" />
        <div className="ambient-noise absolute inset-0 opacity-30" />
        <motion.div
          className="absolute -left-24 top-16 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.16),transparent_60%)] blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-[-8rem] top-[28rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.14),transparent_58%)] blur-3xl"
          animate={{ x: [0, -28, 0], y: [0, -16, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[-10rem] left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(250,204,21,0.08),transparent_62%)] blur-3xl"
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.75, 0.5] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        />
        {stars.map((star) => (
          <motion.span
            key={star.id}
            className="absolute rounded-full bg-white/70"
            style={{ left: star.left, top: star.top, width: star.size, height: star.size }}
            animate={{ opacity: [0.15, 0.7, 0.15], scale: [1, 1.4, 1] }}
            transition={{ duration: 5 + star.delay, repeat: Infinity, delay: star.delay }}
          />
        ))}
      </div>

      <div
        className="pointer-events-none fixed left-0 top-0 z-10 hidden h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(125,211,252,0.16),rgba(129,140,248,0.08),transparent_68%)] blur-3xl md:block"
        style={{ transform: `translate(${pointer.x - 80}px, ${pointer.y - 80}px)` }}
        aria-hidden="true"
      />

      <motion.nav
        className="fixed top-0 z-50 w-full px-8 py-5"
        animate={{ opacity: navVisible ? 1 : 0, y: navVisible ? 0 : -12 }}
        transition={{ duration: 0.4 }}
        style={{ pointerEvents: navVisible ? 'auto' : 'none' }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-black/25 px-5 py-3 backdrop-blur-xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300">MR</span>
          <a
            href="#contact"
            className="text-sm text-zinc-300 transition-colors duration-200 hover:text-white"
          >
            Let&apos;s talk →
          </a>
        </div>
      </motion.nav>

      <section
        ref={heroRef}
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
      >
        <HeroSystemMap />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.08),transparent_42%)]" />

        <motion.div
          className="relative z-10 text-center"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="mb-10 text-xs font-medium uppercase tracking-[0.35em] text-zinc-500"
            variants={item}
          >
            Matthew Richards
          </motion.p>

          <motion.h1
            className="mb-6 text-5xl font-bold leading-[1.02] tracking-tightest text-white sm:text-7xl md:text-8xl"
            variants={item}
          >
            <Keyword delay={0.1}>Curiosity</Keyword>
            <br />
            Creates{' '}
            <motion.span
              className="inline-flex bg-gradient-to-r from-cyan-200 via-indigo-200 to-amber-100 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundSize: '180% 180%' }}
            >
              <Keyword delay={0.2}>Momentum</Keyword>
            </motion.span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-10 max-w-3xl text-lg font-light tracking-wide text-zinc-300 md:text-xl"
            variants={item}
          >
            Building better <Keyword delay={0.35}>Systems</Keyword>. Creating memorable{' '}
            <span className="text-zinc-500">
              <Keyword delay={0.45}>Experiences</Keyword>.
            </span>
          </motion.p>
          <motion.p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-zinc-500 md:text-base" variants={item}>
            A personal brand shaped by exploration, craftsmanship, and the momentum that happens
            when technology meets intention.
          </motion.p>
        </motion.div>

        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          <motion.div
            className="mx-auto h-14 w-px bg-gradient-to-b from-cyan-300/70 via-white/40 to-transparent"
            animate={{ scaleY: [0, 1, 0] }}
            style={{ originY: 0 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
        </motion.div>
      </section>

      <section className="relative px-6 py-36">
        <SectionIllustration tone="cyan" align="right" />
        <div className="mx-auto max-w-5xl">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p
              className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-cyan-300"
              variants={item}
            >
              Chapter 01
            </motion.p>
            <motion.h2 className="mb-10 text-4xl font-bold tracking-tight md:text-5xl" variants={item}>
              Who I Am
            </motion.h2>

            <motion.div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]" variants={item}>
              <div>
                <p className="mb-6 text-lg leading-8 text-zinc-300">
                  I&apos;m drawn to the layers underneath things — the systems behind products, the
                  decision-making behind experiences, and the patterns that connect industries most
                  people assume have nothing in common.
                </p>
                <p className="mb-6 text-lg leading-8 text-zinc-300">
                  My background sits at an unusual intersection: manufacturing quality, emerging
                  technology, and product thinking. That mix shapes how I build — careful enough to
                  respect complexity, curious enough to keep pushing beyond what already exists.
                </p>
                <p className="text-lg leading-8 text-zinc-400">
                  The result is a journey that feels less like a résumé and more like an evolving
                  map: <Keyword delay={0.1}>Technology</Keyword>, trust, and experiences designed to
                  move people forward.
                </p>
              </div>

              <div className="space-y-4">
                {storyMoments.slice(0, 3).map((moment) => (
                  <StoryCard key={moment.era} {...moment} />
                ))}
              </div>
            </motion.div>

            <motion.div className="mt-6 grid gap-4 md:grid-cols-3" variants={container}>
              {storyMoments.slice(3).map((moment) => (
                <StoryCard key={moment.era} {...moment} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative border-t border-white/6 px-6 py-36">
        <SectionIllustration tone="violet" align="left" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300/20 to-transparent" />
        <div className="mx-auto max-w-5xl">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p
              className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-indigo-300"
              variants={item}
            >
              Chapter 02
            </motion.p>
            <motion.h2 className="mb-16 text-4xl font-bold tracking-tight md:text-5xl" variants={item}>
              Selected Projects
            </motion.h2>

            <div className="space-y-6">
              {projects.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative border-t border-white/6 px-6 py-36">
        <SectionIllustration tone="gold" align="right" />
        <div className="mx-auto max-w-4xl">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p
              className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-amber-200"
              variants={item}
            >
              Chapter 03
            </motion.p>
            <motion.h2 className="mb-16 text-4xl font-bold tracking-tight md:text-5xl" variants={item}>
              Professional Journey
            </motion.h2>

            <div className="relative">
              <div className="absolute left-3 top-2 bottom-0 w-px bg-gradient-to-b from-cyan-300/70 via-indigo-400/40 to-transparent" />
              <div className="absolute left-0 top-0 hidden h-full w-28 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:100%_22px] opacity-20 md:block" />

              <div className="space-y-16 pl-12">
                {timeline.map((entry, index) => (
                  <motion.div key={entry.company} className="relative" variants={item}>
                    <div className="absolute -left-[2.35rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-cyan-300 bg-[#05060a] shadow-[0_0_16px_rgba(125,211,252,0.5)]" />
                    <div className="premium-panel rounded-[1.6rem] border border-white/8 bg-white/[0.04] p-6">
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-semibold text-white">{entry.company}</h3>
                        <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-zinc-400">
                          Step {index + 1}
                        </span>
                      </div>
                      <p className="mb-4 text-sm font-medium tracking-[0.18em] text-zinc-500 uppercase">
                        {entry.role}
                      </p>
                      <p className="mb-5 max-w-xl leading-8 text-zinc-300">{entry.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {entry.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full border border-cyan-300/15 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100/85"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative border-t border-white/6 px-6 py-36">
        <SectionIllustration tone="cyan" align="left" />
        <div className="mx-auto max-w-5xl">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p
              className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-cyan-300"
              variants={item}
            >
              Chapter 04
            </motion.p>
            <motion.h2 className="mb-3 text-4xl font-bold tracking-tight md:text-5xl" variants={item}>
              Currently Exploring
            </motion.h2>
            <motion.p className="mb-14 text-lg text-zinc-400" variants={item}>
              Hover to see where the curiosity is leading.
            </motion.p>

            <motion.div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" variants={container}>
              {explorations.map((exp) => (
                <motion.div key={exp.title} variants={item}>
                  <ExplorationCard title={exp.title} insight={exp.insight} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="relative border-t border-white/6 px-6 py-44">
        <SectionIllustration tone="violet" align="right" />
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p
              className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-indigo-300"
              variants={item}
            >
              Chapter 05
            </motion.p>
            <motion.h2
              className="mb-6 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl"
              variants={item}
            >
              Let&apos;s Build
              <br />
              <span className="bg-gradient-to-r from-white via-cyan-100 to-indigo-100 bg-clip-text text-transparent">
                Something Together.
              </span>
            </motion.h2>
            <motion.p
              className="mx-auto mb-14 max-w-2xl text-lg leading-8 text-zinc-400"
              variants={item}
            >
              If you&apos;re working on something that needs curiosity, systems thinking, and
              deliberate execution, I&apos;d love to hear where you&apos;re headed.
            </motion.p>

            <motion.div
              className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
              variants={container}
            >
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="premium-panel group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.045] px-4 py-5 text-left"
                  variants={item}
                  whileHover={{ y: -3 }}
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
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-white/6 px-6 py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 md:flex-row">
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">Matthew Richards</span>
          <span className="text-xs text-zinc-700">&copy; 2026</span>
        </div>
      </footer>
    </div>
  );
}

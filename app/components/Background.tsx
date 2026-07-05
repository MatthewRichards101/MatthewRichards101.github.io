'use client';

import { m, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';

const STAR_HORIZONTAL_SPREAD = 17;
const STAR_VERTICAL_SPREAD = 29;
const STAR_DELAY_INCREMENT = 0.8;
const CURSOR_GLOW_OFFSET = 80;

const stars = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  left: `${(index * STAR_HORIZONTAL_SPREAD) % 100}%`,
  top: `${(index * STAR_VERTICAL_SPREAD) % 100}%`,
  size: index % 3 === 0 ? 2 : 1,
  delay: (index % 6) * STAR_DELAY_INCREMENT,
}));

// Slow, low-opacity particles that drift diagonally in the background,
// distinct from the twinkling stars — pure CSS animation for performance.
const driftParticles = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  left: `${(index * 23 + 5) % 100}%`,
  top: `${(index * 31 + 8) % 100}%`,
  size: index % 4 === 0 ? 3 : 2,
  duration: 16 + (index % 5) * 4,
  driftX: `${((index % 3) - 1) * 26}px`,
  driftY: `${((index % 4) - 2) * 22}px`,
  hue:
    index % 4 === 0
      ? 'bg-cyan-300/50'
      : index % 4 === 1
        ? 'bg-violet-300/50'
        : index % 4 === 2
          ? 'bg-amber-200/40'
          : 'bg-blue-300/50',
}));

// One continuous environment behind every section: layered gradients,
// a faint grid, noise texture, twinkling stars, drifting particles, and
// a soft light that follows the cursor. Fixed so scrolling feels like
// moving through a single space rather than between flat panels.
export function Background() {
  const shouldReduceMotion = useReducedMotion();
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMove = (event: PointerEvent) => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        setPointer({ x: event.clientX, y: event.clientY });
        rafRef.current = null;
      });
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handleMove);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [shouldReduceMotion]);

  const cursorStyle = useMemo(
    () => ({ transform: `translate(${pointer.x - CURSOR_GLOW_OFFSET}px, ${pointer.y - CURSOR_GLOW_OFFSET}px)` }),
    [pointer.x, pointer.y]
  );

  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="ambient-grid absolute inset-0 opacity-40" />
        <div className="ambient-noise absolute inset-0 opacity-30" />

        {!shouldReduceMotion && (
          <>
            <m.div
              className="absolute -left-24 top-16 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.16),transparent_60%)] blur-3xl"
              animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
              transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
            />
            <m.div
              className="absolute right-[-8rem] top-[28rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.14),transparent_58%)] blur-3xl"
              animate={{ x: [0, -28, 0], y: [0, -16, 0] }}
              transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
            />
            <m.div
              className="absolute bottom-[-10rem] left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(250,204,21,0.08),transparent_62%)] blur-3xl"
              animate={{ x: [0, 24, 0], y: [0, -18, 0] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
            />
          </>
        )}

        {stars.map((star) => (
          <m.span
            key={star.id}
            className="absolute rounded-full bg-white/70"
            style={{ left: star.left, top: star.top, width: star.size, height: star.size }}
            animate={shouldReduceMotion ? undefined : { opacity: [0.15, 0.7, 0.15], scale: [1, 1.4, 1] }}
            transition={shouldReduceMotion ? undefined : { duration: 5 + star.delay, repeat: Infinity, delay: star.delay }}
          />
        ))}

        {!shouldReduceMotion &&
          driftParticles.map((particle) => (
            <span
              key={particle.id}
              className={`drift-particle absolute rounded-full ${particle.hue}`}
              style={
                {
                  left: particle.left,
                  top: particle.top,
                  width: particle.size,
                  height: particle.size,
                  animationDuration: `${particle.duration}s`,
                  '--drift-x': particle.driftX,
                  '--drift-y': particle.driftY,
                } as CSSProperties
              }
            />
          ))}
      </div>

      {!shouldReduceMotion && (
        <div
          className="pointer-events-none fixed left-0 top-0 z-10 hidden h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(125,211,252,0.16),rgba(129,140,248,0)_65%)] blur-2xl md:block"
          style={cursorStyle}
          aria-hidden="true"
        />
      )}
    </>
  );
}

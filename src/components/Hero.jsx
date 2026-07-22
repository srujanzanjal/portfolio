import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { profile, stats } from '../data'
import { CountUp, Cursor, Typewriter, TrafficDots } from './primitives'
import ParticleField from './ParticleField'

export default function Hero({ onOpenPalette }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const [typed, setTyped] = useState(false)

  return (
    <section ref={ref} id="home" className="relative flex min-h-[100svh] items-center pt-24">
      {/* animated particle-network backdrop, fades out toward the bottom */}
      <div
        className="absolute inset-0 z-0"
        style={{
          maskImage: 'linear-gradient(to bottom, #000 55%, transparent 92%)',
          WebkitMaskImage: 'linear-gradient(to bottom, #000 55%, transparent 92%)',
        }}
      >
        <ParticleField />
      </div>
      <motion.div style={{ y, opacity }} className="container-x relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_.85fr]">
          {/* Left: identity */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-base-700 bg-base-850/60 px-3 py-1.5 font-mono text-xs text-ink-mut backdrop-blur"
            >
              <span className="h-2 w-2 rounded-full bg-flag shadow-glow-flag" />
              available for opportunities · {profile.location.split(',')[0]}
            </motion.div>

            <p className="mono-label mb-4">$ whoami</p>

            <h1 className="font-sans text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-ink">Srujan</span>{' '}
              <span className="bg-gradient-to-r from-cyan via-cyan-glow to-flag bg-clip-text text-transparent glow-text">
                Zanjal
              </span>
            </h1>

            <div className="mt-5 h-8 font-mono text-lg text-cyan sm:text-xl">
              <Typewriter text={profile.role} speed={38} onDone={() => setTyped(true)} />
              {!typed && <Cursor />}
            </div>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-mut sm:text-lg">
              {profile.tagline}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-lg bg-cyan px-5 py-3 font-mono text-sm font-medium text-base-950 shadow-glow transition hover:bg-cyan-glow"
              >
                ./view-work
                <span className="transition group-hover:translate-x-0.5">→</span>
              </a>
              <button
                onClick={onOpenPalette}
                className="inline-flex items-center gap-2 rounded-lg border border-base-700 bg-base-850/60 px-5 py-3 font-mono text-sm text-ink-mut backdrop-blur transition hover:border-cyan/50 hover:text-ink"
              >
                <span className="rounded border border-base-600 px-1.5 py-0.5 text-[10px]">⌘K</span>
                jump to…
              </button>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-lg border border-transparent px-3 py-3 font-mono text-sm text-ink-mut transition hover:text-flag"
              >
                connect →
              </a>
            </div>
          </div>

          {/* Right: terminal id card */}
          <motion.div
            initial={{ opacity: 0, y: 24, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
            className="term scanline"
            style={{ perspective: 1000 }}
          >
            <div className="term-bar">
              <TrafficDots />
              <span className="ml-2 font-mono text-xs text-ink-faint">~/id_srujan.json</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-ink-mut">
{`{
  `}<span className="text-cyan">"handle"</span>{`: `}<span className="text-flag">"@srujanzanjal"</span>{`,
  `}<span className="text-cyan">"role"</span>{`: `}<span className="text-flag">"CTF player / builder"</span>{`,
  `}<span className="text-cyan">"now"</span>{`: `}<span className="text-flag">"Intern @ Infocepts"</span>{`,
  `}<span className="text-cyan">"focus"</span>{`: [`}<span className="text-ink">"security"</span>, <span className="text-ink">"AI/RAG"</span>, <span className="text-ink">"full-stack"</span>{`],
  `}<span className="text-cyan">"motto"</span>{`: `}<span className="text-flag">"break it, then build it right"</span>{`
}`}
            </pre>
          </motion.div>
        </div>

        {/* Stat HUD */}
        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-base-700 bg-base-700/40 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-base-900/70 px-5 py-6 backdrop-blur">
              <div className="font-mono text-3xl font-bold text-cyan glow-text sm:text-4xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs text-ink-mut">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-faint"
      >
        scroll ↓
      </motion.div>
    </section>
  )
}

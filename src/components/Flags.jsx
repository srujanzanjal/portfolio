import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Section from './Section'
import { Reveal } from './primitives'
import { flags } from '../data'

const CATS = ['All', 'CTF', 'Hackathon', 'CP']
const CAT_LABEL = { CTF: 'CTF', Hackathon: 'Hackathon', CP: 'Competitive Programming' }

function placeStyle(place) {
  if (place === '1st') return { ring: 'ring-flag/40', text: 'text-flag', glow: 'glow-flag-text', medal: '🥇' }
  if (place === '2nd') return { ring: 'ring-cyan/40', text: 'text-cyan', glow: 'glow-text', medal: '🥈' }
  return { ring: 'ring-base-600', text: 'text-ink-mut', glow: '', medal: '🥉' }
}

export default function Flags() {
  const [cat, setCat] = useState('All')
  const [active, setActive] = useState(null) // index into `shown` for the lightbox
  const shown = cat === 'All' ? flags : flags.filter((f) => f.cat === cat)
  const firsts = flags.filter((f) => f.place === '1st').length

  const close = useCallback(() => setActive(null), [])
  const move = useCallback(
    (dir) => setActive((a) => (a === null ? a : (a + dir + shown.length) % shown.length)),
    [shown.length]
  )

  useEffect(() => {
    if (active === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') move(1)
      if (e.key === 'ArrowLeft') move(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, close, move])

  const current = active === null ? null : shown[active]

  return (
    <Section id="flags" index="03" command="flags --captured --sort=prestige" title="Flags captured">
      <Reveal>
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <p className="max-w-2xl text-sm leading-relaxed text-ink-mut">
            {flags.length} podium finishes across national CTFs, hackathons and competitive programming —{' '}
            <span className="text-flag">{firsts} of them first place.</span> Every one is
            certificate-backed — <span className="text-cyan">click any card to see the proof.</span>
          </p>
        </div>

        {/* filter tabs */}
        <div className="mb-8 inline-flex flex-wrap gap-1 rounded-lg border border-base-700 bg-base-900/60 p-1 font-mono text-xs">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-md px-3 py-1.5 transition ${
                cat === c ? 'bg-cyan/15 text-cyan ring-1 ring-cyan/30' : 'text-ink-mut hover:text-ink'
              }`}
            >
              {c === 'CP' ? 'CP' : c}
              <span className="ml-1.5 text-ink-faint">
                {c === 'All' ? flags.length : flags.filter((f) => f.cat === c).length}
              </span>
            </button>
          ))}
        </div>
      </Reveal>

      <motion.div layout className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((f, i) => {
            const s = placeStyle(f.place)
            return (
              <motion.article
                key={f.title + f.where}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.28, delay: (i % 6) * 0.03 }}
                whileHover={{ y: -3 }}
                onClick={() => f.cert && setActive(i)}
                className={`card group p-5 ring-1 ${s.ring} ${f.cert ? 'cursor-pointer' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-2xl font-bold ${s.text} ${s.glow}`}>{f.place}</span>
                  <span className="text-2xl" aria-hidden>{s.medal}</span>
                </div>
                <h3 className="mt-3 text-sm font-semibold leading-snug text-ink">{f.title}</h3>
                <p className="mt-1 text-xs text-ink-mut">{f.where}</p>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="rounded border border-base-700 bg-base-900/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                    {CAT_LABEL[f.cat]}
                  </span>
                  {f.date && <span className="font-mono text-[10px] text-ink-faint">{f.date}</span>}
                </div>
                {f.note && (
                  <p className="mt-3 border-t border-base-700/60 pt-3 font-mono text-[11px] italic text-ink-mut">
                    “{f.note}”
                  </p>
                )}
                {f.cert && (
                  <div className="mt-3 flex items-center gap-1.5 font-mono text-[11px] text-cyan/70 transition group-hover:text-cyan">
                    <span>⤢</span> view certificate
                  </div>
                )}
              </motion.article>
            )
          })}
        </AnimatePresence>
      </motion.div>

      {/* Certificate lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-base-950/85 backdrop-blur-sm" onClick={close} />
            <motion.div
              key={current.cert}
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.22 }}
              className="term relative z-10 w-full max-w-3xl"
            >
              <div className="term-bar">
                <div className="flex gap-2">
                  <span className="dot bg-[#ff5f57]" />
                  <span className="dot bg-[#febc2e]" />
                  <span className="dot bg-[#28c840]" />
                </div>
                <span className="ml-2 truncate font-mono text-xs text-ink-faint">
                  ~/certs/{current.cert}
                </span>
                <button
                  onClick={close}
                  className="ml-auto font-mono text-xs text-ink-mut transition hover:text-cyan"
                >
                  close [esc]
                </button>
              </div>
              <div className="bg-base-950 p-3 sm:p-4">
                <img
                  src={`/certs/${current.cert}`}
                  alt={`${current.title} — ${current.place} place certificate`}
                  className="mx-auto max-h-[70vh] w-auto rounded-md"
                />
                <div className="mt-3 flex items-center justify-between px-1">
                  <div>
                    <p className="text-sm font-semibold text-ink">{current.title}</p>
                    <p className="font-mono text-xs text-ink-mut">
                      {current.place} · {current.where}
                      {current.date ? ` · ${current.date}` : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <button
                      onClick={() => move(-1)}
                      className="rounded border border-base-700 px-2 py-1 text-ink-mut transition hover:border-cyan/50 hover:text-cyan"
                      aria-label="Previous certificate"
                    >
                      ←
                    </button>
                    <span className="text-ink-faint">
                      {active + 1}/{shown.length}
                    </span>
                    <button
                      onClick={() => move(1)}
                      className="rounded border border-base-700 px-2 py-1 text-ink-mut transition hover:border-cyan/50 hover:text-cyan"
                      aria-label="Next certificate"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}

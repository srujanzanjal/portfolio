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
    <Section id="flags" index="03" command="podium --sort=prestige" title="Podium Finishes" subtitle="Wins & Achievements">
      <Reveal>
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <p className="max-w-2xl text-base leading-relaxed text-ink-mut">
            {flags.length} podium finishes across national CTFs, hackathons and competitive programming —{' '}
            <span className="text-flag">{firsts} of them first place.</span> Every one is
            certificate-backed — <span className="text-cyan">hover a card to flip it and see the proof.</span>
          </p>
        </div>

        {/* filter tabs */}
        <div className="mb-8 inline-flex flex-wrap gap-1 rounded-lg border border-base-700 bg-base-900/60 p-1 font-mono text-sm">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-md px-3 py-1.5 transition ${
                cat === c ? 'bg-cyan/15 text-cyan ring-1 ring-cyan/30' : 'text-ink-mut hover:text-ink'
              }`}
            >
              {c === 'CP' ? 'Competitive Programming' : c}
              <span className="ml-1.5 text-ink-faint">
                {c === 'All' ? flags.length : flags.filter((f) => f.cat === c).length}
              </span>
            </button>
          ))}
        </div>
      </Reveal>

      <motion.div layout className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
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
                className={`group ${f.cert ? 'cursor-pointer' : ''}`}
              >
                {/* flip stage */}
                <div className="relative h-48 [perspective:1200px] sm:h-52">
                  <div
                    className={`relative h-full w-full transition-transform duration-500 ease-out [transform-style:preserve-3d] ${
                      f.cert ? 'group-hover:[transform:rotateY(180deg)]' : ''
                    }`}
                  >
                    {/* FRONT */}
                    <div
                      className={`card absolute inset-0 flex flex-col overflow-hidden p-4 ring-1 ${s.ring} [backface-visibility:hidden]`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-mono text-xl font-bold ${s.text} ${s.glow}`}>{f.place}</span>
                        <span className="text-lg" aria-hidden>{s.medal}</span>
                      </div>
                      <h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-snug text-ink">{f.title}</h3>
                      <p className="mt-1 truncate text-xs text-ink-mut">{f.where}</p>
                      <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                        <span className="truncate rounded border border-base-700 bg-base-900/60 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                          {CAT_LABEL[f.cat]}
                        </span>
                        <span className="flex flex-none items-center gap-1 font-mono text-[10px] text-ink-faint">
                          {f.date}
                          {f.cert && <span className="text-cyan/60">⟲</span>}
                        </span>
                      </div>
                    </div>

                    {/* BACK — certificate preview */}
                    {f.cert && (
                      <div className="absolute inset-0 overflow-hidden rounded-xl ring-1 ring-cyan/50 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                        <img
                          src={`/certs/${f.cert}`}
                          alt={`${f.title} certificate preview`}
                          className="h-full w-full bg-base-900 object-cover object-top"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-base-950/95 via-base-950/25 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-3">
                          <p className="truncate text-xs font-semibold text-white">{f.title}</p>
                          <p className="mt-1 flex items-center gap-1 font-mono text-[10px] text-cyan">
                            <span>⤢</span> enlarge
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
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
                <span className="ml-2 truncate font-mono text-sm text-ink-faint">
                  ~/certs/{current.cert}
                </span>
                <button
                  onClick={close}
                  className="ml-auto font-mono text-sm text-ink-mut transition hover:text-cyan"
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
                <div className="mt-3 flex items-start justify-between gap-4 px-1">
                  <div>
                    <p className="text-base font-semibold text-ink">{current.title}</p>
                    <p className="font-mono text-sm text-ink-mut">
                      {current.place} · {current.where}
                      {current.date ? ` · ${current.date}` : ''}
                    </p>
                    {current.note && (
                      <p className="mt-2 max-w-md font-mono text-sm italic text-ink-mut">“{current.note}”</p>
                    )}
                  </div>
                  <div className="flex flex-none items-center gap-2 font-mono text-sm">
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

import { useState } from 'react'
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
  const shown = cat === 'All' ? flags : flags.filter((f) => f.cat === cat)
  const firsts = flags.filter((f) => f.place === '1st').length

  return (
    <Section id="flags" index="03" command="flags --captured --sort=prestige" title="Flags captured">
      <Reveal>
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <p className="max-w-2xl text-sm leading-relaxed text-ink-mut">
            {flags.length} podium finishes across national CTFs, hackathons and competitive programming —{' '}
            <span className="text-flag">{firsts} of them first place.</span> The scoreboard, decrypted:
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
                className={`card p-5 ring-1 ${s.ring}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-2xl font-bold ${s.text} ${s.glow}`}>{f.place}</span>
                  <span className="text-2xl" aria-hidden>{s.medal}</span>
                </div>
                <h3 className="mt-3 text-sm font-semibold leading-snug text-ink">{f.title}</h3>
                <p className="mt-1 text-xs text-ink-mut">{f.where}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="rounded border border-base-700 bg-base-900/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                    {CAT_LABEL[f.cat]}
                  </span>
                </div>
                {f.note && (
                  <p className="mt-3 border-t border-base-700/60 pt-3 font-mono text-[11px] italic text-ink-mut">
                    “{f.note}”
                  </p>
                )}
              </motion.article>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </Section>
  )
}

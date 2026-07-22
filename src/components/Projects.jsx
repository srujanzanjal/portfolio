import { motion } from 'framer-motion'
import Section from './Section'
import { Reveal } from './primitives'
import { projects } from '../data'

function ProjectCard({ p, i }) {
  const isFlag = p.accent === 'flag'
  return (
    <Reveal delay={i * 0.07}>
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className={`card group h-full overflow-hidden p-6 ${
          isFlag ? 'hover:border-flag/40' : ''
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mono-label mb-2" style={{ color: isFlag ? 'rgba(0,255,156,.8)' : undefined }}>
              {String(i + 1).padStart(2, '0')} · {p.date}
            </p>
            <h3 className="text-xl font-bold text-ink">{p.name}</h3>
            <p className="mt-0.5 font-mono text-xs text-ink-mut">{p.kind}</p>
          </div>
          <span
            className={`flex h-9 w-9 flex-none items-center justify-center rounded-lg border font-mono text-sm transition group-hover:rotate-12 ${
              isFlag ? 'border-flag/40 text-flag' : 'border-cyan/40 text-cyan'
            }`}
          >
            {isFlag ? '⚑' : '</>'}
          </span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-ink-mut">{p.blurb}</p>

        <div
          className={`mt-4 inline-flex items-center gap-2 rounded-md border px-2.5 py-1 font-mono text-[11px] ${
            isFlag ? 'border-flag/30 bg-flag/5 text-flag' : 'border-cyan/30 bg-cyan/5 text-cyan'
          }`}
        >
          <span>★</span> {p.highlight}
        </div>

        <div className="mt-5 flex flex-wrap gap-2 border-t border-base-700/60 pt-4">
          {p.tech.map((t) => (
            <span key={t} className="font-mono text-[11px] text-ink-faint">
              #{t.toLowerCase().replace(/\s+/g, '-')}
            </span>
          ))}
        </div>
      </motion.article>
    </Reveal>
  )
}

export default function Projects() {
  return (
    <Section id="projects" index="02" command="ls ~/projects --sort=impact" title="Things I've shipped">
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} p={p} i={i} />
        ))}
      </div>
    </Section>
  )
}

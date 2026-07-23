import Section from './Section'
import { Reveal } from './primitives'
import { experience, education } from '../data'

export default function Experience() {
  return (
    <Section id="experience" index="01" command="cat ./experience.log" title="Where I've been building" subtitle="Experience">
      <div className="relative">
        {/* timeline spine */}
        <div className="absolute left-[7px] top-2 bottom-2 hidden w-px bg-gradient-to-b from-cyan/50 via-base-600 to-transparent sm:block" />
        <div className="space-y-6">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.08}>
              <div className="relative sm:pl-10">
                <span className="absolute left-0 top-6 hidden h-4 w-4 items-center justify-center rounded-full border border-cyan/50 bg-base-950 sm:flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-glow" />
                </span>
                <article className="card p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-xl font-semibold text-ink">
                      {job.role} <span className="text-cyan">@ {job.company}</span>
                    </h3>
                    <span className="font-mono text-sm text-ink-faint">{job.period}</span>
                  </div>
                  <p className="mt-0.5 font-mono text-sm text-ink-faint">{job.location}</p>
                  <ul className="mt-4 space-y-2.5">
                    {job.points.map((p, j) => (
                      <li key={j} className="flex gap-3 text-base leading-relaxed text-ink-mut">
                        <span className="mt-2.5 h-1 w-1 flex-none rounded-full bg-cyan/70" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.tags.map((t) => (
                      <span key={t} className="rounded-md border border-base-700 bg-base-900/60 px-2 py-1 font-mono text-xs text-ink-mut">
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* education */}
      <Reveal delay={0.1}>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:pl-10">
          {education.map((e) => (
            <div key={e.school} className="card p-5">
              <p className="mono-label mb-2">edu</p>
              <h4 className="text-base font-semibold text-ink">{e.degree}</h4>
              <p className="mt-1 text-base text-ink-mut">{e.school}</p>
              <p className="mt-1 font-mono text-sm text-ink-faint">{e.period}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}

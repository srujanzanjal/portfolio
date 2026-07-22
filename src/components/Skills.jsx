import Section from './Section'
import { Reveal } from './primitives'
import { skills, profile } from '../data'

export default function Skills() {
  return (
    <Section id="skills" index="04" command="cat ./stack.txt" title="The stack">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <div className="term scanline h-full">
            <div className="term-bar">
              <div className="flex gap-2">
                <span className="dot bg-[#ff5f57]" />
                <span className="dot bg-[#febc2e]" />
                <span className="dot bg-[#28c840]" />
              </div>
              <span className="ml-2 font-mono text-xs text-ink-faint">~/about.md</span>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed text-ink-mut">
              <p><span className="text-flag"># </span><span className="text-ink">whoami</span></p>
              <p className="mt-3">{profile.summary}</p>
              <p className="mt-4 text-cyan">$ echo $PHILOSOPHY</p>
              <p className="mt-1">
                “cybersecurity is about understanding the attacker's mindset and building secure-by-design systems.”
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid gap-4 sm:grid-cols-2">
            {skills.map((s) => (
              <div key={s.group} className="card p-5">
                <p className="mono-label mb-3">{s.group}</p>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((it) => (
                    <span
                      key={it}
                      className="rounded-md border border-base-700 bg-base-900/60 px-2.5 py-1 text-xs text-ink transition hover:border-cyan/40 hover:text-cyan"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

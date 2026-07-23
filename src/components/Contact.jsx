import Section from './Section'
import { Reveal } from './primitives'
import { profile } from '../data'

export default function Contact() {
  return (
    <Section id="contact" index="05" command="connect --with srujan" title="Let's build something" subtitle="Contact">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
        <Reveal>
          <div>
            <p className="max-w-md text-lg leading-relaxed text-ink-mut">
              Open to security, AI and full-stack opportunities — or just geeking out about the latest
              exploits. Drop a line and I'll get back fast.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="group mt-8 inline-flex items-center gap-3 rounded-lg bg-cyan px-6 py-4 font-mono text-sm font-medium text-base-950 shadow-glow transition hover:bg-cyan-glow"
            >
              <span>./send-message</span>
              <span className="transition group-hover:translate-x-1">→</span>
            </a>
            <p className="mt-6 font-mono text-base text-ink-mut">
              <span className="text-flag">$</span> {profile.email}
            </p>
            <p className="mt-1 font-mono text-base text-ink-faint">{profile.location}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid gap-3">
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('mailto') ? '_self' : '_blank'}
                rel="noreferrer"
                className="card group flex items-center justify-between p-4"
              >
                <span className="flex items-center gap-3">
                  <span className="font-mono text-cyan transition group-hover:text-flag">↗</span>
                  <span className="text-base text-ink">{s.label}</span>
                </span>
                <span className="font-mono text-sm text-ink-faint transition group-hover:text-ink-mut">
                  {s.handle}
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      <footer className="mt-24 flex flex-col items-center justify-between gap-4 border-t border-base-700/60 pt-8 font-mono text-xs text-ink-faint sm:flex-row">
        <span>© {profile.name} — built with React, deployed with intent.</span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-flag animate-pulse" />
          all systems operational
        </span>
      </footer>
    </Section>
  )
}

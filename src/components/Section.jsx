import { Reveal } from './primitives'

/** Section wrapper with a consistent terminal-style heading. */
export default function Section({ id, index, command, title, subtitle, children }) {
  return (
    <section id={id} className="relative scroll-mt-20 py-24 sm:py-28">
      <div className="container-x">
        <Reveal>
          <div className="mb-12">
            <div className="flex items-center gap-3 font-mono text-xs text-ink-faint">
              <span className="text-cyan">{index}</span>
              <span className="h-px flex-none w-8 bg-base-600" />
              <span className="text-cyan/80">{command}</span>
            </div>
            <h2 className="mt-3 font-sans text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              {title}
              {subtitle && (
                <span className="ml-3 align-middle font-mono text-lg font-normal text-ink-mut sm:text-xl">
                  ({subtitle})
                </span>
              )}
            </h2>
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  )
}

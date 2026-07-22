import { useEffect, useState } from 'react'

const LINKS = [
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
  { id: 'flags', label: 'flags' },
  { id: 'skills', label: 'stack' },
  { id: 'contact', label: 'contact' },
]

export default function Nav({ onOpenPalette }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ;['home', ...LINKS.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-base-700/70 bg-base-950/70 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between">
        <a href="#home" className="group flex items-center gap-2 font-mono text-sm font-medium">
          <span className="text-cyan">›</span>
          <span className="text-ink">srujan</span>
          <span className="text-ink-faint transition group-hover:text-flag">.dev</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`rounded-md px-3 py-2 font-mono text-sm transition ${
                active === l.id ? 'text-cyan' : 'text-ink-mut hover:text-ink'
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          onClick={onOpenPalette}
          className="inline-flex items-center gap-2 rounded-lg border border-base-700 bg-base-850/60 px-3 py-1.5 font-mono text-xs text-ink-mut backdrop-blur transition hover:border-cyan/50 hover:text-ink"
        >
          <span className="hidden sm:inline">search</span>
          <kbd className="rounded border border-base-600 px-1.5 py-0.5 text-[10px]">⌘K</kbd>
        </button>
      </nav>
    </header>
  )
}

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../data'

const COMMANDS = [
  { id: 'home', label: 'Go to top', hint: 'whoami', type: 'nav' },
  { id: 'experience', label: 'Experience', hint: 'cat ./experience', type: 'nav' },
  { id: 'projects', label: 'Projects', hint: 'ls ~/projects', type: 'nav' },
  { id: 'flags', label: 'CTF flags & wins', hint: 'flags --captured', type: 'nav' },
  { id: 'skills', label: 'Skills & stack', hint: 'cat ./stack', type: 'nav' },
  { id: 'contact', label: 'Contact', hint: 'connect --with srujan', type: 'nav' },
  { id: 'gh', label: 'Open GitHub', hint: 'github.com/srujanzanjal', type: 'ext', href: 'https://github.com/srujanzanjal' },
  { id: 'li', label: 'Open LinkedIn', hint: 'in/srujan-zanjal', type: 'ext', href: profile.socials[1].href },
  { id: 'mail', label: 'Send email', hint: profile.email, type: 'ext', href: `mailto:${profile.email}` },
]

export default function CommandPalette({ open, setOpen }) {
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)

  const results = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return COMMANDS
    return COMMANDS.filter((c) => (c.label + ' ' + c.hint).toLowerCase().includes(s))
  }, [q])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setOpen])

  useEffect(() => {
    if (open) {
      setQ('')
      setActive(0)
      setTimeout(() => inputRef.current?.focus(), 40)
    }
  }, [open])

  useEffect(() => setActive(0), [q])

  function run(cmd) {
    if (!cmd) return
    setOpen(false)
    if (cmd.type === 'ext') {
      window.open(cmd.href, cmd.href.startsWith('mailto') ? '_self' : '_blank')
    } else {
      document.getElementById(cmd.id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  function onKeyDown(e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)) }
    if (e.key === 'Enter') { e.preventDefault(); run(results[active]) }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[18vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-base-950/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="term relative z-10 w-full max-w-lg"
          >
            <div className="flex items-center gap-3 border-b border-base-700 px-4">
              <span className="font-mono text-cyan">›</span>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Type a command or search…"
                className="w-full bg-transparent py-4 font-mono text-sm text-ink outline-none placeholder:text-ink-faint"
              />
              <kbd className="rounded border border-base-600 px-1.5 py-0.5 font-mono text-[10px] text-ink-faint">esc</kbd>
            </div>
            <div className="max-h-[46vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <div className="px-3 py-6 text-center font-mono text-sm text-ink-faint">no matches — try “projects”, “ctf”, “email”…</div>
              )}
              {results.map((c, i) => (
                <button
                  key={c.id}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => run(c)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition ${
                    i === active ? 'bg-cyan/10 ring-1 ring-cyan/30' : 'hover:bg-base-800/60'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`font-mono text-xs ${c.type === 'ext' ? 'text-flag' : 'text-cyan'}`}>
                      {c.type === 'ext' ? '↗' : '#'}
                    </span>
                    <span className="text-sm text-ink">{c.label}</span>
                  </span>
                  <span className="font-mono text-xs text-ink-faint">{c.hint}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINES = [
  { t: '> initializing secure shell…', d: 250 },
  { t: '> whoami', d: 500 },
  { t: '  srujan_zanjal', d: 300, accent: true },
  { t: '> loading modules: [offense] [ai] [full-stack]', d: 450 },
  { t: '> flags captured … 11  ✓', d: 350, flag: true },
  { t: '> access granted. welcome.', d: 400, accent: true },
]

export default function BootIntro({ onDone }) {
  const [shown, setShown] = useState(0)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    // Respect reduced motion + let returning visitors skip instantly.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || sessionStorage.getItem('booted')) {
      finish()
      return
    }
    let idx = 0
    let timer
    const tick = () => {
      idx += 1
      setShown(idx)
      if (idx <= LINES.length) {
        timer = setTimeout(tick, LINES[idx - 1]?.d ?? 300)
      } else {
        setTimeout(finish, 550)
      }
    }
    timer = setTimeout(tick, 350)
    const onKey = (e) => e.key === 'Escape' && finish()
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function finish() {
    sessionStorage.setItem('booted', '1')
    setGone(true)
    setTimeout(onDone, 650)
  }

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-base-950"
          exit={{ opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-fx" aria-hidden>
            <div className="bg-grid" />
            <div className="bg-glow" />
          </div>
          <div className="term scanline relative z-10 w-[min(92vw,560px)]">
            <div className="term-bar">
              <div className="flex gap-2">
                <span className="dot bg-[#ff5f57]" />
                <span className="dot bg-[#febc2e]" />
                <span className="dot bg-[#28c840]" />
              </div>
              <span className="ml-2 font-mono text-xs text-ink-faint">srujan@portfolio — /bin/zsh</span>
            </div>
            <div className="p-5 font-mono text-sm leading-relaxed sm:text-[15px]">
              {LINES.slice(0, shown).map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={
                    l.accent ? 'text-cyan glow-text' : l.flag ? 'text-flag glow-flag-text' : 'text-ink-mut'
                  }
                >
                  {l.t}
                </motion.div>
              ))}
              <span className="inline-block h-4 w-2 translate-y-[2px] bg-cyan animate-blink" />
            </div>
          </div>
          <button
            onClick={finish}
            className="absolute bottom-8 right-8 font-mono text-xs text-ink-faint transition hover:text-cyan"
          >
            skip [esc]
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'

/** Fade + rise on scroll into view. */
export function Reveal({ children, delay = 0, className = '', y = 18 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Count from 0 -> value when scrolled into view. */
export function CountUp({ value, suffix = '', className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])
  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}

/** Typewriter that types a sequence of strings. */
export function Typewriter({ text, speed = 42, className = '', onDone }) {
  const [out, setOut] = useState('')
  useEffect(() => {
    let i = 0
    setOut('')
    const id = setInterval(() => {
      i += 1
      setOut(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(id)
        onDone && onDone()
      }
    }, speed)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])
  return <span className={className}>{out}</span>
}

/** Blinking terminal cursor. */
export function Cursor({ className = '' }) {
  return <span className={`inline-block w-[0.55ch] bg-cyan animate-blink ${className}`}>&nbsp;</span>
}

/** macOS-style window traffic-light dots. */
export function TrafficDots() {
  return (
    <div className="flex gap-2">
      <span className="dot bg-[#ff5f57]" />
      <span className="dot bg-[#febc2e]" />
      <span className="dot bg-[#28c840]" />
    </div>
  )
}

import { useEffect, useRef } from 'react'

/**
 * "Eyes follow the pointer" card — a grid of real photos (looking in
 * different directions) stitched into one sprite sheet, with the visible
 * frame swept continuously via CSS background-position based on cursor
 * position relative to the card. Same technique as gregives.co.uk: no
 * 3D/AI involved, just a grid of real photos + a background-position slide.
 *
 * Sprite sheet must be a COLS x ROWS grid where every cell has the exact
 * same aspect ratio as `aspectClass` below (default 3:4 portrait), laid out
 * left-to-right, top-to-bottom, e.g. for 3x3:
 *   [up-left]   [up]     [up-right]
 *   [left]      [center] [right]
 *   [down-left] [down]   [down-right]
 */
const COLS = 3
const ROWS = 3
const SPRITE_SRC = '/face-sprite.jpg'

export default function GazeCard({ className = '' }) {
  const cardRef = useRef(null)
  const bgRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    const bg = bgRef.current
    if (!card || !bg) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // current + target as normalized [0,1] position within the grid
    const target = { x: 0.5, y: 0.5 }
    const current = { x: 0.5, y: 0.5 }
    let raf = 0

    function apply(x, y) {
      bg.style.backgroundPosition = `${x * 100}% ${y * 100}%`
    }

    if (reduce) {
      apply(0.5, 0.5)
      return
    }

    function onMove(e) {
      const rect = card.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      // Scaled to the card's own size (not viewport size) so the full gaze
      // range is reachable regardless of where the card sits on the page —
      // otherwise a card near a screen edge could never reach one extreme.
      const maxDist = Math.max(rect.width, rect.height) * 1.1

      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const nx = Math.max(-1, Math.min(1, dx / maxDist))
      const ny = Math.max(-1, Math.min(1, dy / maxDist))

      target.x = (nx + 1) / 2
      target.y = (ny + 1) / 2
    }

    function tick() {
      current.x += (target.x - current.x) * 0.12
      current.y += (target.y - current.y) * 0.12
      apply(current.x, current.y)
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={cardRef} className={`term overflow-hidden ${className}`}>
      <div className="term-bar">
        <div className="flex gap-2">
          <span className="dot bg-[#ff5f57]" />
          <span className="dot bg-[#febc2e]" />
          <span className="dot bg-[#28c840]" />
        </div>
        <span className="ml-2 min-w-0 truncate font-mono text-sm text-ink-faint">~/looking_at_you.png</span>
      </div>
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 h-full w-full"
          style={{
            backgroundImage: `url(${SPRITE_SRC})`,
            backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
            backgroundPosition: '50% 50%',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </div>
    </div>
  )
}

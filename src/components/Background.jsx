import { useEffect, useState } from 'react'

/** Fixed ambient background: grid, glow, noise + a pointer-tracked spotlight. */
export default function Background() {
  const [pos, setPos] = useState({ x: 50, y: 20 })
  useEffect(() => {
    const onMove = (e) => {
      setPos({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 })
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
  return (
    <div className="bg-fx" aria-hidden="true">
      <div className="bg-grid" />
      <div className="bg-glow" />
      <div
        className="absolute inset-0 transition-[background] duration-300"
        style={{
          background: `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, rgba(34,211,238,0.06), transparent 45%)`,
        }}
      />
      <div className="bg-noise" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-base-950 to-transparent" />
    </div>
  )
}

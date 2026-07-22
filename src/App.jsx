import { useState } from 'react'
import Background from './components/Background'
import BootIntro from './components/BootIntro'
import Nav from './components/Nav'
import CommandPalette from './components/CommandPalette'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Flags from './components/Flags'
import Skills from './components/Skills'
import Contact from './components/Contact'

export default function App() {
  const [booted, setBooted] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)

  return (
    <>
      <BootIntro onDone={() => setBooted(true)} />
      <Background />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />

      <div
        className={`relative z-10 transition-opacity duration-700 ${booted ? 'opacity-100' : 'opacity-0'}`}
      >
        <Nav onOpenPalette={() => setPaletteOpen(true)} />
        <main>
          <Hero onOpenPalette={() => setPaletteOpen(true)} />
          <Experience />
          <Projects />
          <Flags />
          <Skills />
          <Contact />
        </main>
      </div>
    </>
  )
}

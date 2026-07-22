# Srujan Zanjal — Portfolio

A dark, terminal-inspired portfolio for a CTF champion + full-stack/AI engineer.
Built with **React + Vite + Tailwind + Framer Motion**.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Editing content

**All content lives in one place:** [`src/data.js`](src/data.js).
Edit that file to change your bio, stats, experience, projects, CTF wins,
skills, education, and social links — no need to touch components.

## Structure

```
src/
  data.js                 ← EDIT THIS for all content
  App.jsx                 ← page composition
  index.css               ← design tokens & global styles
  components/
    BootIntro.jsx          boot/decrypt intro (skippable, once per session)
    Background.jsx         ambient grid + glow + pointer spotlight
    Nav.jsx                sticky nav + scroll-spy
    CommandPalette.jsx     ⌘K / Ctrl+K quick navigation
    Hero.jsx               whoami hero + stat HUD
    Experience.jsx         timeline + education
    Projects.jsx           project cards
    Flags.jsx              CTF/hackathon trophy wall (filterable)
    Skills.jsx             about + stack
    Contact.jsx            contact + footer
    primitives.jsx         Reveal, CountUp, Typewriter, Cursor
```

## Theme

Near-black base, **cyan** primary accent, **matrix-green** reserved for
"win/flag captured" states. Colors are defined in
[`tailwind.config.js`](tailwind.config.js).

## Deploy

Any static host works. `npm run build` then deploy `dist/`
(Vercel, Netlify, GitHub Pages, Cloudflare Pages).

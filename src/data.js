// ─────────────────────────────────────────────────────────────
//  All portfolio content lives here. Edit this file to update the site.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Srujan Zanjal',
  handle: 'srujanzanjal',
  role: 'Full-stack / AI Engineer · Ethical Hacker',
  tagline: 'I break systems — ethically — and build ones that ship.',
  location: 'Nagpur, Maharashtra, India',
  email: 'zanjalsrujan94@gmail.com',
  phone: '+91-9175243234',
  summary:
    "Final year CSE student who lives at the intersection of offense and creation: winning national CTFs by breaking things, then building production-grade AI and full-stack systems that solve real problems. Currently building an enterprise ESG SaaS platform with a RAG-based AI Copilot at Infocepts.",
  socials: [
    { label: 'GitHub', handle: 'github.com/srujanzanjal', href: 'https://github.com/srujanzanjal' },
    { label: 'LinkedIn', handle: 'in/srujan-zanjal', href: 'https://www.linkedin.com/in/srujan-zanjal-42868b1b2/' },
    { label: 'Email', handle: 'zanjalsrujan94@gmail.com', href: 'mailto:zanjalsrujan94@gmail.com' },
  ],
}

export const stats = [
  { value: 18, suffix: '×', label: 'Podium finishes' },
  { value: 10, suffix: '×', label: 'First-place wins' },
  { value: 150, suffix: '+', label: 'Students led @ ACM' },
  { value: 30, suffix: '+', label: 'PostgreSQL tables shipped' },
]

export const experience = [
  {
    company: 'Infocepts',
    role: 'Project Intern',
    period: 'Jun 2026 — Present',
    location: 'Nagpur, India',
    points: [
      'Owned the core Reporting & Approval modules of Carbon Concept, an enterprise-grade ESG management SaaS — full report CRUD, a 3-stage approval workflow, version control, and automated PDF export aligned with GRI & CDP frameworks.',
      'Built an AI Copilot on a Retrieval-Augmented Generation pipeline (GPT-4o + text-embedding-3-small) grounded in ingested ESG compliance docs (GRI 302, GRI 305, BRSR).',
      'Built an AI-powered recommendations engine and led cross-module integration across a 30+ table PostgreSQL schema spanning the platform’s 6 modules.',
    ],
    tags: ['RAG', 'GPT-4o', 'FastAPI', 'PostgreSQL', 'React'],
  },
  {
    company: 'ACM SVPCET Student Chapter',
    role: 'Technical Head',
    period: 'Sep 2025 — Present',
    location: 'Nagpur, India',
    points: [
      'Drive the chapter’s technical vision — leading workshops on System Programming, Git, AI/ML and Cybersecurity.',
      'Organized hackathons, CTF competitions and coding events impacting 150+ students.',
    ],
    tags: ['Leadership', 'Cybersecurity', 'Community'],
  },
]

export const projects = [
  {
    name: 'SiteSage',
    kind: 'RAG Assistant & AI Answer Verification',
    date: 'Jan 2025',
    blurb:
      'A retrieval-augmented generation pipeline that grounds AI answers in verified, website-specific sources — with hallucination detection, trust scoring, automated citation validation and an answer-correction workflow.',
    tech: ['Python', 'FastAPI', 'NLP', 'RAG'],
    highlight: 'Hallucination detection + trust scoring',
    accent: 'cyan',
  },
  {
    name: 'CoExist Tadoba',
    kind: 'AI + IoT Wildlife Monitoring',
    date: 'Nov 2024',
    blurb:
      'An AI-powered wildlife monitoring system using IoT sensors to detect animal movement and raise real-time alerts — with SOS alerts and conflict-hotspot mapping to help villagers and forest officials reduce human–wildlife conflict.',
    tech: ['IoT', 'AI', 'Flask', 'React'],
    highlight: '🏆 1st — TATR Wildlife Hackathon',
    accent: 'flag',
  },
  {
    name: 'AI Attendance System',
    kind: 'Facial Recognition',
    date: 'Jun 2024',
    blurb:
      'A facial-recognition attendance system hitting 95%+ accuracy from group images, with a lightweight web dashboard for real-time monitoring and date-wise CSV export.',
    tech: ['Python', 'OpenCV', 'Flask'],
    highlight: '95%+ accuracy from group photos',
    accent: 'cyan',
  },
  {
    name: 'Bad USB (Rubber Ducky)',
    kind: 'Hardware Security / HID Attack',
    date: 'Apr 2024',
    blurb:
      'A HID-based Bad USB device on a Raspberry Pi Pico demonstrating automated payload execution in controlled lab environments — with custom DuckyScript payloads for ethical security testing and awareness.',
    tech: ['Raspberry Pi Pico', 'DuckyScript', 'Security'],
    highlight: 'Ethical red-team hardware',
    accent: 'flag',
  },
]

// The signature section — every entry verified against an actual certificate.
// Sorted by prestige (1st → 2nd → 3rd). `cert` = source file (for the proof gallery).
export const flags = [
  // ── First place ──
  { title: 'AXIS’26 × SHELL CTF', place: '1st', where: 'VNIT, Nagpur — National', cat: 'CTF', date: 'Apr 2026', note: 'Clutch OSINT solve with 6 minutes left.', cert: 'AXIS26_VNIT_first.jpg' },
  { title: 'COLOSSEUM 14.0 CTF', place: '1st', where: 'RCOEM, Nagpur — National', cat: 'CTF', date: 'Apr 2024', cert: 'RCOEM_colosseum_first.jpg' },
  { title: 'Sudhee 2025 CTF', place: '1st', where: 'CBIT, Hyderabad — National', cat: 'CTF', date: 'Mar 2025', cert: 'CBIT_hyderabad_first.jpg' },
  { title: 'Upsurge 2K25 CTF', place: '1st', where: 'YCCE, Nagpur', cat: 'CTF', date: '2025', cert: 'YCCE_upsurge_first.jpg' },
  { title: 'HACKTRICKS — Technosav’24', place: '1st', where: 'SVPCET, Nagpur', cat: 'CTF', date: 'Oct 2024', cert: 'hacktricks_first.jpg' },
  { title: 'Arbitox Online CTF', place: '1st', where: 'Cynux Era × Arbito', cat: 'CTF', date: 'Dec 2025', cert: 'arbitox_first.jpg' },
  { title: 'CoDecode — Techfest', place: '1st', where: 'IIT Bombay (Nagpur Zonal)', cat: 'CP', date: 'Dec 2024', cert: 'codecode_first.jpg' },
  { title: 'Avishkar 2025', place: '1st', where: 'GH Raisoni University', cat: 'CP', date: 'Mar 2025', note: 'Incl. a blind-coding round.', cert: 'raisoni_first.jpg' },
  { title: 'TATR × BIT Hackathon', place: '1st', where: 'Tadoba Tiger Reserve × BIT', cat: 'Hackathon', date: '2024', note: 'Wildlife-conservation tech.', cert: 'tadoba_first.jpg' },
  { title: 'CYGNUS 2025 Hackathon', place: '1st', where: 'IEEE CS, GHRCE', cat: 'Hackathon', date: 'Sep 2025', cert: 'cygnus_first.jpg' },
  // ── Second place ──
  { title: 'Technex Hackathon', place: '2nd', where: 'SVPCET, Nagpur', cat: 'Hackathon', date: 'Dec 2025', note: 'Built SiteSage under sleep deprivation.', cert: 'svpcet_second.jpg' },
  { title: 'TechSprint Hackathon', place: '2nd', where: 'GDG On-Campus, RBU', cat: 'Hackathon', date: 'Jan 2026', cert: 'RBU_techsprint_second.jpg' },
  { title: 'Krutiverse — TECH-KRUTI 2K25', place: '2nd', where: 'TGPCET — Ciphertext hunt', cat: 'CTF', date: 'Mar 2025', cert: 'TGPCET_krutiverse_second.jpg' },
  // ── Third place ──
  { title: 'EncipherX 3.0', place: '3rd', where: 'SVPCET (Technex)', cat: 'CTF', date: 'Jan 2025', cert: 'encipherX_third.jpg' },
  { title: 'Pentest Showdown', place: '3rd', where: 'GLA University, Mathura', cat: 'CTF', date: 'Feb 2025', cert: 'GLA_mathura_third.jpg' },
  { title: 'The Hackers Meetup CTF', place: '3rd', where: 'THM Nagpur × Comexpo', cat: 'CTF', date: 'Jun 2024', cert: 'THM_third.jpg' },
  { title: 'Compufest 2K25 — Versus Coding', place: '3rd', where: 'YCCE, Nagpur', cat: 'CP', date: 'Aug 2025', cert: 'compufest_third.jpg' },
  { title: 'Techtantra 2K25', place: '3rd', where: 'TGPCET — National', cat: 'Hackathon', date: 'Mar 2025', cert: 'TGPCET_techtantra_third.jpg' },
]

export const skills = [
  { group: 'Languages', items: ['Python', 'C', 'C++', 'JavaScript'] },
  { group: 'Backend & Web', items: ['FastAPI', 'Flask', 'React', 'PostgreSQL'] },
  { group: 'Cybersecurity', items: ['Penetration Testing', 'Kali Linux', 'Cryptography', 'Digital Forensics', 'OSINT'] },
  { group: 'AI / ML', items: ['RAG', 'OpenAI GPT-4o', 'OpenCV', 'NLP', 'Embeddings'] },
  { group: 'Hardware & IoT', items: ['Raspberry Pi', 'Arduino', 'IoT Sensors', 'HID / DuckyScript'] },
  { group: 'Tooling', items: ['Git', 'GitHub', 'Linux', 'VS Code'] },
]

export const education = [
  {
    school: 'St. Vincent Pallotti College of Engineering & Technology',
    degree: 'B.Tech, Computer Science Engineering',
    period: '2023 — 2027 (expected)',
  },
  {
    school: 'Major Hemant Jakate Jr. College',
    degree: 'Higher Secondary (Science, XII)',
    period: '2021 — 2023',
  },
]

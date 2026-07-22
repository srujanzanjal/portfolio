/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          950: '#050607',
          900: '#0a0c0f',
          850: '#0e1116',
          800: '#12161c',
          700: '#1a1f27',
          600: '#242b35',
        },
        cyan: {
          DEFAULT: '#22d3ee',
          glow: '#38e5ff',
          dim: '#0e7490',
        },
        flag: {
          DEFAULT: '#00ff9c',
          dim: '#0f6b4a',
        },
        ink: {
          DEFAULT: '#e6edf3',
          mut: '#8b98a6',
          faint: '#5a6673',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        sans: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(34,211,238,.25), 0 0 24px -4px rgba(34,211,238,.35)',
        'glow-flag': '0 0 0 1px rgba(0,255,156,.25), 0 0 24px -4px rgba(0,255,156,.35)',
      },
      keyframes: {
        blink: { '0%,49%': { opacity: 1 }, '50%,100%': { opacity: 0 } },
        'scan': { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(100%)' } },
        'fade-up': { '0%': { opacity: 0, transform: 'translateY(12px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        'grid-pan': { '0%': { backgroundPosition: '0 0' }, '100%': { backgroundPosition: '40px 40px' } },
      },
      animation: {
        blink: 'blink 1.1s step-end infinite',
        scan: 'scan 6s linear infinite',
        'fade-up': 'fade-up .6s cubic-bezier(.2,.7,.2,1) both',
      },
    },
  },
  plugins: [],
}

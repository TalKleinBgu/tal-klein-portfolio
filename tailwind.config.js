/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './skills-compare.html', './assets/**/*.js'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        ink:           'var(--ink)',
        'ink-soft':    'var(--ink-soft)',
        'ink-faint':   'var(--ink-faint)',
        accent:        'var(--accent)',
        'accent-bright': 'var(--accent-bright)',
        card:          'var(--card)',
        'card-2':      'var(--card-2)',
        'border-token':'var(--border)',
        'border-soft': 'var(--border-soft)',
        cell:          'var(--cell-bg)',
        'cell-border': 'var(--cell-border)',
        shadow:        'var(--shadow)',
        'bg-top':      'var(--bg-top)',
        'bg-bottom':   'var(--bg-bottom)',
      },
      screens: {
        xs:    '360px',
        sm2:   '600px',
        mdc:   '700px',
        cards: '760px',
        hero:  '820px',
        nav:   '880px',
        wide:  '1100px',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

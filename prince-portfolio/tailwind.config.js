/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Eczar"', 'serif'],
        body: ['"Eczar"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        clay: '#F8F7E5',
        sand: '#F0EDD8',
        slate: '#2D2D2D',
        gray: '#555555',
        muted: '#8A8A8A',
        border: '#E3DEC8',
        gold: '#B39C4F',
        sage: '#75846A',
        steel: '#6F8E99',
        orange: '#FF834F',
        cosmic: '#FF6B35',
        wine: '#8B1A2B',
        brown: '#583328',
        dark: '#3A2417',
        lightgold: '#D4C8A0',
        footer: '#111111',
        footertext: '#F8F7E5',
      },
      maxWidth: {
        '8xl': '90rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.125rem',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
        'card': '0 4px 16px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.02)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.03)',
        'button': '0 1px 3px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}

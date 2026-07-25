# Prince · Full Stack Developer Portfolio

Personal portfolio built with **React 19** + **Vite 8** + **Tailwind CSS 3**. Features scroll-driven animations, canvas-based effects, and a warm earthy design system.

## Tech Stack

- **React 19** + **Vite 8** — fast HMR, modern JSX
- **Tailwind CSS v3** — utility-first styling
- **Framer Motion 12** — scroll animations, parallax, spring interactions
- **React Router DOM 7** — client-side routing
- **EmailJS** — contact form delivery
- **Lucide React** + **React Icons** — icon library
- **Google Fonts**: Josefin Sans (display), Eczar (body), Lato (text), JetBrains Mono (mono), Anton (numerals)

## Features

- Animated hero with rotating role titles
- Canvas-based floating tech tags (Work section)
- Canvas oscilloscope waves (CV section)
- Signal meter audio-visualizer animation
- Browser mockups with Mac/Windows toggle
- 3D tilt image effect (About section)
- Animated stat counters
- Scroll-driven mockup scaling and opacity
- Newari textile-inspired woven footer pattern
- Full project archive with category filtering
- Responsive design (mobile-first)
- Framer Motion spring physics & scroll transforms

## Design System

| Token | Hex | Usage |
|-------|-----|-------|
| Clay | `#F8F7E5` | Page background |
| Sand | `#F0EDD8` | Section background |
| Slate | `#2D2D2D` | Primary text |
| Wine | `#8B1A2B` | Accent, links, buttons |
| Gold | `#B39C4F` | Premium accent, hover states |
| Sage | `#75846A` | About section background |
| Steel | `#6F8E99` | Secondary accent, selection |
| Footer | `#111111` | Footer background |

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173`

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
prince-portfolio/
├── public/            — favicon, images, CV PDF
├── src/
│   ├── components/    — Hero, About, Work, CV, Contact, Footer, etc.
│   ├── data/          — projects data
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css      — global styles, fonts, scrollbar
├── index.html
├── tailwind.config.js
└── vite.config.js
```

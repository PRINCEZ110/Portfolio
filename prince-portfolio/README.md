# Prince · Web Developer Portfolio

Inspired by [bepatrickdavid.com](https://bepatrickdavid.com/) — dark brutalist aesthetic with your own identity.

## Tech Stack
- **React.js** + **Vite**
- **Tailwind CSS v3**
- **Framer Motion** — scroll animations, hero role cycling
- **EmailJS** — contact form
- **GSAP** — available for enhanced animations
- **JetBrains Mono / Space Grotesk / DM Sans** — Google Fonts

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173`

## Customize

### 1. Personal info
Edit `src/components/Hero.jsx`, `About.jsx`, `Contact.jsx` with your real name, bio, email, and social links.

### 2. Projects
Edit the `projects` array in `src/components/Work.jsx`.

### 3. EmailJS (contact form)
1. Sign up at [emailjs.com](https://emailjs.com)
2. Create a service + template
3. Replace in `Contact.jsx`:
   - `YOUR_SERVICE_ID`
   - `YOUR_TEMPLATE_ID`
   - `YOUR_PUBLIC_KEY`

### 4. Deploy
```bash
npm run build
# Deploy /dist to Vercel, Netlify, or GitHub Pages
```

## Folder Structure
```
prince-portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Cursor.jsx      ← custom cursor
│   │   ├── Navbar.jsx      ← sticky nav
│   │   ├── Hero.jsx        ← animated hero
│   │   ├── Marquee.jsx     ← tech ticker
│   │   ├── Work.jsx        ← projects list
│   │   ├── About.jsx       ← bio + skills grid
│   │   ├── Contact.jsx     ← EmailJS form
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

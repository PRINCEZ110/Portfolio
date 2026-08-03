import { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence, useInView } from 'framer-motion';
import { SiReact, SiJavascript, SiHtml5, SiCss, SiTailwindcss,
  SiOpenjdk, SiApache, SiMysql,
  SiFigma, SiGit, SiGithub } from 'react-icons/si';
import { Database, Palette, Monitor, Shield, Server } from 'lucide-react';

const headlineA = Array.from('FULL-STACK', (c, i) => ({ char: c, id: `la-${i}` }));
const headlineB = Array.from('EDITOR', (c, i) => ({ char: c, id: `lb-${i}` }));

const letterV = {
  hidden: { opacity: 0, y: 40, rotateX: -30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const letterV2 = {
  hidden: { opacity: 0, y: 40, rotateX: -30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { delay: 0.7 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

function ColHeading({ children }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="flex-1 h-px bg-slate/50" />
      <h4 className="font-josefin font-semibold text-[11px] md:text-xs tracking-[0.3em] uppercase text-slate">
        {children}
      </h4>
      <span className="flex-1 h-px bg-slate/50" />
    </div>
  );
}

/* ─── Animated Counter (newspaper style) ─── */
function AnimatedCounter({ value, suffix = '', label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    let frame;

    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayed(Math.floor(eased * value));
      if (t < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <div ref={ref} className="group text-center px-2 py-4">
      <span className="block font-anton text-slate leading-none tracking-tight transition-transform duration-300 group-hover:-translate-y-1" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
        {displayed}{suffix}
      </span>
      <span className="block text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-slate/60 font-mono mt-2">
        {label}
      </span>
    </div>
  );
}

/* ─── Skill icons mapping ─── */
const skillIcons = {
  'React.js': SiReact,
  'JavaScript': SiJavascript,
  'HTML5': SiHtml5,
  'CSS3': SiCss,
  'Tailwind CSS': SiTailwindcss,
  'Java': SiOpenjdk,
  'JSP': Server,
  'Servlet': SiApache,
  'JDBC': Database,
  'MySQL': SiMysql,
  'UI/UX Design': Palette,
  'Responsive Design': Monitor,
  'Figma': SiFigma,
  'Git': SiGit,
  'GitHub': SiGithub,
  'MVC Architecture': Server,
  'BCrypt': Shield,
};

const skillColors = {
  'React.js': '#61DAFB',
  'JavaScript': '#F7DF1E',
  'HTML5': '#E34F26',
  'CSS3': '#1572B6',
  'Tailwind CSS': '#06B6D4',
  'Java': '#007396',
  'JSP': '#E85C33',
  'Servlet': '#D22128',
  'JDBC': '#4479A1',
  'MySQL': '#4479A1',
  'UI/UX Design': '#FF61F6',
  'Responsive Design': '#4285F4',
  'Figma': '#F24E1E',
  'Git': '#F05032',
  'GitHub': '#181717',
  'MVC Architecture': '#6DB33F',
  'BCrypt': '#47A248',
};

const skillData = [
  { category: 'Frontend' },
  { category: 'Backend' },
  { category: 'Design' },
  { category: 'Tools' },
].map((c) => ({
  ...c,
  items: {
    Frontend: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
    Backend: ['Java', 'JSP', 'Servlet', 'JDBC', 'MySQL'],
    Design: ['UI/UX Design', 'Responsive Design', 'Figma'],
    Tools: ['Git', 'GitHub', 'MVC Architecture', 'BCrypt'],
  }[c.category],
}));

const categoryDeva = {
  Frontend: 'फ्रन्टएन्ड',
  Backend: 'ब्याकएन्ड',
  Design: 'डिजाइन',
  Tools: 'उपकरण',
};

const personalFile = [
  { k: 'Name', v: 'Prince Shrestha' },
  { k: 'Role', v: 'Full-stack Developer' },
  { k: 'Station', v: 'Kathmandu, Nepal' },
  { k: 'Dispatch', v: 'The web, worldwide' },
  { k: 'Currency', v: 'React · JS · Tailwind' },
];

const education = [
  { code: 'ALG-101', label: 'Algorithms & Data Structures' },
  { code: 'SE-201', label: 'Software Engineering' },
  { code: 'WEB-301', label: 'Web Development' },
  { code: 'DB-401', label: 'Database Systems' },
];

const seeking = [
  { name: 'React.js', tag: 'INSTOCK' },
  { name: 'TypeScript', tag: 'READY' },
  { name: 'Tailwind CSS', tag: 'FRESH' },
  { name: 'UI/UX Design', tag: 'HOT' },
];

const ticker = [
  'WANTED: FULL-STACK DEVELOPER — APPLY AT THE CONTACT SECTION',
  'FRESH STOCK: REACT COMPONENTS — उत्तम गुणस्तर',
  'BREAKING: TAILWIND CLASSES FOUND STYLING HERO SECTION',
  'MARKET REPORT: JAVASCRIPT SHARES REMAIN STRONG',
  'LOST: ONE NIGHT OF SLEEP, IN EXCHANGE FOR A SHIPPED PRODUCT',
  'NOW HIRING: ONE TEAM — REQUIRES CURIOSITY, COFFEE PROVIDED',
];

/* ─── Animated ink background ─── */
const starV = (delay) => ({
  hidden: { opacity: 0, rotate: 0, scale: 0 },
  visible: {
    opacity: 0.2,
    rotate: 360,
    scale: 1,
    transition: { duration: 5, repeat: Infinity, ease: 'linear', delay }
  }
});

const starRevV = (delay) => ({
  hidden: { opacity: 0, rotate: 0, scale: 0 },
  visible: {
    opacity: 0.2,
    rotate: -360,
    scale: 1,
    transition: { duration: 6, repeat: Infinity, ease: 'linear', delay }
  }
});

const bobV = (delay) => ({
  hidden: { opacity: 0, y: 0 },
  visible: {
    opacity: 0.2,
    y: [0, -20, 0],
    transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay }
  }
});

const scaleV = (delay) => ({
  hidden: { opacity: 0, scale: 0.2 },
  visible: {
    opacity: 0.15,
    scale: [0.2, 1.2, 0.2],
    transition: { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay }
  }
});

const stars = [
  { fs: 28, t: '6%', l: '5%', d: 0, rev: false, bp: 'md' },
  { fs: 22, t: '10%', r: '12%', d: 0.25, rev: true, bp: 'md' },
  { fs: 30, t: '22%', l: '50%', d: 0.5, rev: false, bp: 'md' },
  { fs: 18, t: '18%', r: '4%', d: 0.75, rev: true, bp: 'md' },
  { fs: 24, t: '35%', l: '8%', d: 1, rev: false, bp: 'md' },
  { fs: 26, t: '38%', r: '10%', d: 1.25, rev: true, bp: 'md' },
  { fs: 32, t: '50%', l: '3%', d: 1.5, rev: true, bp: 'lg' },
  { fs: 20, t: '52%', l: '55%', d: 1.75, rev: false, bp: 'lg' },
  { fs: 28, t: '68%', r: '6%', d: 2, rev: false, bp: 'lg' },
  { fs: 18, t: '75%', l: '12%', d: 2.25, rev: true, bp: 'lg' },
  { fs: 24, t: '88%', r: '15%', d: 2.5, rev: false, bp: 'lg' },
  { fs: 20, t: '92%', l: '45%', d: 2.75, rev: true, bp: 'lg' },
];

const bobs = [
  { s: 12, t: '5%', r: '25%', d: 0 },
  { s: 10, t: '12%', l: '3%', d: 0.2 },
  { s: 8, t: '20%', l: '40%', d: 0.5 },
  { s: 12, t: '28%', r: '20%', d: 0.75 },
  { s: 8, t: '42%', l: '15%', d: 1 },
  { s: 10, t: '48%', r: '3%', d: 1.25 },
  { s: 12, t: '58%', l: '50%', d: 1.5 },
  { s: 8, t: '65%', r: '25%', d: 1.75 },
  { s: 10, t: '78%', l: '5%', d: 2 },
  { s: 8, t: '85%', r: '35%', d: 2.25 },
  { s: 12, t: '95%', l: '20%', d: 2.5 },
];

const squares = [
  { w: 20, h: 20, rot: 45, t: '2%', l: '30%', d: 0.1, fill: false, bp: 'md' },
  { w: 16, h: 16, rot: 0, t: '15%', l: '60%', d: 0.4, fill: false, bp: 'md' },
  { w: 12, h: 12, rot: 12, t: '25%', r: '8%', d: 0.7, fill: true, bp: 'md' },
  { w: 16, h: 16, rot: 0, t: '32%', l: '45%', d: 1, fill: false, bp: 'md' },
  { w: 20, h: 20, rot: 22, t: '45%', r: '15%', d: 1.3, fill: false, bp: 'md' },
  { w: 12, h: 12, rot: 0, t: '55%', l: '5%', d: 1.6, fill: true, bp: 'md' },
  { w: 16, h: 16, rot: 35, t: '62%', r: '50%', d: 1.9, fill: false, bp: 'lg' },
  { w: 20, h: 20, rot: 0, t: '72%', r: '5%', d: 2.2, fill: false, bp: 'lg' },
  { w: 12, h: 12, rot: 15, t: '82%', l: '35%', d: 2.5, fill: true, bp: 'lg' },
  { w: 16, h: 16, rot: 0, t: '90%', l: '55%', d: 2.8, fill: false, bp: 'lg' },
];

const black = '#000000';

function DecorativeElements() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" style={{ zIndex: 1 }}>
      {stars.map((s, i) => {
        const V = s.rev ? starRevV : starV;
        const hide = s.bp === 'lg' ? 'hidden lg:block' : 'hidden md:block';
        return (
          <m.div key={`s${i}`} custom={s.d} variants={V(s.d)} initial="hidden" animate="visible"
            className={`absolute pointer-events-none ${hide}`}
            style={{ color: black, fontSize: s.fs, top: s.t, left: s.l, right: s.r, lineHeight: 1 }}>★</m.div>
        );
      })}
      {bobs.map((b, i) => (
        <m.div key={`b${i}`} custom={b.d} variants={bobV(b.d)} initial="hidden" animate="visible"
          className="absolute pointer-events-none hidden md:block"
          style={{ top: b.t, left: b.l, right: b.r }}>
          <div style={{ width: b.s, height: b.s, borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.2)' }} />
        </m.div>
      ))}
      {squares.map((sq, i) => {
        const hide = sq.bp === 'lg' ? 'hidden lg:block' : 'hidden md:block';
        return (
          <m.div key={`sq${i}`} custom={sq.d} variants={scaleV(sq.d)} initial="hidden" animate="visible"
            className={`absolute pointer-events-none ${hide}`}
            style={{ top: sq.t, left: sq.l, right: sq.r }}>
            <div style={{
              width: sq.w, height: sq.h,
              border: sq.fill ? 'none' : '1px solid rgba(0,0,0,0.2)',
              backgroundColor: sq.fill ? 'rgba(0,0,0,0.1)' : 'transparent',
              transform: `rotate(${sq.rot}deg)`,
              borderRadius: sq.fill ? 2 : 0,
            }} />
          </m.div>
        );
      })}
    </div>
  );
}

export default function About() {
  const [viewing, setViewing] = useState(false);

  return (
    <section id="about" className="px-6 md:px-12 lg:px-20 py-24 md:py-32 relative overflow-hidden bg-clay">
      <div className="max-w-9xl mx-auto">
        {/* Label */}
        <m.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="w-8 h-px bg-gold" />
          <span className="text-xs text-gold tracking-[0.15em] uppercase font-mono">About x Resume</span>
          <span className="flex-1 h-px bg-gradient-to-r from-gold/20 to-transparent" />
        </m.div>

        {/* THE PAPER */}
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="np-paper border-[3px] border-slate shadow-card-hover relative overflow-hidden"
        >
          <DecorativeElements />
          <div className="relative z-10">
          {/* Dateline strip */}
          <div className="flex items-center justify-between gap-2 px-4 md:px-6 py-2 border-b-2 border-slate font-mono text-[10px] md:text-[11px] text-slate/70 uppercase tracking-wider">
            <span>प्रिन्स पत्रिका · The Prince Patrika</span>
            <span className="hidden md:inline text-slate/50">सत्यं · सुन्दरम् · कोडम्</span>
            <span className="flex items-center gap-2">
              <span className="np-barcode hidden sm:block" />
              <span className="border border-slate/50 px-1.5">रु ५</span>
            </span>
          </div>

          {/* Masthead */}
          <div className="text-center px-4 pt-6 pb-4">
            <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-slate/60 mb-2">
              The Independent Weekly Of Code
            </p>
            <h2
              className="np-register font-bold leading-none text-slate"
              style={{ fontFamily: "'Eczar', serif", fontSize: 'clamp(2.6rem, 8vw, 5.5rem)' }}
            >
              प्रिन्स पत्रिका
            </h2>
            <p className="mt-2 font-josefin font-semibold text-sm md:text-base tracking-[0.35em] uppercase text-slate/80">
              The Prince Patrika
            </p>
            <p className="mt-1.5 font-mono text-[10px] md:text-[11px] text-wine tracking-widest uppercase">
              ✦ आइतबार · Sunday, August 03, 2026 · नेपाली ✦
            </p>
          </div>

          <div className="np-double mx-4 md:mx-6" />

          {/* Headline */}
          <div className="px-4 md:px-6 pt-5 pb-4 text-center border-b-2 border-slate/80">
            <ColHeading>व्यक्तित्व · Personality</ColHeading>
            <m.h1 initial="hidden" whileInView="visible" viewport={{ once: true }} className="leading-[0.9]">
              <span className="block" style={{ fontSize: 'clamp(2.2rem, 6.5vw, 4.8rem)' }}>
                {headlineA.map(({ char, id }, idx) => (
                  <m.span
                    key={id}
                    className="np-register inline-block font-bold text-slate"
                    style={{ fontFamily: "'Eczar', serif" }}
                    custom={idx}
                    variants={letterV}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </m.span>
                ))}
              </span>
              <span className="block" style={{ fontSize: 'clamp(2.2rem, 6.5vw, 4.8rem)' }}>
                {headlineB.map(({ char, id }, idx) => (
                  <m.span
                    key={id}
                    className="np-register inline-block font-bold text-wine"
                    style={{ fontFamily: "'Eczar', serif" }}
                    custom={idx}
                    variants={letterV2}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </m.span>
                ))}
              </span>
            </m.h1>
            <p className="mt-3 font-mono text-[10px] md:text-xs text-slate/60 uppercase tracking-widest">
              Full-Stack Developer · Open for full-stack roles · React.js · UI — नेपाली बाट प्रत्यक्ष प्रसारण
            </p>
          </div>

          {/* ═══ SECTION 1 — ABOUT ═══ */}
          <div className="grid md:grid-cols-2 lg:grid-cols-[0.95fr_1.35fr_1.05fr]">
            {/* Portrait */}
            <article className="p-5 md:p-6 md:border-r md:border-slate/25">
              <ColHeading>स्मरणीय तस्बिर · Portrait</ColHeading>

              <figure className="border border-slate/50 bg-white/40 p-2.5">
                <div className="overflow-hidden">
                  <img
                    src="/Aboutimage.jpg"
                    alt="Prince Shrestha"
                    className="w-full h-auto object-cover sepia-[0.15] contrast-[1.03]"
                    loading="lazy"
                  />
                </div>
                <figcaption className="mt-2 px-2 pt-2 pb-1 border-t border-slate/40 font-mono text-[9px] uppercase tracking-widest text-slate/60 text-center">
                  फोटो: कार्यालय अभिलेख · The living editor, नेपाली office
                </figcaption>
              </figure>

              {/* Identity card */}
              <div className="border-2 border-slate mt-4">
                <div className="bg-slate text-white px-3 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-center">
                  पहिचानपत्र · Personal File
                </div>
                <ul>
                  {personalFile.map((row) => (
                    <li key={row.k} className="flex items-center justify-between gap-3 px-3 py-2 border-b border-slate/20 last:border-b-0">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-slate/50">{row.k}</span>
                      <span className="text-[13px] font-semibold text-slate" style={{ fontFamily: "'Eczar', serif" }}>
                        {row.v}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            {/* Profile */}
            <article className="p-5 md:p-6 lg:border-r lg:border-slate/25 md:border-t md:border-slate/25 lg:border-t-0 border-t border-slate/25">
              <ColHeading>प्रोफ़ाइल · Profile</ColHeading>

              <p className="font-mono text-[10px] text-slate/50 uppercase tracking-widest mb-4">
                Report by the Patrika Desk — नेपाल, Nepal
              </p>

              <p className="np-dropcap text-[13px] text-slate/80 leading-relaxed">
                Hi, I'm Prince — a full-stack developer passionately building elegant digital experiences using
                React, Tailwind CSS, JavaScript, and modern UI design. Every story is set in clean architecture and
                printed in responsive layouts.
              </p>

              <p className="np-dropcap text-[13px] text-slate/80 leading-relaxed mt-3">
                Every project combines clean architecture, accessibility, performance, and refined visual design to
                create seamless user experiences that hold up in print or in pixels.
              </p>

              <blockquote className="mt-5 border-l-4 border-wine pl-4">
                <p className="font-josefin italic text-[13px] text-slate/80 leading-relaxed">
                  “Building premium digital experiences through thoughtful design, clean code, and meaningful interactions.”
                </p>
                <footer className="font-mono text-[9px] text-slate/40 uppercase tracking-widest mt-1">
                  — The Bureau of Taste
                </footer>
              </blockquote>

              {/* Stats */}
              <div className="border-2 border-slate mt-6">
                <div className="bg-slate text-white px-3 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-center">
                  तथ्याङ्क · By the Numbers
                </div>
                <div className="grid grid-cols-3 divide-x divide-slate/25">
                  <AnimatedCounter value={3} suffix="+" label="Projects" />
                  <AnimatedCounter value={3} suffix="+" label="Years Learning" />
                  <div className="group text-center px-2 py-4">
                    <span className="block font-anton text-slate leading-none transition-transform duration-300 group-hover:-translate-y-1" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                      ∞
                    </span>
                    <span className="block text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-slate/60 font-mono mt-1">
                      Curiosity
                    </span>
                  </div>
                </div>
              </div>
            </article>

            {/* Type case */}
            <aside className="p-5 md:p-6 md:col-span-2 lg:col-span-1 md:border-t lg:border-t-0 border-t border-slate/25 lg:border-l lg:border-slate/25">
              <ColHeading>कौशल सूची · The Type Case</ColHeading>

              <div className="border-2 border-slate">
                <div className="bg-slate text-white py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-center">
                  प्रिन्टिङ प्रेसको तयारी · Print-Ready
                </div>
                {skillData.map((cat) => (
                  <div key={cat.category}>
                    <div className="flex items-center justify-between px-3 py-1.5 bg-slate/10 border-b border-slate/20 font-mono text-[9px] uppercase tracking-[0.3em] text-slate/70">
                      <span>{cat.category}</span>
                      <span>{categoryDeva[cat.category]}</span>
                    </div>
                    <ul>
                      {cat.items.map((item) => {
                        const Icon = skillIcons[item];
                        const color = skillColors[item];
                        return (
                          <li key={item} className="flex items-center gap-2.5 px-3 py-1.5 border-b border-slate/15 last:border-b-0">
                            <span style={{ color }}>
                              <Icon className="text-sm" />
                            </span>
                            <span className="text-[12px] font-semibold text-slate" style={{ fontFamily: "'Eczar', serif" }}>
                              {item}
                            </span>
                            <span className="ml-auto font-mono text-[9px] text-slate/30 tracking-widest">✦</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>

              <a
                href="#work"
                className="group mt-4 flex items-center justify-between border-2 border-dashed border-slate bg-white/50 px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-slate hover:text-wine hover:border-wine transition-all duration-300"
              >
                <span className="text-wine">←</span>
                <span>निरन्तरता · Continued in Work — View Work</span>
                <span className="text-wine transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </aside>
          </div>

          <div className="np-double mx-4 md:mx-6" />

          {/* ═══ SECTION 2 — CV ═══ */}
          <div id="cv" className="scroll-mt-24">
            <div className="grid md:grid-cols-2 lg:grid-cols-[1fr_1.25fr_0.95fr]">
              {/* Education */}
              <article className="p-5 md:p-6 md:border-r md:border-slate/25">
                <ColHeading>शिक्षा · Education</ColHeading>

                <h3
                  className="font-bold text-slate leading-tight"
                  style={{ fontFamily: "'Eczar', serif", fontSize: 'clamp(1.15rem, 2.4vw, 1.6rem)' }}
                >
                  BSc (Hons) Computing
                </h3>
                <p className="font-josefin text-xs text-slate/60 mt-1 leading-relaxed">
                  Itahari International College × London Metropolitan University
                </p>

                <p className="flex items-center justify-between gap-3 mt-3 font-mono text-[10px] text-slate/50 uppercase tracking-widest mb-4">
                  <span>Kathmandu — 2024 · Present</span>
                  <span className="inline-block border-2 border-wine text-wine px-2 py-0.5 rotate-[-6deg]">Active</span>
                </p>

                <p className="np-dropcap text-[13px] text-slate/80 leading-relaxed">
                  Computing, like good journalism, is about turning raw inputs into something people can use. The course
                  covers algorithms and data structures, software engineering, web development, and database systems —
                  the four columns on which any shipped product stands.
                </p>

                <ul className="mt-4">
                  {education.map((item) => (
                    <li
                      key={item.code}
                      className="flex items-center justify-between gap-3 py-2 border-b border-slate/15 last:border-b-0"
                    >
                      <span className="font-josefin text-[13px] text-slate/80">{item.label}</span>
                      <span className="font-mono text-[10px] text-slate/40 tracking-wider">{item.code}</span>
                    </li>
                  ))}
                </ul>
              </article>

              {/* Career */}
              <article className="p-5 md:p-6 lg:border-r lg:border-slate/25 md:border-t md:border-slate/25 lg:border-t-0 border-t border-slate/25">
                <ColHeading>करियर · Career</ColHeading>

                <h3
                  className="np-register font-bold uppercase text-slate leading-tight"
                  style={{ fontFamily: "'Eczar', serif", fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}
                >
                  Open for Full-Stack Roles
                </h3>
                <p className="font-josefin text-xs text-slate/60 mt-1 tracking-wide uppercase">
                  Now seeking: junior to mid-level frontend / full-stack positions
                </p>

                <p className="np-dropcap text-[13px] text-slate/80 leading-relaxed mt-4">
                  The desk is open. The editor — a full-stack developer trained in Kathmandu — builds interfaces with
                  React and Node, wires them to databases, and ships them to the world. Every project in the archive
                  below was written, styled, and deployed by hand. Frontend, backend, and the design in between.
                </p>

                <div className="mt-4 border border-slate/30 bg-white/40">
                  <div className="border-b border-slate/30 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-slate/60 flex items-center justify-between">
                    <span>Available Stock</span>
                    <span>मूल्य: अनगिन्ती</span>
                  </div>
                  <ul>
                    {seeking.map((item) => (
                      <li
                        key={item.name}
                        className="flex items-center justify-between px-3 py-2 border-b border-slate/15 last:border-b-0"
                      >
                        <span className="font-semibold text-[13px] text-slate" style={{ fontFamily: "'Eczar', serif" }}>
                          {item.name}
                        </span>
                        <span className="font-mono text-[9px] text-slate/60 border border-slate/30 px-1.5 py-0.5 tracking-widest">
                          {item.tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <blockquote className="mt-4 text-center px-4">
                  <p className="font-josefin italic text-[13px] text-slate/70 leading-relaxed">
                    “Good design is invisible; great code ships.”
                  </p>
                  <footer className="font-mono text-[9px] text-slate/40 uppercase tracking-widest mt-1">
                    — The Patrika Editorial Board
                  </footer>
                </blockquote>
              </article>

              {/* CV sidebar — advert + weather */}
              <aside className="p-5 md:p-6 md:col-span-2 lg:col-span-1 md:border-t lg:border-t-0 border-t border-slate/25 lg:border-l lg:border-slate/25 gap-5 flex flex-col">
                <div className="border-2 border-dashed border-slate/60 px-4 py-3">
                  <p className="font-mono text-[9px] text-wine uppercase tracking-[0.3em] text-center">
                    ✦ विज्ञापन · Advert ✦
                  </p>
                  <h4 className="text-center font-bold uppercase text-slate mt-2" style={{ fontFamily: "'Eczar', serif", fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>
                    Fresh Stock Arrived
                  </h4>
                  <p className="text-center font-josefin text-xs text-slate/70 mt-1 leading-relaxed">
                    React.js · Tailwind CSS · REST APIs
                  </p>
                  <p className="text-center font-mono text-[10px] text-wine uppercase tracking-widest mt-2">
                    उत्तम गुणस्तर · तीव्र वितरण
                  </p>
                  <p className="text-center font-mono text-[10px] text-slate/60 uppercase tracking-widest mt-2 border-t border-slate/20 pt-2">
                    Shop at the contact section ↓
                  </p>
                </div>

                <div className="border border-slate/40 bg-white/40 px-4 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate/60">मौसम · Weather</p>
                  <div className="flex items-end justify-between mt-2">
                    <div>
                      <p className="font-bold text-slate text-2xl leading-none" style={{ fontFamily: "'Eczar', serif" }}>29°C</p>
                      <p className="font-josefin text-[11px] text-slate/70 mt-1">Itahari — धूप (Sunny)</p>
                    </div>
                    <p className="font-mono text-[10px] text-slate/50 uppercase text-right leading-relaxed">
                      Job market:<br /><span className="text-wine">Warm & hiring</span>
                    </p>
                  </div>
                  <p className="font-mono text-[9px] text-slate/40 uppercase tracking-wider mt-2 border-t border-slate/20 pt-1.5">
                    Report by the Career Weather Bureau · सूचना
                  </p>
                </div>
              </aside>
            </div>
          </div>

          {/* Classifieds ticker */}
          <div className="border-t-2 border-slate">
            <div className="overflow-hidden py-2 bg-slate/5 border-b border-slate/30">
              <div className="marquee-inner flex gap-12 whitespace-nowrap w-max" style={{ animationDuration: '30s' }}>
                {[...ticker, ...ticker].map((t, i) => (
                  <span key={i} className="font-mono text-[10px] md:text-[11px] uppercase tracking-widest text-slate/70">
                    <span className="text-wine mr-3">✦</span>{t}
                  </span>
                ))}
              </div>
            </div>
            <div className="px-4 md:px-6 py-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] md:text-[11px] text-slate/60 uppercase tracking-widest">
              <span>वर्गीकृत · Classifieds</span>
              <span className="hidden md:inline">Printed with care in Nepal</span>
              <span>Price रु ५ · Daily</span>
            </div>
          </div>
          </div>
        </m.div>

        {/* Ticket actions */}
        <div className="flex flex-wrap gap-4 mt-8">
          <button
            onClick={() => setViewing((v) => !v)}
            className="group font-mono text-[12px] uppercase tracking-widest text-slate border-2 border-dashed border-slate bg-white/60 px-6 py-3 hover:text-wine hover:border-wine transition-all duration-300"
          >
            <span className="mr-3 text-wine">✂</span>
            {viewing ? 'Close the Paper' : 'View Full Paper (PDF)'}
            <span className="ml-3 text-wine">✂</span>
          </button>
          <a
            href="/Prince Shrestha_Resume.pdf"
            download="Prince Shrestha_Resume.pdf"
            className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-widest bg-slate text-white px-6 py-3 hover:bg-wine transition-all duration-300"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Download PDF — रु ०</span>
          </a>
        </div>

        <p className="mt-4 font-mono text-[10px] text-slate/40 uppercase tracking-widest text-center">
          Editor-in-chief: Prince Shrestha · Printed daily · नेपाल
        </p>

        <AnimatePresence>
          {viewing && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden mt-8"
            >
              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="border-2 border-slate overflow-hidden bg-white shadow-card"
              >
                <div className="np-paper px-5 py-4 flex items-center justify-between border-b-2 border-slate font-mono text-xs text-slate/70 tracking-wide">
                  <span className="uppercase">Prince Shrestha_Resume.pdf</span>
                  <a href="/Prince Shrestha_Resume.pdf" target="_blank" rel="noreferrer" className="text-wine hover:text-slate transition-colors">
                    OPEN →
                  </a>
                </div>
                <iframe src="/Prince Shrestha_Resume.pdf" title="CV" className="w-full" style={{ height: '85vh' }} />
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
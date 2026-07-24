import { useRef, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { m, useScroll, useTransform, useSpring } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectFooter from './ProjectFooter';
import BrowserFrame from './BrowserFrame';
import FloatTags from './FloatTags';

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function ProjectDetail() {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);
  const ref = useRef(null);
  const [browserPref, setBrowserPref] = useState('mac');

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 25, mass: 0.5 });
  const heroScale = useTransform(smoothProgress, [0, 0.3], [1, 0.95]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0.6]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) {
    return (
          <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-['Inter'] text-4xl font-bold text-slate mb-4">Project not found</h1>
          <Link to="/" className="font-mono text-sm text-muted hover:text-steel transition-colors">← Back home</Link>
        </div>
      </div>
    );
  }

  const MockupComponent =
    project.id === 'nagarsewa' ? NagarSewaDetailMockup :
    project.id === 'timestar' ? TimeStarDetailMockup :
    SahakariNetDetailMockup;

  return (
    <div ref={ref} className="relative">
      <FloatTags />

      {/* ─── HERO ─── */}
      <m.div
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative min-h-[60vh] md:min-h-[70vh] flex items-end px-6 md:px-12 lg:px-20 py-16 md:py-20 overflow-hidden bg-clay"
      >
        <div className="absolute inset-0" style={{
          background: `linear-gradient(135deg, #F8F7E5 0%, #F0EDD8 100%)`,
        }} />
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none" style={{
          background: `radial-gradient(ellipse at 50% 20%, rgba(111,142,153,0.04), transparent 60%)`,
        }} />

        <div className="relative z-10 max-w-[1440px] w-full mx-auto">
          <m.div variants={stagger} initial="hidden" animate="visible">
            <m.div variants={fadeUp} className="flex items-center gap-4 mb-4">
              <Link to="/#work" className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase hover:text-wine transition-colors">
                ← Back to projects
              </Link>
            </m.div>

            <m.div variants={fadeUp} className="flex items-center gap-4 md:gap-6 mb-4">
              <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">{project.year}</span>
              {project.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-3">
                  <span className="w-px h-3 bg-border" />
                  <span className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase">{tag}</span>
                </span>
              ))}
            </m.div>

            <m.h1
              variants={fadeUp}
               className="font-['Inter'] font-bold text-slate leading-[1.02] mb-4"
               style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)' }}
            >
              {project.title}
            </m.h1>

            <m.p
              variants={fadeUp}
               className="font-['Inter'] text-gray text-base md:text-lg max-w-xl leading-relaxed"
            >
              {project.subtitle}
            </m.p>
          </m.div>
        </div>
      </m.div>

      {/* ─── OVERVIEW ─── */}
      <div className="px-6 md:px-12 lg:px-20 py-16 md:py-20">
        <div className="max-w-8xl mx-auto">
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid md:grid-cols-2 gap-16 md:gap-20 mb-20"
          >
            <div>
              <m.span variants={fadeUp} className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase block mb-4">
                About the Project
              </m.span>
              <m.p variants={fadeUp} className="font-['Inter'] text-gray text-sm md:text-base leading-[1.8] tracking-wide">
                {project.description}
              </m.p>
            </div>
            <m.div variants={fadeUp}>
              <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase block mb-4">
                Project Details
              </span>
              <div className="space-y-4">
                {[
                  { label: 'Role', value: project.role },
                  { label: 'Timeline', value: project.duration },
                  { label: 'Tech Stack', value: project.tech.join(', ') },
                ].map((d) => (
                  <div key={d.label} className="flex items-start gap-4 border-b border-border">
                    <span className="font-mono text-[10px] tracking-[0.1em] text-muted uppercase w-24 flex-shrink-0 py-3">{d.label}</span>
                    <span className="font-['Inter'] text-sm text-slate/70 py-3">{d.value}</span>
                  </div>
                ))}
              </div>
            </m.div>
          </m.div>

          {/* Browser toggle */}
          <m.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="font-mono text-[9px] tracking-[0.15em] text-muted/50 uppercase">View as</span>
            <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid #E3DEC8' }}>
              <button
                onClick={() => setBrowserPref('mac')}
                className={`px-3 py-1.5 font-mono text-[9px] tracking-wider uppercase transition-all duration-300 ${
                  browserPref === 'mac' ? 'text-white' : 'text-white hover:text-#8B1A2B'
                }`}
                style={{ background: browserPref === 'mac' ? '#8B1A2B' : 'black' }}
              >
                Mac
              </button>
              <button
                onClick={() => setBrowserPref('windows')}
                className={`px-3 py-1.5 font-mono text-[9px] tracking-wider uppercase transition-all duration-300 ${
                  browserPref === 'windows' ? 'text-white' : 'text-white hover:text-#8B1A2B'
                }`}
                style={{ background: browserPref === 'windows' ? '#8B1A2B' : 'black' }}
              >
                Windows
              </button>
            </div>
          </m.div>

          {/* ─── LARGE MOCKUP ─── */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <MockupComponent variant={browserPref} />
          </m.div>

          {(project.id === 'nagarsewa' || project.id === 'sahakarinet') && (
            <m.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex justify-center mt-6 mb-20"
            >
              <a
                href={project.id === 'sahakarinet' ? 'https://sahakari-net.onrender.com' : 'https://nagar-sewa.netlify.app/#home'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase px-6 py-3 rounded-xl border border-gold/30 text-wine hover:bg-gold/10 transition-all duration-300"
                style={{ fontFamily: "'Josefin Sans', sans-serif" }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                Visit Live Site
              </a>
            </m.div>
          )}

          {/* ─── HIGHLIGHTS ─── */}
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <m.span variants={fadeUp} className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase block mb-6">
              Key Features
            </m.span>
            <div className="grid md:grid-cols-2 gap-4">
              {project.highlights.map((h) => (
                <m.div
                  key={h}
                  variants={fadeUp}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white border border-black shadow-soft"
                >
                    <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-steel/15">
                    <span className="text-[8px] text-steel">✓</span>
                  </span>
                  <span className="font-['Inter'] text-sm text-slate/70">{h}</span>
                </m.div>
              ))}
            </div>
          </m.div>
        </div>
      </div>

      <ProjectFooter projectTitle={project.title} />
    </div>
  );
}

/* ─── DETAIL PAGE MOCKUPS (larger, more detailed) ─── */

function NagarSewaDetailMockup({ variant = 'mac' }) {
  const iframeRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [key, setKey] = useState(0);

  const refresh = () => {
    setKey((k) => k + 1);
    setLoaded(false);
  };

  return (
    <BrowserFrame
      url="nagar-sewa.netlify.app"
      variant={variant}
      showNav
      onRefresh={refresh}
    >
      <div className="relative w-full" style={{ height: 'clamp(280px, 50vw, 560px)', overscrollBehavior: 'contain' }}>
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a] z-10">
            <div className="text-center">
              <div className="w-6 h-6 border-2 border-gold/30 border-t-wine rounded-full animate-spin mx-auto mb-2" />
              <span className="text-[10px] font-mono text-white/30">Loading preview...</span>
            </div>
          </div>
        )}
        <iframe
          key={key}
          ref={iframeRef}
          src="https://nagar-sewa.netlify.app/#home"
          className="w-full h-full border-0"
          title="NagarSewa Live"
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </BrowserFrame>
  );
}

function TimeStarDetailMockup({ variant = 'mac' }) {
  return (
    <BrowserFrame url="timestar.com/products/chronograph-edition-2100" variant={variant}>
      <div className="flex flex-col md:flex-row" style={{ minHeight: '450px' }}>
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 relative overflow-hidden" style={{ background: '#111' }}>
            <m.img
              src="/watch.webp"
            alt="Chronograph Edition 2100"
            className="w-40 h-40 md:w-48 md:h-48 object-contain drop-shadow-2xl"
            whileHover={{ scale: 1.06, rotate: 2 }}
            transition={{ type: 'spring', stiffness: 200 }}
          />
          <div className="flex items-center gap-1 mt-5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-3.5 h-3.5 ${i < 4 ? 'text-steel/50' : 'text-white/10'}`} viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
            <span className="text-[8px] font-mono text-white/20 ml-2">24 reviews</span>
          </div>
          <div className="flex items-center gap-3 mt-3 text-[7px] font-mono text-white/20">
            <span>Stainless Steel</span>
            <span>•</span>
            <span>Water Resistant</span>
            <span>•</span>
            <span>5 Year Battery</span>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center" style={{ background: '#0d0d0d' }}>
          <div className="text-[7px] font-mono text-white/20 uppercase tracking-[0.2em] mb-1">TimeStar Collection 2024</div>
          <div className="text-xl md:text-2xl font-semibold text-white/85 leading-tight mb-1">Chronograph Edition 2100</div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg md:text-xl font-bold text-white/80">$349</span>
            <span className="text-xs font-mono text-white/30 line-through">$499</span>
            <span className="text-[8px] font-mono px-1.5 py-0.5 rounded" style={{ background: 'rgba(111,142,153,0.08)', color: 'rgba(111,142,153,0.5)' }}>-30%</span>
          </div>
          <div className="text-[9px] font-['Inter'] text-white/40 leading-relaxed mb-4 max-w-sm">
            Precision quartz movement with sapphire crystal glass, date display, and 100m water resistance. Minimalist design meets everyday durability.
          </div>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {['Black', 'Silver', 'Gold'].map((c) => (
              <div key={c} className="px-3 py-1.5 rounded-md text-[7px] font-mono" style={{
                background: c === 'Black' ? 'rgba(111,142,153,0.08)' : 'rgba(255,255,255,0.03)',
                color: c === 'Black' ? 'rgba(111,142,153,0.6)' : 'rgba(255,255,255,0.3)',
                border: c === 'Black' ? '1px solid rgba(111,142,153,0.15)' : '1px solid rgba(255,255,255,0.05)',
              }}>
                {c}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <m.div
              className="flex-1 h-10 rounded-lg flex items-center justify-center text-[9px] font-mono font-medium tracking-wider cursor-pointer"
              style={{ background: 'rgba(111,142,153,0.08)', color: 'rgba(111,142,153,0.6)' }}
              whileHover={{ background: 'rgba(111,142,153,0.14)', scale: 1.015 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 0.5 }}
            >
              Add to Cart
            </m.div>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <svg className="w-4 h-4 text-white/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-3 text-[7px] font-mono text-white/15">
            <span style={{ color: 'rgba(111,142,153,0.5)' }}>In stock</span>
            <span>•</span>
            <span>Free shipping</span>
            <span>•</span>
            <span>2 year warranty</span>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function SahakariNetDetailMockup({ variant = 'mac' }) {
  const iframeRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [key, setKey] = useState(0);

  const refresh = () => {
    setKey((k) => k + 1);
    setLoaded(false);
  };

  return (
    <BrowserFrame
      url="sahakari-net.onrender.com"
      variant={variant}
      showNav
      onRefresh={refresh}
    >
      <div className="relative w-full" style={{ height: 'clamp(280px, 50vw, 560px)', overscrollBehavior: 'contain' }}>
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a] z-10">
            <div className="text-center">
              <div className="w-6 h-6 border-2 border-gold/30 border-t-wine rounded-full animate-spin mx-auto mb-2" />
              <span className="text-[10px] font-mono text-white/30">Loading preview...</span>
            </div>
          </div>
        )}
        <iframe
          key={key}
          ref={iframeRef}
          src="https://sahakari-net.onrender.com/index.jsp"
          className="w-full h-full border-0"
          title="SahakariNet Live"
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </BrowserFrame>
  );
}

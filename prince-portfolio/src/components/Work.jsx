import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import { projects } from '../data/projects';
import BrowserFrame from './BrowserFrame';

export default function Work() {
  const sectionRef = useRef(null);
  const [browserPref, setBrowserPref] = useState('mac');
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.3, 0.8, 0.8, 0.3]);

  return (
    <section id="work" className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32 overflow-hidden bg-sand" ref={sectionRef}>
      {/* Scroll-driven background glow */}
      <motion.div
        className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ opacity: bgOpacity, background: 'radial-gradient(circle, rgba(111,142,153,0.03), transparent 70%)' }}
      />

      <div className="max-w-8xl mx-auto relative z-10">
        {/* ─── SECTION HEADER ─── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-[11px] tracking-[0.25em] text-wine uppercase block mb-5" style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Selected Projects
          </motion.span>

          <h2 className="font-bold text-slate leading-[0.95] mb-6" style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', fontFamily: "'Josefin Sans', sans-serif" }}>
            {'Work that matters.'.split(' ').map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block mr-[0.2em] perspective-1000"
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-gray text-sm md:text-base max-w-lg leading-relaxed tracking-wide" style={{ fontFamily: "'Lato', sans-serif" }}
          >
            A collection of systems, platforms, and digital experiences I've built.
          </motion.p>

          {/* Browser toggle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.55 }}
            className="flex items-center gap-3 mt-8"
          >
            <span className="text-[9px] tracking-[0.15em] text-muted/50 uppercase" style={{ fontFamily: "'Lato', sans-serif" }}>View as</span>
            <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid #E3DEC8' }}>
              <button
                onClick={() => setBrowserPref('mac')}
                className={`px-3 py-1.5 text-[9px] tracking-wider uppercase transition-all duration-300 ${
                  browserPref === 'mac' ? 'text-white' : 'text-muted hover:text-slate'
                }`}
                style={{ background: browserPref === 'mac' ? '#B39C4F' : '#FFFFFF', fontFamily: "'Lato', sans-serif" }}
              >
                Mac
              </button>
              <button
                onClick={() => setBrowserPref('windows')}
                className={`px-3 py-1.5 text-[9px] tracking-wider uppercase transition-all duration-300 ${
                  browserPref === 'windows' ? 'text-white' : 'text-muted hover:text-slate'
                }`}
                style={{ background: browserPref === 'windows' ? '#B39C4F' : '#FFFFFF', fontFamily: "'Lato', sans-serif" }}
              >
                Windows
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="h-px bg-gradient-to-r from-gold/20 via-brown/10 to-transparent origin-left mt-10"
          />
        </motion.div>

        {projects.map((p, i) =>
          p.layout === 'split' ? (
            <SplitBlock key={p.id} project={p} index={i} browserPref={browserPref} />
          ) : (
            <FeatureBlock key={p.id} project={p} index={i} browserPref={browserPref} />
          )
        )}

        {/* ─── VIEW MORE ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 md:mt-20 text-center"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-xl border border-gold/30 text-gold hover:bg-gold/10 transition-all duration-300"
            style={{ fontFamily: "'Josefin Sans', sans-serif" }}
          >
            <span>View More Projects</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FULL FEATURE ─── */
function FeatureBlock({ project, index, browserPref }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 25, mass: 0.5 });
  const progress = useTransform(smoothProgress, [0, 0.3], [0, 1]);

  const imgScale = useTransform(progress, [0, 1], [0.88, 1]);
  const imgY = useTransform(progress, [0, 1], [40, 0]);
  const imgRotate = useTransform(progress, [0, 1], [-2, 0]);

  const textX = useTransform(progress, [0, 1], [-20, 0]);
  const textBlur = useTransform(progress, [0, 0.5], [4, 0]);

  const MockupComponent = project.id === 'nagarsewa' ? NagarSewaMockup : SahakariNetMockup;
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className="mb-24 md:mb-32 last:mb-0 group"
    >
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start mb-10 md:mb-14">
        {/* Left: text */}
        <motion.div
          style={{ x: textX, filter: useTransform(textBlur, (v) => `blur(${v}px)`) }}
          className="relative"
        >
          {/* Animated accent line behind title */}
          <motion.div
            className="absolute -left-4 top-0 w-px h-0"
            style={{ backgroundColor: project.color, height: useTransform(progress, [0, 0.6], ['0%', '100%']) }}
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="flex items-center gap-4 md:gap-6 mb-4"
          >
            {[project.year, ...project.tags].map((item, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
                className="flex items-center gap-3"
              >
                {i > 0 && <span className="w-px h-3 bg-border" />}
                <span className="text-[10px] tracking-[0.2em] text-muted uppercase" style={{ fontFamily: "'Lato', sans-serif" }}>{item}</span>
              </motion.span>
            ))}
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold text-slate leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontFamily: "'Josefin Sans', sans-serif" }}
          >
            {project.title.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.025, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
            <span className="block text-gray font-light text-base md:text-xl mt-2">
              {project.subtitle}
            </span>
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-gray text-sm md:text-base leading-relaxed tracking-wide mb-6" style={{ fontFamily: "'Lato', sans-serif" }}
          >
            {project.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.45 }}
          >
            <Link
              to={`/work/${project.id}`}
                className="relative inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase px-5 py-3 rounded-xl overflow-hidden group/btn transition-all duration-300 border border-gold/30 text-gold hover:bg-gold/10"
                style={{ fontFamily: "'Josefin Sans', sans-serif" }}
              >
                <span className="relative z-10">View Project</span>
                <motion.span
                  className="relative z-10 inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >→</motion.span>
            </Link>
          </motion.div>

          {/* Scroll progress indicator */}
          <motion.div
            className="h-px w-0 mt-8 bg-gold/40"
            style={{
              width: useTransform(progress, [0, 1], ['0%', '40%']),
            }}
          />
        </motion.div>

        {/* Right: mockup */}
        <Link to={`/work/${project.id}`} className="block w-full perspective-1000 group/card">
          <motion.div
            style={{ scale: imgScale, y: imgY, rotateY: imgRotate }}
            className="w-full origin-center relative"
            whileHover={{ rotateY: 1.5, rotateX: -1.5 }}
            transition={{ type: 'spring', stiffness: 120, damping: 30, mass: 0.8 }}
          >
            {/* Glow behind mockup */}
            <motion.div
              className="absolute -inset-4 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(ellipse at center, rgba(111,142,153,0.06), transparent 70%)`,
                filter: 'blur(20px)',
              }}
            />
            <MockupComponent variant={browserPref} />
            <motion.div
              className="absolute inset-0 rounded-xl transition-colors duration-500"
              initial={{ background: 'rgba(0,0,0,0)' }}
              whileHover={{ background: 'rgba(255,255,255,0.01)' }}
            />
            <motion.div
              className="absolute bottom-4 right-4 opacity-0 group-hover/card:opacity-100 transition-all duration-400 translate-y-2 group-hover/card:translate-y-0"
            >
              <span className="text-[9px] tracking-wider text-gold bg-white/90 px-3 py-1.5 rounded-lg backdrop-blur-md border border-border shadow-soft" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
                Click to explore →
              </span>
            </motion.div>
          </motion.div>
        </Link>

        {/* Highlights */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
          <span className="text-[10px] tracking-[0.2em] text-muted uppercase block mb-4" style={{ fontFamily: "'Lato', sans-serif" }}>
            Key Highlights
        </span>
        <div className="flex flex-wrap gap-x-10 gap-y-2">
          {project.highlights.map((h, j) => (
            <motion.span
              key={j}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.5 + j * 0.06 }}
              className="flex items-center gap-2.5 text-sm text-slate/70" style={{ fontFamily: "'Lato', sans-serif" }}
            >
              <motion.span
                className="inline-block w-[3px] h-[3px] rounded-full flex-shrink-0 bg-steel/60"
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: j * 0.3 }}
              />
              {h}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
    </motion.div>
  );
}

/* ─── SPLIT 50/50 ─── */
function SplitBlock({ project, index, browserPref }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 25, mass: 0.5 });
  const progress = useTransform(smoothProgress, [0, 0.3], [0, 1]);

  const imgX = useTransform(progress, [0, 1], [-30, 0]);
  const imgOpacity = useTransform(progress, [0, 0.3], [0.5, 1]);
  const textY = useTransform(progress, [0, 1], [30, 0]);

  return (
    <motion.div
      ref={ref}
      className="mb-24 md:mb-32 last:mb-0 group"
    >
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left: mockup */}
        <Link to={`/work/${project.id}`} className="block w-full perspective-1000 group/card">
          <motion.div
            style={{ x: imgX, opacity: imgOpacity }}
            className="relative"
            whileHover={{ rotateY: -1.5, rotateX: 1.5, scale: 1.008 }}
            transition={{ type: 'spring', stiffness: 120, damping: 30, mass: 0.8 }}
          >
            <motion.div
              className="absolute -inset-4 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(ellipse at center, rgba(111,142,153,0.06), transparent 70%)`,
                filter: 'blur(20px)',
              }}
            />
            <TimeStarMockup variant={browserPref} />
            <motion.div
              className="absolute bottom-4 right-4 opacity-0 group-hover/card:opacity-100 transition-all duration-400 translate-y-2 group-hover/card:translate-y-0"
            >
              <span className="text-[9px] tracking-wider text-gold bg-white/90 px-3 py-1.5 rounded-lg backdrop-blur-md border border-border shadow-soft" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
                Click to explore →
              </span>
            </motion.div>
          </motion.div>
        </Link>

        {/* Right: text */}
        <motion.div style={{ y: textY }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="flex items-center gap-4 md:gap-6 mb-4"
          >
            {[project.year, ...project.tags].map((item, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
                className="flex items-center gap-3"
              >
                {i > 0 && <span className="w-px h-3 bg-border" />}
                <span className="text-[10px] tracking-[0.2em] text-muted uppercase" style={{ fontFamily: "'Lato', sans-serif" }}>{item}</span>
              </motion.span>
            ))}
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold text-slate leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontFamily: "'Josefin Sans', sans-serif" }}
          >
            {project.title.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.025, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
            <span className="block text-gray font-light text-base md:text-xl mt-2">{project.subtitle}</span>
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-gray text-sm md:text-base leading-relaxed tracking-wide mb-6" style={{ fontFamily: "'Lato', sans-serif" }}
          >
            {project.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.45 }}
          >
            <Link
              to={`/work/${project.id}`}
              className="relative inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] uppercase px-5 py-3 rounded-xl overflow-hidden group/btn transition-all duration-300 border border-gold/30 text-gold hover:bg-gold/10"
            >
              <span className="relative z-10">View Project</span>
              <motion.span
                className="relative z-10 inline-block"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >→</motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   BROWSER MOCKUPS
   ═══════════════════════════════════════════ */



function NagarSewaMockup({ variant = 'mac' }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const IFRAME_W = 1440;
  const IFRAME_H = 2800;
  const VISIBLE_H = 480;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setScale(el.offsetWidth / IFRAME_W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scrollY = -(IFRAME_H - VISIBLE_H / scale);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="relative perspective-1000"
    >
      {/* Animated glow behind the window */}
      <motion.div
        className="absolute -inset-8 rounded-3xl pointer-events-none"
        animate={{
          background: [
            'radial-gradient(ellipse at 30% 40%, rgba(179,156,79,0.08), transparent 60%)',
            'radial-gradient(ellipse at 70% 60%, rgba(179,156,79,0.08), transparent 60%)',
            'radial-gradient(ellipse at 30% 40%, rgba(179,156,79,0.08), transparent 60%)',
          ],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ filter: 'blur(30px)' }}
      />

      {/* Live indicator badge */}
      <motion.div
        className="absolute -top-2 -right-2 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
        style={{ background: 'rgba(179,156,79,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(179,156,79,0.15)' }}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.8 }}
      >
        <motion.span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: '#C8FF00' }}
          animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="text-[7px] tracking-wider uppercase text-gold/70" style={{ fontFamily: "'Lato', sans-serif" }}>Live</span>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.015, rotateY: 1.5, rotateX: -1.5 }}
        transition={{ type: 'spring', stiffness: 120, damping: 30, mass: 0.8 }}
        className="origin-center cursor-pointer"
      >
        <BrowserFrame url="nagar-sewa.netlify.app" variant={variant}>
          <div
            ref={containerRef}
            className="overflow-hidden relative w-full"
            style={{ height: `${VISIBLE_H}px` }}
          >
            <div style={{ transformOrigin: 'top left', transform: `scale(${scale})`, width: IFRAME_W }}>
              <motion.div
                animate={{ y: [0, scrollY, 0] }}
                transition={{
                  duration: 16,
                  ease: 'linear',
                  repeat: Infinity,
                }}
              >
                <iframe
                  src="https://nagar-sewa.netlify.app/#home"
                  width={IFRAME_W}
                  height={IFRAME_H}
                  className="border-0"
                  title="NagarSewa Live"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>
        </BrowserFrame>
      </motion.div>
    </motion.div>
  );
}

function TimeStarMockup({ variant = 'mac' }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30, rotateY: -4 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.008 }}
      className="origin-center cursor-pointer"
    >
      <BrowserFrame url="timestar.com/products/chronograph-edition" variant={variant}>
        <div className="mockup-root">
        <div className="flex" style={{ minHeight: '320px' }}>
          <div className="w-1/2 flex flex-col items-center justify-center p-5 relative overflow-hidden" style={{ background: '#111' }}>
            <motion.img
              src="/watch.png"
              alt="Chronograph Edition 2100"
              className="w-28 h-28 md:w-32 md:h-32 object-contain drop-shadow-2xl"
              whileHover={{ scale: 1.06, rotate: 2 }}
              transition={{ type: 'spring', stiffness: 200 }}
            />
            <div className="flex items-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-3 h-3 ${i < 4 ? 'text-steel/50' : 'text-white/10'}`} viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
              <span className="text-[7px] font-mono text-white/20 ml-1.5">(24 reviews)</span>
            </div>
          </div>
          <div className="w-1/2 p-4 md:p-5 flex flex-col justify-center space-y-2.5">
            <div className="text-[7px] font-mono text-white/20 uppercase tracking-[0.2em]">
              TimeStar Collection
            </div>
            <div className="text-sm md:text-base font-semibold text-white/85 leading-tight">Chronograph<br/>Edition 2100</div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white/80">$349</span>
              <span className="text-[8px] font-mono text-white/30 line-through">$499</span>
              <span className="text-[7px] font-mono text-white/40 ml-auto">Free shipping</span>
            </div>
            <div className="flex gap-2 pt-1">
              <motion.div
                className="flex-1 h-8 rounded-lg text-[8px] font-mono flex items-center justify-center font-medium tracking-wider cursor-pointer"
                style={{ background: 'rgba(111,142,153,0.08)', color: 'rgba(111,142,153,0.6)' }}
                whileHover={{ background: 'rgba(111,142,153,0.18)', scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                Add to Cart
              </motion.div>
              <motion.div
                className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.03)' }}
                whileHover={{ background: 'rgba(255,255,255,0.08)', scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-3.5 h-3.5 text-white/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </motion.div>
            </div>
            <div className="flex items-center gap-2 pt-1 text-[7px] font-mono text-white/15">
              <span style={{ color: 'rgba(111,142,153,0.5)' }}>In stock</span>
              <span>•</span>
              <span>Free returns</span>
              <span>•</span>
              <span>2 year warranty</span>
            </div>
          </div>
        </div>
        </div>
      </BrowserFrame>
    </motion.div>
  );
}

function SahakariNetMockup({ variant = 'mac' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.008 }}
      className="origin-center cursor-pointer"
    >
      <BrowserFrame url="sahakarinet.org/admin/members" variant={variant}>
        <div className="mockup-root">
        <div className="flex" style={{ minHeight: '320px' }}>
          <motion.div
            className="w-14 md:w-16 py-4 flex flex-col items-center gap-2.5"
            style={{ background: '#121212', borderRight: '1px solid rgba(255,255,255,0.03)' }}
          >
            {[
              <svg key="ov" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
              <svg key="mb" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
              <svg key="fn" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
              <svg key="doc" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
              <svg key="st" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
            ].map((icon, i) => (
              <motion.div
                key={i}
                className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer"
                style={{ color: i === 1 ? 'rgba(179,156,79,0.6)' : 'rgba(255,255,255,0.25)' }}
                whileHover={{ color: 'rgba(179,156,79,0.8)', background: 'rgba(179,156,79,0.08)' }}
                whileTap={{ scale: 0.9 }}
              >
                {icon}
              </motion.div>
            ))}
          </motion.div>
          <div className="flex-1 p-4 md:p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-[10px] font-mono text-white/70 font-semibold">Members</div>
                <div className="text-[7px] font-mono text-white/20 bg-white/5 px-2 py-0.5 rounded-md">248 total</div>
                <div className="text-[7px] font-mono text-white/30">12 new this month</div>
              </div>
              <motion.div
                className="px-3 h-7 rounded-lg flex items-center justify-center text-[7px] font-mono font-medium cursor-pointer"
                style={{ background: 'rgba(179,156,79,0.08)', color: 'rgba(179,156,79,0.5)' }}
                whileHover={{ background: 'rgba(179,156,79,0.14)', scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                + Add Member
              </motion.div>
            </div>

            <div className="grid grid-cols-3 gap-2.5 mb-4">
              {[
                { label: 'Total Deposits', value: '$42,500' },
                { label: 'Total Loans', value: '$17,500' },
                { label: 'Active Accounts', value: '236' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  className="p-2.5 rounded-xl cursor-default"
                  style={{ background: 'rgba(255,255,255,0.015)' }}
                  whileHover={{ background: 'rgba(255,255,255,0.03)', y: -1.5 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 0.5 }}
                >
                  <div className="text-[6px] font-mono text-white/25 uppercase">{s.label}</div>
                  <div className="text-xs font-semibold text-white/70 mt-0.5">{s.value}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="rounded-xl overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.03)' }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <div className="grid grid-cols-6 gap-1 px-3 py-2.5" style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                {['Name', 'ID', 'Deposit', 'Loan', 'Status', ''].map((h) => (
                  <div key={h} className="text-[7px] font-mono text-white/25 uppercase tracking-wider">{h}</div>
                ))}
              </div>
              {[
                ['Ram Sharma', 'M-1024', '$12,500', '$0', 'Active'],
                ['Sita Poudel', 'M-1025', '$8,200', '$5,000', 'Active'],
                ['Hari Gurung', 'M-1026', '$15,000', '$10,000', 'Pending'],
                ['Gita Rai', 'M-1027', '$6,800', '$2,500', 'Active'],
                ['Krishna Thapa', 'M-1028', '$9,300', '$3,000', 'Pending'],
              ].map((row, i) => (
                <motion.div
                  key={i}
                  className="grid grid-cols-6 gap-1 px-3 py-2 cursor-pointer"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.015)' }}
                  whileHover={{ background: 'rgba(255,255,255,0.03)', x: 3 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="text-[8px] font-mono text-white/55 truncate">{row[0]}</div>
                  <div className="text-[8px] font-mono text-white/25">{row[1]}</div>
                  <div className="text-[8px] font-mono text-white/45">{row[2]}</div>
                  <div className="text-[8px] font-mono text-white/45">{row[3]}</div>
                  <div>
                    <span className="inline-block text-[6px] font-mono px-1.5 py-0.5 rounded" style={{
                      background: row[4] === 'Active' ? 'rgba(179,156,79,0.08)' : 'rgba(255,255,255,0.03)',
                      color: row[4] === 'Active' ? 'rgba(179,156,79,0.6)' : 'rgba(255,255,255,0.3)',
                    }}>
                      {row[4]}
                    </span>
                  </div>
                  <div className="text-[8px] text-white/15 text-right">...</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="flex items-center justify-between mt-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.8 }}
            >
              <div className="text-[7px] font-mono text-white/15">Showing 5 of 248 members</div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, '...', 7].map((n, i) => (
                  <motion.div
                    key={i}
                    className="w-6 h-6 rounded-md flex items-center justify-center text-[7px] font-mono cursor-pointer"
                    style={{
                      background: n === 1 ? 'rgba(179,156,79,0.08)' : 'rgba(255,255,255,0.02)',
                      color: n === 1 ? 'rgba(179,156,79,0.5)' : 'rgba(255,255,255,0.25)',
                    }}
                    whileHover={{ background: 'rgba(179,156,79,0.12)', scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {n}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        </div>
      </BrowserFrame>
    </motion.div>
  );
}

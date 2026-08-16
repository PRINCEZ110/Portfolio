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
    project.id === 'haprvisual' ? HaprVisualDetailMockup :
    project.id === 'jobnepal' ? JobNepalDetailMockup :
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

          {project.live && (
            <m.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex justify-center mt-6 mb-20"
            >
              <a
                href={project.live}
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

function HaprVisualDetailMockup({ variant = 'mac' }) {
  return (
    <BrowserFrame
      url="haprvisual.vercel.app"
      variant={variant}
      showNav
    >
      <div className="relative w-full aspect-[8/5] overflow-hidden">
        <video
          src="/HaprVisual.mp4"
          className="w-full h-full object-contain"
          autoPlay
          muted
          loop
          playsInline
          title="HAPR Visual"
        />
      </div>
    </BrowserFrame>
  );
}

function JobNepalDetailMockup({ variant = 'mac' }) {
  return (
    <BrowserFrame url="job-nepal-gamma.vercel.app" variant={variant} showNav>
      <div className="relative w-full aspect-[8/5] overflow-hidden">
        <video
          src="/JobNepal.mp4"
          className="w-full h-full object-contain"
          autoPlay
          muted
          loop
          playsInline
          title="JobNepal"
        />
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

import { useState, useCallback, useRef } from 'react';
import { m, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { projectFolders } from '../data/windowsProjects';
import BrowserFrame from './BrowserFrame';
import FloatTags from './FloatTags';

const cardBg = [
  'from-[#F8F7E5]/80 to-[#F0EDD8]/80',
  'from-[#E8DCC8]/80 to-[#D4C8B0]/80',
  'from-[#D4CFC4]/80 to-[#C4BFB4]/80',
  'from-[#C8D4D8]/80 to-[#B8C8CC]/80',
  'from-[#D8D0C8]/80 to-[#CCC4BC]/80',
  'from-[#E0DCD4]/80 to-[#D4D0C8]/80',
  'from-[#D4D8D0]/80 to-[#C8CCC4]/80',
  'from-[#F0E8DC]/80 to-[#E4DCC8]/80',
  'from-[#DCD4D0]/80 to-[#D0C8C4]/80',
  'from-[#E8E0D8]/80 to-[#DCD4CC]/80',
  'from-[#D0D4D0]/80 to-[#C4C8C4]/80',
];

const statusColors = {
  'Completed': '#6BCB77',
  'In Progress': '#FFD93D',
  'Ongoing': '#4D96FF',
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 44, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 120, damping: 18 },
  },
};

const previewVideos = {
  jobnepal: '/JobNepal.mp4',
  haprvisual: '/HaprVisual.mp4',
};

function WindowPreview({ project, index }) {
  const video = previewVideos[project.id];
  const initials = project.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const gradient = cardBg[index % cardBg.length];

  if (video) {
    return (
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-black">
        <video
          src={video}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          title={project.name}
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full aspect-[16/10] overflow-hidden bg-gradient-to-br ${gradient}`}>
      {/* faint grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'linear-gradient(#201A12 0.5px, transparent 0.5px), linear-gradient(90deg, #201A12 0.5px, transparent 0.5px)',
          backgroundSize: '22px 22px',
        }}
      />
      {/* giant initials watermark */}
      <span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center font-bold text-slate/[0.08] select-none leading-none"
        style={{ fontSize: 'clamp(4rem, 10vw, 7rem)', fontFamily: "'Josefin Sans', sans-serif" }}
      >
        {initials}
      </span>
      {/* fake site chrome */}
      <div className="absolute inset-0 flex flex-col p-4 md:p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-ink text-paper flex items-center justify-center text-[10px] font-bold" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
              {initials[0]}
            </span>
            <span className="text-[11px] font-semibold text-slate tracking-tight" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
              {project.name}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            {['Home', 'Work', 'About'].map(f => (
              <span key={f} className="h-1.5 w-8 rounded-full bg-slate/15" />
            ))}
            <span className="h-6 w-16 rounded-full bg-ink" />
          </div>
        </div>

        <div className="flex-1 flex flex-col items-start justify-center max-w-[85%]">
          <span
            className="inline-flex items-center gap-1.5 text-[8px] font-mono uppercase tracking-[0.18em] px-2 py-1 rounded-full border mb-2.5 bg-white/70"
            style={{ borderColor: `${statusColors[project.status] || '#999'}55`, color: '#2D2D2D' }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColors[project.status] || '#999' }} />
            {project.status}
          </span>
          <p className="font-bold text-slate leading-tight" style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: 'clamp(1rem, 2.2vw, 1.5rem)' }}>
            {project.name}
          </p>
          <p className="text-[11px] md:text-xs text-gray leading-relaxed mt-1 line-clamp-2" style={{ fontFamily: "'Lato', sans-serif" }}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {project.tech?.slice(0, 3).map(t => (
              <span key={t} className="text-[8px] font-mono tracking-wider uppercase bg-white/80 border border-ink/10 text-slate/70 px-2 py-0.5 rounded-full">
                {t}
              </span>
            ))}
            {(project.tech?.length || 0) > 3 && (
              <span className="text-[8px] font-mono text-muted/70">+{project.tech.length - 3}</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <span className="h-6 w-20 rounded-full bg-wine" />
            <span className="h-6 w-20 rounded-full border border-slate/20" />
          </div>
          <span className="font-mono text-[8px] text-muted/50 uppercase tracking-widest hidden sm:block">
            {project.role || 'Project'} · {project.duration || ''}
          </span>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index, browserPref }) {
  const [hovered, setHovered] = useState(false);
  const frameRef = useRef(null);

  /* cursor-driven 3D tilt (transform only — neighbours never shift) */
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [5, -5]), { stiffness: 220, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-6, 6]), { stiffness: 220, damping: 20 });

  const displayUrl = project.live
    ? project.live.replace(/^https?:\/\//, '')
    : project.github
      ? project.github.replace(/^https?:\/\//, '')
      : `${project.id}.princez.dev`;

  const handleClick = useCallback(() => {
    if (project.live) {
      window.open(project.live, '_blank', 'noopener');
    } else if (project.github) {
      window.open(project.github, '_blank', 'noopener');
    }
  }, [project]);

  const handleMove = useCallback((e) => {
    const el = frameRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)));
    py.set(Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)));
  }, [px, py]);

  const handleLeave = useCallback(() => {
    setHovered(false);
    px.set(0.5);
    py.set(0.5);
  }, [px, py]);

  const clickable = Boolean(project.live || project.github);

  return (
    <m.div
      variants={item}
      className="group relative hover:z-10"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.1, y: -6 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── Same window as Work section ── */}
      <div
        ref={frameRef}
        onMouseMove={handleMove}
        onClick={clickable ? handleClick : undefined}
        className={`relative ${clickable ? 'cursor-pointer' : ''}`}
        style={{ perspective: 900 }}
      >
        {/* glow on hover */}
        <div className="absolute -inset-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(139,26,43,0.14), transparent 70%)', filter: 'blur(18px)' }}
        />
        <m.div className="relative" style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
          <BrowserFrame url={displayUrl} variant={browserPref}>
            {/* inner preview slowly zooms while hovered */}
            <m.div
              animate={{ scale: hovered ? 1.07 : 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full"
            >
              <WindowPreview project={project} index={index} />
            </m.div>
          </BrowserFrame>
          {/* click badge */}
          {clickable && (
            <div className={`absolute bottom-3 right-3 transition-all duration-300 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
              <span className="text-[9px] tracking-wider text-wine bg-white/95 px-3 py-1.5 rounded-lg border border-border shadow-soft" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
                Click to explore →
              </span>
            </div>
          )}
        </m.div>
      </div>

      {/* ── Project meta stays in place ── */}
      <div className="pt-4 px-1">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="relative flex w-1.5 h-1.5 flex-shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping" style={{ background: statusColors[project.status] || '#999' }} />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: statusColors[project.status] || '#999' }} />
          </span>
          <span className="text-[9px] font-mono text-muted/70 uppercase tracking-[0.18em]">
            {project.status} · {project.category}
          </span>
        </div>
        <h3
          className="font-bold text-slate leading-tight mb-1 group-hover:text-wine transition-colors"
          style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: 'clamp(1rem, 1.6vw, 1.25rem)' }}
        >
          {project.name}
        </h3>
        <p className="text-[13px] text-gray leading-relaxed line-clamp-2 mb-3" style={{ fontFamily: "'Lato', sans-serif" }}>
          {project.description}
        </p>
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {project.tech?.slice(0, 3).map((t) => (
              <span key={t} className="text-[9px] font-mono tracking-wider text-slate/60 uppercase bg-white border border-ink/10 px-2 py-0.5 rounded-full">
                {t}
              </span>
            ))}
            {(project.tech?.length || 0) > 3 && (
              <span className="text-[9px] font-mono text-muted/50">+{project.tech.length - 3}</span>
            )}
          </div>
          {clickable && (
            <button
              onClick={handleClick}
              className="flex-shrink-0 inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.14em] uppercase text-wine hover:gap-2.5 transition-all"
            >
              Open
              <m.span animate={{ x: hovered ? 5 : 0 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }}>→</m.span>
            </button>
          )}
        </div>
      </div>
    </m.div>
  );
}

export default function AllProjects() {
  const [browserPref, setBrowserPref] = useState('mac');

  return (
    <div className="min-h-screen bg-sand relative">
      <FloatTags />
      <div className="max-w-8xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <m.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-[11px] tracking-[0.25em] text-wine uppercase block mb-4"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            <m.span
              className="inline-block w-8 h-px bg-wine mr-3 align-middle"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'left center' }}
            />
            Portfolio Archive
          </m.span>
          <span className="block overflow-hidden">
            <m.h1
              initial={{ yPercent: 110 }}
              animate={{ yPercent: 0 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-bold text-slate leading-[0.95] mb-4"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontFamily: "'Josefin Sans', sans-serif" }}
            >
              All Projects
            </m.h1>
          </span>
          <m.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-gray text-sm md:text-base max-w-md leading-relaxed"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            A complete collection of work, experiments, and projects built over time.
          </m.p>

          {/* Browser toggle — same as Work section */}
          <div className="flex items-center gap-3 mt-8">
            <span className="text-[9px] tracking-[0.15em] text-muted/50 uppercase" style={{ fontFamily: "'Lato', sans-serif" }}>View as</span>
            <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid #E3DEC8' }}>
              <button
                onClick={() => setBrowserPref('mac')}
                className="px-3 py-1.5 text-[9px] tracking-wider uppercase transition-all duration-300 text-white"
                style={{ background: browserPref === 'mac' ? '#8B1A2B' : 'Black', fontFamily: "'Lato', sans-serif" }}
              >
                Mac
              </button>
              <button
                onClick={() => setBrowserPref('windows')}
                className="px-3 py-1.5 text-[9px] tracking-wider uppercase transition-all duration-300 text-white"
                style={{ background: browserPref === 'windows' ? '#8B1A2B' : 'Black', fontFamily: "'Lato', sans-serif" }}
              >
                Windows
              </button>
            </div>
          </div>
        </m.div>

        {/* Divider */}
        <m.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-gradient-to-r from-gold/20 via-brown/10 to-transparent origin-left mb-10"
        />

        {/* Grid — 3 windows per row; hover scales in place via transform */}
        <m.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10"
        >
          {projectFolders.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} browserPref={browserPref} />
          ))}
        </m.div>
      </div>

      <NewariFooter />
    </div>
  );
}

/* ─── PROJECTS FOOTER ─── */
function NewariFooter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const year = new Date().getFullYear();

  return (
    <footer ref={ref} className="relative overflow-hidden bg-[#0a0908]">
      {/* Woven background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(139,26,43,0.06) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(139,26,43,0.06) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(139,26,43,0.06) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(139,26,43,0.06) 75%),
            repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(179,156,79,0.03) 1px, rgba(179,156,79,0.03) 2px),
            repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(179,156,79,0.03) 1px, rgba(179,156,79,0.03) 2px),
            repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(139,26,43,0.04) 8px, rgba(139,26,43,0.04) 9px),
            repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(139,26,43,0.04) 8px, rgba(139,26,43,0.04) 9px)
          `,
          backgroundSize: '20px 20px, 20px 20px, 20px 20px, 20px 20px, 40px 40px, 40px 40px, 80px 80px, 80px 80px',
        }} />
      </div>

      {/* Handcrafted Code strip */}
      <div className="border-y border-[#B39C4F]/10 bg-[#0d0b0a]">
        <div className="py-2 text-center">
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#B39C4F] font-mono font-semibold">⟐ Handcrafted Code ⟐</span>
        </div>
      </div>

      {/* Compact footer content */}
      <div className="relative z-10 px-6 md:px-12 py-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-white" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
              Project <span className="text-[#B39C4F]">Archive</span>
            </span>
            <span className="text-[10px] font-mono text-[#B39C4F]/70">Collection © {year}</span>
          </div>
          <a href="mailto:princezstha6110@gmail.com"
            className="text-[10px] font-mono tracking-[0.15em] text-[#B39C4F] hover:text-white transition-colors">
            princezstha6110@gmail.com
          </a>
          <div className="flex items-center gap-4">
            {[
              { label: 'GitHub', href: 'https://github.com/PRINCEZ110' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/princez-shrestha-b12a0132b/' },
              { label: 'Instagram', href: 'https://www.instagram.com/princezstha/?hl=en' },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#B39C4F] hover:text-white transition-colors">
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 mt-3 pt-3 border-t border-[#B39C4F]/8">
          <div className="flex items-center gap-4">
            {['Home', 'Work', 'About', 'CV', 'Contact'].map((link) => (
              <a key={link}
                href={link === 'Home' ? '/' : link === 'Work' ? '/#work' : `/#${link.toLowerCase()}`}
                className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#B39C4F]/80 hover:text-white transition-colors">
                {link}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#B39C4F]">⟐</span>
            <span className="text-[9px] font-mono tracking-[0.15em] text-[#B39C4F]/80 uppercase">Crafted in Nepal</span>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="py-2 text-center border-t border-[#B39C4F]/8">
        <p className="text-[10px] font-mono tracking-[0.15em] text-[#B39C4F]/80">
          <span className="text-[#8B1A2B]">⟐</span> © {year} Prince Shrestha — Built with intention <span className="text-[#8B1A2B]">⟐</span>
        </p>
      </div>
    </footer>
  );
}

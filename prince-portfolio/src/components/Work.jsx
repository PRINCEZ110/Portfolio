import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
  {
    id: 'nagarsewa',
    title: 'NagarSewa',
    subtitle: 'E-Governance Web Application',
    year: '2025 – 2026',
    tags: ['Web App / React / Civic Tech'],
    color: '#C8FF00',
  },
  {
    id: 'timestar',
    title: 'TimeStar',
    subtitle: 'E-Commerce Online Watch Store',
    year: '2024 – 2025',
    tags: ['E-Commerce / Frontend / UI Design'],
    color: '#A0CFFF',
  },
  {
    id: 'sahakarinet',
    title: 'SahakariNet',
    subtitle: 'Cooperative Management System',
    year: '2026',
    tags: ['Enterprise / Java / Database'],
    color: '#FFB86C',
  },
];

export default function Work() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section id="work" className="px-6 md:px-12 lg:px-20 py-32 md:py-48" ref={sectionRef}>
      <div className="max-w-[1440px] mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <p className="font-body text-[11px] tracking-[0.25em] text-muted uppercase mb-3">
            Selected Projects
          </p>
          <h2 className="font-body font-bold text-snow leading-[1.05] mb-4" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}>
            Work<br />that matters.
          </h2>
        </motion.div>

        {/* PROJECTS — full-bleed vertical stack like Behance */}
        {projects.map((p, i) => (
          <ProjectBlock key={p.id} project={p} index={i} scrollYProgress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}

function ProjectBlock({ project, index, scrollYProgress }) {
  const ref = useRef(null);
  const progress = useTransform(scrollYProgress, [index * 0.2, index * 0.2 + 0.3], [0, 1]);
  const imgParallax = useTransform(progress, [0, 1], [15, -15]);

  const isSplit = index === 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="mb-32 md:mb-44 last:mb-0"
    >
      {/* Year + Tags — Behance-style metadata bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center gap-3 mb-4"
      >
        <span className="font-body text-[11px] tracking-[0.2em] text-muted uppercase font-medium">
          {project.year}
        </span>
        <span className="w-6 h-px bg-white/10" />
        <span className="font-body text-[11px] tracking-[0.15em] text-muted">
          {project.tags[0]}
        </span>
      </motion.div>

      {/* Title */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="font-body font-bold text-snow leading-[1.05] mb-8"
        style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
      >
        {project.title}
        <span className="block text-muted font-light text-base md:text-xl mt-2">
          {project.subtitle}
        </span>
      </motion.h3>

      {/* Mockup — full width block */}
      <motion.div
        style={{ y: imgParallax }}
        className="mb-8"
      >
        <div className="w-full overflow-hidden bg-card/50 border border-white/[0.03]">
          {project.id === 'nagarsewa' && <NagarSewaMockup />}
          {project.id === 'timestar' && <TimeStarMockup />}
          {project.id === 'sahakarinet' && <SahakariNetMockup />}
        </div>
      </motion.div>

      {/* Thin divider line — Behance-style */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="h-px origin-left"
        style={{ backgroundColor: project.color + '30' }}
      />
    </motion.div>
  );
}

/* ─── MOCKUPS — Behance-style full-bleed visual blocks ─── */

function NagarSewaMockup() {
  return (
    <div className="relative w-full" style={{ paddingTop: '56%' }}>
      <div className="absolute inset-0 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0d0d0d, #111)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(200,255,0,0.03), transparent)' }} />

        {/* Dashboard frame */}
        <div className="absolute inset-4 md:inset-8 rounded-lg overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.04)' }}>
          {/* Title bar */}
          <div className="h-7 bg-white/[0.02] flex items-center px-3 gap-2 border-b border-white/[0.03]">
            <span className="w-2 h-2 rounded-full bg-white/10" />
            <span className="w-2 h-2 rounded-full bg-white/10" />
            <span className="w-2 h-2 rounded-full bg-white/10" />
            <span className="ml-3 text-[8px] font-body text-white/20 tracking-wider uppercase">nagar sewa · dashboard</span>
          </div>

          {/* Content */}
          <div className="flex h-[calc(100%-28px)]">
            {/* Sidebar */}
            <div className="w-10 bg-white/[0.01] border-r border-white/[0.03]" />

            {/* Main area */}
            <div className="flex-1 p-4 md:p-6 space-y-4">
              {/* Stat cards */}
              <div className="grid grid-cols-3 gap-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="p-3 rounded" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <div className="h-1.5 w-14 rounded mb-1.5" style={{ background: 'rgba(255,255,255,0.05)' }} />
                    <div className="h-3 w-10 rounded" style={{ background: i === 0 ? 'rgba(200,255,0,0.15)' : 'rgba(255,255,255,0.03)' }} />
                  </div>
                ))}
              </div>

              {/* Table */}
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-3 py-1.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                  <div className="h-1.5 flex-1 rounded" style={{ background: 'rgba(255,255,255,0.04)' }} />
                  <div className="h-1.5 w-16 rounded" style={{ background: 'rgba(255,255,255,0.03)' }} />
                  <div className="h-1.5 w-12 rounded" style={{ background: 'rgba(200,255,0,0.08)' }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, rgba(200,255,0,0.15), transparent)' }} />
      </div>
    </div>
  );
}

function TimeStarMockup() {
  return (
    <div className="relative w-full" style={{ paddingTop: '66%' }}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(145deg, #0d0d0d, #141414)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(160,207,255,0.03), transparent)' }} />

        <div className="absolute inset-4 md:inset-8 flex items-center justify-center">
          {/* Mockup frame */}
          <div className="w-full max-w-sm rounded-lg overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.04)' }}>
            <div className="h-7 bg-white/[0.02] flex items-center px-3 border-b border-white/[0.03]">
              <span className="text-[8px] font-body text-white/20 tracking-wider">timestar</span>
            </div>

            <div className="p-6 flex flex-col items-center">
              {/* Watch */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full relative mb-4" style={{
                background: 'radial-gradient(circle at 40% 35%, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
                border: '1px solid rgba(255,255,255,0.06)'
              }}>
                <div className="absolute inset-[30%] rounded-full" style={{
                  background: 'radial-gradient(circle at 40% 35%, rgba(255,255,255,0.02), transparent)',
                  border: '1px solid rgba(255,255,255,0.04)'
                }} />
              </div>
              <p className="text-[10px] font-body text-white/30 tracking-[0.2em] mb-1 uppercase">Chronograph Edition</p>
              <p className="text-lg font-body text-white/60 font-light tracking-wide mb-4">$349</p>
              <div className="flex gap-2 w-32">
                <div className="flex-1 h-7 rounded" style={{ background: 'rgba(160,207,255,0.06)' }} />
                <div className="flex-1 h-7 rounded" style={{ background: 'rgba(255,255,255,0.03)' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, rgba(160,207,255,0.15), transparent)' }} />
      </div>
    </div>
  );
}

function SahakariNetMockup() {
  return (
    <div className="relative w-full" style={{ paddingTop: '52%' }}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0d0d0d, #111)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,184,108,0.02), transparent)' }} />

        <div className="absolute inset-4 md:inset-8 rounded-lg overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="h-7 bg-white/[0.02] flex items-center px-3 border-b border-white/[0.03]">
            <span className="text-[8px] font-body text-white/20 tracking-wider uppercase">sahakarinet · admin</span>
          </div>

          <div className="p-4 md:p-6">
            {/* Table header */}
            <div className="grid grid-cols-4 gap-3 pb-2 mb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-2 rounded" style={{ background: 'rgba(255,255,255,0.06)' }} />
              ))}
            </div>
            {/* Table rows */}
            {[...Array(6)].map((_, i) => (
              <div key={i} className="grid grid-cols-4 gap-3 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.015)' }}>
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="h-1.5 rounded" style={{
                    background: j === 3 ? 'rgba(255,184,108,0.08)' : 'rgba(255,255,255,0.03)',
                    width: j === 0 ? '70%' : j === 3 ? '50%' : '100%'
                  }} />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, rgba(255,184,108,0.15), transparent)' }} />
      </div>
    </div>
  );
}

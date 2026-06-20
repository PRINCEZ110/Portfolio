import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const projects = [
  {
    id: 'nagarsewa',
    title: 'NagarSewa',
    subtitle: 'E-Governance Web Application',
    year: '2025–2026',
    tags: ['Web App', 'React', 'Civic Tech'],
    description: 'A citizen-focused digital platform designed to improve communication between citizens and local government bodies by enabling issue reporting and tracking resolution progress.',
    highlights: [
      'React.js + Tailwind CSS frontend',
      'Responsive civic engagement platform',
      'Transparent issue tracking workflow',
    ],
    color: '#C8FF00',
    layout: 'feature',
  },
  {
    id: 'timestar',
    title: 'TimeStar',
    subtitle: 'E-Commerce Online Watch Store',
    year: '2024–2025',
    tags: ['E-Commerce', 'Frontend', 'UI Design'],
    description: 'A modern online watch store designed with a focus on clean navigation, product discovery, and smooth user experience for e-commerce browsing.',
    highlights: [
      'Product browsing and search system',
      'Clean UI/UX design focused on conversions',
      'Built with HTML, CSS, and Java',
    ],
    color: '#A0CFFF',
    layout: 'split',
  },
  {
    id: 'sahakarinet',
    title: 'SahakariNet',
    subtitle: 'Cooperative Management System',
    year: '2026',
    tags: ['Enterprise', 'Java', 'Database'],
    description: 'A full-stack cooperative management system built using Java MVC architecture, designed for managing members, financial transactions, and cooperative operations efficiently.',
    highlights: [
      'Java, JSP, Servlets, JDBC, MySQL',
      'Role-based access control system',
      'Secure authentication with session management and BCrypt encryption',
      'Features: deposits, withdrawals, loans, member management',
    ],
    color: '#FFB86C',
    layout: 'feature',
  },
];

export default function Work() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section id="work" className="relative px-6 md:px-12 lg:px-20 py-32 md:py-48 overflow-hidden" ref={sectionRef}>
      <div className="max-w-[1440px] mx-auto">
        {/* ─── SECTION HEADER ─── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32 md:mb-48"
        >
          <span className="font-mono text-[11px] tracking-[0.25em] text-muted uppercase block mb-5">
            Selected Projects
          </span>

          <h2 className="font-['Inter'] font-bold text-snow leading-[1.05] mb-6" style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}>
            Work that matters.
          </h2>

          <p className="font-['Inter'] text-muted text-sm md:text-base max-w-lg leading-relaxed tracking-wide">
            A collection of systems, platforms, and digital experiences I've built.
          </p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="h-px bg-white/10 origin-left mt-10"
          />
        </motion.div>

        {/* ─── PROJECT 1: FULL-SCREEN FEATURE ─── */}
        <FeatureBlock
          project={projects[0]}
          index={0}
          scrollYProgress={scrollYProgress}
          mockup={<NagarSewaMockup />}
        />

        {/* ─── PROJECT 2: SPLIT 50/50 ─── */}
        <SplitBlock
          project={projects[1]}
          index={1}
          scrollYProgress={scrollYProgress}
          mockup={<TimeStarMockup />}
        />

        {/* ─── PROJECT 3: ENTERPRISE FULL-WIDTH ─── */}
        <FeatureBlock
          project={projects[2]}
          index={2}
          scrollYProgress={scrollYProgress}
          mockup={<SahakariNetMockup />}
        />
      </div>
    </section>
  );
}

/* ─── FULL-SCREEN FEATURE LAYOUT ─── */
function FeatureBlock({ project, index, scrollYProgress, mockup }) {
  const ref = useRef(null);
  const blockProgress = useTransform(scrollYProgress, [index * 0.18, index * 0.18 + 0.25], [0, 1]);
  const imgScale = useTransform(blockProgress, [0, 1], [0.92, 1]);
  const imgOpacity = useTransform(blockProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="mb-32 md:mb-44 last:mb-0"
    >
      {/* LEFT: text + RIGHT: mockup */}
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start mb-10 md:mb-14">
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-4 md:gap-6 mb-4"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">{project.year}</span>
            {project.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-3">
                <span className="w-px h-3 bg-white/10" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">{tag}</span>
              </span>
            ))}
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="font-['Inter'] font-bold text-snow leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
          >
            {project.title}
            <span className="block text-muted font-light text-base md:text-xl mt-2">
              {project.subtitle}
            </span>
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-['Inter'] text-muted text-sm md:text-base leading-relaxed tracking-wide"
          >
            {project.description}
          </motion.p>
        </div>

        {/* Right: mockup with zoom parallax */}
        <motion.div
          style={{ scale: imgScale, opacity: imgOpacity }}
          className="w-full origin-center"
        >
          {mockup}
        </motion.div>
      </div>

      {/* Highlights */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase block mb-4">
          Key Highlights
        </span>
        <div className="flex flex-wrap gap-x-10 gap-y-2">
          {project.highlights.map((h, j) => (
            <span key={j} className="flex items-center gap-2.5 font-['Inter'] text-sm text-snow/70">
              <span
                className="inline-block w-[3px] h-[3px] rounded-full flex-shrink-0"
                style={{ backgroundColor: project.color }}
              />
              {h}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── SPLIT 50/50 LAYOUT ─── */
function SplitBlock({ project, index, scrollYProgress, mockup }) {
  const ref = useRef(null);
  const blockProgress = useTransform(scrollYProgress, [index * 0.18, index * 0.18 + 0.25], [0, 1]);
  const imgY = useTransform(blockProgress, [0, 1], [20, -20]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="mb-32 md:mb-44 last:mb-0"
    >
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left: mockup */}
        <motion.div style={{ y: imgY }}>
          {mockup}
        </motion.div>

        {/* Right: text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-4 md:gap-6 mb-4"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">{project.year}</span>
            {project.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-3">
                <span className="w-px h-3 bg-white/10" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">{tag}</span>
              </span>
            ))}
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="font-['Inter'] font-bold text-snow leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
          >
            {project.title}
            <span className="block text-muted font-light text-base md:text-xl mt-2">
              {project.subtitle}
            </span>
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-['Inter'] text-muted text-sm md:text-base leading-relaxed tracking-wide mb-8"
          >
            {project.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase block mb-4">
              Key Highlights
            </span>
            <div className="flex flex-col gap-2">
              {project.highlights.map((h, j) => (
                <span key={j} className="flex items-center gap-2.5 font-['Inter'] text-sm text-snow/70">
                  <span
                    className="inline-block w-[3px] h-[3px] rounded-full flex-shrink-0"
                    style={{ backgroundColor: project.color }}
                  />
                  {h}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── MOCKUP COMPONENTS ─── */

function NagarSewaMockup() {
  return (
    <div className="relative w-full overflow-hidden" style={{ paddingTop: '75%', background: '#0d0d0d' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(200,255,0,0.04), transparent 60%)' }} />
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="w-full max-w-md" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <div className="flex items-center gap-1.5 px-3 py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <span className="w-2 h-2 rounded-full bg-white/10" />
            <span className="w-2 h-2 rounded-full bg-white/10" />
            <span className="w-2 h-2 rounded-full bg-white/10" />
          </div>
          <div className="flex">
            <div className="w-8" style={{ borderRight: '1px solid rgba(255,255,255,0.03)' }} />
            <div className="flex-1 p-4 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="p-3" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <div className="h-1.5 w-12 rounded mb-2" style={{ background: 'rgba(255,255,255,0.05)' }} />
                    <div className="h-3 w-8 rounded" style={{ background: i === 0 ? 'rgba(200,255,0,0.12)' : 'rgba(255,255,255,0.03)' }} />
                  </div>
                ))}
              </div>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-3 py-1.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                  <div className="h-1.5 flex-1 rounded bg-white/5" />
                  <div className="h-1.5 w-14 rounded bg-white/5" />
                  <div className="h-1.5 w-10 rounded" style={{ background: 'rgba(200,255,0,0.08)' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimeStarMockup() {
  return (
    <div className="relative w-full overflow-hidden" style={{ paddingTop: '90%', background: '#0d0d0d' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(160,207,255,0.04), transparent 60%)' }} />
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="w-full max-w-xs flex flex-col items-center">
          <div className="w-32 h-32 md:w-36 md:h-36 rounded-full mb-4" style={{
            background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <div className="w-full h-full rounded-full relative" style={{
              background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.02), transparent)',
              clipPath: 'inset(25% 25% 25% 25%)',
              border: '1px solid rgba(255,255,255,0.03)'
            }} />
          </div>
          <p className="font-mono text-[9px] tracking-[0.25em] text-white/30 uppercase mb-1">Chronograph Edition</p>
          <p className="font-['Inter'] text-lg font-light text-white/60 tracking-wide mb-4">$349</p>
          <div className="flex gap-2 w-28">
            <div className="flex-1 h-7 rounded-sm" style={{ background: 'rgba(160,207,255,0.06)' }} />
            <div className="flex-1 h-7 rounded-sm" style={{ background: 'rgba(255,255,255,0.02)' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SahakariNetMockup() {
  return (
    <div className="relative w-full overflow-hidden" style={{ paddingTop: '68%', background: '#0d0d0d' }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,184,108,0.02), transparent)' }} />
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="w-full max-w-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <div className="flex items-center px-3 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <span className="font-mono text-[8px] tracking-wider text-white/20 uppercase">admin · sahakarinet</span>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-4 gap-2 pb-2 mb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-2 rounded-sm bg-white/5" />
              ))}
            </div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-4 gap-2 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.015)' }}>
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="h-1.5 rounded-sm" style={{
                    background: j === 3 ? 'rgba(255,184,108,0.08)' : 'rgba(255,255,255,0.03)',
                    width: j === 0 ? '70%' : j === 3 ? '50%' : '100%'
                  }} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

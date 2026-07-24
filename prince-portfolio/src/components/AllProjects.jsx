import { useState, useMemo, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { m, useInView } from 'framer-motion';
import { projectFolders } from '../data/windowsProjects';
import FloatTags from './FloatTags';

const categories = [
  { id: 'all', label: 'All', countKey: 'total' },
  { id: 'featured', label: 'Featured Projects' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'experiments', label: 'Experiments' },
  { id: 'archived', label: 'Archived' },
];

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
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

function ProjectCard({ project, index }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const gradient = cardBg[index % cardBg.length];

  const handleClick = useCallback(() => {
    if (project.live) {
      window.open(project.live, '_blank', 'noopener');
    } else if (project.github) {
      window.open(project.github, '_blank', 'noopener');
    }
  }, [project]);

  return (
    <m.div
      variants={item}
      className="group relative rounded-xl overflow-hidden cursor-pointer"
      style={{ aspectRatio: '4/3' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#E3DEC8 1px, transparent 1px), linear-gradient(90deg, #E3DEC8 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16">
        <div className="absolute top-0 right-0 w-8 h-8 bg-gold/5 rounded-bl-full" />
      </div>

      {/* Status indicator dot */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5">
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: statusColors[project.status] || '#999' }}
        />
        <span className="text-[8px] font-mono text-muted/60 uppercase tracking-wider">
          {project.status}
        </span>
      </div>

      {/* Project initials */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-bold text-slate/10 select-none"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontFamily: "'Josefin Sans', sans-serif" }}
        >
          {project.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
        </span>
      </div>

      {/* Title always visible */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3
          className="font-bold text-slate leading-tight"
          style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: 'clamp(0.9rem, 1.8vw, 1.3rem)' }}
        >
          {project.name}
        </h3>
      </div>

      {/* Hover overlay */}
      <m.div
        className="absolute inset-0 flex flex-col justify-end p-4"
        initial={false}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-clay/95 via-clay/80 to-clay/40" />

        <div className="relative z-10">
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tech?.slice(0, 4).map((t) => (
              <span
                key={t}
                className="text-[8px] font-mono tracking-wider text-gold uppercase bg-gold/8 px-2 py-0.5 rounded-full border border-gold/15"
              >
                {t}
              </span>
            ))}
            {(project.tech?.length || 0) > 4 && (
              <span className="text-[8px] font-mono text-muted/50">+{project.tech.length - 4}</span>
            )}
          </div>

          <p className="text-xs text-gray leading-relaxed mb-3 line-clamp-2">
            {project.description}
          </p>

          {/* CTA */}
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-wider text-gold uppercase">
            <span>View Project</span>
            <m.span
              animate={{ x: hovered ? 4 : 0 }}
              transition={{ duration: 0.2 }}
            >→</m.span>
          </div>
        </div>
      </m.div>
    </m.div>
  );
}

export default function AllProjects() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return projectFolders;
    const cat = categories.find((c) => c.id === activeCategory);
    if (!cat) return projectFolders;
    return projectFolders.filter((p) => {
      const label = cat.label;
      return p.category === label;
    });
  }, [activeCategory]);

  const counts = useMemo(() => {
    const total = projectFolders.length;
    const cats = {};
    categories.forEach((c) => {
      if (c.id === 'all') return;
      cats[c.label] = projectFolders.filter((p) => p.category === c.label).length;
    });
    return { total, ...cats };
  }, []);

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
            Portfolio Archive
          </m.span>
          <h1
            className="font-bold text-slate leading-[0.95] mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontFamily: "'Josefin Sans', sans-serif" }}
          >
            All Projects
          </h1>
          <p
            className="text-gray text-sm md:text-base max-w-md leading-relaxed"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            A complete collection of work, experiments, and projects built over time.
          </p>
        </m.div>

        {/* Divider */}
        <m.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-gradient-to-r from-gold/20 via-brown/10 to-transparent origin-left mb-10"
        />

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Filter sidebar */}
          <m.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="md:w-48 flex-shrink-0"
          >
            <div className="md:sticky md:top-24">
              <span
                className="text-[10px] tracking-[0.2em] text-muted uppercase block mb-4"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Filter
              </span>
              <div className="flex md:flex-col flex-wrap gap-1.5">
                {categories.map((cat) => {
                  const count = cat.id === 'all' ? counts.total : (counts[cat.label] || 0);
                  const isActive = activeCategory === cat.id;
                  return (
                    <m.button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`text-left text-sm px-3 md:px-4 py-2 rounded-xl transition-all duration-300 ${
                        isActive
                          ? 'bg-white text-slate shadow-soft font-medium'
                          : 'text-muted hover:text-slate hover:bg-white/50'
                      }`}
                      style={{ fontFamily: "'Lato', sans-serif" }}
                      whileHover={{ x: isActive ? 0 : 3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="flex items-center justify-between gap-4">
                        <span>{cat.label}</span>
                        <span
                          className={`text-[10px] font-mono ${
                            isActive ? 'text-gold' : 'text-muted/40'
                          }`}
                        >
                          {count}
                        </span>
                      </span>
                    </m.button>
                  );
                })}
              </div>
            </div>
          </m.div>

          {/* Grid */}
          <m.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </m.div>
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <span className="text-4xl block mb-4">🔍</span>
            <p
              className="text-muted text-sm"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              No projects found in this category.
            </p>
          </m.div>
        )}
      </div>

      <NewariFooter />
    </div>
  );
}

/* ─── WOVEN NEWARI TEXTILE FOOTER ─── */
const weaveWords = [
  'REACT', 'NODE', 'TAILWIND', 'TYPESCRIPT', 'NEXT',
  'FIGMA', 'PRISMA', 'POSTGRES', 'DOCKER', 'GRAPHQL',
  'PYTHON', 'JAVA', 'MYSQL', 'VITE', 'GIT',
];

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

      {/* Top trim */}
      <div className="relative h-10 flex items-center justify-center border-b border-[#B39C4F]/8">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#8B1A2B]/30 via-[#B39C4F]/40 to-[#8B1A2B]/30" />
        <div className="flex items-center gap-1">
          {[...Array(24)].map((_, i) => (
            <span key={i} className={`inline-block ${i % 2 === 0 ? 'w-[3px] h-[3px]' : 'w-[2px] h-[5px]'} bg-[#B39C4F]/30`}
              style={{ opacity: 0.2 + (i % 4) * 0.2 }}
            />
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden border-b border-[#B39C4F]/10 bg-[#0d0b0a]">
        <m.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 60, ease: 'linear', repeat: Infinity }}
          className="flex whitespace-nowrap py-3"
        >
          {[...Array(3)].map((_, idx) => (
            <span key={idx} className="flex items-center gap-14 mx-6">
              {weaveWords.map((word, i) => (
                <span key={i} className="flex items-center gap-14">
                  <span className="text-[11px] tracking-[0.25em] uppercase text-[#B39C4F] font-mono font-semibold">{word}</span>
                  <span className="flex items-center gap-[3px]">
                    <span className="w-[5px] h-[5px] bg-[#8B1A2B] rotate-45" />
                    <span className="w-[5px] h-[5px] bg-[#B39C4F] rotate-45" />
                    <span className="w-[5px] h-[5px] bg-[#8B1A2B] rotate-45" />
                  </span>
                </span>
              ))}
            </span>
          ))}
        </m.div>
      </div>

      {/* Main */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* LEFT: Woven panel */}
          <m.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="w-full aspect-[4/3] border border-[#B39C4F]/35 flex items-center justify-center"
              style={{
                backgroundImage: `
                  repeating-conic-gradient(rgba(139,26,43,0.08) 0% 25%, transparent 0% 50%) 0 0 / 20px 20px,
                  repeating-linear-gradient(45deg, rgba(179,156,79,0.06) 0, rgba(179,156,79,0.06) 1px, transparent 0, transparent 8px),
                  repeating-linear-gradient(-45deg, rgba(179,156,79,0.06) 0, rgba(179,156,79,0.06) 1px, transparent 0, transparent 8px)
                `,
                backgroundBlendMode: 'overlay',
              }}
            >
              <div className="text-center p-8">
                <div className="inline-block mb-6">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <rect x="1" y="1" width="78" height="78" stroke="#B39C4F" strokeWidth="0.8" strokeOpacity="0.6" />
                    <rect x="6" y="6" width="68" height="68" stroke="#B39C4F" strokeWidth="0.5" strokeOpacity="0.35" />
                    <circle cx="40" cy="40" r="28" stroke="#B39C4F" strokeWidth="0.5" strokeOpacity="0.25" />
                    <circle cx="40" cy="40" r="18" stroke="#B39C4F" strokeWidth="0.5" strokeOpacity="0.2" />
                  </svg>
                </div>
                <p className="text-[10px] font-mono tracking-[0.4em] text-[#B39C4F]/90 uppercase">Handcrafted Code</p>
              </div>
            </div>
          </m.div>

          {/* RIGHT: Footer content */}
          <m.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="space-y-5">
              <h2 className="text-[clamp(1.8rem,3.5vw,3.5rem)] font-bold leading-[1.0] tracking-tight" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
                <span className="text-white/90">Project</span>
                <br />
                <span className="text-[#B39C4F]">Archive</span>
                <span className="block text-xs font-mono text-[#B39C4F]/50 font-normal mt-2 tracking-[0.2em] uppercase">Collection © {new Date().getFullYear()}</span>
              </h2>
              <p className="text-xs font-mono text-[#B39C4F]/85 leading-relaxed max-w-sm">
                A curated archive of work — each project built with intention, care, and clean code.
              </p>

              <div className="border-t border-[#B39C4F]/10 pt-4 flex flex-wrap gap-x-6 gap-y-2">
                <a href="mailto:princezstha6110@gmail.com"
                  className="text-[10px] font-mono tracking-[0.15em] text-[#B39C4F]/90 hover:text-[#B39C4F] transition-colors duration-300 border-b border-[#B39C4F]/30 hover:border-[#B39C4F]/50 pb-0.5">
                  princezstha6110@gmail.com
                </a>
                <div className="flex items-center gap-3">
                  {[
                    { label: 'GitHub', href: 'https://github.com/PRINCEZ110' },
                    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/princez-shrestha-b12a0132b/' },
                    { label: 'Instagram', href: 'https://www.instagram.com/princezstha/?hl=en' },
                  ].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                      className="text-[8px] font-mono tracking-[0.25em] uppercase text-[#B39C4F]/80 hover:text-[#B39C4F] transition-colors duration-300">
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-1">
                {['Home', 'Work', 'About', 'CV', 'Contact'].map((link) => (
                  <a key={link}
                    href={link === 'Home' ? '/' : link === 'Work' ? '/#work' : `/#${link.toLowerCase()}`}
                    className="text-[8px] font-mono tracking-[0.25em] uppercase text-[#B39C4F]/70 hover:text-[#B39C4F] transition-colors duration-300">
                    {link}
                  </a>
                ))}
              </div>

              <div className="inline-flex items-center gap-2 border border-[#B39C4F]/30 px-3 py-2 group hover:border-[#B39C4F]/50 transition-all duration-500">
                <span className="text-[9px] text-[#B39C4F]/70">⟐</span>
                <span className="text-[8px] font-mono tracking-[0.15em] text-[#B39C4F]/70 uppercase">Crafted in Nepal</span>
              </div>
            </div>
          </m.div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="relative overflow-hidden border-t border-[#B39C4F]/10 bg-[#0d0b0a]">
        <m.div
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 60, ease: 'linear', repeat: Infinity }}
          className="flex whitespace-nowrap py-3"
        >
          {[...Array(3)].map((_, idx) => (
            <span key={idx} className="flex items-center gap-14 mx-6">
              {weaveWords.map((word, i) => (
                <span key={i} className="flex items-center gap-14">
                  <span className="text-[11px] tracking-[0.25em] uppercase text-[#B39C4F] font-mono font-semibold">{word}</span>
                  <span className="flex items-center gap-[3px]">
                    <span className="w-[5px] h-[5px] bg-[#8B1A2B] rotate-45" />
                    <span className="w-[5px] h-[5px] bg-[#B39C4F] rotate-45" />
                    <span className="w-[5px] h-[5px] bg-[#8B1A2B] rotate-45" />
                  </span>
                </span>
              ))}
            </span>
          ))}
        </m.div>
      </div>

      {/* Bottom trim */}
      <div className="relative h-10 flex items-center justify-center border-t border-[#B39C4F]/8">
        <div className="flex items-center gap-1">
          {[...Array(24)].map((_, i) => (
            <span key={i} className={`inline-block ${i % 2 === 0 ? 'w-[3px] h-[3px]' : 'w-[2px] h-[5px]'} bg-[#B39C4F]/30`}
              style={{ opacity: 0.2 + (i % 4) * 0.2 }}
            />
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-[#8B1A2B]/30 via-[#B39C4F]/40 to-[#8B1A2B]/30" />
      </div>

      {/* Copyright */}
      <div className="py-3 text-center">
        <p className="text-[10px] font-mono tracking-[0.15em] text-[#B39C4F]/85">
          <span className="text-[#8B1A2B]">⟐</span> © {year} Prince Shrestha — Built with intention <span className="text-[#8B1A2B]">⟐</span>
        </p>
      </div>
    </footer>
  );
}

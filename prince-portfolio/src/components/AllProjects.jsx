import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { m } from 'framer-motion';
import { projectFolders } from '../data/windowsProjects';

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
    <div className="min-h-screen bg-sand">
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
    </div>
  );
}

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const projects = [
  {
    num: '01',
    title: 'NagarSewa',
    subtitle: 'E-Governance Web App',
    tags: ['React.js', 'Tailwind CSS', 'JavaScript', 'Civic Tech'],
    desc: 'Citizen-focused platform for reporting local issues and tracking resolution progress. Built responsive frontend interfaces and enhanced communication between citizens and government offices.',
    color: '#C8FF00',
    gradient: 'from-[#C8FF00]/20 via-transparent to-transparent',
    pattern: 'M0 0L50 50M50 0L0 50',
  },
  {
    num: '02',
    title: 'TimeStar',
    subtitle: 'E-Commerce Watch Store',
    tags: ['HTML', 'CSS', 'Java', 'UI/UX'],
    desc: 'Online watch store with product browsing and search features. Designed a user-friendly interface focused on intuitive navigation and product discovery.',
    color: '#A0CFFF',
    gradient: 'from-[#A0CFFF]/20 via-transparent to-transparent',
    pattern: 'M10 10L40 40M40 10L10 40',
  },
  {
    num: '03',
    title: 'SahakariNet',
    subtitle: 'Cooperative Management System',
    tags: ['Java', 'JSP', 'Servlets', 'MySQL', 'MVC'],
    desc: 'Full-stack cooperative management web app with member search, deposits, withdrawals, loan disbursement, and role-based access control with BCrypt password hashing.',
    color: '#FFB86C',
    gradient: 'from-[#FFB86C]/20 via-transparent to-transparent',
    pattern: 'M0 20L30 50L60 20L90 50',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

function LetterPullUp({ text, className }) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function Work() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.15], [40, 0]);

  return (
    <section id="work" className="relative px-6 md:px-12 py-24 md:py-32 overflow-hidden" ref={sectionRef}>
      <div className="max-w-8xl mx-auto">
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="flex items-end justify-between mb-16 md:mb-24"
        >
          <div>
            <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase block mb-4">
              selected cases
            </span>
            <h2 className="font-display font-bold text-snow leading-tight" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
              <LetterPullUp text="Work that" />
              <br />
              <span className="text-accent">
                <LetterPullUp text="matters." />
              </span>
            </h2>
          </div>
          <motion.a
            href="https://github.com/PRINCEZ110?tab=repositories"
            target="_blank"
            rel="noreferrer"
            whileHover={{ gap: '12px' }}
            className="hidden md:inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-accent transition-colors border border-border px-5 py-3 group"
          >
            <span>github</span>
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 3 }}
              className="inline-block"
            >→</motion.span>
          </motion.a>
        </motion.div>

        {/* Divider bar — Behance inspired */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="h-px bg-border origin-left mb-16 md:mb-20"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-12 md:space-y-16"
        >
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-card border border-border hover:border-accent/30 transition-all duration-500"
    >
      {/* Background gradient glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
      />

      {/* Decorative pattern lines */}
      <svg
        className="absolute top-6 right-6 w-24 h-24 text-border opacity-30 group-hover:text-accent/20 transition-all duration-500 pointer-events-none"
        viewBox="0 0 50 50"
      >
        <pattern id={`pattern-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d={project.pattern} stroke="currentColor" strokeWidth="0.5" fill="none" />
        </pattern>
        <rect width="50" height="50" fill={`url(#pattern-${index})`} />
      </svg>

      <div className="relative z-10 p-6 md:p-10">
        {/* Top row: number + subtitle */}
        <div className="flex items-start justify-between mb-6">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-5xl md:text-7xl leading-none"
            style={{ color: project.color + '40' }}
          >
            {project.num}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.4, duration: 0.5 }}
            className="font-mono text-xs text-muted tracking-wider uppercase mt-2"
          >
            {project.subtitle}
          </motion.span>
        </div>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-snow text-3xl md:text-4xl lg:text-5xl mb-4 group-hover:text-accent transition-colors duration-500"
        >
          {project.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-body text-muted text-sm md:text-base leading-relaxed max-w-2xl mb-6"
        >
          {project.desc}
        </motion.p>

        {/* Bottom: tags + arrow */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.5, duration: 0.5 }}
            className="flex flex-wrap gap-2"
          >
            {project.tags.map((t) => (
              <motion.span
                key={t}
                whileHover={{ scale: 1.05, y: -1 }}
                className="tag"
                style={{ borderColor: project.color + '40', color: project.color }}
              >
                {t}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.6, duration: 0.5 }}
            className="flex items-center gap-2 text-muted group-hover:text-accent transition-colors duration-500"
          >
            <span className="font-mono text-xs tracking-wider hidden sm:inline">View Project</span>
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="text-xl inline-block"
            >→</motion.span>
          </motion.div>
        </div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15 + 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="h-[2px] origin-left"
        style={{ backgroundColor: project.color }}
      />
    </motion.div>
  );
}

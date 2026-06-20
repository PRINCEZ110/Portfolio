import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const projects = [
  {
    id: 'nagarsewa',
    title: 'NagarSewa',
    subtitle: 'E-Governance Web Application',
    year: '2025 – 2026',
    tags: ['Web App', 'React', 'Civic Tech'],
    description: 'A citizen-focused digital platform designed to improve communication between citizens and local government bodies by enabling issue reporting and tracking resolution progress.',
    highlights: [
      'React.js + Tailwind CSS frontend',
      'Responsive civic engagement platform',
      'Transparent issue tracking workflow',
    ],
    color: '#C8FF00',
    layout: 'full',
  },
  {
    id: 'timestar',
    title: 'TimeStar',
    subtitle: 'E-Commerce Online Watch Store',
    year: '2024 – 2025',
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
    layout: 'full',
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
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-['JetBrains_Mono'] text-[11px] tracking-[0.25em] text-muted uppercase block mb-5"
          >
            Selected Projects
          </motion.span>

          <h2 className="font-['Inter'] font-extrabold text-snow leading-[0.95] mb-6" style={{ fontSize: 'clamp(2.8rem, 8vw, 7rem)' }}>
            {['Work', 'that', 'matters'].map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block mr-[0.15em]"
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.7, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-['Inter'] text-muted text-sm md:text-base max-w-lg leading-relaxed tracking-wide"
          >
            A collection of systems, platforms, and digital experiences I've built.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1px] bg-snow/10 origin-left mt-10"
          />
        </motion.div>

        {/* ─── PROJECTS ─── */}
        {projects.map((project, i) => (
          <ProjectBlock
            key={project.id}
            project={project}
            scrollYProgress={scrollYProgress}
            blockIndex={i}
          />
        ))}
      </div>
    </section>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

function ProjectBlock({ project, scrollYProgress, blockIndex }) {
  const blockRef = useRef(null);
  const isInView = useInView(blockRef, { once: true, margin: '-80px' });

  const blockProgress = useTransform(
    scrollYProgress,
    [blockIndex * 0.18, blockIndex * 0.18 + 0.25],
    [0, 1],
  );
  const imageY = useTransform(blockProgress, [0, 1], [25, -25]);

  const mockup = project.id === 'nagarsewa' ? <NagarSewaMockup /> :
    project.id === 'timestar' ? <TimeStarMockup /> :
    <SahakariNetMockup />;

  const meta = (
    <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 md:gap-8 mb-6 md:mb-8">
      <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.2em] text-muted uppercase">{project.year}</span>
      {project.tags.map((tag) => (
        <span key={tag} className="flex items-center gap-4">
          <span className="w-px h-3 bg-white/10" />
          <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.15em] text-muted uppercase">{tag}</span>
        </span>
      ))}
    </motion.div>
  );

  const title = (
    <motion.h3
      variants={fadeUp}
      className="font-['Inter'] font-bold text-snow leading-[1.05] mb-8"
      style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
    >
      {project.title}
      <span className="text-muted font-light"> — {project.subtitle}</span>
    </motion.h3>
  );

  const description = (
    <motion.p
      variants={fadeUp}
      className="font-['Inter'] text-muted text-sm md:text-base leading-[1.8] tracking-wide"
    >
      {project.description}
    </motion.p>
  );

  const highlights = (
    <motion.div variants={fadeUp}>
      <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.2em] text-muted uppercase block mb-4">
        Key Highlights
      </span>
      <ul className="space-y-2.5">
        {project.highlights.map((h, j) => (
          <motion.li
            key={j}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: j * 0.08 }}
            className="flex items-start gap-3 font-['Inter'] text-sm text-snow/80"
          >
            <span
              className="inline-block w-[3px] h-[3px] rounded-full mt-[7px] flex-shrink-0"
              style={{ backgroundColor: project.color }}
            />
            {h}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );

  if (project.layout === 'split') {
    return (
      <motion.div
        ref={blockRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
        className="mb-40 md:mb-64 last:mb-0"
      >
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div variants={fadeUp} style={{ y: imageY }}>
            {mockup}
          </motion.div>
          <div>
            {meta}
            {title}
            {description}
            {highlights}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={blockRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={staggerContainer}
      className="mb-40 md:mb-64 last:mb-0"
    >
      {meta}
      {title}
      <motion.div variants={fadeUp} style={{ y: imageY }}>
        {mockup}
      </motion.div>
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 mt-10 md:mt-14">
        {description}
        {highlights}
      </div>
    </motion.div>
  );
}

/* ─── MOCKUPS ─── */

function NagarSewaMockup() {
  return (
    <div className="mockup-dash group cursor-pointer">
      <div className="mockup-sidebar" />
      <div className="mockup-content">
        <div className="mockup-bar" />
        <div className="mockup-bar" />
        <div className="mockup-bar" />
        <div className="mockup-grid">
          <div className="mockup-card">
            <div className="mockup-card-bar" />
            <div className="mockup-card-bar" />
            <div className="mockup-card-bar" />
          </div>
          <div className="mockup-card">
            <div className="mockup-card-bar" />
            <div className="mockup-card-bar" />
            <div className="mockup-card-bar" />
          </div>
        </div>
      </div>
      <div className="mockup-accent" />
      <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/[0.02] transition-colors duration-700 rounded-xl" />
    </div>
  );
}

function TimeStarMockup() {
  return (
    <div className="mockup-shop group cursor-pointer">
      <div className="mockup-shop-header" />
      <div className="mockup-shop-product">
        <div className="mockup-watch" />
        <div className="mockup-price">
          <span>Chronograph Edition</span>
          <strong>$349</strong>
        </div>
        <div className="mockup-buttons">
          <div className="mockup-btn" />
          <div className="mockup-btn" />
        </div>
      </div>
      <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/[0.02] transition-colors duration-700 rounded-xl" />
    </div>
  );
}

function SahakariNetMockup() {
  return (
    <div className="mockup-enterprise group cursor-pointer">
      <div className="mockup-enterprise-top" />
      <div className="mockup-table">
        <div className="mockup-table-header">
          <span /><span /><span /><span />
        </div>
        {[...Array(5)].map((_, i) => (
          <div className="mockup-table-row" key={i}>
            <span /><span /><span /><span />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/[0.02] transition-colors duration-700 rounded-xl" />
    </div>
  );
}

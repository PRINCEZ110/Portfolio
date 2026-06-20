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
            whileInView={{ opacity: 1, y: 0 }}
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
            className="h-[1px] bg-white/10 origin-left mt-10"
          />
        </motion.div>

        {/* ─── PROJECT 1: FULL-SCREEN FEATURE ─── */}
        <FullFeatureBlock
          project={projects[0]}
          scrollYProgress={scrollYProgress}
          index={0}
          mockup={<NagarSewaMockup />}
        />

        {/* ─── PROJECT 2: SPLIT LAYOUT ─── */}
        <SplitBlock
          project={projects[1]}
          scrollYProgress={scrollYProgress}
          index={1}
          mockup={<TimeStarMockup />}
        />

        {/* ─── PROJECT 3: FULL-WIDTH ENTERPRISE ─── */}
        <FullFeatureBlock
          project={projects[2]}
          scrollYProgress={scrollYProgress}
          index={2}
          mockup={<SahakariNetMockup />}
        />
      </div>
    </section>
  );
}

/* ─── FULL-WIDTH CINEMATIC FEATURE BLOCK ─── */
function FullFeatureBlock({ project, scrollYProgress, index, mockup }) {
  const ref = useRef(null);
  const blockProgress = useTransform(scrollYProgress, [index * 0.18, index * 0.18 + 0.25], [0, 1]);
  const imgScale = useTransform(blockProgress, [0, 1], [1, 1.08]);
  const imgOpacity = useTransform(blockProgress, [0, 1], [0.4, 1]);
  const contentY = useTransform(blockProgress, [0, 1], [30, 0]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="mb-40 md:mb-56 last:mb-0"
    >
      {/* Left title + Right mockup — cinematic spread */}
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 mb-12 md:mb-16">
        {/* Left: text */}
        <div>
          <motion.div
            variants={textFadeUp}
            className="flex flex-wrap items-center gap-4 md:gap-6 mb-6"
          >
            <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.2em] text-muted uppercase">{project.year}</span>
            {project.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-4">
                <span className="w-px h-3 bg-white/10" />
                <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.2em] text-muted uppercase">{tag}</span>
              </span>
            ))}
          </motion.div>

          <motion.h3
            variants={textFadeUp}
            className="font-['Inter'] font-bold text-snow leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
          >
            {project.title}
            <span className="text-muted font-light block md:inline md:ml-3">{project.subtitle}</span>
          </motion.h3>

          <motion.p
            variants={textFadeUp}
            className="font-['Inter'] text-muted text-sm md:text-base leading-[1.8] tracking-wide"
          >
            {project.description}
          </motion.p>
        </div>

        {/* Right: cinematic mockup with parallax zoom */}
        <motion.div
          style={{ scale: imgScale, opacity: imgOpacity }}
          className="relative overflow-hidden"
        >
          {mockup}
        </motion.div>
      </div>

      {/* Highlights */}
      <motion.div variants={textFadeUp} className="max-w-2xl">
        <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.2em] text-muted uppercase block mb-4">
          Key Highlights
        </span>
        <div className="flex flex-wrap gap-x-10 gap-y-2.5">
          {project.highlights.map((h, j) => (
            <motion.span
              key={j}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: j * 0.06 }}
              className="flex items-center gap-2.5 font-['Inter'] text-sm text-snow/70"
            >
              <span className="inline-block w-[3px] h-[3px] rounded-full flex-shrink-0" style={{ backgroundColor: project.color }} />
              {h}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── SPLIT 50/50 LAYOUT ─── */
function SplitBlock({ project, scrollYProgress, index, mockup }) {
  const ref = useRef(null);
  const blockProgress = useTransform(scrollYProgress, [index * 0.18, index * 0.18 + 0.25], [0, 1]);
  const imgY = useTransform(blockProgress, [0, 1], [20, -20]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="mb-40 md:mb-56 last:mb-0"
    >
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left: mockup */}
        <motion.div style={{ y: imgY }}>
          {mockup}
        </motion.div>

        {/* Right: text */}
        <div>
          <motion.div
            variants={textFadeUp}
            className="flex flex-wrap items-center gap-4 md:gap-6 mb-6"
          >
            <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.2em] text-muted uppercase">{project.year}</span>
            {project.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-4">
                <span className="w-px h-3 bg-white/10" />
                <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.2em] text-muted uppercase">{tag}</span>
              </span>
            ))}
          </motion.div>

          <motion.h3
            variants={textFadeUp}
            className="font-['Inter'] font-bold text-snow leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
          >
            {project.title}
            <span className="text-muted font-light block md:inline md:ml-3">{project.subtitle}</span>
          </motion.h3>

          <motion.p
            variants={textFadeUp}
            className="font-['Inter'] text-muted text-sm md:text-base leading-[1.8] tracking-wide mb-8"
          >
            {project.description}
          </motion.p>

          <motion.div variants={textFadeUp}>
            <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.2em] text-muted uppercase block mb-4">
              Key Highlights
            </span>
            <div className="flex flex-col gap-2.5">
              {project.highlights.map((h, j) => (
                <motion.span
                  key={j}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: j * 0.06 }}
                  className="flex items-center gap-2.5 font-['Inter'] text-sm text-snow/70"
                >
                  <span className="inline-block w-[3px] h-[3px] rounded-full flex-shrink-0" style={{ backgroundColor: project.color }} />
                  {h}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

const textFadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/* ─── MOCKUP COMPONENTS ─── */

function NagarSewaMockup() {
  return (
    <div className="mockup-frame">
      <div className="mockup-dashboard">
        <div className="mockup-dash-top" />
        <div className="mockup-dash-body">
          <div className="mockup-dash-side" />
          <div className="mockup-dash-main">
            <div className="mockup-stat">
              <div className="mockup-stat-item">
                <div className="mockup-stat-label" />
                <div className="mockup-stat-value" />
              </div>
              <div className="mockup-stat-item">
                <div className="mockup-stat-label" />
                <div className="mockup-stat-value" />
              </div>
              <div className="mockup-stat-item">
                <div className="mockup-stat-label" />
                <div className="mockup-stat-value" />
              </div>
            </div>
            <div className="mockup-list">
              {[...Array(4)].map((_, i) => (
                <div className="mockup-list-item" key={i}>
                  <span /><span /><span />
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
    <div className="mockup-frame">
      <div className="mockup-product">
        <div className="mockup-product-inner">
          <div className="mockup-watch-ring" />
          <div className="mockup-product-label">Chronograph Edition</div>
          <div className="mockup-product-price">$349</div>
          <div className="mockup-product-btns">
            <span /><span />
          </div>
        </div>
      </div>
    </div>
  );
}

function SahakariNetMockup() {
  return (
    <div className="mockup-frame">
      <div className="mockup-enterprise">
        <div className="mockup-enterprise-inner">
          <div className="mockup-ent-header">
            <span /><span /><span /><span />
          </div>
          {[...Array(6)].map((_, i) => (
            <div className="mockup-ent-row" key={i}>
              <span /><span /><span /><span />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

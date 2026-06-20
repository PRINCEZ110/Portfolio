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

const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0, y: 15 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] },
  }),
};

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
            className="font-mono text-[11px] tracking-[0.25em] text-muted uppercase block mb-5"
          >
            Selected Projects
          </motion.span>

          <h2 className="font-['Inter'] font-bold text-snow leading-[0.95] mb-6" style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}>
            {'Work that matters.'.split(' ').map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={slideUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="inline-block mr-[0.2em]"
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-['Inter'] text-muted text-sm md:text-base max-w-lg leading-relaxed tracking-wide"
          >
            A collection of systems, platforms, and digital experiences I've built.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="h-px bg-white/10 origin-left mt-10"
          />
        </motion.div>

        {projects.map((p, i) =>
          p.layout === 'split' ? (
            <SplitBlock key={p.id} project={p} index={i} scrollYProgress={scrollYProgress} />
          ) : (
            <FeatureBlock key={p.id} project={p} index={i} scrollYProgress={scrollYProgress} />
          )
        )}
      </div>
    </section>
  );
}

function NagarSewaMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.03 }}
      className="relative w-full overflow-hidden origin-center cursor-pointer"
      style={{ paddingTop: '75%', background: '#0d0d0d' }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(200,255,0,0.04), transparent 60%)' }}
        animate={{
          background: [
            'radial-gradient(ellipse at 80% 20%, rgba(200,255,0,0.04), transparent 60%)',
            'radial-gradient(ellipse at 70% 30%, rgba(200,255,0,0.06), transparent 60%)',
            'radial-gradient(ellipse at 80% 20%, rgba(200,255,0,0.04), transparent 60%)',
          ],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="w-full max-w-md" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <div className="flex items-center gap-1.5 px-3 py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <motion.span
              className="w-2 h-2 rounded-full bg-white/10"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            />
            <motion.span
              className="w-2 h-2 rounded-full bg-white/10"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
            <motion.span
              className="w-2 h-2 rounded-full bg-white/10"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            />
          </div>
          <div className="flex">
            <div className="w-8" style={{ borderRight: '1px solid rgba(255,255,255,0.03)' }} />
            <div className="flex-1 p-4 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                    className="p-3"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                  >
                    <div className="h-1.5 w-12 rounded mb-2" style={{ background: 'rgba(255,255,255,0.05)' }} />
                    <motion.div
                      className="h-3 w-8 rounded"
                      style={{ background: i === 0 ? 'rgba(200,255,0,0.12)' : 'rgba(255,255,255,0.03)' }}
                      animate={i === 0 ? { width: ['60%', '75%', '60%'] } : {}}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </motion.div>
                ))}
              </div>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.7 + i * 0.08 }}
                  className="flex gap-3 py-1.5"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}
                >
                  <motion.div className="h-1.5 flex-1 rounded bg-white/5" />
                  <motion.div className="h-1.5 w-14 rounded bg-white/5" />
                  <motion.div
                    className="h-1.5 w-10 rounded"
                    style={{ background: 'rgba(200,255,0,0.08)' }}
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TimeStarMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30, rotateY: -5 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02 }}
      className="relative w-full overflow-hidden origin-center cursor-pointer perspective-1000"
      style={{ paddingTop: '90%', background: '#0d0d0d' }}
    >
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(160,207,255,0.04), transparent 60%)' }} />
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="w-full max-w-xs flex flex-col items-center">
          <motion.div
            className="w-32 h-32 md:w-36 md:h-36 rounded-full mb-4"
            style={{
              background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.02), transparent)',
                clipPath: 'inset(25% 25% 25% 25%)',
                border: '1px solid rgba(255,255,255,0.03)',
              }}
            />
          </motion.div>
          <motion.p
            className="font-mono text-[9px] tracking-[0.25em] text-white/30 uppercase mb-1"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Chronograph Edition
          </motion.p>
          <p className="font-['Inter'] text-lg font-light text-white/60 tracking-wide mb-4">$349</p>
          <div className="flex gap-2 w-28">
            <motion.div
              className="flex-1 h-7 rounded-sm"
              style={{ background: 'rgba(160,207,255,0.06)' }}
              whileHover={{ scale: 1.05, background: 'rgba(160,207,255,0.12)' }}
            />
            <div className="flex-1 h-7 rounded-sm" style={{ background: 'rgba(255,255,255,0.02)' }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SahakariNetMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02 }}
      className="relative w-full overflow-hidden origin-center cursor-pointer"
      style={{ paddingTop: '68%', background: '#0d0d0d' }}
    >
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,184,108,0.02), transparent)' }} />
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="w-full max-w-lg" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <div className="flex items-center px-3 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <span className="font-mono text-[8px] tracking-wider text-white/20 uppercase">admin · sahakarinet</span>
          </div>
          <div className="p-4">
            <motion.div
              className="grid grid-cols-4 gap-2 pb-2 mb-3"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-2 rounded-sm bg-white/5" />
              ))}
            </motion.div>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.06 }}
                className="grid grid-cols-4 gap-2 py-2"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.015)' }}
              >
                {[...Array(4)].map((_, j) => (
                  <motion.div
                    key={j}
                    className="h-1.5 rounded-sm"
                    style={{
                      background: j === 3 ? 'rgba(255,184,108,0.08)' : 'rgba(255,255,255,0.03)',
                      width: j === 0 ? '70%' : j === 3 ? '50%' : '100%',
                    }}
                    animate={j === 3 ? { opacity: [0.3, 0.7, 0.3] } : {}}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── FULL-SCREEN FEATURE ─── */
function FeatureBlock({ project, index, scrollYProgress }) {
  const ref = useRef(null);
  const blockProgress = useTransform(scrollYProgress, [index * 0.18, index * 0.18 + 0.25], [0, 1]);
  const imgScale = useTransform(blockProgress, [0, 1], [0.92, 1]);
  const imgOpacity = useTransform(blockProgress, [0, 1], [0.6, 1]);

  const MockupComponent =
    project.id === 'nagarsewa' ? NagarSewaMockup :
    project.id === 'sahakarinet' ? SahakariNetMockup :
    null;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="mb-32 md:mb-44 last:mb-0"
    >
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start mb-10 md:mb-14">
        <div>
          <motion.div custom={0} variants={fadeIn} className="flex items-center gap-4 md:gap-6 mb-4">
            <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">{project.year}</span>
            {project.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-3">
                <span className="w-px h-3 bg-white/10" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">{tag}</span>
              </span>
            ))}
          </motion.div>

          <motion.h3 custom={1} variants={slideUp} className="font-['Inter'] font-bold text-snow leading-[1.05] mb-6" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
            <motion.span
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {project.title}
            </motion.span>
            <span className="block text-muted font-light text-base md:text-xl mt-2">
              {project.subtitle}
            </span>
          </motion.h3>

          <motion.p custom={2} variants={fadeIn} className="font-['Inter'] text-muted text-sm md:text-base leading-relaxed tracking-wide">
            {project.description}
          </motion.p>
        </div>

        <motion.div style={{ scale: imgScale, opacity: imgOpacity }} className="w-full origin-center">
          {MockupComponent && <MockupComponent />}
        </motion.div>
      </div>

      <motion.div custom={3} variants={fadeIn}>
        <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase block mb-4">Key Highlights</span>
        <div className="flex flex-wrap gap-x-10 gap-y-2">
          {project.highlights.map((h, j) => (
            <motion.span
              key={j}
              custom={j}
              variants={fadeIn}
              className="flex items-center gap-2.5 font-['Inter'] text-sm text-snow/70"
            >
              <motion.span
                className="inline-block w-[3px] h-[3px] rounded-full flex-shrink-0"
                style={{ backgroundColor: project.color }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: j * 0.3 }}
              />
              {h}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── SPLIT 50/50 ─── */
function SplitBlock({ project, index, scrollYProgress }) {
  const ref = useRef(null);
  const blockProgress = useTransform(scrollYProgress, [index * 0.18, index * 0.18 + 0.25], [0, 1]);
  const imgY = useTransform(blockProgress, [0, 1], [25, -25]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="mb-32 md:mb-44 last:mb-0"
    >
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <motion.div style={{ y: imgY }}>
          <TimeStarMockup />
        </motion.div>

        <div>
          <motion.div custom={0} variants={fadeIn} className="flex items-center gap-4 md:gap-6 mb-4">
            <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">{project.year}</span>
            {project.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-3">
                <span className="w-px h-3 bg-white/10" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">{tag}</span>
              </span>
            ))}
          </motion.div>

          <motion.h3 custom={1} variants={slideUp} className="font-['Inter'] font-bold text-snow leading-[1.05] mb-6" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
            {project.title}
            <span className="block text-muted font-light text-base md:text-xl mt-2">
              {project.subtitle}
            </span>
          </motion.h3>

          <motion.p custom={2} variants={fadeIn} className="font-['Inter'] text-muted text-sm md:text-base leading-relaxed tracking-wide mb-8">
            {project.description}
          </motion.p>

          <motion.div custom={3} variants={fadeIn}>
            <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase block mb-4">Key Highlights</span>
            <div className="flex flex-col gap-2">
              {project.highlights.map((h, j) => (
                <motion.span
                  key={j}
                  custom={j}
                  variants={fadeIn}
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

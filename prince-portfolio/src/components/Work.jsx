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
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0, y: 15 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
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
            {project.title}
            <span className="block text-muted font-light text-base md:text-xl mt-2">{project.subtitle}</span>
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
              <span className="inline-block w-[3px] h-[3px] rounded-full flex-shrink-0" style={{ backgroundColor: project.color }} />
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
            <span className="block text-muted font-light text-base md:text-xl mt-2">{project.subtitle}</span>
          </motion.h3>
          <motion.p custom={2} variants={fadeIn} className="font-['Inter'] text-muted text-sm md:text-base leading-relaxed tracking-wide mb-8">
            {project.description}
          </motion.p>
          <motion.div custom={3} variants={fadeIn}>
            <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase block mb-4">Key Highlights</span>
            <div className="flex flex-col gap-2">
              {project.highlights.map((h, j) => (
                <motion.span key={j} custom={j} variants={fadeIn} className="flex items-center gap-2.5 font-['Inter'] text-sm text-snow/70">
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

/* ═══════════════════════════════════════════
   REALISTIC APP MOCKUPS — browser window style
   ═══════════════════════════════════════════ */

function BrowserFrame({ children, url }) {
  return (
    <div className="w-full rounded-lg overflow-hidden" style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Title bar */}
      <div className="flex items-center gap-2 px-3 h-8" style={{ background: '#141414', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        {url && (
          <div className="ml-3 flex-1 max-w-[60%] h-5 rounded flex items-center px-2" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <span className="text-[8px] font-mono text-white/30 truncate">{url}</span>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

function NagarSewaMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02 }}
      className="origin-center cursor-pointer"
    >
      <BrowserFrame url="nagar-sewa.gov/dashboard">
        {/* Dashboard layout */}
        <div className="flex" style={{ minHeight: '280px' }}>
          {/* Sidebar */}
          <div className="w-10 md:w-12 py-3 flex flex-col items-center gap-3" style={{ background: '#121212', borderRight: '1px solid rgba(255,255,255,0.03)' }}>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 rounded" style={{ background: i === 0 ? 'rgba(200,255,0,0.15)' : 'rgba(255,255,255,0.04)' }} />
            ))}
          </div>

          {/* Main */}
          <div className="flex-1 p-3 md:p-4 space-y-3">
            {/* Search bar */}
            <div className="h-6 rounded flex items-center px-2" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <span className="text-[7px] font-mono text-white/15">Search reports, citizens, wards...</span>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Active Reports', value: '1,284', color: 'rgba(200,255,0,0.08)' },
                { label: 'Resolved', value: '3,712', color: 'rgba(255,255,255,0.02)' },
                { label: 'Avg Response', value: '2.4h', color: 'rgba(200,255,0,0.05)' },
              ].map((stat, i) => (
                <div key={i} className="p-2 rounded" style={{ background: stat.color }}>
                  <div className="text-[6px] font-mono text-white/30 uppercase tracking-wider">{stat.label}</div>
                  <div className="text-xs font-semibold text-white/70 mt-0.5">{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Mini chart */}
            <div className="flex items-end gap-1 h-12 py-1">
              {[35, 55, 40, 70, 45, 60, 50, 80, 65, 75].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-sm" style={{
                  height: `${h}%`,
                  background: i === 7 || i === 9 ? 'rgba(200,255,0,0.2)' : 'rgba(255,255,255,0.06)',
                }} />
              ))}
            </div>

            {/* Table */}
            <div>
              {/* Table header */}
              <div className="grid grid-cols-4 gap-2 pb-1 mb-1" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                {['Issue', 'Ward', 'Status', 'Date'].map((h) => (
                  <div key={h} className="text-[6px] font-mono text-white/20 uppercase tracking-wider">{h}</div>
                ))}
              </div>
              {[
                ['Road pothole', 'Ward 3', 'In Progress'],
                ['Water leakage', 'Ward 7', 'Assigned'],
                ['Street light out', 'Ward 2', 'Resolved'],
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-4 gap-2 py-1" style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                  <div className="text-[7px] font-mono text-white/50 truncate">{row[0]}</div>
                  <div className="text-[7px] font-mono text-white/30">{row[1]}</div>
                  <div>
                    <span className="inline-block text-[6px] font-mono px-1 py-0.5 rounded" style={{
                      background: i === 2 ? 'rgba(200,255,0,0.1)' : 'rgba(255,255,255,0.04)',
                      color: i === 2 ? 'rgba(200,255,0,0.7)' : 'rgba(255,255,255,0.4)',
                    }}>
                      {row[2]}
                    </span>
                  </div>
                  <div className="text-[7px] font-mono text-white/20">Jun {12 + i}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </BrowserFrame>
    </motion.div>
  );
}

function TimeStarMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20, rotateY: -3 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02 }}
      className="origin-center cursor-pointer"
    >
      <BrowserFrame url="timestar.com/products/chronograph">
        <div className="flex" style={{ minHeight: '280px' }}>
          {/* Product image area */}
          <div className="w-1/2 flex items-center justify-center p-4" style={{ background: '#111' }}>
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full relative" style={{
              background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
              border: '1.5px solid rgba(255,255,255,0.06)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}>
              {/* Watch dial */}
              <div className="absolute inset-[22%] rounded-full" style={{
                background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.02), transparent)',
                border: '1px solid rgba(255,255,255,0.04)',
              }} />
              {/* Watch hands */}
              <div className="absolute top-1/2 left-1/2 w-[30%] h-[1px] origin-left" style={{ background: 'rgba(255,255,255,0.08)', transform: 'translate(0, -50%) rotate(-20deg)' }} />
              <div className="absolute top-1/2 left-1/2 w-[22%] h-[1px] origin-left" style={{ background: 'rgba(255,255,255,0.06)', transform: 'translate(0, -50%) rotate(60deg)' }} />
              {/* Crown */}
              <div className="absolute -right-[12%] top-[30%] w-[8%] h-[6%] rounded-sm" style={{ background: 'rgba(255,255,255,0.05)' }} />
            </div>
          </div>

          {/* Product details */}
          <div className="w-1/2 p-3 md:p-4 flex flex-col justify-center space-y-2">
            <div className="text-[6px] font-mono text-white/20 uppercase tracking-[0.2em]">TimeStar</div>
            <div className="text-xs md:text-sm font-semibold text-white/80 leading-tight">Chronograph<br/>Edition</div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[6px]" style={{ color: i < 4 ? 'rgba(160,207,255,0.5)' : 'rgba(255,255,255,0.1)' }}>★</span>
              ))}
              <span className="text-[6px] font-mono text-white/20 ml-1">(24)</span>
            </div>
            <div className="text-sm md:text-base font-light text-white/70">$349</div>
            <div className="text-[6px] font-mono text-white/15">Free shipping</div>
            <div className="flex gap-1.5 pt-1">
              <div className="flex-1 h-6 rounded text-[7px] font-mono flex items-center justify-center" style={{ background: 'rgba(160,207,255,0.08)', color: 'rgba(160,207,255,0.6)' }}>
                Add to cart
              </div>
              <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <span className="text-[8px] text-white/20">♡</span>
              </div>
            </div>
          </div>
        </div>
      </BrowserFrame>
    </motion.div>
  );
}

function SahakariNetMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02 }}
      className="origin-center cursor-pointer"
    >
      <BrowserFrame url="sahakarinet.org/admin/members">
        <div className="flex" style={{ minHeight: '280px' }}>
          {/* Sidebar */}
          <div className="w-10 md:w-12 py-3 px-1 flex flex-col items-center gap-2" style={{ background: '#121212', borderRight: '1px solid rgba(255,255,255,0.03)' }}>
            {['D', 'M', 'T', 'L', 'S'].map((l, i) => (
              <div key={i} className="w-4 h-4 rounded flex items-center justify-center text-[5px] font-bold" style={{
                background: i === 0 ? 'rgba(255,184,108,0.12)' : 'rgba(255,255,255,0.03)',
                color: i === 0 ? 'rgba(255,184,108,0.6)' : 'rgba(255,255,255,0.15)',
              }}>
                {l}
              </div>
            ))}
          </div>

          {/* Main */}
          <div className="flex-1 p-3 md:p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="text-[8px] font-mono text-white/60 font-semibold">Members</div>
                <span className="text-[6px] font-mono text-white/15 bg-white/5 px-1.5 py-0.5 rounded">248</span>
              </div>
              <div className="w-10 h-4 rounded flex items-center justify-center text-[6px] font-mono" style={{ background: 'rgba(255,184,108,0.08)', color: 'rgba(255,184,108,0.5)' }}>
                + New
              </div>
            </div>

            {/* Search */}
            <div className="h-5 rounded flex items-center px-2 mb-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <span className="text-[6px] font-mono text-white/15">Search members...</span>
            </div>

            {/* Table */}
            <div>
              <div className="grid grid-cols-5 gap-1 pb-1.5 mb-1" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                {['Name', 'Member ID', 'Deposit', 'Loan', 'Status'].map((h) => (
                  <div key={h} className="text-[6px] font-mono text-white/20 uppercase tracking-wider">{h}</div>
                ))}
              </div>
              {[
                ['Ram Sharma', 'M-1024', '$12,500', '$0'],
                ['Sita Poudel', 'M-1025', '$8,200', '$5,000'],
                ['Hari Gurung', 'M-1026', '$15,000', '$10,000'],
                ['Gita Rai', 'M-1027', '$6,800', '$2,500'],
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-5 gap-1 py-1.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.015)' }}>
                  <div className="text-[7px] font-mono text-white/50 truncate">{row[0]}</div>
                  <div className="text-[7px] font-mono text-white/25">{row[1]}</div>
                  <div className="text-[7px] font-mono text-white/45">{row[2]}</div>
                  <div className="text-[7px] font-mono text-white/45">{row[3]}</div>
                  <div>
                    <span className="inline-block text-[6px] font-mono px-1 py-0.5 rounded" style={{
                      background: i === 0 || i === 3 ? 'rgba(255,184,108,0.1)' : 'rgba(255,255,255,0.03)',
                      color: i === 0 || i === 3 ? 'rgba(255,184,108,0.6)' : 'rgba(255,255,255,0.3)',
                    }}>
                      {i === 0 || i === 3 ? 'Active' : 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center gap-1 mt-3 justify-center">
              {[1, 2, 3].map((n) => (
                <div key={n} className="w-3 h-3 rounded flex items-center justify-center text-[5px] font-mono" style={{
                  background: n === 1 ? 'rgba(255,184,108,0.1)' : 'rgba(255,255,255,0.03)',
                  color: n === 1 ? 'rgba(255,184,108,0.5)' : 'rgba(255,255,255,0.2)',
                }}>
                  {n}
                </div>
              ))}
            </div>
          </div>
        </div>
      </BrowserFrame>
    </motion.div>
  );
}

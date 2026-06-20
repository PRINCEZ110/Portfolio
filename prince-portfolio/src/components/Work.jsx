import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projects } from '../data/projects';

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

function FeatureBlock({ project, index, scrollYProgress }) {
  const ref = useRef(null);
  const blockProgress = useTransform(scrollYProgress, [index * 0.18, index * 0.18 + 0.25], [0, 1]);
  const imgScale = useTransform(blockProgress, [0, 1], [0.92, 1]);
  const imgOpacity = useTransform(blockProgress, [0, 1], [0.6, 1]);

  const MockupComponent = project.id === 'nagarsewa' ? NagarSewaMockup : SahakariNetMockup;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="mb-32 md:mb-44 last:mb-0 group"
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

          <motion.p custom={2} variants={fadeIn} className="font-['Inter'] text-muted text-sm md:text-base leading-relaxed tracking-wide mb-6">
            {project.description}
          </motion.p>

          <motion.div custom={3} variants={fadeIn}>
            <Link
              to={`/work/${project.id}`}
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] uppercase px-5 py-3 rounded-sm transition-all duration-300"
              style={{
                background: `${project.color}12`,
                color: project.color,
                border: `1px solid ${project.color}20`,
              }}
            >
              View Project
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-block"
              >→</motion.span>
            </Link>
          </motion.div>
        </div>

        <Link to={`/work/${project.id}`} className="block w-full origin-center group/card">
          <motion.div style={{ scale: imgScale, opacity: imgOpacity }} className="w-full origin-center relative">
            <MockupComponent />
            <div className="absolute inset-0 bg-accent/0 group-hover/card:bg-accent/[0.02] transition-colors duration-500 rounded-lg" />
            <div className="absolute bottom-3 right-3 opacity-0 group-hover/card:opacity-100 transition-all duration-300 translate-y-1 group-hover/card:translate-y-0">
              <span className="font-mono text-[9px] tracking-wider text-white/40 bg-black/60 px-3 py-1.5 rounded-sm backdrop-blur-sm">
                Click to explore →
              </span>
            </div>
          </motion.div>
        </Link>
      </div>

      <motion.div custom={4} variants={fadeIn}>
        <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase block mb-4">Key Highlights</span>
        <div className="flex flex-wrap gap-x-10 gap-y-2">
          {project.highlights.map((h, j) => (
            <motion.span key={j} custom={j} variants={fadeIn} className="flex items-center gap-2.5 font-['Inter'] text-sm text-snow/70">
              <span className="inline-block w-[3px] h-[3px] rounded-full flex-shrink-0" style={{ backgroundColor: project.color }} />
              {h}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

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
      className="mb-32 md:mb-44 last:mb-0 group"
    >
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <Link to={`/work/${project.id}`} className="block w-full origin-center group/card">
          <motion.div style={{ y: imgY }} className="relative">
            <TimeStarMockup />
            <div className="absolute inset-0 bg-accent/0 group-hover/card:bg-accent/[0.02] transition-colors duration-500 rounded-lg" />
            <div className="absolute bottom-3 right-3 opacity-0 group-hover/card:opacity-100 transition-all duration-300 translate-y-1 group-hover/card:translate-y-0">
              <span className="font-mono text-[9px] tracking-wider text-white/40 bg-black/60 px-3 py-1.5 rounded-sm backdrop-blur-sm">
                Click to explore →
              </span>
            </div>
          </motion.div>
        </Link>

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
          <motion.p custom={2} variants={fadeIn} className="font-['Inter'] text-muted text-sm md:text-base leading-relaxed tracking-wide mb-6">
            {project.description}
          </motion.p>
          <motion.div custom={3} variants={fadeIn}>
            <Link
              to={`/work/${project.id}`}
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] uppercase px-5 py-3 rounded-sm transition-all duration-300"
              style={{
                background: `${project.color}12`,
                color: project.color,
                border: `1px solid ${project.color}20`,
              }}
            >
              View Project
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-block"
              >→</motion.span>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   HEAVY UI BROWSER-WINDOW MOCKUPS
   ═══════════════════════════════════════════ */

function BrowserFrame({ children, url }) {
  return (
    <div className="w-full rounded-xl overflow-hidden shadow-2xl shadow-black/40" style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-2 px-4 h-9" style={{ background: '#141414', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <motion.span className="w-3 h-3 rounded-full bg-red-500/70" whileHover={{ scale: 1.2 }} />
        <motion.span className="w-3 h-3 rounded-full bg-yellow-500/70" whileHover={{ scale: 1.2 }} />
        <motion.span className="w-3 h-3 rounded-full bg-green-500/70" whileHover={{ scale: 1.2 }} />
        {url && (
          <div className="ml-3 flex-1 max-w-[60%] h-5 rounded-md flex items-center px-3" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <span className="w-2.5 h-2.5 mr-1.5 opacity-30">🔒</span>
            <span className="text-[8px] font-mono text-white/35 truncate tracking-tight">{url}</span>
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
      whileHover={{ scale: 1.015 }}
      className="origin-center cursor-pointer"
    >
      <BrowserFrame url="nagar-sewa.gov/dashboard">
        <div className="flex" style={{ minHeight: '320px' }}>
          <div className="w-12 md:w-14 py-4 flex flex-col items-center gap-3" style={{ background: '#121212', borderRight: '1px solid rgba(255,255,255,0.03)' }}>
            {['📊', '📋', '👥', '⚙️', '📁'].map((icon, i) => (
              <motion.div
                key={i}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs"
                style={{ background: i === 0 ? 'rgba(200,255,0,0.1)' : 'rgba(255,255,255,0.03)' }}
                whileHover={{ scale: 1.1, background: 'rgba(200,255,0,0.08)' }}
              >
                {icon}
              </motion.div>
            ))}
          </div>
          <div className="flex-1 p-4 md:p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-9 rounded-lg flex items-center px-3 text-[8px] font-mono" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <span className="text-white/20">🔍 Search reports, citizens, wards...</span>
              </div>
              <motion.div
                className="h-9 w-24 rounded-lg flex items-center justify-center text-[8px] font-mono font-medium"
                style={{ background: 'rgba(200,255,0,0.08)', color: 'rgba(200,255,0,0.6)' }}
                whileHover={{ background: 'rgba(200,255,0,0.12)' }}
              >
                + New Report
              </motion.div>
            </div>

            <div className="grid grid-cols-4 gap-2.5">
              {[
                { label: 'Active', value: '1,284', change: '+12%' },
                { label: 'Resolved', value: '3,712', change: '+8%' },
                { label: 'Pending', value: '456', change: '-3%' },
                { label: 'Avg Time', value: '2.4h', change: '-15%' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="p-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                  whileHover={{ background: 'rgba(255,255,255,0.04)', y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-[7px] font-mono text-white/30 uppercase tracking-wider">{stat.label}</div>
                  <div className="text-sm font-semibold text-white/80 mt-1">{stat.value}</div>
                  <div className="text-[7px] font-mono mt-0.5" style={{ color: stat.change.startsWith('+') ? 'rgba(200,255,0,0.6)' : 'rgba(255,100,100,0.6)' }}>
                    {stat.change}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-end gap-1 h-16 py-2 px-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.01)' }}>
              {[35, 55, 40, 70, 45, 60, 50, 80, 65, 75, 55, 85].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-md relative group/chart"
                  style={{
                    height: `${h}%`,
                    background: i >= 7 ? 'rgba(200,255,0,0.2)' : 'rgba(255,255,255,0.06)',
                  }}
                  whileHover={{ opacity: 0.8 }}
                />
              ))}
            </div>

            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.03)' }}>
              <div className="grid grid-cols-5 gap-2 px-3 py-2.5" style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                {['Issue', 'Ward', 'Priority', 'Status', 'Date'].map((h) => (
                  <div key={h} className="text-[7px] font-mono text-white/25 uppercase tracking-wider">{h}</div>
                ))}
              </div>
              {[
                ['Road pothole', 'Ward 3', 'High', 'In Progress', 'Jun 14'],
                ['Water leakage', 'Ward 7', 'Medium', 'Assigned', 'Jun 13'],
                ['Street light out', 'Ward 2', 'Low', 'Resolved', 'Jun 12'],
                ['Garbage dump', 'Ward 5', 'High', 'In Progress', 'Jun 11'],
              ].map((row, i) => (
                <motion.div
                  key={i}
                  className="grid grid-cols-5 gap-2 px-3 py-2.5"
                  style={{ borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.015)' : 'none' }}
                  whileHover={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <div className="text-[8px] font-mono text-white/55 truncate">{row[0]}</div>
                  <div className="text-[8px] font-mono text-white/30">{row[1]}</div>
                  <div>
                    <span className="inline-block text-[6px] font-mono px-1.5 py-0.5 rounded" style={{
                      background: row[2] === 'High' ? 'rgba(255,100,100,0.1)' : row[2] === 'Medium' ? 'rgba(255,200,0,0.1)' : 'rgba(200,255,0,0.1)',
                      color: row[2] === 'High' ? 'rgba(255,100,100,0.7)' : row[2] === 'Medium' ? 'rgba(255,200,0,0.7)' : 'rgba(200,255,0,0.7)',
                    }}>
                      {row[2]}
                    </span>
                  </div>
                  <div>
                    <span className="inline-block text-[6px] font-mono px-1.5 py-0.5 rounded" style={{
                      background: row[3] === 'Resolved' ? 'rgba(200,255,0,0.08)' : 'rgba(255,255,255,0.04)',
                      color: row[3] === 'Resolved' ? 'rgba(200,255,0,0.6)' : 'rgba(255,255,255,0.4)',
                    }}>
                      {row[3]}
                    </span>
                  </div>
                  <div className="text-[8px] font-mono text-white/20">{row[4]}</div>
                </motion.div>
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
      <BrowserFrame url="timestar.com/products/chronograph-edition">
        <div className="flex" style={{ minHeight: '320px' }}>
          <div className="w-1/2 flex flex-col items-center justify-center p-5 relative" style={{ background: '#111' }}>
            <motion.div
              className="w-28 h-28 md:w-32 md:h-32 rounded-full relative"
              style={{
                background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.05), rgba(255,255,255,0.01))',
                border: '2px solid rgba(255,255,255,0.06)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="absolute inset-[20%] rounded-full" style={{
                background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.02), transparent)',
                border: '1px solid rgba(255,255,255,0.04)',
              }} />
              <div className="absolute top-1/2 left-1/2 w-[35%] h-[1.5px] origin-left" style={{ background: 'rgba(255,255,255,0.1)', transform: 'translate(0, -50%) rotate(-25deg)' }} />
              <div className="absolute top-1/2 left-1/2 w-[25%] h-[1.5px] origin-left" style={{ background: 'rgba(255,255,255,0.07)', transform: 'translate(0, -50%) rotate(55deg)' }} />
              <div className="absolute top-[18%] left-[50%] w-[6%] h-[4%] -translate-x-1/2 rounded-sm" style={{ background: 'rgba(255,255,255,0.04)' }} />
            </motion.div>
            <div className="flex items-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  className="text-[8px]"
                  style={{ color: i < 4 ? 'rgba(160,207,255,0.5)' : 'rgba(255,255,255,0.1)' }}
                  whileHover={{ scale: 1.3 }}
                >★</motion.span>
              ))}
              <span className="text-[7px] font-mono text-white/20 ml-1.5">(24 reviews)</span>
            </div>
          </div>
          <div className="w-1/2 p-4 md:p-5 flex flex-col justify-center space-y-2.5">
            <div className="text-[7px] font-mono text-white/20 uppercase tracking-[0.2em]">TimeStar Collection</div>
            <div className="text-sm md:text-base font-semibold text-white/85 leading-tight">Chronograph<br/>Edition 2100</div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white/80">$349</span>
              <span className="text-[8px] font-mono text-white/30 line-through">$499</span>
              <span className="text-[7px] font-mono text-white/40 ml-auto">Free shipping</span>
            </div>
            <div className="flex gap-2 pt-1">
              <motion.div
                className="flex-1 h-8 rounded-lg text-[8px] font-mono flex items-center justify-center font-medium tracking-wider"
                style={{ background: 'rgba(160,207,255,0.08)', color: 'rgba(160,207,255,0.6)' }}
                whileHover={{ background: 'rgba(160,207,255,0.14)' }}
                whileTap={{ scale: 0.97 }}
              >
                Add to Cart
              </motion.div>
              <motion.div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.03)' }}
                whileHover={{ background: 'rgba(255,255,255,0.06)' }}
              >
                <span className="text-xs text-white/20">♡</span>
              </motion.div>
            </div>
            <div className="flex items-center gap-2 pt-1 text-[7px] font-mono text-white/15">
              <span>✓ In stock</span>
              <span>•</span>
              <span>Free returns</span>
              <span>•</span>
              <span>2 year warranty</span>
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
      whileHover={{ scale: 1.015 }}
      className="origin-center cursor-pointer"
    >
      <BrowserFrame url="sahakarinet.org/admin/members">
        <div className="flex" style={{ minHeight: '320px' }}>
          <div className="w-12 md:w-14 py-4 flex flex-col items-center gap-2.5" style={{ background: '#121212', borderRight: '1px solid rgba(255,255,255,0.03)' }}>
            {['📊', '👥', '💰', '📄', '⚙️'].map((icon, i) => (
              <motion.div
                key={i}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs"
                style={{ background: i === 1 ? 'rgba(255,184,108,0.1)' : 'rgba(255,255,255,0.03)' }}
                whileHover={{ scale: 1.1 }}
              >
                {icon}
              </motion.div>
            ))}
          </div>
          <div className="flex-1 p-4 md:p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-[10px] font-mono text-white/70 font-semibold">Members</div>
                <div className="text-[7px] font-mono text-white/20 bg-white/5 px-2 py-0.5 rounded-md">248 total</div>
                <div className="text-[7px] font-mono" style={{ color: 'rgba(255,184,108,0.5)' }}>● 12 new this month</div>
              </div>
              <motion.div
                className="px-3 h-7 rounded-lg flex items-center justify-center text-[7px] font-mono font-medium"
                style={{ background: 'rgba(255,184,108,0.08)', color: 'rgba(255,184,108,0.5)' }}
                whileHover={{ background: 'rgba(255,184,108,0.12)' }}
              >
                + Add Member
              </motion.div>
            </div>

            <div className="grid grid-cols-3 gap-2.5 mb-4">
              {[
                { label: 'Total Deposits', value: '$42,500' },
                { label: 'Total Loans', value: '$17,500' },
                { label: 'Active Accounts', value: '236' },
              ].map((s, i) => (
                <div key={i} className="p-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.015)' }}>
                  <div className="text-[6px] font-mono text-white/25 uppercase">{s.label}</div>
                  <div className="text-xs font-semibold text-white/70 mt-0.5">{s.value}</div>
                </div>
              ))}
            </div>

            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.03)' }}>
              <div className="grid grid-cols-6 gap-1 px-3 py-2.5" style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                {['Name', 'ID', 'Deposit', 'Loan', 'Status', ''].map((h) => (
                  <div key={h} className="text-[7px] font-mono text-white/25 uppercase tracking-wider">{h}</div>
                ))}
              </div>
              {[
                ['Ram Sharma', 'M-1024', '$12,500', '$0', 'Active'],
                ['Sita Poudel', 'M-1025', '$8,200', '$5,000', 'Active'],
                ['Hari Gurung', 'M-1026', '$15,000', '$10,000', 'Pending'],
                ['Gita Rai', 'M-1027', '$6,800', '$2,500', 'Active'],
                ['Krishna Thapa', 'M-1028', '$9,300', '$3,000', 'Pending'],
              ].map((row, i) => (
                <motion.div
                  key={i}
                  className="grid grid-cols-6 gap-1 px-3 py-2"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.015)' }}
                  whileHover={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <div className="text-[8px] font-mono text-white/55 truncate">{row[0]}</div>
                  <div className="text-[8px] font-mono text-white/25">{row[1]}</div>
                  <div className="text-[8px] font-mono text-white/45">{row[2]}</div>
                  <div className="text-[8px] font-mono text-white/45">{row[3]}</div>
                  <div>
                    <span className="inline-block text-[6px] font-mono px-1.5 py-0.5 rounded" style={{
                      background: row[4] === 'Active' ? 'rgba(255,184,108,0.08)' : 'rgba(255,255,255,0.03)',
                      color: row[4] === 'Active' ? 'rgba(255,184,108,0.6)' : 'rgba(255,255,255,0.3)',
                    }}>
                      {row[4]}
                    </span>
                  </div>
                  <div className="text-[8px] text-white/15 text-right">⋮</div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="text-[7px] font-mono text-white/15">Showing 5 of 248 members</div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, '...', 7].map((n, i) => (
                  <div key={i} className="w-6 h-6 rounded-md flex items-center justify-center text-[7px] font-mono" style={{
                    background: n === 1 ? 'rgba(255,184,108,0.08)' : 'rgba(255,255,255,0.02)',
                    color: n === 1 ? 'rgba(255,184,108,0.5)' : 'rgba(255,255,255,0.25)',
                  }}>
                    {n}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </BrowserFrame>
    </motion.div>
  );
}

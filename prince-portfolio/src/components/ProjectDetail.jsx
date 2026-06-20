import { useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projects } from '../data/projects';

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function ProjectDetail() {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);
  const ref = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-['Inter'] text-4xl font-bold text-snow mb-4">Project not found</h1>
          <Link to="/" className="font-mono text-sm text-muted hover:text-accent transition-colors">← Back home</Link>
        </div>
      </div>
    );
  }

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.6]);

  const MockupComponent =
    project.id === 'nagarsewa' ? NagarSewaDetailMockup :
    project.id === 'timestar' ? TimeStarDetailMockup :
    SahakariNetDetailMockup;

  return (
    <div ref={ref} className="relative">
      {/* ─── HERO ─── */}
      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="relative min-h-[60vh] md:min-h-[70vh] flex items-end px-6 md:px-12 lg:px-20 py-16 md:py-24 overflow-hidden"
      >
        <div className="absolute inset-0" style={{
          background: `linear-gradient(135deg, ${project.id === 'nagarsewa' ? '#0a0a0a' : project.id === 'timestar' ? '#0c0c0f' : '#0d0a08'} 0%, #0A0A0A 100%)`,
        }} />
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none" style={{
          background: `radial-gradient(ellipse at 50% 20%, ${project.color}08, transparent 60%)`,
        }} />

        <div className="relative z-10 max-w-[1440px] w-full mx-auto">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-4">
              <Link to="/#work" className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase hover:text-accent transition-colors">
                ← Back to projects
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-4 md:gap-6 mb-4">
              <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">{project.year}</span>
              {project.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-3">
                  <span className="w-px h-3 bg-white/10" />
                  <span className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase">{tag}</span>
                </span>
              ))}
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-['Inter'] font-bold text-snow leading-[1.02] mb-4"
              style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)' }}
            >
              {project.title}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-['Inter'] text-muted text-base md:text-lg max-w-xl leading-relaxed"
            >
              {project.subtitle}
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* ─── OVERVIEW ─── */}
      <div className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid md:grid-cols-2 gap-16 md:gap-20 mb-20"
          >
            <div>
              <motion.span variants={fadeUp} className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase block mb-4">
                About the Project
              </motion.span>
              <motion.p variants={fadeUp} className="font-['Inter'] text-muted text-sm md:text-base leading-[1.8] tracking-wide">
                {project.description}
              </motion.p>
            </div>
            <motion.div variants={fadeUp}>
              <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase block mb-4">
                Project Details
              </span>
              <div className="space-y-4">
                {[
                  { label: 'Role', value: project.role },
                  { label: 'Timeline', value: project.duration },
                  { label: 'Tech Stack', value: project.tech.join(', ') },
                ].map((d, i) => (
                  <div key={i} className="flex items-start gap-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <span className="font-mono text-[10px] tracking-[0.1em] text-white/30 uppercase w-24 flex-shrink-0 py-3">{d.label}</span>
                    <span className="font-['Inter'] text-sm text-snow/70 py-3">{d.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ─── LARGE MOCKUP ─── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20"
          >
            <MockupComponent />
          </motion.div>

          {/* ─── HIGHLIGHTS ─── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.span variants={fadeUp} className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase block mb-6">
              Key Features
            </motion.span>
            <div className="grid md:grid-cols-2 gap-4">
              {project.highlights.map((h, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ background: `${project.color}06`, border: `1px solid ${project.color}10` }}
                >
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${project.color}15` }}>
                    <span className="text-[8px]" style={{ color: project.color }}>✓</span>
                  </span>
                  <span className="font-['Inter'] text-sm text-snow/70">{h}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── FOOTER NAV ─── */}
      <div className="px-6 md:px-12 lg:px-20 py-12" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <Link
            to="/#work"
            className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase hover:text-accent transition-colors"
          >
            ← All Projects
          </Link>
          <span className="font-mono text-[9px] tracking-[0.2em] text-white/10 uppercase">
            {project.title}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── DETAIL PAGE MOCKUPS (larger, more detailed) ─── */

function DetailBrowserFrame({ children, url }) {
  return (
    <div className="w-full rounded-xl overflow-hidden shadow-2xl shadow-black/50" style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center gap-2 px-4 h-10" style={{ background: '#141414', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        {url && (
          <div className="ml-3 flex-1 max-w-[60%] h-6 rounded-md flex items-center px-3" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <span className="text-[9px] font-mono text-white/35 truncate tracking-tight">🔒 {url}</span>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

function NagarSewaDetailMockup() {
  return (
    <DetailBrowserFrame url="nagar-sewa.gov/dashboard">
      <div className="flex" style={{ minHeight: '450px' }}>
        <div className="w-14 md:w-16 py-5 flex flex-col items-center gap-3" style={{ background: '#121212', borderRight: '1px solid rgba(255,255,255,0.03)' }}>
          {['📊', '📋', '👥', '📁', '⚙️', '📈'].map((icon, i) => (
            <div key={i} className="w-9 h-9 rounded-lg flex items-center justify-center text-sm" style={{ background: i === 0 ? 'rgba(200,255,0,0.1)' : 'rgba(255,255,255,0.03)' }}>
              {icon}
            </div>
          ))}
        </div>
        <div className="flex-1 p-5 md:p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-10 rounded-lg flex items-center px-3" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <span className="text-[9px] font-mono text-white/20">🔍 Search issues, reports, citizens...</span>
            </div>
            <div className="h-10 px-4 rounded-lg flex items-center text-[8px] font-mono font-medium" style={{ background: 'rgba(200,255,0,0.08)', color: 'rgba(200,255,0,0.6)' }}>
              + New Report
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Total Reports', value: '5,452', change: '+12.3%' },
              { label: 'Resolved', value: '3,712', change: '+8.1%' },
              { label: 'In Progress', value: '1,284', change: '+4.2%' },
              { label: 'Avg Resolution', value: '2.4h', change: '-15.2%' },
            ].map((s, i) => (
              <div key={i} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="text-[7px] font-mono text-white/25 uppercase tracking-wider">{s.label}</div>
                <div className="text-base font-bold text-white/80 mt-1">{s.value}</div>
                <div className="text-[7px] font-mono mt-0.5" style={{ color: s.change.startsWith('+') ? 'rgba(200,255,0,0.6)' : 'rgba(255,100,100,0.6)' }}>
                  {s.change} vs last month
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-end gap-1 h-20 py-3 px-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.01)' }}>
            {[45, 60, 35, 75, 50, 65, 55, 85, 70, 90, 60, 80].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-md relative group" style={{
                height: `${h}%`,
                background: i >= 7 ? 'rgba(200,255,0,0.15)' : 'rgba(255,255,255,0.05)',
              }}>
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[6px] font-mono text-white/40 whitespace-nowrap">{h}</div>
              </div>
            ))}
          </div>

          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.03)' }}>
            <div className="grid grid-cols-6 gap-2 px-4 py-3" style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              {['Issue', 'Ward', 'Category', 'Priority', 'Status', 'Date'].map((h) => (
                <div key={h} className="text-[7px] font-mono text-white/25 uppercase tracking-wider">{h}</div>
              ))}
            </div>
            {[
              ['Road pothole near school', 'Ward 3', 'Infrastructure', 'High', 'In Progress', 'Jun 14'],
              ['Water pipeline leakage', 'Ward 7', 'Utilities', 'Medium', 'Assigned', 'Jun 13'],
              ['Street light not working', 'Ward 2', 'Infrastructure', 'Low', 'Resolved', 'Jun 12'],
              ['Illegal garbage dumping', 'Ward 5', 'Sanitation', 'High', 'In Progress', 'Jun 11'],
              ['Park bench damaged', 'Ward 4', 'Recreation', 'Low', 'Pending', 'Jun 10'],
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-6 gap-2 px-4 py-2.5" style={{ borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.012)' : 'none' }}>
                <div className="text-[8px] font-mono text-white/55 truncate">{row[0]}</div>
                <div className="text-[8px] font-mono text-white/30">{row[1]}</div>
                <div className="text-[8px] font-mono text-white/30">{row[2]}</div>
                <div>
                  <span className="inline-block text-[6px] font-mono px-1.5 py-0.5 rounded" style={{
                    background: row[3] === 'High' ? 'rgba(255,80,80,0.1)' : row[3] === 'Medium' ? 'rgba(255,200,0,0.1)' : 'rgba(200,255,0,0.1)',
                    color: row[3] === 'High' ? 'rgba(255,80,80,0.7)' : row[3] === 'Medium' ? 'rgba(255,200,0,0.7)' : 'rgba(200,255,0,0.7)',
                  }}>
                    {row[3]}
                  </span>
                </div>
                <div>
                  <span className="inline-block text-[6px] font-mono px-1.5 py-0.5 rounded" style={{
                    background: row[4] === 'Resolved' ? 'rgba(200,255,0,0.08)' : row[4] === 'In Progress' ? 'rgba(100,200,255,0.08)' : 'rgba(255,255,255,0.04)',
                    color: row[4] === 'Resolved' ? 'rgba(200,255,0,0.6)' : row[4] === 'In Progress' ? 'rgba(100,200,255,0.6)' : 'rgba(255,255,255,0.4)',
                  }}>
                    {row[4]}
                  </span>
                </div>
                <div className="text-[8px] font-mono text-white/20">{row[5]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DetailBrowserFrame>
  );
}

function TimeStarDetailMockup() {
  return (
    <DetailBrowserFrame url="timestar.com/products/chronograph-edition-2100">
      <div className="flex" style={{ minHeight: '450px' }}>
        <div className="w-1/2 flex flex-col items-center justify-center p-8 relative" style={{ background: '#111' }}>
          <motion.div
            className="w-40 h-40 md:w-48 md:h-48 rounded-full relative"
            style={{
              background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.05), rgba(255,255,255,0.01))',
              border: '2px solid rgba(255,255,255,0.06)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            <div className="absolute inset-[18%] rounded-full" style={{
              background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.02), transparent)',
              border: '1px solid rgba(255,255,255,0.04)',
            }} />
            <div className="absolute top-1/2 left-1/2 w-[38%] h-[2px] origin-left rounded-full" style={{ background: 'rgba(255,255,255,0.1)', transform: 'translate(0, -50%) rotate(-20deg)' }} />
            <div className="absolute top-1/2 left-1/2 w-[28%] h-[2px] origin-left rounded-full" style={{ background: 'rgba(255,255,255,0.07)', transform: 'translate(0, -50%) rotate(50deg)' }} />
            <div className="absolute top-[16%] left-[50%] w-[8%] h-[5%] -translate-x-1/2 rounded-sm" style={{ background: 'rgba(255,255,255,0.04)' }} />
            <div className="absolute bottom-[16%] left-[50%] -translate-x-1/2 text-[6px] font-mono" style={{ color: 'rgba(255,255,255,0.08)' }}>SWISS</div>
          </motion.div>
          <div className="flex items-center gap-1 mt-5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-[10px]" style={{ color: i < 4 ? 'rgba(160,207,255,0.5)' : 'rgba(255,255,255,0.1)' }}>★</span>
            ))}
            <span className="text-[8px] font-mono text-white/20 ml-2">24 reviews</span>
          </div>
          <div className="flex items-center gap-3 mt-3 text-[7px] font-mono text-white/20">
            <span>⌚ Stainless Steel</span>
            <span>•</span>
            <span>💧 Water Resistant</span>
            <span>•</span>
            <span>🔋 5 Year Battery</span>
          </div>
        </div>
        <div className="w-1/2 p-6 md:p-8 flex flex-col justify-center" style={{ background: '#0d0d0d' }}>
          <div className="text-[7px] font-mono text-white/20 uppercase tracking-[0.2em] mb-1">TimeStar Collection 2024</div>
          <div className="text-xl md:text-2xl font-semibold text-white/85 leading-tight mb-1">Chronograph Edition 2100</div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg md:text-xl font-bold text-white/80">$349</span>
            <span className="text-xs font-mono text-white/30 line-through">$499</span>
            <span className="text-[8px] font-mono px-1.5 py-0.5 rounded" style={{ background: 'rgba(160,207,255,0.08)', color: 'rgba(160,207,255,0.5)' }}>-30%</span>
          </div>
          <div className="text-[9px] font-['Inter'] text-white/40 leading-relaxed mb-4 max-w-sm">
            Precision quartz movement with sapphire crystal glass, date display, and 100m water resistance. Minimalist design meets everyday durability.
          </div>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {['Black', 'Silver', 'Gold'].map((c) => (
              <div key={c} className="px-3 py-1.5 rounded-md text-[7px] font-mono" style={{
                background: c === 'Black' ? 'rgba(160,207,255,0.08)' : 'rgba(255,255,255,0.03)',
                color: c === 'Black' ? 'rgba(160,207,255,0.6)' : 'rgba(255,255,255,0.3)',
                border: c === 'Black' ? '1px solid rgba(160,207,255,0.15)' : '1px solid rgba(255,255,255,0.05)',
              }}>
                {c}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <motion.div
              className="flex-1 h-10 rounded-lg flex items-center justify-center text-[9px] font-mono font-medium tracking-wider"
              style={{ background: 'rgba(160,207,255,0.08)', color: 'rgba(160,207,255,0.6)' }}
              whileHover={{ background: 'rgba(160,207,255,0.14)' }}
              whileTap={{ scale: 0.97 }}
            >
              Add to Cart
            </motion.div>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <span className="text-sm text-white/20">♡</span>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-3 text-[7px] font-mono text-white/15">
            <span>✓ In stock</span>
            <span>•</span>
            <span>Free shipping</span>
            <span>•</span>
            <span>2 year warranty</span>
          </div>
        </div>
      </div>
    </DetailBrowserFrame>
  );
}

function SahakariNetDetailMockup() {
  return (
    <DetailBrowserFrame url="sahakarinet.org/admin/dashboard">
      <div className="flex" style={{ minHeight: '450px' }}>
        <div className="w-14 md:w-16 py-5 flex flex-col items-center gap-2.5" style={{ background: '#121212', borderRight: '1px solid rgba(255,255,255,0.03)' }}>
          {['📊', '👥', '💰', '📄', '📈', '⚙️'].map((icon, i) => (
            <div key={i} className="w-9 h-9 rounded-lg flex items-center justify-center text-sm" style={{ background: i === 1 ? 'rgba(255,184,108,0.1)' : 'rgba(255,255,255,0.03)' }}>
              {icon}
            </div>
          ))}
        </div>
        <div className="flex-1 p-5 md:p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="text-[11px] font-mono text-white/70 font-semibold">Member Management</div>
              <div className="text-[7px] font-mono text-white/20 bg-white/5 px-2 py-0.5 rounded-md">248 total</div>
            </div>
            <div className="flex gap-2">
              <div className="px-3 h-8 rounded-lg flex items-center text-[7px] font-mono" style={{ background: 'rgba(255,255,255,0.03)' }}>
                📥 Export
              </div>
              <div className="px-3 h-8 rounded-lg flex items-center text-[7px] font-mono font-medium" style={{ background: 'rgba(255,184,108,0.08)', color: 'rgba(255,184,108,0.5)' }}>
                + Add Member
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-5">
            {[
              { label: 'Total Members', value: '248', sub: '+12 this month' },
              { label: 'Total Deposits', value: '$42,500', sub: 'Avg $171/member' },
              { label: 'Total Loans', value: '$17,500', sub: '12 active loans' },
              { label: 'Interest Earned', value: '$2,340', sub: 'This quarter' },
            ].map((s, i) => (
              <div key={i} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.015)' }}>
                <div className="text-[7px] font-mono text-white/25 uppercase">{s.label}</div>
                <div className="text-sm font-bold text-white/75 mt-0.5">{s.value}</div>
                <div className="text-[6px] font-mono text-white/15 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.03)' }}>
            <div className="grid grid-cols-7 gap-1 px-4 py-3" style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              {['Name', 'ID', 'Deposit', 'Loan', 'Joined', 'Status', ''].map((h) => (
                <div key={h} className="text-[7px] font-mono text-white/25 uppercase tracking-wider">{h}</div>
              ))}
            </div>
            {[
              ['Ram Sharma', 'M-1024', '$12,500', '$0', 'Jan 2024', 'Active'],
              ['Sita Poudel', 'M-1025', '$8,200', '$5,000', 'Mar 2024', 'Active'],
              ['Hari Gurung', 'M-1026', '$15,000', '$10,000', 'Feb 2024', 'Pending'],
              ['Gita Rai', 'M-1027', '$6,800', '$2,500', 'Apr 2024', 'Active'],
              ['Krishna Thapa', 'M-1028', '$9,300', '$3,000', 'May 2024', 'Pending'],
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-7 gap-1 px-4 py-2.5" style={{ borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.012)' : 'none' }}>
                <div className="text-[8px] font-mono text-white/55 truncate">{row[0]}</div>
                <div className="text-[8px] font-mono text-white/25">{row[1]}</div>
                <div className="text-[8px] font-mono text-white/45">{row[2]}</div>
                <div className="text-[8px] font-mono text-white/45">{row[3]}</div>
                <div className="text-[8px] font-mono text-white/20">{row[4]}</div>
                <div>
                  <span className="inline-block text-[6px] font-mono px-1.5 py-0.5 rounded" style={{
                    background: row[5] === 'Active' ? 'rgba(255,184,108,0.08)' : 'rgba(255,255,255,0.03)',
                    color: row[5] === 'Active' ? 'rgba(255,184,108,0.6)' : 'rgba(255,255,255,0.3)',
                  }}>
                    {row[5]}
                  </span>
                </div>
                <div className="text-[8px] text-white/15 text-right">⋮</div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3 text-[7px] font-mono text-white/15">
              <span>Showing 5 of 248</span>
              <span style={{ color: 'rgba(255,184,108,0.4)' }}>● 12 new this month</span>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, '...', '8'].map((n, i) => (
                <div key={i} className="w-7 h-7 rounded-md flex items-center justify-center text-[7px] font-mono" style={{
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
    </DetailBrowserFrame>
  );
}

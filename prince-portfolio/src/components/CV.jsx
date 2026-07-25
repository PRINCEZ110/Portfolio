import { useState, useRef, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import SignalMeter from './SignalMeter';

function FlowCanvas() {
  const ref = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const time = useRef(0);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    let id, w, h;

    const resize = () => {
      const p = c.parentElement;
      w = p.offsetWidth;
      h = p.offsetHeight;
      c.width = w * devicePixelRatio;
      c.height = h * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };

    const onMove = (e) => {
      const r = c.getBoundingClientRect();
      mouse.current.x = (e.clientX - r.left) / w;
      mouse.current.y = (e.clientY - r.top) / h;
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('resize', resize);

    const waves = [
      { amp: 20, freq: 0.008, speed: 0.4, color: '139,26,43', alpha: 0.06, offset: 0 },
      { amp: 14, freq: 0.012, speed: 0.6, color: '179,156,79', alpha: 0.05, offset: 2 },
      { amp: 8, freq: 0.018, speed: 0.3, color: '139,26,43', alpha: 0.04, offset: 4 },
      { amp: 18, freq: 0.006, speed: 0.5, color: '179,156,79', alpha: 0.03, offset: 6 },
    ];

    const draw = () => {
      time.current += 0.01;
      ctx.clearRect(0, 0, w, h);
      const my = mouse.current.y || 0.5;

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, h / 2);
        for (let x = 0; x <= w; x += 2) {
          const y = h / 2
            + Math.sin(x * wave.freq + time.current * wave.speed + wave.offset) * wave.amp
            + Math.sin(x * wave.freq * 2.3 + time.current * 0.7 + wave.offset) * wave.amp * 0.3
            + (my - 0.5) * 30;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${wave.color},${wave.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      id = requestAnimationFrame(draw);
    };

    resize();
    draw();
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

const modules = [
  {
    id: 'EDU-001',
    title: 'BSc (Hons) Computing',
    org: 'Itahari International College x London Met',
    year: '2024 — PRESENT',
    status: 'ACTIVE',
    details: [
      'Algorithms & Data Structures',
      'Software Engineering',
      'Web Development',
      'Database Systems',
    ],
  },
  {
    id: 'DEV-002',
    title: 'Open for Job / Full-Stack Developer Roles',
    org: 'Frontend · React.js · UI/UX',
    year: 'NEXT',
    status: 'SEEKING',
    details: [
      'React.js',
      'TypeScript',
      'Tailwind CSS',
      'UI/UX Design',
    ],
  },
];

export default function CV() {
  const [viewing, setViewing] = useState(false);
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="cv" className="px-6 md:px-12 lg:px-20 py-24 md:py-32 relative overflow-hidden bg-sand">
      <FlowCanvas />

      <div className="max-w-8xl mx-auto relative z-10">
        {/* Resume label */}
        <m.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-14"
        >
          <span className="w-8 h-px bg-gold" />
          <span className="text-xs text-gold tracking-[0.15em] uppercase">Resume</span>
          <span className="flex-1 h-px bg-gradient-to-r from-gold/20 to-transparent" />
        </m.div>

        {/* Header row */}
        <div className="flex items-stretch gap-3 mb-14">
          <m.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="w-1 bg-gradient-to-b from-gold/60 via-wine/40 to-gold/20 rounded-full"
          />
          <div className="flex-1">
            <m.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-2"
            >
              <span className="text-[11px] text-gray/30 font-mono">// SIGNAL DETECTED</span>
            </m.div>

            <div className="flex items-start gap-4">
              <m.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-bold leading-[1.05] tracking-tight"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: "'Josefin Sans', sans-serif" }}
              >
                <span className="text-slate">Experience</span>
                <br />
                <span className="text-wine">Background</span>
              </m.h2>
            </div>
          </div>
        </div>

        {/* Control panel modules */}
        <div className="space-y-4 mb-12">
          {modules.map((mod, i) => {
            const isOpen = expanded === i;
            return (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                onClick={() => setExpanded(isOpen ? null : i)}
                className={`border transition-all duration-400 cursor-pointer ${
                  isOpen
                    ? 'border-gold/40 bg-white/30 shadow-[0_4px_24px_rgba(139,26,43,0.06)]'
                    : 'border-border/40 bg-white/5 hover:bg-white/15 hover:border-gold/20'
                }`}
                style={{ borderLeftWidth: '3px' }}
              >
                {/* Header bar */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/20">
                  <div className="flex items-center gap-3 font-mono text-[11px]">
                    <span className={`inline-block w-2 h-2 rounded-full ${
                      mod.status === 'ACTIVE' ? 'bg-gold/70 animate-pulse' : 'bg-wine/50'
                    }`} />
                    <span className="text-gray/40 tracking-wider">{mod.id}</span>
                    <span className="text-gray/30">|</span>
                    <span className={mod.status === 'ACTIVE' ? 'text-gold/60' : 'text-wine/60'}>
                      {mod.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="text-gray/30">{mod.year}</span>
                    <span className={`text-gray/30 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="px-5 py-4">
                  <h3 className="font-semibold text-slate tracking-tight mb-1" style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)' }}>
                    {mod.title}
                  </h3>
                  <p className="font-mono text-xs text-gray/40 tracking-wide">
                    {mod.org}
                  </p>

                  {/* Expandable details */}
                  <AnimatePresence>
                    {isOpen && (
                      <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/20">
                          {mod.details.map((d, di) => (
                            <span key={di} className="font-mono text-[11px] text-gray/40 border border-border/30 px-2.5 py-1 tracking-wide">
                              {d}
                            </span>
                          ))}
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              </m.div>
            );
          })}
        </div>

        {/* Signal meter */}
        <SignalMeter />

        {/* Actions */}
        <div className="flex gap-3 mt-10 font-mono text-[12px]">
          <button
            onClick={() => setViewing(v => !v)}
            className="group flex items-center gap-2 border border-border/60 bg-white/80 px-5 py-3 text-slate hover:text-wine transition-all duration-300"
          >
            <svg className={`w-4 h-4 transition-transform ${viewing ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {viewing ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>}
            </svg>
            <span>{viewing ? 'CLOSE' : 'VIEW PDF'}</span>
          </button>
          <a
            href="/Prince Shrestha_Resume.pdf"
            download="Prince Shrestha_Resume.pdf"
            className="flex items-center gap-2 bg-slate text-white px-5 py-3 hover:bg-wine transition-all duration-300"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>DOWNLOAD</span>
          </a>
        </div>

        <AnimatePresence>
          {viewing && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden mt-8"
            >
              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="border border-border rounded-xl overflow-hidden bg-white shadow-card"
              >
                <div className="bg-[#F4F1E6] px-5 py-4 flex items-center justify-between border-b border-border font-mono text-xs text-slate/70">
                  <span className="tracking-wide">Prince Shrestha_Resume.pdf</span>
                  <a href="/Prince Shrestha_Resume.pdf" target="_blank" rel="noreferrer" className="text-steel hover:text-wine transition-colors">OPEN →</a>
                </div>
                <iframe src="/Prince Shrestha_Resume.pdf" title="CV" className="w-full" style={{ height: '85vh' }} />
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

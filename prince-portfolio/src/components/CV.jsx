import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Eye, FileText } from 'lucide-react';

function BgCanvas() {
  const ref = useRef(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    let id, w, h;

    const resize = () => {
      const p = c.parentElement;
      w = p.offsetWidth; h = p.offsetHeight;
      c.width = w * devicePixelRatio; c.height = h * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };

    const onMove = (e) => {
      const r = c.getBoundingClientRect();
      mouse.current.x = e.clientX - r.left; mouse.current.y = e.clientY - r.top;
    };
    const off = () => { mouse.current.x = -1000; mouse.current.y = -1000; };
    window.addEventListener('mousemove', onMove); window.addEventListener('mouseleave', off);

    const pts = Array.from({ length: 30 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      s: Math.random() * 1.2 + 0.3, a: Math.random() * 0.03 + 0.01,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const mx = mouse.current.x, my = mouse.current.y;

      pts.forEach(p => {
        const dx = mx - p.x, dy = my - p.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 200) { const f = (200 - d) / 200 * 0.02; p.vx += dx * f; p.vy += dy * f; }
        p.vx += (Math.random() - 0.5) * 0.02; p.vy += (Math.random() - 0.5) * 0.02;
        p.vx *= 0.97; p.vy *= 0.97; p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0; if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;

        ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(179,156,79,${d < 150 ? 0.08 : p.a})`;
        ctx.fill();
      });

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(179,156,79,${0.015 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      id = requestAnimationFrame(draw);
    };

    resize(); draw();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseleave', off); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }} />;
}

export default function CV() {
  const [viewing, setViewing] = useState(false);

  return (
    <section id="cv" className="px-6 md:px-12 lg:px-20 py-24 md:py-32 relative overflow-hidden bg-sand">
      <BgCanvas />
      <div className="max-w-8xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-label"
        >
          <span /><span>Resume / CV</span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="font-display font-bold text-slate leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
            >
              My{' '}
              <span className="text-wine">Resume.</span>
            </h2>
            <p className="font-body text-gray/70 text-sm mt-3 max-w-md leading-relaxed">
              A snapshot of my education, experience, and technical skills.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex gap-3"
          >
            <button
              onClick={() => setViewing(v => !v)}
              className="group inline-flex items-center gap-2 border border-[#E8E5D8] bg-white px-5 py-3 rounded-xl hover:border-steel/30 hover:shadow-soft transition-all duration-300"
            >
              <Eye size={14} className="text-muted group-hover:text-steel transition-colors" />
              <span className="font-display text-sm text-slate">{viewing ? 'Close' : 'Preview'}</span>
            </button>
            <a
              href="/Prince_Shrestha_CV.pdf"
              download="Prince_Shrestha_CV.pdf"
              className="group inline-flex items-center gap-2 bg-slate text-white px-5 py-3 rounded-xl hover:bg-gold transition-all duration-300 shadow-button"
            >
              <Download size={14} className="group-hover:translate-y-0.5 transition-transform" />
              <span className="font-display text-sm font-semibold">Download CV</span>
            </a>
          </motion.div>
        </div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid md:grid-cols-3 gap-4 mb-10"
        >
          {[
            { label: 'Education', value: 'BSc (Hons) Computing', sub: 'Itahari International College x London Met' },
            { label: 'Experience', value: '3 Projects', sub: 'NagarSewa | TimeStar | SahakariNet' },
            { label: 'Seeking', value: 'Internship / Junior Dev', sub: 'Frontend | React.js | UI/UX' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white border border-[#E8E5D8] rounded-xl p-5 hover:border-gold/20 hover:shadow-soft transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-3">
                <FileText size={12} className="text-gold" />
                <span className="font-mono text-[9px] text-gold tracking-[0.15em] uppercase">{item.label}</span>
              </div>
              <p className="font-display font-semibold text-slate text-sm">{item.value}</p>
              <p className="font-body text-xs text-gray/70 mt-1">{item.sub}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* PDF viewer */}
        <AnimatePresence>
          {viewing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="border border-[#E8E5D8] rounded-2xl overflow-hidden bg-white shadow-card">
                <div className="bg-clay px-5 py-3 flex items-center justify-between border-b border-[#E8E5D8]">
                  <div className="flex items-center gap-2.5">
                    <FileText size={14} className="text-gold" />
                    <span className="font-mono text-[11px] text-muted tracking-wide">Prince_Shrestha_CV.pdf</span>
                  </div>
                  <a
                    href="/Prince_Shrestha_CV.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[10px] text-steel hover:text-gold transition-colors flex items-center gap-1"
                  >
                    open new tab ↗
                  </a>
                </div>
                <iframe
                  src="/Prince_Shrestha_CV.pdf"
                  title="Prince Shrestha CV"
                  className="w-full"
                  style={{ height: '80vh' }}
                  loading="lazy"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

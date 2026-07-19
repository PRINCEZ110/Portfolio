import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <section id="cv" className="px-6 md:px-12 py-24 border-t border-border relative overflow-hidden bg-sand">
      <BgCanvas />
      <div className="max-w-8xl mx-auto">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <span className="text-xs text-steel tracking-widest uppercase" style={{ fontFamily: "'Lato', sans-serif" }}>resume</span>
            <h2
              className="font-display font-bold text-slate mt-3 leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: "'Josefin Sans', sans-serif" }}
            >
              Curriculum<br />
              <span className="text-[#541E24]">Vitae.</span>
            </h2>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setViewing(v => !v)}
              className="flex items-center gap-2 border border-border px-6 py-3 font-display text-sm text-slate hover:border-steel hover:text-steel transition-all duration-300 rounded-xl bg-white shadow-soft"
            >
              {viewing ? '✕ Close' : '👁 Preview'}
            </button>
            <a
              href="/Prince_Shrestha_CV.pdf"
              download="Prince_Shrestha_CV.pdf"
              className="flex items-center gap-2 bg-slate text-white font-display font-bold px-6 py-3 hover:bg-gold transition-all duration-300 rounded-xl shadow-button"
            >
              ↓ Download CV
            </a>
          </div>
        </div>

        {/* CV highlights from the real CV */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
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
              className="border border-border bg-white rounded-xl p-5 hover:border-steel/30 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
            >
              <span className="font-mono text-[10px] text-steel tracking-widest uppercase">{item.label}</span>
              <p className="font-display font-semibold text-slate mt-2 text-base">{item.value}</p>
              <p className="font-body text-gray text-xs mt-1">{item.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Inline PDF viewer */}
        <AnimatePresence>
          {viewing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="border border-border rounded-xl overflow-hidden bg-white shadow-card">
                <div className="bg-cream px-4 py-2 flex items-center justify-between border-b border-border">
                  <span className="font-mono text-xs text-muted">Prince_Shrestha_CV.pdf</span>
                  <a
                    href="/Prince_Shrestha_CV.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs text-steel hover:underline"
                  >
                    open in new tab ↗
                  </a>
                </div>
                <iframe
                  src="/Prince_Shrestha_CV.pdf"
                  title="Prince Shrestha CV"
                  className="w-full"
                  style={{ height: '80vh' }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

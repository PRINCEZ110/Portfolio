import { useRef, useEffect } from 'react';

const tags = [
  'React.js', 'TypeScript', 'Tailwind CSS', 'Node.js',
  'JavaScript', 'Framer Motion', 'Figma', 'Git',
  'Python', 'Next.js', 'REST APIs', 'SQL',
  'Vite', 'UI/UX', 'Web Dev', 'Responsive Design', 
  'Problem Solving', 'Full-stack Development', 'Front-end',
];

const colors = [
  '#8B1A2B', '#B39C4F', '#C4855A',
  '#8B1A2B', '#B39C4F', '#C4855A',
];

export default function FloatTags() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    let raf;
    let particles = [];
    let w, h;
    const isActive = { current: true };

    const init = () => {
      const parent = cvs.parentElement;
      w = parent.offsetWidth;
      h = parent.offsetHeight;
      const dpr = window.devicePixelRatio || 1;
      cvs.width = w * dpr;
      cvs.height = h * dpr;
      cvs.style.width = `${w}px`;
      cvs.style.height = `${h}px`;
      ctx.scale(dpr, dpr);

      particles = tags.map((tag, i) => ({
        tag,
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (0.2 + Math.random() * 0.3) * (Math.random() > 0.5 ? 1 : -1),
        vy: (0.15 + Math.random() * 0.2) * (Math.random() > 0.5 ? 1 : -1),
        color: colors[i % colors.length],
        size: 11 + Math.random() * 4,
        alpha: 0.08 + Math.random() * 0.12,
      }));
    };

    const draw = () => {
      if (!isActive.current) { raf = null; return; }
      ctx.clearRect(0, 0, w, h);
      const mx = mouse.current.x;
      const my = mouse.current.y;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -100) p.x = w + 20;
        if (p.x > w + 100) p.x = -20;
        if (p.y < -30) p.y = h + 10;
        if (p.y > h + 30) p.y = -10;

        const dx = mx * w - p.x;
        const dy = my * h - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let alpha = p.alpha;
        if (dist < 150) {
          alpha = Math.min(0.5, p.alpha + (1 - dist / 150) * 0.4);
        }

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.font = `${p.size}px "Eczar", serif`;
        ctx.fillStyle = p.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.tag, p.x, p.y);
        ctx.restore();
      });

      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (isActive.current && !raf) raf = requestAnimationFrame(draw);
    };

    const stop = () => {
      cancelAnimationFrame(raf);
      raf = null;
    };

    const onMove = (e) => {
      const r = cvs.getBoundingClientRect();
      mouse.current.x = (e.clientX - r.left) / w;
      mouse.current.y = (e.clientY - r.top) / h;
    };

    const observer = new IntersectionObserver(([entry]) => {
      isActive.current = entry.isIntersecting;
      if (entry.isIntersecting) start(); else stop();
    });
    observer.observe(cvs);

    const onVisibility = () => {
      isActive.current = !document.hidden;
      if (!document.hidden) start(); else stop();
    };
    document.addEventListener('visibilitychange', onVisibility);

    init();
    start();
    window.addEventListener('resize', init);
    document.addEventListener('mousemove', onMove);
    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', init);
      document.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

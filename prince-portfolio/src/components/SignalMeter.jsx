import { useRef, useEffect } from 'react';

export default function SignalMeter() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    let raf;
    let bars = [];
    let w, h;

    const init = () => {
      const parent = cvs.parentElement;
      w = parent.offsetWidth;
      h = 64;
      cvs.width = w * devicePixelRatio;
      cvs.height = h * devicePixelRatio;
      cvs.style.width = `${w}px`;
      cvs.style.height = `${h}px`;
      ctx.scale(devicePixelRatio, devicePixelRatio);

      const count = Math.floor(w / 6);
      bars = Array.from({ length: count }, () => ({
        h: 4 + Math.random() * 8,
        target: 4 + Math.random() * 8,
        speed: 0.05 + Math.random() * 0.1,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Label
      ctx.save();
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(179,156,79,0.3)';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText('SIGNAL', 8, 4);
      ctx.fillText('STRENGTH', 8, 16);
      ctx.restore();

      // Scale markers
      for (let i = 0; i < 4; i++) {
        const x = w - 8 - i * 50;
        ctx.save();
        ctx.font = '8px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(139,26,43,0.15)';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        ctx.fillText(`${100 - i * 33}%`, x, h - 2);
        ctx.restore();

        ctx.beginPath();
        ctx.moveTo(x, 24);
        ctx.lineTo(x, h - 14);
        ctx.strokeStyle = 'rgba(179,156,79,0.06)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Bars
      const bw = w / bars.length;
      bars.forEach((bar, i) => {
        bar.h += (bar.target - bar.h) * bar.speed;
        if (Math.random() < 0.02) bar.target = 4 + Math.random() * (h - 30);

        const x = i * bw;
        const bh = bar.h;
        const ratio = bh / (h - 30);

        let color;
        if (ratio > 0.6) color = 'rgba(179,156,79,0.5)';
        else if (ratio > 0.3) color = 'rgba(139,26,43,0.4)';
        else color = 'rgba(179,156,79,0.2)';

        ctx.fillStyle = color;
        ctx.fillRect(x + 0.5, h - 14 - bh, bw - 1, bh);
      });

      // Bottom line
      ctx.beginPath();
      ctx.moveTo(0, h - 14);
      ctx.lineTo(w, h - 14);
      ctx.strokeStyle = 'rgba(179,156,79,0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();

      raf = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener('resize', init);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', init);
    };
  }, []);

  return (
    <div className="relative w-full border border-border/25 bg-slate/[0.02]">
      <canvas
        ref={canvasRef}
        className="block w-full max-w-9xl mx-15 relative z-10"
        style={{ height: '64px', width: '100%' }}
      />
    </div>
  );
}

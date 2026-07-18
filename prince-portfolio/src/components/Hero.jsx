import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { ArrowDown, Mail, ExternalLink } from 'lucide-react';

const roles = ['Frontend Developer', 'UI/UX Designer', 'Problem Solver'];

function Typewriter({ texts, speed = 80, deleteSpeed = 40, pause = 2000 }) {
  const [display, setDisplay] = useState('');
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) {
          setDisplay(current.slice(0, charIdx + 1));
          setCharIdx(c => c + 1);
        } else {
          setTimeout(() => setDeleting(true), pause);
        }
      } else {
        if (charIdx > 0) {
          setDisplay(current.slice(0, charIdx - 1));
          setCharIdx(c => c - 1);
        } else {
          setDeleting(false);
          setIdx((i) => (i + 1) % texts.length);
        }
      }
    }, deleting ? deleteSpeed : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, texts, speed, deleteSpeed, pause]);

  return <span>{display}<span className="animate-pulse text-gold">|</span></span>;
}

function MagneticButton({ children, href, className, ...props }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.3, y: y * 0.3 });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  const Tag = href ? 'a' : 'button';
  return (
    <Tag
      ref={ref}
      href={href}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={`magnetic-btn ${className}`}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const mousePos = useRef({ x: 0, y: 0 });
  const gridRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-16 pt-28 overflow-hidden bg-clay"
    >
      {/* Scroll-driven parallax */}
      <motion.div style={{ y, opacity, scale }} className="relative z-10 flex-1 flex flex-col justify-end">
        {/* Blueprint grid — mouse reactive */}
        <div
          ref={gridRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(#E3DEC8 1px, transparent 1px),
              linear-gradient(90deg, #E3DEC8 1px, transparent 1px),
              linear-gradient(#000000 0.5px, transparent 0.5px),
              linear-gradient(90deg, #000000 0.5px, transparent 0.5px)
            `,
            backgroundSize: '80px 80px, 80px 80px, 40px 40px, 40px 40px',
            WebkitMaskImage: `radial-gradient(circle 300px at ${mouse.x}px ${mouse.y}px, transparent 0%, black 100%)`,
            maskImage: `radial-gradient(circle 300px at ${mouse.x}px ${mouse.y}px, transparent 0%, black 100%)`,
            opacity: 0.12,
          }}
        />

        {/* Warm gradient glow — follows mouse */}
        <div
          className="absolute pointer-events-none transition-all duration-1000"
          style={{
            left: mouse.x - 300,
            top: mouse.y - 300,
            width: 600,
            height: 600,
            background: 'radial-gradient(circle, rgba(179,156,79,0.06), transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex items-center gap-3 mb-8"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#541E24] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#541E24]" />
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#541E24] uppercase">
            Available for work & collaborations
          </span>
        </motion.div>

        {/* Main headline */}
        <div className="relative z-10 max-w-8xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-4 block">
              Building the web, one pixel at a time
            </span>
            <h1
              className="font-display font-bold leading-[0.9] text-slate"
              style={{ fontSize: 'clamp(3rem, 8vw, 9rem)' }}
            >
              I design & build
              <br />
              <span className="text-wine">
                <Typewriter texts={roles} />
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-gray/80 max-w-xl text-[15px] md:text-[16px] leading-relaxed mt-8 mb-10"
          >
            I'm <span className="text-wine font-semibold">Prince</span>, a frontend-focused developer crafting
            premium, high-performance web experiences. I transform complex problems into
            clean, intuitive interfaces that users love.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              href="#work"
              className="group inline-flex items-center gap-2.5 bg-slate text-white font-display font-semibold px-7 py-3.5 rounded-xl hover:bg-gold transition-all duration-300 shadow-button text-sm tracking-wide"
            >
              View My Work
              <ExternalLink size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="group inline-flex items-center gap-2.5 border-2 border-slate/20 text-slate font-display font-semibold px-7 py-3.5 rounded-xl hover:border-gold/50 hover:text-gold transition-all duration-300 text-sm tracking-wide"
            >
              <Mail size={15} />
              Let's Talk
            </MagneticButton>
            <a
              href="/Prince_Shrestha_CV.pdf"
              download
              className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] text-muted hover:text-slate transition-all duration-300 px-4 py-3"
            >
              <span className="w-6 h-px bg-muted group-hover:w-8 group-hover:bg-slate transition-all duration-300" />
              Resume
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="relative z-10 flex items-center gap-3 mt-16 md:mt-20"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} className="text-muted" />
        </motion.div>
        <span className="font-mono text-[9px] tracking-[0.3em] text-muted uppercase">Scroll</span>
        <div className="flex-1 max-w-[200px] h-px bg-gradient-to-r from-border to-transparent ml-2" />
      </motion.div>
    </section>
  );
}

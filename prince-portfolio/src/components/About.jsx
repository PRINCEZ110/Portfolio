import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

/* ─── Animated Counter ─── */
function AnimatedCounter({ value, suffix = '', label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const start = performance.now();
    let frame;

    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayed(Math.floor(eased * value));
      if (t < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <div ref={ref} className="group cursor-default">
      <span className="block text-5xl md:text-6xl font-josefin font-bold text-[#F5F5F2] transition-all duration-500 group-hover:scale-110 group-hover:[filter:drop-shadow(0_0_20px_rgba(84,30,36,0.3))]">
        {typeof value === 'number' ? displayed : value}{suffix}
      </span>
      <span className="block text-[11px] tracking-[0.25em] uppercase text-[#9B9B9B]/70 mt-2 relative inline-block after:block after:h-px after:bg-[#541E24]/50 after:scale-x-0 after:origin-left after:transition-transform after:duration-500 group-hover:after:scale-x-100">
        {label}
      </span>
    </div>
  );
}

/* ─── Infinite ─── */
function InfinityValue() {
  return (
    <span className="block text-5xl md:text-6xl font-josefin font-bold text-[#541E24] transition-all duration-500 group-hover:scale-110 group-hover:[filter:drop-shadow(0_0_20px_rgba(84,30,36,0.3))]">
      ∞
    </span>
  );
}

/* ─── Skill Card ─── */
const skillData = [
  { category: 'Frontend', items: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Java', 'JSP', 'Servlet', 'JDBC', 'MySQL'] },
  { category: 'Design', items: ['UI/UX Design', 'Responsive Design', 'Figma'] },
  { category: 'Tools', items: ['Git', 'GitHub', 'MVC Architecture', 'BCrypt'] },
];

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const skillReveal = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function SkillCard({ category, items }) {
  return (
    <motion.div
      variants={skillReveal}
      className="group border-t border-white/10 pt-5 transition-all duration-500 hover:border-[#541E24]/40 hover:translate-y-[-2px]"
    >
      <span className="text-[10px] tracking-[0.25em] uppercase text-[#9B9B9B]/50 font-lato block mb-4 transition-colors duration-300 group-hover:text-[#541E24]/60">
        {category}
      </span>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item}>
            <span className="text-sm text-[#F5F5F2]/60 font-josefin tracking-wide transition-colors duration-300 hover:text-[#F5F5F2]">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ─── Letter Animation ─── */
function AnimatedHeading({ text, className, as: Tag = 'h2' }) {
  const letters = text.split('');

  return (
    <Tag className={className} style={{ fontSize: 'clamp(7rem, 10vw, 11rem)' }}>
      {letters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 80, rotateX: -20 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
          style={{ letterSpacing: '-0.04em' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </Tag>
  );
}

/* ─── Magnetic Button ─── */
function MagneticButton({ children, className }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / 8;
    const dy = (e.clientY - cy) / 8;
    setPos({ x: dx, y: dy });
  }, []);

  const onMouseLeave = useCallback(() => setPos({ x: 0, y: 0 }), []);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Spotlight ─── */
function useSpotlight() {
  const ref = useRef(null);
  const [spot, setSpot] = useState({ x: '50%', y: '50%', opacity: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setSpot({ x: `${x}%`, y: `${y}%`, opacity: 1 });
    };

    const onLeave = () => setSpot((s) => ({ ...s, opacity: 0 }));

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return { ref, spot };
}

/* ─── Main Component ─── */
export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imgParallax = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60]);
  const contentParallax = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30]);
  const bgGlow = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.2, 0.5, 0.5, 0.2]);

  const { ref: spotlightRef, spot } = useSpotlight();
  const statsRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-[#0D0D0D] overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* Blueprint grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,245,242,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,245,242,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          opacity: 0.04,
        }}
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
          opacity: 0.5,
        }}
      />

      {/* Radial glow */}

      <motion.div
        className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ opacity: bgGlow, background: 'radial-gradient(circle, rgba(84,30,36,0.06), transparent 70%)' }}
      />
      <motion.div
        className="absolute bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ opacity: bgGlow, background: 'radial-gradient(circle, rgba(84,30,36,0.04), transparent 70%)' }}
      />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 relative z-10 h-full">
        <div className="grid md:grid-cols-2 min-h-screen items-center gap-12 md:gap-16 lg:gap-20 py-16 md:py-0">
          {/* ═══ LEFT — Image ═══ */}
          <motion.div
            ref={spotlightRef}
            style={{ y: imgParallax }}
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] md:aspect-auto md:h-[85vh] max-h-[900px] w-full"
          >
            {/* Spotlight */}
            <motion.div
              className="absolute inset-0 z-20 pointer-events-none rounded-[32px]"
              style={{
                background: `radial-gradient(600px circle at ${spot.x} ${spot.y}, rgba(84,30,36,0.08), transparent 60%)`,
                opacity: spot.opacity,
                transition: 'opacity 0.3s ease',
              }}
            />

            {/* Geometric lines behind */}
            <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full border border-white/[0.03] pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full bg-[#541E24]/[0.04] blur-3xl pointer-events-none" />

            <div
              className="relative h-full w-full overflow-hidden rounded-[32px] group cursor-none"
              style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,245,242,0.05)' }}
            >
              {/* Grain */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
                  opacity: 0.6,
                  mixBlendMode: 'overlay',
                }}
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-black/10" />

              {/* Vignette */}
              <div
                className="absolute inset-0 z-[2] pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.4) 100%)',
                }}
              />

              <motion.img
                src="./image.png"
                alt="Prince Shrestha"
                className="h-full w-full object-cover transition-all duration-[0.8s] ease-out group-hover:scale-105 group-hover:brightness-110"
                style={{ filter: 'grayscale(30%) sepia(10%) contrast(105%)' }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* ─── Floating ABOUT ME Button ─── */}
              <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                <MagneticButton className="pointer-events-auto">
                  <motion.div
                    className="w-28 h-28 md:w-32 md:h-32 rounded-full border border-white/60 flex items-center justify-center backdrop-blur-md cursor-pointer group/btn"
                    style={{ background: 'rgba(255,255,255,0.04)' }}
                    whileHover={{ scale: 1.12, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  >
                    <span className="text-[10px] tracking-[0.25em] uppercase text-white/80 font-lato">
                      ABOUT<br />ME
                    </span>
                  </motion.div>
                </MagneticButton>
              </div>
            </div>
          </motion.div>

          {/* ═══ RIGHT — Content ═══ */}
          <motion.div
            style={{ y: contentParallax }}
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center py-8"
          >
            {/* ABOUT label */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-[10px] tracking-[0.3em] uppercase text-[#541E24]/80 font-lato block mb-8"
            >
              About
            </motion.span>

            {/* PRINCE heading */}
            <AnimatedHeading
              text="PRINCE"
              className="font-josefin font-bold text-[#F5F5F2] leading-[0.85] mb-6"
            />

            {/* Subtitle + Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-4 mb-10"
            >
              <span className="text-lg md:text-xl font-josefin font-light text-[#F5F5F2]/80 tracking-wide">
                Frontend Developer
              </span>
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#9B9B9B]/50 font-lato border border-white/10 px-3 py-1 rounded-full">
                NEPAL
              </span>
            </motion.div>

            {/* Editorial Statement */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-xl font-lato text-[#F5F5F2]/90 leading-relaxed mb-8 tracking-wide"
              style={{ maxWidth: '650px' }}
            >
              Building premium digital experiences through thoughtful design, clean code, and meaningful interactions.
            </motion.p>

            {/* Body Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4 mb-14"
              style={{ maxWidth: '650px' }}
            >
              <p className="text-[15px] md:text-base font-lato text-[#9B9B9B]/80 leading-relaxed">
                Hi, I'm Prince. I'm a frontend developer passionate about building elegant digital experiences using React, Tailwind CSS, JavaScript, and modern UI design.
              </p>
              <p className="text-[15px] md:text-base font-lato text-[#9B9B9B]/80 leading-relaxed">
                Every project combines clean architecture, accessibility, performance, and refined visual design to create seamless user experiences.
              </p>
            </motion.div>

            {/* ─── Statistics ─── */}
            <motion.div
              ref={statsRef}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-14 md:gap-20 mb-14 pb-14 border-b border-white/10"
            >
              <AnimatedCounter value={3} suffix="+" label="Projects" />
              <AnimatedCounter value={3} suffix="+" label="Years Learning" />
              <div className="group cursor-default">
                <InfinityValue />
                <span className="block text-[11px] tracking-[0.25em] uppercase text-[#9B9B9B]/70 mt-2 relative inline-block after:block after:h-px after:bg-[#541E24]/50 after:scale-x-0 after:origin-left after:transition-transform after:duration-500 group-hover:after:scale-x-100">
                  Curiosity
                </span>
              </div>
            </motion.div>

            {/* ─── Skills ─── */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10"
            >
              {skillData.map((s) => (
                <SkillCard key={s.category} {...s} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

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
    <div ref={ref} className="group">
      <span className="block text-4xl md:text-5xl font-josefin font-bold text-ivory transition-transform duration-500 group-hover:scale-105">
        {typeof value === 'number' ? displayed : value}{suffix}
      </span>
      <span className="block text-[11px] tracking-[0.2em] uppercase text-muteddark/70 mt-1.5 relative inline-block after:block after:h-px after:bg-wine/40 after:scale-x-0 after:origin-left after:transition-transform after:duration-500 group-hover:after:scale-x-100">
        {label}
      </span>
    </div>
  );
}

/* ─── Infinite Symbol ─── */
function InfinityValue() {
  return (
    <span className="block text-4xl md:text-5xl font-josefin font-bold text-wine transition-transform duration-500 group-hover:scale-105">
      ∞
    </span>
  );
}

/* ─── Skill Category Cards (carrierescene.ca style) ─── */
const skillData = [
  {
    id: '01',
    category: 'Frontend',
    items: ['React.js', 'HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'],
    extra: 0,
  },
  {
    id: '02',
    category: 'Backend',
    items: ['Java', 'JSP', 'Servlet', 'JDBC', 'MySQL'],
    extra: 0,
  },
  {
    id: '03',
    category: 'Design',
    items: ['UI/UX Design', 'Responsive Design', 'Figma'],
    extra: 0,
  },
  {
    id: '04',
    category: 'Tools',
    items: ['Git', 'GitHub', 'MVC Architecture', 'BCrypt'],
    extra: 0,
  },
];

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const cardReveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

function SkillCard({ id, category, items, extra }) {
  return (
    <motion.div
      variants={cardReveal}
      className="group relative border-t border-white/10 pt-6 transition-all duration-500 hover:border-wine/30"
    >
      <span className="text-5xl md:text-6xl font-josefin font-bold text-white/5 transition-colors duration-500 group-hover:text-wine/15 leading-none block mb-2">
        {id}
      </span>
      <h3 className="text-base md:text-lg font-josefin font-semibold text-ivory mb-4 tracking-wide">
        {category}
      </h3>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item}>
            <span className="inline-block text-[11px] tracking-[0.12em] uppercase text-muteddark/50 font-lato border border-white/10 px-3 py-1 rounded-sm transition-all duration-300 hover:border-wine/30 hover:text-ivory/80">
              {item}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="text-[10px] tracking-[0.2em] uppercase text-wine/50 font-lato">
          → {items.length} maîtrise
        </span>
      </div>
    </motion.div>
  );
}

/* ─── Magnetic Heading ─── */
function MagneticHeading({ children, className, as: Tag = 'h2' }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / 12;
    const dy = (e.clientY - cy) / 12;
    setPos({ x: dx, y: dy });
  }, []);

  const onMouseLeave = useCallback(() => setPos({ x: 0, y: 0 }), []);

  return (
    <Tag
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </Tag>
  );
}

/* ─── Main Component ─── */
export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageParallax = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40]);
  const contentParallax = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);
  const bgGlowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.2, 0.5, 0.5, 0.2]);

  const descriptionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32 bg-night overflow-hidden"
    >
      {/* Blueprint grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(247,245,242,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(247,245,242,0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          opacity: 0.05,
        }}
      />

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Radial glow */}
      <motion.div
        className="absolute top-1/3 -left-1/4 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          opacity: bgGlowOpacity,
          background: 'radial-gradient(circle, rgba(84,30,36,0.08), transparent 70%)',
        }}
      />

      <div className="max-w-8xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 lg:gap-24 items-start">
          {/* ═══ LEFT COLUMN — Sticky ═══ */}
          <motion.div
            className="md:sticky md:top-28"
            style={{ y: contentParallax }}
          >
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10px] tracking-[0.25em] uppercase text-wine/70 font-lato block mb-8"
            >
              About
            </motion.span>

            <div className="relative">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -left-6 top-0 w-px h-full origin-top bg-gradient-to-b from-wine/40 via-wine/10 to-transparent"
              />

              <MagneticHeading
                as="h2"
                className="font-josefin font-bold text-ivory leading-[0.92] mb-6"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
              >
                Hi,<br />
                <span className="text-wine">I'm Prince</span>
              </MagneticHeading>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-lato text-muteddark/60 text-sm tracking-wide leading-relaxed"
            >
              Web Designer<br />&amp; Frontend Developer
            </motion.p>

            {/* Decorative large outlined number (carrierescene.ca style) */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hidden md:block mt-16 select-none"
            >
              <span className="text-[12rem] font-josefin font-bold text-transparent leading-none"
                style={{ WebkitTextStroke: '1px rgba(247,245,242,0.04)' }}
              >
                04
              </span>
            </motion.div>
          </motion.div>

          {/* ═══ RIGHT COLUMN ═══ */}
          <motion.div style={{ y: imageParallax }}>
            {/* ─── Portrait ─── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-16 md:mb-20"
            >
              <div className="absolute -top-10 -right-10 w-48 h-48 md:w-64 md:h-64 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-wine/5 blur-3xl pointer-events-none" />

              <div
                className="relative overflow-hidden rounded-[28px]"
                style={{
                  boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(247,245,242,0.06)',
                }}
              >
                <div
                  className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E")`,
                    opacity: 0.5,
                  }}
                />

                <motion.img
                  src="./image.png"
                  alt="Prince Shrestha"
                  className="w-full h-[400px] md:h-[480px] object-cover object-center"
                  style={{
                    filter: 'grayscale(100%) sepia(25%) contrast(105%) brightness(85%)',
                  }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>

            {/* ─── Editorial Paragraphs ─── */}
            <div ref={descriptionRef} className="space-y-6 mb-16 max-w-prose">
              {[
                'I design and build refined digital experiences that combine modern aesthetics with high-performance engineering.',
                'Every interface is crafted with precision, balancing visual elegance, usability, accessibility, and performance to create products that feel effortless across every interaction.',
                'My passion lies in transforming ideas into polished digital products through thoughtful design systems, scalable frontend architecture, and continuous learning.',
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
                  className="text-ivory/65 text-base md:text-lg leading-relaxed font-lato tracking-wide"
                  style={{ maxWidth: '68ch' }}
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* ─── Statistics ─── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-x-16 gap-y-8 mb-16 pb-16 border-b border-white/10"
            >
              <AnimatedCounter value={3} suffix="+" label="Projects Shipped" />
              <AnimatedCounter value={3} suffix="+" label="Years Learning" />
              <div className="group">
                <InfinityValue />
                <span className="block text-[11px] tracking-[0.2em] uppercase text-muteddark/70 mt-1.5 relative inline-block after:block after:h-px after:bg-wine/40 after:scale-x-0 after:origin-left after:transition-transform after:duration-500 group-hover:after:scale-x-100">
                  Curiosity
                </span>
              </div>
            </motion.div>

            {/* ─── Skills (carrierescene.ca /metiers style numbered cards) ─── */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12"
            >
              {skillData.map((s) => (
                <SkillCard key={s.id} {...s} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

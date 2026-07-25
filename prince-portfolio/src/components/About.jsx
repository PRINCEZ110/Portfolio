import { useState, useEffect, useRef } from 'react';
import { m, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { SiReact, SiJavascript, SiHtml5, SiCss, SiTailwindcss,
  SiOpenjdk, SiApache, SiMysql,
  SiFigma, SiGit, SiGithub } from 'react-icons/si';
import { Database, Palette, Monitor, Shield, Server } from 'lucide-react';

const starV = (delay) => ({
  hidden: { opacity: 0, rotate: 0, scale: 0 },
  visible: {
    opacity: 0.2,
    rotate: 360,
    scale: 1,
    transition: { duration: 5, repeat: Infinity, ease: 'linear', delay }
  }
});

const starRevV = (delay) => ({
  hidden: { opacity: 0, rotate: 0, scale: 0 },
  visible: {
    opacity: 0.2,
    rotate: -360,
    scale: 1,
    transition: { duration: 6, repeat: Infinity, ease: 'linear', delay }
  }
});

const bobV = (delay) => ({
  hidden: { opacity: 0, y: 0 },
  visible: {
    opacity: 0.2,
    y: [0, -20, 0],
    transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay }
  }
});

const scaleV = (delay) => ({
  hidden: { opacity: 0, scale: 0.2 },
  visible: {
    opacity: 0.15,
    scale: [0.2, 1.2, 0.2],
    transition: { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay }
  }
});

const stars = [
  { fs: 28, t: '6%', l: '5%', d: 0, rev: false, bp: 'md' },
  { fs: 22, t: '10%', r: '12%', d: 0.25, rev: true, bp: 'md' },
  { fs: 30, t: '22%', l: '50%', d: 0.5, rev: false, bp: 'md' },
  { fs: 18, t: '18%', r: '4%', d: 0.75, rev: true, bp: 'md' },
  { fs: 24, t: '35%', l: '8%', d: 1, rev: false, bp: 'md' },
  { fs: 26, t: '38%', r: '10%', d: 1.25, rev: true, bp: 'md' },
  { fs: 32, t: '50%', l: '3%', d: 1.5, rev: true, bp: 'lg' },
  { fs: 20, t: '52%', l: '55%', d: 1.75, rev: false, bp: 'lg' },
  { fs: 28, t: '68%', r: '6%', d: 2, rev: false, bp: 'lg' },
  { fs: 18, t: '75%', l: '12%', d: 2.25, rev: true, bp: 'lg' },
  { fs: 24, t: '88%', r: '15%', d: 2.5, rev: false, bp: 'lg' },
  { fs: 20, t: '92%', l: '45%', d: 2.75, rev: true, bp: 'lg' },
];

const bobs = [
  { s: 12, t: '5%', r: '25%', d: 0 },
  { s: 10, t: '12%', l: '3%', d: 0.2 },
  { s: 8, t: '20%', l: '40%', d: 0.5 },
  { s: 12, t: '28%', r: '20%', d: 0.75 },
  { s: 8, t: '42%', l: '15%', d: 1 },
  { s: 10, t: '48%', r: '3%', d: 1.25 },
  { s: 12, t: '58%', l: '50%', d: 1.5 },
  { s: 8, t: '65%', r: '25%', d: 1.75 },
  { s: 10, t: '78%', l: '5%', d: 2 },
  { s: 8, t: '85%', r: '35%', d: 2.25 },
  { s: 12, t: '95%', l: '20%', d: 2.5 },
];

const squares = [
  { w: 20, h: 20, rot: 45, t: '2%', l: '30%', d: 0.1, fill: false, bp: 'md' },
  { w: 16, h: 16, rot: 0, t: '15%', l: '60%', d: 0.4, fill: false, bp: 'md' },
  { w: 12, h: 12, rot: 12, t: '25%', r: '8%', d: 0.7, fill: true, bp: 'md' },
  { w: 16, h: 16, rot: 0, t: '32%', l: '45%', d: 1, fill: false, bp: 'md' },
  { w: 20, h: 20, rot: 22, t: '45%', r: '15%', d: 1.3, fill: false, bp: 'md' },
  { w: 12, h: 12, rot: 0, t: '55%', l: '5%', d: 1.6, fill: true, bp: 'md' },
  { w: 16, h: 16, rot: 35, t: '62%', r: '50%', d: 1.9, fill: false, bp: 'lg' },
  { w: 20, h: 20, rot: 0, t: '72%', r: '5%', d: 2.2, fill: false, bp: 'lg' },
  { w: 12, h: 12, rot: 15, t: '82%', l: '35%', d: 2.5, fill: true, bp: 'lg' },
  { w: 16, h: 16, rot: 0, t: '90%', l: '55%', d: 2.8, fill: false, bp: 'lg' },
];

const black = '#000000';

function DecorativeElements() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" style={{ zIndex: 1 }}>
      {stars.map((s, i) => {
        const V = s.rev ? starRevV : starV;
        const hide = s.bp === 'lg' ? 'hidden lg:block' : 'hidden md:block';
        return (
          <m.div key={`s${i}`} custom={s.d} variants={V(s.d)} initial="hidden" animate="visible"
            className={`absolute pointer-events-none ${hide}`}
            style={{ color: black, fontSize: s.fs, top: s.t, left: s.l, right: s.r, lineHeight: 1 }}>★</m.div>
        );
      })}
      {bobs.map((b, i) => (
        <m.div key={`b${i}`} custom={b.d} variants={bobV(b.d)} initial="hidden" animate="visible"
          className="absolute pointer-events-none hidden md:block"
          style={{ top: b.t, left: b.l, right: b.r }}>
          <div style={{ width: b.s, height: b.s, borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.2)' }} />
        </m.div>
      ))}
      {squares.map((sq, i) => {
        const hide = sq.bp === 'lg' ? 'hidden lg:block' : 'hidden md:block';
        return (
          <m.div key={`sq${i}`} custom={sq.d} variants={scaleV(sq.d)} initial="hidden" animate="visible"
            className={`absolute pointer-events-none ${hide}`}
            style={{ top: sq.t, left: sq.l, right: sq.r }}>
            <div style={{
              width: sq.w, height: sq.h,
              border: sq.fill ? 'none' : '1px solid rgba(0,0,0,0.2)',
              backgroundColor: sq.fill ? 'rgba(0,0,0,0.1)' : 'transparent',
              transform: `rotate(${sq.rot}deg)`,
              borderRadius: sq.fill ? 2 : 0,
            }} />
          </m.div>
        );
      })}
    </div>
  );
}

/* ─── Animated Counter ─── */
function AnimatedCounter({ value, suffix = '', label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
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
      <span className="block text-4xl md:text-5xl font-anton text-ivory leading-none tracking-tight transition-transform duration-300 group-hover:scale-105">
        {displayed}{suffix}
      </span>
      <span className="block text-[10px] tracking-[0.2em] uppercase text-ivory/70 font-lato mt-1 relative after:block after:h-[2px] after:bg-ivory after:scale-x-0 after:origin-left after:transition-transform after:duration-300 group-hover:after:scale-x-100">
        {label}
      </span>
    </div>
  );
}

/* ─── Skill icons mapping ─── */
const skillIcons = {
  'React.js': SiReact,
  'JavaScript': SiJavascript,
  'HTML5': SiHtml5,
  'CSS3': SiCss,
  'Tailwind CSS': SiTailwindcss,
  'Java': SiOpenjdk,
  'JSP': Server,
  'Servlet': SiApache,
  'JDBC': Database,
  'MySQL': SiMysql,
  'UI/UX Design': Palette,
  'Responsive Design': Monitor,
  'Figma': SiFigma,
  'Git': SiGit,
  'GitHub': SiGithub,
  'MVC Architecture': Server,
  'BCrypt': Shield,
};

const skillColors = {
  'React.js': '#61DAFB',
  'JavaScript': '#F7DF1E',
  'HTML5': '#E34F26',
  'CSS3': '#1572B6',
  'Tailwind CSS': '#06B6D4',
  'Java': '#007396',
  'JSP': '#E85C33',
  'Servlet': '#D22128',
  'JDBC': '#4479A1',
  'MySQL': '#4479A1',
  'UI/UX Design': '#FF61F6',
  'Responsive Design': '#4285F4',
  'Figma': '#F24E1E',
  'Git': '#F05032',
  'GitHub': '#181717',
  'MVC Architecture': '#6DB33F',
  'BCrypt': '#47A248',
};

/* ─── Skill Card ─── */
const skillData = [
  { category: 'Frontend', items: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Java', 'JSP', 'Servlet', 'JDBC', 'MySQL'] },
  { category: 'Design', items: ['UI/UX Design', 'Responsive Design', 'Figma'] },
  { category: 'Tools', items: ['Git', 'GitHub', 'MVC Architecture', 'BCrypt'] },
];

const staggerSkill = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const skillCardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const logoVariant = {
  hidden: { scale: 0, rotate: -15 },
  show: { scale: 1, rotate: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

function SkillCard({ category, items }) {
  return (
    <m.div
      variants={skillCardVariant}
      className="border-t border-ivory/20 pt-4 transition-all duration-400 group"
    >
      <span className="text-[10px] tracking-[0.25em] uppercase text-ivory/60 font-lato block mb-4">
        {category}
      </span>
      <div className="flex flex-wrap gap-3">
        {items.map((item) => {
          const Icon = skillIcons[item];
          const color = skillColors[item];
          return (
            <m.div
              key={item}
              variants={logoVariant}
              whileHover={{ y: -4, scale: 1.05 }}
              className="relative flex flex-col items-center gap-1.5 p-2.5 rounded-lg bg-ivory/[0.06] border border-transparent transition-all duration-300 hover:bg-ivory/[0.1] hover:border-ivory/20 hover:shadow-sm"
            >
              <span className="relative">
                <Icon
                  style={{ color }}
                  className="text-xl md:text-2xl transition-all duration-300"
                />
                <m.span
                  className="absolute -inset-2 rounded-full opacity-0 pointer-events-none"
                  style={{ background: `${color}15` }}
                  whileHover={{ opacity: 1, scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                />
              </span>
              <span className="text-[9px] text-ivory/70 font-lato tracking-tight whitespace-nowrap">
                {item}
              </span>
            </m.div>
          );
        })}
      </div>
    </m.div>
  );
}

/* ─── Decorative Background ─── */

const developerChars = Array.from("Developer", (c, i) => ({ char: c, id: `dc-${i}` }));
const fullstackChars = Array.from("Full-stack", (c, i) => ({ char: c, id: `fs-${i}` }));

/* ─── Main ─── */
export default function About() {
  const statsRef = useRef(null);
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageParallax = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [12, -12]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-12, 12]), { stiffness: 200, damping: 30 });

  function handleMouseMove(e) {
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-[#75846A] overflow-hidden"
    >
      <DecorativeElements />

      <div className="max-w-[1600px] mx-auto px-8 md:px-12 lg:px-16 relative z-10 py-20 md:py-28">
        {/* Eyebrow label */}
        <m.span
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-[10px] tracking-[0.3em] uppercase text-ivory/70 font-lato block mb-10 md:mb-14"
        >
          About
        </m.span>

        <div className="grid md:grid-cols-[45%_55%] gap-12 md:gap-16 lg:gap-20 items-start">
          {/* ═══ LEFT — Image with 3D tilt ═══ */}
          <m.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative md:sticky md:top-24"
            style={{ perspective: 1200 }}
          >
            <m.div
              ref={imageRef}
              className="relative overflow-hidden"
              style={{
                y: imageParallax,
                borderRadius: '0',
                border: '4px solid rgba(247,245,242,0.3)',
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <m.img
                src="/Aboutimage.jpg"
                alt="Prince Shrestha"
                className="w-full h-auto object-cover"
                style={{ filter: 'none' }}
                loading="lazy"
              />
            </m.div>
          </m.div>

          {/* ═══ RIGHT — Content ═══ */}
          <m.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* "Developer" heading with letter stagger */}
            <div className="overflow-hidden">
              <m.h1
                className="font-anton text-ivory leading-[0.85] tracking-tight"
                style={{ fontSize: 'clamp(4rem, 10vw, 9rem)' }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {developerChars.map(({ char, id }, idx) => (
                  <m.span
                    key={id}
                    className="inline-block transition-colors duration-200 hover:text-gold"
                    custom={idx}
                    variants={{
                      hidden: { opacity: 0, y: 60, rotateX: -30 },
                      visible: (i) => ({
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        transition: {
                          delay: i * 0.045,
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      }),
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </m.span>
                ))}
              </m.h1>
            </div>

            {/* Subtitle + badge */}
            <m.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-4 mt-4 mb-6"
            >
              <span className="text-sm md:text-base tracking-[0.2em] uppercase font-josefin font-semibold text-ivory/90">
                {fullstackChars.map(({ char, id }, idx) => (
                  <m.span
                    key={id}
                    className="inline-block transition-colors duration-200 cursor-default hover:text-gold"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.03, duration: 0.3 }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </m.span>
                ))}
              </span>
             
            </m.div>

            {/* Bold subheading */}
            <m.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="text-base md:text-lg text-ivory/90 font-josefin font-bold leading-relaxed mb-5"
            >
              Building premium digital experiences through thoughtful design, clean code, and meaningful interactions.
            </m.p>

            {/* Body paragraphs */}
            <m.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-3 mb-8"
            >
              <p className="text-sm md:text-[15px] text-ivory/80 font-josefin leading-relaxed">
                Hi, I'm Prince. I'm a full-stack developer passionate about building elegant digital experiences using React, Tailwind CSS, JavaScript, and modern UI design.
              </p>
              <p className="text-sm md:text-[15px] text-ivory/80 font-josefin leading-relaxed">
                Every project combines clean architecture, accessibility, performance, and refined visual design to create seamless user experiences.
              </p>
            </m.div>

            {/* Link */}
            <m.a
              href="#work"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-ivory/80 font-josefin font-semibold border-b border-ivory/30 pb-1 transition-all duration-300 hover:border-ivory hover:text-ivory"
            >
              View Work →
            </m.a>

            {/* ─── Statistics ─── */}
            <m.div
              ref={statsRef}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-10 md:gap-16 mt-10 pt-8 border-t border-ivory/20"
            >
              <AnimatedCounter value={3} suffix="+" label="Projects" />
              <AnimatedCounter value={3} suffix="+" label="Years Learning" />
              <div className="group">
                <span className="block text-4xl md:text-5xl font-anton text-ivory leading-none tracking-tight transition-transform duration-300 group-hover:scale-105">∞</span>
                <span className="block text-[10px] tracking-[0.2em] uppercase text-ivory/60 font-lato mt-1">Curiosity</span>
              </div>
            </m.div>

            {/* ─── Skills ─── */}
            <m.div
              variants={staggerSkill}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-30px' }}
              className="grid grid-cols-2 gap-x-6 gap-y-6 mt-10"
            >
              {skillData.map((s) => (
                <SkillCard key={s.category} {...s} />
              ))}
            </m.div>
          </m.div>
        </div>
      </div>
    </section>
  );
}

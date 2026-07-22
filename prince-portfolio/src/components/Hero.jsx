import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const roles = ['Developer', 'Designer', 'Problem Solver'];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0.25, 0.6], [500, 0]);

  useEffect(() => {
    const t = setInterval(() => setRoleIdx(i => (i + 1) % roles.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-16 pt-28 relative overflow-hidden bg-clay">
      {/* Profile image — scroll-revealed */}
      <motion.img
        src="./image.png"
        alt="Profile"
        className="absolute right-4 md:right-12 lg:right-20 z-30 pointer-events-none select-none"
        style={{
          height: 'clamp(22rem, 55vw, 40rem)',
          y: imgY,
          bottom: 0,
          objectFit: 'contain',
          objectPosition: 'center bottom',
          filter: 'drop-shadow(0 25px 25px rgba(0,0,0,0.15))',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#E3DEC8 1px, transparent 1px), linear-gradient(90deg, #E3DEC8 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
      {/* Black blueprint grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(#000000 0.5px, transparent 0.5px), linear-gradient(90deg, #000000 0.5px, transparent 0.5px)`,
          backgroundSize: '40px 40px',
          opacity: 0.08,
        }}
      />
      {/* Subtle warm gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/10 to-transparent pointer-events-none" />

      {/* Status pill */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-2 mb-10"
      >
        <span className="w-2 h-2 rounded-full bg-[#8B1A2B] animate-pulse" />
        <span className="text-xs text-[#D4AF37] tracking-widest uppercase" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
          available for work 
        </span>
      </motion.div>

      {/* Main headline */}
      <div className="relative z-10 max-w-8xl mx-auto w-full">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold leading-[0.92] text-slate"
          style={{ fontSize: 'clamp(3.5rem, 9vw, 10rem)', fontFamily: "'Josefin Sans', sans-serif" }}
        >
          Web
        </motion.h1>

        <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold leading-[0.92] text-wine overflow-hidden"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 10rem)', fontFamily: "'Josefin Sans', sans-serif" }}
          >
            <motion.span
              key={roleIdx}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              {roles[roleIdx]}
            </motion.span>
          </motion.div>
        </div>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8"
        >
          <p className="font-body text-black max-w-md text-base leading-relaxed" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
            I'm <span className="text-[#8B1A2B]  font-medium">प्रिन्स</span>, a Web designer & developer building modern, responsive websites with clean, fast, user-focused design.
            High-performance digital experiences for clients and businesses.</p>
        </motion.div>
      </div>

      {/* Buttons floated over the photo */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute z-40 flex items-center gap-4 bottom-[2rem] right-[2rem] md:bottom-[clamp(2rem,5vw,5rem)] md:right-[clamp(1rem,6vw,6rem)]"
      >
        <a
          href="#work"
          className="group font-display font-semibold text-slate bg-white/70 backdrop-blur-md border border-white/50 px-5 py-2.5 hover:bg-white hover:border-steel hover:text-steel transition-all duration-300 rounded-xl text-sm shadow-lg"
          style={{ fontFamily: "'Josefin Sans', sans-serif" }}
        >
          View Work
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </a>
        <a
          href="#contact"
          className="group font-display font-semibold text-white bg-slate/90 backdrop-blur-md px-5 py-2.5 hover:bg-gold transition-all duration-300 rounded-xl text-sm shadow-lg"
          style={{ fontFamily: "'Josefin Sans', sans-serif" }}
        >
          Let's Talk
        </a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 right-12 hidden md:flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] text-muted tracking-widest uppercase rotate-90 origin-center translate-y-6">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-12 bg-gradient-to-b from-steel/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}

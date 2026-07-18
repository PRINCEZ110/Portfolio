import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowUpRight, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const ref = useRef(null);
  const controls = useAnimation();

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) controls.start("show");
        else controls.start("hidden");
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [controls]);

  const container = {
    hidden: { opacity: 0, y: 80, filter: "blur(12px)" },
    show: {
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { staggerChildren: 0.12, delayChildren: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  const socials = [
    { icon: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>, href: 'https://github.com/PRINCEZ110', label: 'GitHub' },
    { icon: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>, href: 'https://www.linkedin.com/in/princez-shrestha-b12a0132b/', label: 'LinkedIn' },
    { icon: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>, href: 'https://www.instagram.com/princezstha/?hl=en', label: 'Instagram' },
    { icon: () => <Mail size={15} />, href: 'mailto:princezstha6110@gmail.com', label: 'Email' },
  ];

  return (
    <motion.footer
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={container}
      className="relative overflow-hidden bg-footer"
    >
      {/* Glow */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 opacity-20 pointer-events-none"
      >
        <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 bg-gold/5 blur-[120px]" />
      </motion.div>

      <div className="max-w-8xl mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-28 relative z-10">
        {/* CTA */}
        <motion.div variants={item} className="text-center mb-16">
          <span className="font-mono text-[10px] tracking-[0.25em] text-gold/60 uppercase mb-4 block">Let's work together</span>
          <h2 className="font-display text-[clamp(2.5rem, 6vw, 5rem)] font-bold leading-none tracking-tight text-footertext">
            Have a project in mind?
          </h2>
          <motion.a
            href="mailto:princezstha6110@gmail.com"
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center gap-2 mt-8 font-display text-base text-gold hover:text-gold/80 transition-colors border border-gold/30 px-6 py-3 rounded-xl hover:bg-gold/5"
          >
            princezstha6110@gmail.com
            <ArrowUpRight size={16} />
          </motion.a>
        </motion.div>

        {/* Divider */}
        <motion.div variants={item} className="my-14 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom */}
        <motion.div variants={item} className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="font-display font-semibold text-footertext text-sm">
              Prince<span className="text-wine">.</span> Shrestha
            </p>
            <p className="font-mono text-[10px] text-footertext/40 mt-1">
              Building the web, one pixel at a time
            </p>
          </div>

          <div className="flex gap-3">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3, scale: 1.05 }}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold/10 hover:border-gold/30 transition-all duration-300 group"
                aria-label={s.label}
              >
                <s.icon className="text-footertext/50 group-hover:text-gold transition-colors" />
              </motion.a>
            ))}
          </div>

          <p className="font-mono text-[10px] text-footertext/30 text-center md:text-right">
            &copy; {year} Prince Shrestha
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}

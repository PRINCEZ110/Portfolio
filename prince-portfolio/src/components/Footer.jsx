import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const ref = useRef(null);
  const controls = useAnimation();

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("show"); // scroll DOWN → animate in
        } else {
          controls.start("hidden"); // scroll UP → animate out (reverse)
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [controls]);

  const container = {
    hidden: {
      opacity: 0,
      y: 80,
      filter: "blur(12px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: "blur(10px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const hoverSpring = {
    type: "spring",
    stiffness: 260,
    damping: 18,
  };

  return (
    <motion.footer
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={container}
      className="relative overflow-hidden border-t border-border bg-ink"
    >
      {/* glow */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 opacity-30 pointer-events-none"
      >
        <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 bg-accent/10 blur-[120px]" />
      </motion.div>

      <div className="max-w-9xl mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32 relative z-10">

        {/* NAME */}
        <motion.h2
          variants={item}
          className="font-display text-[clamp(3.5rem,9vw,8rem)] font-bold leading-none tracking-tight text-snow text-center"
        >
          Simple <span className="text-accent">Modern</span> Relaible
        </motion.h2>

        {/* divider */}
        <motion.div
          variants={item}
          className="my-12 h-px bg-gradient-to-r from-transparent via-border to-transparent"
        />

        {/* GRID */}
        <motion.div variants={container} className="grid md:grid-cols-3 gap-12">

          {/* CONTACT */}
          <motion.div variants={item}>
            <p className="text-xs font-mono tracking-[0.35em] text-muted mb-5">
              CONTACT
            </p>

            <motion.a
              href="mailto:princezstha6110@gmail.com"
              whileHover={{ x: 6 }}
              transition={hoverSpring}
              className="group inline-flex items-center gap-2 text-lg text-snow hover:text-accent "
            >
              princezstha6110@gmail.com
              <motion.span
                whileHover={{ rotate: 45 }}
                transition={hoverSpring}
              >
                <ArrowUpRight size={18} />
              </motion.span>
            </motion.a>
          </motion.div>

          {/* NAV */}
          <motion.div variants={item}>
            <p className="text-xs font-mono tracking-[0.35em] text-muted mb-5 text-center">
              NAVIGATION
            </p>

            <div className="flex flex-col items-center gap-4">
              {["Home", "Work", "About", "CV", "Contact"].map((link) => (
                <motion.a
                  key={link}
                  href={link === "Home" ? "#" : `#${link.toLowerCase()}`}
                  whileHover={{ x: 8 }}
                  transition={hoverSpring}
                  className="group text-snow hover:text-accent relative"
                >
                  {link}
                  <span className="absolute left-0 -bottom-1 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* SOCIAL */}
          <motion.div variants={item}>
            <p className="text-xs font-mono tracking-[0.35em] text-muted mb-5 text-right">
              SOCIAL
            </p>

            <div className="flex flex-col items-end gap-4">
              {[
                { label: 'GitHub', href: 'https://github.com/PRINCEZ110' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/princez-shrestha-b12a0132b/' },
                { label: 'Instagram', href: 'https://www.instagram.com/princezstha/?hl=en' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ x: 8 }}
                  transition={hoverSpring}
                  className="group text-snow hover:text-accent relative"
                >
                  {social.label}
                  <span className="absolute left-0 -bottom-1 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* BOTTOM */}
        <motion.div
          variants={item}
          className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-xs font-mono text-muted max-w-xl">
          lets build something great together. currently seeking frontend roles, internships, and freelance projects. feel free to reach out for collaborations, coffee chats, or just to say hi! &#128075;
          </p>

          <p className="text-xs font-mono text-border">
            © {year} Prince Shrestha
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
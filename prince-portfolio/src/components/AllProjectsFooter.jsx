import { m, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/PRINCEZ110",
    icon: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/princez-shrestha-b12a0132b/",
    icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/princezstha/?hl=en",
    icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  },
];

export default function AllProjectsFooter() {
  const year = new Date().getFullYear();
  const ref = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  useEffect(() => {
    const handleMouse = (e) => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <m.footer
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden bg-footer"
    >
      {/* Mouse-following glow */}
      <m.div
        className="absolute pointer-events-none"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          width: 400,
          height: 400,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(179,156,79,0.06), transparent 60%)",
        }}
      />

      {/* Scroll-driven glow */}
      <m.div
        style={{ y: glowY }}
        className="absolute left-1/2 top-0 w-[500px] h-[500px] -translate-x-1/2 pointer-events-none"
      >
        <div className="w-full h-full bg-gold/5 blur-[150px] rounded-full" />
      </m.div>

      <div className="relative z-10 max-w-8xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
        {/* ─── TOP ROW ─── */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 mb-16 md:mb-20">
          {/* LEFT */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="text-[10px] tracking-[0.35em] text-footertext/30 uppercase block mb-4"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Get in Touch
            </span>
            <h2
              className="font-bold text-footertext leading-[1.05] mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontFamily: "'Josefin Sans', sans-serif" }}
            >
              Let&apos;s build
              <br />
              <span className="text-gold">something great.</span>
            </h2>
            <p
              className="text-footertext/40 text-sm leading-relaxed max-w-md mb-6"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Available for full-stack roles, freelance projects, and collaborations.
              Reach out and let&apos;s make it happen.
            </p>
            <m.a
              href="mailto:princezstha6110@gmail.com"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="inline-flex items-center gap-2 text-gold text-sm hover:text-footertext transition-colors"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              princezstha6110@gmail.com
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </m.a>
          </m.div>

          {/* RIGHT */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start md:items-end justify-end"
          >
            {/* SOCIAL */}
            <div className="text-left md:text-right">
              <span
                className="text-[10px] tracking-[0.35em] text-footertext/30 uppercase block mb-4"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                Connect
              </span>
              <div className="flex gap-4">
                {socialLinks.map((s) => (
                  <m.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center border border-footertext/10 hover:border-gold/40 hover:bg-gold/5 transition-all duration-300 group"
                    title={s.label}
                  >
                    <svg
                      className="w-4 h-4 text-footertext/40 group-hover:text-gold transition-colors duration-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d={s.icon} />
                    </svg>
                  </m.a>
                ))}
              </div>
            </div>
          </m.div>
        </div>

        {/* ─── DIVIDER ─── */}
        <m.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent origin-left"
        />

        {/* ─── BOTTOM BAR ─── */}
        <m.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6"
        >
          <div className="flex items-center gap-4">
            <span
              className="text-[10px] text-footertext/25 tracking-wider"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              &copy; {year} Prince Shrestha
            </span>
            <span className="w-px h-3 bg-footertext/10" />
            <span
              className="text-[10px] text-footertext/25"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Based in Itahari, Nepal
            </span>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-transparent border-none cursor-pointer flex items-center gap-1.5 text-[10px] text-footertext/25 hover:text-gold transition-colors duration-300 tracking-wider"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Back to top
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </m.div>
      </div>
    </m.footer>
  );
}

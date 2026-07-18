import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/#about' },
  { label: 'CV', href: '/#cv' },
  { label: 'Contact', href: '/#contact' },
];

export default function ProjectFooter({ projectTitle }) {
  const year = new Date().getFullYear();
  const navigate = useNavigate();

  const handleNav = (href) => {
    if (href.startsWith('/#')) {
      const sectionId = href.substring(2);
      navigate('/');
      requestAnimationFrame(() => {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      });
    } else {
      navigate(href);
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-footer">
      {/* Subtle glow */}
      <div className="absolute left-1/2 top-0 h-px w-[300px] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

      <div className="max-w-8xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">

        {/* CTA line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10"
        >
          <p className="font-['Inter'] text-footertext/60 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            Like this project?{' '}
            <button onClick={() => handleNav('/#contact')} className="text-footertext hover:text-gold transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-gold/50 bg-transparent border-none cursor-pointer font-['Inter'] text-sm md:text-base">
              Let's work together
            </button>
            .
          </p>
        </motion.div>

        {/* Nav links */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10"
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="font-mono text-[10px] tracking-[0.2em] text-footertext/40 uppercase hover:text-gold transition-colors duration-300 bg-transparent border-none cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="font-mono text-[10px] tracking-[0.2em] text-footertext/20 uppercase hover:text-gold transition-colors duration-300"
          >
            ↑ Back to top
          </a>
        </motion.nav>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mb-6" />

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-between gap-3"
        >
          <span className="font-mono text-[9px] tracking-wider text-footertext/30">
            © {year} Prince Shrestha
          </span>
          {projectTitle && (
            <span className="font-mono text-[9px] tracking-wider text-footertext/20 uppercase">
              {projectTitle}
            </span>
          )}
          <span className="font-mono text-[9px] tracking-wider text-footertext/30">
            Crafted with precision
          </span>
        </motion.div>

      </div>
    </footer>
  );
}

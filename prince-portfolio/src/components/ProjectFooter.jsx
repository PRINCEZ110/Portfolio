import { Link } from 'react-router-dom';
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

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-ink">
      {/* Subtle glow */}
      <div className="absolute left-1/2 top-0 h-px w-[300px] -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/10 to-transparent" />

      <div className="max-w-8xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20">

        {/* CTA line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10"
        >
          <p className="font-['Inter'] text-muted text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            Like this project?{' '}
            <Link to="/#contact" className="text-snow hover:text-accent transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-accent/50">
              Let's work together
            </Link>
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
            <Link
              key={link.label}
              to={link.href}
              className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase hover:text-accent transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="font-mono text-[10px] tracking-[0.2em] text-white/20 uppercase hover:text-accent transition-colors duration-300"
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
          <span className="font-mono text-[9px] tracking-wider text-white/15">
            © {year} Prince Shrestha
          </span>
          {projectTitle && (
            <span className="font-mono text-[9px] tracking-wider text-white/10 uppercase">
              {projectTitle}
            </span>
          )}
          <span className="font-mono text-[9px] tracking-wider text-white/15">
            Crafted with precision
          </span>
        </motion.div>

      </div>
    </footer>
  );
}

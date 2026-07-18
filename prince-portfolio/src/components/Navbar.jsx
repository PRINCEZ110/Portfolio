import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'work', href: '#work' },
  { label: 'skills', href: '#skills' },
  { label: 'about', href: '#about' },
  { label: 'experience', href: '#experience' },
  { label: 'cv', href: '#cv' },
  { label: 'contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let current = null;
      links.forEach((link) => {
        const section = document.querySelector(link.href);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = link.label;
          }
        }
      });
      setActive(current);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-20 transition-all duration-500 ${
        scrolled ? 'glass border-b border-border/50' : 'bg-transparent'
      }`}
    >
      <div className="max-w-8xl mx-auto flex items-center justify-between h-16 md:h-20">
        <a
          href="#"
          className="font-display font-semibold text-slate text-base tracking-tight hover:text-wine transition-colors duration-300"
        >
          Prince<span className="text-wine [text-shadow:0_0_10px_rgba(84,30,36,0.3)]">.</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`relative px-3 py-2 font-body text-[13px] tracking-wide transition-all duration-300 rounded-lg ${
                active === l.label
                  ? 'text-wine'
                  : 'text-slate/60 hover:text-slate hover:bg-slate/5'
              }`}
            >
              {l.label}
              {active === l.label && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 bg-wine/5 rounded-lg -z-10"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-4 inline-flex items-center gap-2 bg-slate text-white text-[13px] font-display font-semibold px-5 py-2.5 rounded-xl hover:bg-gold transition-all duration-300 shadow-button"
          >
            Hire Me
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-slate w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate/5 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden glass border-b border-border/50 rounded-b-2xl overflow-hidden"
          >
            <div className="py-4 px-4 flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-xl font-body text-sm tracking-wide transition-all ${
                    active === l.label
                      ? 'text-wine bg-wine/5'
                      : 'text-slate/70 hover:text-slate hover:bg-slate/5'
                  }`}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 bg-slate text-white text-center font-display font-semibold px-4 py-3 rounded-xl hover:bg-gold transition-all duration-300"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'work', href: '#work' },
  { label: 'about', href: '#about' },
  { label: 'cv', href: '#cv' },
  { label: 'contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null); // ✅ no default

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      let current = null; // ✅ start with NO active section

      links.forEach((link) => {
        const section = document.querySelector(link.href);
        if (section) {
          const rect = section.getBoundingClientRect();

          // ✅ better detection (center of screen)
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
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-20 py-5 flex items-center justify-between transition-all duration-300 ${
        scrolled ? 'bg-ink/80 backdrop-blur-md border-b border-border' : ''
      }`}
    >
      <a
        href="#"
        className="font-display font-semibold text-snow text-base tracking-tight"
      >
        Prince<span className="text-accent"> Shrestha</span>
      </a>

      {/* Desktop nav */}
      <nav className="hidden md:flex gap-8">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className={`font-body text-sm tracking-wide transition-all duration-300 ${
              active === l.label
                ? 'text-accent drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]'
                : 'text-muted hover:text-snow'
            }`}
          >
            {l.label}
          </a>
        ))}
      </nav>

      {/* Hire button */}
      <a
        href="#contact"
        className="hidden md:inline-flex items-center gap-2 bg-accent text-ink text-sm font-display font-semibold px-5 py-2 hover:bg-snow transition-colors duration-200"
      >
        hire me
      </a>

      {/* Mobile hamburger */}
      <button
        className="md:hidden text-snow"
        onClick={() => setOpen(!open)}
      >
        <span className="font-mono text-xs">
          {open ? '[×]' : '[≡]'}
        </span>
      </button>
      

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-ink border-b border-border py-6 flex flex-col items-center gap-6 md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`font-display text-xl transition-all ${
                  active === l.label
                    ? 'text-accent drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]'
                    : 'text-snow'
                }`}
              >
                {l.label}
              </a>
            ))}

            <a
              href="#contact"
              className="bg-accent text-ink font-display font-bold px-8 py-3"
            >
              hire me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
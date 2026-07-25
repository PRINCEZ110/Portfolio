import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';

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
        scrolled ? 'bg-clay/92 backdrop-blur-md border-b border-border' : ''
      }`}
    >
      <a
        href="#"
        className="font-display font-semibold text-slate text-base tracking-tight"
      >
        Prince<span className="text-wine [text-shadow:0_0_8px_rgba(139,26,43,0.5),0_0_25px_rgba(139,26,43,0.25)]"> श्रेष्ठ</span>
      </a>

      {/* Desktop nav */}
      <nav className="hidden md:flex gap-8">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className={`font-body text-sm tracking-wide transition-all duration-300 ${
              active === l.label
                ? 'text-wine [text-shadow:0_0_8px_rgba(139,26,43,0.7),0_0_30px_rgba(139,26,43,0.35),0_0_60px_rgba(139,26,43,0.15)]'
                : 'text-wine hover:[text-shadow:0_0_6px_rgba(139,26,43,0.4),0_0_20px_rgba(139,26,43,0.15)]'
            }`}
          >
            {l.label}
          </a>
        ))}
      </nav>

      {/* Hire button */}
      <a
        href="#contact"
        className="hidden md:inline-flex items-center gap-2 bg-slate text-white text-sm font-display font-semibold px-5 py-2.5 rounded-xl hover:bg-[#8B1A2B] transition-all duration-300"
      >
        hire me
      </a>

      {/* Mobile hamburger */}
      <button
        className="md:hidden text-slate w-11 h-11 flex items-center justify-center"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        {open ? (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>
      

      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-border py-6 flex flex-col items-center gap-6 md:hidden shadow-soft"
          >
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`font-display text-xl transition-all ${
                    active === l.label
                    ? 'text-wine [text-shadow:0_0_8px_rgba(139,26,43,0.7),0_0_30px_rgba(139,26,43,0.35),0_0_60px_rgba(139,26,43,0.15)]'
                    : 'text-wine hover:[text-shadow:0_0_6px_rgba(139,26,43,0.4),0_0_20px_rgba(139,26,43,0.15)]'
                }`}
              >
                {l.label}
              </a>
            ))}

            <a
              href="#contact"
              className="bg-slate text-white font-display font-bold px-8 py-3 rounded-xl hover:bg-gold transition-all duration-300"
            >
              hire me
            </a>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
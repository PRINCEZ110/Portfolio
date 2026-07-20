import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToSection } from '../utils/scrollToSection';

const links = [
  { label: 'home', href: '/' },
  { label: 'work', href: '/#work' },
  { label: 'about', href: '/#about' },
  { label: 'cv', href: '/#cv' },
  { label: 'contact', href: '/#contact' },
];

export default function ProjectNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const handleNav = (href) => {
    setOpen(false);
    if (href.startsWith('/#')) {
      const sectionId = href.substring(2);
      navigate('/');
      requestAnimationFrame(() => scrollToSection(sectionId));
    } else {
      navigate(href);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-20 py-4 flex items-center justify-between transition-all duration-300 ${
        scrolled ? 'bg-clay/92 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      {/* Back + Logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/')}
          className="font-mono text-[11px] tracking-wider text-muted hover:text-wine hover:[text-shadow:0_0_12px_rgba(84,30,36,0.4)] transition-all flex items-center gap-1.5"
        >
          <span className="text-sm">←</span>
          <span className="hidden sm:inline">Back</span>
        </button>
        <span className="w-px h-4 bg-border" />
        <a href="/" className="font-display font-semibold text-slate/80 text-sm tracking-tight">
          Prince<span className="text-wine [text-shadow:0_0_10px_rgba(84,30,36,0.3)]"> Shrestha</span>
        </a>
      </div>

      {location.pathname !== '/projects' && (
        <>
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <button
                key={l.label}
                onClick={() => handleNav(l.href)}
                className="font-body text-sm tracking-wide text-wine hover:[text-shadow:0_0_12px_rgba(84,30,36,0.4)] transition-all duration-200"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button className="md:hidden text-slate" onClick={() => setOpen(!open)}>
            <span className="font-mono text-xs">{open ? '[×]' : '[≡]'}</span>
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-full left-0 right-0 bg-white border-b border-border py-6 flex flex-col items-center gap-6 md:hidden shadow-soft"
              >
                {links.map((l) => (
                  <button
                    key={l.label}
                    onClick={() => handleNav(l.href)}
                    className="font-display text-xl text-slate hover:text-wine hover:[text-shadow:0_0_12px_rgba(84,30,36,0.4)] transition-all"
                  >
                    {l.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </header>
  );
}

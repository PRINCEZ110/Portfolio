import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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
    navigate(href);
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
        scrolled ? 'bg-ink/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      {/* Back + Logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/')}
          className="font-mono text-[11px] tracking-wider text-muted hover:text-accent transition-colors flex items-center gap-1.5"
        >
          <span className="text-sm">←</span>
          <span className="hidden sm:inline">Back</span>
        </button>
        <span className="w-px h-4 bg-white/10" />
        <a href="/" className="font-display font-semibold text-snow/80 text-sm tracking-tight">
          Prince<span className="text-accent"> Shrestha</span>
        </a>
      </div>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-6">
        {links.map((l) => (
          <button
            key={l.label}
            onClick={() => handleNav(l.href)}
            className="font-body text-sm tracking-wide text-muted hover:text-snow transition-colors duration-200"
          >
            {l.label}
          </button>
        ))}
      </nav>

      {/* Mobile hamburger */}
      <button className="md:hidden text-snow" onClick={() => setOpen(!open)}>
        <span className="font-mono text-xs">{open ? '[×]' : '[≡]'}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-ink border-b border-white/5 py-6 flex flex-col items-center gap-6 md:hidden"
          >
            {links.map((l) => (
              <button
                key={l.label}
                onClick={() => handleNav(l.href)}
                className="font-display text-xl text-snow hover:text-accent transition-colors"
              >
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

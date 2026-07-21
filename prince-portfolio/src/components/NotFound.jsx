import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';

export default function NotFound() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-sand px-6">
      <div className="text-center max-w-md">
        <m.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-bold text-slate leading-[0.9] mb-6"
          style={{ fontSize: 'clamp(6rem, 20vw, 10rem)', fontFamily: "'Josefin Sans', sans-serif" }}
        >
          404
        </m.h1>

        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-gray text-sm md:text-base leading-relaxed mb-8"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          The page you're looking for doesn't exist or has been moved.
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase px-8 py-4 rounded-xl border border-gold/30 text-gold hover:bg-gold/10 transition-all duration-300"
            style={{ fontFamily: "'Josefin Sans', sans-serif" }}
          >
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
            Back to Home
          </Link>
        </m.div>
      </div>
    </div>
  );
}

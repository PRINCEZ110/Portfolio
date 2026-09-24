/* Global smooth scroll — one Lenis instance for the whole app,
   wired to GSAP's ticker so ScrollTrigger scenes stay in sync.
   Skipped entirely under prefers-reduced-motion (native scroll wins).
   Also owns: anchor-link routing (a[href^="#"]) and scroll reset
   on route change, so nav works from every route. */
import { createContext, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';
import { LENIS_EASING } from './ease';

const LenisContext = createContext(null);

const NAV_OFFSET = -72;

function scrollToTarget(lenis, hash) {
  if (hash === '#') {
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const el = document.querySelector(hash);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: NAV_OFFSET, duration: 1.4 });
  else el.scrollIntoView({ behavior: 'smooth' });
}

export default function LenisProvider({ children }) {
  const location = useLocation();
  const lenisRef = useRef(null);

  /* Create once. gsap.ticker drives Lenis; Lenis drives ScrollTrigger. */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: LENIS_EASING,
      smoothWheel: true,
      smoothTouch: false,
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      window.__lenis = null;
    };
  }, []);

  /* Route change → back to top (immediate, no cinematic scroll). */
  useEffect(() => {
    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [location.pathname]);

  /* Anchor links anywhere in the app scroll through Lenis. */
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute('href');
      if (!hash || hash.length < 1) return;
      // Let cross-route links (e.g. "/#work" from another page) behave natively.
      if (a.pathname && a.pathname !== location.pathname) return;
      e.preventDefault();
      scrollToTarget(lenisRef.current, hash);
      window.history.replaceState(null, '', hash === '#' ? location.pathname : hash);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [location.pathname]);

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
}

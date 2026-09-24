/* Section scroll helper — prefers the global Lenis instance when
   present (buttery eased scroll), falls back to native smooth scroll.
   Used by navbars/footers that navigate across routes first. */
export function scrollToSection(id, maxRetries = 15) {
  const el = document.getElementById(id);
  if (el) {
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -72, duration: 1.4 });
    else el.scrollIntoView({ behavior: 'smooth' });
  } else if (maxRetries > 0) {
    requestAnimationFrame(() => scrollToSection(id, maxRetries - 1));
  }
}

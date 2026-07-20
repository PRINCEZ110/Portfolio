export function scrollToSection(id, maxRetries = 15) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  } else if (maxRetries > 0) {
    requestAnimationFrame(() => scrollToSection(id, maxRetries - 1));
  }
}

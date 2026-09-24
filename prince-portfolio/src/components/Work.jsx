import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { projects } from '../data/projects';
import { gsap, ScrollTrigger } from '../motion/gsap';

const EASE = [0.16, 1, 0.3, 1];

/* ── Structured project data (existing content, nothing invented) ── */
const works = projects.map((p, i) => ({
  id: p.id,
  number: String(i + 1).padStart(2, '0'),
  title: p.title,
  subtitle: p.subtitle,
  description: p.description,
  category: (p.tags && p.tags[0]) || 'Work',
  tags: p.tags || [],
  year: p.year,
  tech: p.tech,
  duration: p.duration,
  live: p.live,
  video:
    p.id === 'haprvisual'
      ? '/HaprVisual.mp4'
      : p.id === 'jobnepal'
        ? '/JobNepal.mp4'
        : null,
}));

const N = works.length;

/* ═══════════════════════════════════════════════
   SelectedWork
   desktop + motion: pinned scroll-driven stage
   mobile / tablet / reduced motion: vertical cards
   ═══════════════════════════════════════════════ */
export default function SelectedWork() {
  const [isDesktop, setIsDesktop] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const compute = () => setIsDesktop(mq.matches);
    compute();
    mq.addEventListener('change', compute);
    return () => mq.removeEventListener('change', compute);
  }, []);

  const pinned = isDesktop && !reduce;

  return (
    <MotionConfig reducedMotion="user">
      <section id="work" className="relative bg-[#F1EFE7] text-[#111111]">
        <WorkIntro count={N} />
        {pinned ? <WorkStage key="stage" /> : <WorkCards key="cards" />}
        <WorkCTA />
      </section>
    </MotionConfig>
  );
}

/* ─── WorkIntro ─── */
function WorkIntro({ count }) {
  return (
    <header className="px-6 md:px-10 pt-24 md:pt-32 pb-10 md:pb-14 max-w-[1800px] mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: EASE }}
        className="ed-sans flex items-baseline justify-between text-[11px] md:text-xs uppercase tracking-[0.08em] text-[#111111]/70"
      >
        <span>Selected Work</span>
        <span className="hidden sm:inline">An index of systems &amp; interfaces</span>
        <span>({String(count).padStart(2, '0')})</span>
      </motion.div>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: EASE }}
        className="ed-rule mt-4 origin-left"
      />
      <span className="block overflow-hidden">
        <motion.h2
          initial={{ y: 36, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: EASE }}
          className="ed-serif ed-title mt-6 md:mt-8 max-w-5xl"
        >
          Work that <em className="font-normal">matters</em>.
        </motion.h2>
      </span>
      <motion.p
        initial={{ y: 18, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
        className="ed-sans mt-4 max-w-md text-sm md:text-[15px] leading-relaxed text-[#111111]/70"
      >
        A short sequence of recent builds — scroll to move from one story
        to the next.
      </motion.p>
    </header>
  );
}

/* ═══════════════════════════════════════════════
   WorkStage — pinned desktop experience.
   One scrubbed GSAP timeline owns the visuals
   (crossfade + clip reveal + parallax); React state
   flips only when the active index changes.
   ═══════════════════════════════════════════════ */
function WorkStage() {
  const stageRef = useRef(null);
  const barRef = useRef(null);
  const stRef = useRef(null);
  const totalRef = useRef(1);
  const [idx, setIdx] = useState(0);

  /* Controlled transitions — no autoplay, no snap, pure scroll. */
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const slides = Array.from(stage.querySelectorAll('[data-slide]'));
    const media = Array.from(stage.querySelectorAll('[data-parallax]'));

    const ctx = gsap.context(() => {
      slides.forEach((sl, i) => {
        gsap.set(sl, i === 0
          ? { autoAlpha: 1, clipPath: 'inset(0% 0 0 0)', scale: 1, y: 0, filter: 'blur(0px)' }
          : { autoAlpha: 0, clipPath: 'inset(100% 0 0 0)', scale: 1.04, y: 24, filter: 'blur(6px)' });
      });

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          /* One viewport of scroll per hand-off — enough to read
             each work, never an excessive journey. */
          end: () => `+=${Math.round((N - 1) * window.innerHeight)}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          scrub: 0.6,
          onUpdate: (self) => {
            if (barRef.current) gsap.set(barRef.current, { scaleX: self.progress });
            const t = self.progress * totalRef.current;
            const next = Math.min(N - 1, Math.max(0, Math.round(t)));
            setIdx((prev) => (prev === next ? prev : next));
          },
        },
      });

      /* Boundary windows: crossfade centered between works, so the
         active indicator flips exactly as the images trade places. */
      for (let k = 0; k < N - 1; k++) {
        const at = k + 0.3;
        tl.to(slides[k], {
          autoAlpha: 0, scale: 0.96, y: -16, filter: 'blur(4px)', duration: 0.4,
        }, at)
          .to(slides[k + 1], {
            autoAlpha: 1, clipPath: 'inset(0% 0 0 0)', scale: 1, y: 0, filter: 'blur(0px)', duration: 0.4,
          }, at);
      }
      /* Pad the timeline to N−1 so index math and scroll map 1:1. */
      const pad = {};
      tl.set(pad, { v: 1 }, N - 1);

      /* Subtle depth: media drifts ±~8px across the whole pin,
         riding the same scrubbed timeline. */
      if (media.length) {
        tl.fromTo(media, { yPercent: -1.4 }, {
          yPercent: 1.4, ease: 'none', duration: N - 1,
        }, 0);
      }
      totalRef.current = tl.duration();

      stRef.current = tl.scrollTrigger;
    }, stage);

    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh).catch(() => {});
    window.addEventListener('load', refresh);
    return () => {
      window.removeEventListener('load', refresh);
      ctx.revert();
      stRef.current = null;
    };
  }, []);

  /* Only the active film rolls. */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.querySelectorAll('video').forEach((v) => {
      if (Number(v.dataset.vid) === idx) v.play().catch(() => {});
      else v.pause();
    });
  }, [idx]);

  const goTo = (i) => {
    const st = stRef.current;
    if (!st || N < 2) return;
    const target = st.start + (i / (N - 1)) * (st.end - st.start);
    if (window.__lenis) window.__lenis.scrollTo(target, { duration: 1.1 });
    else window.scrollTo({ top: target, behavior: 'smooth' });
  };

  const active = works[idx];

  return (
    <div ref={stageRef} className="relative h-screen w-full overflow-hidden">
      <div className="mx-auto flex h-full max-w-[1800px] flex-col px-6 md:px-10 pt-20 pb-8">
        <div className="grid min-h-0 flex-1 grid-cols-12 items-stretch gap-8 lg:gap-12">
          {/* ── LEFT: number / navigation / progress ── */}
          <div className="col-span-12 lg:col-span-4 flex flex-col justify-center">
            <span className="ed-sans text-[11px] uppercase tracking-[0.18em] text-[#111111]/50">
              Selected Work
            </span>

            {/* Large subtle project number — masked vertical roll */}
            <div className="mt-3 flex items-baseline gap-3">
              <span className="ed-mask relative block h-[0.82em] overflow-hidden" style={{ fontSize: 'clamp(56px, 6.5vw, 104px)' }}>
                <AnimatePresence initial={false}>
                  <motion.span
                    key={active.number}
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '-110%' }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="ed-serif absolute left-0 top-0 block font-medium leading-[0.85] text-[#111111]/15"
                  >
                    {active.number}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="ed-sans text-xs uppercase tracking-[0.14em] text-[#111111]/40">
                of {String(N).padStart(2, '0')}
              </span>
            </div>

            {/* Project navigation */}
            <nav aria-label="Projects" className="mt-7 border-b border-[#111111]/15">
              {works.map((w, i) => {
                const on = i === idx;
                return (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={on ? 'true' : undefined}
                    className="group relative flex w-full items-baseline gap-4 border-t border-[#111111]/15 py-3.5 pl-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8B1A2B]"
                  >
                    {on && (
                      <motion.span
                        layoutId="work-active-line"
                        aria-hidden
                        className="absolute left-0 top-0 h-full w-[2px] bg-[#8B1A2B]"
                        transition={{ type: 'spring', stiffness: 320, damping: 34 }}
                      />
                    )}
                    <span className={`ed-sans text-[11px] tabular-nums transition-colors duration-300 ${on ? 'text-[#8B1A2B]' : 'text-[#111111]/40'}`}>
                      {w.number}
                    </span>
                    <span
                      className={`ed-serif leading-tight transition-all duration-300 ${
                        on
                          ? 'text-xl md:text-2xl text-[#111111]'
                          : 'text-base md:text-lg text-[#111111]/45 group-hover:text-[#111111]/80'
                      }`}
                    >
                      {w.title}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Scroll progress — belongs to the section */}
            <div className="mt-7 flex items-center gap-3">
              <span className="ed-sans text-[10px] tabular-nums text-[#111111]/40">01</span>
              <div className="h-px flex-1 bg-[#111111]/15">
                <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-[#111111]" />
              </div>
              <span className="ed-sans text-[10px] tabular-nums text-[#111111]/40">
                {String(N).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* ── RIGHT: visual + synchronized details ── */}
          <div className="col-span-12 lg:col-span-8 flex min-h-0 flex-col">
            <WorkPreview idx={idx} />

            <div className="mt-5 grid min-h-[140px] grid-cols-12 gap-6">
              {/* Title + description */}
              <div className="col-span-12 md:col-span-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <p className="ed-sans text-[11px] uppercase tracking-[0.16em] text-[#111111]/50">
                      {active.number} — {active.category} · {active.year}
                    </p>
                    <h3 className="ed-serif mt-1.5 text-2xl md:text-3xl font-medium leading-tight text-[#111111]">
                      {active.title}
                      <span className="block text-base md:text-lg italic font-normal text-[#111111]/60">
                        {active.subtitle}
                      </span>
                    </h3>
                    <p className="ed-sans mt-2.5 line-clamp-2 max-w-xl text-sm leading-relaxed text-[#111111]/75">
                      {active.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Meta + CTAs */}
              <div className="col-span-12 md:col-span-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.4, delay: 0.05, ease: EASE }}
                    className="flex h-full flex-col items-start"
                  >
                    <div className="flex flex-wrap gap-1.5">
                      {active.tech.slice(0, 4).map((t) => (
                        <span key={t} className="ed-sans text-[9px] uppercase tracking-[0.12em] border border-[#111111]/20 px-2 py-1 text-[#111111]/60">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-6">
                      <Link
                        to={`/work/${active.id}`}
                        className="ed-link ed-sans text-xs font-medium uppercase tracking-[0.14em]"
                      >
                        View project <span aria-hidden>→</span>
                      </Link>
                      {active.live && (
                        <a
                          href={active.live}
                          target="_blank"
                          rel="noreferrer"
                          className="ed-link ed-sans text-xs uppercase tracking-[0.14em] text-[#111111]/55"
                        >
                          Live site <span aria-hidden>↗</span>
                        </a>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── WorkPreview — stacked slides, hover depth, mask reveals ─── */
function WorkPreview({ idx }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const scale = useMotionValue(1);
  const sx = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.4 });
  const sc = useSpring(scale, { stiffness: 160, damping: 22, mass: 0.4 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    mx.set(nx * 14);
    my.set(ny * 10);
  };
  const onLeave = () => { mx.set(0); my.set(0); scale.set(1); };
  const onEnter = () => scale.set(1.02);

  return (
    <div
      className="group relative min-h-0 w-full flex-1 overflow-hidden border border-[#111111]/10 bg-[#111111]/[0.03]"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={onEnter}
    >
      <motion.div style={{ x: sx, y: sy, scale: sc }} className="absolute inset-0">
        {works.map((w, i) => (
          <article
            key={w.id}
            data-slide
            aria-hidden={i !== idx ? 'true' : undefined}
            className="absolute inset-0"
          >
            <div data-parallax className="absolute -inset-y-5 inset-x-0">
              {w.video ? (
                <video
                  data-vid={i}
                  src={w.video}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: 'center 25%' }}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  title={w.title}
                  tabIndex={-1}
                />
              ) : (
                <div className="h-full w-full">
                  <SahakariPanel story={w} />
                </div>
              )}
            </div>
          </article>
        ))}
      </motion.div>

      {/* CTA breathes a little stronger on preview hover */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   WorkCards — mobile / tablet / reduced motion.
   Independent vertical blocks, lightweight reveals.
   ═══════════════════════════════════════════════ */
function WorkCards() {
  return (
    <div className="px-6 md:px-10 pb-10 max-w-[1800px] mx-auto border-b border-[#111111]/15">
      {works.map((w) => (
        <article key={w.id} className="border-t border-[#111111]/15 py-10 md:py-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="ed-sans flex items-baseline justify-between text-[11px] uppercase tracking-[0.14em] text-[#111111]/50">
              <span className="tabular-nums text-[#8B1A2B]">{w.number}</span>
              <span>{w.category} · {w.year}</span>
            </div>
            <h3 className="ed-serif mt-2 text-2xl md:text-3xl font-medium leading-tight">
              {w.title}
              <span className="block text-base italic font-normal text-[#111111]/60">
                {w.subtitle}
              </span>
            </h3>

            <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden border border-[#111111]/10 bg-[#111111]/[0.03]">
              {w.video ? (
                <video
                  src={w.video}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: 'center 25%' }}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  title={w.title}
                />
              ) : (
                <SahakariPanel story={w} />
              )}
            </div>

            <p className="ed-sans mt-4 text-sm leading-relaxed text-[#111111]/75">
              {w.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {w.tech.slice(0, 5).map((t) => (
                <span key={t} className="ed-sans text-[9px] uppercase tracking-[0.12em] border border-[#111111]/20 px-2 py-1 text-[#111111]/60">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-6">
              <Link
                to={`/work/${w.id}`}
                className="ed-link ed-sans text-xs font-medium uppercase tracking-[0.14em]"
              >
                View project <span aria-hidden>→</span>
              </Link>
              {w.live && (
                <a
                  href={w.live}
                  target="_blank"
                  rel="noreferrer"
                  className="ed-link ed-sans text-xs uppercase tracking-[0.14em] text-[#111111]/55"
                >
                  Live site <span aria-hidden>↗</span>
                </a>
              )}
            </div>
          </motion.div>
        </article>
      ))}
    </div>
  );
}

/* Art-directed type panel for the story without a visual */
function SahakariPanel({ story }) {
  return (
    <div className="h-full w-full bg-[#16130e] text-[#F1EFE7] p-8 flex flex-col justify-between">
      <div className="ed-sans flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[#F1EFE7]/50">
        <span>{story.category}</span>
        <span>{story.year}</span>
      </div>
      <div>
        <p className="ed-serif italic text-2xl text-[#F1EFE7]/70">Cooperative system</p>
        <p className="ed-serif font-medium leading-[0.95]" style={{ fontSize: 'clamp(34px, 4vw, 56px)' }}>
          {story.title}
        </p>
        <div className="ed-sans mt-4 flex flex-wrap gap-2">
          {story.tech.slice(0, 4).map((t) => (
            <span key={t} className="text-[10px] uppercase tracking-[0.12em] border border-[#F1EFE7]/25 px-2.5 py-1">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="ed-sans text-[10px] uppercase tracking-[0.18em] text-[#F1EFE7]/50">
        Java MVC · MySQL · {story.duration}
      </div>
    </div>
  );
}

/* ─── WorkCTA — the section's natural conclusion ─── */
function WorkCTA() {
  return (
    <div className="px-6 md:px-10 pb-24 md:pb-32 max-w-[1800px] mx-auto">
      <div className="ed-rule" />
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 py-8">
        <p className="ed-sans text-sm text-[#111111]/60 max-w-md leading-relaxed">
          Three stories above — the full archive holds every experiment,
          client build and work-in-progress.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Link
            to="/projects"
            className="ed-sans group inline-flex items-center gap-3 bg-[#111111] px-7 py-3.5 text-xs uppercase tracking-[0.16em] text-[#F1EFE7] transition-colors duration-300 hover:bg-[#8B1A2B]"
          >
            View more projects
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </Link>
        </motion.div>
      </div>
      <div className="ed-rule" />
    </div>
  );
}

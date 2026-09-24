import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';

/* ── Story data: real portfolio content, reference-shaped ── */
const stories = projects.map((p, i) => ({
  ...p,
  no: String(i + 1).padStart(2, '0'),
  category: (p.tags && p.tags[0]) || 'Work',
  video:
    p.id === 'haprvisual'
      ? '/HaprVisual.mp4'
      : p.id === 'jobnepal'
        ? '/JobNepal.mp4'
        : null,
}));

export default function Work() {
  return (
    <section id="work" className="relative bg-[#F1EFE7] text-[#111111]">
      <EditorialIntro count={stories.length} />
      <ReferenceList />
      <WorkMore />
    </section>
  );
}

/* ─── INTRO ─── */
function EditorialIntro({ count }) {
  return (
    <header className="px-6 md:px-10 pt-24 md:pt-32 pb-8 md:pb-10 max-w-[1800px] mx-auto">
      <div className="ed-sans flex items-baseline justify-between text-[11px] md:text-xs uppercase tracking-[0.08em] text-[#111111]/70">
        <span>Selected Work</span>
        <span className="hidden sm:inline">An index of systems &amp; interfaces</span>
        <span>({String(count).padStart(2, '0')})</span>
      </div>
      <div className="ed-rule mt-4" />
      <h2 className="ed-serif ed-title mt-6 md:mt-8 max-w-5xl">
        Work that <em className="font-normal">matters</em>.
      </h2>
      <p className="ed-sans mt-5 max-w-md text-sm md:text-[15px] leading-relaxed text-[#111111]/70">
        Click a row to open its story — titles, images and
        descriptions rearrange themselves around your movement.
      </p>
    </header>
  );
}

/* ─── REFERENCE PATTERN: expanding editorial list ───
   - collapsed rows: big title left, meta + duration right, thin rules
   - hovering a row opens its story; click toggles (touch / keyboard)
   - open row: large visual left + overlapping small visual + dense text right,
     quoted title below, meta footer, "view case study →" link            */
function ReferenceList() {
  const [openId, setOpenId] = useState(stories[0]?.id ?? null);

  return (
    <div className="px-6 md:px-10 pb-10 md:pb-14 max-w-[1800px] mx-auto">
      <div className="relative">
        {/* Rows */}
        <div className="border-b border-[#111111]/15">
          {stories.map((s) => {
            const open = s.id === openId;
            return (
              <div key={s.id} className="border-t border-[#111111]/15">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : s.id)}
                  onMouseEnter={() => setOpenId(s.id)}
                  onFocus={() => setOpenId(s.id)}
                  aria-expanded={open}
                  className="group grid w-full grid-cols-12 items-baseline gap-2 py-5 md:py-6 text-left"
                >
                  <span
                    className={`ed-serif col-span-8 md:col-span-7 leading-[1.05] transition-all duration-300 ${
                      open
                        ? 'text-2xl md:text-4xl text-[#111111]'
                        : 'text-xl md:text-3xl text-[#111111]/55 group-hover:text-[#111111] group-hover:translate-x-1'
                    }`}
                  >
                    {open ? `\u201C${s.title}: ${s.subtitle}\u201D` : s.title}
                  </span>
                  <span className="ed-sans col-span-4 md:col-span-5 flex items-baseline justify-end gap-4 md:gap-8 text-[11px] uppercase tracking-[0.12em] text-[#111111]/55">
                    <span className="hidden sm:inline">
                      <span className="mr-1.5 inline-block h-1.5 w-1.5 bg-[#111111]/50" />
                      {s.category}
                    </span>
                    <span className="hidden md:inline">{s.year}</span>
                    <span>{s.duration}</span>
                    <span aria-hidden className={`transition-transform duration-300 ${open ? 'rotate-180' : 'group-hover:translate-y-0.5'}`}>
                      {open ? '▾' : '▸'}
                    </span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-12 gap-6 md:gap-10 pb-8 md:pb-12 pt-2">
                        {/* Left: large visual + overlapping small visual */}
                        <div className="col-span-12 md:col-span-7 relative">
                          <div className="relative overflow-hidden bg-[#111111]/[0.04]">
                            {s.video ? (
                              <video
                                src={s.video}
                                className="w-full aspect-[4/3] object-cover"
                                style={{ objectPosition: 'center 25%' }}
                                muted
                                loop
                                playsInline
                                autoPlay
                                preload="metadata"
                                title={s.title}
                              />
                            ) : (
                              <div className="w-full aspect-[4/3]">
                                <SahakariPanel story={s} />
                              </div>
                            )}
                          </div>
                          {/* overlapping detail card — mirrors the ref's small circular overlay */}
                          <div className="absolute -right-2 md:-right-8 top-1/4 w-32 md:w-48 border-2 border-[#F1EFE7] shadow-xl overflow-hidden bg-[#16130e]">
                            {s.video ? (
                              <div className="bg-[#16130e] text-[#F1EFE7] p-3 md:p-4">
                                <p className="ed-sans text-[9px] md:text-[10px] uppercase tracking-[0.18em] text-[#F1EFE7]/50">
                                  {s.category}
                                </p>
                                <p className="ed-serif text-sm md:text-lg leading-tight mt-1">
                                  {s.subtitle}
                                </p>
                                <div className="ed-sans mt-2 flex flex-wrap gap-1">
                                  {s.tech.slice(0, 3).map((t) => (
                                    <span key={t} className="text-[8px] md:text-[9px] uppercase tracking-[0.12em] border border-[#F1EFE7]/25 px-1.5 py-0.5">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <video
                                src={stories[0]?.video}
                                className="h-32 md:h-44 w-full object-cover"
                                muted
                                loop
                                playsInline
                                autoPlay
                                preload="metadata"
                                title=""
                              />
                            )}
                          </div>
                          <p className="ed-serif text-xl md:text-2xl mt-5 max-w-md leading-snug">
                            &ldquo;{s.title}: {s.subtitle}&rdquo;
                          </p>
                        </div>

                        {/* Right: dense editorial text */}
                        <div className="col-span-12 md:col-span-5">
                          <p className="ed-sans text-sm md:text-[15px] leading-relaxed text-[#111111]/85">
                            {s.description}
                          </p>
                          <p className="ed-sans text-sm md:text-[15px] leading-relaxed text-[#111111]/70 mt-4">
                            {s.highlights.slice(0, 3).join(' · ')}
                            {s.highlights[3] ? ` — ${s.highlights[3]}.` : '.'}
                          </p>
                          <p className="ed-sans text-sm leading-relaxed text-[#111111]/70 mt-4">
                            Built as {s.role.toLowerCase()} over {s.duration}, using{' '}
                            {s.tech.slice(0, 4).join(', ')}.
                          </p>
                          <div className="mt-6 flex items-center gap-6">
                            <Link
                              to={`/work/${s.id}`}
                              className="ed-link ed-sans text-xs uppercase tracking-[0.14em] font-medium"
                            >
                              View case study <span aria-hidden>→</span>
                            </Link>
                            {s.live && (
                              <a
                                href={s.live}
                                target="_blank"
                                rel="noreferrer"
                                className="ed-link ed-sans text-xs uppercase tracking-[0.14em] text-[#111111]/55"
                              >
                                Live site <span aria-hidden>↗</span>
                              </a>
                            )}
                          </div>
                          <div className="ed-sans mt-8 flex items-baseline justify-between border-t border-[#111111]/15 pt-4 text-[11px] uppercase tracking-[0.12em] text-[#111111]/55">
                            <span>
                              <span className="mr-1.5 inline-block h-1.5 w-1.5 bg-[#111111]/50" />
                              {s.category}
                            </span>
                            <span>{s.duration}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* Art-directed type panel for the story without a video */
function SahakariPanel({ story, compact = false }) {
  return (
    <div
      className={`h-full w-full bg-[#16130e] text-[#F1EFE7] flex flex-col justify-between ${
        compact ? 'p-3' : 'p-8'
      }`}
    >
      <div className="ed-sans flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[#F1EFE7]/50">
        <span>{story.category}</span>
        <span>{story.year}</span>
      </div>
      <div>
        {!compact && (
          <p className="ed-serif italic text-2xl text-[#F1EFE7]/70">Cooperative system</p>
        )}
        <p
          className="ed-serif font-medium leading-[0.95]"
          style={{ fontSize: compact ? '20px' : 'clamp(34px, 4vw, 56px)' }}
        >
          {story.title}
        </p>
        <div className="ed-sans mt-4 flex flex-wrap gap-2">
          {story.tech.slice(0, compact ? 2 : 4).map((t) => (
            <span key={t} className="text-[10px] uppercase tracking-[0.12em] border border-[#F1EFE7]/25 px-2.5 py-1">
              {t}
            </span>
          ))}
        </div>
      </div>
      {!compact && (
        <div className="ed-sans text-[10px] uppercase tracking-[0.18em] text-[#F1EFE7]/50">
          Java MVC · MySQL · {story.duration}
        </div>
      )}
    </div>
  );
}

/* ─── View more → opens the full projects archive (/projects) ─── */
function WorkMore() {
  return (
    <div className="px-6 md:px-10 pb-24 md:pb-32 max-w-[1800px] mx-auto">
      <div className="ed-rule" />
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 py-8">
        <p className="ed-sans text-sm text-[#111111]/60 max-w-md leading-relaxed">
          Three stories above — the full archive holds every experiment,
          client build and work-in-progress.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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

import { useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import NepaliDate from 'nepali-date-converter';

const EASE = [0.16, 1, 0.3, 1];

/* ── Scroll reveal helper (respects reduced motion) ── */
function Reveal({ children, delay = 0, y = 28, className }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}

/* ── Hairline rule that draws itself across the page ── */
function DrawnRule({ className = '', heavy = false }) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={heavy ? `h-[3px] bg-ink ${className}` : `h-px bg-ink ${className}`}
      style={{ transformOrigin: 'left center' }}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.9, ease: EASE }}
    />
  );
}

/* ────────────────────────────────────────────────
   1 · TopMeta — tiny mono strip
   ──────────────────────────────────────────────── */
function TopMeta() {
  return (
    <Reveal y={-12} className="flex flex-wrap items-center justify-between gap-2 px-4 md:px-8 pt-4 pb-2 font-mono text-[9px] md:text-[10.5px] tracking-[0.2em] text-inksoft">
      <span>Registered No. PS/2026/GH</span>
      <span className="hidden sm:inline">Portfolio Edition — Not For Circulation</span>
      <span className="sm:hidden">Not For Circulation</span>
    </Reveal>
  );
}

/* ────────────────────────────────────────────────
   2 · EarBox — mono stat column
   ──────────────────────────────────────────────── */
function EarBox({ title, rows, delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <m.div
      initial={reduce ? false : { opacity: 0, y: 20, rotate: -0.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      whileHover={reduce ? undefined : { rotate: 0.4, scale: 1.01 }}
      className="border border-ink bg-white/15 px-3 py-2 font-mono text-[9.5px] leading-relaxed text-inksoft shadow-[2px_2px_0_rgba(32,26,18,0.85)]"
    >
      <h4 className="mb-1.5 border-b border-rule/70 pb-1 text-[10.5px] font-bold tracking-[0.08em] text-ink">
        {title}
      </h4>
      {rows.map(([k, v], i) => (
        <m.div
          key={k}
          initial={reduce ? false : { opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: delay + 0.1 + i * 0.06, ease: EASE }}
          className="flex items-center justify-between gap-1.5"
        >
          <span>{k}</span>
          <span className="font-bold text-ink">{v}</span>
        </m.div>
      ))}
    </m.div>
  );
}

const rates = [
  ['Freelance', 'On enquiry'],
  ['Internship', 'Open'],
  ['Full-time', 'Open'],
  ['Reply Time', '< 24 hrs'],
];

const status = [
  ['Location', 'Itahari, Nepal'],
  ['Currently', 'Building'],
  ['Mood', 'Focused'],
  ['Open to', 'Roles'],
];

/* ────────────────────────────────────────────────
   3 · Ears — dispatch rates / masthead / status
   ──────────────────────────────────────────────── */
function Masthead() {
  const reduce = useReducedMotion();
  const words = ['The', 'Rising', 'Developer'];
  return (
    <div className="text-center self-center 860:px-2">
      <m.p
        initial={reduce ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE }}
        className="font-deva text-[13px] font-bold tracking-[0.06em] text-maroon mb-0.5"
      >
        उदाउँदो डेभलपर
      </m.p>
      <h1
        className="np-masthead font-playfair italic font-black text-ink leading-none"
        style={{ fontSize: 'clamp(2.5rem, 7vw, 4.6rem)' }}
      >
        {words.map((w, i) => (
          <span key={w} className="np-mask inline-block align-bottom">
            <m.span
              className="inline-block"
              initial={reduce ? false : { yPercent: 110, rotate: 2 }}
              whileInView={{ yPercent: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.85, delay: 0.08 + i * 0.1, ease: EASE }}
            >
              {w}
              {i < words.length - 1 ? ' ' : ''}
            </m.span>
          </span>
        ))}
      </h1>
      <m.p
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="mt-2 flex items-center justify-center gap-3.5 font-mono text-[9px] tracking-[0.18em] uppercase text-inksoft"
      >
        <span>PRO CODICE PUBLICO</span>
        <span className="h-1 w-1 rounded-full bg-maroon" />
        <span>Itahari · NEPAL</span>
      </m.p>
      <m.p
        initial={reduce ? false : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
        className="mt-1.5 font-playfair text-[17px] font-bold tracking-[0.04em] text-ink"
      >
        Prince Shrestha
        <span className="block font-pserif text-[11.5px] font-normal italic text-inksoft">
          Foremost Frontend Chronicle — every commit, every morning
        </span>
      </m.p>
    </div>
  );
}

function Ears() {
  return (
    <header className="grid grid-cols-1 860:grid-cols-[210px_1fr_230px] gap-5 md:gap-6 px-4 md:px-8 pt-5 pb-6">
      <EarBox title="Dispatch Rates" rows={rates} delay={0} />
      <Masthead />
      <EarBox title="Status Today" rows={status} delay={0.12} />
    </header>
  );
}

/* ────────────────────────────────────────────────
   4 · BylineBar — vol/date/price under heavy rules
   ──────────────────────────────────────────────── */
function BylineBar() {
  const today = new NepaliDate();
  const { year, month, date } = today.getAD();
  const adFormatted = new Date(year, month, date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const bsDay = today.format('dddd');
  const bsDate = today.format('MMMM D, YYYY');

  return (
    <div className="px-4 md:px-8">
      <DrawnRule heavy />
      <div className="h-px bg-ink mt-[3px]" />
      <Reveal y={8} className="flex flex-wrap items-center justify-between gap-2 py-2.5 font-mono text-[9px] md:text-[10px] tracking-[0.03em] text-inksoft">
        <span>
          <b className="text-ink">Vol. I</b> · No. 1
        </span>
        <span>
          Nepali, {bsDate} — <b className="text-ink">{bsDay}</b>
        </span>
        <span>{adFormatted}</span>
        <span>[ Portfolio — Price: Your Attention ]</span>
      </Reveal>
      <DrawnRule />
    </div>
  );
}

/* ── Breaking ticker: vintage wire-service motion ── */
function Ticker() {
  const items = [
    'EXTRA — JobNepal backlog cleared',
    'OneVideo enters early build',
    'Portfolio performance audit underway',
    'Now setting type in Itahari',
  ];
  const row = items.map((t) => (
    <span key={t} className="mx-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink">
      <span className="inline-block h-1.5 w-1.5 bg-maroon" />
      {t}
    </span>
  ));
  return (
    <div className="np-ticker mt-4 overflow-hidden border-y border-ink bg-paperdark/60 py-2">
      <div className="np-ticker-inner">
        <div className="flex shrink-0 items-center">{row}</div>
        <div className="flex shrink-0 items-center" aria-hidden>{row}</div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   5 · HeadlineLede — kicker, headline, deck, columns + photo
   ──────────────────────────────────────────────── */
function HeadlineLede() {
  const reduce = useReducedMotion();
  return (
    <section className="px-4 md:px-8 mt-6">
      <Reveal>
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-maroon mb-1.5">
          ❦&nbsp;&nbsp;Skills &amp; Background
        </p>
      </Reveal>
      <h2
        className="font-playfair font-black text-ink leading-[1.05]"
        style={{ fontSize: 'clamp(1.7rem, 3.4vw, 2.6rem)' }}
      >
        {['Steady Growth', 'In Full-Stack Craft'].map((line, i) => (
          <span key={line} className="np-mask">
            <m.span
              className="block"
              initial={reduce ? false : { yPercent: 110 }}
              whileInView={{ yPercent: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.09, ease: EASE }}
            >
              {line}
            </m.span>
          </span>
        ))}
      </h2>
      <Reveal delay={0.2}>
        <p className="mt-1 font-playfair text-base md:text-lg font-semibold italic text-inksoft">
          React Ecosystem Anchors The Stack — Component Architecture A Vital Link
        </p>
      </Reveal>

      <div className="mt-4 grid grid-cols-1 860:grid-cols-[1.5fr_1fr] gap-6 md:gap-8">
        <Reveal delay={0.1} className="np-cols-2 np-col-rule broad-text font-pserif text-[14.5px] leading-[1.62] text-ink/90">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.05em] text-inksoft mb-2.5">
            By Our Correspondent
          </p>
          <p className="np-dropcap">
            Nepali, Aug. 4 — A young developer out of Itahari, now reading Bsc Hons computing at Itahari International College and
            has in the last two years brought sweeping changes to his
            own craft, associates close to the matter confirm. His instrument of choice: the modern React ecosystem, next.js,
            tailwind and framer motion,
            wielded with what colleagues describe as an unusual insistence on pixel-level exactness.
          </p>
          <p>
            The developer&rsquo;s early training came through structured study of components, hooks, routing and API
            consumption, applied without delay to live projects rather than left as exercise. He went on to complete a
            frontend development internship at Info Tech Digital Solution in Biratnagar, where he worked across
            React.js, Tailwind CSS and a Node.js/Express backend, shipping builds to Vercel and Render.
          </p>
          <p>
            Since then he has maintained three notable dispatches under the byline <b>PRINCEZ110</b>: a personal
            portfolio rebuilt around VS Code-inspired motion and a lime-accented dark theme; <b>JobNepal</b>, a
            home-grown job portal raised on React 19, Vite and Tailwind v4; and <b>OneVideo</b>, a Next.js streaming
            interface now in early scaffolding.
          </p>
          <p>
            Those who have reviewed his work note a recurring thread — a refusal to ship the generic. Correspondents
            report he has spent whole sessions auditing image weight, animation loops and backdrop-blur stacking on
            his own site rather than declare it finished, and a standing fascination with Nepali and Newari ornament,
            which he has folded into wine-red-and-marigold banner studies and a Himalayan-indigo colour system for
            JobNepal&rsquo;s skyline motif.
          </p>
        </Reveal>

        <aside className="flex flex-col gap-4">
          <m.figure
            initial={reduce ? false : { opacity: 0, y: 30, rotate: 1.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: EASE }}
            whileHover={reduce ? undefined : { rotate: -1, scale: 1.015 }}
            className="text-center"
          >
            <div className="np-photo-wrap relative aspect-[4/4.6] w-full overflow-hidden border border-ink z-10 shadow-[4px_4px_0_rgba(32,26,18,0.9)]">
              <span className="np-tape np-tape-tl" />
              <span className="np-tape np-tape-tr" />
              <m.img
                src="/Aboutimage.jpg"
                alt="Prince Shrestha — at his workstation"
                className="np-photo absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                initial={reduce ? false : { scale: 1.12 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: EASE }}
              />
            </div>
            <figcaption className="px-1 pt-1.5 font-mono text-[10px] leading-relaxed text-inksoft">
              <b className="mb-0.5 block text-[11px] text-ink">Prince Shrestha</b>
              Frontend Developer · Itahari, Nepal — pictured at his workstation, mid-refactor.
            </figcaption>
            <m.span
              initial={reduce ? false : { opacity: 0, scale: 1.6, rotate: 6 }}
              whileInView={{ opacity: 0.88, scale: 1, rotate: -9 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.35 }}
              whileHover={reduce ? undefined : { rotate: 0, scale: 1.06 }}
              className="np-stamp mt-2.5"
            >
              VERIFIED<br />SKILL SET
            </m.span>
          </m.figure>

          <Reveal delay={0.15}>
            <div className="border border-ink bg-white/20 p-3.5 shadow-[3px_3px_0_rgba(32,26,18,0.85)]">
              <h5 className="mb-2 border-b border-rule/70 pb-1.5 font-playfair text-[14px] font-extrabold text-ink">
                From The Internship Desk
              </h5>
              <p className="font-pserif text-[12.6px] italic leading-[1.55] text-inksoft">
                &ldquo;He treated a two-second layout shift as a personal offence. Whatever he ships, it ships
                clean.&rdquo;
              </p>
              <span className="mt-2 block text-right font-mono text-[10px] text-ink">
                — A Colleague, Info Tech Digital Solution
              </span>
            </div>
          </Reveal>
        </aside>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   6 · ThreeColumnFeature — Background / Toolkit / Approach
   ──────────────────────────────────────────────── */
function ThreeColumnFeature() {
  const reduce = useReducedMotion();
  const toolkit = [
    ['Frontend', 'React 19 · Next.js'],
    ['Styling', 'Tailwind CSS v4'],
    ['Motion', 'Framer Motion'],
    ['Language', 'TypeScript'],
    ['State', 'Redux Toolkit'],
    ['Backend', 'Node.js · Express'],
    ['Build', 'Vite'],
    ['Ship', 'Vercel · Render'],
  ];

  const cols = [
    {
      kicker: 'Background',
      title: 'Education & Origin',
      body: (
        <>
          <p className="font-pserif text-[13px] leading-[1.6] text-ink/90 text-justify mb-2">
            Reading Computer Science at Itahari International College, in partnership with London Metropolitan
            University. Raised on Nepal&rsquo;s eastern plains, now building from Itahari.
          </p>
          <p className="font-pserif text-[13px] leading-[1.6] text-ink/90 text-justify">
            Trained on the job as much as in the classroom — an internship at Info Tech Digital Solution, Biratnagar,
            turned classroom React into shipped, client-facing product.
          </p>
        </>
      ),
    },
  ];

  return (
    <section className="px-4 md:px-8 mt-7 border-t-[3px] border-double border-ink pt-4">
      <div className="grid grid-cols-1 860:grid-cols-3 gap-6 860:gap-8">
        <Reveal>
          <h6 className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-maroon mb-1.5">
            {cols[0].kicker}
          </h6>
          <h5 className="font-playfair text-[16.5px] font-extrabold text-ink mb-2">{cols[0].title}</h5>
          {cols[0].body}
        </Reveal>

        <Reveal delay={0.1}>
          <h6 className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-maroon mb-1.5">
            The Toolkit
          </h6>
          <h5 className="font-playfair text-[16.5px] font-extrabold text-ink mb-2">Working Stack</h5>
          <ul className="font-mono text-[11px]">
            {toolkit.map(([k, v], i) => (
              <m.li
                key={k}
                initial={reduce ? false : { opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 + i * 0.05, ease: EASE }}
                className="np-toolkit-row flex items-center justify-between gap-3 border-b border-dotted border-rule/80 py-1 px-1 -mx-1"
              >
                <b className="font-pserif text-[12.5px] font-normal text-ink">{k}</b>
                <span className="text-[10.5px] text-maroon">{v}</span>
              </m.li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.18}>
          <h6 className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-maroon mb-1.5">
            The Approach
          </h6>
          <h5 className="font-playfair text-[16.5px] font-extrabold text-ink mb-2">What Guides The Work</h5>
          <p className="font-pserif text-[13px] leading-[1.6] text-ink/90 text-justify mb-2">
            Every interface is treated the way this front page is composed — with deliberate hierarchy, real hairline
            discipline, and nothing decorative that isn&rsquo;t also doing a job.
          </p>
          <p className="font-pserif text-[13px] leading-[1.6] text-ink/90 text-justify">
            A standing interest in Nepali and Newari visual language runs underneath the modern stack, surfacing in
            colour systems, motifs and the occasional Devanagari flourish.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   7 · BottomRow — Stop Press + classified ad
   ──────────────────────────────────────────────── */
function BottomRow() {
  const reduce = useReducedMotion();
  const stops = [
    ['JobNepal', 'major GitHub issue backlog cleared; Remember Me, storage migration and form logic overhauled.'],
    ['OneVideo', 'Next.js streamer enters early build; dark-mode scaffolding now complete.'],
    ['Portfolio', 'performance audit closes in on a 1.3MB image and ungated canvas loops.'],
  ];

  return (
    <section className="px-4 md:px-8 mt-7 grid grid-cols-1 860:grid-cols-2 gap-6">
      <m.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, ease: EASE }}
        whileHover={reduce ? undefined : { rotate: -0.4 }}
        className="border-2 border-ink p-3.5 bg-white/10 shadow-[4px_4px_0_rgba(32,26,18,0.9)]"
      >
        <span className="mb-2 inline-flex items-center gap-2 bg-maroon px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.12em] text-paper">
          <span className="np-blink inline-block h-1.5 w-1.5 rounded-full bg-paper" />
          Stop Press
        </span>
        <ul className="space-y-1.5 pl-4 font-pserif text-[12.8px] leading-[1.6] text-ink/90 list-disc">
          {stops.map(([name, text], i) => (
            <m.li
              key={name}
              initial={reduce ? false : { opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.09, ease: EASE }}
            >
              <b className="font-playfair">{name}</b> — {text}
            </m.li>
          ))}
        </ul>
        <p className="mt-1.5 text-right font-mono text-[10px] text-inksoft">— PRINCEZ110</p>
      </m.div>

      <Reveal delay={0.12}>
        <div className="border-[3px] border-double border-ink p-4 text-center bg-white/10">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-inksoft">
            ✂ - - - On The Occasion Of Every Deployment - - - ✂
          </p>
          <h3 className="mt-1.5 mb-2 font-playfair text-2xl font-extrabold italic text-ink">Skills At Your Service</h3>
          <p className="mb-1.5 text-[11.5px] tracking-[0.05em]">OUR HEARTFELT SPECIALISATION TO</p>
          <p className="my-2 border-y border-rule/70 py-2 font-mono text-[10.5px] leading-[1.9] tracking-[0.03em] text-ink">
            FRONTEND ARCHITECTURE · REACT / NEXT.JS<br />
            TAILWIND CSS · TYPESCRIPT · FRAMER MOTION<br />
            NODE.JS · EXPRESS · REST APIS<br />
            VITE · GIT · VERCEL · RENDER
          </p>
          <p className="mt-1.5 text-xs tracking-[0.06em]">Itahari, NEPAL</p>
          <p className="mt-1 font-mono text-xs font-bold">github.com/PRINCEZ110</p>
          <p className="mt-3 font-playfair text-xs font-extrabold uppercase tracking-[0.05em]">
            Developer In-Charge
            <span className="mt-0.5 block font-pserif text-[14px] font-bold normal-case tracking-normal">
              Prince Shrestha
            </span>
          </p>
        </div>
      </Reveal>
    </section>
  );
}

/* ────────────────────────────────────────────────
   8 · Banner — a message to every project, 3 columns
   ──────────────────────────────────────────────── */
function Banner() {
  return (
    <section id="cv" className="scroll-mt-24 px-4 md:px-8 mt-8 pt-4 border-t-4 border-ink">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-inksoft">A Message To Every Project</p>
        <h2
          className="mt-1.5 mb-0.5 font-playfair font-black text-ink leading-[1.08]"
          style={{ fontSize: 'clamp(1.5rem, 3.6vw, 2.5rem)' }}
        >
          Prince Appeals To Craft With Precision And Purpose
        </h2>
        <p className="font-playfair text-base font-bold text-maroon">
          Call For Renewed Effort In Clean Code And Cultural Design
        </p>
        <p className="mb-3.5 font-pserif text-[13px] italic text-inksoft">Full Text Of The Developer&rsquo;s Working Philosophy</p>
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.04em] text-inksoft">Itahari, Aug. 4</p>
      </Reveal>
      <Reveal delay={0.1} className="np-cols-3 np-col-rule broad-text font-pserif text-[13.5px] leading-[1.62] text-ink/90">
        <p className="np-dropcap">
          Prince Shrestha, developer of Itahari, addressed the matter of his craft today, saying that good work is
          sure to increase in proportion to the care given it, and appealed to every project under his hand to do away
          with meanness of detail and half-finished polish.
        </p>
        <p>
          He noted that he remains impatient with interfaces wholly immune to refinement, and that he would push and
          pull until even the smallest field — a hover state, a loading skeleton, a line-height — could stand on its
          own. &ldquo;As I note the emergence of a new build,&rdquo; he said, &ldquo;I become more hopeful about what
          it can be, and I make sure every animation, every colour, every margin is earning its place.&rdquo;
        </p>
        <p>
          He also thanked the frameworks and communities that have shaped his habit of self-help — React, Tailwind,
          and the open-source projects he studies line by line — and concluded that his own stack will keep growing
          whether or not the deadline allows it, because that habit, once formed, does not easily fall away.
        </p>
      </Reveal>
    </section>
  );
}

/* ────────────────────────────────────────────────
   9 · FooterStrip — credit line + CV actions
   ──────────────────────────────────────────────── */
function FooterStrip({ viewing, setViewing }) {
  const bsYear = new NepaliDate().getBS().year;
  return (
    <footer className="px-4 md:px-8 pt-6 pb-6 mt-6">
      <DrawnRule />
      <Reveal y={8} className="flex flex-wrap items-center justify-between gap-2 py-2.5 font-mono text-[9.5px] tracking-[0.04em] text-inksoft">
        <span className="font-playfair text-xs font-bold italic text-ink">The Rising Developer</span>
        <span className="hidden md:inline">Composed in Itahari · Set in Playfair Display &amp; JetBrains Mono</span>
        <span>gorkhapatra-inspired, hand-laid for PRINCEZ110</span>
      </Reveal>
      <DrawnRule />
      <Reveal delay={0.05} className="flex flex-wrap items-center justify-center gap-4 pt-5">
        <button
          onClick={() => setViewing((v) => !v)}
          className="np-coupon-btn group font-mono text-[12px] uppercase tracking-widest text-ink border-2 border-dashed border-ink bg-paper/70 px-6 py-3 hover:text-maroon hover:border-maroon transition-colors duration-300"
        >
          <span className="np-scissors mr-3 text-maroon">✂</span>
          {viewing ? 'Close the Paper' : 'View Full Paper (PDF)'}
          <span className="np-scissors ml-3 text-maroon">✂</span>
        </button>
        <a
          href="/Prince Shrestha_Resume.pdf"
          download="Prince Shrestha_Resume.pdf"
          className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-widest bg-ink text-paper px-6 py-3 hover:bg-maroon transition-colors duration-300"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>Download PDF — रु ०</span>
        </a>
      </Reveal>
      <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.3em] text-inksoft">
        Editor-in-chief: Prince Shrestha · Composed daily in the Itahari Valley · नेपाली, {String(bsYear).replace(/[0-9]/g, (d) => '०१२३४५६७८९'[d])} · All Rights Reserved
      </p>
    </footer>
  );
}

/* ────────────────────────────────────────────────
   NewsPaperAbout — the full broadsheet
   ──────────────────────────────────────────────── */
export default function NewsPaperAbout() {
  const [viewing, setViewing] = useState(false);

  return (
    <section id="about" className="relative bg-ink flex min-h-screen">
      <article className="np-grain np-paper-age relative w-full flex-1 border-4 border-ink bg-paper overflow-hidden">
        {/* ageing overlays */}
        <div className="np-vignette" aria-hidden />
        <div className="np-fold-v" aria-hidden />
        <div className="np-fold-h" aria-hidden />

        <TopMeta />
        <Ears />
        <BylineBar />
        <Ticker />
        <HeadlineLede />
        <ThreeColumnFeature />
        <BottomRow />
        <Banner />
        <FooterStrip viewing={viewing} setViewing={setViewing} />

        <AnimatePresence>
          {viewing && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="overflow-hidden"
            >
              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="mx-4 mb-4 md:mx-8 border-4 border-ink bg-paper shadow-card"
              >
                <div className="px-5 py-4 flex items-center justify-between border-b-2 border-ink bg-paper font-mono text-xs text-ink tracking-wide">
                  <span className="uppercase">Prince Shrestha_Resume.pdf</span>
                  <a href="/Prince Shrestha_Resume.pdf" target="_blank" rel="noreferrer" className="text-maroon hover:text-ink transition-colors">
                    OPEN →
                  </a>
                </div>
                <iframe src="/Prince Shrestha_Resume.pdf" title="CV" className="w-full" style={{ height: '85vh' }} />
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </article>
    </section>
  );
}

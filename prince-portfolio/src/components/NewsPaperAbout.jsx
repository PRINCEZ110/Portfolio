import { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';

/* ────────────────────────────────────────────────
   1 · TopMeta — tiny mono strip
   ──────────────────────────────────────────────── */
function TopMeta() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 px-4 md:px-8 pt-4 pb-2 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-inksoft border-b border-rule/60">
      <span>Regd. No. 364-B · Itahari</span>
      <span className="hidden sm:inline text-maroon font-bold">सत्यं · सुन्दरम् · कोडम्</span>
      <span>Est. 1965 · माघ २२</span>
    </div>
  );
}

/* ────────────────────────────────────────────────
   2 · Ears — left stat / masthead / right stat
   ──────────────────────────────────────────────── */
function Ears() {
  const rates = [
    ['Frontend', 'React · Tailwind'],
    ['Backend', 'Java · JSP · MySQL'],
    ['Design', 'Figma · UI/UX'],
  ];

  return (
    <header className="grid grid-cols-1 860:grid-cols-[1fr_2fr_1fr] gap-5 md:gap-6 px-4 md:px-8 pt-6 pb-6 border-b-[3px] border-ink">
      <div className="border-2 border-ink/80 bg-paperdark/25 p-4">
        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-inksoft text-center border-b border-rule/60 pb-1.5 mb-3">
          Dispatch Rates
        </p>
        <ul className="space-y-2 font-pserif text-[13px]">
          {rates.map(([k, v]) => (
            <li key={k} className="flex items-center justify-between gap-3">
              <span className="text-inksoft">{k}</span>
              <span className="font-semibold text-ink text-right">{v}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 font-mono text-[9px] uppercase tracking-widest text-brass/80 text-center">
          Rates speculative · output shipped
        </p>
      </div>

      <div className="text-center self-center 860:px-2">
        <p className="font-deva text-xs md:text-sm tracking-[0.45em] text-inksoft mb-2">सत्यं · सुन्दरम् · कोडम्</p>
        <h1
          className="np-masthead font-playfair italic font-black text-ink leading-[0.95]"
          style={{ fontSize: 'clamp(2.6rem, 8vw, 5.6rem)' }}
        >
          The Prince Patrika
        </h1>
        <p className="mt-2 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.45em] text-maroon">
          Vol. I — The Independent Weekly of Code
        </p>
        <p className="mt-2 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-inksoft">
          Published from Kathmandu · एडिटर प्रिन्स
        </p>
      </div>

      <div className="border-2 border-ink/80 bg-paperdark/25 p-4 text-center">
        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-inksoft border-b border-rule/60 pb-1.5 mb-3">
          Status Today
        </p>
        <p className="font-playfair italic font-bold text-3xl md:text-4xl text-maroon">OPEN</p>
        <p className="mt-2 font-pserif text-[13px] text-ink">Open for full-stack &amp; frontend roles</p>
        <p className="font-mono text-[10px] text-brass mt-2">React · Node · Tailwind · MySQL</p>
      </div>
    </header>
  );
}

/* ────────────────────────────────────────────────
   3 · BylineBar — vol/date/price under heavy+thin rules
   ──────────────────────────────────────────────── */
function BylineBar() {
  return (
    <div className="px-4 md:px-8 pt-6">
      <div className="border-t-[3px] border-ink" />
      <div className="border-t border-ink/70" />
      <div className="flex flex-wrap items-center justify-between gap-2 py-2.5 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-inksoft">
        <span className="text-ink">Vol. 1 · No. 1 — Kathmandu / Itahari</span>
        <span className="hidden sm:inline">Sat. 03 August 1965 · आजको समाचार</span>
        <span className="text-maroon font-bold">Price: रु ५</span>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   4 · HeadlineLede — kicker, headline, deck, two columns + photo
   ──────────────────────────────────────────────── */
function HeadlineLede() {
  return (
    <section className="px-4 md:px-8 mt-2">
      <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-maroon mb-3">
        व्यक्तित्व · The Personality Page
      </p>
      <h2
        className="font-playfair font-black uppercase leading-[0.95] text-ink"
        style={{ fontSize: 'clamp(2.1rem, 5.5vw, 4.4rem)' }}
      >
        Full-Stack Editor Prints the Future
      </h2>
      <p className="mt-3 font-playfair italic text-inksoft text-lg md:text-xl">
        A Kathmandu-trained developer turns algorithms, wireframes, and midnight coffee into shipped products.
      </p>

      <div className="mt-6 grid grid-cols-1 860:grid-cols-2 gap-6 md:gap-8">
        <div className="border-t-2 border-ink/80 pt-4">
          <div className="np-cols-2 broad-text font-pserif text-[14px] leading-relaxed text-ink/90">
            <p className="np-dropcap">
              Hi, I&rsquo;m Prince — a full-stack developer building elegant digital experiences with React, Tailwind
              CSS, JavaScript, and thoughtful UI design. Every page I ship is set in clean architecture and printed in
              responsive layouts, from the first wireframe to the final deploy.
            </p>
            <p>
              My daily routine is an editorial desk: receiving the brief in the morning, setting the headline by noon,
              and rolling the presses at night. Accessibility, performance, and refined visual design are the house
              style — whether the output is a landing page or a full-stack application.
            </p>
          </div>

          <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.25em] text-brass">
            Photographed with a Rolleiflex — press archive
          </p>
        </div>

        <aside className="flex flex-col gap-5">
          <figure className="relative border-2 border-ink/80 bg-paperdark/40 p-2">
            <div className="np-halftone relative aspect-[4/5] w-full overflow-hidden border border-ink/60">
              <img
                src="/Aboutimage.jpg"
                alt="Prince Shrestha — portrait"
                className="absolute inset-0 h-full w-full object-cover opacity-90"
                loading="lazy"
              />
            </div>
            <span className="absolute -rotate-[9deg] right-4 top-5 inline-block border-[3px] border-double border-maroon rounded-full px-3 py-2 text-center font-mono text-[8px] uppercase tracking-widest text-maroon bg-paper">
              Authentic ·<br />Certified<br />1965
            </span>
            <figcaption className="mt-1.5 pt-2 border-t border-rule/60 font-mono text-[9px] uppercase tracking-[0.2em] text-inksoft text-center">
              फोटो · प्रिन्स श्रेष्ठ — the living editor
            </figcaption>
          </figure>

          <blockquote className="border-l-4 border-maroon bg-paperdark/25 p-4">
            <p className="font-playfair italic text-[14px] text-ink/90 leading-relaxed">
              &ldquo;Building premium digital experiences through thoughtful design, clean code, and meaningful
              interactions.&rdquo;
            </p>
            <footer className="mt-2 font-mono text-[9px] uppercase tracking-[0.25em] text-inksoft">
              — The Bureau of Taste
            </footer>
          </blockquote>
        </aside>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   5 · ThreeColumnFeature — Background / Toolkit / Approach
   ──────────────────────────────────────────────── */
function ThreeColumnFeature() {
  const toolkit = [
    'React.js',
    'JavaScript',
    'Tailwind CSS',
    'HTML5 / CSS3',
    'Java',
    'JSP · Servlet',
    'JDBC · MySQL',
    'Figma',
    'Git · GitHub',
    'UI/UX Design',
  ];

  return (
    <section className="px-4 md:px-8 mt-8">
      <div className="border-t-[3px] border-ink" />
      <div className="border-t border-ink/60" />
      <div className="grid grid-cols-1 860:grid-cols-3 860:divide-x divide-rule/50">
        <div className="py-5 860:pr-6">
          <h3 className="font-playfair font-bold text-2xl text-ink">Background</h3>
          <p className="np-dropcap font-pserif text-[14px] leading-relaxed text-ink/90 mt-3">
            BSc (Hons) Computing — Itahari International College × London Metropolitan University, training in
            Kathmandu while printing pages for the web, worldwide.
          </p>
          <p className="font-pserif text-[14px] leading-relaxed text-ink/90 mt-3">
            Editorial columns covered: algorithms and data structures, software engineering, web development, and
            database systems — the four columns on which every shipped product stands.
          </p>
        </div>

        <div className="py-5 860:px-6">
          <h3 className="font-playfair font-bold text-2xl text-ink">Toolkit</h3>
          <ul className="mt-3">
            {toolkit.map((t) => (
              <li key={t} className="flex items-center justify-between py-2 border-b border-dotted border-rule/80">
                <span className="font-pserif text-[13px] text-ink">{t}</span>
                <span className="text-brass font-mono text-[11px]">✦</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="py-5 860:pl-6">
          <h3 className="font-playfair font-bold text-2xl text-ink">Approach</h3>
          <p className="np-dropcap font-pserif text-[14px] leading-relaxed text-ink/90 mt-3">
            Like good journalism, good engineering turns raw inputs into something people can actually use. I frontend,
            backend, and design the space in between — each feature written, styled, and shipped by hand.
          </p>
          <p className="font-pserif text-[14px] leading-relaxed text-ink/90 mt-3">
            The desk is open. Junior to mid-level full-stack or frontend positions, apply through the contact section.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   6 · BottomRow — Stop Press + classified ad
   ──────────────────────────────────────────────── */
function BottomRow() {
  const stops = [
    'Wanted: full-stack developer — apply at the contact section',
    'Fresh stock: React components · उत्तम गुणस्तर',
    'Market report: JavaScript shares remain strong',
    'Running the presses nightly from Kathmandu',
  ];

  const stack = ['React', 'Tailwind', 'REST APIs', 'Java', 'MySQL'];

  return (
    <section className="px-4 md:px-8 mt-5 grid grid-cols-1 860:grid-cols-2 gap-5">
      <div className="border-2 border-ink p-4">
        <p className="font-playfair italic font-bold text-lg text-maroon">Stop Press</p>
        <ul className="mt-2 space-y-2">
          {stops.map((s) => (
            <li key={s} className="flex gap-2 font-pserif text-[13px] text-ink/90">
              <span className="text-brass">■</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-4 border-double border-ink/80 p-4 text-center">
        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-inksoft">विज्ञापन · Classified</p>
        <h3 className="font-playfair font-bold text-xl text-ink mt-1">Fresh Stock Arrived</h3>
        <div className="mt-2 flex flex-wrap justify-center gap-2 font-mono text-[10px] text-maroon uppercase">
          {stack.map((s) => (
            <span key={s} className="border border-maroon/50 px-2 py-0.5">
              {s}
            </span>
          ))}
        </div>
        <p className="mt-3 font-mono text-[10px] uppercase text-brass">REST APIs · तीव्र वितरण — sold out daily</p>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-inksoft">Enquire at the contact section</p>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   7 · Banner — a message to the nation, 3 columns
   ──────────────────────────────────────────────── */
function Banner() {
  return (
    <section id="cv" className="scroll-mt-24 px-4 md:px-8 mt-8">
      <div className="border-t-[3px] border-ink" />
      <div className="border-t border-ink/60" />
      <div className="pt-5">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.4em] text-maroon mb-3">
          — An Address to the Nation —
        </p>
        <h3 className="text-center font-playfair italic font-bold text-2xl md:text-3xl text-ink">
          From the Editor&rsquo;s Desk
        </h3>
        <div className="np-cols-3 broad-text font-pserif text-[14px] leading-relaxed text-ink/90 mt-4">
          <p className="np-dropcap">
            Fellow readers: good software is an act of journalism. It reports the truth of a requirement, holds the
            reader — the user — in trust, and ships in time for the morning edition. No page leaves this office until
            it reads cleanly at every width, loads quickly, and is accessible to all.
          </p>
          <p>
            The values of this paper are simple: real progress over polished promises, honest code over clever
            one-liners, and design that serves rather than decorates. Each release is a fresh print run — reviewed,
            proofed, and rolled into production with the same care as tomorrow's front page.
          </p>
          <p>
            To the teams reading from abroad: the byline is Prince, the bureau is Kathmandu, and the deadline is always
            now. Let us set your next headline together. नेपालबाट प्रत्यक्ष प्रसारण — broadcast live from Nepal.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   8 · FooterStrip — mono credit line + CV actions
   ──────────────────────────────────────────────── */
function FooterStrip({ viewing, setViewing }) {
  return (
    <footer className="px-4 md:px-8 pt-6 pb-6 mt-6">
      <div className="border-t-[3px] border-ink" />
      <div className="border-t border-ink/60" />
      <div className="flex flex-wrap items-center justify-center gap-4 pt-5">
        <button
          onClick={() => setViewing((v) => !v)}
          className="group font-mono text-[12px] uppercase tracking-widest text-ink border-2 border-dashed border-ink bg-paper/70 px-6 py-3 hover:text-maroon hover:border-maroon transition-colors duration-300"
        >
          <span className="mr-3 text-maroon">✂</span>
          {viewing ? 'Close the Paper' : 'View Full Paper (PDF)'}
          <span className="ml-3 text-maroon">✂</span>
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
      </div>
      <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.3em] text-inksoft">
        Editor-in-chief: Prince Shrestha · Printed daily in the Kathmandu Valley · नेपाल · Est. 1965
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
      <article className="np-grain relative w-full flex-1 border-4 border-ink bg-paper overflow-hidden">
        <TopMeta />
        <Ears />
        <BylineBar />
        <HeadlineLede />
        <ThreeColumnFeature />
        <BottomRow />
        <Banner />
        <FooterStrip viewing={viewing} setViewing={setViewing} />
      </article>

      <AnimatePresence>
        {viewing && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-ink"
          >
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="m-4 md:m-6 border-4 border-ink bg-paper shadow-card"
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
    </section>
  );
}
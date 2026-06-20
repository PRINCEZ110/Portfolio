import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CV() {
  const [viewing, setViewing] = useState(false);

  return (
    <section id="cv" className="px-6 md:px-12 py-24 border-t border-border">
      <div className="max-w-8xl mx-auto">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <span className="font-mono text-xs text-accent tracking-widest uppercase">resume</span>
            <h2
              className="font-display font-bold text-snow mt-3 leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              Curriculum<br />
              <span className="text-accent">Vitae.</span>
            </h2>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setViewing(v => !v)}
              className="flex items-center gap-2 border border-border px-6 py-3 font-display text-sm text-snow hover:border-accent hover:text-accent transition-all duration-200"
            >
              {viewing ? '✕ Close' : '👁 Preview'}
            </button>
            <a
              href="/Prince_Shrestha_CV.pdf"
              download="Prince_Shrestha_CV.pdf"
              className="flex items-center gap-2 bg-accent text-ink font-display font-bold px-6 py-3 hover:bg-snow transition-colors duration-200"
            >
              ↓ Download CV
            </a>
          </div>
        </div>

        {/* CV highlights from the real CV */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Education', value: 'BSc (Hons) Computing', sub: 'Itahari International College x London Met' },
            { label: 'Experience', value: '3 Projects', sub: 'NagarSewa | TimeStar | SahakariNet' },
            { label: 'Seeking', value: 'Internship / Junior Dev', sub: 'Frontend | React.js | UI/UX' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="border border-border p-5 hover:border-accent/40 transition-colors duration-300"
            >
              <span className="font-mono text-[10px] text-accent tracking-widest uppercase">{item.label}</span>
              <p className="font-display font-semibold text-snow mt-2 text-base">{item.value}</p>
              <p className="font-body text-muted text-xs mt-1">{item.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Inline PDF viewer */}
        <AnimatePresence>
          {viewing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="border border-border overflow-hidden">
                <div className="bg-card px-4 py-2 flex items-center justify-between border-b border-border">
                  <span className="font-mono text-xs text-muted">Prince_Shrestha_CV.pdf</span>
                  <a
                    href="/Prince_Shrestha_CV.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs text-accent hover:underline"
                  >
                    open in new tab ↗
                  </a>
                </div>
                <iframe
                  src="/Prince_Shrestha_CV.pdf"
                  title="Prince Shrestha CV"
                  className="w-full"
                  style={{ height: '80vh' }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

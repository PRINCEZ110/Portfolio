import { motion } from 'framer-motion';
import { Code, Palette, GitBranch, Database } from 'lucide-react';

const timeline = [
  {
    year: '2024',
    title: 'Started Web Development',
    subtitle: 'Self-taught journey',
    description: 'Began with HTML, CSS, and JavaScript. Built first responsive websites and fell in love with frontend engineering.',
  },
  {
    year: '2025',
    title: 'BSc (Hons) Computing',
    subtitle: 'Itahari International College x London Met',
    description: 'Deepened knowledge in software engineering, databases, and system design while building real-world projects.',
  },
  {
    year: '2025–2026',
    title: 'Project Portfolio',
    subtitle: 'NagarSewa · TimeStar · SahakariNet',
    description: 'Shipped 3 full-stack projects spanning civic tech, e-commerce, and enterprise management systems.',
  },
  {
    year: '2026+',
    title: 'Seeking Frontend Role',
    subtitle: 'Internship / Junior Developer',
    description: 'Actively looking for opportunities to contribute, grow, and build impactful products with a great team.',
  },
];

const focusAreas = [
  { icon: Code, label: 'Frontend Engineering', desc: 'React, Tailwind, responsive architecture' },
  { icon: Palette, label: 'UI/UX Design', desc: 'Clean interfaces, user-centered design' },
  { icon: Database, label: 'Full-Stack Logic', desc: 'Java, MVC, REST APIs, MySQL' },
  { icon: GitBranch, label: 'Dev Tools', desc: 'Git, CI/CD, agile workflows' },
];

export default function About() {
  return (
    <section id="about" className="px-6 md:px-12 lg:px-20 py-24 md:py-32 bg-[#F9F8F4] relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-gold/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-8xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-label"
        >
          <span /><span>About</span>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-14 lg:gap-20">
          {/* Left — intro + focus */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2"
          >
            <h2
              className="font-display font-bold text-slate leading-[1.05] mb-8"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}
            >
              Turning complex problems into{' '}
              <span className="text-wine">elegant solutions.</span>
            </h2>

            <div className="space-y-4 font-body text-gray/80 leading-relaxed text-[15px]">
              <p>
                I'm a frontend-focused developer based in Itahari, Nepal, currently pursuing my
                BSc (Hons) in Computing at Itahari International College (London Metropolitan University).
              </p>
              <p>
                My passion lies in building interfaces that are not just visually refined but also
                performant, accessible, and a pleasure to use. I believe great design is invisible —
                it just feels right.
              </p>
              <p>
                Right now I'm looking for internship and junior developer opportunities where I can
                contribute to real products, learn from seasoned engineers, and keep growing my craft.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-10 flex gap-8">
              {[
                { num: '3+', label: 'Projects Shipped' },
                { num: '1+', label: 'Years Building' },
                { num: '∞', label: 'Curiosity', gold: true },
              ].map((s) => (
                <div key={s.label}>
                  <span className={`font-display font-bold text-[2rem] leading-none block ${s.gold ? 'text-gold' : 'text-slate'}`}>
                    {s.num}
                  </span>
                  <span className="font-mono text-[10px] text-muted tracking-wider mt-1.5 block">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Focus areas */}
            <div className="mt-12 grid grid-cols-2 gap-3">
              {focusAreas.map((area) => (
                <motion.div
                  key={area.label}
                  whileHover={{ y: -2 }}
                  className="bg-white border border-[#E8E5D8] rounded-xl p-4 hover:border-gold/20 hover:shadow-soft transition-all duration-300"
                >
                  <area.icon size={16} className="text-gold mb-2" />
                  <span className="font-display text-xs font-semibold text-slate block">{area.label}</span>
                  <span className="font-body text-[10px] text-muted mt-0.5 block">{area.desc}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
          >
            <span className="font-mono text-[10px] text-gold tracking-[0.15em] uppercase block mb-8">My Journey</span>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent" />

              <div className="space-y-10">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative pl-10"
                  >
                    {/* Dot */}
                    <div className="absolute left-0 top-1.5 w-[23px] h-[23px] rounded-full bg-white border-2 border-gold/40 flex items-center justify-center">
                      <div className="w-[7px] h-[7px] rounded-full bg-gold" />
                    </div>

                    <span className="font-mono text-[10px] text-gold tracking-[0.15em] uppercase">{item.year}</span>
                    <h3 className="font-display font-semibold text-slate mt-1 text-base">{item.title}</h3>
                    <span className="font-body text-xs text-muted block mt-0.5">{item.subtitle}</span>
                    <p className="font-body text-sm text-gray/70 leading-relaxed mt-2 max-w-md">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

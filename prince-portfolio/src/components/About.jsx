import { motion } from 'framer-motion';

const skills = [
  { category: 'Frontend', items: ['React.js', 'HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Java', 'JSP', 'Servlets', 'JDBC', 'MySQL'] },
  { category: 'Design', items: ['UI/UX Design', 'Responsive Design', 'Figma'] },
  { category: 'Tools', items: ['Git', 'GitHub', 'MVC Architecture', 'BCrypt'] },
];

export default function About() {
  return (
    <section id="about" className="px-6 md:px-12 lg:px-20 py-24 md:py-32 bg-white">
      <div className="max-w-8xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-start">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-mono text-xs text-steel tracking-widest uppercase">about me</span>
          <h2 className="font-display font-bold text-slate mt-3 mb-6" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            Hi I'm Prince
          </h2>

          <div className="space-y-4 font-body text-gray leading-relaxed">
            <p>
              I'm a web designer and developer, crafting refined, high-performance digital experiences with a strong focus on modern aesthetics, precision, and usability.
            </p>
            <p>
              I build clean, responsive, and conversion-driven websites that reflect both brand identity and professional excellence.
            </p>
            <p>
              My work is driven by detail, structure, and intention—transforming concepts into elegant, functional digital products that feel seamless across every device and interaction.
            </p>
          </div>

          <div className="mt-12 flex gap-6">
            <div>
              <span className="font-display font-bold text-slate text-4xl">3+</span>
              <p className="font-mono text-xs text-muted mt-1 tracking-wide">projects shipped</p>
            </div>
            <div className="w-px bg-border" />
            <div>
              <span className="font-display font-bold text-slate text-4xl">3+</span>
              <p className="font-mono text-xs text-muted mt-1 tracking-wide">years learning</p>
            </div>
            <div className="w-px bg-border" />
            <div>
              <span className="font-display font-bold text-gold text-4xl">∞</span>
              <p className="font-mono text-xs text-muted mt-1 tracking-wide">curiosity</p>
            </div>
          </div>
        </motion.div>

        {/* Right — skills grid */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 gap-4"
        >
          {skills.map((s, i) => (
            <div key={i} className="border border-border bg-white rounded-xl p-5 hover:border-steel/30 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
              <span className="font-mono text-[10px] text-steel tracking-widest uppercase">{s.category}</span>
              <ul className="mt-3 space-y-1.5">
                {s.items.map(item => (
                  <li key={item} className="font-body text-slate text-sm flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-gold/40 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

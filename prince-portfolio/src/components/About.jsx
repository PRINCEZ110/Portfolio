import { motion } from 'framer-motion';

const skills = [
  { category: 'Frontend', items: ['React.js', 'HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Java', 'JSP', 'Servlets', 'JDBC', 'MySQL'] },
  { category: 'Design', items: ['UI/UX Design', 'Responsive Design', 'Figma'] },
  { category: 'Tools', items: ['Git', 'GitHub', 'MVC Architecture', 'BCrypt'] },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function About() {
  return (
    <section id="about" className="px-6 md:px-12 lg:px-20 py-24 md:py-32 bg-[#F9F8F4]">
      <div className="max-w-8xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-14"
        >
          <span className="w-8 h-px bg-gold" />
          <span className="text-xs text-gold tracking-[0.15em] uppercase" style={{ fontFamily: "'Lato', sans-serif" }}>About</span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display font-bold text-slate leading-[1.05] mb-8" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontFamily: "'Josefin Sans', sans-serif" }} >
              Hi, I'm{' '}
              <span className="text-wine">Prince</span>
            </h2>

            <div className="space-y-5 font-body text-gray leading-relaxed text-[15px] md:text-[16px]" style={{ fontFamily: "'Lato', sans-serif" }}>
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

            <div className="mt-12 flex gap-8">
              <div className="text-center">
                <span className="font-display font-bold text-slate text-[2.2rem] leading-none block">3+</span>
                <span className="font-mono text-[11px] text-muted tracking-wider mt-1.5 block">Projects Shipped</span>
              </div>
              <div className="w-px bg-border self-stretch" />
              <div className="text-center">
                <span className="font-display font-bold text-slate text-[2.2rem] leading-none block">3+</span>
                <span className="font-mono text-[11px] text-muted tracking-wider mt-1.5 block">Years Learning</span>
              </div>
              <div className="w-px bg-border self-stretch" />
              <div className="text-center">
                <span className="font-display font-bold text-gold text-[2.2rem] leading-none block">∞</span>
                <span className="font-mono text-[11px] text-muted tracking-wider mt-1.5 block">Curiosity</span>
              </div>
            </div>
          </motion.div>

          {/* Right — skills */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {skills.map((s) => (
              <motion.div
                key={s.category}
                variants={cardItem}
                className="bg-white rounded-xl border border-[#E8E5D8] p-5 hover:border-gold/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="font-mono text-[10px] text-gold tracking-[0.15em] uppercase">{s.category}</span>
                <ul className="mt-4 space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="font-body text-sm text-slate/80 flex items-center gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-gold/50 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

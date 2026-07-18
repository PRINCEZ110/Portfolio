import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Palette, Server, Wrench } from 'lucide-react';

const skillCategories = [
  {
    icon: Code2,
    label: 'Frontend',
    color: 'text-gold',
    skills: [
      { name: 'React.js', level: 85 },
      { name: 'JavaScript', level: 80 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'HTML5 / CSS3', level: 95 },
      { name: 'Framer Motion', level: 75 },
    ],
  },
  {
    icon: Server,
    label: 'Backend',
    color: 'text-steel',
    skills: [
      { name: 'Java', level: 75 },
      { name: 'JSP / Servlets', level: 70 },
      { name: 'JDBC', level: 65 },
      { name: 'MySQL', level: 70 },
      { name: 'REST APIs', level: 60 },
    ],
  },
  {
    icon: Palette,
    label: 'Design',
    color: 'text-orange',
    skills: [
      { name: 'UI/UX Design', level: 80 },
      { name: 'Responsive Design', level: 90 },
      { name: 'Figma', level: 65 },
      { name: 'Design Systems', level: 60 },
    ],
  },
  {
    icon: Wrench,
    label: 'Tools',
    color: 'text-sage',
    skills: [
      { name: 'Git / GitHub', level: 80 },
      { name: 'MVC Architecture', level: 75 },
      { name: 'BCrypt Security', level: 60 },
      { name: 'Vite / Webpack', level: 65 },
    ],
  },
];

function SkillBar({ name, level, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="font-body text-xs text-slate/70">{name}</span>
        <span className="font-mono text-[9px] text-muted">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-border/60 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-gold/60 to-gold"
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="px-6 md:px-12 lg:px-20 py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-8xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-label"
        >
          <span /><span>Skills & Expertise</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="font-display font-bold text-slate leading-[1.05] mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            Technologies I work with.
          </h2>
          <p className="font-body text-gray/70 max-w-md text-sm md:text-base leading-relaxed mb-14">
            Continuous learning is part of the craft — here's where I'm most confident today.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#F9F8F4] border border-[#E8E5D8] rounded-xl p-6 hover:shadow-soft transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-white border border-[#E8E5D8] flex items-center justify-center">
                  <cat.icon size={16} className={cat.color} />
                </div>
                <span className="font-display font-semibold text-sm text-slate">{cat.label}</span>
              </div>

              <div className="space-y-3.5">
                {cat.skills.map((skill, i) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

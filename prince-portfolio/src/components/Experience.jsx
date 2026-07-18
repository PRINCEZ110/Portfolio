import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, GraduationCap, Building2, Target } from 'lucide-react';

const experiences = [
  {
    icon: Building2,
    title: 'NagarSewa — Civic Tech Platform',
    role: 'Full-Stack Developer',
    period: '2025–2026',
    description: 'Built a citizen-to-government issue reporting platform with real-time tracking, role-based dashboards, and data visualization.',
    highlights: ['React + Tailwind frontend', 'REST API integration', 'Responsive civic dashboard'],
  },
  {
    icon: Target,
    title: 'TimeStar — E-Commerce Store',
    role: 'Frontend Developer',
    period: '2024–2025',
    description: 'Designed and developed a modern online watch store focusing on clean product discovery, seamless browsing, and conversion-oriented UI.',
    highlights: ['Product catalog & search', 'UI/UX focused on conversions', 'Cross-browser responsive'],
  },
  {
    icon: Briefcase,
    title: 'SahakariNet — Cooperative Management',
    role: 'Full-Stack Developer',
    period: '2026',
    description: 'Architected a full-stack management system for cooperatives handling member accounts, financial transactions, loans, and secure auth.',
    highlights: ['Java MVC + JSP + JDBC', 'Role-based access control', 'BCrypt authentication'],
  },
  {
    icon: GraduationCap,
    title: 'BSc (Hons) Computing',
    role: 'Student',
    period: '2025–Present',
    description: 'Pursuing a computing degree at Itahari International College (affiliated with London Metropolitan University), deepening knowledge in software engineering and system design.',
    highlights: ['Software engineering', 'Database systems', 'Ongoing project work'],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="px-6 md:px-12 lg:px-20 py-24 md:py-32 bg-[#F9F8F4] relative overflow-hidden">
      <div className="max-w-8xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-label"
        >
          <span /><span>Experience</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2
            className="font-display font-bold text-slate leading-[1.05] mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            Where I've made an impact.
          </h2>
          <p className="font-body text-gray/70 max-w-md text-sm md:text-base leading-relaxed">
            Projects and roles that shaped my approach to building software.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-gold/30 via-gold/10 to-transparent" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <TimelineItem key={exp.title} item={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-14"
    >
      {/* Icon circle */}
      <div className="absolute left-0 top-0 w-[39px] h-[39px] rounded-full bg-white border-2 border-gold/30 flex items-center justify-center shadow-soft">
        <Icon size={16} className="text-gold" />
      </div>

      <div className="bg-white border border-[#E8E5D8] rounded-xl p-6 hover:shadow-premium hover:-translate-y-0.5 transition-all duration-500">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <span className="font-mono text-[10px] text-gold tracking-[0.15em] uppercase">{item.period}</span>
            <h3 className="font-display font-semibold text-slate mt-1 text-base md:text-lg">{item.title}</h3>
            <span className="font-body text-xs text-muted block mt-0.5">{item.role}</span>
          </div>
        </div>

        <p className="font-body text-sm text-gray/70 leading-relaxed mb-4">{item.description}</p>

        <div className="flex flex-wrap gap-2">
          {item.highlights.map((h) => (
            <span
              key={h}
              className="font-mono text-[9px] tracking-wider px-2.5 py-1 rounded-md bg-clay border border-border/50 text-muted"
            >
              {h}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

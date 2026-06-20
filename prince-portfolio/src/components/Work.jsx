import { motion } from 'framer-motion';
import { useRef } from 'react';

const projects = [
  {
    num: '01',
    title: 'NagarSewa',
    subtitle: 'E-Governance Web App',
    tags: ['React.js', 'Tailwind CSS', 'JavaScript', 'Civic Tech'],
    desc: 'Citizen-focused platform for reporting local issues and tracking resolution progress. Built responsive frontend interfaces and enhanced communication between citizens and government offices.',
    color: '#C8FF00',
  },
  {
    num: '02',
    title: 'TimeStar',
    subtitle: 'E-Commerce Watch Store',
    tags: ['HTML', 'CSS', 'Java', 'UI/UX'],
    desc: 'Online watch store with product browsing and search features. Designed a user-friendly interface focused on intuitive navigation and product discovery.',
    color: '#A0CFFF',
  },
  {
    num: '03',
    title: 'SahakariNet',
    subtitle: 'Cooperative Management System',
    tags: ['Java', 'JSP', 'Servlets', 'MySQL', 'MVC'],
    desc: 'Full-stack cooperative management web app with member search, deposits, withdrawals, loan disbursement, and role-based access control with BCrypt password hashing.',
    color: '#FFB86C',
  },
];

export default function Work() {
  return (
    <section id="work" className="px-6 md:px-12 py-24">
      <div className="max-w-8xl mx-auto">
      <div className="flex items-end justify-between mb-14">
        <div>
          <span className="font-mono text-xs text-accent tracking-widest uppercase ">selected cases</span>
          <h2 className="font-display font-bold text-snow mt-2" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            Work that matters
          </h2>
        </div>
        <a href="https://github.com/PRINCEZ110?tab=repositories" target="_blank" rel="noreferrer"
          className="hidden md:inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-accent transition-colors border border-border px-4 py-2">
          github →
        </a>
      </div>

      <div className="divide-y divide-border">
        {projects.map((p, i) => (
          <ProjectRow key={i} project={p} />
        ))}
      </div>
      </div>
    </section>
  );
}

function ProjectRow({ project }) {
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col md:flex-row md:items-center gap-4 py-8 cursor-pointer"
    >
      <span className="font-mono text-xs text-border group-hover:text-accent transition-colors w-10 flex-shrink-0">
        {project.num}
      </span>

      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
          <h3 className="font-display font-semibold text-snow text-xl group-hover:text-accent transition-colors duration-200">
            {project.title}
          </h3>
          <span className="tag">{project.subtitle}</span>
        </div>
        <p className="font-body text-muted text-sm leading-relaxed max-w-2xl">{project.desc}</p>
      </div>

      <div className="flex flex-wrap gap-2 md:max-w-xs">
        {project.tags.map(t => (
          <span key={t} className="tag" style={{ borderColor: project.color + '33', color: project.color }}>
            {t}
          </span>
        ))}
      </div>

      <span className="text-muted group-hover:text-accent transition-colors text-xl flex-shrink-0 hidden md:block">→</span>
    </motion.div>
  );
}

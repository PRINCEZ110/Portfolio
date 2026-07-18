import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Code2 } from 'lucide-react';
import { projects } from '../data/projects';
import BrowserFrame from './BrowserFrame';

const filters = ['All', 'Web App', 'E-Commerce', 'Enterprise', 'React', 'Java'];

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 25, mass: 0.5 });
  const y = useTransform(smooth, [0, 0.3], [60, 0]);
  const opacity = useTransform(smooth, [0, 0.3], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="group"
    >
      <div className="bg-white border border-[#E8E5D8] rounded-2xl overflow-hidden hover:shadow-premium hover:-translate-y-1 transition-all duration-500">
        {/* Mockup area */}
        <Link to={`/work/${project.id}`} className="block relative overflow-hidden bg-[#0a0a0a]">
          <motion.div
            whileHover={{ scale: 1.015 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {project.id === 'nagarsewa' ? (
              <BrowserFrame url="nagar-sewa.gov/dashboard">
                <div className="h-[240px] md:h-[300px] flex items-center justify-center bg-[#0a0a0a]">
                  <div className="text-center">
                    <Code2 size={40} className="text-white/10 mx-auto mb-3" />
                    <span className="font-mono text-[10px] text-white/20">NagarSewa Dashboard Preview</span>
                  </div>
                </div>
              </BrowserFrame>
            ) : project.id === 'timestar' ? (
              <BrowserFrame url="timestar.com/products">
                <div className="h-[240px] md:h-[300px] flex items-center justify-center bg-[#0a0a0a]">
                  <div className="text-center">
                    <Code2 size={40} className="text-white/10 mx-auto mb-3" />
                    <span className="font-mono text-[10px] text-white/20">TimeStar Store Preview</span>
                  </div>
                </div>
              </BrowserFrame>
            ) : (
              <BrowserFrame url="sahakarinet.org/admin">
                <div className="h-[240px] md:h-[300px] flex items-center justify-center bg-[#0a0a0a]">
                  <div className="text-center">
                    <Code2 size={40} className="text-white/10 mx-auto mb-3" />
                    <span className="font-mono text-[10px] text-white/20">SahakariNet Dashboard Preview</span>
                  </div>
                </div>
              </BrowserFrame>
            )}
          </motion.div>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
            <span className="font-mono text-[10px] tracking-[0.15em] text-white/80 uppercase flex items-center gap-2">
              View Case Study <ArrowUpRight size={12} />
            </span>
          </div>
        </Link>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="font-mono text-[10px] text-gold tracking-[0.15em] uppercase">{project.year}</span>
              <h3 className="font-display font-bold text-slate mt-1 text-xl md:text-2xl">{project.title}</h3>
              <span className="font-body text-sm text-gray/70 block mt-0.5">{project.subtitle}</span>
            </div>
            <span
              className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
              style={{ backgroundColor: project.color }}
            />
          </div>

          <p className="font-body text-sm text-gray/70 leading-relaxed mb-5 line-clamp-2">
            {project.description}
          </p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="font-mono text-[9px] tracking-wider px-2.5 py-1 rounded-md bg-clay border border-border/50 text-muted"
              >
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="font-mono text-[9px] text-muted px-2 py-1">+{project.tech.length - 4}</span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-border/50">
            <Link
              to={`/work/${project.id}`}
              className="group/btn inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.15em] uppercase text-slate hover:text-gold transition-colors"
            >
              Case Study
              <ArrowUpRight size={12} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </Link>
            <span className="text-border">/</span>
            <a
              href="#"
              className="group/btn inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.15em] uppercase text-muted hover:text-slate transition-colors"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
              Code
            </a>
            <span className="text-border">/</span>
            <a
              href="#"
              className="group/btn inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.15em] uppercase text-muted hover:text-slate transition-colors"
            >
              <ExternalLink size={11} />
              Live
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.tags.includes(activeFilter) || p.tech.includes(activeFilter));

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.3, 0.8, 0.8, 0.3]);

  return (
    <section id="work" className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32 overflow-hidden bg-sand" ref={sectionRef}>
      <motion.div
        className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ opacity: bgOpacity, background: 'radial-gradient(circle, rgba(179,156,79,0.03), transparent 70%)' }}
      />

      <div className="max-w-8xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-label"
        >
          <span /><span>Selected Work</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2
            className="font-display font-bold text-slate leading-[0.95] mb-4"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 5rem)' }}
          >
            Projects that{' '}
            <span className="text-wine">deliver.</span>
          </h2>
          <p className="font-body text-gray/70 max-w-lg text-sm md:text-base leading-relaxed">
            Real-world applications built from the ground up — each one solving a specific problem
            with clean architecture and thoughtful UX.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`font-mono text-[10px] tracking-[0.15em] uppercase px-4 py-2 rounded-lg border transition-all duration-300 ${
                activeFilter === f
                  ? 'bg-slate text-white border-slate'
                  : 'bg-white text-muted border-[#E8E5D8] hover:border-gold/30 hover:text-slate'
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <span className="font-mono text-sm text-muted">No projects match this filter.</span>
          </div>
        )}
      </div>
    </section>
  );
}

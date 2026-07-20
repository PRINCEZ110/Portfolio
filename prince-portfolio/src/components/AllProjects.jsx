import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import AllProjectsFooter from './AllProjectsFooter';
import { scrollToSection } from '../utils/scrollToSection';

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function AllProjects() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    navigate('/');
    scrollToSection('work');
  };

  return (
    <div className="min-h-screen bg-sand">
      <div className="px-6 md:px-12 lg:px-20 pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="max-w-8xl mx-auto">
          {/* Header */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="mb-16"
          >
            <motion.div variants={fadeUp} className="mb-6">
              <button
                onClick={handleBack}
                className="text-[11px] tracking-[0.25em] text-wine uppercase inline-flex items-center gap-2 hover:text-gold transition-colors bg-transparent border-none cursor-pointer"
                style={{ fontFamily: "'Lato', sans-serif" }}
              >
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                Back to Home
              </button>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-bold text-slate leading-[0.95] mb-6"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', fontFamily: "'Josefin Sans', sans-serif" }}
            >
              All Projects
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-gray text-sm md:text-base max-w-lg leading-relaxed tracking-wide"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              A complete collection of every project I've built.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="h-px bg-gradient-to-r from-gold/20 via-brown/10 to-transparent mt-10"
            />
          </motion.div>

          {/* Project Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={`/work/${project.id}`}
                  className="group block bg-white rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="h-48 flex items-center justify-center relative overflow-hidden" style={{ background: '#F0EDD8' }}>
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{ background: `radial-gradient(circle at 50% 50%, ${project.color}, transparent 70%)` }}
                    />
                    <span
                      className="text-6xl md:text-7xl font-bold opacity-20 select-none"
                      style={{ color: project.color, fontFamily: "'Josefin Sans', sans-serif" }}
                    >
                      {project.title[0]}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] tracking-[0.2em] text-muted uppercase" style={{ fontFamily: "'Lato', sans-serif" }}>
                        {project.year}
                      </span>
                      {project.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="flex items-center gap-3">
                          <span className="w-px h-3 bg-border" />
                          <span className="text-[10px] tracking-[0.2em] text-muted uppercase" style={{ fontFamily: "'Lato', sans-serif" }}>{tag}</span>
                        </span>
                      ))}
                    </div>

                    <h3
                      className="font-bold text-slate text-xl mb-2 group-hover:text-gold transition-colors"
                      style={{ fontFamily: "'Josefin Sans', sans-serif" }}
                    >
                      {project.title}
                    </h3>

                    <p className="text-gray text-sm leading-relaxed mb-4 line-clamp-2" style={{ fontFamily: "'Lato', sans-serif" }}>
                      {project.description}
                    </p>

                    <div className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-gold" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
                      <span>View Project</span>
                      <motion.span
                        className="inline-block"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        →
                      </motion.span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AllProjectsFooter />
    </div>
  );
}

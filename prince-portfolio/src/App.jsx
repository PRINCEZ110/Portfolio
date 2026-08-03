import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LazyMotion, domAnimation } from 'framer-motion';
import Navbar from './components/Navbar';
import ProjectNavbar from './components/ProjectNavbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Work from './components/Work';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

const ProjectDetail = lazy(() => import('./components/ProjectDetail'));
const AllProjects = lazy(() => import('./components/AllProjects'));

const techStack = [
  'React.js', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'Java', 'Figma',
  'Framer Motion', 'TypeScript', 'Git', 'REST APIs', 'UI/UX Design', 'CSS3',
];

export default function App() {
  const location = useLocation();
  const isProjectPage = location.pathname.startsWith('/work/') || location.pathname === '/projects';

  return (
    <LazyMotion features={domAnimation}>
      {isProjectPage ? <ProjectNavbar /> : <Navbar />}
      <main>
        <Suspense fallback={<div className="min-h-screen bg-sand" />}>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Marquee items={techStack} />
                <Work />
                <About />
                <Contact />
              </>
            } />
            <Route path="/projects" element={<AllProjects />} />
            <Route path="/work/:projectId" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {!isProjectPage && <Footer />}
    </LazyMotion>
  );
}

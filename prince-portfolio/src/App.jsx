import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProjectNavbar from './components/ProjectNavbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Work from './components/Work';
import Skills from './components/Skills';
import About from './components/About';
import Experience from './components/Experience';
import CV from './components/CV';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';

const techStack = [
  'React.js', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'Java', 'Figma',
  'Framer Motion', 'TypeScript', 'Git', 'REST APIs', 'UI/UX Design', 'CSS3',
];

export default function App() {
  const location = useLocation();
  const isProjectPage = location.pathname.startsWith('/work/');

  return (
    <>
      {isProjectPage ? <ProjectNavbar /> : <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Marquee items={techStack} />
              <Work />
              <Skills />
              <About />
              <Experience />
              <CV />
              <Contact />
            </>
          } />
          <Route path="/work/:projectId" element={<ProjectDetail />} />
        </Routes>
      </main>
      {!isProjectPage && <Footer />}
    </>
  );
}

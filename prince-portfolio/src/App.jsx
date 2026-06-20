import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Work from './components/Work';
import About from './components/About';
import CV from './components/CV';
import Contact from './components/Contact';
import Footer from './components/Footer';

const techStack = [
  'React.js', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'Java', 'Figma',
  'Framer Motion', 'TypeScript', 'Git', 'REST APIs', 'UI/UX Design', 'CSS3',
];

export default function App() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee items={techStack} />
        <Work />
        <About />
        <CV />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

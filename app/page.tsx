import Hero from './components/portfolio/hero';
import About from './components/portfolio/about';
import Projects from './components/portfolio/projects';
import Contact from './components/portfolio/contacts';

export default function Home() {
  return (
    <div className="bg-black">
      <Hero />
      <About />
      <Projects />
      <Contact />
    </div>
  );
}

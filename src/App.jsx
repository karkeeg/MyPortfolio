import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Mindset from "./components/Mindset";
import Exploring from "./components/Exploring";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div id="app-content" className="bg-portfolio-main text-portfolio-text-primary font-sans">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Mindset />
      <Exploring />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;

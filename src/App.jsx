import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ThemeToggle from "./components/ThemeToggle";
import { useState } from "react";
import { Toaster } from "react-hot-toast"; // ✨ add this
import TtsToolbar from "./components/TtsToolbar";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <>
      <TtsToolbar />
      <div id="app-content" className={darkMode ? "dark" : ""}>
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default App;

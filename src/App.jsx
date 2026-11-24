import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CosmicStarfield from "./components/CosmicStarfield";
import { Toaster } from "react-hot-toast";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("portfolio_theme");
    if (saved !== null) {
      return saved === "dark";
    }
    return true; // Default to dark theme
  });

  useEffect(() => {
    localStorage.setItem("portfolio_theme", darkMode ? "dark" : "light");

    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute("content", darkMode ? "#0a0a0c" : "#f8fafc");
    }
  }, [darkMode]);

  return (
    <div
      id="app-content"
      className={`pf ${darkMode ? "dark" : "light"}`}
      style={{
        "--ac": "#a855f7",
        "--gl": "1",
        background: darkMode ? "#0a0a0c" : "#f8fafc",
        color: darkMode ? "#ffffff" : "#0f172a",
        fontFamily:
          "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
        fontSize: "16px",
        lineHeight: "1.6",
        overflowX: "hidden",
        WebkitFontSmoothing: "antialiased",
        minHeight: "100vh",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: darkMode ? "#131417" : "#ffffff",
            color: darkMode ? "#ffffff" : "#0f172a",
            border: darkMode
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid rgba(0,0,0,0.1)",
          },
        }}
      />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main>
        <Hero darkMode={darkMode} />
        <div style={{ position: "relative", isolation: "isolate" }}>
          <CosmicStarfield darkMode={darkMode} />
          <About darkMode={darkMode} />
          <Experience darkMode={darkMode} />
          <Skills darkMode={darkMode} />
        </div>
        <Projects darkMode={darkMode} />
        <Contact darkMode={darkMode} />
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;

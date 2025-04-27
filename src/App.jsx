import Navbar from "./Component/Navbar";
import ThemeToggle from "./Component/ThemeToggle";
import Home from "./Pages/Home";
import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Navbar />
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <Home />
    </div>
  );
}

export default App;

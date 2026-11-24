import React, { useState } from "react";

const Navbar = ({ darkMode, setDarkMode }) => {
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState("EN");
  const [menuOpen, setMenuOpen] = useState(false);

  const langs = [
    { code: "EN", label: "English" },
    { code: "NE", label: "नेपाली" },
  ];

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Skills", href: "#skills" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md transition-colors duration-300 ${
        darkMode
          ? "bg-[#0a0a0c]/80 border-b border-white/[0.06]"
          : "bg-white/85 border-b border-black/[0.06] shadow-sm"
      }`}
    >
      <nav
        aria-label="Primary"
        className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 py-3 flex items-center justify-between gap-4"
      >
        {/* Brand / Logo */}
        <a
          href="#home"
          className="flex items-center gap-3 no-underline text-[#9333ea] dark:text-[#c084fc] hover:text-[#a855f7] dark:hover:text-[#d8b4fe] transition-colors"
          style={{ fontFamily: "'Inter Tight', Inter, system-ui, sans-serif" }}
        >
          <img
            src="/BKlogo.png"
            alt="Bibek Karki Logo"
            className="h-9 w-9 object-contain rounded-lg shadow-sm"
          />
          <span
            className={`font-bold text-lg sm:text-xl tracking-tight transition-colors ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Bibek's Portfolio
          </span>
        </a>

        {/* Desktop Nav Links & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="navlinks hidden md:flex items-center gap-5 mr-3">
            {navLinks.map((link) => (
              <a key={link.name} className="nl" href={link.href}>
                {link.name}
              </a>
            ))}
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button
              className="seg"
              type="button"
              aria-label="Select language"
              aria-haspopup="true"
              aria-expanded={langOpen}
              onClick={() => setLangOpen(!langOpen)}
            >
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18" />
              </svg>
              <span>{lang}</span>
            </button>

            {langOpen && (
              <div className="lmenu">
                {langs.map((l) => (
                  <button
                    key={l.code}
                    className="lopt"
                    type="button"
                    onClick={() => {
                      setLang(l.code);
                      setLangOpen(false);
                    }}
                  >
                    <span>{l.label}</span>
                    <span className={`lc ${lang === l.code ? "on" : ""}`}>
                      {l.code}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            className="ic"
            type="button"
            aria-label="Toggle light and dark theme"
            aria-pressed={!darkMode}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? (
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            )}
          </button>

          {/* Mobile Hamburger Button */}
          <button
            className="ic burger"
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div
          className={`md:hidden flex flex-col px-6 py-4 border-t animate-fadeUp ${
            darkMode
              ? "bg-[#0a0a0c]/95 border-white/[0.06]"
              : "bg-white/95 border-black/[0.06] shadow-lg"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              className="nl text-base py-3"
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;

import React from "react";
import {
  ArrowUp,
  ExternalLink,
  Code2,
  CheckCircle2,
  Terminal,
  Cpu,
  Globe,
} from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = ({ darkMode = true }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { num: "01", name: "Home", href: "#home" },
    { num: "02", name: "About", href: "#about" },
    { num: "03", name: "Experience", href: "#experience" },
    { num: "04", name: "Skills", href: "#skills" },
    { num: "05", name: "Projects", href: "#projects" },
    { num: "06", name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/karkeeg",
      icon: <FaGithub size={14} />,
      handle: "@karkeeg",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/bibek-karki-b41703272/",
      icon: <FaLinkedin size={14} />,
      handle: "bibek-karki",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/bibek_karki8/",
      icon: <FaInstagram size={14} />,
      handle: "@bibek_karki8",
    },
    {
      name: "Email",
      href: "mailto:karkibibek642@gmail.com",
      icon: <Terminal size={14} />,
      handle: "karkibibek642",
    },
  ];

  return (
    <footer
      style={{
        position: "relative",
        background: darkMode ? "#060709" : "#ffffff",
        borderTop: darkMode
          ? "1px solid rgba(255, 255, 255, 0.1)"
          : "1px solid rgba(0, 0, 0, 0.08)",
        padding: "96px clamp(20px, 4vw, 48px) 48px",
        color: darkMode ? "#e4e4e7" : "#0f172a",
        transition: "background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease",
        fontFamily: "'Inter Tight', Inter, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "64px",
        }}
      >
        {/* ============================================================ */}
        {/* TOP STATUS BAR & BACK TO TOP                                 */}
        {/* ============================================================ */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            borderBottom: darkMode
              ? "1px solid rgba(255, 255, 255, 0.08)"
              : "1px solid rgba(0, 0, 0, 0.08)",
            paddingBottom: "32px",
          }}
        >
          {/* Active Status Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "6px 16px",
              borderRadius: "9999px",
              border: darkMode
                ? "1px solid rgba(16, 185, 129, 0.3)"
                : "1px solid rgba(16, 185, 129, 0.35)",
              background: darkMode
                ? "rgba(16, 185, 129, 0.08)"
                : "rgba(16, 185, 129, 0.1)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: ".06em",
              color: darkMode ? "#34d399" : "#059669",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#10b981",
                boxShadow: "0 0 10px #10b981",
              }}
            />
            <span>ACTIVE SINCE 2024 — PRESENT</span>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            type="button"
            aria-label="Back to top"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              background: darkMode ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.04)",
              border: darkMode
                ? "1px solid rgba(255, 255, 255, 0.12)"
                : "1px solid rgba(0, 0, 0, 0.12)",
              borderRadius: "999px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              color: darkMode ? "#d4d4d8" : "#334155",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#c084fc";
              e.currentTarget.style.color = "#c084fc";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = darkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)";
              e.currentTarget.style.color = darkMode ? "#d4d4d8" : "#334155";
              e.currentTarget.style.transform = "none";
            }}
          >
            <span>Back to Top</span>
            <ArrowUp size={13} />
          </button>
        </div>

        {/* ============================================================ */}
        {/* HUGE MONOLITH BRAND BANNER                                   */}
        {/* ============================================================ */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: "20px 48px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(44px, 7.5vw, 96px)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              textTransform: "uppercase",
              color: darkMode ? "#ffffff" : "#0f172a",
            }}
          >
            Bibek Karki<span style={{ color: "#a855f7" }}>.</span>
          </h1>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "13px",
              color: darkMode ? "#a1a1aa" : "#64748b",
            }}
          >
            <span style={{ fontWeight: 600, color: darkMode ? "#c084fc" : "#9333ea" }}>
              FULL-STACK SOFTWARE ENGINEER
            </span>
            <span>Kathmandu, Nepal • Available Globally</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 4-COLUMN EDITORIAL DIRECTORY                                 */}
        {/* ============================================================ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(240px, 100%), 1fr))",
            gap: "40px clamp(24px, 4vw, 48px)",
          }}
        >
          {/* Column 1: Profile & Architecture */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                letterSpacing: ".2em",
                color: darkMode ? "#c084fc" : "#9333ea",
                textTransform: "uppercase",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Code2 size={12} />
              <span>01 // ARCHITECTURE</span>
            </span>
            <p
              style={{
                margin: 0,
                fontSize: "13.5px",
                lineHeight: 1.7,
                color: darkMode ? "#a1a1aa" : "#64748b",
              }}
            >
              Engineering production-grade applications with type-safe systems, transactional PostgreSQL schemas,
              and low-latency user interfaces.
            </p>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                color: darkMode ? "#71717a" : "#94a3b8",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                marginTop: "4px",
              }}
            >
              <span>Base: Kathmandu, Nepal</span>
              <span>Coords: 27°43'N, 85°19'E</span>
            </div>
          </div>

          {/* Column 2: Navigation Index */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                letterSpacing: ".2em",
                color: darkMode ? "#c084fc" : "#9333ea",
                textTransform: "uppercase",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Globe size={12} />
              <span>02 // SITEMAP</span>
            </span>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {navLinks.map((link) => (
                <li key={link.num}>
                  <a
                    href={link.href}
                    style={{
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "13.5px",
                      color: darkMode ? "#d4d4d8" : "#334155",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#c084fc";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = darkMode ? "#d4d4d8" : "#334155";
                      e.currentTarget.style.transform = "none";
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "11px",
                        color: darkMode ? "#71717a" : "#94a3b8",
                      }}
                    >
                      {link.num}
                    </span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Networks & Channels */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                letterSpacing: ".2em",
                color: darkMode ? "#c084fc" : "#9333ea",
                textTransform: "uppercase",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Terminal size={12} />
              <span>03 // CHANNELS</span>
            </span>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {socialLinks.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: "13.5px",
                      color: darkMode ? "#d4d4d8" : "#334155",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#c084fc";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = darkMode ? "#d4d4d8" : "#334155";
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {s.icon}
                      <span>{s.name}</span>
                    </div>
                    <ExternalLink size={12} style={{ color: darkMode ? "#71717a" : "#94a3b8" }} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Specs & Colophon */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                letterSpacing: ".2em",
                color: darkMode ? "#c084fc" : "#9333ea",
                textTransform: "uppercase",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Cpu size={12} />
              <span>04 // RUNTIME SPEC</span>
            </span>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                lineHeight: 1.8,
                color: darkMode ? "#a1a1aa" : "#475569",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <div>
                <span style={{ color: darkMode ? "#71717a" : "#94a3b8" }}>Framework: </span>
                Next.js &amp; React 19
              </div>
              <div>
                <span style={{ color: darkMode ? "#71717a" : "#94a3b8" }}>Styling: </span>
                Tailwind CSS &amp; Glass
              </div>
              <div>
                <span style={{ color: darkMode ? "#71717a" : "#94a3b8" }}>Graphics: </span>
                Three.js 3D Particles
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", paddingTop: "4px" }}>
                <CheckCircle2 size={13} style={{ color: "#10b981" }} />
                <span style={{ color: "#10b981", fontWeight: 600 }}>All Systems Nominal</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* BOTTOM METADATA BAR                                          */}
        {/* ============================================================ */}
        <div
          style={{
            borderTop: darkMode
              ? "1px solid rgba(255, 255, 255, 0.08)"
              : "1px solid rgba(0, 0, 0, 0.08)",
            paddingTop: "28px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "14px",
            fontSize: "12px",
            color: darkMode ? "#71717a" : "#64748b",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          <div>
            © {new Date().getFullYear()} Bibek Karki. Architected &amp; engineered with precision.
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              letterSpacing: ".05em",
            }}
          >
            <span>KATHMANDU, NEPAL</span>
            <span>•</span>
            <span>GMT+5:45</span>
            <span>•</span>
            <span style={{ color: "#c084fc" }}>PRODUCTION READY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

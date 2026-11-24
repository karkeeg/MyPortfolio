import React from "react";
import {
  MapPin,
  Zap,
  Building2,
  Code2,
  FileDown,
  ArrowDownRight,
} from "lucide-react";

const About = ({ darkMode = true }) => {
  return (
    <section
      id="about"
      style={{
        position: "relative",
        background: darkMode ? "transparent" : "#f1f5f9",
        borderTop: darkMode ? "none" : "1px solid rgba(0,0,0,.06)",
        borderBottom: darkMode
          ? "1px solid rgba(255,255,255,.06)"
          : "1px solid rgba(0,0,0,.06)",
        padding: "112px clamp(20px, 4vw, 40px)",
        overflow: "hidden",
        transition: "background-color 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* Background ambient radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "40px",
          right: "-120px",
          width: "580px",
          height: "580px",
          borderRadius: "50%",
          background: darkMode
            ? "radial-gradient(closest-side, color-mix(in srgb, var(--ac) 15%, transparent), transparent 70%)"
            : "radial-gradient(closest-side, color-mix(in srgb, var(--ac) 10%, transparent), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: "1240px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        {/* ============================================================ */}
        {/* ELEVATED DEVELOPER HEADER                                    */}
        {/* ============================================================ */}
        <div
          className="rv"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          {/* Eyebrow Breadcrumb & Live Status Bar */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "999px",
                background: darkMode
                  ? "rgba(168, 85, 247, 0.08)"
                  : "rgba(147, 51, 234, 0.08)",
                border: darkMode
                  ? "1px solid rgba(168, 85, 247, 0.25)"
                  : "1px solid rgba(147, 51, 234, 0.2)",
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: "12.5px",
                letterSpacing: ".14em",
                color: darkMode ? "#c084fc" : "#9333ea",
              }}
            >
              <Code2 size={13} style={{ color: darkMode ? "#c084fc" : "#9333ea" }} />
              <span>01 // PROFILE &amp; ARCHITECTURE</span>
            </div>

            {/* Live Availability Status Indicator */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "999px",
                background: darkMode
                  ? "rgba(16, 185, 129, 0.08)"
                  : "rgba(16, 185, 129, 0.1)",
                border: darkMode
                  ? "1px solid rgba(16, 185, 129, 0.25)"
                  : "1px solid rgba(16, 185, 129, 0.3)",
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: "12px",
                color: darkMode ? "#34d399" : "#059669",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#10b981",
                  boxShadow: "0 0 10px #10b981",
                }}
              />
              <span>Available for High-Impact Roles</span>
            </div>
          </div>

          {/* Section Main Title with Developer Accent */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "16px 32px",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontFamily: "'Inter Tight', Inter, system-ui, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(38px, 5.2vw, 68px)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: darkMode ? "#ffffff" : "#0f172a",
                transition: "color 0.3s ease",
              }}
            >
              About{" "}
              <span
                style={{
                  background:
                    "linear-gradient(100deg, #ffffff 25%, color-mix(in srgb, var(--ac) 65%, #ffffff))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Me
              </span>
            </h2>

            {/* Developer Metadata Specs Bar */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "8px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                color: darkMode ? "#a1a1aa" : "#64748b",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 12px",
                  borderRadius: "8px",
                  background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                  border: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <MapPin size={12} style={{ color: darkMode ? "#c084fc" : "#9333ea" }} />
                <span>Kathmandu, Nepal</span>
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 12px",
                  borderRadius: "8px",
                  background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                  border: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <Zap size={12} style={{ color: "#38bdf8" }} />
                <span>2+ Yrs Production</span>
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 12px",
                  borderRadius: "8px",
                  background: darkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                  border: darkMode ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <Building2 size={12} style={{ color: "#a855f7" }} />
                <span>NxtWaveAI</span>
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* DESIGN 5 MONOLITH HERO CARD (BENTO WRAPPER)                  */}
        {/* ============================================================ */}
        <div
          className="gb rv"
          style={{
            position: "relative",
            background: darkMode ? "rgba(18, 22, 34, 0.72)" : "#ffffff",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: darkMode
              ? "1px solid rgba(255, 255, 255, 0.1)"
              : "1px solid rgba(0, 0, 0, 0.08)",
            borderRadius: "26px",
            padding: "clamp(28px, 4.5vw, 56px)",
            boxShadow: darkMode
              ? "0 30px 80px -25px rgba(0, 0, 0, 0.8), 0 0 50px -20px color-mix(in srgb, var(--ac) 20%, transparent)"
              : "0 25px 60px -20px rgba(0, 0, 0, 0.08)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(420px, 100%), 1fr))",
              gap: "clamp(32px, 5vw, 64px)",
              alignItems: "center",
            }}
          >
            {/* Left Column: Big Editorial Statement, Narrative & Action Buttons */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "28px",
              }}
            >
              {/* Massive Monolith Statement */}
              <h3
                style={{
                  margin: 0,
                  fontFamily: "'Inter Tight', Inter, system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(26px, 3.1vw, 42px)",
                  lineHeight: 1.16,
                  letterSpacing: "-0.03em",
                  color: darkMode ? "#ffffff" : "#0f172a",
                  transition: "color 0.3s ease",
                }}
              >
                I build scalable web apps, intuitive UIs, and robust backend architectures.
              </h3>

              {/* Narrative Bio */}
              <p
                style={{
                  margin: 0,
                  fontSize: "17px",
                  lineHeight: 1.75,
                  color: darkMode ? "#d1d5db" : "#334155",
                  transition: "color 0.3s ease",
                }}
              >
                I'm{" "}
                <strong
                  style={{
                    color: darkMode ? "#c084fc" : "#9333ea",
                    fontWeight: 600,
                  }}
                >
                  Bibek Karki
                </strong>
                , a full-stack software engineer based in Kathmandu, Nepal. For the past two years, I have been engineering high-availability products at{" "}
                <strong
                  style={{
                    color: darkMode ? "#ffffff" : "#0f172a",
                    fontWeight: 600,
                  }}
                >
                  NxtWaveAI
                </strong>{" "}
                using Next.js, NestJS, Express, and PostgreSQL. Before that, I completed an intensive 6-month software internship at{" "}
                <strong
                  style={{
                    color: darkMode ? "#ffffff" : "#0f172a",
                    fontWeight: 600,
                  }}
                >
                  Evolve IT
                </strong>{" "}
                working on modern MERN stacks.
              </p>

              {/* Core Engineering Tech Tags */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "8px",
                  paddingTop: "2px",
                }}
              >
                {["TypeScript", "Next.js", "NestJS", "Node.js", "PostgreSQL", "Tailwind CSS", "Redis"].map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "12px",
                      padding: "4px 11px",
                      borderRadius: "8px",
                      background: darkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)",
                      border: darkMode ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
                      color: darkMode ? "#e4e4e7" : "#334155",
                    }}
                  >
                    #{tech}
                  </span>
                ))}
              </div>

              {/* Call-to-Action Buttons */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "14px",
                  paddingTop: "6px",
                }}
              >
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "9px",
                    padding: "12px 24px",
                    borderRadius: "999px",
                    background: darkMode ? "#ffffff" : "#0f172a",
                    color: darkMode ? "#0a0a0c" : "#ffffff",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "13px",
                    fontWeight: 600,
                    textDecoration: "none",
                    boxShadow: "0 10px 30px -10px rgba(255, 255, 255, 0.3)",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 14px 35px -8px rgba(168, 85, 247, 0.45)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "0 10px 30px -10px rgba(255, 255, 255, 0.3)";
                  }}
                >
                  <span>Download Resume</span>
                  <FileDown size={14} />
                </a>

                <a
                  href="#experience"
                  className="gh"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 20px",
                    borderRadius: "999px",
                    background: darkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.04)",
                    border: darkMode ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid rgba(0, 0, 0, 0.12)",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "13px",
                    color: darkMode ? "#ffffff" : "#0f172a",
                    textDecoration: "none",
                    transition: "all 0.25s ease",
                  }}
                >
                  <span>Explore Career Journey</span>
                  <ArrowDownRight size={14} />
                </a>
              </div>
            </div>

            {/* Right Column: Editorial Portrait Card with Glass Info Footer */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "380px",
                margin: "0 auto",
              }}
            >
              {/* Outer Glowing Glass Border */}
              <div
                style={{
                  position: "relative",
                  borderRadius: "24px",
                  overflow: "hidden",
                  border: darkMode
                    ? "1px solid rgba(255, 255, 255, 0.14)"
                    : "1px solid rgba(0, 0, 0, 0.1)",
                  boxShadow: darkMode
                    ? "0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px -15px color-mix(in srgb, var(--ac) 30%, transparent)"
                    : "0 20px 45px -15px rgba(0, 0, 0, 0.12)",
                  aspectRatio: "3 / 4",
                  background: darkMode ? "#0d111a" : "#f1f5f9",
                }}
              >
                <img
                  src="/me.jpeg"
                  alt="Bibek Karki"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.035)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />

                {/* Top Corner Floating Tech Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "5px 12px",
                    borderRadius: "999px",
                    background: "rgba(10, 10, 14, 0.75)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                    color: "#ffffff",
                  }}
                >
                  <Code2 size={12} style={{ color: "#c084fc" }} />
                  <span>Full-Stack Engineer</span>
                </div>

                {/* Bottom Overlay with Monolith Metadata */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "24px 20px 20px",
                    background:
                      "linear-gradient(to top, rgba(8, 10, 15, 0.96) 0%, rgba(8, 10, 15, 0.75) 60%, transparent 100%)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "11px",
                      letterSpacing: ".12em",
                      color: "#c084fc",
                    }}
                  >
                    BASED IN
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter Tight', Inter, sans-serif",
                      fontWeight: 700,
                      fontSize: "20px",
                      color: "#ffffff",
                    }}
                  >
                    Kathmandu, Nepal
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "12px",
                      color: "#a1a1aa",
                    }}
                  >
                    2+ Yrs Exp • NxtWaveAI
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* BOTTOM METRICS TICKER STRIP (3 HIGH-IMPACT PROOFS)          */}
          {/* ============================================================ */}
          <div
            style={{
              marginTop: "clamp(36px, 4.5vw, 52px)",
              paddingTop: "28px",
              borderTop: darkMode
                ? "1px solid rgba(255, 255, 255, 0.08)"
                : "1px solid rgba(0, 0, 0, 0.08)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "24px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div
                style={{
                  fontFamily: "'Inter Tight', Inter, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(32px, 3.6vw, 44px)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  color: darkMode ? "#ffffff" : "#0f172a",
                }}
              >
                2+
                <span style={{ fontSize: ".5em", color: "#c084fc", letterSpacing: 0 }}>
                  {" "}yrs
                </span>
              </div>
              <div
                style={{
                  fontSize: "13.5px",
                  color: darkMode ? "#a1a1aa" : "#64748b",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                Production Engineering (NxtWaveAI)
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div
                style={{
                  fontFamily: "'Inter Tight', Inter, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(32px, 3.6vw, 44px)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  color: darkMode ? "#ffffff" : "#0f172a",
                }}
              >
                4
                <span style={{ fontSize: ".5em", color: "#38bdf8", letterSpacing: 0 }}>
                  {" "}apps
                </span>
              </div>
              <div
                style={{
                  fontSize: "13.5px",
                  color: darkMode ? "#a1a1aa" : "#64748b",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                Live Production Case Studies
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div
                style={{
                  fontFamily: "'Inter Tight', Inter, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(32px, 3.6vw, 44px)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  color: darkMode ? "#ffffff" : "#0f172a",
                }}
              >
                100%
              </div>
              <div
                style={{
                  fontSize: "13.5px",
                  color: darkMode ? "#a1a1aa" : "#64748b",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                Type-Safe Modern Stack (TS + Next.js)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

import React from "react";

const Experience = ({ darkMode = true }) => {
  return (
    <section
      id="experience"
      style={{
        position: "relative",
        padding: "128px clamp(20px, 4vw, 40px) 40px",
      }}
    >
      <div
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "64px",
        }}
      >
        {/* Section Header */}
        <div
          className="rv"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: "13px",
              letterSpacing: ".16em",
              color: darkMode ? "#c084fc" : "#9333ea",
            }}
          >
            02 — EXPERIENCE
          </div>
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
            My Experience
          </h2>
        </div>

        {/* Timeline */}
        <div className="xw">
          {/* Item 1: NxtWaveAI */}
          <div className="xr rv">
            <article
              className="gb xc"
              style={{
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "10px 14px",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "'Inter Tight', Inter, system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize: "24px",
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                    color: darkMode ? "#ffffff" : "#0f172a",
                    transition: "color 0.3s ease",
                  }}
                >
                  Full-Stack Developer
                </h3>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "999px",
                    background:
                      "color-mix(in srgb, var(--ac) 18%, transparent)",
                    border:
                      "1px solid color-mix(in srgb, var(--ac) 45%, transparent)",
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontSize: "11px",
                    letterSpacing: ".1em",
                    color: darkMode ? "#e9d5ff" : "#7c3aed",
                    fontWeight: 600,
                  }}
                >
                  CURRENT
                </span>
              </div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: darkMode ? "#c084fc" : "#9333ea",
                }}
              >
                NxtWaveAI
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: "16px",
                  lineHeight: 1.65,
                  color: darkMode ? "#a1a1aa" : "#475569",
                  transition: "color 0.3s ease",
                }}
              >
                Working as a full-stack developer for the past two years, building
                with Next.js, NestJS, Express and TypeScript.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {["Next.js", "NestJS", "Express.js", "TypeScript"].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "5px 12px",
                      borderRadius: "999px",
                      background: darkMode
                        ? "rgba(255,255,255,.05)"
                        : "rgba(0,0,0,.04)",
                      border: darkMode
                        ? "1px solid rgba(255,255,255,.07)"
                        : "1px solid rgba(0,0,0,.08)",
                      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                      fontSize: "12px",
                      color: darkMode ? "#d4d4d8" : "#334155",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>

            {/* Timeline center node */}
            <div className="xn now" aria-hidden="true">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="7" width="18" height="13" rx="2" />
                <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18" />
              </svg>
            </div>

            {/* Date column */}
            <div
              className="xd"
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <div
                style={{
                  fontFamily: "'Inter Tight', Inter, system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: "22px",
                  letterSpacing: "-0.02em",
                  color: darkMode ? "#ffffff" : "#0f172a",
                  transition: "color 0.3s ease",
                }}
              >
                Present
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  fontSize: "13px",
                  color: darkMode ? "#a1a1aa" : "#64748b",
                  transition: "color 0.3s ease",
                }}
              >
                2 years
              </div>
            </div>
          </div>

          {/* Item 2: Evolve IT */}
          <div className="xr flip rv">
            <article
              className="gb xc"
              style={{
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontFamily: "'Inter Tight', Inter, system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: "24px",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: darkMode ? "#ffffff" : "#0f172a",
                  transition: "color 0.3s ease",
                }}
              >
                Trainee &amp; Intern
              </h3>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: darkMode ? "#c084fc" : "#9333ea",
                }}
              >
                Evolve IT
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: "16px",
                  lineHeight: 1.65,
                  color: darkMode ? "#a1a1aa" : "#475569",
                  transition: "color 0.3s ease",
                }}
              >
                Six months as a trainee and intern in the same full-stack domain,
                working on the MERN stack.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {["MongoDB", "Express.js", "React", "Node.js"].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "5px 12px",
                      borderRadius: "999px",
                      background: darkMode
                        ? "rgba(255,255,255,.05)"
                        : "rgba(0,0,0,.04)",
                      border: darkMode
                        ? "1px solid rgba(255,255,255,.07)"
                        : "1px solid rgba(0,0,0,.08)",
                      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                      fontSize: "12px",
                      color: darkMode ? "#d4d4d8" : "#334155",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>

            {/* Timeline center node */}
            <div className="xn" aria-hidden="true">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 9l10-5 10 5-10 5-10-5z" />
                <path d="M6 11.5V16c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.5M22 9v6" />
              </svg>
            </div>

            {/* Date column */}
            <div
              className="xd"
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <div
                style={{
                  fontFamily: "'Inter Tight', Inter, system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: "22px",
                  letterSpacing: "-0.02em",
                  color: darkMode ? "#ffffff" : "#0f172a",
                  transition: "color 0.3s ease",
                }}
              >
                Internship
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  fontSize: "13px",
                  color: darkMode ? "#a1a1aa" : "#64748b",
                  transition: "color 0.3s ease",
                }}
              >
                6 months
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

import React from "react";
import {
  Layers,
  ExternalLink,
  Github,
  CheckCircle2,
  ArrowRight,
  Cpu,
} from "lucide-react";
import ecommerceImg from "../assets/project/ecommerce.png";
import airlineImg from "../assets/project/airline.png";
import countriesImg from "../assets/project/countries.png";
import todoImg from "../assets/project/myTodo.png";

const projects = [
  {
    num: "01",
    title: "Company Portal",
    slug: "portal.karkeeg.internal",
    image: ecommerceImg,
    description:
      "Enterprise project management and workflow platform involving requirements orchestration, AI-generated backlogs, task and QA workflows, attendance, and team collaboration.",
    focusPoints: [
      "Requirements to AI-generated backlogs",
      "Task and QA workflow orchestration",
      "Attendance and leave management",
      "Real-time team collaboration",
    ],
    highlight:
      "Architecture designed for multi-tenant scalability and real-time collaborative updates.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "NextAuth"],
    github: "https://github.com/karkeeg",
  },
  {
    num: "02",
    title: "Saibaba",
    slug: "saibaba.market",
    image: airlineImg,
    description:
      "E-commerce platform with retailer purchasing workflows, bulk quantities, MOQ rules, carton-based pricing, inventory calculations, and order management.",
    focusPoints: [
      "Bulk purchasing with strict MOQ rules",
      "Carton-based dynamic pricing",
      "Inventory calculations & sync",
      "Retailer order & delivery workflows",
    ],
    highlight:
      "High-performance caching and optimized transactional pricing calculations.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Prisma"],
    github: "https://github.com/karkeeg",
  },
  {
    num: "03",
    title: "Shankh",
    slug: "shankh.ai",
    image: countriesImg,
    description:
      "Conversational learning platform featuring an interactive AI Coach, adaptive learning workflows, cryptographic authentication, and backend integrations.",
    focusPoints: [
      "Conversational AI Coach runtime",
      "Adaptive learning workflows",
      "Cryptographic authentication",
      "Backend LLM pipeline integration",
    ],
    highlight:
      "Low-latency streaming token responses with intelligent context orchestration.",
    tags: ["Next.js", "Express.js", "PostgreSQL", "OpenAI"],
    github: "https://github.com/karkeeg",
  },
  {
    num: "04",
    title: "LeeonTek Outreach",
    slug: "outreach.leeontek.io",
    image: todoImg,
    description:
      "Email outreach platform involving high-throughput campaign architecture, email delivery integration, asynchronous background workers, and resilient production queues.",
    focusPoints: [
      "High-throughput campaign architecture",
      "Email delivery integration",
      "Asynchronous background queues",
      "Production deployment pipelines",
    ],
    highlight:
      "High-throughput resilient background queue system handling AWS SES deliverability.",
    tags: ["Node.js", "PostgreSQL", "Docker", "AWS SES"],
    github: "https://github.com/karkeeg",
  },
];

const Projects = ({ darkMode = true }) => {
  return (
    <section
      id="projects"
      style={{
        position: "relative",
        background: darkMode ? "#0a0a0c" : "#f8fafc",
        borderTop: darkMode
          ? "1px solid rgba(255, 255, 255, 0.08)"
          : "1px solid rgba(0, 0, 0, 0.06)",
        padding: "112px clamp(20px, 4vw, 40px) 140px",
        overflow: "hidden",
        transition: "background-color 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* Background ambient radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "80px",
          left: "-180px",
          width: "680px",
          height: "680px",
          borderRadius: "50%",
          background: darkMode
            ? "radial-gradient(closest-side, color-mix(in srgb, var(--ac) 12%, transparent), transparent 70%)"
            : "radial-gradient(closest-side, color-mix(in srgb, var(--ac) 8%, transparent), transparent 70%)",
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
          gap: "52px",
        }}
      >
        {/* ============================================================ */}
        {/* ELEVATED DEVELOPER SECTION HEADER                            */}
        {/* ============================================================ */}
        <div
          className="rv"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Eyebrow & Stats Bar */}
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
              <Layers size={13} style={{ color: darkMode ? "#c084fc" : "#9333ea" }} />
              <span>04 // PRODUCTION CASE STUDIES</span>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "999px",
                background: darkMode
                  ? "rgba(56, 189, 248, 0.08)"
                  : "rgba(14, 165, 233, 0.08)",
                border: darkMode
                  ? "1px solid rgba(56, 189, 248, 0.25)"
                  : "1px solid rgba(14, 165, 233, 0.2)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                color: darkMode ? "#38bdf8" : "#0284c7",
              }}
            >
              <Cpu size={12} />
              <span>4 Live Architectures</span>
            </div>
          </div>

          {/* Section Main Title with GitHub Link */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "20px 40px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "760px" }}>
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
                Selected{" "}
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
                  Work
                </span>
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: "17px",
                  lineHeight: 1.65,
                  color: darkMode ? "#a1a1aa" : "#475569",
                  transition: "color 0.3s ease",
                }}
              >
                A collection of production-grade applications showcasing full-stack system architecture,
                transactional database integrity, and intuitive client interfaces.
              </p>
            </div>

            <a
              className="gh"
              href="https://github.com/karkeeg"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 18px",
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
              <Github size={14} />
              <span>All Repositories on GitHub</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* ============================================================ */}
        {/* PROJECTS GRID (LINEAR / VERCEL ENGINEERING CARDS)            */}
        {/* ============================================================ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(540px, 100%), 1fr))",
            gap: "32px",
          }}
        >
          {projects.map((proj) => (
            <article
              key={proj.num}
              className="gb card rv"
              style={{
                background: darkMode ? "rgba(18, 22, 34, 0.72)" : "#ffffff",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                border: darkMode
                  ? "1px solid rgba(255, 255, 255, 0.1)"
                  : "1px solid rgba(0, 0, 0, 0.08)",
                borderRadius: "24px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                boxShadow: darkMode
                  ? "0 20px 50px -15px rgba(0, 0, 0, 0.7)"
                  : "0 15px 35px -10px rgba(0, 0, 0, 0.06)",
                overflow: "hidden",
                transition: "transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
              }}
            >
              {/* Browser Mockup Chrome Window */}
              <div
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: darkMode
                    ? "1px solid rgba(255, 255, 255, 0.08)"
                    : "1px solid rgba(0, 0, 0, 0.08)",
                  background: darkMode ? "#0c0f17" : "#f1f5f9",
                }}
              >
                {/* Window Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    background: darkMode ? "rgba(12, 15, 23, 0.9)" : "rgba(241, 245, 249, 0.9)",
                    borderBottom: darkMode
                      ? "1px solid rgba(255, 255, 255, 0.06)"
                      : "1px solid rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#ef4444" }} />
                    <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#f59e0b" }} />
                    <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#10b981" }} />
                  </div>

                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "11px",
                      color: darkMode ? "#71717a" : "#94a3b8",
                      background: darkMode ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.04)",
                      padding: "3px 12px",
                      borderRadius: "6px",
                      border: darkMode ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    https://{proj.slug}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "10px",
                      color: "#10b981",
                    }}
                  >
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981" }} />
                    <span>PROD</span>
                  </div>
                </div>

                {/* Screenshot Frame */}
                <div
                  className="shot"
                  style={{
                    aspectRatio: "16 / 9",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <img
                    src={proj.image}
                    alt={`${proj.title} application screenshot`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)",
                    }}
                  />
                </div>
              </div>

              {/* Project Details */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                  flex: 1,
                  padding: "4px 6px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: "16px",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: "'Inter Tight', Inter, system-ui, sans-serif",
                      fontWeight: 700,
                      fontSize: "26px",
                      lineHeight: 1.15,
                      letterSpacing: "-0.025em",
                      color: darkMode ? "#ffffff" : "#0f172a",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {proj.title}
                  </h3>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                      fontSize: "12px",
                      padding: "2px 8px",
                      borderRadius: "6px",
                      background: darkMode ? "rgba(168, 85, 247, 0.12)" : "rgba(147, 51, 234, 0.08)",
                      border: darkMode ? "1px solid rgba(168, 85, 247, 0.3)" : "1px solid rgba(147, 51, 234, 0.2)",
                      color: darkMode ? "#c084fc" : "#9333ea",
                      fontWeight: 600,
                    }}
                  >
                    APP // {proj.num}
                  </span>
                </div>

                <p
                  style={{
                    margin: 0,
                    fontSize: "15px",
                    lineHeight: 1.65,
                    color: darkMode ? "#a1a1aa" : "#475569",
                    transition: "color 0.3s ease",
                  }}
                >
                  {proj.description}
                </p>

                {/* Engineering Focus Box */}
                <div
                  style={{
                    padding: "16px",
                    borderRadius: "14px",
                    background: darkMode ? "rgba(255, 255, 255, 0.025)" : "rgba(0, 0, 0, 0.02)",
                    border: darkMode
                      ? "1px solid rgba(255, 255, 255, 0.06)"
                      : "1px solid rgba(0, 0, 0, 0.06)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                      fontSize: "11px",
                      letterSpacing: ".14em",
                      color: darkMode ? "#c084fc" : "#9333ea",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <ArrowRight size={11} />
                    <span>KEY ARCHITECTURE DELIVERABLES</span>
                  </div>
                  <ul
                    style={{
                      margin: 0,
                      padding: 0,
                      listStyle: "none",
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
                      gap: "8px 16px",
                      fontSize: "13.5px",
                      color: darkMode ? "#e4e4e7" : "#334155",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {proj.focusPoints.map((point, idx) => (
                      <li key={idx} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <CheckCircle2 size={13} style={{ color: "#38bdf8", flexShrink: 0 }} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                      fontSize: "12px",
                      color: darkMode ? "#a1a1aa" : "#64748b",
                      borderTop: darkMode ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid rgba(0, 0, 0, 0.06)",
                      paddingTop: "10px",
                      marginTop: "2px",
                    }}
                  >
                    {proj.highlight}
                  </div>
                </div>

                {/* Tech Tags & GitHub Action Link */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px 16px",
                    marginTop: "auto",
                    paddingTop: "6px",
                  }}
                >
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: "4px 10px",
                          borderRadius: "6px",
                          background: darkMode
                            ? "rgba(255, 255, 255, 0.04)"
                            : "rgba(0, 0, 0, 0.04)",
                          border: darkMode
                            ? "1px solid rgba(255, 255, 255, 0.07)"
                            : "1px solid rgba(0, 0, 0, 0.07)",
                          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                          fontSize: "11.5px",
                          color: darkMode ? "#d4d4d8" : "#334155",
                          transition: "all 0.3s ease",
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <a
                    className="gh"
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "12.5px",
                      color: darkMode ? "#c084fc" : "#9333ea",
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                  >
                    <Github size={13} />
                    <span>Inspect Code</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

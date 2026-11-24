import React, { useState, useEffect } from "react";
import {
  Terminal,
  Mail,
  Copy,
  Check,
  MapPin,
  Clock,
  ShieldCheck,
  FileDown,
  Send,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { toast } from "react-hot-toast";
import emailjs from "emailjs-com";
import confetti from "canvas-confetti";

const Contact = ({ darkMode = true }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Full-Stack Web App",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [ktmTime, setKtmTime] = useState("");

  // Live Kathmandu Local Time (GMT+5:45)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const ktm = new Date(utc + 3600000 * 5.75);
      const hours = ktm.getHours();
      const minutes = String(ktm.getMinutes()).padStart(2, "0");
      const seconds = String(ktm.getSeconds()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      setKtmTime(`${formattedHours}:${minutes}:${seconds} ${ampm} GMT+5:45`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("karkibibek642@gmail.com");
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields!");
      return;
    }

    setIsSubmitting(true);

    const fullMessage = `[Inquiry Topic: ${formData.subject}]\n\n${formData.message}`;

    emailjs
      .send(
        "service_j7oicfh",
        "template_sfb75qi",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: fullMessage,
        },
        "oyORtlfQbRmDt0zE5"
      )
      .then(() => {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
        toast.success("Message transmitted successfully!");
        setFormData({
          name: "",
          email: "",
          subject: "Full-Stack Web App",
          message: "",
        });
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        toast.error("Transmission failed. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const subjects = [
    "Full-Stack Web App",
    "AI / LLM Integration",
    "Architecture Review",
    "Full-Time Role",
  ];

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        background: darkMode ? "#0c0d12" : "#f8fafc",
        borderTop: darkMode
          ? "1px solid rgba(255, 255, 255, 0.08)"
          : "1px solid rgba(0, 0, 0, 0.08)",
        padding: "112px clamp(20px, 4vw, 48px) 140px",
        overflow: "hidden",
        transition: "background-color 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* Background Architectural Grid Pattern */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: darkMode
            ? "linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px)"
            : "linear-gradient(rgba(0,0,0,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, #000 20%, transparent 80%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, #000 20%, transparent 80%)",
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
        {/* ELEVATED SECTION HEADER                                      */}
        {/* ============================================================ */}
        <div
          className="rv"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            maxWidth: "840px",
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
              alignSelf: "flex-start",
            }}
          >
            <Terminal size={13} style={{ color: darkMode ? "#c084fc" : "#9333ea" }} />
            <span>05 // DIRECT DISPATCH &amp; INQUIRIES</span>
          </div>

          <h2
            style={{
              margin: 0,
              fontFamily: "'Inter Tight', Inter, system-ui, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(40px, 5.8vw, 76px)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              color: darkMode ? "#ffffff" : "#0f172a",
              transition: "color 0.3s ease",
            }}
          >
            Let's Build{" "}
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
              Something Exceptional.
            </span>
          </h2>

          <p
            style={{
              margin: 0,
              fontSize: "17px",
              lineHeight: 1.7,
              color: darkMode ? "#a1a1aa" : "#475569",
              transition: "color 0.3s ease",
            }}
          >
            Available for high-impact full-stack development, modern cloud architectures, and production
            engineering contracts. Send a direct transmission or connect across engineering networks.
          </p>
        </div>

        {/* ============================================================ */}
        {/* TWO-COLUMN TELEMETRY & DISPATCH INTERFACE                    */}
        {/* ============================================================ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(460px, 100%), 1fr))",
            gap: "clamp(32px, 5vw, 56px)",
            alignItems: "start",
          }}
        >
          {/* Left Column: Telemetry Dossier */}
          <div
            className="rv"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "28px",
            }}
          >
            {/* Quick Contact Card */}
            <div
              style={{
                padding: "24px",
                borderRadius: "20px",
                background: darkMode ? "rgba(18, 22, 34, 0.72)" : "#ffffff",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: darkMode
                  ? "1px solid rgba(255, 255, 255, 0.1)"
                  : "1px solid rgba(0, 0, 0, 0.08)",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  color: darkMode ? "#c084fc" : "#9333ea",
                  letterSpacing: ".12em",
                }}
              >
                <span>PRIMARY INBOX</span>
                <span style={{ color: "#10b981", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981" }} />
                  ACTIVE
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                }}
              >
                <a
                  href="mailto:karkibibek642@gmail.com"
                  style={{
                    fontFamily: "'Inter Tight', Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(18px, 2.2vw, 24px)",
                    color: darkMode ? "#ffffff" : "#0f172a",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Mail size={18} style={{ color: darkMode ? "#c084fc" : "#9333ea" }} />
                  <span>karkibibek642@gmail.com</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 14px",
                    borderRadius: "8px",
                    background: copied
                      ? "rgba(16, 185, 129, 0.2)"
                      : darkMode
                      ? "rgba(255, 255, 255, 0.06)"
                      : "rgba(0, 0, 0, 0.05)",
                    border: copied
                      ? "1px solid rgba(16, 185, 129, 0.5)"
                      : darkMode
                      ? "1px solid rgba(255, 255, 255, 0.12)"
                      : "1px solid rgba(0, 0, 0, 0.12)",
                    color: copied ? "#10b981" : darkMode ? "#ffffff" : "#0f172a",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "12px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copied ? "COPIED" : "COPY"}</span>
                </button>
              </div>
            </div>

            {/* Telemetry Table */}
            <div
              style={{
                borderRadius: "20px",
                background: darkMode ? "rgba(18, 22, 34, 0.72)" : "#ffffff",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: darkMode
                  ? "1px solid rgba(255, 255, 255, 0.1)"
                  : "1px solid rgba(0, 0, 0, 0.08)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Row 1: Location */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  borderBottom: darkMode
                    ? "1px solid rgba(255, 255, 255, 0.06)"
                    : "1px solid rgba(0, 0, 0, 0.06)",
                  gap: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: darkMode ? "#a1a1aa" : "#64748b", fontSize: "13px", fontFamily: "'JetBrains Mono', monospace" }}>
                  <MapPin size={14} style={{ color: darkMode ? "#c084fc" : "#9333ea" }} />
                  <span>LOCATION</span>
                </div>
                <span style={{ fontSize: "13.5px", fontWeight: 600, color: darkMode ? "#ffffff" : "#0f172a" }}>
                  Kathmandu, Nepal <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: darkMode ? "#c084fc" : "#9333ea" }}>27°43'N 85°19'E</span>
                </span>
              </div>

              {/* Row 2: Local Time */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  borderBottom: darkMode
                    ? "1px solid rgba(255, 255, 255, 0.06)"
                    : "1px solid rgba(0, 0, 0, 0.06)",
                  gap: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: darkMode ? "#a1a1aa" : "#64748b", fontSize: "13px", fontFamily: "'JetBrains Mono', monospace" }}>
                  <Clock size={14} style={{ color: "#38bdf8" }} />
                  <span>LOCAL TIME</span>
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", fontWeight: 600, color: darkMode ? "#ffffff" : "#0f172a" }}>
                  {ktmTime || "Kathmandu (GMT+5:45)"}
                </span>
              </div>

              {/* Row 3: Status */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  borderBottom: darkMode
                    ? "1px solid rgba(255, 255, 255, 0.06)"
                    : "1px solid rgba(0, 0, 0, 0.06)",
                  gap: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: darkMode ? "#a1a1aa" : "#64748b", fontSize: "13px", fontFamily: "'JetBrains Mono', monospace" }}>
                  <ShieldCheck size={14} style={{ color: "#10b981" }} />
                  <span>AVAILABILITY</span>
                </div>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 600, color: "#10b981" }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#10b981" }} />
                  Open for Q2/Q3 Roles
                </span>
              </div>

              {/* Row 4: Telephone */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  gap: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: darkMode ? "#a1a1aa" : "#64748b", fontSize: "13px", fontFamily: "'JetBrains Mono', monospace" }}>
                  <Terminal size={14} style={{ color: "#f59e0b" }} />
                  <span>PHONE / WHATSAPP</span>
                </div>
                <a
                  href="tel:+9779860917585"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: darkMode ? "#ffffff" : "#0f172a",
                    textDecoration: "none",
                  }}
                >
                  +977 9860917585
                </a>
              </div>
            </div>

            {/* Social Verification Hub */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <a
                href="https://github.com/karkeeg"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 16px",
                  borderRadius: "10px",
                  background: darkMode ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.04)",
                  border: darkMode ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
                  color: darkMode ? "#e4e4e7" : "#334155",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
              >
                <FaGithub size={14} />
                <span>GitHub</span>
                <ExternalLink size={11} />
              </a>

              <a
                href="https://www.linkedin.com/in/bibek-karki-b41703272/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 16px",
                  borderRadius: "10px",
                  background: darkMode ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.04)",
                  border: darkMode ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
                  color: darkMode ? "#e4e4e7" : "#334155",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
              >
                <FaLinkedin size={14} />
                <span>LinkedIn</span>
                <ExternalLink size={11} />
              </a>

              <a
                href="https://www.instagram.com/bibek_karki8/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 16px",
                  borderRadius: "10px",
                  background: darkMode ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.04)",
                  border: darkMode ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
                  color: darkMode ? "#e4e4e7" : "#334155",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
              >
                <FaInstagram size={14} />
                <span>Instagram</span>
                <ExternalLink size={11} />
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 16px",
                  borderRadius: "10px",
                  background: darkMode ? "rgba(168, 85, 247, 0.12)" : "rgba(147, 51, 234, 0.08)",
                  border: darkMode ? "1px solid rgba(168, 85, 247, 0.3)" : "1px solid rgba(147, 51, 234, 0.2)",
                  color: darkMode ? "#c084fc" : "#9333ea",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
              >
                <FileDown size={14} />
                <span>Resume (PDF)</span>
                <ExternalLink size={11} />
              </a>
            </div>
          </div>

          {/* Right Column: Dispatch Form Terminal */}
          <form
            onSubmit={handleSubmit}
            className="rv"
            style={{
              padding: "clamp(28px, 4vw, 44px)",
              background: darkMode ? "rgba(18, 22, 34, 0.72)" : "#ffffff",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: darkMode
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "1px solid rgba(0, 0, 0, 0.08)",
              borderRadius: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              boxShadow: darkMode
                ? "0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px -20px color-mix(in srgb, var(--ac) 20%, transparent)"
                : "0 20px 50px -15px rgba(0, 0, 0, 0.08)",
              transition: "background 0.3s ease, border-color 0.3s ease",
            }}
          >
            {/* Terminal Window Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: "16px",
                borderBottom: darkMode
                  ? "1px solid rgba(255, 255, 255, 0.08)"
                  : "1px solid rgba(0, 0, 0, 0.08)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#ef4444" }} />
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#f59e0b" }} />
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#10b981" }} />
                <span style={{ marginLeft: "8px", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: darkMode ? "#a1a1aa" : "#64748b" }}>
                  dispatch_inquiry.sh
                </span>
              </div>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  color: darkMode ? "#c084fc" : "#9333ea",
                }}
              >
                <MessageSquare size={12} />
                <span>ENCRYPTED DISPATCH</span>
              </div>
            </div>

            {/* Subject Selection Chips */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <label
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: ".12em",
                  color: darkMode ? "#8b8b94" : "#64748b",
                  textTransform: "uppercase",
                }}
              >
                TOPIC OF INQUIRY
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {subjects.map((sub) => {
                  const isChosen = formData.subject === sub;
                  return (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => setFormData({ ...formData, subject: sub })}
                      style={{
                        padding: "7px 14px",
                        fontSize: "12px",
                        fontFamily: "'JetBrains Mono', monospace",
                        borderRadius: "8px",
                        border: isChosen
                          ? `1px solid ${darkMode ? "#c084fc" : "#9333ea"}`
                          : darkMode
                          ? "1px solid rgba(255, 255, 255, 0.08)"
                          : "1px solid rgba(0, 0, 0, 0.08)",
                        background: isChosen
                          ? darkMode
                            ? "rgba(192, 132, 252, 0.15)"
                            : "rgba(147, 51, 234, 0.1)"
                          : darkMode
                          ? "rgba(255, 255, 255, 0.03)"
                          : "rgba(0, 0, 0, 0.03)",
                        color: isChosen
                          ? darkMode
                            ? "#ffffff"
                            : "#9333ea"
                          : darkMode
                          ? "#a1a1aa"
                          : "#64748b",
                        fontWeight: isChosen ? 600 : 400,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {sub}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Name Input */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label
                htmlFor="cf-name"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: ".12em",
                  color: darkMode ? "#8b8b94" : "#64748b",
                  textTransform: "uppercase",
                }}
              >
                YOUR NAME *
              </label>
              <input
                id="cf-name"
                name="name"
                type="text"
                placeholder="e.g. Alex Morgan"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  background: darkMode ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)",
                  border: darkMode
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid rgba(0, 0, 0, 0.12)",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  fontSize: "14px",
                  color: darkMode ? "#ffffff" : "#0f172a",
                  outline: "none",
                  fontFamily: "'Inter', sans-serif",
                  transition: "border-color 0.25s, box-shadow 0.25s",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#c084fc";
                  e.target.style.boxShadow = "0 0 16px rgba(192, 132, 252, 0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.12)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Email Input */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label
                htmlFor="cf-email"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: ".12em",
                  color: darkMode ? "#8b8b94" : "#64748b",
                  textTransform: "uppercase",
                }}
              >
                YOUR EMAIL ADDRESS *
              </label>
              <input
                id="cf-email"
                name="email"
                type="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  background: darkMode ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)",
                  border: darkMode
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid rgba(0, 0, 0, 0.12)",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  fontSize: "14px",
                  color: darkMode ? "#ffffff" : "#0f172a",
                  outline: "none",
                  fontFamily: "'Inter', sans-serif",
                  transition: "border-color 0.25s, box-shadow 0.25s",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#c084fc";
                  e.target.style.boxShadow = "0 0 16px rgba(192, 132, 252, 0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.12)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Message Input */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label
                htmlFor="cf-message"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: ".12em",
                  color: darkMode ? "#8b8b94" : "#64748b",
                  textTransform: "uppercase",
                }}
              >
                PROJECT OBJECTIVES &amp; DETAILS *
              </label>
              <textarea
                id="cf-message"
                name="message"
                rows={4}
                placeholder="Describe your timeline, stack requirements, or key goals..."
                value={formData.message}
                onChange={handleChange}
                required
                style={{
                  background: darkMode ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)",
                  border: darkMode
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid rgba(0, 0, 0, 0.12)",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  fontSize: "14px",
                  color: darkMode ? "#ffffff" : "#0f172a",
                  outline: "none",
                  fontFamily: "'Inter', sans-serif",
                  resize: "vertical",
                  transition: "border-color 0.25s, box-shadow 0.25s",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#c084fc";
                  e.target.style.boxShadow = "0 0 16px rgba(192, 132, 252, 0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.12)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                padding: "14px 28px",
                borderRadius: "12px",
                background: darkMode ? "#ffffff" : "#0f172a",
                color: darkMode ? "#0a0a0c" : "#ffffff",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "13px",
                fontWeight: 600,
                border: "none",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                opacity: isSubmitting ? 0.7 : 1,
                boxShadow: "0 10px 30px -10px rgba(255, 255, 255, 0.3)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 14px 35px -8px rgba(168, 85, 247, 0.45)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 10px 30px -10px rgba(255, 255, 255, 0.3)";
              }}
            >
              <Send size={14} />
              <span>{isSubmitting ? "TRANSMITTING..." : "SUBMIT INQUIRY"}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

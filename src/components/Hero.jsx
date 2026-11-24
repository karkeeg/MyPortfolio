import React, { useState } from "react";
import { Orbit } from "lucide-react";
import WaveScene, { WAVE_THEMES } from "./WaveScene";

const Hero = () => {
  const [waveTheme, setWaveTheme] = useState("sunset");

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "820px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px clamp(20px, 4vw, 40px) 120px",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      {/* 3D Wave Particle Cloud Animation (from newwebsite) */}
      <WaveScene activeThemeKey={waveTheme} className="absolute inset-0 z-0" />

      {/* Grid Pattern overlay for depth */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 65% at 50% 35%, #000 20%, transparent 80%)",
          maskImage:
            "radial-gradient(ellipse 70% 65% at 50% 35%, #000 20%, transparent 80%)",
          pointerEvents: "none",
        }}
      />

      {/* Ambient Radial Lighting Glow */}
      <div
        aria-hidden="true"
        className="glow"
        style={{
          position: "absolute",
          zIndex: 1,
          top: "-240px",
          left: "50%",
          width: "1000px",
          maxWidth: "150%",
          height: "700px",
          marginLeft: "-500px",
          background:
            "radial-gradient(closest-side, rgba(168, 85, 247, 0.28), rgba(245, 158, 11, 0.16) 55%, transparent 75%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* Bottom gradient fade into next section */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          zIndex: 2,
          left: 0,
          right: 0,
          bottom: 0,
          height: "140px",
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(10, 10, 12, 0.3) 35%, rgba(10, 10, 12, 0.8) 70%, #0a0a0c 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Hero Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "1080px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "32px",
          pointerEvents: "none",
        }}
      >
        {/* Name Pill Badge */}
        <div
          className="fu f0"
          style={{
            pointerEvents: "auto",
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            padding: "8px 18px",
            border: "1px solid rgba(168, 85, 247, 0.3)",
            borderRadius: "999px",
            background: "rgba(168, 85, 247, 0.08)",
            backdropFilter: "blur(12px)",
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: "13px",
            letterSpacing: ".18em",
            color: "#d4d4d8",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "var(--ac)",
              boxShadow: "0 0 14px var(--ac)",
            }}
          />
          <span>BIBEK KARKI</span>
        </div>

        {/* Title Headline with animated lineUp */}
        <h1
          style={{
            pointerEvents: "auto",
            margin: 0,
            fontFamily: "'Inter Tight', Inter, system-ui, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(52px, 10.4vw, 148px)",
            lineHeight: 0.94,
            letterSpacing: "-0.045em",
          }}
        >
          <span className="ln">
            <span className="d1">Full-Stack</span>
          </span>
          <span className="ln">
            <span
              className="d2"
              style={{
                background:
                  "linear-gradient(100deg, #ffffff 25%, color-mix(in srgb, var(--ac) 60%, #ffffff))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Developer
            </span>
          </span>
        </h1>

        <p
          className="fu f3"
          style={{
            pointerEvents: "auto",
            margin: 0,
            maxWidth: "640px",
            fontSize: "clamp(16px, 1.5vw, 19px)",
            lineHeight: 1.65,
            color: "#a1a1aa",
          }}
        >
          I build scalable applications, craft intuitive frontend experiences, and
          architect robust backend systems that solve real-world problems.
        </p>

        {/* Action Buttons */}
        <div
          className="fu f4"
          style={{
            pointerEvents: "auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
          }}
        >
          <a className="btn-primary-mock b1" href="#projects">
            <span>View Projects</span>
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <a className="btn-primary-mock b2" href="#contact">
            Let's Talk
          </a>
          <a
            className="btn-primary-mock b3"
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Resume</span>
            <svg
              aria-hidden="true"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 4v12M6 11l6 6 6-6M5 20h14" />
            </svg>
          </a>
        </div>

        {/* Location & Social Links */}
        <div
          className="fu f5"
          style={{
            pointerEvents: "auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px 28px",
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: "13px",
            color: "#8b8b94",
          }}
        >
          <span>Kathmandu, Nepal</span>
          <a
            className="gh"
            href="https://github.com/karkeeg"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "inherit", fontSize: "13px" }}
          >
            <span>GitHub</span>
            <svg
              aria-hidden="true"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7M8 7h9v9" />
            </svg>
          </a>
          <a
            className="gh"
            href="https://www.linkedin.com/in/bibek-karki-b41703272/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "inherit", fontSize: "13px" }}
          >
            <span>LinkedIn</span>
            <svg
              aria-hidden="true"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7M8 7h9v9" />
            </svg>
          </a>
        </div>

        {/* 3D Wave Theme Selector */}
        <div
          className="fu f6"
          style={{
            pointerEvents: "auto",
            display: "inline-flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "6px 14px",
            borderRadius: "999px",
            background: "rgba(10, 11, 16, 0.78)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            backdropFilter: "blur(14px)",
            boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontFamily: "'JetBrains Mono', monospace",
              color: "#a1a1aa",
              marginRight: "2px",
            }}
          >
            Wave Theme:
          </span>
          {Object.entries(WAVE_THEMES).map(([key, theme]) => {
            const isSelected = waveTheme === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setWaveTheme(key)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  border: isSelected
                    ? `1px solid ${theme.badgeColor}`
                    : "1px solid rgba(255, 255, 255, 0.08)",
                  background: isSelected
                    ? `color-mix(in srgb, ${theme.badgeColor} 22%, transparent)`
                    : "rgba(255, 255, 255, 0.03)",
                  color: isSelected ? "#ffffff" : "#a1a1aa",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: theme.badgeColor,
                    boxShadow: isSelected ? `0 0 8px ${theme.badgeColor}` : "none",
                  }}
                />
                <span>{theme.name}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Wave Helper Hint */}
        <p
          className="fu f6"
          style={{
            margin: "0",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            color: "rgba(255, 255, 255, 0.4)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <Orbit size={13} style={{ color: "rgba(255, 255, 255, 0.65)" }} />
            <span>Drag with mouse to orbit 3D wave • Hover to ripple</span>
          </span>
        </p>
      </div>

      {/* Scroll indicator mouse */}
      <div
        aria-hidden="true"
        className="fu f6"
        style={{
          position: "absolute",
          bottom: "36px",
          left: "50%",
          marginLeft: "-12px",
          width: "24px",
          height: "38px",
          border: "1.5px solid rgba(255,255,255,.28)",
          borderRadius: "14px",
          display: "flex",
          justifyContent: "center",
          paddingTop: "7px",
          zIndex: 10,
        }}
      >
        <span
          className="cue"
          style={{
            width: "3px",
            height: "7px",
            borderRadius: "2px",
            background: "#ffffff",
          }}
        />
      </div>
    </section>
  );
};

export default Hero;

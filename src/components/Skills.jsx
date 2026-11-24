import React, { useState, useRef, useEffect } from "react";
import "./Skills.css";
import {
  REALMS,
  REALM_ICONS,
  LOGO_FILL,
  LOGO_STROKE,
  TECH_INFO,
} from "../data/techArsenal";

/* ───────────────────────── constants & helpers ───────────────────────── */

const ACCENT = "#a855f7"; // matches the site-wide --ac
const NEUTRAL = "#A3A8B2";
const MONO = "'Geist Mono', ui-monospace, monospace";
const SHOW_PROFICIENCY = true; // proficiency levels live in data/techArsenal.js
const LEVELS = ["Exploring", "Familiar", "Working", "Proficient", "Expert"];

// Realm positions on the 1000×600 stage (hex around the core).
const POS = [
  [500, 110],
  [751, 205],
  [751, 395],
  [500, 490],
  [249, 395],
  [249, 205],
];
const EDGES = [
  ["fe", "inf", "deploys to edge"],
  ["inf", "be", "containers · cache"],
  ["be", "db", "reads · writes"],
  ["db", "orm", "schema · migrations"],
  ["orm", "auth", "users · roles"],
  ["auth", "fe", "sessions · tokens"],
  ["be", "orm", "type-safe queries"],
];
const TOTAL = REALMS.reduce((n, r) => n + r.techs.length, 0);
const orbitRadius = (i) => 28 + 13 * i;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const pad2 = (n) => String(n).padStart(2, "0");

const hexToRgb = (h) => {
  let s = String(h || "#ffffff").replace("#", "");
  if (s.length === 3) s = s.split("").map((c) => c + c).join("");
  return [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16) || 0);
};
const mix = (a, b, t) => {
  const A = hexToRgb(a);
  const B = hexToRgb(b);
  return (
    "#" +
    A.map((v, i) =>
      Math.round(v + (B[i] - v) * t)
        .toString(16)
        .padStart(2, "0")
    ).join("")
  );
};
const rgba = (a, al) => {
  const [r, g, b] = hexToRgb(a);
  return `rgba(${r},${g},${b},${al})`;
};
const planetTile = (c) =>
  `radial-gradient(circle at 32% 28%, ${mix(c, "#ffffff", 0.35)} 0%, ${mix(
    c,
    "#0b0c10",
    0.35
  )} 55%, ${mix(c, "#050608", 0.8)} 100%)`;

const onKey = (fn) => (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    fn();
  }
};

// Deterministic starfield so SSR/re-renders never reshuffle it.
const STARS = (() => {
  let a = 1337;
  const rnd = () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return Array.from({ length: 180 }, () => {
    const big = rnd() > 0.93;
    return {
      x: (rnd() * 1000).toFixed(1),
      y: (rnd() * 600).toFixed(1),
      r: (big ? 0.9 + rnd() * 0.6 : 0.25 + rnd() * 0.5).toFixed(2),
      o: (big ? 0.75 : 0.12 + rnd() * 0.4).toFixed(2),
      twinkle: rnd() > 0.78,
      d: `-${(rnd() * 4).toFixed(2)}s`,
    };
  });
})();

// A glyph is either a filled brand logo or an outline icon, drawn in white.
const glyphOf = (name) => {
  if (LOGO_FILL[name]) return { d: LOGO_FILL[name], fill: "#ffffff", stroke: "none" };
  if (LOGO_STROKE[name]) return { d: LOGO_STROKE[name], fill: "none", stroke: "#ffffff" };
  return null;
};
const iconGlyph = (d) => ({ d, fill: "none", stroke: "#ffffff" });

/* ───────────────────────── small presentational pieces ───────────────────────── */

const Glyph = ({ g, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path
      d={g.d}
      fill={g.fill}
      stroke={g.stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Icon = ({ d, size = 14, sw = 1.5, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={style}
  >
    <path d={d} />
  </svg>
);

// Round, shaded "planet" tile carrying a tech's logo (or monogram fallback).
const Tile = ({ tech, color, size }) => {
  const g = glyphOf(tech.name);
  const o = Math.max(2, Math.round(size * 0.125));
  return (
    <span
      style={{
        flex: "none",
        width: size,
        height: size,
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        background: planetTile(color),
        boxShadow: `inset -${o}px -${o}px ${Math.round(size * 0.29)}px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)`,
        fontFamily: MONO,
        fontSize: Math.max(8, size * 0.32),
        fontWeight: 600,
        color: "#ffffff",
      }}
    >
      {g ? <Glyph g={g} size={Math.round(size * 0.5)} /> : <span>{tech.mono}</span>}
    </span>
  );
};

const Segments = ({ level, color, w, h, gap, radius }) => (
  <>
    {[0, 1, 2, 3, 4].map((k) => (
      <span
        key={k}
        style={{
          width: w,
          flex: w ? "none" : 1,
          height: h,
          borderRadius: radius,
          background: k < level ? color : "rgba(255,255,255,0.09)",
          marginRight: gap && k < 4 ? gap : 0,
        }}
      />
    ))}
  </>
);

const eyebrow = {
  fontFamily: MONO,
  fontSize: "10.5px",
  letterSpacing: "0.12em",
  color: "#80858E",
};
const hudChip = {
  position: "absolute",
  display: "flex",
  alignItems: "center",
  gap: 10,
  height: 32,
  padding: "0 12px",
  borderRadius: 8,
  background: "rgba(10,11,14,0.62)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  border: "1px solid rgba(255,255,255,0.08)",
  pointerEvents: "none",
};
const segmented = {
  display: "flex",
  padding: 3,
  gap: 2,
  borderRadius: 10,
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.07)",
};
const iconBtn = {
  border: 0,
  background: "transparent",
  color: "#9CA0A8",
  cursor: "pointer",
  display: "grid",
  placeItems: "center",
  padding: 0,
};

/* ───────────────────────── main component ───────────────────────── */

const Skills = () => {
  const [sel, setSel] = useState(null); // selected realm id
  const [techIdx, setTechIdx] = useState(0); // selected planet within realm
  const [hover, setHover] = useState(null);
  const [paused, setPaused] = useState(false);
  const [view, setView] = useState("orbit");
  const [moving, setMoving] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [pos, setPos] = useState({}); // user-rearranged realm positions
  const [dragging, setDragging] = useState(false);
  const [tip, setTip] = useState(null);

  const timer = useRef(null);
  const drag = useRef(null);
  const suppressClick = useRef(false);
  const stopDragListeners = useRef(null);

  useEffect(
    () => () => {
      clearTimeout(timer.current);
      if (stopDragListeners.current) stopDragListeners.current();
    },
    []
  );

  /* ── camera / selection ── */
  const fly = (nextSel, nextTech) => {
    clearTimeout(timer.current);
    setMoving(true);
    setTip(null);
    setPan({ x: 0, y: 0 });
    setSel(nextSel);
    setTechIdx(nextTech);
    timer.current = setTimeout(() => setMoving(false), 720);
  };
  const select = (id) => fly(id, 0);
  const pickTech = (rid, i) => {
    if (sel !== rid) fly(rid, i);
    else setTechIdx(i);
  };
  const step = (d) => {
    const i = REALMS.findIndex((r) => r.id === sel);
    select(REALMS[(i + d + REALMS.length) % REALMS.length].id);
  };
  // A drag ends in a click on the same element; swallow that one click.
  const guard = (fn) => (e) => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    fn(e);
  };

  /* ── drag (pan the map, or rearrange a star) ── */
  const dragMove = (ev) => {
    const d = drag.current;
    if (!d) return;
    if (!d.moved) {
      if (Math.abs(ev.clientX - d.sx) + Math.abs(ev.clientY - d.sy) < 5) return;
      d.moved = true;
      setDragging(true);
      setTip(null);
    }
    const dx = (ev.clientX - d.sx) * d.k;
    const dy = (ev.clientY - d.sy) * d.k;
    if (d.kind === "pan") {
      setPan({ x: clamp(d.px + dx, -450, 450), y: clamp(d.py + dy, -450, 450) });
    } else {
      setPos((p) => ({
        ...p,
        [d.id]: [clamp(d.ox + dx / d.sc, 70, 930), clamp(d.oy + dy / d.sc, 60, 540)],
      }));
    }
  };
  const startDrag = (e, d) => {
    if (e.button !== undefined && e.button !== 0) return;
    const el = e.currentTarget;
    const svg = el.ownerSVGElement || el.closest("svg");
    if (!svg) return;
    const w = svg.getBoundingClientRect().width || 1000;
    drag.current = { sx: e.clientX, sy: e.clientY, k: 1000 / w, moved: false, ...d };
    const cleanup = () => {
      window.removeEventListener("pointermove", dragMove);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      stopDragListeners.current = null;
    };
    const up = () => {
      cleanup();
      const was = drag.current;
      drag.current = null;
      if (was && was.moved) {
        suppressClick.current = true;
        setTimeout(() => {
          suppressClick.current = false;
        }, 0);
        setDragging(false);
      }
    };
    window.addEventListener("pointermove", dragMove);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    stopDragListeners.current = cleanup;
  };

  /* ── leader-line tooltip ── */
  const showTip = (e, info) => {
    const el = e.currentTarget;
    const stage = el.closest(".ta-stage");
    const body = el.querySelector(".ta-pbody");
    if (!stage || !body) return;
    const sr = stage.getBoundingClientRect();
    const pr = body.getBoundingClientRect();
    const x = pr.left + pr.width / 2 - sr.left;
    const y = pr.top + pr.height / 2 - sr.top;
    setTip({ x, y, r: pr.width / 2, flip: x > sr.width - 300, ...info });
  };

  /* ───────── derived view-model ───────── */
  const selRealm = REALMS.find((r) => r.id === sel) || null;
  const placeOf = (r) => pos[r.id] || POS[r.pos];
  let sc = 1;
  let tx = 0;
  let ty = 0;
  if (selRealm) {
    const [sx, sy] = placeOf(selRealm);
    sc = Math.min(2.6, 190 / orbitRadius(selRealm.techs.length - 1));
    tx = 360 - sc * sx;
    ty = 300 - sc * sy;
  }
  tx += pan.x;
  ty += pan.y;
  const invS = `scale(${(1 / sc).toFixed(4)})`;
  const a30 = (-32 * Math.PI) / 180;

  const realms = REALMS.map((r, ri) => {
    const isSel = sel === r.id;
    const isHot = hover === r.id;
    const lit = isSel || isHot;
    const c = lit ? ACCENT : NEUTRAL;
    const [x, y] = placeOf(r);
    return {
      ...r,
      ri,
      isSel,
      isHot,
      lit,
      c,
      x,
      y,
      maxR: orbitRadius(r.techs.length - 1),
    };
  });
  const byId = Object.fromEntries(realms.map((r) => [r.id, r]));

  const edges = EDGES.map(([ida, idb, label], i) => {
    const A = byId[ida];
    const B = byId[idb];
    const dx = B.x - A.x;
    const dy = B.y - A.y;
    const L = Math.sqrt(dx * dx + dy * dy);
    const rA = A.maxR + 6;
    const rB = B.maxR + 6;
    const t0 = (rA + Math.max(0, L - rA - rB) / 2) / L;
    const lit = A.lit || B.lit;
    const pc = lit ? (A.lit ? A.c : B.c) : "#80858E";
    const rw = Math.round(label.length * 5.9 + 30);
    const connected = selRealm && (selRealm.id === ida || selRealm.id === idb);
    return {
      i,
      A,
      B,
      lit,
      pc,
      label,
      rw,
      dimLabel: selRealm && !connected,
      lx: (A.x + dx * t0).toFixed(1),
      ly: (A.y + dy * t0).toFixed(1),
    };
  });

  const ci = selRealm ? Math.min(techIdx, selRealm.techs.length - 1) : 0;
  const curTech = selRealm ? selRealm.techs[ci] : null;
  const info = curTech
    ? TECH_INFO[curTech.name] || { about: "", use: "", projects: [] }
    : null;

  const vw = 1000 / sc;
  const vh = 600 / sc;
  const vx = -tx / sc;
  const vy = -ty / sc;

  const stageCls =
    "ta-stage" +
    (dragging ? " ta-dragging" : "") +
    (paused ? " ta-paused" : "") +
    (selRealm ? " ta-zoomed" : "") +
    (moving ? " ta-moving" : "");

  const backToList = (id) => {
    if (view !== "orbit") setView("orbit");
    select(id);
  };

  /* ───────── render ───────── */
  return (
    <section
      id="skills"
      className="ta-root"
      aria-labelledby="ta-title"
      style={{
        position: "relative",
        padding: "112px clamp(16px, 4vw, 40px)",
        background: "transparent",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 28,
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Header */}
        <header
          className="rv"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "28px 48px",
          }}
        >
          <div
            style={{
              flex: "1 1 560px",
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontFamily: MONO,
                fontSize: 12,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#9CA0A8",
              }}
            >
              <span style={{ color: ACCENT }}>03</span>
              <span style={{ width: 28, height: 1, background: "rgba(255,255,255,0.22)" }} />
              <span>Tech Arsenal</span>
            </div>
            <h2
              id="ta-title"
              style={{
                margin: 0,
                fontSize: "clamp(40px, 6vw, 72px)",
                lineHeight: 0.98,
                letterSpacing: "-0.04em",
                fontWeight: 600,
                color: "#F4F5F6",
              }}
            >
              Solar System <span style={{ color: "#6F747D" }}>&amp; Universe</span>
            </h2>
            <p
              style={{
                margin: 0,
                maxWidth: 560,
                fontSize: 16,
                lineHeight: 1.6,
                color: "#9CA0A8",
              }}
            >
              My technical stack, mapped as an interconnected universe. Select a
              realm to fly into its orbits, or hover any planet to inspect it.
            </p>
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              height: 32,
              padding: "0 12px",
              borderRadius: 8,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              fontFamily: MONO,
              fontSize: 12,
              color: "#9CA0A8",
            }}
          >
            <span>
              <span style={{ color: "#F4F5F6" }}>{TOTAL}</span> technologies
            </span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#5A5F68" }} />
            <span>
              <span style={{ color: "#F4F5F6" }}>{REALMS.length}</span> realms
            </span>
          </div>
        </header>

        {/* Accent sweep rule */}
        <div
          aria-hidden="true"
          style={{
            position: "relative",
            height: 1,
            background: "rgba(255,255,255,0.08)",
            overflow: "hidden",
          }}
        >
          <span
            className="ta-sweep"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "22%",
              height: 1,
              background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
            }}
          />
        </div>

        {/* Instrument panel */}
        <div
          style={{
            borderRadius: 20,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "#050608",
            overflow: "hidden",
            boxShadow: "0 40px 120px -40px rgba(0,0,0,0.8)",
          }}
        >
          {/* Toolbar */}
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              justifyContent: "space-between",
              gap: 12,
              minHeight: 56,
              padding: "0 10px 0 6px",
              background: "rgba(255,255,255,0.018)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <nav
              className="ta-hscroll"
              aria-label="Realms"
              style={{
                flex: "1 1 auto",
                minWidth: 0,
                display: "flex",
                alignItems: "stretch",
                overflowX: "auto",
              }}
            >
              {[{ id: null, name: "Universe", icon: REALM_ICONS.uni, count: TOTAL }]
                .concat(
                  REALMS.map((r) => ({
                    id: r.id,
                    name: r.name,
                    icon: r.icon,
                    count: r.techs.length,
                  }))
                )
                .map((b) => {
                  const on = sel === b.id;
                  return (
                    <button
                      key={b.id || "universe"}
                      type="button"
                      className="ta-tab"
                      onClick={() => backToList(b.id)}
                      aria-pressed={on}
                      style={{
                        "--line": on ? ACCENT : "transparent",
                        flex: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        minHeight: 56,
                        padding: "0 14px",
                        border: 0,
                        background: "transparent",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        fontSize: 13,
                        fontWeight: 500,
                        letterSpacing: "-0.005em",
                        color: on ? "#F4F5F6" : "#8C9199",
                        transition: "color .2s",
                      }}
                    >
                      <Icon d={b.icon} style={{ opacity: on ? 1 : 0.7 }} />
                      <span>{b.name}</span>
                      <span
                        style={{
                          fontFamily: MONO,
                          fontSize: "10.5px",
                          color: on ? ACCENT : "#6F747D",
                        }}
                      >
                        {pad2(b.count)}
                      </span>
                    </button>
                  );
                })}
            </nav>

            <div style={{ flex: "none", display: "flex", alignItems: "center", gap: 10 }}>
              {(pan.x || pan.y || Object.keys(pos).length > 0) && (
                <button
                  type="button"
                  className="ta-ib ta-rise"
                  onClick={() => {
                    setPan({ x: 0, y: 0 });
                    setPos({});
                  }}
                  title="Reset layout"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    height: 32,
                    padding: "0 10px",
                    borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "transparent",
                    color: "#9CA0A8",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: "12.5px",
                  }}
                >
                  <Icon d="M3 12a9 9 0 1 0 3-6.7L3 8 M3 3v5h5" sw={1.6} />
                  Reset layout
                </button>
              )}
              <div role="group" aria-label="View mode" style={segmented}>
                {[
                  ["orbit", "Orbit view", REALM_ICONS.uni],
                  ["list", "List view", "M8.5 6H20 M8.5 12H20 M8.5 18H20 M4 6h.01 M4 12h.01 M4 18h.01"],
                ].map(([id, label, d]) => {
                  const on = view === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      className="ta-ib"
                      onClick={() => setView(id)}
                      aria-pressed={on}
                      aria-label={label}
                      title={label}
                      style={{
                        ...iconBtn,
                        width: 34,
                        height: 30,
                        borderRadius: 7,
                        background: on ? "rgba(255,255,255,0.08)" : "transparent",
                        color: on ? "#F4F5F6" : "#9CA0A8",
                        boxShadow: on ? "inset 0 0 0 1px rgba(255,255,255,0.08)" : "none",
                      }}
                    >
                      <Icon d={d} size={15} />
                    </button>
                  );
                })}
              </div>
              <span aria-hidden="true" style={{ width: 1, height: 20, background: "rgba(255,255,255,0.1)" }} />
              <button
                type="button"
                className="ta-ib"
                onClick={() => setPaused(!paused)}
                aria-label={paused ? "Resume orbits" : "Pause orbits"}
                title={paused ? "Resume orbits" : "Pause orbits"}
                style={{ ...iconBtn, width: 36, height: 36, borderRadius: 8 }}
              >
                <Icon d={paused ? "M7 5l12 7-12 7V5z" : "M9 5v14 M15 5v14"} size={15} />
              </button>
            </div>
          </div>

          {/* ───────── ORBIT VIEW ───────── */}
          {view === "orbit" && (
            <div className={stageCls} style={{ position: "relative", background: "#050608", overflow: "hidden" }}>
              <svg
                className="ta-svgstage"
                viewBox="0 0 1000 600"
                xmlns="http://www.w3.org/2000/svg"
                role="group"
                aria-label={`Interactive map of ${TOTAL} technologies across ${REALMS.length} realms`}
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  touchAction: "none",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                }}
              >
                <defs>
                  <clipPath id="ta-disc" clipPathUnits="objectBoundingBox">
                    <circle cx="0.5" cy="0.5" r="0.5" />
                  </clipPath>
                  <linearGradient id="ta-term" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#000" stopOpacity="0" />
                    <stop offset="0.4" stopColor="#000" stopOpacity="0.06" />
                    <stop offset="0.72" stopColor="#000" stopOpacity="0.72" />
                    <stop offset="1" stopColor="#000" stopOpacity="0.94" />
                  </linearGradient>
                  <linearGradient id="ta-flareH" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#fff" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#fff" stopOpacity="0.8" />
                    <stop offset="1" stopColor="#fff" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="ta-flareV" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#fff" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#fff" stopOpacity="0.6" />
                    <stop offset="1" stopColor="#fff" stopOpacity="0" />
                  </linearGradient>
                  <radialGradient id="ta-coreCorona">
                    <stop offset="0" stopColor="#fff" stopOpacity="0.32" />
                    <stop offset="0.3" stopColor="#fff" stopOpacity="0.08" />
                    <stop offset="1" stopColor="#fff" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="ta-neb">
                    <stop offset="0" stopColor="#9BA3B4" stopOpacity="0.07" />
                    <stop offset="1" stopColor="#9BA3B4" stopOpacity="0" />
                  </radialGradient>
                  {realms.map((r) => (
                    <React.Fragment key={r.id}>
                      <radialGradient id={`ta-body-${r.id}`} cx="0.36" cy="0.42" r="0.72" fx="0.26" fy="0.36">
                        <stop offset="0" stopColor={mix(r.c, "#ffffff", 0.62)} />
                        <stop offset="0.5" stopColor={mix(r.c, "#15171c", 0.3)} />
                        <stop offset="1" stopColor={mix(r.c, "#040506", 0.86)} />
                      </radialGradient>
                      <linearGradient id={`ta-rim-${r.id}`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0" stopColor={r.c} stopOpacity="0.95" />
                        <stop offset="0.45" stopColor={r.c} stopOpacity="0.22" />
                        <stop offset="1" stopColor={r.c} stopOpacity="0" />
                      </linearGradient>
                      <radialGradient id={`ta-halo-${r.id}`}>
                        <stop offset="0" stopColor={r.c} stopOpacity="0.32" />
                        <stop offset="1" stopColor={r.c} stopOpacity="0" />
                      </radialGradient>
                      <linearGradient id={`ta-trail-${r.id}`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor={r.c} stopOpacity="0" />
                        <stop offset="1" stopColor={r.c} stopOpacity="0.7" />
                      </linearGradient>
                      <linearGradient id={`ta-orb-${r.id}`} x1="1" y1="0.5" x2="0" y2="0.5">
                        <stop offset="0" stopColor={r.c} stopOpacity={r.isSel ? 0.6 : r.isHot ? 0.45 : 0.2} />
                        <stop offset="0.55" stopColor={r.c} stopOpacity="0.05" />
                        <stop offset="1" stopColor={r.c} stopOpacity="0.015" />
                      </linearGradient>
                      <radialGradient id={`ta-corona-${r.id}`}>
                        <stop offset="0" stopColor={r.c} stopOpacity="0.5" />
                        <stop offset="0.32" stopColor={r.c} stopOpacity="0.14" />
                        <stop offset="1" stopColor={r.c} stopOpacity="0" />
                      </radialGradient>
                      <radialGradient id={`ta-core-${r.id}`} cx="0.4" cy="0.4" r="0.6">
                        <stop offset="0" stopColor="#ffffff" />
                        <stop offset="0.5" stopColor={mix(r.c, "#ffffff", 0.55)} />
                        <stop offset="1" stopColor={r.c} />
                      </radialGradient>
                    </React.Fragment>
                  ))}
                  {edges.map((e) => (
                    <linearGradient
                      key={e.i}
                      id={`ta-edge-${e.i}`}
                      gradientUnits="userSpaceOnUse"
                      x1={e.A.x}
                      y1={e.A.y}
                      x2={e.B.x}
                      y2={e.B.y}
                    >
                      <stop offset="0" stopColor={e.A.c} stopOpacity={e.lit ? 0.75 : 0.22} />
                      <stop offset="0.5" stopColor="#ffffff" stopOpacity={e.lit ? 0.2 : 0.05} />
                      <stop offset="1" stopColor={e.B.c} stopOpacity={e.lit ? 0.75 : 0.22} />
                    </linearGradient>
                  ))}
                </defs>

                {/* pan surface */}
                <rect
                  className="ta-bg"
                  x="0"
                  y="0"
                  width="1000"
                  height="600"
                  fill="transparent"
                  onClick={guard(() => {
                    if (sel) fly(null, 0);
                  })}
                  onPointerDown={(e) => startDrag(e, { kind: "pan", px: pan.x, py: pan.y })}
                />

                {/* parallax backdrop */}
                <g
                  className="ta-scene"
                  style={{
                    transform: `translate(${(tx * 0.05).toFixed(2)}px, ${(ty * 0.05).toFixed(2)}px) scale(${(1 + (sc - 1) * 0.05).toFixed(4)})`,
                    pointerEvents: "none",
                  }}
                >
                  <ellipse cx="500" cy="300" rx="420" ry="240" fill="url(#ta-neb)" />
                  {STARS.map((s, i) => (
                    <circle
                      key={i}
                      className={s.twinkle ? "ta-tw" : undefined}
                      cx={s.x}
                      cy={s.y}
                      r={s.r}
                      fill="#E8EAF0"
                      fillOpacity={s.o}
                      style={{ animationDelay: s.d }}
                    />
                  ))}
                </g>

                {/* world */}
                <g
                  className="ta-scene"
                  style={{ transform: `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px) scale(${sc.toFixed(4)})` }}
                >
                  {/* constellation links */}
                  {edges.map((e) => (
                    <g key={e.i} className={"ta-link" + (e.lit ? " ta-hot" : "")} style={{ pointerEvents: "none" }}>
                      <line
                        x1={e.A.x}
                        y1={e.A.y}
                        x2={e.B.x}
                        y2={e.B.y}
                        stroke={`url(#ta-edge-${e.i})`}
                        strokeWidth={e.lit ? 1 : 0.7}
                        strokeDasharray={e.lit ? "none" : "2 4"}
                      />
                      <line
                        className="ta-pkt"
                        x1={e.A.x}
                        y1={e.A.y}
                        x2={e.B.x}
                        y2={e.B.y}
                        pathLength="300"
                        stroke={e.pc}
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeDasharray="5 295"
                      />
                    </g>
                  ))}

                  {/* core */}
                  <g transform="translate(500 300)" style={{ pointerEvents: "none" }}>
                    <circle className="ta-breathe" r="30" fill="url(#ta-coreCorona)" />
                    <circle r="7.5" fill="none" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="0.5" strokeDasharray="1 2" />
                    <circle r="3.2" fill="#ffffff" />
                    <g transform={invS}>
                      <text
                        y={(22 * sc).toFixed(1)}
                        textAnchor="middle"
                        fontFamily="Geist Mono, monospace"
                        fontSize="9"
                        letterSpacing="1.6"
                        fill="#80858E"
                        fillOpacity={selRealm ? 0 : 1}
                      >
                        {`CORE · ${TOTAL}`}
                      </text>
                    </g>
                  </g>

                  {/* realms */}
                  {realms.map((r) => (
                    <g
                      key={r.id}
                      className={
                        "ta-realm" +
                        (r.isSel ? " ta-sel" : "") +
                        (r.isHot ? " ta-hot" : "") +
                        (selRealm && !r.isSel ? " ta-dim" : "")
                      }
                      transform={`translate(${r.x} ${r.y})`}
                    >
                      {r.techs.map((t, i) => {
                        const R = orbitRadius(i);
                        const size = t.ring ? 8.6 : i % 2 ? 7.2 : 7.8;
                        const dur = 18 + i * 7;
                        const ph = (r.ri * 0.37 + i * 0.618) % 1;
                        const timing = { animationDuration: `${dur}s`, animationDelay: `-${(ph * dur).toFixed(2)}s` };
                        const g = glyphOf(t.name);
                        const ls = size * 1.18;
                        const off = size * sc;
                        const rx = size * 2.1;
                        const ry = size * 0.58;
                        const enter = (e) =>
                          showTip(e, {
                            title: t.name,
                            sub: `${t.role} · ${r.name}`,
                            c: ACCENT,
                            tile: planetTile(ACCENT),
                            glyph: g,
                          });
                        const pick = guard(() => pickTech(r.id, i));
                        return (
                          <g key={t.name} className="ta-orbit" style={timing}>
                            <circle r={R} fill="none" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="0.6" strokeDasharray="1 3" style={{ pointerEvents: "none" }} />
                            <circle r={R} fill="none" stroke={`url(#ta-orb-${r.id})`} strokeWidth={r.isSel ? 0.9 : 0.6} style={{ pointerEvents: "none" }} />
                            <path
                              d={`M ${(R * Math.cos(a30)).toFixed(2)} ${(R * Math.sin(a30)).toFixed(2)} A ${R} ${R} 0 0 1 ${R} 0`}
                              fill="none"
                              stroke={`url(#ta-trail-${r.id})`}
                              strokeWidth={Math.max(1.4, size * 0.5).toFixed(2)}
                              strokeLinecap="round"
                              style={{ pointerEvents: "none" }}
                            />
                            <g
                              className={"ta-planet" + (r.isSel && ci === i ? " ta-on" : "")}
                              transform={`translate(${R} 0)`}
                              tabIndex={0}
                              role="button"
                              aria-label={`${t.name}, ${t.role}`}
                              onClick={pick}
                              onKeyDown={onKey(() => pickTech(r.id, i))}
                              onMouseEnter={enter}
                              onMouseLeave={() => setTip(null)}
                              onFocus={enter}
                              onBlur={() => setTip(null)}
                            >
                              <circle className="ta-hit" r={size + 7} fill="transparent" />
                              <circle className="ta-halo" r={(size * 2.8).toFixed(2)} fill={`url(#ta-halo-${r.id})`} />
                              <g className="ta-ctr" style={{ ...timing, pointerEvents: "none" }}>
                                {t.ring && (
                                  <path
                                    d={`M ${(-rx).toFixed(2)} 0 A ${rx.toFixed(2)} ${ry.toFixed(2)} 0 0 1 ${rx.toFixed(2)} 0`}
                                    transform="rotate(-16)"
                                    fill="none"
                                    stroke={r.c}
                                    strokeOpacity="0.45"
                                    strokeWidth="1.1"
                                  />
                                )}
                              </g>
                              <circle className="ta-pbody" r={size} fill={`url(#ta-body-${r.id})`} style={{ pointerEvents: "none" }} />
                              <g clipPath="url(#ta-disc)" style={{ pointerEvents: "none" }}>
                                <rect x={-size} y={-size} width={size * 2} height={size * 2} fill="none" />
                                <rect x={-size} y={(-size * 0.46).toFixed(2)} width={size * 2} height={(size * 0.12).toFixed(2)} fill="#ffffff" fillOpacity="0.1" />
                                <rect x={-size} y={(-size * 0.08).toFixed(2)} width={size * 2} height={(size * 0.2).toFixed(2)} fill="#000000" fillOpacity="0.16" />
                                <rect x={-size} y={(size * 0.34).toFixed(2)} width={size * 2} height={(size * 0.1).toFixed(2)} fill="#ffffff" fillOpacity="0.07" />
                              </g>
                              <circle r={size} fill="url(#ta-term)" style={{ pointerEvents: "none" }} />
                              <circle r={size} fill="none" stroke={`url(#ta-rim-${r.id})`} strokeWidth="0.7" style={{ pointerEvents: "none" }} />
                              <circle className="ta-selring" r={(size + 3.5).toFixed(2)} fill="none" stroke={ACCENT} strokeWidth="0.8" />
                              <g className="ta-ctr" style={{ ...timing, pointerEvents: "none" }}>
                                {t.ring && (
                                  <path
                                    d={`M ${rx.toFixed(2)} 0 A ${rx.toFixed(2)} ${ry.toFixed(2)} 0 0 1 ${(-rx).toFixed(2)} 0`}
                                    transform="rotate(-16)"
                                    fill="none"
                                    stroke={r.c}
                                    strokeOpacity="0.85"
                                    strokeWidth="1.1"
                                  />
                                )}
                                {g ? (
                                  <g transform={`translate(${(-ls / 2).toFixed(2)} ${(-ls / 2).toFixed(2)}) scale(${(ls / 24).toFixed(4)})`} opacity="0.96">
                                    <path d={g.d} fill={g.fill} stroke={g.stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                  </g>
                                ) : (
                                  <text
                                    textAnchor="middle"
                                    dominantBaseline="central"
                                    fontFamily="Geist Mono, monospace"
                                    fontSize={(size * 0.9).toFixed(2)}
                                    fontWeight="600"
                                    fill="#ffffff"
                                    fillOpacity="0.92"
                                  >
                                    {t.mono}
                                  </text>
                                )}
                                <g transform={invS}>
                                  <text
                                    className="ta-plabel"
                                    x={(off + 8).toFixed(1)}
                                    y="4"
                                    fontFamily="Geist, sans-serif"
                                    fontSize="11.5"
                                    fontWeight="500"
                                    fill="#E6E8EC"
                                    stroke="#050608"
                                    strokeWidth="3"
                                    paintOrder="stroke"
                                  >
                                    {t.name}
                                  </text>
                                </g>
                              </g>
                            </g>
                          </g>
                        );
                      })}

                      {/* star */}
                      <g
                        className="ta-starbody"
                        tabIndex={0}
                        role="button"
                        aria-label={`${r.name} realm, ${r.techs.length} technologies`}
                        onClick={guard(() => select(r.id))}
                        onPointerDown={(e) => startDrag(e, { kind: "star", id: r.id, ox: r.x, oy: r.y, sc })}
                        onKeyDown={onKey(() => select(r.id))}
                        onMouseEnter={(e) => {
                          setHover(r.id);
                          showTip(e, {
                            title: r.name,
                            sub: `${r.techs.length} planets · click to explore`,
                            c: ACCENT,
                            tile: planetTile(ACCENT),
                            glyph: iconGlyph(r.icon),
                          });
                        }}
                        onMouseLeave={() => {
                          setHover(null);
                          setTip(null);
                        }}
                      >
                        <circle className="ta-breathe" r="40" fill={`url(#ta-corona-${r.id})`} style={{ animationDelay: `-${(r.ri * 0.83).toFixed(2)}s` }} />
                        <g className="ta-flare">
                          <ellipse rx="82" ry="0.9" fill="url(#ta-flareH)" />
                          <ellipse rx="0.9" ry="30" fill="url(#ta-flareV)" />
                        </g>
                        <circle className="ta-hit" r="17" fill="transparent" />
                        <circle className="ta-pbody" r="9" fill={`url(#ta-core-${r.id})`} style={{ pointerEvents: "none" }} />
                        <circle r="13" fill="none" stroke={r.c} strokeOpacity="0.35" strokeWidth="0.5" style={{ pointerEvents: "none" }} />
                      </g>
                      <g transform={invS} style={{ pointerEvents: "none" }}>
                        <text
                          y={(9 * sc + 20).toFixed(1)}
                          textAnchor="middle"
                          fontFamily="Geist Mono, monospace"
                          fontSize="10"
                          fontWeight="500"
                          letterSpacing="1.5"
                          fill="#E6E8EC"
                          fillOpacity={r.lit ? 1 : 0.62}
                          stroke="#050608"
                          strokeWidth="3"
                          paintOrder="stroke"
                        >
                          {r.name.toUpperCase()}
                        </text>
                        <text
                          className="ta-rsub"
                          y={(9 * sc + 33).toFixed(1)}
                          textAnchor="middle"
                          fontFamily="Geist Mono, monospace"
                          fontSize="9"
                          letterSpacing="1.2"
                          fill={r.c}
                          stroke="#050608"
                          strokeWidth="3"
                          paintOrder="stroke"
                        >
                          {`${r.techs.length} PLANETS`}
                        </text>
                      </g>
                    </g>
                  ))}

                  {/* edge labels */}
                  {edges.map((e) => (
                    <g
                      key={e.i}
                      className={"ta-elabel" + (e.dimLabel ? " ta-dim" : "")}
                      transform={`translate(${e.lx} ${e.ly})`}
                      style={{ pointerEvents: "none" }}
                    >
                      <g transform={invS}>
                        <rect
                          x={-e.rw / 2}
                          y="-10"
                          width={e.rw}
                          height="20"
                          rx="10"
                          fill="#08090C"
                          fillOpacity="0.92"
                          stroke={e.lit ? rgba(e.pc, 0.55) : "rgba(255,255,255,0.1)"}
                          strokeWidth="1"
                        />
                        <circle cx={-e.rw / 2 + 11} cy="0" r="2.2" fill={e.pc} />
                        <text
                          x={-e.rw / 2 + 19}
                          y="0.5"
                          dominantBaseline="central"
                          fontFamily="Geist Mono, monospace"
                          fontSize="9.5"
                          letterSpacing="0.2"
                          fill={e.lit ? "#ECEDEF" : "#9CA0A8"}
                        >
                          {e.label}
                        </text>
                      </g>
                    </g>
                  ))}
                </g>
              </svg>

              {/* vignette + film grain */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background: "radial-gradient(120% 95% at 50% 50%, transparent 52%, rgba(0,0,0,0.6) 100%)",
                }}
              />
              <svg
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                  opacity: 0.1,
                  mixBlendMode: "overlay",
                }}
              >
                <filter id="ta-grain">
                  <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
                  <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#ta-grain)" />
              </svg>

              {/* HUD */}
              <div
                style={{
                  ...hudChip,
                  top: 16,
                  left: 16,
                  fontFamily: MONO,
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#D6D8DD",
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: 2, background: ACCENT }} />
                <span>{selRealm ? `Realm · ${selRealm.name}` : "Universe view"}</span>
                <span style={{ color: "#80858E" }}>
                  {`${((vx + vw / 2) / 1000).toFixed(2)} / ${((vy + vh / 2) / 600).toFixed(2)}`}
                </span>
              </div>

              {!selRealm && (
                <>
                  <div
                    className="ta-hud-r"
                    style={{
                      ...hudChip,
                      top: 16,
                      right: 16,
                      fontFamily: MONO,
                      fontSize: 11,
                      letterSpacing: "0.1em",
                      color: "#9CA0A8",
                    }}
                  >
                    <span
                      className={paused ? undefined : "ta-live"}
                      style={{ width: 6, height: 6, borderRadius: "50%", background: paused ? "#6F747D" : ACCENT }}
                    />
                    <span>{`${paused ? "PAUSED" : "LIVE"} · ${sc.toFixed(2)}×`}</span>
                  </div>
                  <div className="ta-hint" style={{ ...hudChip, right: 16, bottom: 16, fontSize: 12, color: "#9CA0A8" }}>
                    <Icon d="M5 3l14 7.5-6.2 1.8L11 19 5 3z" size={13} />
                    <span>Drag to pan · drag a star to rearrange</span>
                    <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#5A5F68" }} />
                    <span>Click any planet to learn more</span>
                  </div>
                </>
              )}

              {/* minimap */}
              <div
                className="ta-mm"
                aria-hidden="true"
                style={{
                  ...hudChip,
                  display: "block",
                  height: "auto",
                  left: 16,
                  bottom: 16,
                  width: 172,
                  padding: 8,
                  boxSizing: "border-box",
                  borderRadius: 12,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: MONO,
                    fontSize: "9.5px",
                    letterSpacing: "0.14em",
                    color: "#80858E",
                    marginBottom: 7,
                  }}
                >
                  <span>NAV</span>
                  <span>{`${sc.toFixed(2)}×`}</span>
                </div>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "5 / 3",
                    borderRadius: 6,
                    background: "rgba(255,255,255,0.025)",
                    overflow: "hidden",
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                    backgroundSize: "25% 33.33%",
                  }}
                >
                  {realms.map((r) => (
                    <span
                      key={r.id}
                      style={{
                        position: "absolute",
                        left: `${r.x / 10}%`,
                        top: `${(r.y / 6).toFixed(2)}%`,
                        width: 5,
                        height: 5,
                        margin: "-2.5px 0 0 -2.5px",
                        borderRadius: "50%",
                        background: r.lit ? ACCENT : "#6F747D",
                      }}
                    />
                  ))}
                  <span style={{ position: "absolute", left: "50%", top: "50%", width: 3, height: 3, margin: "-1.5px 0 0 -1.5px", borderRadius: "50%", background: "#ffffff" }} />
                  <span
                    style={{
                      position: "absolute",
                      left: `${(vx / 10).toFixed(2)}%`,
                      top: `${(vy / 6).toFixed(2)}%`,
                      width: `${(100 / sc).toFixed(2)}%`,
                      height: `${(100 / sc).toFixed(2)}%`,
                      boxSizing: "border-box",
                      border: `1px solid ${ACCENT}`,
                      borderRadius: 3,
                      boxShadow: "0 0 0 999px rgba(0,0,0,0.38)",
                      transition:
                        "left 1.15s cubic-bezier(.22,1.16,.32,1), top 1.15s cubic-bezier(.22,1.16,.32,1), width 1.15s cubic-bezier(.22,1.16,.32,1), height 1.15s cubic-bezier(.22,1.16,.32,1)",
                    }}
                  />
                </div>
              </div>

              {/* inspector */}
              {selRealm && curTech && (
                <aside
                  className="ta-insp"
                  aria-label="Realm inspector"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    background: "rgba(10,11,14,0.8)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: "0 30px 80px -24px rgba(0,0,0,0.75)",
                  }}
                >
                  <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)` }} />
                  <div
                    style={{
                      padding: "16px 16px 16px 18px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span
                        style={{
                          flex: "none",
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          display: "grid",
                          placeItems: "center",
                          border: `1px solid ${rgba(ACCENT, 0.35)}`,
                          background: rgba(ACCENT, 0.08),
                          color: ACCENT,
                        }}
                      >
                        <Icon d={selRealm.icon} size={17} />
                      </span>
                      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 3 }}>
                        <span style={eyebrow}>
                          {`REALM ${pad2(REALMS.indexOf(selRealm) + 1)} / ${pad2(REALMS.length)}`}
                        </span>
                        <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em", color: "#F4F5F6" }}>
                          {selRealm.name}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: 2 }}>
                        <button type="button" className="ta-ib" onClick={() => step(-1)} aria-label="Previous realm" style={{ ...iconBtn, width: 36, height: 36, borderRadius: 8 }}>
                          <Icon d="M15 6l-6 6 6 6" size={16} />
                        </button>
                        <button type="button" className="ta-ib" onClick={() => step(1)} aria-label="Next realm" style={{ ...iconBtn, width: 36, height: 36, borderRadius: 8 }}>
                          <Icon d="M9 6l6 6-6 6" size={16} />
                        </button>
                        <button
                          type="button"
                          className="ta-ib"
                          onClick={() => fly(null, 0)}
                          aria-label="Back to universe"
                          style={{ ...iconBtn, width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.05)", color: "#C9CCD2" }}
                        >
                          <Icon d="M6 6l12 12 M18 6L6 18" size={15} />
                        </button>
                      </div>
                    </div>
                    <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: "#9CA0A8" }}>{selRealm.desc}</p>
                  </div>

                  <div
                    style={{
                      flex: 1,
                      minHeight: 0,
                      overflowY: "auto",
                      padding: "14px 16px 18px 18px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                    }}
                  >
                    <div
                      className="ta-hscroll ta-rise"
                      role="group"
                      aria-label="Technologies in realm"
                      style={{ ...segmented, flex: "none", overflowX: "auto", animationDelay: "0.08s" }}
                    >
                      {selRealm.techs.map((t, i) => {
                        const on = i === ci;
                        return (
                          <button
                            key={t.name}
                            type="button"
                            onClick={() => setTechIdx(i)}
                            aria-pressed={on}
                            style={{
                              flex: "none",
                              height: 32,
                              padding: "0 11px",
                              border: 0,
                              borderRadius: 7,
                              cursor: "pointer",
                              fontFamily: "inherit",
                              fontSize: "12.5px",
                              fontWeight: 500,
                              whiteSpace: "nowrap",
                              background: on ? "rgba(255,255,255,0.09)" : "transparent",
                              color: on ? "#F4F5F6" : "#9CA0A8",
                              boxShadow: on ? "inset 0 0 0 1px rgba(255,255,255,0.1)" : "none",
                              transition: "background .2s, color .2s",
                            }}
                          >
                            {t.name}
                          </button>
                        );
                      })}
                    </div>

                    <div
                      key={curTech.name}
                      className="ta-rise"
                      style={{
                        flex: "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                        padding: 16,
                        borderRadius: 12,
                        background: "rgba(255,255,255,0.025)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        animationDelay: "0.14s",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <Tile tech={curTech} color={ACCENT} size={48} />
                        <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
                          <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em", color: "#F4F5F6" }}>
                            {curTech.name}
                          </span>
                          <span style={{ fontFamily: MONO, fontSize: "11.5px", color: "#9CA0A8" }}>{curTech.role}</span>
                        </div>
                      </div>

                      {info.about && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                          <span style={eyebrow}>WHAT IT IS</span>
                          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "#C9CCD2" }}>{info.about}</p>
                        </div>
                      )}

                      {info.use && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 6,
                            padding: 12,
                            borderRadius: 10,
                            background: rgba(ACCENT, 0.06),
                            border: `1px solid ${rgba(ACCENT, 0.25)}`,
                          }}
                        >
                          <span style={{ ...eyebrow, display: "flex", alignItems: "center", gap: 7, color: ACCENT }}>
                            <Icon d="M16 18l6-6-6-6 M8 6l-6 6 6 6" size={12} sw={1.8} />
                            HOW I USE IT
                          </span>
                          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "#D6D8DD" }}>{info.use}</p>
                        </div>
                      )}

                      {SHOW_PROFICIENCY && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          <div style={{ ...eyebrow, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                            <span>PROFICIENCY</span>
                            <span style={{ color: "#D6D8DD", letterSpacing: "0.04em" }}>
                              {`${LEVELS[curTech.level - 1]} · ${curTech.level} / 5`}
                            </span>
                          </div>
                          <div style={{ display: "flex", gap: 4 }}>
                            <Segments level={curTech.level} color={ACCENT} h={6} radius={2} />
                          </div>
                        </div>
                      )}

                      {info.projects.length > 0 && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          <span style={eyebrow}>USED IN</span>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {info.projects.map((name) => (
                              <a
                                key={name}
                                href="#projects"
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 6,
                                  height: 30,
                                  padding: "0 10px",
                                  borderRadius: 7,
                                  border: "1px solid rgba(255,255,255,0.1)",
                                  background: "rgba(255,255,255,0.03)",
                                  fontSize: 12,
                                  textDecoration: "none",
                                }}
                              >
                                {name}
                                <Icon d="M7 17L17 7 M8 7h9v9" size={12} sw={1.6} />
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div style={{ flex: "none", display: "flex", flexDirection: "column", gap: 4 }}>
                      <span className="ta-rise" style={{ ...eyebrow, padding: "0 2px 6px", animationDelay: "0.2s" }}>
                        IN THIS REALM
                      </span>
                      {selRealm.techs.map((t, i) => (
                        <button
                          key={t.name}
                          type="button"
                          className="ta-rise"
                          onClick={() => setTechIdx(i)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            width: "100%",
                            minHeight: 48,
                            padding: "8px 10px",
                            border: 0,
                            borderRadius: 10,
                            cursor: "pointer",
                            textAlign: "left",
                            fontFamily: "inherit",
                            color: "inherit",
                            background: i === ci ? "rgba(255,255,255,0.05)" : "transparent",
                            animationDelay: `${(0.24 + i * 0.05).toFixed(2)}s`,
                            transition: "background .2s",
                          }}
                        >
                          <Tile tech={t} color={ACCENT} size={28} />
                          <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                            <span style={{ fontSize: "13.5px", fontWeight: 500, color: "#ECEDEF" }}>{t.name}</span>
                            <span style={{ fontFamily: MONO, fontSize: "10.5px", color: "#80858E" }}>{t.role}</span>
                          </span>
                          {SHOW_PROFICIENCY && (
                            <span aria-hidden="true" style={{ flex: "none", display: "flex" }}>
                              <Segments level={t.level} color={ACCENT} w={8} h={4} gap={2} radius={1} />
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </aside>
              )}

              {/* leader-line tooltip */}
              {tip &&
                (() => {
                  const tr = Math.max(tip.r, 4);
                  const sx = tip.flip ? -1 : 1;
                  const ex = sx * tr * 0.71;
                  const ey = -tr * 0.71;
                  const kx = sx * (tr + 16);
                  const ky = -tr - 16;
                  const cx = sx * (tr + 28);
                  return (
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        left: tip.x,
                        top: tip.y,
                        width: 0,
                        height: 0,
                        pointerEvents: "none",
                        zIndex: 5,
                      }}
                    >
                      <svg width="1" height="1" style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
                        <path
                          d={`M ${ex.toFixed(1)} ${ey.toFixed(1)} L ${kx.toFixed(1)} ${ky.toFixed(1)} L ${cx.toFixed(1)} ${ky.toFixed(1)}`}
                          fill="none"
                          stroke={tip.c}
                          strokeOpacity="0.9"
                          strokeWidth="1"
                        />
                        <circle cx={ex.toFixed(1)} cy={ey.toFixed(1)} r="2" fill={tip.c} />
                      </svg>
                      <div
                        className="ta-ptip"
                        style={{
                          position: "absolute",
                          left: cx,
                          top: ky,
                          transform: `translate(${tip.flip ? "-100%" : "0"}, -50%)`,
                          display: "flex",
                          alignItems: "center",
                          gap: 11,
                          padding: "8px 14px 8px 8px",
                          borderRadius: 12,
                          background: "rgba(12,13,17,0.88)",
                          backdropFilter: "blur(14px)",
                          WebkitBackdropFilter: "blur(14px)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          boxShadow: "0 16px 40px -12px rgba(0,0,0,0.7)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <span
                          style={{
                            flex: "none",
                            width: 34,
                            height: 34,
                            borderRadius: "50%",
                            display: "grid",
                            placeItems: "center",
                            background: tip.tile,
                            boxShadow: "inset -4px -4px 9px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)",
                          }}
                        >
                          {tip.glyph && <Glyph g={tip.glyph} size={17} />}
                        </span>
                        <span style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                          <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em", color: "#F4F5F6" }}>
                            {tip.title}
                          </span>
                          <span style={{ fontFamily: MONO, fontSize: "10.5px", color: "#9CA0A8" }}>{tip.sub}</span>
                        </span>
                      </div>
                    </div>
                  );
                })()}
            </div>
          )}

          {/* ───────── LIST VIEW (also the no-pointer / screen-reader friendly view) ───────── */}
          {view === "list" && (
            <div
              style={{
                background: "#050608",
                padding: 8,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(340px, 100%), 1fr))",
                gap: 8,
              }}
            >
              {REALMS.map((r) => (
                <section
                  key={r.id}
                  style={{
                    padding: 18,
                    borderRadius: 14,
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <h3
                    style={{
                      margin: "0 0 10px",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#F4F5F6",
                    }}
                  >
                    <Icon d={r.icon} size={16} style={{ color: ACCENT }} />
                    <span style={{ flex: 1 }}>{r.name}</span>
                    <span style={{ fontFamily: MONO, fontSize: "10.5px", fontWeight: 500, color: "#80858E" }}>
                      {`${r.techs.length} PLANETS`}
                    </span>
                  </h3>
                  <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" }}>
                    {r.techs.map((t) => (
                      <li
                        key={t.name}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "10px 0",
                          borderTop: "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        <Tile tech={t} color={ACCENT} size={28} />
                        <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                          <span style={{ fontSize: "13.5px", fontWeight: 500, color: "#ECEDEF" }}>{t.name}</span>
                          <span style={{ fontFamily: MONO, fontSize: "10.5px", color: "#80858E" }}>{t.role}</span>
                        </span>
                        {SHOW_PROFICIENCY && (
                          <span
                            role="img"
                            aria-label={`Proficiency ${t.level} of 5`}
                            style={{ flex: "none", display: "flex" }}
                          >
                            <Segments level={t.level} color={ACCENT} w={8} h={4} gap={2} radius={1} />
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </div>

        {/* Realm index — shown once a realm is selected */}
        {selRealm && (
          <section
            className="ta-rise"
            aria-labelledby="ta-realm-index"
            style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 12 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                <h3 id="ta-realm-index" style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", color: "#F4F5F6" }}>
                  Realm details
                </h3>
                <span style={{ ...eyebrow, fontSize: 11 }}>
                  {`REALM ${pad2(REALMS.indexOf(selRealm) + 1)} / ${pad2(REALMS.length)}`}
                </span>
              </div>
              <button
                type="button"
                className="ta-ib"
                onClick={() => fly(null, 0)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  height: 36,
                  padding: "0 12px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "transparent",
                  color: "#9CA0A8",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: 13,
                }}
              >
                <Icon d="M19 12H5 M11 6l-6 6 6 6" sw={1.6} />
                Back to universe
              </button>
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              {[selRealm].map((r) => {
                const hot = hover === r.id || sel === r.id;
                return (
                  <li key={r.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <button
                      type="button"
                      className={"ta-row ta-rowg" + (hot ? " ta-hot" : "")}
                      onClick={() => backToList(r.id)}
                      onMouseEnter={() => setHover(r.id)}
                      onMouseLeave={() => setHover(null)}
                      onMouseMove={(e) => {
                        const el = e.currentTarget;
                        const b = el.getBoundingClientRect();
                        el.style.setProperty("--mx", `${e.clientX - b.left}px`);
                        el.style.setProperty("--my", `${e.clientY - b.top}px`);
                      }}
                      aria-label={`Focus ${r.name} realm, ${r.techs.length} technologies`}
                      style={{
                        "--rc": ACCENT,
                        "--glow": rgba(ACCENT, 0.06),
                        alignItems: "center",
                        gap: "12px 28px",
                        width: "100%",
                        padding: "26px 18px",
                        border: 0,
                        background: "transparent",
                        textAlign: "left",
                        fontFamily: "inherit",
                        color: "inherit",
                        cursor: "pointer",
                      }}
                    >
                      <span
                        style={{
                          alignSelf: "start",
                          paddingTop: 3,
                          fontFamily: MONO,
                          fontSize: 12,
                          letterSpacing: "0.06em",
                          color: hot ? ACCENT : "#6F747D",
                          transition: "color .3s",
                        }}
                      >
                        {pad2(REALMS.indexOf(r) + 1)}
                      </span>
                      <span style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <Icon d={r.icon} size={16} style={{ flex: "none", color: hot ? ACCENT : "#9CA0A8", transition: "color .3s" }} />
                          <span className="ta-rname" style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em", color: "#E6E8EC", transition: "color .3s" }}>
                            {r.name}
                          </span>
                        </span>
                        <span style={{ fontSize: "13.5px", lineHeight: 1.55, color: "#9CA0A8", maxWidth: 360 }}>{r.desc}</span>
                      </span>
                      <span className="ta-c3" style={{ display: "flex", flexWrap: "wrap", gap: 6, minWidth: 0 }}>
                        {r.techs.map((t) => {
                          const g = glyphOf(t.name);
                          return (
                            <span
                              key={t.name}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                height: 30,
                                padding: "0 11px 0 5px",
                                borderRadius: 8,
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.07)",
                                fontSize: "12.5px",
                                color: "#D6D8DD",
                              }}
                            >
                              <span
                                style={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: "50%",
                                  display: "grid",
                                  placeItems: "center",
                                  background: planetTile(hot ? ACCENT : "#8A8F99"),
                                  boxShadow: "inset -2px -2px 5px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
                                  fontFamily: MONO,
                                  fontSize: 8,
                                  fontWeight: 600,
                                  color: "#ffffff",
                                }}
                              >
                                {g ? <Glyph g={g} size={11} /> : <span>{t.mono}</span>}
                              </span>
                              {t.name}
                            </span>
                          );
                        })}
                      </span>
                      <span className="ta-c4" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 14 }}>
                        <span style={{ fontFamily: MONO, fontSize: 12, color: "#80858E" }}>{`${pad2(r.techs.length)} PLANETS`}</span>
                        <span
                          className="ta-arr"
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            display: "grid",
                            placeItems: "center",
                            border: "1px solid rgba(255,255,255,0.12)",
                            color: "#9CA0A8",
                          }}
                        >
                          <Icon d="M5 12h14 M13 6l6 6-6 6" sw={1.6} />
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </div>
    </section>
  );
};

export default Skills;

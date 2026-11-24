import React, { useEffect, useRef } from "react";

export default function CosmicStarfield({ darkMode = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!darkMode) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const reduceMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    // Handle high DPI & full container sizing
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Multi-layered Starfield configuration
    const STAR_COUNT = 280;
    const stars = Array.from({ length: STAR_COUNT }, () => {
      const parent = canvas.parentElement;
      const w = parent ? parent.clientWidth : window.innerWidth;
      const h = parent ? parent.clientHeight : window.innerHeight * 4;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1.8 + 0.4,
        baseAlpha: Math.random() * 0.7 + 0.25,
        twinkleSpeed: Math.random() * 0.035 + 0.012,
        phase: Math.random() * Math.PI * 2,
        driftY: (Math.random() - 0.5) * 0.06,
        driftX: (Math.random() - 0.5) * 0.04,
        color:
          Math.random() > 0.8
            ? "#c084fc" // Cosmic Purple
            : Math.random() > 0.65
            ? "#38bdf8" // Cyan Starlight
            : Math.random() > 0.92
            ? "#fbbf24" // Solar Gold
            : "#ffffff", // Pure White
      };
    });

    // Occasional shooting star
    let shootingStar = null;
    let nextShootingStarTime = performance.now() + Math.random() * 5000 + 4000;

    const triggerShootingStar = (now) => {
      const parent = canvas.parentElement;
      const w = parent ? parent.clientWidth : window.innerWidth;
      const scrollY = window.scrollY || 0;
      const vh = window.innerHeight;

      // Spawn near the currently visible viewport
      const startX = Math.random() * (w * 0.7) + w * 0.1;
      const startY = scrollY + Math.random() * (vh * 0.6) + 40;
      const length = Math.random() * 140 + 90;
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.25;

      shootingStar = {
        x: startX,
        y: startY,
        dx: Math.cos(angle) * 14,
        dy: Math.sin(angle) * 14,
        length,
        life: 1.0,
        decay: Math.random() * 0.02 + 0.018,
      };

      nextShootingStarTime = now + Math.random() * 8000 + 6000;
    };

    const render = (time) => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      const scrollY = window.scrollY || 0;
      const viewH = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // Only draw stars within or near the visible scroll window for top performance
      const viewTop = scrollY - 200;
      const viewBottom = scrollY + viewH + 200;

      for (let i = 0; i < STAR_COUNT; i++) {
        const s = stars[i];

        if (!reduceMotion) {
          s.phase += s.twinkleSpeed;
          s.x = (s.x + s.driftX + w) % w;
          s.y = (s.y + s.driftY + h) % h;
        }

        if (s.y >= viewTop && s.y <= viewBottom) {
          // Smoothly fade stars in from top and out towards bottom for a seamless zone
          const topFade = Math.min(1, Math.max(0, s.y / 280));
          const bottomFade = Math.min(1, Math.max(0, (h - s.y) / 280));
          const alpha =
            s.baseAlpha *
            (0.55 + 0.45 * Math.sin(s.phase)) *
            topFade *
            bottomFade;

          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle =
            s.color === "#ffffff"
              ? `rgba(255, 255, 255, ${alpha})`
              : s.color;
          ctx.globalAlpha = alpha;
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      // Draw active shooting star
      if (!reduceMotion && time > nextShootingStarTime && !shootingStar) {
        triggerShootingStar(time);
      }

      if (shootingStar) {
        shootingStar.x += shootingStar.dx;
        shootingStar.y += shootingStar.dy;
        shootingStar.life -= shootingStar.decay;

        if (shootingStar.life > 0) {
          const tailX =
            shootingStar.x - (shootingStar.dx / 14) * shootingStar.length;
          const tailY =
            shootingStar.y - (shootingStar.dy / 14) * shootingStar.length;

          const grad = ctx.createLinearGradient(
            shootingStar.x,
            shootingStar.y,
            tailX,
            tailY
          );
          grad.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.life * 0.9})`);
          grad.addColorStop(0.3, `rgba(192, 132, 252, ${shootingStar.life * 0.6})`);
          grad.addColorStop(1, "transparent");

          ctx.beginPath();
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(tailX, tailY);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.8;
          ctx.stroke();

          // Spark head
          ctx.beginPath();
          ctx.arc(shootingStar.x, shootingStar.y, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${shootingStar.life})`;
          ctx.shadowColor = "#c084fc";
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          shootingStar = null;
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [darkMode]);

  if (!darkMode) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        backgroundColor: "#0a0a0c",
        backgroundImage: `
          radial-gradient(circle at 50% 12%, rgba(88, 28, 135, 0.22), transparent 45%),
          radial-gradient(circle at 82% 32%, rgba(14, 116, 144, 0.18), transparent 42%),
          radial-gradient(circle at 18% 55%, rgba(124, 58, 237, 0.2), transparent 45%),
          radial-gradient(circle at 75% 75%, rgba(14, 116, 144, 0.18), transparent 42%),
          radial-gradient(circle at 50% 92%, rgba(88, 28, 135, 0.2), transparent 45%),
          url(/night-sky.png)
        `,
        backgroundSize: "cover, cover, cover, cover, cover, cover",
        backgroundPosition: "center, center, center, center, center, center",
        backgroundAttachment: "scroll, scroll, scroll, scroll, scroll, fixed",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.08) 60px, rgba(0, 0, 0, 0.45) 140px, rgba(0, 0, 0, 0.85) 230px, #000000 320px, #000000 calc(100% - 320px), rgba(0, 0, 0, 0.85) calc(100% - 220px), rgba(0, 0, 0, 0.35) calc(100% - 100px), transparent 100%)",
        maskImage:
          "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.08) 60px, rgba(0, 0, 0, 0.45) 140px, rgba(0, 0, 0, 0.85) 230px, #000000 320px, #000000 calc(100% - 320px), rgba(0, 0, 0, 0.85) calc(100% - 220px), rgba(0, 0, 0, 0.35) calc(100% - 100px), transparent 100%)",
        overflow: "hidden",
      }}
    >
      {/* Top feathering overlay blending seamlessly with Hero */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "320px",
          background:
            "linear-gradient(to bottom, #0a0a0c 0%, rgba(10, 10, 12, 0.85) 35%, rgba(10, 10, 12, 0.35) 70%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      {/* Bottom feathering overlay blending seamlessly into Projects */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "320px",
          background:
            "linear-gradient(to top, #0a0a0c 0%, rgba(10, 10, 12, 0.85) 35%, rgba(10, 10, 12, 0.35) 70%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
}

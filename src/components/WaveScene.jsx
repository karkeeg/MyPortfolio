import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// High-impact color presets for the 3D Wave point-cloud
export const WAVE_THEMES = {
  sunset: {
    name: "Sunset & Cyber Mix",
    accentA: new THREE.Color("#7c3aed"), // Radiant Electric Violet (fully visible in troughs!)
    accentB: new THREE.Color("#c026d3"), // Glowing Fuchsia
    accentC: new THREE.Color("#f43f5e"), // Sunset Crimson Rose
    accentD: new THREE.Color("#fbbf24"), // Radiant Sunset Gold
    accentE: new THREE.Color("#06b6d4"), // Hyper Cyan Iridescence
    accentPeak: new THREE.Color("#ffffff"), // Pure Radiant White
    glow: "rgba(245, 158, 11, 0.3)",
    badgeColor: "#fbbf24",
  },
  cyberpunk: {
    name: "Cyber Neon",
    accentA: new THREE.Color("#4f46e5"), // Luminous Deep Indigo
    accentB: new THREE.Color("#9333ea"), // Vivid Electric Purple
    accentC: new THREE.Color("#06b6d4"), // Hyper Cyan
    accentD: new THREE.Color("#ffffff"), // Pure Radiant White
    glow: "rgba(6, 182, 212, 0.35)",
    badgeColor: "#06b6d4",
  },
  aurora: {
    name: "Aurora Borealis",
    accentA: new THREE.Color("#3730a3"), // Luminous Indigo
    accentB: new THREE.Color("#6366f1"), // Radiant Indigo
    accentC: new THREE.Color("#2dd4bf"), // Luminous Teal / Turquoise
    accentD: new THREE.Color("#ffffff"), // Pure Crest
    glow: "rgba(45, 212, 191, 0.35)",
    badgeColor: "#2dd4bf",
  },
  hyperBlue: {
    name: "Hyper Blue",
    accentA: new THREE.Color("#1e40af"), // Luminous Royal Blue
    accentB: new THREE.Color("#2563eb"), // Bright Cobalt
    accentC: new THREE.Color("#38bdf8"), // Vivid Sky Blue
    accentD: new THREE.Color("#ffffff"), // Brilliant White
    glow: "rgba(56, 189, 248, 0.35)",
    badgeColor: "#38bdf8",
  },
  emerald: {
    name: "Quantum Emerald",
    accentA: new THREE.Color("#065f46"), // Rich Luminous Emerald
    accentB: new THREE.Color("#059669"), // Jade Green
    accentC: new THREE.Color("#34d399"), // Mint Aquamarine
    accentD: new THREE.Color("#f0fdf4"), // Crisp White
    glow: "rgba(52, 211, 153, 0.35)",
    badgeColor: "#34d399",
  },
};

// Generates a soft circular luminous particle sprite texture
function createParticleTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.25, "rgba(255, 255, 255, 0.9)");
  gradient.addColorStop(0.6, "rgba(255, 255, 255, 0.35)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function WaveScene({
  className = "absolute inset-0 w-full h-full",
  activeThemeKey = "sunset",
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const themeRef = useRef(WAVE_THEMES[activeThemeKey] || WAVE_THEMES.sunset);
  const [supported, setSupported] = useState(true);

  // Sync theme when activeThemeKey prop changes
  useEffect(() => {
    if (WAVE_THEMES[activeThemeKey]) {
      themeRef.current = WAVE_THEMES[activeThemeKey];
    }
  }, [activeThemeKey]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const reduceMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      setSupported(false);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);
    const camDist = 7.5;
    let camPolar = 1.05; // Balanced angle showing full wave depth
    let camAzimuth = 0.0;
    const camTarget = new THREE.Vector3(0.0, -0.15, -0.4);

    const updateCamera = () => {
      const x =
        camTarget.x + camDist * Math.sin(camPolar) * Math.sin(camAzimuth);
      const y = camTarget.y + camDist * Math.cos(camPolar);
      const z =
        camTarget.z + camDist * Math.sin(camPolar) * Math.cos(camAzimuth);
      camera.position.set(x, y, z);
      camera.lookAt(camTarget);
    };
    updateCamera();

    // Ultra-Dense Full Wave Grid that densely fills the entire viewport:
    // 180 columns x 96 rows = 17,280 glowing particles tightly packed (0.145 x 0.185 spacing)
    const COLS = 180;
    const ROWS = 96;
    const SPACING_X = 0.145;
    const SPACING_Z = 0.185;
    const count = COLS * ROWS;
    const positions = new Float32Array(count * 3);
    const colorsArr = new Float32Array(count * 3);
    const edgeFades = new Float32Array(count);
    const base = [];

    let idx = 0;
    for (let r = 0; r < ROWS; r++) {
      const v = r / (ROWS - 1);
      const edgeZ = Math.sin(v * Math.PI);
      for (let c = 0; c < COLS; c++) {
        const u = c / (COLS - 1);
        const edgeX = Math.sin(u * Math.PI);
        // Full opacity across 96% of the mesh, gentle feathering only on outer boundary
        const rawEdge = Math.min(edgeX, edgeZ);
        edgeFades[idx] = Math.min(1.0, Math.max(0, rawEdge * 8.0));

        const x = (c - (COLS - 1) / 2) * SPACING_X;
        const z = (r - (ROWS - 1) / 2) * SPACING_Z;
        base.push(x, z);
        positions[idx * 3 + 0] = x;
        positions[idx * 3 + 1] = 0;
        positions[idx * 3 + 2] = z;
        colorsArr[idx * 3 + 0] = 1;
        colorsArr[idx * 3 + 1] = 1;
        colorsArr[idx * 3 + 2] = 1;
        idx++;
      }
    }

    const waveGeo = new THREE.BufferGeometry();
    waveGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    waveGeo.setAttribute("color", new THREE.BufferAttribute(colorsArr, 3));

    // Circular glowing particle texture
    const particleTexture = createParticleTexture();

    const waveMat = new THREE.PointsMaterial({
      size: 0.076, // Fine, dense, silky point cloud
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.98,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const wavePoints = new THREE.Points(waveGeo, waveMat);
    const waveOffset = new THREE.Vector3(0.0, -0.65, -0.4);
    wavePoints.position.copy(waveOffset);
    scene.add(wavePoints);

    // Raycast plane for pointer ripples
    const raycastPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(90, 90),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
    );
    raycastPlane.rotation.x = -Math.PI / 2;
    raycastPlane.position.copy(waveOffset);
    scene.add(raycastPlane);

    // Dynamic ripples
    const ripples = [];
    const RIPPLE_LIFE = 2.6;

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h || 1;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // Pointer interaction handling
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    let dragging = false;
    let lastPX = 0;
    let lastPY = 0;
    let lastRippleAt = 0;

    const clock = new THREE.Clock();

    const setNdcFromEvent = (e) => {
      const rect = canvas.getBoundingClientRect();
      ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const addRipple = (worldPoint, amp) => {
      const lx = worldPoint.x - waveOffset.x;
      const lz = worldPoint.z - waveOffset.z;
      ripples.push({ x: lx, z: lz, t0: clock.getElapsedTime(), amp });
      if (ripples.length > 15) ripples.shift();
    };

    const rippleFromEvent = (e, amp) => {
      setNdcFromEvent(e);
      raycaster.setFromCamera(ndc, camera);
      const hit = raycaster.intersectObject(raycastPlane)[0];
      if (hit) addRipple(hit.point, amp);
    };

    const onPointerDown = (e) => {
      if (e.pointerType === "mouse") {
        dragging = true;
        lastPX = e.clientX;
        lastPY = e.clientY;
        canvas.style.cursor = "grabbing";
      }
      rippleFromEvent(e, reduceMotion ? 0.15 : 0.38);
    };

    const onPointerUp = () => {
      dragging = false;
      canvas.style.cursor = "grab";
    };

    const onPointerMove = (e) => {
      if (dragging) {
        const dx = e.clientX - lastPX;
        const dy = e.clientY - lastPY;
        lastPX = e.clientX;
        lastPY = e.clientY;
        camAzimuth -= dx * 0.0035;
        camPolar = Math.min(1.48, Math.max(0.65, camPolar - dy * 0.0028));
        return;
      }
      const now = performance.now();
      if (now - lastRippleAt > 65) {
        lastRippleAt = now;
        rippleFromEvent(e, reduceMotion ? 0.06 : 0.18);
      }
    };

    canvas.style.cursor = "grab";
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);

    const speed = reduceMotion ? 0.08 : 0.95;
    const waveAmp = reduceMotion ? 0.16 : 0.44;

    let rafId = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime() * speed;

      const posAttr = waveGeo.attributes.position;
      const colAttr = waveGeo.attributes.color;
      const posArr = posAttr.array;
      const colArr = colAttr.array;

      const theme = themeRef.current;
      const isFiveStop = Boolean(theme.accentE);
      const { accentA, accentB, accentC, accentD, accentE, accentPeak } = theme;

      for (let i = 0; i < count; i++) {
        const x = base[i * 2];
        const z = base[i * 2 + 1];

        // Complex organic multi-harmonic waves
        let y =
          Math.sin(x * 0.95 + t * 1.1) * waveAmp +
          Math.sin(z * 1.35 - t * 0.8) * waveAmp * 0.72 +
          Math.sin((x + z) * 0.5 + t * 0.45) * waveAmp * 0.46 +
          Math.cos((x - z) * 0.75 + t * 0.6) * waveAmp * 0.32;

        // Propagate outward pointer ripples
        for (let k = 0; k < ripples.length; k++) {
          const rp = ripples[k];
          const age = clock.getElapsedTime() - rp.t0;
          if (age < 0 || age > RIPPLE_LIFE) continue;
          const dx = x - rp.x;
          const dz = z - rp.z;
          const dist = Math.sqrt(dx * dx + dz * dz);
          const decay = Math.exp(-age * 1.45) * Math.max(0, 1 - dist / 3.6);
          y += Math.sin(dist * 5.0 - age * 6.5) * rp.amp * decay;
        }

        posArr[i * 3 + 1] = y;

        // Smooth Color Mapping with Zero-Allocation Float Math
        let h = (y + waveAmp * 1.6) / (waveAmp * 3.2);
        h = Math.max(0, Math.min(1, h));

        let r, g, b;
        if (isFiveStop) {
          // 5-Stop Rich Fusion Blend of Sunset + Cyber Neon
          if (h < 0.28) {
            const f = h / 0.28;
            r = accentA.r + (accentB.r - accentA.r) * f;
            g = accentA.g + (accentB.g - accentA.g) * f;
            b = accentA.b + (accentB.b - accentA.b) * f;
          } else if (h < 0.58) {
            const f = (h - 0.28) / 0.3;
            r = accentB.r + (accentC.r - accentB.r) * f;
            g = accentB.g + (accentC.g - accentB.g) * f;
            b = accentB.b + (accentC.b - accentB.b) * f;
          } else if (h < 0.84) {
            const f = (h - 0.58) / 0.26;
            const goldR = accentC.r + (accentD.r - accentC.r) * f;
            const goldG = accentC.g + (accentD.g - accentC.g) * f;
            const goldB = accentC.b + (accentD.b - accentC.b) * f;

            // Subtle spatial cyber-cyan shimmer on crest shoulders
            const cyanBlend =
              (Math.sin(x * 0.45 + z * 0.35 + t * 0.6) * 0.5 + 0.5) * 0.26;
            r = goldR * (1 - cyanBlend) + accentE.r * cyanBlend;
            g = goldG * (1 - cyanBlend) + accentE.g * cyanBlend;
            b = goldB * (1 - cyanBlend) + accentE.b * cyanBlend;
          } else {
            const f = (h - 0.84) / 0.16;
            r = accentD.r + (accentPeak.r - accentD.r) * f;
            g = accentD.g + (accentPeak.g - accentD.g) * f;
            b = accentD.b + (accentPeak.b - accentD.b) * f;
          }
        } else {
          if (h < 0.35) {
            const f = h / 0.35;
            r = accentA.r + (accentB.r - accentA.r) * f;
            g = accentA.g + (accentB.g - accentA.g) * f;
            b = accentA.b + (accentB.b - accentA.b) * f;
          } else if (h < 0.75) {
            const f = (h - 0.35) / 0.4;
            r = accentB.r + (accentC.r - accentB.r) * f;
            g = accentB.g + (accentC.g - accentB.g) * f;
            b = accentB.b + (accentC.b - accentB.b) * f;
          } else {
            const f = (h - 0.75) / 0.25;
            r = accentC.r + (accentD.r - accentC.r) * f;
            g = accentC.g + (accentD.g - accentC.g) * f;
            b = accentC.b + (accentD.b - accentC.b) * f;
          }
        }

        const fade = edgeFades[i];
        colArr[i * 3 + 0] = r * fade;
        colArr[i * 3 + 1] = g * fade;
        colArr[i * 3 + 2] = b * fade;
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      if (ripples.length && clock.getElapsedTime() - ripples[0].t0 > RIPPLE_LIFE) {
        ripples.shift();
      }

      updateCamera();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
      waveGeo.dispose();
      waveMat.dispose();
      particleTexture.dispose();
      raycastPlane.geometry.dispose();
      raycastPlane.material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {supported ? (
        <canvas ref={canvasRef} className="block h-full w-full" />
      ) : (
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 75% 15%, rgba(192,38,211,0.22), transparent 55%), radial-gradient(ellipse 80% 60% at 20% 90%, rgba(6,182,212,0.18), transparent 55%)",
          }}
        />
      )}
    </div>
  );
}

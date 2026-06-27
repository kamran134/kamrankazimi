'use client';

import { useEffect, useRef } from 'react';

// ─── constants ────────────────────────────────────────────────────────────────

const N = 2000;
const SCATTER_DELAY = 460;   // ms before particles reform into new shape
const SPRING_K = 0.048;      // how fast particles chase their target
const DAMPING = 0.87;        // velocity decay per frame
const BROWNIAN = 0.22;       // random jitter amplitude
const REPEL_R = 120;         // mouse repulsion radius px
const REPEL_F = 2.8;         // mouse repulsion force
const MAX_V = 16;            // max particle speed

// ─── types ────────────────────────────────────────────────────────────────────

interface Particle {
  x: number;
  y: number;
  tx: number;   // current target x
  ty: number;   // current target y
  vx: number;
  vy: number;
  color: string;
  size: number;
}

// ─── color gradient (top=amber → white → plum → bottom=lichen) ───────────────

function gradColor(t: number): string {
  if (t < 0.28) return '#ffb829';
  if (t < 0.50) return '#ffffff';
  if (t < 0.74) return '#8052ff';
  return '#15846e';
}

// ─── shape generators ─────────────────────────────────────────────────────────
// All return exactly N {x, y} points via acceptance-rejection sampling.

function brainPoints(count: number, cx: number, cy: number): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = [];
  const R = 175;      // circle radius
  const sep = 105;    // horizontal separation of centers
  const lCX = cx - sep * 0.5;
  const rCX = cx + sep * 0.5;
  const scaleY = 0.78; // squish vertically to look more brain-like

  while (pts.length < count) {
    const px = cx + (Math.random() - 0.5) * (R * 2 + sep) * 1.1;
    const py = cy + (Math.random() - 0.5) * R * 2.2;

    const py0 = (py - cy) / scaleY + cy;
    const inLeft = (px - lCX) ** 2 + (py0 - cy) ** 2 < R * R;
    const inRight = (px - rCX) ** 2 + (py0 - cy) ** 2 < R * R;

    // Longitudinal fissure — thin gap at top center only
    const inFissure = Math.abs(px - cx) < 11 && py < cy + R * 0.18;

    if ((inLeft || inRight) && !inFissure) {
      pts.push({ x: px, y: py });
    }
  }
  return pts;
}

function personPoints(count: number, cx: number, cy: number): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = [];
  const headR = 68;
  const headCY = cy - 160;
  // Neck
  const neckTop = headCY + headR;
  const neckBottom = cy - 100;
  const neckHW = 18;
  // Shoulders / upper torso
  const bodyTop = cy - 100;
  const bodyBottom = cy + 190;

  // Approximate fraction of area each region occupies
  const headArea = Math.PI * headR * headR;
  const neckArea = (neckBottom - neckTop) * neckHW * 2;
  const bodyArea = (bodyBottom - bodyTop) * 120; // rough
  const total = headArea + neckArea + bodyArea;

  const nHead = Math.floor(count * headArea / total);
  const nNeck = Math.floor(count * neckArea / total);
  const nBody = count - nHead - nNeck;

  // Head
  let tries = 0;
  while (pts.length < nHead && tries < nHead * 10) {
    tries++;
    const px = cx + (Math.random() - 0.5) * headR * 2.4;
    const py = headCY + (Math.random() - 0.5) * headR * 2.4;
    if ((px - cx) ** 2 + (py - headCY) ** 2 < headR * headR) {
      pts.push({ x: px, y: py });
    }
  }

  // Neck
  for (let i = 0; i < nNeck; i++) {
    pts.push({
      x: cx + (Math.random() - 0.5) * neckHW * 2,
      y: neckTop + Math.random() * (neckBottom - neckTop),
    });
  }

  // Body — trapezoid, wider at top
  tries = 0;
  const bodyPts: { x: number; y: number }[] = [];
  while (bodyPts.length < nBody && tries < nBody * 6) {
    tries++;
    const py = bodyTop + Math.random() * (bodyBottom - bodyTop);
    const t = (py - bodyTop) / (bodyBottom - bodyTop);
    const hw = 130 - t * 55; // 130→75 shoulder-to-hip taper
    const px = cx + (Math.random() - 0.5) * hw * 2;
    bodyPts.push({ x: px, y: py });
  }
  pts.push(...bodyPts);

  return pts;
}

function envelopePoints(count: number, cx: number, cy: number): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = [];
  const eW = 340;
  const eH = 220;
  const left = cx - eW / 2;
  const right = cx + eW / 2;
  const top = cy - eH / 2;
  const bottom = cy + eH / 2;

  // V-fold apex (center of top edge, slightly below)
  const apexY = cy - eH * 0.08;

  // Split: fill 60%, edges 20%, V-fold 20%
  const nFill = Math.floor(count * 0.60);
  const nEdge = Math.floor(count * 0.20);
  const nFold = count - nFill - nEdge;

  // Fill
  for (let i = 0; i < nFill; i++) {
    pts.push({
      x: left + Math.random() * eW,
      y: top + Math.random() * eH,
    });
  }

  // Edges (perimeter)
  for (let i = 0; i < nEdge; i++) {
    const edge = Math.floor(Math.random() * 4);
    switch (edge) {
      case 0: pts.push({ x: left + Math.random() * eW, y: top + (Math.random() - 0.5) * 5 }); break;
      case 1: pts.push({ x: left + Math.random() * eW, y: bottom + (Math.random() - 0.5) * 5 }); break;
      case 2: pts.push({ x: left + (Math.random() - 0.5) * 5, y: top + Math.random() * eH }); break;
      case 3: pts.push({ x: right + (Math.random() - 0.5) * 5, y: top + Math.random() * eH }); break;
    }
  }

  // V-fold (envelope flap) — two diagonals from top corners to apex
  for (let i = 0; i < nFold; i++) {
    const t = Math.random();
    const arm = Math.random() < 0.5;
    const px = arm ? left + t * (cx - left) : cx + t * (right - cx);
    const py = arm ? top + t * (apexY - top) : apexY - t * (apexY - top);
    pts.push({
      x: px + (Math.random() - 0.5) * 6,
      y: py + (Math.random() - 0.5) * 6,
    });
  }

  return pts;
}

function scatteredPoints(count: number, w: number, h: number): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < count; i++) {
    // Avoid clustering by using quasi-random grid + jitter
    const cols = Math.ceil(Math.sqrt(count * (w / h)));
    const rows = Math.ceil(count / cols);
    const col = i % cols;
    const row = Math.floor(i / cols);
    pts.push({
      x: (col / cols) * w + (Math.random() - 0.5) * (w / cols) * 1.4,
      y: (row / rows) * h + (Math.random() - 0.5) * (h / rows) * 1.4,
    });
  }
  return pts;
}

// ─── target positions per slide ───────────────────────────────────────────────

function getTargets(slide: number, w: number, h: number): { x: number; y: number }[] {
  // Slides 0,1,5 form shapes; 2,3,4 are scattered ambient
  if (slide === 0) {
    // Brain — right side
    const main = brainPoints(Math.floor(N * 0.88), w * 0.72, h * 0.52);
    const ambient = scatteredPoints(N - main.length, w, h);
    return [...main, ...ambient];
  }
  if (slide === 1) {
    // Person — left side
    const main = personPoints(Math.floor(N * 0.88), w * 0.28, h * 0.53);
    const ambient = scatteredPoints(N - main.length, w, h);
    return [...main, ...ambient];
  }
  if (slide === 5) {
    // Envelope — right side
    const main = envelopePoints(Math.floor(N * 0.88), w * 0.72, h * 0.52);
    const ambient = scatteredPoints(N - main.length, w, h);
    return [...main, ...ambient];
  }
  // Scattered
  return scatteredPoints(N, w, h);
}

// ─── component ────────────────────────────────────────────────────────────────

interface Props {
  slideIndex: number;
}

export default function ParticleCanvas({ slideIndex }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    w: 0,
    h: 0,
    particles: [] as Particle[],
    mouseX: -9999,
    mouseY: -9999,
    scatterTimer: null as ReturnType<typeof setTimeout> | null,
  });
  // Exposed so the slideIndex effect can call the transition at any time
  const transitionRef = useRef<((slide: number, immediate?: boolean) => void) | null>(null);

  // ── canvas init + animation loop ──────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const s = stateRef.current;

    const resize = () => {
      s.w = canvas.width = window.innerWidth;
      s.h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      s.mouseX = e.clientX - rect.left;
      s.mouseY = e.clientY - rect.top;
    };
    const onMouseLeave = () => { s.mouseX = -9999; s.mouseY = -9999; };
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    // Initialise particles at random positions
    s.particles = [];
    for (let i = 0; i < N; i++) {
      const x = Math.random() * s.w;
      const y = Math.random() * s.h;
      s.particles.push({ x, y, tx: x, ty: y, vx: 0, vy: 0, color: gradColor(y / s.h), size: Math.random() * 2.2 + 0.8 });
    }

    // ── animation loop ──
    let raf: number;
    const tick = () => {
      const { w, h, particles, mouseX, mouseY } = s;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        // Spring toward target
        p.vx += (p.tx - p.x) * SPRING_K;
        p.vy += (p.ty - p.y) * SPRING_K;

        // Brownian noise
        p.vx += (Math.random() - 0.5) * BROWNIAN;
        p.vy += (Math.random() - 0.5) * BROWNIAN;

        // Mouse repulsion
        const mdx = p.x - mouseX;
        const mdy = p.y - mouseY;
        const md2 = mdx * mdx + mdy * mdy;
        if (md2 < REPEL_R * REPEL_R && md2 > 0) {
          const md = Math.sqrt(md2);
          const f = (1 - md / REPEL_R) * REPEL_F;
          p.vx += (mdx / md) * f;
          p.vy += (mdy / md) * f;
        }

        // Damping
        p.vx *= DAMPING;
        p.vy *= DAMPING;

        // Speed cap
        const spd2 = p.vx * p.vx + p.vy * p.vy;
        if (spd2 > MAX_V * MAX_V) {
          const inv = MAX_V / Math.sqrt(spd2);
          p.vx *= inv;
          p.vy *= inv;
        }

        p.x += p.vx;
        p.y += p.vy;

        ctx.globalAlpha = 0.78;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    tick();

    // ── transition function ──
    transitionRef.current = (slide: number, immediate = false) => {
      if (s.scatterTimer) clearTimeout(s.scatterTimer);

      if (immediate) {
        // No scatter phase — set targets directly
        const targets = getTargets(slide, s.w, s.h);
        s.particles.forEach((p, i) => {
          p.tx = targets[i].x;
          p.ty = targets[i].y;
          p.color = gradColor(targets[i].y / s.h);
        });
        return;
      }

      // Phase 1: scatter to random positions
      const scatterPts = scatteredPoints(N, s.w, s.h);
      s.particles.forEach((p, i) => {
        p.tx = scatterPts[i].x;
        p.ty = scatterPts[i].y;
        // Give each particle a scatter kick proportional to distance from target
        p.vx += (Math.random() - 0.5) * 3;
        p.vy += (Math.random() - 0.5) * 3;
      });

      // Phase 2: reform into new shape
      s.scatterTimer = setTimeout(() => {
        const targets = getTargets(slide, s.w, s.h);
        s.particles.forEach((p, i) => {
          p.tx = targets[i].x;
          p.ty = targets[i].y;
          p.color = gradColor(targets[i].y / s.h);
        });
      }, SCATTER_DELAY);
    };

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (s.scatterTimer) clearTimeout(s.scatterTimer);
    };
  }, []);

  // ── respond to slide changes ───────────────────────────────────────────────
  useEffect(() => {
    if (transitionRef.current) {
      transitionRef.current(slideIndex);
    }
  }, [slideIndex]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}

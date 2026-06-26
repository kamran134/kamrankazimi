'use client';

import { useEffect, useRef } from 'react';

type ShapeType = 'circle' | 'triangle' | 'diamond' | 'square';

interface Particle {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  size: number;
  shape: ShapeType;
  color: string;
  vx: number;
  vy: number;
  alpha: number;
}

const PALETTE = [
  '#8052ff', '#8052ff', '#8052ff',
  '#ffb829',
  '#15846e',
  '#ffffff', '#ffffff',
];

const SHAPES: ShapeType[] = ['circle', 'circle', 'triangle', 'diamond', 'square'];

const REPEL_RADIUS = 130;
const REPEL_STRENGTH = 1.2;
const HOME_SPRING = 0.0003;
const DRIFT = 0.025;
const DAMPING = 0.97;
const MAX_SPEED = 5;

function drawShape(ctx: CanvasRenderingContext2D, shape: ShapeType, s: number) {
  switch (shape) {
    case 'circle':
      ctx.beginPath();
      ctx.arc(0, 0, s * 0.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 'triangle':
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.58);
      ctx.lineTo(s * 0.5, s * 0.42);
      ctx.lineTo(-s * 0.5, s * 0.42);
      ctx.closePath();
      ctx.fill();
      break;
    case 'diamond':
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.6);
      ctx.lineTo(s * 0.4, 0);
      ctx.lineTo(0, s * 0.6);
      ctx.lineTo(-s * 0.4, 0);
      ctx.closePath();
      ctx.fill();
      break;
    case 'square':
      ctx.fillRect(-s * 0.4, -s * 0.4, s * 0.8, s * 0.8);
      break;
  }
}

export default function ParticleConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let particles: Particle[] = [];
    let mouseX = -9999;
    let mouseY = -9999;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth || window.innerWidth;
      h = canvas.height = canvas.offsetHeight || window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouseX = x;
        mouseY = y;
      } else {
        mouseX = -9999;
        mouseY = -9999;
      }
    };
    window.addEventListener('mousemove', onMouseMove);

    const initParticles = () => {
      particles = [];
      const N = 800;
      for (let i = 0; i < N; i++) {
        let homeX: number;
        let homeY: number;

        if (Math.random() < 0.75) {
          const angle = Math.random() * Math.PI * 2;
          const r = Math.pow(Math.random(), 0.55) * Math.min(w, h) * 0.42;
          homeX = w * 0.65 + Math.cos(angle) * r;
          homeY = h * 0.5 + Math.sin(angle) * r;
        } else {
          homeX = Math.random() * w;
          homeY = Math.random() * h;
        }

        particles.push({
          x: homeX + (Math.random() - 0.5) * 20,
          y: homeY + (Math.random() - 0.5) * 20,
          homeX,
          homeY,
          size: Math.random() * 3.5 + 1.5,
          shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
          color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          alpha: Math.random() * 0.55 + 0.12,
        });
      }
    };
    initParticles();

    let raf: number;

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        // Brownian motion — keeps particles drifting at all times
        p.vx += (Math.random() - 0.5) * DRIFT;
        p.vy += (Math.random() - 0.5) * DRIFT;

        // Spring pull toward home — particles always orbit home loosely
        p.vx += (p.homeX - p.x) * HOME_SPRING;
        p.vy += (p.homeY - p.y) * HOME_SPRING;

        // Mouse repulsion
        const mDx = p.x - mouseX;
        const mDy = p.y - mouseY;
        const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
        if (mDist < REPEL_RADIUS && mDist > 0) {
          const force = (1 - mDist / REPEL_RADIUS) * REPEL_STRENGTH;
          p.vx += (mDx / mDist) * force;
          p.vy += (mDy / mDist) * force;
        }

        // Damping
        p.vx *= DAMPING;
        p.vy *= DAMPING;

        // Speed cap
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED;
          p.vy = (p.vy / speed) * MAX_SPEED;
        }

        p.x += p.vx;
        p.y += p.vy;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        drawShape(ctx, p.shape, p.size);
        ctx.restore();
      }

      raf = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}

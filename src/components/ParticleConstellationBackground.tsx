'use client';

import { useEffect, useRef } from 'react';

type ShapeType = 'circle' | 'triangle' | 'diamond' | 'square';

interface Particle {
  x: number;
  y: number;
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

    const resize = () => {
      w = canvas.width = canvas.offsetWidth || window.innerWidth;
      h = canvas.height = canvas.offsetHeight || window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const initParticles = () => {
      particles = [];
      const N = 800;
      for (let i = 0; i < N; i++) {
        let x: number;
        let y: number;

        if (Math.random() < 0.75) {
          const angle = Math.random() * Math.PI * 2;
          const r = Math.pow(Math.random(), 0.55) * Math.min(w, h) * 0.42;
          x = w * 0.65 + Math.cos(angle) * r;
          y = h * 0.5 + Math.sin(angle) * r;
        } else {
          x = Math.random() * w;
          y = Math.random() * h;
        }

        particles.push({
          x,
          y,
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
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = w + 10;
        else if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        else if (p.y > h + 10) p.y = -10;

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
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}

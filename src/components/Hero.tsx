import { useEffect, useRef, useState } from 'react';
import { useCountUp } from '../hooks/useCountUp';
import './Hero.css';

function AnimatedStat({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) {
  const count = useCountUp(value, 2000, true);
  return (
    <div className="hero__stat">
      <span className="hero__stat-number">{count}{suffix}</span>
      <span className="hero__stat-label">{label}</span>
    </div>
  );
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Particle constellation background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const init = () => {
      resize();
      const count = Math.min(80, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 12000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(129, 140, 248, ${p.opacity})`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener('resize', init);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', init);
    };
  }, []);

  // Mouse parallax for glow orbs
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handler = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      });
    };

    hero.addEventListener('mousemove', handler, { passive: true });
    return () => hero.removeEventListener('mousemove', handler);
  }, []);

  return (
    <section className="hero" id="hero" ref={heroRef}>
      {/* Particle canvas */}
      <canvas className="hero__particles" ref={canvasRef} />

      {/* Background grid */}
      <div className="hero__grid" />
      <div
        className="hero__glow hero__glow--1"
        style={{ transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)` }}
      />
      <div
        className="hero__glow hero__glow--2"
        style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` }}
      />
      <div
        className="hero__glow hero__glow--3"
        style={{ transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)` }}
      />

      <div className="hero__content container">
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          Production-Grade Microservices
        </div>

        <h1 className="hero__title">
          Enterprise Resource Planning<br />
          <span className="hero__title-gradient">Built for Scale</span>
        </h1>

        <p className="hero__subtitle">
          A complete ERP system with Inventory, Orders, Finance & HR — powered by
          Go, Java, gRPC, PostgreSQL, and Redis. Four independent microservices
          orchestrated through a unified API gateway.
        </p>

        <div className="hero__actions">
          <a href="#modules" className="hero__btn hero__btn--primary">
            <span>Explore Modules</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
          <a href="https://github.com/solokid2k3/nexus-erp" target="_blank" rel="noopener" className="hero__btn hero__btn--secondary">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
            <span>View on GitHub</span>
          </a>
        </div>

        {/* Floating tech badges */}
        <div className="hero__floating-badges">
          <span className="hero__float-badge hero__float-badge--1">Go</span>
          <span className="hero__float-badge hero__float-badge--2">Java</span>
          <span className="hero__float-badge hero__float-badge--3">gRPC</span>
          <span className="hero__float-badge hero__float-badge--4">PostgreSQL</span>
          <span className="hero__float-badge hero__float-badge--5">Redis</span>
          <span className="hero__float-badge hero__float-badge--6">Docker</span>
        </div>

        <div className="hero__stats">
          <AnimatedStat value={4} label="Microservices" />
          <div className="hero__stat-divider" />
          <AnimatedStat value={60} label="API Endpoints" suffix="+" />
          <div className="hero__stat-divider" />
          <AnimatedStat value={2} label="Languages" />
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number hero__stat-number--text">gRPC</span>
            <span className="hero__stat-label">Protocol</span>
          </div>
        </div>
      </div>
    </section>
  );
}

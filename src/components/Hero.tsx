import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      {/* Background grid */}
      <div className="hero__grid" />
      <div className="hero__glow hero__glow--1" />
      <div className="hero__glow hero__glow--2" />

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
            Explore Modules
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
          <a href="#architecture" className="hero__btn hero__btn--secondary">
            View Architecture
          </a>
        </div>

        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-number">4</span>
            <span className="hero__stat-label">Microservices</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">60+</span>
            <span className="hero__stat-label">API Endpoints</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">2</span>
            <span className="hero__stat-label">Languages</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">gRPC</span>
            <span className="hero__stat-label">Protocol</span>
          </div>
        </div>
      </div>
    </section>
  );
}

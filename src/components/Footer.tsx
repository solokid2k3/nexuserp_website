import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="url(#fGrad)" />
                <path d="M10 22V10l6 8 6-8v12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <defs><linearGradient id="fGrad" x1="0" y1="0" x2="32" y2="32"><stop stopColor="#6366f1"/><stop offset="1" stopColor="#8b5cf6"/></linearGradient></defs>
              </svg>
              <span>Nexus <span style={{ color: '#818cf8' }}>ERP</span></span>
            </div>
            <p className="footer__tagline">Enterprise Resource Planning built with microservices architecture.</p>
          </div>

          <div className="footer__cols">
            <div className="footer__col">
              <h4>Modules</h4>
              <a href="#modules">Inventory</a>
              <a href="#modules">Orders</a>
              <a href="#modules">Finance</a>
              <a href="#modules">HR</a>
            </div>
            <div className="footer__col">
              <h4>Technical</h4>
              <a href="#architecture">Architecture</a>
              <a href="#tech-stack">Tech Stack</a>
              <a href="#api">API Docs</a>
              <a href="#showcase">Showcase</a>
            </div>
            <div className="footer__col">
              <h4>Stack</h4>
              <a href="#tech-stack">Go 1.22</a>
              <a href="#tech-stack">Java 21</a>
              <a href="#tech-stack">PostgreSQL 16</a>
              <a href="#tech-stack">Redis 7</a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2026 Nexus ERP. All rights reserved.</span>
          <span className="footer__built">Built with Go · Java · gRPC · PostgreSQL · Redis</span>
        </div>
      </div>
    </footer>
  );
}

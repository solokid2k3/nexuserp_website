import { useInView } from '../hooks/useInView';
import './Architecture.css';

export default function Architecture() {
  const { ref, isVisible } = useInView();

  return (
    <section className="arch" id="architecture" ref={ref}>
      <div className="container">
        <div className={`arch__header ${isVisible ? 'visible' : ''}`}>
          <span className="section-label">System Design</span>
          <h2 className="section-title">Microservices Architecture</h2>
          <p className="section-desc">
            Four independent services communicate via gRPC behind a unified REST API Gateway.
            Each service owns its database schema and caches through Redis.
          </p>
        </div>

        <div className={`arch__diagram ${isVisible ? 'visible' : ''}`}>
          {/* Gateway */}
          <div className="arch__node arch__node--gateway">
            <div className="arch__node-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            </div>
            <div className="arch__node-info">
              <span className="arch__node-name">API Gateway</span>
              <span className="arch__node-tech">Go / Gin · Port 8080</span>
              <span className="arch__node-desc">REST → gRPC · JWT Auth · Rate Limiting · CORS</span>
            </div>
          </div>

          {/* Connection Lines */}
          <div className="arch__connectors">
            <div className="arch__line" /><div className="arch__line" /><div className="arch__line" /><div className="arch__line" />
          </div>

          {/* Services Grid */}
          <div className="arch__services">
            {[
              { name: 'Inventory', tech: 'Go · :50051', color: '#10b981', icon: '📦', desc: 'Products, warehouses, stock management' },
              { name: 'Orders', tech: 'Go · :50052', color: '#3b82f6', icon: '🛒', desc: 'Customers, sales/purchase orders' },
              { name: 'Finance', tech: 'Java/Spring · :50053', color: '#f59e0b', icon: '💰', desc: 'Double-entry bookkeeping, reports' },
              { name: 'HR', tech: 'Java/Spring · :50054', color: '#ec4899', icon: '👥', desc: 'Employees, payroll, attendance' },
            ].map((s, i) => (
              <div key={s.name} className="arch__service" style={{ '--accent': s.color, animationDelay: `${i * 0.1}s` } as React.CSSProperties}>
                <span className="arch__service-icon">{s.icon}</span>
                <span className="arch__service-name">{s.name}</span>
                <span className="arch__service-tech">{s.tech}</span>
                <span className="arch__service-desc">{s.desc}</span>
                <div className="arch__service-bar" />
              </div>
            ))}
          </div>

          {/* Data Layer */}
          <div className="arch__connectors arch__connectors--down">
            <div className="arch__line arch__line--data" />
          </div>

          <div className="arch__data-layer">
            <div className="arch__data-node">
              <span className="arch__data-icon">🐘</span>
              <span className="arch__data-name">PostgreSQL 16</span>
              <span className="arch__data-detail">4 schemas: inventory · orders · finance · hr</span>
            </div>
            <div className="arch__data-node">
              <span className="arch__data-icon">⚡</span>
              <span className="arch__data-name">Redis 7</span>
              <span className="arch__data-detail">Cache · Sessions · Rate Limiting</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

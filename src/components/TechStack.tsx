import { useInView } from '../hooks/useInView';
import './TechStack.css';

const techs = [
  { name: 'Go 1.22', category: 'Backend', icon: '🔹', desc: 'Gateway, Inventory & Order services', color: '#00ADD8' },
  { name: 'Java 21', category: 'Backend', icon: '☕', desc: 'Finance & HR services via Spring Boot 3.3', color: '#E76F00' },
  { name: 'gRPC', category: 'Protocol', icon: '⚡', desc: 'High-performance inter-service communication', color: '#244C5A' },
  { name: 'PostgreSQL 16', category: 'Database', icon: '🐘', desc: 'Primary store with 4 isolated schemas', color: '#336791' },
  { name: 'Redis 7', category: 'Cache', icon: '🔴', desc: 'Caching, sessions, and rate limiting', color: '#DC382D' },
  { name: 'Docker', category: 'DevOps', icon: '🐳', desc: 'Full containerization with Docker Compose', color: '#2496ED' },
  { name: 'Gin Framework', category: 'HTTP', icon: '🌐', desc: 'High-performance HTTP router for the Gateway', color: '#00ADD8' },
  { name: 'Spring Data JPA', category: 'ORM', icon: '🗄️', desc: 'Object-relational mapping for Java services', color: '#6DB33F' },
  { name: 'Protocol Buffers', category: 'Schema', icon: '📋', desc: 'Strongly-typed API contracts via .proto files', color: '#4285F4' },
  { name: 'JWT Auth', category: 'Security', icon: '🔐', desc: 'Token-based authentication with role-based access', color: '#6366f1' },
  { name: 'pgx Driver', category: 'Driver', icon: '🔌', desc: 'High-performance PostgreSQL driver for Go', color: '#336791' },
  { name: 'React + TypeScript', category: 'Frontend', icon: '⚛️', desc: 'Web client with type-safe component architecture', color: '#61DAFB' },
];

export default function TechStack() {
  const { ref, isVisible } = useInView();

  return (
    <section className="tech" id="tech-stack" ref={ref}>
      <div className="container">
        <div className={`tech__header ${isVisible ? 'visible' : ''}`}>
          <span className="section-label">Technology</span>
          <h2 className="section-title">Engineering Stack</h2>
          <p className="section-desc">Built with battle-tested technologies chosen for performance, reliability, and developer experience.</p>
        </div>

        <div className="tech__grid stagger-children">
          {techs.map((t, i) => (
            <div key={t.name} className={`tech__card animate-on-scroll ${isVisible ? 'visible' : ''}`} style={{ '--card-color': t.color, transitionDelay: `${i * 60}ms` } as React.CSSProperties}>
              <div className="tech__card-top">
                <span className="tech__card-icon">{t.icon}</span>
                <span className="tech__card-cat">{t.category}</span>
              </div>
              <h3 className="tech__card-name">{t.name}</h3>
              <p className="tech__card-desc">{t.desc}</p>
              <div className="tech__card-accent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

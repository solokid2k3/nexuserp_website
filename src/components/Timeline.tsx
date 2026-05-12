import { useInView } from '../hooks/useInView';
import './Timeline.css';

const milestones = [
  {
    phase: 'Phase 1',
    title: 'System Architecture',
    desc: 'Designed microservices topology, defined Protobuf contracts, and established gRPC communication patterns between services.',
    tech: ['Protobuf', 'gRPC', 'System Design'],
    icon: '📐',
  },
  {
    phase: 'Phase 2',
    title: 'Core Backend Services',
    desc: 'Built Inventory & Order services in Go with domain-driven design, transactional integrity, and stock management workflows.',
    tech: ['Go', 'Gin', 'pgx'],
    icon: '⚙️',
  },
  {
    phase: 'Phase 3',
    title: 'Enterprise Services',
    desc: 'Developed Finance (double-entry bookkeeping) and HR (payroll, attendance) services using Java/Spring Boot with JPA.',
    tech: ['Java 21', 'Spring Boot', 'JPA'],
    icon: '🏢',
  },
  {
    phase: 'Phase 4',
    title: 'Database & Caching Layer',
    desc: 'Configured PostgreSQL with 4 isolated schemas, Redis caching strategies, and optimized query patterns with indexing.',
    tech: ['PostgreSQL 16', 'Redis 7', 'SQL'],
    icon: '🗄️',
  },
  {
    phase: 'Phase 5',
    title: 'API Gateway & Security',
    desc: 'Unified REST gateway translating HTTP to gRPC, with JWT authentication, rate limiting, CORS, and middleware chains.',
    tech: ['REST', 'JWT', 'Middleware'],
    icon: '🔐',
  },
  {
    phase: 'Phase 6',
    title: 'Web Client & Deployment',
    desc: 'React/TypeScript web client with Ant Design, full Docker Compose orchestration, and containerized deployment pipeline.',
    tech: ['React', 'TypeScript', 'Docker'],
    icon: '🚀',
  },
];

export default function Timeline() {
  const { ref, isVisible } = useInView(0.1);

  return (
    <section className="timeline" id="timeline" ref={ref}>
      <div className="container">
        <div className={`timeline__header ${isVisible ? 'visible' : ''}`}>
          <span className="section-label">Development Journey</span>
          <h2 className="section-title">Project Timeline</h2>
          <p className="section-desc">
            From architecture design to production deployment — the engineering milestones behind Nexus ERP.
          </p>
        </div>

        <div className={`timeline__track ${isVisible ? 'visible' : ''}`}>
          <div className="timeline__line" />
          {milestones.map((m, i) => (
            <div
              key={m.phase}
              className={`timeline__item ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="timeline__dot">
                <span className="timeline__dot-icon">{m.icon}</span>
              </div>
              <div className="timeline__content">
                <span className="timeline__phase">{m.phase}</span>
                <h3 className="timeline__title">{m.title}</h3>
                <p className="timeline__desc">{m.desc}</p>
                <div className="timeline__tags">
                  {m.tech.map(t => (
                    <span key={t} className="timeline__tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

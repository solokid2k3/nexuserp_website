import { useInView } from '../hooks/useInView';
import './ApiSection.css';

const endpoints = [
  { method: 'POST', path: '/api/v1/auth/login', desc: 'Authenticate and receive JWT tokens' },
  { method: 'GET', path: '/api/v1/inventory/products', desc: 'List products with pagination and filters' },
  { method: 'POST', path: '/api/v1/inventory/stock/adjust', desc: 'Atomic stock quantity adjustment' },
  { method: 'POST', path: '/api/v1/order/sales-orders', desc: 'Create sales order with credit check' },
  { method: 'GET', path: '/api/v1/finance/reports/profit-loss', desc: 'Generate P&L financial report' },
  { method: 'POST', path: '/api/v1/finance/journal-entries', desc: 'Create double-entry journal posting' },
  { method: 'POST', path: '/api/v1/hr/attendance/clock-in', desc: 'Employee attendance clock-in' },
  { method: 'POST', path: '/api/v1/hr/payroll/{runId}/calculate', desc: 'Calculate payroll with tax deductions' },
];

const methodColors: Record<string, string> = {
  GET: '#10b981',
  POST: '#3b82f6',
  PUT: '#f59e0b',
  DELETE: '#ef4444',
};

export default function ApiSection() {
  const { ref, isVisible } = useInView();

  return (
    <section className="api" id="api" ref={ref}>
      <div className="container">
        <div className="api__layout">
          <div className={`api__left ${isVisible ? 'visible' : ''}`}>
            <span className="section-label">REST API</span>
            <h2 className="section-title">Unified Gateway</h2>
            <p className="section-desc">
              All microservices are accessible through a single REST API Gateway that translates HTTP requests to gRPC calls.
              JWT authentication, rate limiting, and CORS are handled at the gateway level.
            </p>

            <div className="api__code-block">
              <div className="api__code-header">
                <span className="api__code-lang">bash</span>
                <span className="api__code-title">Quick Start</span>
              </div>
              <pre className="api__code"><code>{`# Start all services
docker-compose up -d

# Login
curl -X POST localhost:8080/api/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"username":"admin","password":"admin123"}'

# Use token for requests
curl localhost:8080/api/v1/inventory/products \\
  -H "Authorization: Bearer \$TOKEN"`}</code></pre>
            </div>
          </div>

          <div className={`api__right ${isVisible ? 'visible' : ''}`}>
            <div className="api__endpoints">
              <h3 className="api__endpoints-title">Key Endpoints</h3>
              {endpoints.map((ep, i) => (
                <div className="api__endpoint" key={i} style={{ animationDelay: `${i * 0.05}s` }}>
                  <span className="api__method" style={{ color: methodColors[ep.method] }}>{ep.method}</span>
                  <code className="api__path">{ep.path}</code>
                  <span className="api__endpoint-desc">{ep.desc}</span>
                </div>
              ))}
              <div className="api__endpoints-footer">
                <span>60+ endpoints across 4 services</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

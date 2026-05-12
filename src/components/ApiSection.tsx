import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import './ApiSection.css';

const endpoints = [
  { method: 'POST', path: '/api/v1/auth/login', desc: 'Authenticate and receive JWT tokens', detail: '{ "username": "admin", "password": "..." }' },
  { method: 'GET', path: '/api/v1/inventory/products', desc: 'List products with pagination and filters', detail: '?page=1&limit=20&category=electronics' },
  { method: 'POST', path: '/api/v1/inventory/stock/adjust', desc: 'Atomic stock quantity adjustment', detail: '{ "product_id": 1, "warehouse_id": 1, "quantity": 50 }' },
  { method: 'POST', path: '/api/v1/order/sales-orders', desc: 'Create sales order with credit check', detail: '{ "customer_id": 1, "items": [...], "notes": "..." }' },
  { method: 'GET', path: '/api/v1/finance/reports/profit-loss', desc: 'Generate P&L financial report', detail: '?start_date=2024-01-01&end_date=2024-12-31' },
  { method: 'POST', path: '/api/v1/finance/journal-entries', desc: 'Create double-entry journal posting', detail: '{ "entries": [{ "account": "1000", "debit": 500 }, ...] }' },
  { method: 'POST', path: '/api/v1/hr/attendance/clock-in', desc: 'Employee attendance clock-in', detail: '{ "employee_id": 1 }' },
  { method: 'POST', path: '/api/v1/hr/payroll/{runId}/calculate', desc: 'Calculate payroll with tax deductions', detail: 'Calculates gross, tax, SSN, Medicare, net pay' },
];

const methodColors: Record<string, string> = {
  GET: '#10b981',
  POST: '#3b82f6',
  PUT: '#f59e0b',
  DELETE: '#ef4444',
};

const codeSnippet = `# Start all services
docker-compose up -d

# Login
curl -X POST localhost:8080/api/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"username":"admin","password":"admin123"}'

# Use token for requests
curl localhost:8080/api/v1/inventory/products \\
  -H "Authorization: Bearer $TOKEN"`;

export default function ApiSection() {
  const { ref, isVisible } = useInView();
  const [copied, setCopied] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

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
                <div className="api__code-actions">
                  <span className="api__code-title">Quick Start</span>
                  <button className={`api__copy-btn ${copied ? 'api__copy-btn--copied' : ''}`} onClick={handleCopy}>
                    {copied ? (
                      <><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round"><path d="M3 8.5l3 3 7-7"/></svg> Copied!</>
                    ) : (
                      <><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="5" y="5" width="8" height="8" rx="1.5"/><path d="M3 11V3a1.5 1.5 0 011.5-1.5H11"/></svg> Copy</>
                    )}
                  </button>
                </div>
              </div>
              <pre className="api__code"><code>{renderHighlightedCode(codeSnippet)}</code></pre>
            </div>
          </div>

          <div className={`api__right ${isVisible ? 'visible' : ''}`}>
            <div className="api__endpoints">
              <h3 className="api__endpoints-title">Key Endpoints</h3>
              {endpoints.map((ep, i) => (
                <div
                  className={`api__endpoint ${expandedIndex === i ? 'api__endpoint--expanded' : ''}`}
                  key={i}
                  onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <span className="api__method" style={{ color: methodColors[ep.method], background: `${methodColors[ep.method]}15` }}>{ep.method}</span>
                  <code className="api__path">{ep.path}</code>
                  <span className="api__endpoint-desc">{ep.desc}</span>
                  {expandedIndex === i && (
                    <div className="api__endpoint-detail">
                      <code>{ep.detail}</code>
                    </div>
                  )}
                  <svg className="api__endpoint-chevron" width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6l4 4 4-4"/></svg>
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

function renderHighlightedCode(code: string) {
  return code.split('\n').map((line, i) => {
    if (line.startsWith('#')) {
      return <span key={i} className="code--comment">{line}{'\n'}</span>;
    }
    const highlighted = line
      .replace(/(curl|docker-compose)/g, '<cmd>$1</cmd>')
      .replace(/(-X\s+)(POST|GET|PUT|DELETE)/g, '$1<method>$2</method>')
      .replace(/(-H|-d)/g, '<flag>$1</flag>')
      .replace(/"([^"]*)"/g, '<str>"$1"</str>')
      .replace(/(localhost:\d+)/g, '<url>$1</url>');

    return <span key={i} dangerouslySetInnerHTML={{ __html: highlighted + '\n' }} />;
  });
}

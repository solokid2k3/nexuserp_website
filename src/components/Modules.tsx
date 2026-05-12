import { useState, useRef, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import './Modules.css';

const modules = [
  {
    id: 'inventory',
    name: 'Inventory',
    icon: '📦',
    color: '#10b981',
    tech: 'Go · gRPC · PostgreSQL · Redis',
    proto: `service InventoryService {
  rpc ListProducts (ListProductsReq) returns (ListProductsResp);
  rpc AdjustStock (AdjustStockReq) returns (StockResp);
  rpc TransferStock (TransferReq) returns (TransferResp);
}`,
    features: [
      { title: 'Product Management', desc: 'CRUD with categories, attributes, and dynamic pricing' },
      { title: 'Stock Control', desc: 'Atomic adjustments with PostgreSQL row-level locking' },
      { title: 'Warehouse Transfers', desc: 'Transactional inter-warehouse stock transfers' },
      { title: 'Stock Reservations', desc: 'Reserve stock for orders with auto-release capability' },
      { title: 'Low Stock Alerts', desc: 'WARNING/CRITICAL alerts based on reorder points' },
      { title: 'Movement Audit Trail', desc: 'Full history of all stock changes with timestamps' },
    ],
  },
  {
    id: 'orders',
    name: 'Orders',
    icon: '🛒',
    color: '#3b82f6',
    tech: 'Go · gRPC · PostgreSQL · Redis',
    proto: `service OrderService {
  rpc CreateSalesOrder (CreateSOReq) returns (SalesOrderResp);
  rpc GetCustomer (CustomerReq) returns (CustomerResp);
  rpc ListOrders (ListOrdersReq) returns (ListOrdersResp);
}`,
    features: [
      { title: 'Customer Tiers', desc: 'BRONZE → SILVER → GOLD → PLATINUM with credit limits' },
      { title: 'Sales Order Lifecycle', desc: 'DRAFT → APPROVED → PROCESSING → SHIPPED → DELIVERED' },
      { title: 'Credit Validation', desc: 'Automatic credit limit check before order creation' },
      { title: 'Auto-Pricing', desc: 'Customer discount application and tax calculation' },
      { title: 'Purchase Orders', desc: 'Supplier ordering with receiving workflow' },
      { title: 'Order Analytics', desc: 'Summary statistics and fulfillment rates' },
    ],
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: '💰',
    color: '#f59e0b',
    tech: 'Java / Spring Boot · gRPC · JPA',
    proto: `service FinanceService {
  rpc CreateJournalEntry (JournalReq) returns (JournalResp);
  rpc GetTrialBalance (TrialBalanceReq) returns (Report);
  rpc GetProfitLoss (PeriodReq) returns (Report);
}`,
    features: [
      { title: 'Double-Entry Bookkeeping', desc: 'Enforces debits = credits rule on all journal entries' },
      { title: 'Chart of Accounts', desc: 'ASSET / LIABILITY / EQUITY / REVENUE / EXPENSE hierarchy' },
      { title: 'Auto-Journaling', desc: 'Sales invoices create AR/Revenue entries automatically' },
      { title: 'Financial Reports', desc: 'Trial Balance, P&L, Balance Sheet, AR Aging' },
      { title: 'Payment Recording', desc: 'Adjusts AR and posts bank journal entries' },
      { title: 'Budget Management', desc: 'Budget vs actual tracking across accounts' },
    ],
  },
  {
    id: 'hr',
    name: 'Human Resources',
    icon: '👥',
    color: '#ec4899',
    tech: 'Java / Spring Boot · gRPC · JPA',
    proto: `service HRService {
  rpc CreateEmployee (EmployeeReq) returns (EmployeeResp);
  rpc ProcessPayroll (PayrollReq) returns (PayrollResp);
  rpc ClockIn (AttendanceReq) returns (AttendanceResp);
}`,
    features: [
      { title: 'Employee Lifecycle', desc: 'Hire → Active → Terminate with auto-numbering' },
      { title: 'Leave Management', desc: 'Request → Approve/Reject with weekend exclusion' },
      { title: 'Attendance Tracking', desc: 'Clock-in/out with late detection and overtime calc' },
      { title: 'Payroll Processing', desc: 'Progressive tax, Social Security, Medicare deductions' },
      { title: 'Overtime Calculation', desc: '1.5x rate with pro-rated salary for partial periods' },
      { title: 'HR Dashboard', desc: 'Employee counts, department summaries, leave stats' },
    ],
  },
];

export default function Modules() {
  const [active, setActive] = useState('inventory');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showProto, setShowProto] = useState(false);
  const { ref, isVisible } = useInView();
  const current = modules.find(m => m.id === active)!;
  const panelRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (id: string) => {
    if (id === active) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActive(id);
      setShowProto(false);
      setIsTransitioning(false);
    }, 200);
  };

  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.scrollTop = 0;
    }
  }, [active]);

  return (
    <section className="modules" id="modules" ref={ref}>
      <div className="container">
        <div className={`modules__header ${isVisible ? 'visible' : ''}`}>
          <span className="section-label">Core Modules</span>
          <h2 className="section-title">Business Logic Deep Dive</h2>
          <p className="section-desc">Each service implements production-grade business rules with transactional integrity, state machines, and domain-driven patterns.</p>
        </div>

        <div className={`modules__tabs ${isVisible ? 'visible' : ''}`}>
          {modules.map(m => (
            <button
              key={m.id}
              className={`modules__tab ${active === m.id ? 'modules__tab--active' : ''}`}
              onClick={() => handleTabChange(m.id)}
              style={{ '--tab-color': m.color } as React.CSSProperties}
            >
              <span className="modules__tab-icon">{m.icon}</span>
              {m.name}
            </button>
          ))}
        </div>

        <div
          className={`modules__panel ${isVisible ? 'visible' : ''} ${isTransitioning ? 'modules__panel--transitioning' : ''}`}
          ref={panelRef}
          style={{ '--module-color': current.color } as React.CSSProperties}
        >
          <div className="modules__panel-header">
            <span className="modules__panel-icon">{current.icon}</span>
            <div className="modules__panel-info">
              <h3 className="modules__panel-name">{current.name} Service</h3>
              <span className="modules__panel-tech">{current.tech}</span>
            </div>
            <button
              className={`modules__proto-toggle ${showProto ? 'modules__proto-toggle--active' : ''}`}
              onClick={() => setShowProto(!showProto)}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 8 3 12 7"/><polyline points="4 13 8 9 12 13"/></svg>
              Proto
            </button>
          </div>

          {/* Proto preview */}
          <div className={`modules__proto ${showProto ? 'modules__proto--visible' : ''}`}>
            <div className="modules__proto-header">
              <span className="modules__proto-lang">protobuf</span>
              <span className="modules__proto-file">{current.id}_service.proto</span>
            </div>
            <pre className="modules__proto-code"><code>{current.proto}</code></pre>
          </div>

          <div className="modules__features-header">
            <span className="modules__features-count">{current.features.length} Features</span>
            <div className="modules__features-bar">
              <div className="modules__features-fill" style={{ width: `${(current.features.length / 6) * 100}%` }} />
            </div>
          </div>

          <div className="modules__features">
            {current.features.map((f, i) => (
              <div className="modules__feature" key={f.title} style={{ animationDelay: `${i * 0.06}s` }}>
                <div className="modules__feature-dot" />
                <div>
                  <h4 className="modules__feature-title">{f.title}</h4>
                  <p className="modules__feature-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

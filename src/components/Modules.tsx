import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import './Modules.css';

const modules = [
  {
    id: 'inventory',
    name: 'Inventory',
    icon: '📦',
    color: '#10b981',
    tech: 'Go · gRPC · PostgreSQL · Redis',
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
  const { ref, isVisible } = useInView();
  const current = modules.find(m => m.id === active)!;

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
              onClick={() => setActive(m.id)}
              style={{ '--tab-color': m.color } as React.CSSProperties}
            >
              <span className="modules__tab-icon">{m.icon}</span>
              {m.name}
            </button>
          ))}
        </div>

        <div className={`modules__panel ${isVisible ? 'visible' : ''}`} key={current.id} style={{ '--module-color': current.color } as React.CSSProperties}>
          <div className="modules__panel-header">
            <span className="modules__panel-icon">{current.icon}</span>
            <div>
              <h3 className="modules__panel-name">{current.name} Service</h3>
              <span className="modules__panel-tech">{current.tech}</span>
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

import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import './Showcase.css';

const screenshots = [
  { src: '/images/login_desktop.png', label: 'Login — Desktop Client', desc: 'Enterprise-ready authentication with JWT token-based security and role-based access control' },
  { src: '/images/hr_desktop.png', label: 'HR — Leave Requests', desc: 'Full leave management with approval workflows, date tracking, and status indicators' },
  { src: '/images/inventoy_desktop.png', label: 'Inventory — Products', desc: 'Product catalog with SKU management, stock tracking, and active status monitoring' },
  { src: '/images/orders_desktop.png', label: 'Orders — Dashboard', desc: 'Order management dashboard with sales/purchase tracking and customer overview' },
  { src: '/images/finance_desktop.png', label: 'Finance — Reports', desc: 'Financial reporting suite: Trial Balance, P&L, Balance Sheet, and AR Aging' },
  { src: '/images/web.png', label: 'Web Client — Dashboard', desc: 'Modern React-based web client with responsive layout and real-time data' },
];

export default function Showcase() {
  const [selected, setSelected] = useState(0);
  const { ref, isVisible } = useInView();

  return (
    <section className="showcase" id="showcase" ref={ref}>
      <div className="container">
        <div className={`showcase__header ${isVisible ? 'visible' : ''}`}>
          <span className="section-label">Screenshots</span>
          <h2 className="section-title">Application Showcase</h2>
          <p className="section-desc">Multi-platform clients providing a seamless enterprise experience across desktop and web.</p>
        </div>

        <div className={`showcase__viewer ${isVisible ? 'visible' : ''}`}>
          <div className="showcase__main">
            <div className="showcase__frame">
              <div className="showcase__frame-bar">
                <span className="showcase__dot showcase__dot--r" />
                <span className="showcase__dot showcase__dot--y" />
                <span className="showcase__dot showcase__dot--g" />
                <span className="showcase__frame-title">{screenshots[selected].label}</span>
              </div>
              <img
                src={screenshots[selected].src}
                alt={screenshots[selected].label}
                className="showcase__img"
                key={selected}
              />
            </div>
            <p className="showcase__caption">{screenshots[selected].desc}</p>
          </div>

          <div className="showcase__thumbs">
            {screenshots.map((s, i) => (
              <button
                key={i}
                className={`showcase__thumb ${i === selected ? 'showcase__thumb--active' : ''}`}
                onClick={() => setSelected(i)}
              >
                <img src={s.src} alt={s.label} />
                <span className="showcase__thumb-label">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

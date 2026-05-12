import { useState, useEffect, useMemo } from 'react';
import { useScrollspy } from '../hooks/useScrollspy';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sectionIds = useMemo(() => ['hero', 'architecture', 'modules', 'tech-stack', 'showcase', 'api'], []);
  const activeSection = useScrollspy(sectionIds, 200);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Architecture', href: '#architecture', id: 'architecture' },
    { label: 'Modules', href: '#modules', id: 'modules' },
    { label: 'Tech Stack', href: '#tech-stack', id: 'tech-stack' },
    { label: 'Showcase', href: '#showcase', id: 'showcase' },
    { label: 'API', href: '#api', id: 'api' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container-wide">
        <a href="#" className="navbar__brand">
          <div className="navbar__logo">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="url(#navGrad)" />
              <path d="M10 22V10l6 8 6-8v12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <defs><linearGradient id="navGrad" x1="0" y1="0" x2="32" y2="32"><stop stopColor="#6366f1"/><stop offset="1" stopColor="#8b5cf6"/></linearGradient></defs>
            </svg>
          </div>
          <span className="navbar__name">Nexus <span className="navbar__name-accent">ERP</span></span>
        </a>

        <div className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`}>
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className={`navbar__link ${activeSection === l.id ? 'navbar__link--active' : ''}`}
              onClick={() => setMobileOpen(false)}
              style={{ transitionDelay: mobileOpen ? `${i * 50}ms` : '0ms' }}
            >
              {l.label}
            </a>
          ))}
          <a href="https://github.com/solokid2k3/nexus-erp" target="_blank" rel="noopener" className="navbar__cta">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
            GitHub
          </a>
        </div>

        <button className="navbar__hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <span className={mobileOpen ? 'open' : ''} />
          <span className={mobileOpen ? 'open' : ''} />
          <span className={mobileOpen ? 'open' : ''} />
        </button>
      </div>
    </nav>
  );
}

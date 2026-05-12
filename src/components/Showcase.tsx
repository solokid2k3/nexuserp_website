import { useState, useEffect, useCallback, useRef } from 'react';
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

const AUTOPLAY_INTERVAL = 5000;

export default function Showcase() {
  const [selected, setSelected] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const [progress, setProgress] = useState(0);
  const { ref, isVisible } = useInView();
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const progressRef = useRef<ReturnType<typeof setInterval>>();

  const goTo = useCallback((index: number) => {
    setSelected(index);
    setProgress(0);
  }, []);

  const goNext = useCallback(() => {
    setSelected(prev => (prev + 1) % screenshots.length);
    setProgress(0);
  }, []);

  const goPrev = useCallback(() => {
    setSelected(prev => (prev - 1 + screenshots.length) % screenshots.length);
    setProgress(0);
  }, []);

  // Autoplay
  useEffect(() => {
    if (isPaused || lightbox) return;
    intervalRef.current = setInterval(goNext, AUTOPLAY_INTERVAL);
    progressRef.current = setInterval(() => {
      setProgress(p => Math.min(p + (100 / (AUTOPLAY_INTERVAL / 50)), 100));
    }, 50);

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(progressRef.current);
    };
  }, [isPaused, lightbox, selected, goNext]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'Escape') setLightbox(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev]);

  return (
    <>
      <section
        className="showcase"
        id="showcase"
        ref={ref}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="container">
          <div className={`showcase__header ${isVisible ? 'visible' : ''}`}>
            <span className="section-label">Screenshots</span>
            <h2 className="section-title">Application Showcase</h2>
            <p className="section-desc">Multi-platform clients providing a seamless enterprise experience across desktop and web.</p>
          </div>

          <div className={`showcase__viewer ${isVisible ? 'visible' : ''}`}>
            <div className="showcase__main">
              <div className="showcase__frame" onClick={() => setLightbox(true)}>
                <div className="showcase__frame-bar">
                  <span className="showcase__dot showcase__dot--r" />
                  <span className="showcase__dot showcase__dot--y" />
                  <span className="showcase__dot showcase__dot--g" />
                  <span className="showcase__frame-title">{screenshots[selected].label}</span>
                  <div className="showcase__frame-controls">
                    <button className="showcase__nav-btn" onClick={(e) => { e.stopPropagation(); goPrev(); }} aria-label="Previous">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 4l-4 4 4 4"/></svg>
                    </button>
                    <span className="showcase__counter">{selected + 1} / {screenshots.length}</span>
                    <button className="showcase__nav-btn" onClick={(e) => { e.stopPropagation(); goNext(); }} aria-label="Next">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 4l4 4-4 4"/></svg>
                    </button>
                  </div>
                </div>
                <div className="showcase__img-wrapper">
                  <img
                    src={screenshots[selected].src}
                    alt={screenshots[selected].label}
                    className="showcase__img"
                    key={selected}
                  />
                  <div className="showcase__zoom-hint">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5L14 14"/><path d="M5 7h4M7 5v4"/></svg>
                    Click to zoom
                  </div>
                </div>
              </div>
              <p className="showcase__caption">{screenshots[selected].desc}</p>
            </div>

            <div className="showcase__thumbs">
              {screenshots.map((s, i) => (
                <button
                  key={i}
                  className={`showcase__thumb ${i === selected ? 'showcase__thumb--active' : ''}`}
                  onClick={() => goTo(i)}
                >
                  <img src={s.src} alt={s.label} />
                  <span className="showcase__thumb-label">{s.label}</span>
                  {i === selected && (
                    <div className="showcase__thumb-progress">
                      <div className="showcase__thumb-progress-bar" style={{ width: `${progress}%` }} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="showcase__lightbox" onClick={() => setLightbox(false)}>
          <button className="showcase__lightbox-close" aria-label="Close">✕</button>
          <button className="showcase__lightbox-nav showcase__lightbox-nav--prev" onClick={(e) => { e.stopPropagation(); goPrev(); }} aria-label="Previous">
            <svg width="24" height="24" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 4l-4 4 4 4"/></svg>
          </button>
          <img
            src={screenshots[selected].src}
            alt={screenshots[selected].label}
            className="showcase__lightbox-img"
            onClick={e => e.stopPropagation()}
            key={`lb-${selected}`}
          />
          <button className="showcase__lightbox-nav showcase__lightbox-nav--next" onClick={(e) => { e.stopPropagation(); goNext(); }} aria-label="Next">
            <svg width="24" height="24" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 4l4 4-4 4"/></svg>
          </button>
          <div className="showcase__lightbox-caption">{screenshots[selected].label}</div>
        </div>
      )}
    </>
  );
}

import { useInView } from '../hooks/useInView';
import { useCountUp } from '../hooks/useCountUp';
import './MetricsBanner.css';

const metrics = [
  { value: 15000, suffix: '+', label: 'Lines of Code', icon: '💻' },
  { value: 60, suffix: '+', label: 'API Endpoints', icon: '🔗' },
  { value: 20, suffix: '+', label: 'Database Tables', icon: '🗃️' },
  { value: 4, suffix: '', label: 'Microservices', icon: '⚙️' },
  { value: 6, suffix: '', label: 'Docker Services', icon: '🐳' },
  { value: 2, suffix: '', label: 'Languages', icon: '🌐' },
];

function MetricCard({ metric, visible }: { metric: typeof metrics[0]; visible: boolean }) {
  const count = useCountUp(metric.value, metric.value > 100 ? 2500 : 1500, visible);

  return (
    <div className="metrics__card">
      <span className="metrics__icon">{metric.icon}</span>
      <span className="metrics__value">
        {count.toLocaleString()}{metric.suffix}
      </span>
      <span className="metrics__label">{metric.label}</span>
    </div>
  );
}

export default function MetricsBanner() {
  const { ref, isVisible } = useInView(0.2);

  return (
    <section className="metrics" ref={ref}>
      <div className="metrics__bg">
        <div className="metrics__orb metrics__orb--1" />
        <div className="metrics__orb metrics__orb--2" />
        <div className="metrics__orb metrics__orb--3" />
      </div>
      <div className="container">
        <div className={`metrics__grid ${isVisible ? 'visible' : ''}`}>
          {metrics.map(m => (
            <MetricCard key={m.label} metric={m} visible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}

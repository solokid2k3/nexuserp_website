import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MetricsBanner from './components/MetricsBanner';
import Architecture from './components/Architecture';
import Modules from './components/Modules';
import TechStack from './components/TechStack';
import Timeline from './components/Timeline';
import Showcase from './components/Showcase';
import ApiSection from './components/ApiSection';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';

export default function App() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <Hero />
      <MetricsBanner />
      <Architecture />
      <Modules />
      <TechStack />
      <Timeline />
      <Showcase />
      <ApiSection />
      <Footer />
    </>
  );
}

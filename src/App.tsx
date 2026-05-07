import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Architecture from './components/Architecture';
import Modules from './components/Modules';
import TechStack from './components/TechStack';
import Showcase from './components/Showcase';
import ApiSection from './components/ApiSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Architecture />
      <Modules />
      <TechStack />
      <Showcase />
      <ApiSection />
      <Footer />
    </>
  );
}

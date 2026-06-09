import ParticleBackground from '../components/landing/ParticleBackground';
import Hero from '../components/landing/Hero';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-grid overflow-hidden">
      <ParticleBackground />
      <Hero />
    </div>
  );
}

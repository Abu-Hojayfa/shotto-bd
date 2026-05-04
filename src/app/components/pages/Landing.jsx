import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';
import { HeroSection } from '../landing/HeroSection';
import { StatsSection } from '../landing/StatsSection';
import { HowItWorks } from '../landing/HowItWorks';
import { HeatmapSection } from '../landing/HeatmapSection';
import { SecuritySection } from '../landing/SecuritySection';
import { TrustBadges } from '../landing/TrustBadges';

export function Landing() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16 sm:pt-20">
        <HeroSection />
        <StatsSection />
        <HeatmapSection />
        <HowItWorks />
        <SecuritySection />
        <TrustBadges />
      </main>
      <Footer />
    </div>
  );
}

import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';
import { HeroSection } from '../landing/HeroSection';
import { StatsSection } from '../landing/StatsSection';
import { CompactFeatures } from '../landing/CompactFeatures';
import { HeatmapSection } from '../landing/HeatmapSection';

export function Landing() {
  return (
    <div className="min-h-screen bg-transparent">
      <Header />
      <main>
        {/* Impactful Hero */}
        <HeroSection />
        
        {/* Quick Stats bar */}
        <div className="border-y border-border/50 bg-card/30">
          <StatsSection />
        </div>

        {/* Visual Heatmap - Compacted by Stats above it */}
        <HeatmapSection />

        {/* Consolidated Bento Grid for Features, Security & Trust */}
        <CompactFeatures />
      </main>
      <Footer />
    </div>
  );
}

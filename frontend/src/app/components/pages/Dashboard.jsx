import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';
import { DashboardStats } from '../dashboard/DashboardStats';
import { CategoryChart } from '../dashboard/CategoryChart';
import { TrendChart } from '../dashboard/TrendChart';
import { TopSectors } from '../dashboard/TopSectors';
import { DistrictFilter } from '../dashboard/DistrictFilter';
import { LiveTicker } from '../dashboard/LiveTicker';
import { useState } from 'react';

export function Dashboard() {
  const [selectedDistrict, setSelectedDistrict] = useState('all');

  return (
    <div className="min-h-screen bg-transparent">
      <Header />
      <main className="pt-20 pb-16">
        <LiveTicker />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          {/* Page Header */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Transparency Dashboard
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl">
              Real-time corruption data and statistics from across Bangladesh. Track reports 
              and high-risk areas.
            </p>
          </div>

          {/* District Filter */}
          <DistrictFilter
            selected={selectedDistrict}
            onChange={setSelectedDistrict}
          />

          {/* Stats Overview */}
          <DashboardStats district={selectedDistrict} />

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mt-8">
            <CategoryChart district={selectedDistrict} />
            <TrendChart district={selectedDistrict} />
          </div>

          {/* Sectors Section */}
          <div className="mt-8">
            <TopSectors district={selectedDistrict} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

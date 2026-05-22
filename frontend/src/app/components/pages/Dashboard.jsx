import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';
import { DashboardStats } from '../dashboard/DashboardStats';
import { CategoryChart } from '../dashboard/CategoryChart';
import { TrendChart } from '../dashboard/TrendChart';
import { TopSectors } from '../dashboard/TopSectors';
import { ResolutionRate } from '../dashboard/ResolutionRate';
import { LiveFeed } from '../dashboard/LiveFeed';
import { DistrictFilter } from '../dashboard/DistrictFilter';
import { useState } from 'react';

export function Dashboard() {
  const [selectedDistrict, setSelectedDistrict] = useState('all');

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Transparency Dashboard
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl">
              Real-time corruption data and statistics from across Bangladesh. Track reports, 
              resolutions, and high-risk areas.
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

          {/* Secondary Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mt-8">
            <div className="lg:col-span-2">
              <TopSectors district={selectedDistrict} />
            </div>
            <ResolutionRate district={selectedDistrict} />
          </div>

          {/* Live Feed */}
          <LiveFeed district={selectedDistrict} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

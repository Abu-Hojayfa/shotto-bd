import { useState } from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../shared/GlassCard';
import { MapPin, AlertTriangle, TrendingUp } from 'lucide-react';

const districts = [
  { name: 'Dhaka', reports: 3842, risk: 'high', x: 50, y: 45 },
  { name: 'Chittagong', reports: 2156, risk: 'high', x: 70, y: 55 },
  { name: 'Sylhet', reports: 892, risk: 'medium', x: 75, y: 25 },
  { name: 'Rajshahi', reports: 1234, risk: 'medium', x: 30, y: 30 },
  { name: 'Khulna', reports: 1567, risk: 'high', x: 35, y: 65 },
  { name: 'Barisal', reports: 678, risk: 'low', x: 45, y: 70 },
  { name: 'Rangpur', reports: 945, risk: 'medium', x: 35, y: 15 },
  { name: 'Mymensingh', reports: 789, risk: 'low', x: 55, y: 30 }
];

const topCategories = [
  { category: 'Police Harassment', count: 2847, percentage: 22 },
  { category: 'Bribery', count: 2534, percentage: 20 },
  { category: 'Land Issues', count: 1923, percentage: 15 },
  { category: 'Hospital Overcharge', count: 1678, percentage: 13 },
  { category: 'Extortion', count: 1456, percentage: 11 }
];

export function HeatmapSection() {
  const [hoveredDistrict, setHoveredDistrict] = useState(null);

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'bg-destructive';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-primary';
      default: return 'bg-gray-500';
    }
  };

  const getRiskGlow = (risk) => {
    switch (risk) {
      case 'high': return 'shadow-destructive/50';
      case 'medium': return 'shadow-yellow-500/50';
      case 'low': return 'shadow-primary/50';
      default: return 'shadow-gray-500/50';
    }
  };

  return (
    <section className="py-12 bg-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Corruption Heatmap
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Interactive map showing corruption hotspots across Bangladesh
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Map Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="p-8 h-full">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2">Bangladesh Districts</h3>
                <p className="text-sm text-muted-foreground">Click on a district to view details</p>
              </div>

              {/* Simplified Map */}
              <div className="relative w-full aspect-square bg-gradient-to-br from-background to-muted/20 rounded-xl border border-border overflow-hidden">
                {/* Map Background Pattern */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)',
                  backgroundSize: '40px 40px'
                }} />

                {/* District Markers */}
                {districts.map((district) => (
                  <motion.div
                    key={district.name}
                    className="absolute cursor-pointer group"
                    style={{ left: `${district.x}%`, top: `${district.y}%` }}
                    onHoverStart={() => setHoveredDistrict(district.name)}
                    onHoverEnd={() => setHoveredDistrict(null)}
                    whileHover={{ scale: 1.2 }}
                  >
                    <div className={`w-4 h-4 ${getRiskColor(district.risk)} rounded-full ${getRiskGlow(district.risk)} shadow-lg animate-pulse`} />
                    
                    {/* Tooltip */}
                    {hoveredDistrict === district.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-6 left-1/2 -translate-x-1/2 z-10"
                      >
                        <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-xl min-w-[140px]">
                          <div className="font-bold text-foreground text-sm mb-1">{district.name}</div>
                          <div className="text-xs text-muted-foreground">{district.reports} reports</div>
                          <div className={`text-xs font-semibold mt-1 ${
                            district.risk === 'high' ? 'text-destructive' :
                            district.risk === 'medium' ? 'text-yellow-500' :
                            'text-primary'
                          }`}>
                            {district.risk.toUpperCase()} RISK
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-6 flex items-center justify-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-destructive rounded-full shadow-lg shadow-destructive/50" />
                  <span className="text-xs text-muted-foreground">High Risk</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/50" />
                  <span className="text-xs text-muted-foreground">Medium Risk</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/50" />
                  <span className="text-xs text-muted-foreground">Low Risk</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Top Categories */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <GlassCard className="p-8">
              <div className="flex items-center space-x-2 mb-6">
                <AlertTriangle className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Top Reported Issues</h3>
              </div>

              <div className="space-y-4">
                {topCategories.map((item, index) => (
                  <motion.div
                    key={item.category}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{item.category}</span>
                      <span className="text-sm text-muted-foreground">{item.count} reports</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-full bg-gradient-to-r from-primary to-green-400 group-hover:from-green-400 group-hover:to-primary transition-all"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-8">
              <div className="flex items-center space-x-2 mb-6">
                <TrendingUp className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Monthly Trend</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">This Month</span>
                  <span className="text-2xl font-bold text-primary">+23%</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Reporting has increased significantly this month, showing growing trust in the platform.
                </p>
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Resolution Rate</span>
                    <span className="font-semibold text-primary">65%</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

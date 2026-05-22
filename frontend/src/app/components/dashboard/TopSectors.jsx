import { GlassCard } from '../shared/GlassCard';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'motion/react';

const sectors = [
  { name: 'Law Enforcement', reports: 3254, change: 12.5, trend: 'up' },
  { name: 'Land Administration', reports: 2876, change: 8.3, trend: 'up' },
  { name: 'Healthcare', reports: 2134, change: -2.1, trend: 'down' },
  { name: 'Education', reports: 1567, change: 15.7, trend: 'up' },
  { name: 'Transportation', reports: 1234, change: 5.2, trend: 'up' },
  { name: 'Utilities', reports: 982, change: -3.4, trend: 'down' }
];

export function TopSectors({ district }) {
  return (
    <GlassCard className="p-6 sm:p-8">
      <h3 className="text-xl font-bold text-foreground mb-6">Top Reported Sectors</h3>
      <div className="space-y-4">
        {sectors.map((sector, index) => (
          <motion.div
            key={sector.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-card/40 border border-border rounded-lg hover:bg-card/60 transition-colors"
          >
            <div className="flex items-center space-x-4 flex-1">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary">{index + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground">{sector.name}</h4>
                <p className="text-sm text-muted-foreground">{sector.reports.toLocaleString()} reports</p>
              </div>
            </div>
            <div className={`flex items-center space-x-1 ${
              sector.trend === 'up' ? 'text-destructive' : 'text-primary'
            }`}>
              {sector.trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-sm font-semibold">{Math.abs(sector.change)}%</span>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}

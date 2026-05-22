import { motion } from 'motion/react';
import { GlassCard } from '../shared/GlassCard';
import { AlertCircle, ArrowDown, ArrowUp } from 'lucide-react';

const sectorData = [
  { name: 'Land Office', value: 85, color: 'bg-red-500', trend: 'up' },
  { name: 'Police Station', value: 72, color: 'bg-orange-500', trend: 'down' },
  { name: 'Health Sector', value: 45, color: 'bg-yellow-500', trend: 'up' },
  { name: 'Education', value: 30, color: 'bg-blue-500', trend: 'down' },
  { name: 'Passport Office', value: 65, color: 'bg-red-400', trend: 'up' },
];

export function CategoryChart() {
  return (
    <GlassCard className="p-6 border-white/5 bg-white/[0.02]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            Sector-wise Corruption Index <AlertCircle className="w-4 h-4 text-primary" />
          </h3>
          <p className="text-xs text-muted-foreground">High priority sectors based on citizen reports</p>
        </div>
      </div>

      <div className="space-y-6">
        {sectorData.map((sector, index) => (
          <div key={sector.name} className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-slate-300">{sector.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-white font-mono">{sector.value}%</span>
                {sector.trend === 'up' ? (
                  <ArrowUp className="w-3.5 h-3.5 text-destructive" />
                ) : (
                  <ArrowDown className="w-3.5 h-3.5 text-primary" />
                )}
              </div>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${sector.value}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className={`h-full rounded-full ${sector.color} shadow-lg shadow-white/5`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-xl">
        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Key Insight</p>
        <p className="text-xs text-slate-400 leading-relaxed">
          Land offices remain the highest concern area with a 12% increase in reports this month.
        </p>
      </div>
    </GlassCard>
  );
}

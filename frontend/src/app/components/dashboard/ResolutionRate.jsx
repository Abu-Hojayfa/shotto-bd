import { GlassCard } from '../shared/GlassCard';
import { motion } from 'motion/react';

export function ResolutionRate({ district }) {
  const rate = district === 'all' ? 65.3 : 63.9;
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (rate / 100) * circumference;

  return (
    <GlassCard className="p-6 sm:p-8">
      <h3 className="text-xl font-bold text-foreground mb-6">Resolution Rate</h3>
      <div className="flex flex-col items-center justify-center py-8">
        <div className="relative w-48 h-48">
          <svg className="transform -rotate-90 w-48 h-48">
            <circle
              cx="96"
              cy="96"
              r="70"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="12"
              fill="none"
            />
            <motion.circle
              cx="96"
              cy="96"
              r="70"
              stroke="#00C853"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{
                strokeDasharray: circumference,
                filter: 'drop-shadow(0 0 10px rgba(0, 200, 83, 0.5))'
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-5xl font-bold text-foreground">{rate}%</div>
            <div className="text-sm text-muted-foreground mt-1">Resolved</div>
          </div>
        </div>

        <div className="mt-8 w-full space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Resolved</span>
            <span className="text-sm font-semibold text-primary">8,392</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Under Review</span>
            <span className="text-sm font-semibold text-yellow-500">3,245</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Rejected</span>
            <span className="text-sm font-semibold text-destructive">1,210</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

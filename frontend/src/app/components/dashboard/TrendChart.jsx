import { motion } from 'motion/react';
import { GlassCard } from '../shared/GlassCard';
import { TrendingUp, Activity, ArrowDownRight } from 'lucide-react';

const trendData = [
  { month: 'Oct', value: 80 },
  { month: 'Nov', value: 75 },
  { month: 'Dec', value: 85 },
  { month: 'Jan', value: 60 },
  { month: 'Feb', value: 45 },
  { month: 'Mar', value: 30 },
];

export function TrendChart() {
  const width = 500;
  const height = 150;
  const padding = 20;
  
  // Calculate SVG path points
  const points = trendData.map((d, i) => {
    const x = (i / (trendData.length - 1)) * (width - padding * 2) + padding;
    const y = height - ((d.value / 100) * (height - padding * 2) + padding);
    return `${x},${y}`;
  }).join(' ');

  const areaPath = `M ${padding},${height} L ${points} L ${width - padding},${height} Z`;
  const linePath = `M ${points}`;

  return (
    <GlassCard className="p-6 border-white/5 bg-white/[0.02] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />

      <div className="flex items-center justify-between mb-8 relative z-10">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            Corruption Decline Trend <TrendingUp className="w-4 h-4 text-primary" />
          </h3>
          <p className="text-xs text-muted-foreground">National progress over the last 6 months</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1 text-primary">
            <ArrowDownRight className="w-5 h-5 animate-bounce" />
            <span className="text-2xl font-bold">-62%</span>
          </div>
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Net Improvement</div>
        </div>
      </div>

      {/* SVG Graph */}
      <div className="relative h-48 w-full mt-4 group">
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-full drop-shadow-[0_10px_15px_rgba(var(--primary-rgb),0.3)]"
          preserveAspectRatio="none"
        >
          {/* Grid Lines */}
          {[0, 25, 50, 75, 100].map(tick => (
            <line 
              key={tick}
              x1={padding} y1={height - (tick/100 * (height-padding*2) + padding)} 
              x2={width-padding} y2={height - (tick/100 * (height-padding*2) + padding)}
              stroke="white" strokeOpacity="0.05" strokeWidth="1"
            />
          ))}

          {/* Area Fill */}
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            d={areaPath}
            fill="url(#gradient-area)"
          />

          {/* Main Line */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d={linePath}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-primary"
            strokeLinecap="round"
          />

          {/* Data Points */}
          {trendData.map((d, i) => {
            const x = (i / (trendData.length - 1)) * (width - padding * 2) + padding;
            const y = height - ((d.value / 100) * (height - padding * 2) + padding);
            return (
              <motion.circle
                key={i}
                initial={{ r: 0 }}
                animate={{ r: 4 }}
                transition={{ delay: 1.5 + (i * 0.1) }}
                cx={x} cy={y}
                fill="white"
                className="group-hover:r-6 transition-all"
              />
            );
          })}

          <defs>
            <linearGradient id="gradient-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" className="text-primary" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" className="text-primary" />
            </linearGradient>
          </defs>
        </svg>

        {/* Labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2">
          {trendData.map(d => (
            <span key={d.month} className="text-[10px] font-bold text-muted-foreground uppercase">{d.month}</span>
          ))}
        </div>
      </div>

      <div className="mt-10 flex items-center gap-4 p-4 bg-primary/5 border border-primary/20 rounded-xl relative z-10">
        <div className="p-2 bg-primary/20 rounded-lg">
          <Activity className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Impact Analysis</p>
          <p className="text-xs text-slate-300 leading-relaxed">
            Report-driven accountability has caused a sharp <span className="text-primary font-bold">62% drop</span> in reported bribery since our implementation in December.
          </p>
        </div>
      </div>
    </GlassCard>
  );
}

import { motion } from 'motion/react';
import { Shield, Star, AlertTriangle, CheckCircle, TrendingUp, Radio } from 'lucide-react';

const activities = [
  { id: 1, type: 'report', text: 'New corruption report filed from Dhaka South', time: '2 mins ago', icon: AlertTriangle, color: 'text-destructive' },
  { id: 2, type: 'rating', text: 'Uttara Land Office rating dropped to 1.5/5', time: '5 mins ago', icon: Star, color: 'text-yellow-500' },
  { id: 3, type: 'status', text: 'Report STB-2026-X4 resolved in Chittagong', time: '12 mins ago', icon: CheckCircle, color: 'text-primary' },
  { id: 4, type: 'report', text: 'Police harassment case reported in Sylhet', time: '18 mins ago', icon: Shield, color: 'text-blue-400' },
  { id: 5, type: 'rating', text: 'Motijheel Tax Office received a 5-star review', time: '25 mins ago', icon: Star, color: 'text-primary' },
  { id: 6, type: 'status', text: 'Official investigation started for STB-2026-Y8', time: '30 mins ago', icon: TrendingUp, color: 'text-yellow-500' },
];

export function LiveTicker() {
  return (
    <div className="w-full bg-primary/5 border-y border-primary/10 overflow-hidden py-3">
      <div className="container mx-auto px-4 flex items-center gap-4">
        {/* Live Label */}
        <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Live Activity</span>
        </div>

        {/* Scrolling Ticker */}
        <div className="relative flex-1 overflow-hidden flex items-center h-6">
          <motion.div
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex items-center gap-12 whitespace-nowrap"
          >
            {[...activities, ...activities].map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex items-center gap-2.5">
                <item.icon className={`w-4 h-4 ${item.color}`} />
                <span className="text-sm font-medium text-foreground">{item.text}</span>
                <span className="text-[10px] font-bold text-muted-foreground uppercase">{item.time}</span>
              </div>
            ))}
          </motion.div>
          
          {/* Fades */}
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#020617]/0 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#020617]/0 to-transparent z-10" />
        </div>
      </div>
    </div>
  );
}

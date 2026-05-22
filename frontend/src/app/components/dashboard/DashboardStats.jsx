import { FileText, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { GlassCard } from '../shared/GlassCard';

export function DashboardStats({ district }) {
  const stats = [
    {
      icon: FileText,
      label: 'Total Reports',
      value: district === 'all' ? '12,847' : '3,842',
      change: '+12% this week',
      color: 'text-blue-400'
    },
    {
      icon: CheckCircle,
      label: 'Resolved',
      value: district === 'all' ? '8,392' : '2,456',
      change: '+8% this week',
      color: 'text-primary'
    },
    {
      icon: Clock,
      label: 'Under Review',
      value: district === 'all' ? '3,245' : '1,123',
      change: '456 new today',
      color: 'text-yellow-500'
    },
    {
      icon: TrendingUp,
      label: 'Resolution Rate',
      value: district === 'all' ? '65.3%' : '63.9%',
      change: '+2.4% from last month',
      color: 'text-primary'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <GlassCard hover glow className="p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <div className="text-xs text-muted-foreground">{stat.change}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}

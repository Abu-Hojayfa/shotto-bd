import { useState, useEffect } from 'react';
import { FileText, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { GlassCard } from '../shared/GlassCard';

export function DashboardStats({ district }) {
  const [data, setData] = useState({
    totalReports: 0,
    resolvedReports: 0,
    underReviewReports: 0,
    resolutionRate: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/reports/stats?district=${district}`);
        const result = await response.json();
        if (response.ok && result.success) {
          setData(result.data);
        }
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      }
    };
    fetchStats();
  }, [district]);

  const stats = [
    {
      icon: FileText,
      label: 'Total Reports',
      value: data.totalReports.toLocaleString(),
      change: 'Real-time database count',
      color: 'text-blue-400'
    },
    {
      icon: CheckCircle,
      label: 'Resolved',
      value: data.resolvedReports.toLocaleString(),
      change: 'Official closures',
      color: 'text-primary'
    },
    {
      icon: Clock,
      label: 'Under Review',
      value: data.underReviewReports.toLocaleString(),
      change: 'Active investigations',
      color: 'text-yellow-500'
    },
    {
      icon: TrendingUp,
      label: 'Resolution Rate',
      value: `${data.resolutionRate}%`,
      change: 'Average action time',
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

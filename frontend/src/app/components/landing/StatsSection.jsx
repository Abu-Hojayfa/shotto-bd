import { FileText, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

const stats = [
  {
    icon: FileText,
    label: 'Reports Filed',
    value: '12,847',
    color: 'text-primary'
  },
  {
    icon: CheckCircle,
    label: 'Cases Resolved',
    value: '8,392',
    color: 'text-green-500'
  },
  {
    icon: AlertTriangle,
    label: 'High-Risk Areas',
    value: '47',
    color: 'text-destructive'
  },
  {
    icon: TrendingUp,
    label: 'Active Users',
    value: '45,621',
    color: 'text-blue-400'
  }
];

export function StatsSection() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col items-center text-center space-y-2"
            >
              <div className={`p-3 rounded-xl bg-card border border-border/50 shadow-sm ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

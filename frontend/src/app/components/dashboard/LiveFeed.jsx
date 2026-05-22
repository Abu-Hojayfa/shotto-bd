import { GlassCard } from '../shared/GlassCard';
import { Clock, MapPin, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

const recentReports = [
  {
    id: 'STB-2026-A7X9K',
    type: 'Police Harassment',
    district: 'Dhaka',
    time: '5 minutes ago',
    status: 'under-review'
  },
  {
    id: 'STB-2026-B2M4L',
    type: 'Bribery',
    district: 'Chittagong',
    time: '12 minutes ago',
    status: 'resolved'
  },
  {
    id: 'STB-2026-C9P6N',
    type: 'Land Issues',
    district: 'Rajshahi',
    time: '28 minutes ago',
    status: 'under-review'
  },
  {
    id: 'STB-2026-D4Q8R',
    type: 'Hospital Overcharge',
    district: 'Khulna',
    time: '45 minutes ago',
    status: 'resolved'
  },
  {
    id: 'STB-2026-E1S5T',
    type: 'Extortion',
    district: 'Sylhet',
    time: '1 hour ago',
    status: 'under-review'
  },
  {
    id: 'STB-2026-F3V7W',
    type: 'Bribery',
    district: 'Dhaka',
    time: '2 hours ago',
    status: 'resolved'
  }
];

export function LiveFeed({ district }) {
  const filteredReports = district === 'all'
    ? recentReports
    : recentReports.filter(r => r.district.toLowerCase() === district);

  return (
    <div className="mt-8">
      <GlassCard className="p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">Live Report Feed</h3>
          <div className="flex items-center space-x-2 px-3 py-1 bg-primary/10 border border-primary/30 rounded-full">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-xs text-primary">Live</span>
          </div>
        </div>

        <div className="space-y-3">
          {filteredReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-card/40 border border-border rounded-lg hover:bg-card/60 transition-colors group"
            >
              <div className="flex items-center space-x-4 flex-1 min-w-0">
                <div className={`p-2 rounded-lg ${
                  report.status === 'resolved'
                    ? 'bg-primary/10'
                    : 'bg-yellow-500/10'
                }`}>
                  {report.status === 'resolved' ? (
                    <CheckCircle className="w-5 h-5 text-primary" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-foreground">{report.type}</h4>
                    <span className="text-xs text-muted-foreground font-mono">
                      {report.id}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{report.district}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{report.time}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                report.status === 'resolved'
                  ? 'bg-primary/10 text-primary'
                  : 'bg-yellow-500/10 text-yellow-500'
              }`}>
                {report.status === 'resolved' ? 'Resolved' : 'Under Review'}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No reports found for this district</p>
          </div>
        )}
      </GlassCard>
    </div>
  );
}

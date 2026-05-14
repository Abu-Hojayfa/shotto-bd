import { useState, useEffect } from 'react';
import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';
import { GlassCard } from '../shared/GlassCard';
import { Search, Eye, Clock, CheckCircle, XCircle, Copy, FileText, TrendingUp } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { motion } from 'motion/react';
import { Badge } from '../ui/badge';

// Mock user's personal reports - in production, fetch based on logged-in user
const myReports = [
  {
    id: 'STB-2026-A7X9K',
    type: 'Police Harassment',
    district: 'Dhaka',
    date: '2026-03-05',
    status: 'under-review',
    progress: 45,
    submittedBy: 'me'
  },
  {
    id: 'STB-2026-B2M4L',
    type: 'Bribery',
    district: 'Chittagong',
    date: '2026-03-01',
    status: 'resolved',
    progress: 100,
    submittedBy: 'me'
  },
  {
    id: 'STB-2026-C9P6N',
    type: 'Land Issues',
    district: 'Rajshahi',
    date: '2026-02-28',
    status: 'investigating',
    progress: 65,
    submittedBy: 'me'
  },
  {
    id: 'STB-2026-D4Q8R',
    type: 'Hospital Overcharge',
    district: 'Khulna',
    date: '2026-02-25',
    status: 'rejected',
    progress: 100,
    submittedBy: 'me'
  }
];

export function Profile() {
  const [trackingId, setTrackingId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const searchReport = () => {
    const report = myReports.find(r => r.id === trackingId.toUpperCase());
    setSearchResult(report || null);
  };

  // Calculate statistics
  const totalReports = myReports.length;
  const resolvedReports = myReports.filter(r => r.status === 'resolved').length;
  const underReviewReports = myReports.filter(r => r.status === 'under-review').length;
  const investigatingReports = myReports.filter(r => r.status === 'investigating').length;

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'text-primary';
      case 'under-review': return 'text-yellow-500';
      case 'investigating': return 'text-blue-400';
      case 'rejected': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved': return CheckCircle;
      case 'rejected': return XCircle;
      default: return Clock;
    }
  };

  const copyTrackingId = (id) => {
    navigator.clipboard.writeText(id);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              My Reports
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              আমার রিপোর্ট - View and track all your submitted corruption reports
            </p>
          </div>

          {/* User Stats */}
          {isLoggedIn && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <GlassCard className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{totalReports}</div>
                <div className="text-xs text-muted-foreground">Total Reports</div>
              </GlassCard>
              <GlassCard className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary mb-1">{resolvedReports}</div>
                <div className="text-xs text-muted-foreground">Resolved</div>
              </GlassCard>
              <GlassCard className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="w-6 h-6 text-yellow-500" />
                </div>
                <div className="text-2xl font-bold text-yellow-500 mb-1">{underReviewReports}</div>
                <div className="text-xs text-muted-foreground">Under Review</div>
              </GlassCard>
              <GlassCard className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-blue-400 mb-1">{investigatingReports}</div>
                <div className="text-xs text-muted-foreground">Investigating</div>
              </GlassCard>
            </div>
          )}

          {/* Search Box */}
          <GlassCard className="p-6 sm:p-8 mb-8">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Search by Tracking ID
            </h3>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter your tracking ID (e.g., STB-2026-A7X9K)"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchReport()}
                  className="pl-10 bg-input border-border"
                />
              </div>
              <Button
                onClick={searchReport}
                className="px-8 bg-primary hover:bg-primary/90"
              >
                Search
              </Button>
            </div>
            {searchResult === null && trackingId && (
              <p className="text-sm text-destructive mt-2">
                No report found with this tracking ID
              </p>
            )}
          </GlassCard>

          {/* Search Result */}
          {searchResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <GlassCard className="p-6 sm:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {searchResult.type}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{searchResult.district}</span>
                      <span>•</span>
                      <span>{new Date(searchResult.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => copyTrackingId(searchResult.id)}
                    className="p-2 hover:bg-card/60 rounded-lg transition-colors"
                  >
                    <Copy className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>

                {/* Tracking ID */}
                <div className="mb-6 p-4 bg-card/40 border border-border rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Tracking ID</div>
                  <div className="font-mono text-lg text-primary">{searchResult.id}</div>
                </div>

                {/* Status */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <div className={`flex items-center space-x-2 ${getStatusColor(searchResult.status)}`}>
                      {(() => {
                        const StatusIcon = getStatusIcon(searchResult.status);
                        return <StatusIcon className="w-4 h-4" />;
                      })()}
                      <span className="text-sm font-semibold capitalize">
                        {searchResult.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${searchResult.progress}%` }}
                    />
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-4">
                  <h4 className="font-bold text-foreground">Progress Timeline</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground">Report Submitted</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(searchResult.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    {searchResult.status !== 'rejected' && (
                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                          searchResult.progress >= 50 ? 'bg-primary' : 'bg-muted'
                        }`}>
                          <CheckCircle className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-foreground">Under Investigation</div>
                          <div className="text-sm text-muted-foreground">
                            {searchResult.progress >= 50 ? 'In progress' : 'Pending'}
                          </div>
                        </div>
                      </div>
                    )}
                    {searchResult.status === 'resolved' && (
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-foreground">Case Resolved</div>
                          <div className="text-sm text-muted-foreground">Completed</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* My Reports List */}
          <GlassCard className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">
                Your Submitted Reports
              </h3>
              <Badge className="bg-primary/10 text-primary border-primary/30">
                {totalReports} {totalReports === 1 ? 'Report' : 'Reports'}
              </Badge>
            </div>

          {!isLoggedIn ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Please login to view your reports</p>
                <Button onClick={() => window.location.href = '/login'} className="bg-primary hover:bg-primary/90">
                  Login to Continue
                </Button>
              </div>
            ) : myReports.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground mb-4">You haven't submitted any reports yet</p>
                <Button onClick={() => window.location.href = '/report'} className="bg-primary hover:bg-primary/90">
                  Submit Your First Report
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {myReports.map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-4 bg-card/40 border border-border rounded-lg hover:bg-card/60 transition-colors cursor-pointer"
                  onClick={() => {
                    setTrackingId(report.id);
                    setSearchResult(report);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-foreground">{report.type}</h4>
                        <span className="text-xs text-muted-foreground font-mono">
                          {report.id}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {report.district} • {new Date(report.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      report.status === 'resolved'
                        ? 'bg-primary/10 text-primary'
                        : report.status === 'rejected'
                        ? 'bg-destructive/10 text-destructive'
                        : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {report.status.replace('-', ' ')}
                    </div>
                  </div>
                </motion.div>
              ))}
              </div>
            )}
          </GlassCard>
        </div>
      </main>
      <Footer />
    </div>
  );
}

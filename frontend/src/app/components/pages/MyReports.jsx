import { useState, useEffect } from 'react';
import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';
import { GlassCard } from '../shared/GlassCard';
import {
  Search,
  Filter,
  Calendar,
  Copy,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  MapPin,
  Lock,
  Shield,
  MessageSquare,
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const INITIAL_REPORTS = [
  {
    id: 'STB-2026-A7X9K',
    type: 'Police Harassment',
    district: 'Dhaka',
    date: '2026-03-05',
    status: 'under-review',
    progress: 45,
    description: 'Officer requested unnecessary documents and delayed the process.',
    lastUpdate: 'Official verification in progress.',
    history: [
      { status: 'Submitted', date: '2026-03-05' },
      { status: 'Under Review', date: '2026-03-06' }
    ]
  },
  {
    id: 'STB-2026-B2M4L',
    type: 'Bribery',
    district: 'Chittagong',
    date: '2026-03-01',
    status: 'resolved',
    progress: 100,
    description: 'The officer involved has been suspended after evidence verification.',
    lastUpdate: 'Case closed. Departmental action taken.',
    history: [
      { status: 'Submitted', date: '2026-03-01' },
      { status: 'Investigating', date: '2026-03-02' },
      { status: 'Resolved', date: '2026-03-10' }
    ]
  },
  {
    id: 'STB-2026-C9P6N',
    type: 'Land Issues',
    district: 'Rajshahi',
    date: '2026-02-28',
    status: 'investigating',
    progress: 65,
    description: 'Investigation is ongoing regarding land deed manipulation in local AC Land office.',
    lastUpdate: 'Site visit scheduled by the inquiry committee.',
    history: [
      { status: 'Submitted', date: '2026-02-28' },
      { status: 'Under Review', date: '2026-03-01' },
      { status: 'Investigating', date: '2026-03-03' }
    ]
  }
];

export function MyReports() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'resolved': return { color: 'text-primary bg-primary/10 border-primary/20', icon: CheckCircle, glow: 'shadow-primary/20' };
      case 'under-review': return { color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20', icon: Clock, glow: 'shadow-yellow-500/20' };
      case 'investigating': return { color: 'text-blue-400 bg-blue-400/10 border-blue-400/20', icon: AlertCircle, glow: 'shadow-blue-400/20' };
      case 'rejected': return { color: 'text-destructive bg-destructive/10 border-destructive/20', icon: XCircle, glow: 'shadow-destructive/20' };
      default: return { color: 'text-muted-foreground bg-muted/10 border-border', icon: Clock, glow: '' };
    }
  };

  const filteredReports = INITIAL_REPORTS
    .filter(report => {
      const matchesSearch = report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                My Reports
                <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">Official</Badge>
              </h1>
              <p className="text-muted-foreground">Monitor your active cases and institutional responses in real-time.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Button onClick={() => window.location.href = '/report'} className="bg-primary hover:bg-primary/90 text-white font-bold px-6 h-12 shadow-lg shadow-primary/20">
                Submit New Report <ArrowUpRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-6">

              {/* Filter Bar */}
              <GlassCard className="p-3 border-white/5 bg-white/[0.02] shadow-2xl">
                <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by Tracking ID or Type..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-11 bg-white/[0.03] border-white/10 focus:border-primary/50 text-white"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[140px] h-11 bg-white/[0.03] border-white/10 text-white">
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0f172a] border-white/10 text-white">
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="investigating">Investigating</SelectItem>
                        <SelectItem value="under-review">Under Review</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" size="icon" className="h-11 w-11 border border-white/10 hover:bg-white/5">
                      <Filter className="w-4 h-4 text-white" />
                    </Button>
                  </div>
                </div>
              </GlassCard>

              {/* Reports List */}
              {!isLoggedIn ? (
                <GlassCard className="p-12 text-center border-dashed border-white/10">
                  <Lock className="w-16 h-16 text-primary mx-auto mb-6 opacity-40" />
                  <h2 className="text-2xl font-bold text-white mb-2">Secure Access Only</h2>
                  <p className="text-muted-foreground mb-8">Please login to view your personal report history and status updates.</p>
                  <Button onClick={() => window.location.href = '/login'} className="bg-primary hover:bg-primary/90 px-10">Login to Dashboard</Button>
                </GlassCard>
              ) : filteredReports.length === 0 ? (
                <div className="text-center py-24 bg-white/[0.01] border border-dashed border-white/10 rounded-2xl">
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20" />
                  <p className="text-muted-foreground">No reports found matching your filters.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredReports.map((report, index) => {
                    const config = getStatusConfig(report.status);
                    const isSelected = selectedReport?.id === report.id;

                    return (
                      <motion.div
                        key={report.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <GlassCard
                          className={`p-0 overflow-hidden border-white/5 transition-all duration-300 group cursor-pointer ${isSelected ? 'ring-2 ring-primary/40 shadow-primary/10' : 'hover:border-white/20'}`}
                          onClick={() => setSelectedReport(isSelected ? null : report)}
                        >
                          <div className="p-6">
                            <div className="flex flex-col md:flex-row justify-between gap-6">
                              {/* Left Side: Info */}
                              <div className="flex-1 space-y-4">
                                <div className="flex flex-wrap items-center gap-3">
                                  <Badge className={`text-[10px] py-0.5 px-2 font-bold tracking-widest uppercase border ${config.color}`}>
                                    {report.status.replace('-', ' ')}
                                  </Badge>
                                  <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{report.type}</h3>
                                </div>

                                <p className="text-sm text-muted-foreground line-clamp-2 italic">
                                  "{report.description}"
                                </p>

                                <div className="flex flex-wrap items-center gap-6 text-xs text-muted-foreground font-medium">
                                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-primary" /> {report.district}</span>
                                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-primary" /> {report.date}</span>
                                  <span className="flex items-center gap-1.5 font-mono text-primary/80"><Copy className="w-3 h-3" /> {report.id}</span>
                                </div>
                              </div>

                              {/* Right Side: Status Progress */}
                              <div className="md:w-48 space-y-4 flex flex-col justify-center">
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span className="font-bold text-white">Progress</span>
                                  <span className="font-bold text-primary">{report.progress}%</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${report.progress}%` }}
                                    className={`h-full rounded-full bg-primary ${config.glow} shadow-lg`}
                                  />
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground bg-white/[0.03] p-2 rounded-lg border border-white/5">
                                  <MessageSquare className="w-3 h-3 text-primary" />
                                  <span className="truncate">Update: {report.lastUpdate}</span>
                                </div>
                              </div>
                            </div>

                            {/* Expandable Timeline Section */}
                            <AnimatePresence>
                              {isSelected && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="mt-8 pt-8 border-t border-white/5"
                                >
                                  <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Case Timeline</h4>
                                  <div className="relative space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-white/10">
                                    {report.history.map((item, i) => (
                                      <div key={i} className="relative pl-10">
                                        <div className={`absolute left-0 top-1 w-[22px] h-[22px] rounded-full border-2 border-[#020617] flex items-center justify-center z-10 ${i === 0 ? 'bg-primary' : 'bg-muted border-white/20'}`}>
                                          {i === 0 && <CheckCircle className="w-3 h-3 text-white" />}
                                        </div>
                                        <div>
                                          <p className="text-sm font-bold text-white">{item.status}</p>
                                          <p className="text-xs text-muted-foreground">{item.date}</p>
                                        </div>
                                      </div>
                                    ))}
                                    <div className="relative pl-10">
                                      <div className="absolute left-0 top-1 w-[22px] h-[22px] rounded-full bg-muted border-2 border-[#020617] flex items-center justify-center animate-pulse">
                                        <Clock className="w-3 h-3 text-muted-foreground" />
                                      </div>
                                      <div>
                                        <p className="text-sm font-bold text-muted-foreground italic">Current: {report.lastUpdate}</p>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </GlassCard>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Sidebar Summary */}
            <aside className="lg:col-span-4 space-y-6">
              <GlassCard className="p-6 border-white/5 bg-white/[0.01]">
                <div className="flex items-center gap-2 text-primary mb-6">
                  <TrendingUp className="w-5 h-5" />
                  <h3 className="text-sm font-bold uppercase tracking-widest">Impact Summary</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl text-center">
                    <div className="text-2xl font-bold text-white">{INITIAL_REPORTS.length}</div>
                    <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">Total Filed</div>
                  </div>
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center">
                    <div className="text-2xl font-bold text-emerald-500">1</div>
                    <div className="text-[10px] text-emerald-500/80 font-bold uppercase tracking-tight">Resolved</div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-8 border-primary/30 bg-gradient-to-br from-primary/10 to-transparent text-center relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/40 group-hover:scale-110 transition-transform">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Whistleblower Protection</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    Your identity is fully encrypted. If you face any threats, contact our legal help immediately.
                  </p>
                  <Button onClick={() => window.location.href = '/chatbot'} className="w-full bg-white text-black hover:bg-white/90 font-bold h-11">
                    Contact Legal Support
                  </Button>
                </div>
              </GlassCard>
            </aside>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

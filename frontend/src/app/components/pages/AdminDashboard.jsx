import { Header } from '../shared/Header';
import { GlassCard } from '../shared/GlassCard';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  MapPin, 
  Building2,
  Calendar,
  ExternalLink,
  X,
  Send,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const MOCK_REPORTS_INITIAL = [
  {
    id: "SR-8921",
    title: "Unauthorized fee at Land Office",
    category: "Extortion",
    location: "Dhaka",
    status: "Pending",
    date: "2024-05-14",
    description: "Citizens are being asked for an extra 500 BDT for every land registration without any official receipt.",
    reporter: "Anonymous",
    remarks: ""
  },
  {
    id: "SR-8918",
    title: "Embezzlement in Local Road Project",
    category: "Financial Fraud",
    location: "Chittagong",
    status: "In Progress",
    date: "2024-05-12",
    description: "The quality of materials used in the new bypass road is significantly lower than specified in the tender.",
    reporter: "M. Ahmed",
    remarks: "Verification team sent to the site.",
    priority: "Medium",
    evidence: [
      { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1541888941259-79974df19644?w=600', title: 'Road Construction Photo' }
    ]
  },
  {
    id: "SR-8895",
    title: "Fake Medical Certificates Issuance",
    category: "Bribery",
    location: "Sylhet",
    status: "Resolved",
    date: "2024-05-10",
    description: "A clinic staff member was caught issuing medical clearance certificates for a fee of 1000 BDT.",
    reporter: "Anonymous",
    remarks: "Staff member suspended and handed over to police.",
    priority: "Low",
    evidence: [
      { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=600', title: 'Clinic Entry Log' }
    ]
  },
  {
    id: "SR-8872",
    title: "Bypass of Environmental Regulations",
    category: "Policy Violation",
    location: "Gazipur",
    status: "In Progress",
    date: "2024-05-08",
    description: "A local textile factory is dumping untreated waste into the river at night.",
    reporter: "Local Resident",
    remarks: "Notice issued to the factory management.",
    priority: "High",
    evidence: [
      { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1525824236856-8c0a31dfe3be?w=600', title: 'River Pollution Photo' }
    ]
  },
  {
    id: "SR-8850",
    title: "Illegal Sand Extraction Protection",
    category: "Corruption",
    location: "Narsingdi",
    status: "Pending",
    date: "2024-05-05",
    description: "Local influencers are protecting sand lifters on the river bank, despite court orders.",
    reporter: "Anonymous",
    remarks: ""
  }
];

export function AdminDashboard() {
  const [adminName, setAdminName] = useState('Official');
  const [department, setDepartment] = useState('Government Office');
  const [reports, setReports] = useState(MOCK_REPORTS_INITIAL);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  
  // Modal State
  const [newStatus, setNewStatus] = useState('');
  const [adminRemarks, setAdminRemarks] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const savedName = localStorage.getItem('userEmail')?.split('@')[0] || 'Official';
    const savedDept = localStorage.getItem('department') || 'Ministry of Public Administration';
    setAdminName(savedName);
    setDepartment(savedDept);
  }, []);

  const openUpdateModal = (report) => {
    setSelectedReport(report);
    setNewStatus(report.status);
    setAdminRemarks(report.remarks || '');
    setIsUpdateModalOpen(true);
  };

  const handleUpdateStatus = () => {
    setReports(prev => prev.map(r => 
      r.id === selectedReport.id 
        ? { ...r, status: newStatus, remarks: adminRemarks } 
        : r
    ));
    setIsUpdateModalOpen(false);
    setSelectedReport(null);
  };

  const stats = [
    { label: "Total Reports", value: reports.length, icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Pending", value: reports.filter(r => r.status === 'Pending').length, icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { label: "In Progress", value: reports.filter(r => r.status === 'In Progress').length, icon: AlertTriangle, color: "text-primary", bg: "bg-primary/10" },
    { label: "Resolved", value: reports.filter(r => r.status === 'Resolved').length, icon: CheckCircle, color: "text-green-500", bg: "bg-green-500/10" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'In Progress': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Resolved': return 'bg-green-500/10 text-green-500 border-green-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Welcome Header */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Portal</h1>
              <div className="flex items-center gap-2 text-muted-foreground mt-1 text-sm">
                <Building2 className="w-4 h-4" />
                <span>{department}</span>
                <span className="text-border mx-1">|</span>
                <span className="text-primary font-medium">Logged in as: {adminName}</span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-2 bg-card/50 px-3 py-1.5 rounded-full border border-border/50">
              <Calendar className="w-3.5 h-3.5" />
              <span>Shift: General | {new Date().toLocaleDateString()}</span>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <GlassCard key={index} className="p-5 flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Reports Table */}
          <GlassCard className="overflow-hidden border-border/50">
            <div className="p-6 border-b border-border/50 bg-muted/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-bold text-foreground tracking-tight">Active Corruption Reports</h2>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-8 text-xs">Export CSV</Button>
                <Button variant="outline" size="sm" className="h-8 text-xs text-primary border-primary/20 bg-primary/5">Refresh</Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/30 border-b border-border/50">
                    <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">ID</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Incident Title</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Category</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Location</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {reports.map((report) => (
                    <tr key={report.id} className="hover:bg-primary/5 transition-colors group cursor-pointer" onClick={() => openUpdateModal(report)}>
                      <td className="px-6 py-4">
                        <span className="text-xs font-mono text-primary bg-primary/5 px-2 py-0.5 rounded">{report.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-[240px]">
                          <div className="text-sm font-semibold text-foreground truncate">{report.title}</div>
                          <div className="text-[10px] text-muted-foreground mt-0.5">{report.date}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-muted-foreground">{report.category}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5 text-primary/60" />
                          {report.location}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="flex items-center gap-1 text-[11px] font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-primary/20">
                          Take Action <ArrowRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      </main>

      {/* Action Modal */}
      <AnimatePresence>
        {isUpdateModalOpen && selectedReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsUpdateModalOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl"
            >
              <GlassCard className="p-0 border-primary/20 shadow-2xl overflow-hidden">
                {/* Modal Header */}
                <div className="p-6 border-b border-border bg-muted/30 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-primary mb-1">
                      <span>{selectedReport.id}</span>
                      <span className="text-border">•</span>
                      <span>{selectedReport.category}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{selectedReport.title}</h3>
                  </div>
                  <button 
                    onClick={() => setIsUpdateModalOpen(false)}
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                  {/* Report Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Reporter</div>
                      <div className="text-foreground">{selectedReport.reporter}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Location</div>
                      <div className="text-foreground flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-primary" /> {selectedReport.location}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Full Description</div>
                    <div className="text-sm text-foreground bg-muted/30 p-4 rounded-xl leading-relaxed border border-border/50 italic">
                      "{selectedReport.description}"
                    </div>
                  </div>

                  {/* Evidence Gallery Section */}
                  <div className="space-y-3">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider font-bold flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-primary" /> Submitted Evidence
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {selectedReport.evidence && selectedReport.evidence.map((item) => (
                        <div 
                          key={item.id}
                          className="group relative aspect-video rounded-lg overflow-hidden border border-border/50 bg-card/40 cursor-pointer hover:border-primary/50 transition-all"
                          onClick={() => item.type === 'image' && setPreviewImage(item.url)}
                        >
                          {item.type === 'image' ? (
                            <>
                              <img src={item.url} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <ExternalLink className="w-5 h-5 text-white" />
                              </div>
                            </>
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center gap-1 p-2">
                              <FileText className="w-6 h-6 text-primary/60" />
                              <span className="text-[10px] font-bold text-muted-foreground uppercase truncate w-full text-center">{item.title}</span>
                            </div>
                          )}
                        </div>
                      ))}
                      {!selectedReport.evidence && (
                        <div className="col-span-3 py-6 text-center border border-dashed border-border rounded-xl text-muted-foreground text-xs">
                          No evidence attached to this report.
                        </div>
                      )}
                    </div>
                  </div>

                  <hr className="border-border/50" />

                  {/* Update Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-foreground flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-primary" /> Update Status
                      </label>
                      <div className="flex flex-col gap-2">
                        {['Pending', 'In Progress', 'Resolved'].map((status) => (
                          <button
                            key={status}
                            onClick={() => setNewStatus(status)}
                            className={`flex items-center justify-between px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all
                              ${newStatus === status 
                                ? getStatusColor(status) + ' ring-2 ring-primary/20 border-primary/40' 
                                : 'bg-card/40 border-border hover:bg-muted text-muted-foreground'}`}
                          >
                            {status}
                            {newStatus === status && <CheckCircle className="w-4 h-4" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-bold text-foreground flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-primary" /> Admin Remarks
                      </label>
                      <Textarea 
                        placeholder="Add your official response or notes here..."
                        value={adminRemarks}
                        onChange={(e) => setAdminRemarks(e.target.value)}
                        className="h-[120px] bg-input border-border/50 text-sm focus:ring-primary/20"
                      />
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 bg-muted/30 border-t border-border flex justify-end gap-3">
                  <Button variant="ghost" onClick={() => setIsUpdateModalOpen(false)}>Cancel</Button>
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 shadow-lg shadow-primary/20"
                    onClick={handleUpdateStatus}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Changes
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Full Image Preview Lightbox */}
      <AnimatePresence>
        {previewImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewImage(null)}
              className="absolute inset-0 bg-background/95 backdrop-blur-xl" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-full max-h-full shadow-2xl ring-1 ring-white/10"
            >
              <img src={previewImage} alt="Evidence Preview" className="max-w-full max-h-[85vh] rounded-lg" />
              <button 
                onClick={() => setPreviewImage(null)}
                className="absolute -top-4 -right-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

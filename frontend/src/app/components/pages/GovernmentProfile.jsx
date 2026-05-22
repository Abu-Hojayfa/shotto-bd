import { useState } from 'react';
import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';
import { GlassCard } from '../shared/GlassCard';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Download,
  FileText,
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Clock,
  MessageSquare,
  Flag
} from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const mockDepartment = {
  name: 'Dhaka Metropolitan Police - Traffic Division',
  nameBangla: 'ঢাকা মেট্রোপলিটন পুলিশ - ট্রাফিক বিভাগ',
  hierarchy: 'Ministry of Home Affairs → Bangladesh Police → DMP → Traffic Division',
  establishedYear: 1976,
  headOfficer: 'Deputy Commissioner Md. Rahman',
  jurisdiction: 'Dhaka Metropolitan Area',
  contact: {
    phone: '+880-2-9556600',
    email: 'traffic@dmp.gov.bd',
    website: 'www.dmp.gov.bd/traffic',
    address: 'Rajarbagh Police Lines, Dhaka-1217'
  },
  responsibilities: [
    'Traffic management and control in Dhaka city',
    'Enforcement of traffic laws and regulations',
    'Road safety awareness programs',
    'Vehicle inspection and licensing',
    'Investigation of traffic-related incidents'
  ]
};

const activeProjects = [
  {
    id: 1,
    name: 'Smart Traffic Signal System',
    progress: 75,
    budget: 50000000,
    spent: 37500000,
    deadline: '2026-12-31',
    status: 'on-track',
    evidence: 'project-2026-Q1-report.pdf'
  },
  {
    id: 2,
    name: 'CCTV Surveillance Expansion',
    progress: 45,
    budget: 30000000,
    spent: 13500000,
    deadline: '2027-03-31',
    status: 'on-track',
    evidence: 'surveillance-progress-2026.pdf'
  },
  {
    id: 3,
    name: 'Traffic Police Training Program',
    progress: 60,
    budget: 5000000,
    spent: 3000000,
    deadline: '2026-06-30',
    status: 'delayed',
    evidence: 'training-audit-2026.pdf'
  }
];

const financialRecords = [
  {
    id: 1,
    category: 'Personnel Salaries',
    allocated: 120000000,
    spent: 118500000,
    quarter: 'Q1 2026',
    verificationLink: 'payroll-Q1-2026-audit.pdf'
  },
  {
    id: 2,
    category: 'Equipment & Vehicles',
    allocated: 45000000,
    spent: 42300000,
    quarter: 'Q1 2026',
    verificationLink: 'procurement-Q1-2026.pdf'
  },
  {
    id: 3,
    category: 'Infrastructure Maintenance',
    allocated: 25000000,
    spent: 23800000,
    quarter: 'Q1 2026',
    verificationLink: 'maintenance-Q1-2026.pdf'
  },
  {
    id: 4,
    category: 'Public Awareness Campaigns',
    allocated: 8000000,
    spent: 7200000,
    quarter: 'Q1 2026',
    verificationLink: 'campaign-expenses-Q1-2026.pdf'
  }
];

const recentUpdates = [
  {
    id: 1,
    date: '2026-04-05',
    title: 'Traffic Safety Week Successfully Concluded',
    description: 'Completed 7-day awareness campaign with 50,000+ participants across Dhaka',
    evidence: 'safety-week-2026-report.pdf',
    verifiedBy: 'Inspector General of Police'
  },
  {
    id: 2,
    date: '2026-03-28',
    title: 'New Traffic Signal Installation - Mohakhali',
    description: '15 smart traffic signals installed at major intersections',
    evidence: 'mohakhali-project-completion.pdf',
    verifiedBy: 'Chief Engineer, DMP'
  },
  {
    id: 3,
    date: '2026-03-15',
    title: 'Q1 2026 Budget Utilization Report Published',
    description: '94.2% budget utilization with full accountability',
    evidence: 'Q1-2026-financial-audit.pdf',
    verifiedBy: 'Comptroller and Auditor General'
  }
];

export function GovernmentProfile() {
  const [grievanceText, setGrievanceText] = useState('');
  const [requestSubject, setRequestSubject] = useState('');
  const [requestDetails, setRequestDetails] = useState('');

  const handleGrievanceSubmit = () => {
    alert('Grievance submitted successfully. Tracking ID: GRV-2026-' + Math.random().toString(36).substr(2, 6).toUpperCase());
    setGrievanceText('');
  };

  const handleInfoRequest = () => {
    alert('Information request submitted. You will receive a response within 15 working days.');
    setRequestSubject('');
    setRequestDetails('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Department Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <GlassCard className="p-8">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold text-foreground mb-1">
                        {mockDepartment.name}
                      </h1>
                      <p className="text-lg text-muted-foreground mb-3">{mockDepartment.nameBangla}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-primary/10 text-primary border-primary/30">Verified Entity</Badge>
                        <Badge variant="outline">Est. {mockDepartment.establishedYear}</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Hierarchy */}
                  <div className="mb-4 p-4 bg-card/40 border border-border rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Government Hierarchy</p>
                    <p className="text-sm text-foreground font-mono">{mockDepartment.hierarchy}</p>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{mockDepartment.contact.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{mockDepartment.contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <a href="#" className="text-primary hover:text-primary/80">
                        {mockDepartment.contact.website}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{mockDepartment.contact.address}</span>
                    </div>
                  </div>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:w-48">
                  <div className="p-4 bg-card/40 border border-border rounded-lg text-center">
                    <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">1,245</div>
                    <div className="text-xs text-muted-foreground">Personnel</div>
                  </div>
                  <div className="p-4 bg-card/40 border border-border rounded-lg text-center">
                    <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">94.2%</div>
                    <div className="text-xs text-muted-foreground">Efficiency</div>
                  </div>
                </div>
              </div>

              {/* Mandate & Responsibilities */}
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="text-lg font-bold text-foreground mb-3">Core Responsibilities</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {mockDepartment.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          </motion.div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="projects" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 bg-card/40 border border-border">
              <TabsTrigger value="projects">Active Projects</TabsTrigger>
              <TabsTrigger value="financials">Financials</TabsTrigger>
              <TabsTrigger value="updates">Updates</TabsTrigger>
              <TabsTrigger value="data">Data Vault</TabsTrigger>
              <TabsTrigger value="grievance">File Grievance</TabsTrigger>
            </TabsList>

            {/* Active Projects Tab */}
            <TabsContent value="projects" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-4">Live Performance Tracker</h2>
                {activeProjects.map((project, idx) => (
                  <GlassCard key={project.id} className="p-6 mb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-1">{project.name}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            {project.status === 'on-track' ? (
                              <CheckCircle className="w-4 h-4 text-primary" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-yellow-500" />
                            )}
                            <span className={project.status === 'on-track' ? 'text-primary' : 'text-yellow-500'}>
                              {project.status === 'on-track' ? 'On Track' : 'Delayed'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <a
                        href="#"
                        className="flex items-center space-x-1 text-xs text-primary hover:text-primary/80"
                      >
                        <FileText className="w-4 h-4" />
                        <span>{project.evidence}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Project Progress</span>
                        <span className="text-sm font-bold text-primary">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    {/* Budget Information */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-card/40 border border-border rounded-lg">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Total Budget</div>
                        <div className="text-lg font-bold text-foreground">
                          ৳{(project.budget / 1000000).toFixed(1)}M
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Amount Spent</div>
                        <div className="text-lg font-bold text-foreground">
                          ৳{(project.spent / 1000000).toFixed(1)}M
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Utilization</div>
                        <div className="text-lg font-bold text-primary">
                          {((project.spent / project.budget) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </motion.div>
            </TabsContent>

            {/* Financial Disclosure Tab */}
            <TabsContent value="financials" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-4">Financial Disclosure Module</h2>
                <GlassCard className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-foreground mb-4">Q1 2026 Budget Breakdown</h3>
                    <div className="space-y-4">
                      {financialRecords.map((record) => (
                        <div key={record.id} className="border-b border-border last:border-0 pb-4 last:pb-0">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-foreground mb-1">{record.category}</h4>
                              <p className="text-sm text-muted-foreground">{record.quarter}</p>
                            </div>
                            <a
                              href="#"
                              className="flex items-center space-x-1 text-xs text-primary hover:text-primary/80"
                            >
                              <FileText className="w-4 h-4" />
                              <span>Verify</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>

                          <div className="grid grid-cols-3 gap-4 mb-2">
                            <div>
                              <div className="text-xs text-muted-foreground">Allocated</div>
                              <div className="text-sm font-bold text-foreground">
                                ৳{(record.allocated / 1000000).toFixed(1)}M
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground">Spent</div>
                              <div className="text-sm font-bold text-foreground">
                                ৳{(record.spent / 1000000).toFixed(1)}M
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground">Remaining</div>
                              <div className="text-sm font-bold text-primary">
                                ৳{((record.allocated - record.spent) / 1000000).toFixed(1)}M
                              </div>
                            </div>
                          </div>

                          <Progress value={(record.spent / record.allocated) * 100} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-center pt-4 border-t border-border">
                    <Button className="bg-primary hover:bg-primary/90">
                      <Download className="w-4 h-4 mr-2" />
                      Download Complete Financial Statement
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            </TabsContent>

            {/* Updates Tab */}
            <TabsContent value="updates" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-4">Verified Updates & Announcements</h2>
                {recentUpdates.map((update) => (
                  <GlassCard key={update.id} className="p-6 mb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {new Date(update.date).toLocaleDateString()}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2">{update.title}</h3>
                        <p className="text-muted-foreground mb-3">{update.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Verified by: {update.verifiedBy}</span>
                        </div>
                      </div>
                      <a
                        href="#"
                        className="flex items-center space-x-1 text-xs text-primary hover:text-primary/80 flex-shrink-0 ml-4"
                      >
                        <FileText className="w-4 h-4" />
                        <span>{update.evidence}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </GlassCard>
                ))}
              </motion.div>
            </TabsContent>

            {/* Data Vault Tab */}
            <TabsContent value="data" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-4">Open Data Vault</h2>
                <GlassCard className="p-6">
                  <p className="text-muted-foreground mb-6">
                    Download raw datasets for independent analysis and verification. All data is regularly updated and verified.
                  </p>

                  <div className="space-y-3">
                    {[
                      { name: 'Traffic Violation Statistics 2026', size: '2.4 MB', format: 'CSV', updated: '2026-04-01' },
                      { name: 'Budget Allocation & Spending Q1 2026', size: '1.8 MB', format: 'XLSX', updated: '2026-04-01' },
                      { name: 'Personnel Directory & Roles', size: '950 KB', format: 'PDF', updated: '2026-03-15' },
                      { name: 'Road Safety Campaign Data', size: '3.2 MB', format: 'CSV', updated: '2026-03-28' },
                      { name: 'Equipment Inventory & Maintenance', size: '1.5 MB', format: 'XLSX', updated: '2026-04-05' },
                      { name: 'Public Complaint Resolution Metrics', size: '890 KB', format: 'CSV', updated: '2026-04-08' }
                    ].map((dataset, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 bg-card/40 border border-border rounded-lg hover:bg-card/60 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <FileText className="w-8 h-8 text-primary" />
                          <div>
                            <h4 className="font-semibold text-foreground">{dataset.name}</h4>
                            <div className="flex items-center space-x-3 text-xs text-muted-foreground mt-1">
                              <span>{dataset.format}</span>
                              <span>•</span>
                              <span>{dataset.size}</span>
                              <span>•</span>
                              <span>Updated: {dataset.updated}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="border-border">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Data Usage Policy:</strong> All datasets are released under
                      Open Government License. You are free to use, modify, and distribute this data with proper attribution.
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            </TabsContent>

            {/* Grievance Tab */}
            <TabsContent value="grievance" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-4">Citizen Engagement Tools</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* File Grievance */}
                  <GlassCard className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                        <Flag className="w-5 h-5 text-destructive" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">File a Grievance</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Report irregularities, misconduct, or concerns directly to the department
                    </p>
                    <div className="space-y-4">
                      <Textarea
                        placeholder="Describe your grievance in detail... / আপনার অভিযোগ বিস্তারিত লিখুন..."
                        value={grievanceText}
                        onChange={(e) => setGrievanceText(e.target.value)}
                        className="min-h-32 bg-input border-border text-foreground"
                      />
                      <Button
                        onClick={handleGrievanceSubmit}
                        className="w-full bg-destructive hover:bg-destructive/90"
                        disabled={!grievanceText.trim()}
                      >
                        <Flag className="w-4 h-4 mr-2" />
                        Submit Grievance
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        You will receive a tracking ID. Response expected within 7 working days.
                      </p>
                    </div>
                  </GlassCard>

                  {/* Request Information */}
                  <GlassCard className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">Request Information</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Formal RTI (Right to Information) request under Bangladesh RTI Act 2009
                    </p>
                    <div className="space-y-4">
                      <Input
                        placeholder="Subject of your request"
                        value={requestSubject}
                        onChange={(e) => setRequestSubject(e.target.value)}
                        className="bg-input border-border text-foreground"
                      />
                      <Textarea
                        placeholder="Details of information requested..."
                        value={requestDetails}
                        onChange={(e) => setRequestDetails(e.target.value)}
                        className="min-h-24 bg-input border-border text-foreground"
                      />
                      <Button
                        onClick={handleInfoRequest}
                        className="w-full bg-primary hover:bg-primary/90"
                        disabled={!requestSubject.trim() || !requestDetails.trim()}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Submit RTI Request
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        Response mandated within 15 working days as per RTI Act 2009
                      </p>
                    </div>
                  </GlassCard>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}

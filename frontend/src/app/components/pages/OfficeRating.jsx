import { useState } from 'react';
import { Link } from 'react-router';
import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';
import { GlassCard } from '../shared/GlassCard';
import { 
  Search, 
  Star, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  MapPin, 
  ExternalLink,
  Plus,
  X,
  Send,
  MessageSquare,
  Shield,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

const INITIAL_OFFICES = [
  {
    id: 1,
    name: 'Motijheel Police Station',
    location: 'Dhaka',
    rating: 2.3,
    totalReviews: 234,
    avgProcessingTime: '4.5 days',
    bribeFrequency: 'High',
    topIssues: ['Harassment', 'Bribery'],
    category: 'police'
  },
  {
    id: 2,
    name: 'Gulshan Land Office',
    location: 'Dhaka',
    rating: 1.8,
    totalReviews: 456,
    avgProcessingTime: '12 days',
    bribeFrequency: 'Very High',
    topIssues: ['Bribery', 'Delays'],
    category: 'land'
  },
  {
    id: 3,
    name: 'Dhanmondi Hospital',
    location: 'Dhaka',
    rating: 3.7,
    totalReviews: 189,
    avgProcessingTime: '2 hours',
    bribeFrequency: 'Medium',
    topIssues: ['Overcharging'],
    category: 'hospital'
  },
  {
    id: 4,
    name: 'Uttara Traffic Police',
    location: 'Dhaka',
    rating: 2.1,
    totalReviews: 312,
    avgProcessingTime: '1 hour',
    bribeFrequency: 'High',
    topIssues: ['Bribery', 'Harassment'],
    category: 'police'
  },
  {
    id: 5,
    name: 'Mirpur Tax Office',
    location: 'Dhaka',
    rating: 3.2,
    totalReviews: 145,
    avgProcessingTime: '7 days',
    bribeFrequency: 'Low',
    topIssues: ['Delays'],
    category: 'tax'
  }
];

export function OfficeRating() {
  const [offices, setOffices] = useState(INITIAL_OFFICES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  
  // Rating Modal State
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [bribeOffered, setBribeOffered] = useState(null);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredOffices = offices.filter(office => {
    const matchesSearch = office.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = selectedDistrict === 'all' || office.location.toLowerCase() === selectedDistrict;
    const matchesType = selectedType === 'all' || office.category === selectedType;
    return matchesSearch && matchesDistrict && matchesType;
  });

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'text-primary';
    if (rating >= 3) return 'text-yellow-500';
    if (rating >= 2) return 'text-orange-500';
    return 'text-destructive';
  };

  const getBribeColor = (frequency) => {
    if (frequency === 'Very High' || frequency === 'High') return 'text-destructive';
    if (frequency === 'Medium') return 'text-yellow-500';
    return 'text-primary';
  };

  const openRatingModal = (office) => {
    setSelectedOffice(office);
    setIsModalOpen(true);
    setUserRating(0);
    setBribeOffered(null);
    setComment('');
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    if (userRating === 0) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setOffices(prevOffices => prevOffices.map(office => {
      if (office.id === selectedOffice.id) {
        // Calculate new average rating (mock calculation)
        const newTotalReviews = office.totalReviews + 1;
        const newRating = ((office.rating * office.totalReviews) + userRating) / newTotalReviews;
        return {
          ...office,
          totalReviews: newTotalReviews,
          rating: Number(newRating.toFixed(1))
        };
      }
      return office;
    }));
    
    setIsSubmitting(false);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Office Ratings
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
                Real-world transparency data reported by citizens. Check processing times, 
                bribe risks, and overall behavior before visiting.
              </p>
            </div>
            <div className="flex items-center gap-3 bg-primary/5 border border-primary/20 p-4 rounded-2xl">
              <TrendingUp className="w-6 h-6 text-primary" />
              <div>
                <div className="text-sm font-bold text-foreground">Community Driven</div>
                <div className="text-xs text-muted-foreground">Updated every 5 minutes</div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <GlassCard className="p-4 sm:p-6 mb-10 border-border/50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative h-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search by office name (e.g. Police Station, Land Office...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-11 bg-input border-border/50"
                  />
                </div>
              </div>
              <div>
                <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                  <SelectTrigger className="h-11 bg-input border-border/50">
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="all">All Districts</SelectItem>
                    <SelectItem value="dhaka">Dhaka</SelectItem>
                    <SelectItem value="chittagong">Chittagong</SelectItem>
                    <SelectItem value="rajshahi">Rajshahi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="h-11 bg-input border-border/50">
                    <SelectValue placeholder="Office Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="police">Police Stations</SelectItem>
                    <SelectItem value="land">Land Offices</SelectItem>
                    <SelectItem value="hospital">Hospitals</SelectItem>
                    <SelectItem value="tax">Tax Offices</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </GlassCard>

          {/* Office List */}
          <div className="grid grid-cols-1 gap-6">
            {filteredOffices.map((office, index) => (
              <motion.div
                key={office.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <GlassCard className="p-0 overflow-hidden border-border/50 hover:border-primary/30 group transition-all duration-300">
                  <div className="flex flex-col lg:flex-row">
                    {/* Office Info */}
                    <div className="p-6 sm:p-8 flex-1">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                            {office.category}
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {office.name}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 text-primary/60" />
                            <span>{office.location}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                           <div className="flex items-center gap-1.5 px-3 py-1 bg-card border border-border rounded-lg shadow-sm">
                             <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                             <span className={`text-xl font-bold ${getRatingColor(office.rating)}`}>{office.rating}</span>
                           </div>
                           <span className="text-[10px] text-muted-foreground mt-1 font-bold uppercase tracking-wider">{office.totalReviews} REVIEWS</span>
                        </div>
                      </div>

                      {/* Top Issues Chips */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {office.topIssues.map((issue) => (
                          <span
                            key={issue}
                            className="px-3 py-1 bg-destructive/10 border border-destructive/20 rounded-full text-xs font-medium text-destructive"
                          >
                            {issue}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-6">
                        <Button 
                          onClick={() => openRatingModal(office)}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-11 px-8 rounded-xl shadow-lg shadow-primary/20"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Rate this Office
                        </Button>
                        <Link to={`/government-profile/${office.id}`} className="text-sm font-bold text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                          View Details <ExternalLink className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>

                    {/* Metrics Sidebar */}
                    <div className="bg-muted/30 border-l border-border/50 p-6 sm:p-8 lg:w-[320px] flex flex-col justify-center space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <Clock className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-sm font-bold text-muted-foreground">Processing</span>
                          </div>
                          <span className="text-sm font-bold text-foreground">{office.avgProcessingTime}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="p-2 bg-destructive/10 rounded-lg">
                              <AlertTriangle className="w-4 h-4 text-destructive" />
                            </div>
                            <span className="text-sm font-bold text-muted-foreground">Bribe Risk</span>
                          </div>
                          <span className={`text-sm font-bold ${getBribeColor(office.bribeFrequency)}`}>{office.bribeFrequency}</span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-border/50">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground italic">
                           <Shield className="w-3.5 h-3.5" />
                           <span>Official community reports</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Rating Modal */}
      <AnimatePresence>
        {isModalOpen && selectedOffice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg"
            >
              <GlassCard className="p-0 border-primary/20 shadow-2xl overflow-hidden">
                {/* Modal Header */}
                <div className="p-6 border-b border-border bg-muted/30 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Rate this Office</h3>
                    <p className="text-xs text-muted-foreground mt-1">{selectedOffice.name}</p>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>

                <form onSubmit={handleRatingSubmit} className="p-6 space-y-6">
                  {/* Star Rating */}
                  <div className="flex flex-col items-center gap-4 py-4">
                    <label className="text-sm font-bold text-foreground uppercase tracking-widest">Your Rating</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setUserRating(star)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star 
                            className={`w-10 h-10 transition-colors ${
                              star <= (hoverRating || userRating)
                                ? 'fill-yellow-500 text-yellow-500'
                                : 'text-muted border-border'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-primary italic">
                      {userRating === 5 && "Excellent Behavior"}
                      {userRating === 4 && "Good Service"}
                      {userRating === 3 && "Average Experience"}
                      {userRating === 2 && "Poor Service"}
                      {userRating === 1 && "Extreme Corruption/Harassment"}
                    </span>
                  </div>

                  {/* Bribe Question */}
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-foreground flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-destructive" /> Did you face any corruption/bribe request?
                    </label>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setBribeOffered(true)}
                        className={`flex-1 py-3 rounded-xl border text-sm font-bold transition-all ${
                          bribeOffered === true 
                            ? 'bg-destructive/10 border-destructive text-destructive' 
                            : 'bg-card border-border hover:bg-muted text-muted-foreground'
                        }`}
                      >
                        Yes, I did
                      </button>
                      <button
                        type="button"
                        onClick={() => setBribeOffered(false)}
                        className={`flex-1 py-3 rounded-xl border text-sm font-bold transition-all ${
                          bribeOffered === false 
                            ? 'bg-primary/10 border-primary text-primary' 
                            : 'bg-card border-border hover:bg-muted text-muted-foreground'
                        }`}
                      >
                        No, it was clean
                      </button>
                    </div>
                  </div>

                  {/* Comment */}
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-foreground flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-primary" /> Describe your experience (Optional)
                    </label>
                    <Textarea 
                      placeholder="Share what happened during your visit. This helps other citizens..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="h-28 bg-input border-border/50 focus:ring-primary/20 text-sm"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button 
                      type="submit" 
                      disabled={userRating === 0 || isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 rounded-xl shadow-lg shadow-primary/20"
                    >
                      {isSubmitting ? "Submitting..." : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Submit Public Review
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-[10px] text-center text-muted-foreground">
                    🔒 Your review is anonymous and helps maintain transparency.
                  </p>
                </form>
              </GlassCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}

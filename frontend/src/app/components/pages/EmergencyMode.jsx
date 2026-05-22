import { useState, useEffect } from 'react';
import { 
  AlertCircle, 
  Phone, 
  X, 
  Shield, 
  MapPin, 
  Clock, 
  ShieldAlert, 
  Trash2, 
  Mic, 
  Volume2, 
  PhoneOff,
  User,
  Info,
  ChevronRight,
  Gavel
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';

export function EmergencyMode() {
  const navigate = useNavigate();
  const [activeCall, setActiveCall] = useState(null); // '999', '106', etc.
  const [callTimer, setCallTimer] = useState(0);
  const [sosActive, setSosActive] = useState(false);
  const [sosStatus, setSosStatus] = useState('Idle');

  // Call Timer Logic
  useEffect(() => {
    let interval;
    if (activeCall) {
      interval = setInterval(() => {
        setCallTimer(prev => prev + 1);
      }, 1000);
    } else {
      setCallTimer(0);
    }
    return () => clearInterval(interval);
  }, [activeCall]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startSOS = () => {
    setSosActive(true);
    setSosStatus('Scanning GPS...');
    setTimeout(() => setSosStatus('Encrypting Connection...'), 1500);
    setTimeout(() => setSosStatus('Alert Sent to 3 Nearby Units'), 3000);
  };

  const clearSession = () => {
    localStorage.clear();
    navigate('/');
  };

  const legalRights = [
    { id: 1, title: 'Right to Silence', desc: 'You are not obligated to speak without a lawyer present.' },
    { id: 2, title: 'No Warrant, No Entry', desc: 'Authorities must show a valid warrant to enter private property.' },
    { id: 3, title: 'Phone Access', desc: 'You have the right to inform your family about your location.' },
    { id: 4, title: 'No Undue Force', desc: 'The law prohibits physical torture or harassment during inquiry.' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-red-500/30">
      
      {/* Background Warning Effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-red-600 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-900/5 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 max-w-2xl mx-auto px-4 pt-12 pb-24">
        
        {/* Top Actions */}
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={() => navigate('/')}
            className="p-3 bg-card border border-border rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
          <button 
            onClick={clearSession}
            className="flex items-center gap-2 px-4 py-2 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-xs font-bold hover:bg-destructive/20 transition-all"
          >
            <Trash2 className="w-4 h-4" /> Clear All Data
          </button>
        </div>

        {/* SOS Pulse Button */}
        <div className="text-center mb-16">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={startSOS}
            className={`relative w-48 h-48 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-500 ${
              sosActive ? 'border-primary bg-primary/20 shadow-[0_0_50px_rgba(var(--primary-rgb),0.3)]' : 'border-red-600 bg-red-600/10'
            }`}
          >
            {sosActive && (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 rounded-full border-4 border-primary"
              />
            )}
            <ShieldAlert className={`w-16 h-16 mb-2 ${sosActive ? 'text-primary' : 'text-red-600'} animate-pulse`} />
            <span className="text-lg font-black uppercase tracking-tighter text-foreground">
              {sosActive ? 'SOS Active' : 'Press SOS'}
            </span>
            <p className="text-[10px] font-bold text-muted-foreground mt-1 px-4 truncate">
              {sosStatus}
            </p>
          </motion.button>
        </div>

        {/* VoIP Call Options */}
        <div className="space-y-4 mb-12">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest px-1">Internet Hotline (VoIP)</h3>
          
          <button 
            onClick={() => setActiveCall({ name: 'National Emergency Support', num: '999' })}
            className="w-full flex items-center justify-between p-6 bg-card border border-border rounded-2xl hover:bg-muted transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="font-bold text-lg text-foreground">Call 999 Hotline</p>
                <p className="text-xs text-muted-foreground">Emergency Support Service</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </button>

          <button 
            onClick={() => setActiveCall({ name: 'Anti-Corruption Unit', num: '106' })}
            className="w-full flex items-center justify-between p-6 bg-card border border-border rounded-2xl hover:bg-muted transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="font-bold text-lg text-foreground">Call 106 Anti-Corruption</p>
                <p className="text-xs text-muted-foreground">Report live extortion or harassment</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Legal Rights Cards */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest px-1 flex items-center gap-2">
            <Gavel className="w-4 h-4" /> Know Your Rights
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {legalRights.map((right) => (
              <div key={right.id} className="p-4 bg-card border border-border rounded-xl">
                <h4 className="text-sm font-bold text-primary mb-1">{right.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{right.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* VoIP Call Simulation Overlay */}
      <AnimatePresence>
        {activeCall && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-between py-24 px-8"
          >
            <div className="text-center space-y-6">
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-32 h-32 bg-primary/10 rounded-full border-2 border-primary/20 flex items-center justify-center mx-auto"
              >
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-primary" />
                </div>
              </motion.div>
              
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">{activeCall.name}</h2>
                <p className="text-primary font-mono font-bold tracking-widest">{formatTime(callTimer)}</p>
                <p className="text-xs text-muted-foreground mt-4 flex items-center justify-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Internet Call (Secure Line)
                </p>
              </div>
            </div>

            <div className="w-full max-w-xs space-y-12">
              <div className="flex justify-around">
                <button className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors">
                  <Mic className="w-6 h-6 text-foreground" />
                </button>
                <button className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors">
                  <Volume2 className="w-6 h-6 text-foreground" />
                </button>
              </div>

              <button 
                onClick={() => setActiveCall(null)}
                className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:scale-110 transition-transform"
              >
                <PhoneOff className="w-8 h-8 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

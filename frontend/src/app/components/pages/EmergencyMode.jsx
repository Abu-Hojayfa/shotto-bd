import { useState } from 'react';
import { AlertCircle, Phone, X, Shield, MapPin, UserPlus, Users, Info, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';

export function EmergencyMode() {
  const navigate = useNavigate();
  const [alertSent, setAlertSent] = useState(false);

  const sendAlert = () => {
    setAlertSent(true);
    // In real app, this would trigger emergency protocols
  };

  const exitEmergency = () => {
    navigate('/');
  };

  // Sample trusted contacts
  const trustedContacts = [
    { id: 1, name: 'Sarah Khan', initials: 'SK', color: 'bg-blue-500' },
    { id: 2, name: 'Ahmed Ali', initials: 'AA', color: 'bg-green-500' },
    { id: 3, name: 'Fatima Rahim', initials: 'FR', color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Ambient glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 min-h-screen p-4 md:p-6 lg:p-8">
        {/* Exit Button */}
        <button
          onClick={exitEmergency}
          className="fixed top-4 right-4 p-3 bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-full hover:bg-slate-700/80 transition-all duration-300 shadow-lg z-50"
          aria-label="Exit Emergency Mode"
        >
          <X className="w-5 h-5 text-slate-200" />
        </button>

        <div className="max-w-4xl mx-auto space-y-6 pb-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center pt-4"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              🚨 Emergency Mode
            </h1>
            <p className="text-slate-400">
              Instant help when you need it most
            </p>
          </motion.div>

          {/* Main Emergency Button */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              onClick={sendAlert}
              disabled={alertSent}
              className="w-full p-8 md:p-10 bg-gradient-to-br from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:from-green-600 disabled:to-green-700 rounded-3xl transition-all duration-300 shadow-2xl shadow-red-600/40 hover:shadow-red-500/60 group relative overflow-hidden"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-400/0 via-red-400/30 to-red-400/0 group-hover:animate-pulse" />

              <div className="relative">
                <motion.div
                  animate={alertSent ? {} : { scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4"
                >
                  <AlertCircle className="w-12 h-12 text-white" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {alertSent ? '✓ Alert Sent' : 'Send Emergency Alert'}
                </h2>
                <p className="text-lg text-white/90">
                  {alertSent
                    ? 'Authorities and contacts have been notified'
                    : 'One tap to notify authorities and trusted contacts'}
                </p>
              </div>
            </button>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-slate-300 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Call 999 */}
              <a
                href="tel:999"
                className="group relative p-6 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl hover:bg-slate-700/60 hover:border-green-500/50 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center space-x-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-7 h-7 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-2xl font-bold text-white mb-1">999</div>
                    <div className="text-sm text-slate-400">Emergency Services</div>
                  </div>
                </div>
              </a>

              {/* Call 106 */}
              <a
                href="tel:106"
                className="group relative p-6 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl hover:bg-slate-700/60 hover:border-blue-500/50 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center space-x-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Shield className="w-7 h-7 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-2xl font-bold text-white mb-1">106</div>
                    <div className="text-sm text-slate-400">Anti-Corruption Hotline</div>
                  </div>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Trusted Contacts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-6 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-300 flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Trusted Contacts</span>
              </h3>
              <button className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors group">
                <UserPlus className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
              </button>
            </div>
            <div className="flex items-center space-x-3">
              {trustedContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="group relative cursor-pointer"
                  title={contact.name}
                >
                  <div className={`w-12 h-12 ${contact.color} rounded-full flex items-center justify-center text-white font-semibold ring-2 ring-slate-700 hover:ring-white/50 transition-all group-hover:scale-110`}>
                    {contact.initials}
                  </div>
                </div>
              ))}
              <button className="w-12 h-12 border-2 border-dashed border-slate-600 hover:border-blue-400 rounded-full flex items-center justify-center text-slate-500 hover:text-blue-400 transition-all hover:scale-110">
                <UserPlus className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Live Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="p-6 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-300 mb-2">Live Location Sharing</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Your location will be shared with authorities and trusted contacts
                </p>
                {/* Map preview placeholder */}
                <div className="relative h-40 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl overflow-hidden border border-slate-600/50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Navigation className="w-8 h-8 text-emerald-400 animate-pulse" />
                  </div>
                  <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-slate-900/80 backdrop-blur-sm rounded-lg border border-emerald-500/30">
                    <p className="text-xs text-emerald-400 font-medium">📍 Tracking Active</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Alert Behavior Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="p-6 bg-blue-500/10 backdrop-blur-xl border border-blue-500/30 rounded-2xl"
          >
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-300 mb-2">How Emergency Alert Works</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  This alert will notify authorities and your saved contacts instantly.
                  If nearby users are active, they may also receive alerts. Your live location,
                  emergency details, and profile will be shared securely with responders.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Safety Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="p-6 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl"
          >
            <h3 className="text-lg font-semibold text-slate-300 flex items-center space-x-2 mb-4">
              <Shield className="w-5 h-5 text-amber-400" />
              <span>Safety Tips</span>
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li className="flex items-start space-x-3">
                <span className="text-amber-400 flex-shrink-0 mt-0.5">•</span>
                <span>Move to a safe location if possible</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-amber-400 flex-shrink-0 mt-0.5">•</span>
                <span>Avoid confrontation with dangerous individuals</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-amber-400 flex-shrink-0 mt-0.5">•</span>
                <span>Keep this page open until help arrives</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-amber-400 flex-shrink-0 mt-0.5">•</span>
                <span>Emergency services can track your location in real-time</span>
              </li>
            </ul>
          </motion.div>

          {/* Quick Exit */}
          <button
            onClick={exitEmergency}
            className="w-full p-4 bg-slate-800/40 border border-slate-700/30 rounded-xl text-sm text-slate-400 hover:bg-slate-700/40 hover:text-slate-300 transition-all"
          >
            Quick Exit to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}

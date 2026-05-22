import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, AlertCircle, Building2, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { GlassCard } from '../shared/GlassCard';
import { motion } from 'motion/react';

export function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [officialId, setOfficialId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!officialId || !password) {
      setError('অনুগ্রহ করে Official ID এবং Password দিন');
      return;
    }
    // Mock: store admin session
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('isAdmin', 'true');
    localStorage.setItem('officialId', officialId);
    // Will redirect to Govt Dashboard once built
    navigate('/admin-dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-background via-background to-blue-900/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center mb-4 group">
            <div className="relative">
              <Building2 className="w-12 h-12 text-blue-400 transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 blur-xl bg-blue-500/30 group-hover:bg-blue-500/50 transition-all" />
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-1">Government Portal</h1>
          <p className="text-muted-foreground text-sm">Authorized Officials Only — শুধুমাত্র অনুমোদিত কর্মকর্তাদের জন্য</p>
        </div>

        {/* Card */}
        <GlassCard className="p-8" style={{ borderColor: 'rgba(59,130,246,0.2)' }}>
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Official ID */}
            <div className="space-y-2">
              <label htmlFor="officialId" className="text-sm font-medium text-foreground">
                Official Email / Government ID
              </label>
              <Input
                id="officialId"
                type="text"
                placeholder="admin@gov.bd"
                value={officialId}
                onChange={(e) => setOfficialId(e.target.value)}
                className="bg-input border-border text-foreground"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="admin-password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-input border-border text-foreground pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-900/30 mt-2"
            >
              <ShieldCheck className="w-4 h-4 mr-2" />
              Secure Login
            </Button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 pt-5 border-t border-border text-center text-xs text-muted-foreground leading-relaxed">
            🔒 This portal is monitored. Unauthorized access is a punishable offense.
          </div>
        </GlassCard>

        {/* Back to Citizen */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-5 text-center"
        >
          <p className="text-sm text-muted-foreground">
            সাধারণ নাগরিক?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              Citizen Login এ ফিরে যান
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}


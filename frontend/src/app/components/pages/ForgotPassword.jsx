import { useState } from 'react';
import { Link } from 'react-router';
import { Shield, ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { GlassCard } from '../shared/GlassCard';
import { motion } from 'motion/react';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Simulate password reset email
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-background via-background to-primary/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo Section */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center space-x-3 group mb-4">
            <div className="relative">
              <Shield className="w-12 h-12 text-primary transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 blur-xl bg-primary/30 group-hover:bg-primary/50 transition-all" />
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Reset Password</h1>
          <p className="text-muted-foreground">পাসওয়ার্ড রিসেট - We'll send you reset instructions</p>
        </div>

        {/* Reset Card */}
        <GlassCard className="p-8">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center space-y-2 mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-2">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Enter your email address and we'll send you a link to reset your password
                </p>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-input border-border text-foreground"
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Send Reset Link
              </Button>

              {/* Back to Login */}
              <Link
                to="/login"
                className="flex items-center justify-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Login</span>
              </Link>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
                <CheckCircle className="w-12 h-12 text-primary" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Check Your Email</h3>
                <p className="text-sm text-muted-foreground">
                  We've sent a password reset link to
                </p>
                <p className="text-sm font-semibold text-foreground">{email}</p>
              </div>

              <div className="p-4 bg-card/40 border border-border rounded-lg text-left space-y-2">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">Didn't receive the email?</strong>
                </p>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Check your spam folder</li>
                  <li>Verify the email address is correct</li>
                  <li>Wait a few minutes and try again</li>
                </ul>
              </div>

              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="w-full border-border hover:bg-card/60"
              >
                Try Different Email
              </Button>

              <Link
                to="/login"
                className="flex items-center justify-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Login</span>
              </Link>
            </motion.div>
          )}
        </GlassCard>

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Need help?{' '}
            <Link to="/support" className="text-primary hover:text-primary/80 font-semibold">
              Contact support
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

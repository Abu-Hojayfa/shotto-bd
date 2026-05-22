import { useState } from 'react';
import { GlassCard } from '../shared/GlassCard';
import { Button } from '../ui/button';
import { CheckCircle, Copy, Download, ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'motion/react';

export function ConfirmationStep({ reportData }) {
  const [trackingId] = useState(`STB-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
  const [copied, setCopied] = useState(false);

  const copyTrackingId = () => {
    navigator.clipboard.writeText(trackingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <GlassCard className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Report Submitted Successfully!
          </h2>
          <p className="text-lg text-muted-foreground mb-2">
            রিপোর্ট সফলভাবে জমা হয়েছে
          </p>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Your report has been encrypted and securely submitted. Thank you for standing against corruption.
          </p>
        </GlassCard>
      </motion.div>

      {/* Tracking ID */}
      <GlassCard className="p-6 sm:p-8">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-bold text-foreground">Your Tracking ID</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Save this ID to track your report status. Keep it secure and confidential.
        </p>
        
        <div className="flex items-center space-x-2">
          <div className="flex-1 px-4 py-4 bg-card/60 border border-primary/30 rounded-lg font-mono text-lg text-primary">
            {trackingId}
          </div>
          <Button
            onClick={copyTrackingId}
            variant="outline"
            className="px-4 py-4 border-border hover:bg-card/60"
          >
            {copied ? (
              <CheckCircle className="w-5 h-5 text-primary" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </Button>
        </div>
        
        <div className="mt-4 flex items-center space-x-2 text-xs text-muted-foreground">
          <Download className="w-4 h-4" />
          <span>Screenshot this page or write down your tracking ID</span>
        </div>
      </GlassCard>

      {/* Report Summary */}
      <GlassCard className="p-6 sm:p-8">
        <h3 className="text-xl font-bold text-foreground mb-6">Report Summary</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Issue Type</p>
              <p className="text-foreground font-medium capitalize">{reportData.issueType.replace('-', ' ')}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Location</p>
              <p className="text-foreground font-medium">{reportData.district}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Evidence Files</p>
            <p className="text-foreground font-medium">
              {reportData.evidence.length} file(s) uploaded
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Status</p>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
              <span className="text-sm text-yellow-600 dark:text-yellow-400">Under Review</span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Next Steps */}
      <GlassCard className="p-6 sm:p-8">
        <h3 className="text-xl font-bold text-foreground mb-4">What Happens Next?</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-primary">1</span>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">Review & Verification</h4>
              <p className="text-sm text-muted-foreground">
                Our team will review your report within 24-48 hours to verify authenticity.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-primary">2</span>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">Forwarded to Authorities</h4>
              <p className="text-sm text-muted-foreground">
                Verified reports are forwarded to relevant anti-corruption authorities.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-primary">3</span>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">Investigation & Action</h4>
              <p className="text-sm text-muted-foreground">
                Authorities investigate and take appropriate action. Track progress with your ID.
              </p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/profile" className="flex-1">
          <Button
            variant="outline"
            className="w-full px-6 py-6 border-border hover:bg-card/60"
            size="lg"
          >
            Track Report Status
          </Button>
        </Link>
        <Link to="/dashboard" className="flex-1">
          <Button
            className="w-full px-6 py-6 bg-card/60 border border-border hover:bg-card/80"
            size="lg"
          >
            View Dashboard
          </Button>
        </Link>
        <Link to="/" className="flex-1">
          <Button
            className="w-full px-6 py-6 bg-primary hover:bg-primary/90 text-primary-foreground"
            size="lg"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>Back to Home</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </Button>
        </Link>
      </div>

      {/* Security Reminder */}
      <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg text-center">
        <p className="text-sm text-foreground">
          🔒 <span className="font-semibold">Security Reminder:</span> Your report is completely 
          encrypted. Do not share your tracking ID with anyone you don't trust.
        </p>
      </div>
    </div>
  );
}

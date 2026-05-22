import { motion } from 'motion/react';
import { 
  Shield, 
  Lock, 
  FileText, 
  Search, 
  Gavel, 
  UserX, 
  ShieldCheck, 
  TrendingUp 
} from 'lucide-react';
import { GlassCard } from '../shared/GlassCard';

export function CompactFeatures() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything you need for transparency
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A secure, anonymous, and powerful platform to fight corruption together.
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto"
        >
          {/* Main Feature - Large */}
          <motion.div variants={item} className="md:col-span-2 md:row-span-2">
            <GlassCard className="p-8 h-full bg-gradient-to-br from-primary/20 via-background to-background border-primary/20 relative overflow-hidden group">
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Military-Grade Privacy</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We use zero-knowledge architecture and 256-bit AES encryption. 
                    Your identity is never stored, tracked, or shared. Even we can't see who you are.
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <div className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-xs text-primary font-medium">
                    Anonymous
                  </div>
                  <div className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-xs text-primary font-medium">
                    Encrypted
                  </div>
                </div>
              </div>
              {/* Abstract decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            </GlassCard>
          </motion.div>

          {/* Step 1 */}
          <motion.div variants={item}>
            <GlassCard hover className="p-6 h-full flex flex-col gap-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1">01. Report</h4>
                <p className="text-sm text-muted-foreground">Submit evidence securely and anonymously.</p>
              </div>
            </GlassCard>
          </motion.div>

          {/* Step 2 */}
          <motion.div variants={item}>
            <GlassCard hover className="p-6 h-full flex flex-col gap-4">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center text-yellow-500">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1">02. Verify</h4>
                <p className="text-sm text-muted-foreground">Our team reviews and validates your report.</p>
              </div>
            </GlassCard>
          </motion.div>

          {/* Security Badge */}
          <motion.div variants={item} className="md:col-span-1">
            <GlassCard className="p-6 h-full bg-green-500/5 border-green-500/20 flex flex-col items-center justify-center text-center">
              <ShieldCheck className="w-12 h-12 text-green-500 mb-3" />
              <span className="text-sm font-bold text-green-500 uppercase tracking-wider">Trusted System</span>
              <p className="text-xs text-muted-foreground mt-2">Verified by leading cybersecurity experts.</p>
            </GlassCard>
          </motion.div>

          {/* Step 3 */}
          <motion.div variants={item}>
            <GlassCard hover className="p-6 h-full flex flex-col gap-4">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400">
                <Gavel className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1">03. Action</h4>
                <p className="text-sm text-muted-foreground">Authorities take action based on evidence.</p>
              </div>
            </GlassCard>
          </motion.div>

          {/* Real-time Stat */}
          <motion.div variants={item} className="md:col-span-2">
            <GlassCard className="p-6 h-full flex items-center justify-between gap-6 overflow-hidden relative">
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-primary mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase">Live Impact</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground">1,200+ Cases Resolved</h3>
                <p className="text-sm text-muted-foreground mt-1">Transparency is changing lives across the nation.</p>
              </div>
              <div className="relative z-10 hidden sm:block">
                <div className="text-4xl font-bold text-primary/20 select-none">Impact</div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

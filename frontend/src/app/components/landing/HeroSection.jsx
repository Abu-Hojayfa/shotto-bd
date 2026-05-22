import { Link } from 'react-router';
import { Shield, ArrowRight, Lock, Eye } from 'lucide-react';
import { motion } from 'motion/react';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8 sm:space-y-12">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex"
          >
            <div className="inline-flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-primary/10 border border-primary/30 rounded-full">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-xs sm:text-sm text-primary">Secure & Anonymous Reporting Platform</span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 sm:space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">
              Raise Your Voice
              <span className="block mt-2 bg-gradient-to-r from-primary via-primary to-green-400 bg-clip-text text-transparent">
                Safely
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-foreground/90 font-light max-w-3xl mx-auto">
              নিরাপদে আপনার অভিযোগ জানান
            </p>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Bangladesh's first citizen-powered transparency platform. Report corruption, bribery, and government harassment anonymously. Together, we build a corruption-free nation.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <Link
              to="/report"
              className="w-full sm:w-auto group relative px-8 sm:px-10 py-4 sm:py-5 bg-primary text-primary-foreground rounded-xl font-semibold text-base sm:text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Report Corruption Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-card/60 backdrop-blur-md border border-border text-foreground rounded-xl font-semibold text-base sm:text-lg hover:bg-card/80 hover:border-primary/30 transition-all"
            >
              <span className="flex items-center justify-center space-x-2">
                <Eye className="w-5 h-5" />
                <span>View Dashboard</span>
              </span>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 pt-8 sm:pt-12"
          >
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-xs sm:text-sm text-muted-foreground">End-to-End Encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-xs sm:text-sm text-muted-foreground">100% Anonymous</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-primary rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm text-muted-foreground">Verified Platform</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </section>
  );
}

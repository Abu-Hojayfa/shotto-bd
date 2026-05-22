import { Shield, Lock, Eye, Server, UserX, Key } from 'lucide-react';
import { motion } from 'motion/react';
import { GlassCard } from '../shared/GlassCard';

const features = [
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    titleBn: 'সম্পূর্ণ এনক্রিপশন',
    description: 'Your reports are encrypted from the moment you submit them. No one can intercept or read your data.'
  },
  {
    icon: UserX,
    title: '100% Anonymous',
    titleBn: 'সম্পূর্ণ গোপনীয়',
    description: 'We never collect IP addresses, device IDs, or any personally identifiable information.'
  },
  {
    icon: Server,
    title: 'Secure Servers',
    titleBn: 'নিরাপদ সার্ভার',
    description: 'Data stored on military-grade encrypted servers with multiple security layers and redundancy.'
  },
  {
    icon: Eye,
    title: 'No Tracking',
    titleBn: 'কোন ট্র্যাকিং নেই',
    description: 'Zero cookies, no analytics, no third-party scripts. Your privacy is our priority.'
  },
  {
    icon: Key,
    title: 'Secure Access',
    titleBn: 'নিরাপদ অ্যাক্সেস',
    description: 'Track your reports with a unique, encrypted tracking ID. Only you have access.'
  },
  {
    icon: Shield,
    title: 'Legal Protection',
    titleBn: 'আইনি সুরক্ষা',
    description: 'Whistleblower protection laws ensure your safety when reporting corruption.'
  }
];

export function SecuritySection() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">Your Safety First</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Security & Privacy
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Industry-leading security measures to protect your identity and data
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard hover className="p-6 sm:p-8 h-full group">
                <div className="space-y-4">
                  {/* Icon */}
                  <div className="inline-flex p-4 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-primary mb-3">
                      {feature.titleBn}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Additional Security Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 sm:mt-16"
        >
          <GlassCard className="p-8 sm:p-12">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                Your Identity, Your Control
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We've built Shotto BD with privacy-by-design principles. Your reports are processed 
                through multiple layers of encryption, and we use zero-knowledge architecture meaning 
                even our administrators cannot access your personal information. You have the power to 
                speak truth to power, safely and securely.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
                <div className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg">
                  <span className="text-sm text-primary">256-bit AES Encryption</span>
                </div>
                <div className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg">
                  <span className="text-sm text-primary">ISO 27001 Certified</span>
                </div>
                <div className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg">
                  <span className="text-sm text-primary">GDPR Compliant</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

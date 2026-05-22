import { Shield, Lock, Eye, Award } from 'lucide-react';
import { motion } from 'motion/react';

const badges = [
  {
    icon: Lock,
    text: 'End-to-End Encrypted'
  },
  {
    icon: Eye,
    text: 'Anonymous Reporting'
  },
  {
    icon: Shield,
    text: 'Secure Platform'
  },
  {
    icon: Award,
    text: 'Verified & Trusted'
  }
];

export function TrustBadges() {
  return (
    <section className="py-12 sm:py-16 border-y border-border bg-background/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.text}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center space-x-3 group cursor-default"
            >
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <badge.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <span className="text-sm sm:text-base text-muted-foreground group-hover:text-foreground transition-colors">
                {badge.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { FileText, Search, Gavel } from 'lucide-react';
import { motion } from 'motion/react';
import { GlassCard } from '../shared/GlassCard';

const steps = [
  {
    icon: FileText,
    number: '01',
    title: 'Report',
    titleBn: 'রিপোর্ট করুন',
    description: 'Submit your corruption report anonymously with evidence. Your identity remains completely protected.',
    color: 'from-primary to-green-400'
  },
  {
    icon: Search,
    number: '02',
    title: 'Review',
    titleBn: 'পর্যালোচনা',
    description: 'Our verification team reviews and categorizes your report. You can track status with your secure ID.',
    color: 'from-blue-400 to-blue-600'
  },
  {
    icon: Gavel,
    number: '03',
    title: 'Action',
    titleBn: 'ব্যবস্থা নেওয়া',
    description: 'Reports are forwarded to relevant authorities. Public dashboard shows transparency and resolution.',
    color: 'from-purple-400 to-purple-600'
  }
];

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-24 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #00C853 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
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
            <span className="text-sm text-primary">Simple Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to report corruption and create change
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              {/* Connector Line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 left-full w-full h-px bg-gradient-to-r from-primary/50 to-transparent z-0" />
              )}

              <GlassCard className="p-6 sm:p-8 relative z-10 h-full">
                {/* Number Badge */}
                <div className="absolute top-6 right-6 text-6xl font-bold opacity-5">
                  {step.number}
                </div>

                <div className="space-y-6 relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex p-4 bg-gradient-to-br ${step.color} rounded-xl shadow-lg`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                        {step.title}
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        {step.titleBn}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Step Number */}
                  <div className="flex items-center space-x-2">
                    <div className={`w-8 h-8 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center`}>
                      <span className="text-white text-sm font-bold">{step.number}</span>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

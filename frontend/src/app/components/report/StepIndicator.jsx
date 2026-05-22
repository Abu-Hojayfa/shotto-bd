import { Check } from 'lucide-react';
import { motion } from 'motion/react';

const stepNames = [
  'Issue Type',
  'Location',
  'Details',
  'Evidence',
  'Contact',
  'Confirm'
];

export function StepIndicator({ currentStep, totalSteps }) {
  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-primary to-green-400"
          />
        </div>
      </div>

      {/* Step Circles */}
      <div className="flex items-center justify-between mb-4">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                step < currentStep
                  ? 'bg-primary border-primary'
                  : step === currentStep
                  ? 'bg-primary border-primary'
                  : 'bg-background border-border'
              }`}
            >
              {step < currentStep ? (
                <Check className="w-5 h-5 text-primary-foreground" />
              ) : (
                <span
                  className={`text-sm font-semibold ${
                    step === currentStep ? 'text-primary-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {step}
                </span>
              )}
            </div>
            <span className={`text-xs mt-2 hidden sm:block ${
              step === currentStep ? 'text-primary font-semibold' : 'text-muted-foreground'
            }`}>
              {stepNames[step - 1]}
            </span>
          </div>
        ))}
      </div>

      {/* Current Step Name (Mobile) */}
      <div className="sm:hidden text-center">
        <span className="text-sm text-primary font-semibold">
          Step {currentStep}: {stepNames[currentStep - 1]}
        </span>
      </div>
    </div>
  );
}

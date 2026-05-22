import { useState } from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../shared/GlassCard';
import { Banknote, Home, Shield, Hospital, AlertTriangle, Users } from 'lucide-react';
import { Button } from '../ui/button';

const issueTypes = [
  {
    id: 'bribery',
    icon: Banknote,
    title: 'Bribery',
    titleBn: 'ঘুষ',
    description: 'Demanding or accepting bribes for services',
    color: 'from-red-500 to-red-600'
  },
  {
    id: 'land',
    icon: Home,
    title: 'Land Issues',
    titleBn: 'ভূমি সমস্যা',
    description: 'Illegal land grabbing or fraudulent documentation',
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'police',
    icon: Shield,
    title: 'Police Harassment',
    titleBn: 'পুলিশ হয়রানি',
    description: 'Unlawful detention or harassment by police',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'hospital',
    icon: Hospital,
    title: 'Hospital Overcharge',
    titleBn: 'হাসপাতাল ওভারচার্জ',
    description: 'Excessive charging or denial of medical services',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'extortion',
    icon: AlertTriangle,
    title: 'Extortion',
    titleBn: 'চাঁদাবাজি',
    description: 'Forceful extraction of money or property',
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    id: 'other',
    icon: Users,
    title: 'Other',
    titleBn: 'অন্যান্য',
    description: 'Other forms of corruption or harassment',
    color: 'from-green-500 to-green-600'
  }
];

export function IssueTypeStep({ value, onNext }) {
  const [selected, setSelected] = useState(value);

  const handleSelect = (id) => {
    setSelected(id);
  };

  return (
    <GlassCard className="p-6 sm:p-8">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Select Issue Type
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          সমস্যার ধরন নির্বাচন করুন - Choose the type of corruption you want to report
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {issueTypes.map((type, index) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <button
              onClick={() => handleSelect(type.id)}
              className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                selected === type.id
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-card/40 hover:border-primary/50 hover:bg-card/60'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 bg-gradient-to-br ${type.color} rounded-lg`}>
                  <type.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-1">{type.title}</h3>
                  <p className="text-xs text-primary mb-2">{type.titleBn}</p>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => selected && onNext(selected)}
          disabled={!selected}
          className="px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground"
          size="lg"
        >
          Continue
        </Button>
      </div>
    </GlassCard>
  );
}

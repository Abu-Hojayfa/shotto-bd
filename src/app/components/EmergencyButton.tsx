import { AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface EmergencyButtonProps {
  onActivate: () => void;
}

export function EmergencyButton({ onActivate }: EmergencyButtonProps) {
  const [confirmMode, setConfirmMode] = useState(false);

  const handleClick = () => {
    if (!confirmMode) {
      setConfirmMode(true);
      setTimeout(() => setConfirmMode(false), 3000);
    } else {
      onActivate();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleClick}
        className={`group relative flex items-center gap-2 px-4 py-3 rounded-full transition-all shadow-2xl ${
          confirmMode
            ? 'bg-red-500 text-white animate-pulse'
            : 'bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white backdrop-blur-xl border border-red-500/30'
        }`}
      >
        <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full group-hover:bg-red-500/40 transition-all"></div>
        <AlertCircle className="w-5 h-5 relative z-10" />
        <span className="relative z-10 font-semibold text-sm">
          {confirmMode ? 'Tap Again to Confirm' : 'Emergency'}
        </span>
      </button>
    </div>
  );
}

import { useState } from 'react';
import { GlassCard } from '../shared/GlassCard';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { ChevronLeft, Info } from 'lucide-react';

export function DetailsStep({ value, onNext, onBack }) {
  const [description, setDescription] = useState(value);

  const handleNext = () => {
    if (description.trim()) {
      onNext(description);
    }
  };

  return (
    <GlassCard className="p-6 sm:p-8">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Describe the Incident
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          ঘটনার বিবরণ দিন - Provide a detailed description of what happened
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {/* Tips Box */}
        <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-foreground space-y-1">
              <p className="font-semibold">Tips for writing your report:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                <li>Include date and time of the incident</li>
                <li>Mention names of officials involved (if known)</li>
                <li>Describe what was demanded or taken</li>
                <li>Include witnesses (if any)</li>
                <li>Be specific and factual</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Description Input */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-foreground">
            Incident Description / ঘটনার বিবরণ <span className="text-destructive">*</span>
          </Label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Example: On March 5, 2026, at Motijheel Police Station, Officer XYZ demanded 5,000 BDT to release my detained vehicle without any valid reason..."
            className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[300px] resize-none"
          />
          <div className="flex items-center justify-between text-xs">
            <p className="text-muted-foreground">
              Minimum 50 characters recommended
            </p>
            <p className={`${description.length < 50 ? 'text-yellow-500' : 'text-primary'}`}>
              {description.length} characters
            </p>
          </div>
        </div>

        {/* Security Reminder */}
        <div className="p-4 bg-card/40 border border-border rounded-lg">
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-primary">🔒 Security Note:</span> Do not include 
            any information that could identify you personally (phone number, email, national ID, 
            address, etc.) unless you choose to provide it in the next optional step.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button
          onClick={onBack}
          variant="outline"
          className="px-6 py-6 border-border hover:bg-card/60"
          size="lg"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!description.trim()}
          className="px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground"
          size="lg"
        >
          Continue
        </Button>
      </div>
    </GlassCard>
  );
}

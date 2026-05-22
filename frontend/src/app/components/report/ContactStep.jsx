import { useState } from 'react';
import { GlassCard } from '../shared/GlassCard';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { ChevronLeft, Shield, EyeOff } from 'lucide-react';
import { Switch } from '../ui/switch';

export function ContactStep({ value, onNext, onBack }) {
  const [provideContact, setProvideContact] = useState(!!value);
  const [contact, setContact] = useState(value || '');

  const handleNext = () => {
    onNext(provideContact ? contact : undefined);
  };

  return (
    <GlassCard className="p-6 sm:p-8">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Contact Information
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          যোগাযোগের তথ্য - Optional: Provide contact info for follow-up
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {/* Anonymous Toggle */}
        <div className="p-6 bg-card/40 border border-border rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <EyeOff className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Stay Anonymous</h4>
                <p className="text-sm text-muted-foreground">
                  Report without providing contact info
                </p>
              </div>
            </div>
            <Switch
              checked={!provideContact}
              onCheckedChange={(checked) => setProvideContact(!checked)}
            />
          </div>
        </div>

        {/* Contact Form */}
        {provideContact && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-sm text-yellow-600 dark:text-yellow-400">
                ⚠️ <span className="font-semibold">Warning:</span> Providing contact information 
                means you're no longer completely anonymous. Only provide this if you're comfortable 
                being contacted by authorities.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact" className="text-foreground">
                Phone or Email (Optional)
              </Label>
              <input
                type="text"
                id="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="01XXXXXXXXX or email@example.com"
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <p className="text-xs text-muted-foreground">
                This information will be encrypted and only accessible to authorized reviewers
              </p>
            </div>
          </div>
        )}

        {/* Why Provide Contact */}
        <div className="p-6 bg-card/40 border border-border rounded-xl space-y-4">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-primary" />
            <h4 className="font-semibold text-foreground">Why provide contact information?</h4>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground ml-7">
            <li>• Authorities can request additional details if needed</li>
            <li>• You'll receive updates on case progress</li>
            <li>• Increases credibility of the report</li>
            <li>• May be required for legal proceedings</li>
          </ul>
        </div>

        {/* Recommendation */}
        <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
          <p className="text-sm text-foreground">
            <span className="font-semibold text-primary">💡 Recommendation:</span> For low-risk 
            cases (like service delays), providing contact can speed up resolution. For high-risk 
            cases (threats, violence), staying anonymous is recommended.
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
          className="px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground"
          size="lg"
        >
          Continue
        </Button>
      </div>
    </GlassCard>
  );
}

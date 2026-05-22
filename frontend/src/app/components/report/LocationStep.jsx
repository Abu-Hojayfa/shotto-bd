import { useState } from 'react';
import { GlassCard } from '../shared/GlassCard';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { MapPin, ChevronLeft } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const districts = [
  'Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh',
  'Comilla', 'Gazipur', 'Narayanganj', 'Tangail', 'Jamalpur', 'Sherpur', 'Netrokona',
  'Kishoreganj', 'Manikganj', 'Munshiganj', 'Narsingdi', 'Faridpur', 'Gopalganj',
  'Madaripur', 'Rajbari', 'Shariatpur', 'Cox\'s Bazar', 'Feni', 'Khagrachhari'
];

export function LocationStep({ district, location, onNext, onBack }) {
  const [selectedDistrict, setSelectedDistrict] = useState(district);
  const [locationDetails, setLocationDetails] = useState(location);

  const handleNext = () => {
    if (selectedDistrict && locationDetails) {
      onNext(selectedDistrict, locationDetails);
    }
  };

  return (
    <GlassCard className="p-6 sm:p-8">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Location Details
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          স্থান নির্বাচন করুন - Where did this incident occur?
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {/* District Selection */}
        <div className="space-y-2">
          <Label htmlFor="district" className="text-foreground">
            District / জেলা <span className="text-destructive">*</span>
          </Label>
          <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
            <SelectTrigger className="w-full bg-input border-border">
              <SelectValue placeholder="Select your district" />
            </SelectTrigger>
            <SelectContent>
              {districts.map((dist) => (
                <SelectItem key={dist} value={dist}>
                  {dist}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location Details */}
        <div className="space-y-2">
          <Label htmlFor="location" className="text-foreground">
            Specific Location / নির্দিষ্ট স্থান <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <textarea
              id="location"
              value={locationDetails}
              onChange={(e) => setLocationDetails(e.target.value)}
              placeholder="E.g., Motijheel Police Station, Road 5, Block C..."
              className="w-full pl-11 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px] resize-none"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Provide as much detail as possible without revealing your identity
          </p>
        </div>

        {/* Map Placeholder */}
        <div className="relative w-full h-48 bg-gradient-to-br from-background to-muted/20 rounded-xl border border-border overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-2 opacity-50" />
              <p className="text-sm text-muted-foreground">Interactive map</p>
            </div>
          </div>
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)',
            backgroundSize: '40px 40px'
          }} />
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
          disabled={!selectedDistrict || !locationDetails}
          className="px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground"
          size="lg"
        >
          Continue
        </Button>
      </div>
    </GlassCard>
  );
}

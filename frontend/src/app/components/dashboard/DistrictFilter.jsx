import { GlassCard } from '../shared/GlassCard';
import { Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const districts = [
  'All Districts',
  'Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh'
];

export function DistrictFilter({ selected, onChange }) {
  return (
    <GlassCard className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Filter className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Filter by District</h3>
        </div>
        <Select value={selected} onValueChange={onChange}>
          <SelectTrigger className="w-full sm:w-64 bg-input border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {districts.map((district) => (
              <SelectItem key={district} value={district.toLowerCase().replace(' ', '-')}>
                {district}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </GlassCard>
  );
}

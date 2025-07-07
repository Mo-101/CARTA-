
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpRight } from 'lucide-react';

type PostInputProps = {
  onDonate: () => void;
};

const PostInput: React.FC<PostInputProps> = ({ onDonate }) => {
  const [donationAmount, setDonationAmount] = useState('');
  const [healthActorAddress, setHealthActorAddress] = useState('');

  const handleDonate = () => {
    if (donationAmount.trim() && healthActorAddress.trim()) {
      onDonate();
      setDonationAmount('');
      setHealthActorAddress('');
    }
  };

  return (
    <div className="w-full max-w-[600px] mx-auto my-6 glass-morphism rounded-lg p-6">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-2">Support African Health • Earn FLB</h3>
          <p className="text-sm text-gray-400">Direct donations to verified health actors</p>
        </div>
        
        <Input
          placeholder="Health Actor Address (0x...)"
          value={healthActorAddress}
          onChange={(e) => setHealthActorAddress(e.target.value)}
          className="bg-transparent border-gray-600 text-gray-300 placeholder:text-gray-500 focus:border-primary"
        />
        
        <div className="relative">
          <Input
            placeholder="Donation Amount (BNB)"
            type="number"
            step="0.01"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            className="bg-transparent border-gray-600 text-gray-300 placeholder:text-gray-500 focus:border-primary pr-20"
          />
          <Button 
            onClick={handleDonate}
            disabled={!donationAmount.trim() || !healthActorAddress.trim()}
            className="absolute right-2 top-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all rounded-md px-4 py-1 flex items-center gap-2 text-sm"
          >
            <span>Donate</span>
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="text-xs text-gray-500 text-center">
          1 BNB = 1 FLB Token • 70% to health actor, 30% to treasury
        </div>
      </div>
    </div>
  );
};

export default PostInput;

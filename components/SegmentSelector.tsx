
import React from 'react';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';

type SegmentProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
  hasInfo?: boolean;
};

const Segment: React.FC<SegmentProps> = ({ label, isActive, onClick, hasInfo = false }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
        isActive 
          ? "bg-secondary text-white" 
          : "bg-secondary/20 text-gray-300 hover:bg-secondary/30"
      )}
    >
      <div className="flex items-center gap-1.5">
        {isActive && <div className="w-2 h-2 rounded-full bg-blue-500" />}
        <span>{label}</span>
        {hasInfo && <Info className="w-4 h-4 opacity-70" />}
      </div>
    </button>
  );
};

type SegmentSelectorProps = {
  segments: string[];
  activeSegment: string | null;
  onSelectSegment: (segment: string | null) => void;
};

const SegmentSelector: React.FC<SegmentSelectorProps> = ({
  segments,
  activeSegment,
  onSelectSegment,
}) => {
  return (
    <div className="flex items-center justify-center gap-2 py-4 px-2">
      <Segment
        label="All Health Sectors"
        isActive={activeSegment === null}
        onClick={() => onSelectSegment(null)}
      />
      
      {segments.map((segment) => (
        <Segment
          key={segment}
          label={segment}
          isActive={activeSegment === segment}
          onClick={() => onSelectSegment(segment)}
          hasInfo={segment === "Primary Healthcare Centers"}
        />
      ))}
    </div>
  );
};

export default SegmentSelector;

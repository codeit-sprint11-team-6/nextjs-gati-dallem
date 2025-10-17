import { cn } from '@/lib/utils';
import React from 'react';

interface BadgeProps {
  count: number;
  maxCount?: number;
  size?: 'small' | 'large';
  className?: string;
}

const DEFAULT_MAX_COUNT = 99;
const DEFAULT_SIZE = 'small';

const SIZE_CLASSES = {
  small: "w-3 h-3 text-[10px] leading-[11px]", // 12x12px in Figma
  large: "w-5 h-4 text-xs leading-4", // 20x16px in Figma
} as const;

const Badge: React.FC<BadgeProps> = ({ count, maxCount = DEFAULT_MAX_COUNT, size = DEFAULT_SIZE, className }) => {
  if (count <= 0) return null;

  const displayCount = count > maxCount ? `${maxCount}+` : count;

  return (
    <span
      className={cn(
        "bg-[#5865f2] text-white font-semibold flex items-center justify-center rounded-full",
        SIZE_CLASSES[size],
        className
      )}
    >
      {displayCount}
    </span>
  );
};

export default Badge;

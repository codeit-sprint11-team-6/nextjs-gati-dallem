import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface UserProfile {
  teamId: number;
  id: number;
  email: string;
  name: string;
  companyName: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface AvatarProps {
  userProfile?: UserProfile;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const DEFAULT_AVATAR_SIZE = 'medium';

const AVATAR_SIZE_CLASSES = {
  small: "w-8 h-8 text-xs",
  medium: "w-10 h-10 text-sm", 
  large: "w-12 h-12 text-base"
} as const;

export default function Avatar({ userProfile, size = DEFAULT_AVATAR_SIZE, className }: AvatarProps) {

  return (
    <div className={cn(
      "bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border border-gray-300",
      AVATAR_SIZE_CLASSES[size],
      className
    )}>
      {userProfile?.image && userProfile.image.trim() !== '' ? (
        <Image
          src={userProfile.image}
          alt={userProfile.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 32px, (max-width: 1024px) 40px, 48px"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
          <span className="text-white font-semibold">
            {userProfile?.name?.charAt(0) || 'U'}
          </span>
        </div>
      )}
    </div>
  );
}

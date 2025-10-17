import Image from "next/image";
import { cn } from "@/lib/utils";

export interface UserProfile {
  teamId: string | number;
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
  size?: "small" | "medium" | "large" | "x-large";
  type?: "female" | "male";
  className?: string;
}

const DEFAULT_AVATAR_SIZE = "medium";
const DEFAULT_AVATAR_TYPE = "female";

// Figma 디자인에 맞춘 정확한 크기
const AVATAR_SIZE_CLASSES = {
  small: "w-10 h-10", // 40px
  medium: "w-[54px] h-[54px]", // 54px (정확한 Figma 스펙)
  large: "w-16 h-16", // 64px
  "x-large": "w-[114px] h-[114px]", // 114px (정확한 Figma 스펙)
} as const;

export default function Avatar({
  userProfile,
  size = DEFAULT_AVATAR_SIZE,
  type = DEFAULT_AVATAR_TYPE,
  className,
}: AvatarProps) {
  // 사용자 프로필 이미지가 있으면 우선 사용, 없으면 기본 아바타 사용
  const avatarSrc = userProfile?.image || `/image/avatars/${type}.svg`;
  const avatarAlt = userProfile?.name || `${type} avatar`;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full border border-gray-300 bg-white",
        AVATAR_SIZE_CLASSES[size],
        className,
      )}
    >
      <Image
        src={avatarSrc}
        alt={avatarAlt}
        fill
        className={userProfile?.image ? "object-cover" : "object-contain"}
        sizes="(max-width: 768px) 40px, (max-width: 1024px) 54px, 64px"
      />
    </div>
  );
}

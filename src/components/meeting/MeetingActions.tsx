"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Heart, Share2 } from "lucide-react";
import { Gathering } from "@/types/gathering";

interface MeetingActionsProps {
  gathering: Gathering;
  isJoined?: boolean;
  isFavorite?: boolean;
  onJoin?: () => void;
  onLeave?: () => void;
  onToggleFavorite?: () => void;
  onShare?: () => void;
  className?: string;
}

export default function MeetingActions({
  gathering,
  isJoined = false,
  isFavorite = false,
  onJoin,
  onLeave,
  onToggleFavorite,
  onShare,
  className,
}: MeetingActionsProps) {
  const [isJoining, setIsJoining] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const isFull = gathering.participantCount >= gathering.capacity;
  const isRegistrationEnded =
    gathering.registrationEnd && new Date(gathering.registrationEnd) < new Date();

  const handleJoin = async () => {
    if (onJoin) {
      setIsJoining(true);
      try {
        await onJoin();
      } finally {
        setIsJoining(false);
      }
    }
  };

  const handleLeave = async () => {
    if (onLeave) {
      setIsLeaving(true);
      try {
        await onLeave();
      } finally {
        setIsLeaving(false);
      }
    }
  };

  const handleToggleFavorite = () => {
    onToggleFavorite?.();
  };

  const handleShare = () => {
    onShare?.();
  };

  return (
    <div className={cn("", className)}>
      {/* 모든 버튼들을 한 줄에 배치 */}
      <div className="flex items-center gap-4">
        {/* 찜하기 버튼 */}
        <button
          onClick={handleToggleFavorite}
          className={cn(
            "flex h-15 w-15 items-center justify-center rounded-full border-2 transition-colors",
            isFavorite
              ? "border-red-200 bg-red-50 text-red-600"
              : "border-gray-200 bg-white text-gray-600 hover:border-gray-300",
          )}
        >
          <Heart className={cn("h-8 w-8", isFavorite && "fill-current")} />
        </button>

        {/* 취소하기 버튼 (주최자용) */}
        <Button
          onClick={handleLeave}
          disabled={isLeaving}
          variant="outline"
          size="lg"
          className="h-15 flex-1 border-2 border-gray-200 text-lg font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50"
        >
          {isLeaving ? "취소 중..." : "취소하기"}
        </Button>

        {/* 공유하기 버튼 */}
        <Button
          onClick={handleShare}
          size="lg"
          className="h-15 flex-1 bg-green-600 text-lg font-bold text-white hover:bg-green-700"
        >
          <Share2 className="mr-2 h-5 w-5" />
          공유하기
        </Button>
      </div>
    </div>
  );
}

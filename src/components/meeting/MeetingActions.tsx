'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Heart, Calendar, Share2 } from 'lucide-react';
import { Gathering } from '@/types/gathering';

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
  className
}: MeetingActionsProps) {
  const [isJoining, setIsJoining] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const isFull = gathering.participantCount >= gathering.capacity;
  const isRegistrationEnded = gathering.registrationEnd && new Date(gathering.registrationEnd) < new Date();

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
    <div className={cn("space-y-4", className)}>
      {/* 메인 액션 버튼 */}
      <div className="flex flex-col sm:flex-row gap-3">
        {isJoined ? (
          <Button
            onClick={handleLeave}
            disabled={isLeaving}
            variant="outline"
            size="lg"
            className="flex-1"
          >
            <Calendar className="w-4 h-4 mr-2" />
            {isLeaving ? '탈퇴 중...' : '모임 탈퇴'}
          </Button>
        ) : (
          <Button
            onClick={handleJoin}
            disabled={isFull || isRegistrationEnded || isJoining}
            size="lg"
            className="flex-1"
          >
            <Calendar className="w-4 h-4 mr-2" />
            {isJoining ? '참가 신청 중...' : 
             isFull ? '정원 마감' :
             isRegistrationEnded ? '신청 마감' : '모임 참가'}
          </Button>
        )}

        <Button
          onClick={handleToggleFavorite}
          variant={isFavorite ? "default" : "outline"}
          size="lg"
          className="sm:w-auto"
        >
          <Heart className={cn("w-4 h-4 mr-2", isFavorite && "fill-current")} />
          {isFavorite ? '찜함' : '찜하기'}
        </Button>
      </div>

      {/* 보조 액션 버튼 */}
      <div className="flex justify-center">
        <Button
          onClick={handleShare}
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-gray-700"
        >
          <Share2 className="w-4 h-4 mr-2" />
          공유하기
        </Button>
      </div>

      {/* 모임 상태 정보 */}
      <div className="text-center text-sm text-gray-500">
        {isFull && (
          <p className="text-red-600 font-medium">이 모임은 정원이 마감되었습니다.</p>
        )}
        {isRegistrationEnded && (
          <p className="text-red-600 font-medium">참가 신청 기간이 마감되었습니다.</p>
        )}
        {!isFull && !isRegistrationEnded && (
          <p>
            {gathering.capacity - gathering.participantCount}자리가 남았습니다.
          </p>
        )}
      </div>
    </div>
  );
}

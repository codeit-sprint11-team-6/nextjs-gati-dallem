import { cn } from "@/lib/utils";
import { Gathering } from "@/types/gathering";
import { MapPin, Heart, Share2 } from "lucide-react";
import { AlarmTag, ChipInfo } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { Card } from "@/components/common/Card";
import { useState } from "react";

interface MeetingDetailCardProps {
  gathering: Gathering;
  isJoined?: boolean;
  isFavorite?: boolean;
  isHost?: boolean; // 주최자 여부
  onJoin?: () => void;
  onLeave?: () => void;
  onToggleFavorite?: () => void;
  onShare?: () => void;
  className?: string;
}

export default function MeetingDetailCard({
  gathering,
  isJoined = false,
  isFavorite = false,
  isHost = false,
  onJoin,
  onLeave,
  onToggleFavorite,
  onShare,
  className,
}: MeetingDetailCardProps) {
  const [isJoining, setIsJoining] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString("ko-KR", {
        month: "short",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const { date, time } = formatDateTime(gathering.dateTime);
  const isRegistrationEnded =
    gathering.registrationEnd && new Date(gathering.registrationEnd) < new Date();
  const isFullCapacity = gathering.participantCount >= gathering.capacity;

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
    <div
      className={cn(
        "w-full [&>article]:!w-full [&>article]:!max-w-full [&>article]:!min-w-0 [&>article]:!flex-none",
        className,
      )}
    >
      <Card>
        <Card.Detail>
          <div className="flex-between flex h-full flex-col gap-6 p-3">
            {/* 상단 태그와 마감 정보 */}
            <div className="flex-between w-full">
              <div className="flex-start gap-2">
                {/* 마감 알림 태그 */}
                {isRegistrationEnded ? (
                  <div className="flex-start gap-2 rounded-lg bg-pink-50 px-3 py-1.5">
                    <span className="text-sm font-semibold text-pink-600">신청 마감</span>
                  </div>
                ) : (
                  <AlarmTag>오늘 21시 마감</AlarmTag>
                )}

                {/* 날짜/시간 칩 */}
                <ChipInfo>{date}</ChipInfo>
                <ChipInfo>{time}</ChipInfo>
              </div>

              {/* 주최자 크라운 아이콘 (주최자일 때만 표시) */}
              {isHost && (
                <div className="flex h-8 w-8 items-center justify-center">
                  <Image
                    src="/icon/crown.svg"
                    alt="주최자"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                </div>
              )}
            </div>

            {/* 모임 제목과 위치 */}
            <div className="w-full">
              <h1 className="mb-4 text-3xl font-semibold text-gray-900">{gathering.name}</h1>
              <div className="flex-start gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">{gathering.location}</span>
              </div>
            </div>

            {/* 액션 버튼들 */}
            <div className="flex-start w-full gap-4">
              {/* 찜하기 버튼 */}
              <button
                onClick={handleToggleFavorite}
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors",
                  isFavorite
                    ? "border-red-200 bg-red-50 text-purple-600"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300",
                )}
              >
                <Heart className={cn("h-6 w-6", isFavorite && "fill-current")} />
              </button>

              {/* 주최자인 경우 */}
              {isHost ? (
                <>
                  {/* 모임 취소 버튼 (주최자용) */}
                  <Button
                    onClick={handleLeave}
                    disabled={isLeaving}
                    variant="outline"
                    size="lg"
                    className="h-12 flex-1 border-2 border-red-200 text-base font-medium text-red-600 hover:border-red-300 hover:bg-red-50"
                  >
                    {isLeaving ? "취소 중..." : "모임 취소"}
                  </Button>

                  {/* 공유하기 버튼 */}
                  <Button
                    onClick={handleShare}
                    size="lg"
                    className="h-12 flex-1 bg-purple-600 text-base font-bold text-white hover:bg-purple-700"
                  >
                    공유하기
                  </Button>
                </>
              ) : (
                <>
                  {/* 참여/참여 취소 버튼 (참가자용) */}
                  {isJoined ? (
                    <Button
                      onClick={handleLeave}
                      disabled={isLeaving}
                      variant="outline"
                      size="lg"
                      className="h-12 flex-1 border-2 border-purple-200 text-base font-medium text-purple-600 hover:border-purple-300 hover:bg-purple-50"
                    >
                      {isLeaving ? "취소 중..." : "참여 취소"}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleJoin}
                      disabled={isJoining || !!isRegistrationEnded || isFullCapacity}
                      size="lg"
                      className={cn(
                        "h-12 flex-1 text-base font-bold text-white",
                        isRegistrationEnded || isFullCapacity
                          ? "cursor-not-allowed bg-gray-400"
                          : "bg-purple-600 hover:bg-purple-700",
                      )}
                    >
                      {isJoining
                        ? "참여 중..."
                        : isRegistrationEnded
                          ? "신청 마감"
                          : isFullCapacity
                            ? "정원 마감"
                            : "참여하기"}
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </Card.Detail>
      </Card>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Gathering } from "@/types/gathering";
import { AlarmTag, ChipInfo, ConfirmChip } from "@/components/ui/Chip";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { formatDateAndTime, getDeadlineText } from "@/utils/datetime";
import { useAuthStore } from "@/store/authStore";

interface MeetingCardProps {
  gathering: Gathering;
  onJoin?: (id: number) => void;
  className?: string;
}

export default function MeetingCard({ gathering, onJoin, className }: MeetingCardProps) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [date, time] = formatDateAndTime(gathering.dateTime);
  const isConfirmed = gathering.participantCount >= 5;
  const participantPercentage = (gathering.participantCount / gathering.capacity) * 100;
  const deadlineText = getDeadlineText(gathering.registrationEnd);

  const handleJoin = () => {
    // 로그인 체크
    if (!isAuthenticated) {
      router.push("/signin");
      return;
    }
    onJoin?.(gathering.id);
  };

  return (
    <Card className={`flex gap-4 border border-gray-100 p-4 md:min-w-0 ${className ?? ""}`}>
      {/* 이미지 */}
      <div className="relative h-40 w-40 flex-shrink-0 overflow-hidden rounded-2xl border border-gray-100">
        {gathering.image ? (
          <Image src={gathering.image} alt={gathering.name} fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-100 via-purple-50 to-teal-50">
            <span className="text-xl font-bold text-gray-400">같이달램</span>
          </div>
        )}
      </div>

      {/* 내용 */}
      <Card.Detail className="flex min-w-0 flex-1 flex-col justify-between p-0">
        <div className="flex flex-col gap-1.5">
          {/* 타이틀 + 개설확정 칩 */}
          <Card.Title id={gathering.id}>
            <div className="flex items-center gap-2">
              <span className="line-clamp-1 min-w-0 flex-1 text-lg">{gathering.name}</span>
              {isConfirmed && <ConfirmChip isConfirmed={true} />}
            </div>
          </Card.Title>

          {/* 위치 */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>위치</span>
            <span className="text-gray-700">{gathering.location}</span>
          </div>
        </div>

        <div className="flex items-end gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            {/* 날짜 + 시간 + 알람 태그  */}
            <div className="flex items-center gap-1 overflow-hidden">
              <div className="flex flex-shrink-0 items-center gap-2">
                <ChipInfo>{date}</ChipInfo>
                <ChipInfo>{time}</ChipInfo>
              </div>
              {deadlineText && (
                <div className="flex-shrink-0">
                  <AlarmTag>{deadlineText}</AlarmTag>
                </div>
              )}
            </div>

            {/* 참여인원 바 */}
            <div className="flex items-center gap-2">
              <Image src="/icon/person.svg" width={16} height={16} alt="인원" />
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full bg-gradient-to-r from-purple-400 via-purple-500 to-pink-400 transition-all"
                  style={{ width: `${Math.min(participantPercentage, 100)}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-700">
                {gathering.participantCount}/{gathering.capacity}
              </span>
            </div>
          </div>

          <Button
            onClick={handleJoin}
            variant="outline"
            size="md"
            radius="lg"
            className="-mr-4 flex-shrink-0 cursor-pointer whitespace-nowrap"
          >
            참여하기
          </Button>
        </div>
      </Card.Detail>
    </Card>
  );
}

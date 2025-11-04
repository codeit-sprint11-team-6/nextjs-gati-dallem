"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Gathering } from "@/types/gathering";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { AlarmTag, ChipInfo, ConfirmChip } from "@/components/ui/Chip";
import { formatDateAndTime, getDeadlineText } from "@/utils/datetime";
import { useAuthStore } from "@/store/authStore";
import { useOverlay } from "@/hooks/useOverlay";
import MessageModal from "@/components/common/MessageModal";
import { cn } from "@/lib/utils";

interface MeetingCardProps {
  gathering: Gathering;
  onJoin?: (id: number) => void;
  className?: string;
}

export default function MeetingCard({ gathering, onJoin, className }: MeetingCardProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = !!user;
  const { overlay } = useOverlay();
  const [date, time] = formatDateAndTime(gathering.dateTime);
  const isConfirmed = gathering.participantCount >= 5;
  const participantPercentage = (gathering.participantCount / gathering.capacity) * 100;
  const deadlineText = getDeadlineText(gathering.registrationEnd);

  // 참여 불가 조건 확인
  const now = new Date();
  // API에서 받은 시간은 이미 한국 시간이므로 Z를 제거하여 naive datetime으로 처리
  const naiveDateTime = gathering.dateTime.replace(/Z$/, "");
  const isCompleted = new Date(naiveDateTime) < now;
  const isRegistrationClosed = gathering.registrationEnd
    ? new Date(gathering.registrationEnd.replace(/Z$/, "")) < now
    : false;
  const isFull = gathering.participantCount >= gathering.capacity;
  const isDisabled = isCompleted || isRegistrationClosed || isFull;

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // 마감된 모임 클릭 시
    if (isDisabled) {
      let message = "모집이 마감된 모임입니다.";
      if (isCompleted) message = "이미 종료된 모임입니다.";
      else if (isFull) message = "정원이 마감된 모임입니다.";
      overlay(<MessageModal message={message} />);
      return;
    }

    // 로그인 체크
    if (!isAuthenticated) {
      router.push("/signin");
      return;
    }

    // 참여하기
    onJoin?.(gathering.id);
  };

  return (
    <Card gathering={gathering} className={className}>
      <Card.Image />
      <Card.Detail className="flex flex-col gap-3.5 md:gap-4">
        {/* 타이틀 + 개설확정 칩 */}
        <div className="flex items-center gap-1 pr-14">
          <Card.Title className="line-clamp-1 min-w-0 flex-1">{gathering.name}</Card.Title>
          {isConfirmed && <ConfirmChip isConfirmed={true} />}
        </div>

        <div className="flex flex-col items-start justify-between gap-4">
          {/* 위치 */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span>위치</span>
            <span className="text-gray-800 dark:text-gray-300">{gathering.location}</span>
          </div>

          <div className="flex w-full flex-col gap-2.5">
            {/* 날짜 + 시간 + 알람 태그  */}
            <div className="flex items-center gap-2 overflow-hidden">
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

            {/* 참여인원 바 + 참여하기 버튼 */}
            <div className="flex items-center gap-3 md:gap-4">
              <div className="flex flex-1 items-center gap-2">
                <Image className="block dark:hidden" src="/icon/person.svg" width={16} height={16} alt="인원" />
                <Image className="hidden dark:block" src="/icon/person_white.svg" width={16} height={16} alt="인원" />
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                  <div
                    className="h-full bg-gradient-to-r from-purple-400 via-purple-500 to-pink-400 transition-all"
                    style={{ width: `${Math.min(participantPercentage, 100)}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {gathering.participantCount}/{gathering.capacity}
                </span>
              </div>

              <Button
                onClick={handleButtonClick}
                variant={isDisabled ? "outlineSoft" : "primary"}
                size="md"
                radius="lg"
                disabled={isDisabled}
                className="flex-shrink-0 whitespace-nowrap px-4 py-2 text-sm md:px-6 md:py-2.5 md:text-base font-semibold"
              >
                {isFull ? "마감" : isCompleted ? "완료" : isRegistrationClosed ? "마감" : "참여하기"}
              </Button>
            </div>
          </div>
        </div>
      </Card.Detail>
      <Card.LikeButton />
    </Card>
  );
}

/** 모임 카드 스켈레톤 */
export function MeetingCardSkeleton() {
  return (
    <div
      className={cn(
        "relative animate-pulse overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-700",
        "md:flex md:items-start md:justify-start md:gap-6 md:rounded-4xl md:p-6 md:pr-16",
      )}
      aria-label="모임 목록 로딩 중"
    >
      {/* 이미지 */}
      <div className="aspect-[2.2] w-full shrink-0 animate-pulse overflow-hidden bg-slate-200 md:aspect-square md:w-[280px] md:rounded-3xl dark:bg-slate-600" />

      {/* 내용 */}
      <div className="flex-1 p-4 pb-5 md:px-0 md:py-2">
        <div className="flex h-full flex-col justify-between gap-4">
          {/* 타이틀 */}
          <div className="h-7 w-3/4 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-600" />

          {/* 위치 */}
          <div className="h-5 w-32 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-600" />

          {/* 날짜/시간 */}
          <div className="flex gap-2">
            <div className="h-8 w-20 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-600" />
            <div className="h-8 w-16 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-600" />
          </div>

          {/* 참여인원 바 + 버튼 */}
          <div className="flex items-center gap-3">
            <div className="h-6 flex-1 animate-pulse rounded-full bg-slate-200 dark:bg-slate-600" />
            <div className="h-10 w-24 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-600" />
          </div>
        </div>
      </div>
    </div>
  );
}

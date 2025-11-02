"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Gathering } from "@/types/gathering";
import { AlarmTag, ChipInfo, ConfirmChip } from "@/components/ui/Chip";
import { Button } from "@/components/common/Button";
import { formatDateAndTime, getDeadlineText } from "@/utils/datetime";
import { useAuthStore } from "@/store/authStore";
import { useOverlay } from "@/hooks/useOverlay";
import MessageModal from "@/components/common/MessageModal";

interface MeetingCardProps {
  gathering: Gathering;
  onJoin?: (id: number) => void;
  className?: string;
}

export default function MeetingCard({ gathering, onJoin, className }: MeetingCardProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = !!user; // user 존재 여부로 인증 확인
  const { overlay } = useOverlay();
  const [date, time] = formatDateAndTime(gathering.dateTime);
  const isConfirmed = gathering.participantCount >= 5;
  const participantPercentage = (gathering.participantCount / gathering.capacity) * 100;
  const deadlineText = getDeadlineText(gathering.registrationEnd);

  // 참여 불가 조건 확인
  const now = new Date();
  const isCompleted = new Date(gathering.dateTime) < now; // 모임 시간이 지남
  const isRegistrationClosed = gathering.registrationEnd
    ? new Date(gathering.registrationEnd) < now
    : false; // 등록 마감
  const isFull = gathering.participantCount >= gathering.capacity; // 정원 초과
  const isDisabled = isCompleted || isRegistrationClosed || isFull;

  const handleCardClick = (e: React.MouseEvent) => {
    // 마감된 모임 클릭 시 모달 표시하고 이동 방지
    if (isDisabled) {
      e.preventDefault();
      let message = "모집이 마감된 모임입니다.";
      if (isCompleted) message = "이미 종료된 모임입니다.";
      else if (isFull) message = "정원이 마감된 모임입니다.";
      overlay(<MessageModal message={message} />);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Link 이동 방지
    e.stopPropagation(); // 카드 클릭 이벤트 전파 방지

    // 마감된 모임은 참여 불가
    if (isDisabled) return;

    // 로그인 체크
    if (!isAuthenticated) {
      router.push("/signin");
      return;
    }

    // 참여하기
    onJoin?.(gathering.id);
  };

  return (
    <Link href={`/meetings/${gathering.id}`} onClick={handleCardClick}>
      <article
        className={`relative overflow-hidden rounded-3xl bg-white hover:drop-shadow-sm cursor-pointer md:flex md:items-start md:justify-start md:gap-6 md:rounded-4xl md:p-6 md:pr-9 ${className ?? ""}`}
      >
      {/* 이미지 - 마이프로필 카드와 동일한 비율 */}
      <div className="relative aspect-[2.2] overflow-hidden border-1 border-slate-120 md:aspect-square md:w-[170px] md:rounded-3xl">
        {gathering.image ? (
          <Image
            src={gathering.image}
            alt={gathering.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 170px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-100 via-purple-50 to-teal-50">
            <span className="text-lg md:text-xl font-bold text-gray-400">같이달램</span>
          </div>
        )}
      </div>

      {/* 내용 */}
      <div className="flex-2 bg-white p-4 pb-5 md:px-0 md:py-2">
        <div className="flex flex-col gap-3.5 md:gap-4">
          {/* 타이틀 + 개설확정 칩 */}
          <div className="flex items-center gap-2">
            <h3 className="line-clamp-1 min-w-0 flex-1 text-lg md:text-xl font-semibold">{gathering.name}</h3>
            {isConfirmed && <ConfirmChip isConfirmed={true} />}
          </div>

          <div className="flex flex-col items-start justify-between gap-4">
            {/* 위치 */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>위치</span>
              <span className="text-gray-800">{gathering.location}</span>
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

                <Button
                  onClick={handleButtonClick}
                  variant="outline"
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
        </div>
      </div>
    </article>
    </Link>
  );
}

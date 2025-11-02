"use client";

import { Gathering } from "@/types/gathering";
import MeetingCard from "./MeetingCard";
import { useJoinGathering } from "@/apis/gatherings/gatherings.query";
import { useOverlay } from "@/hooks/useOverlay";
import MessageModal from "@/components/common/MessageModal";

interface ListGridProps {
  items: Gathering[];
  className?: string;
}

export default function ListGrid({ items, className }: ListGridProps) {
  const { mutate: joinGathering } = useJoinGathering();
  const { overlay } = useOverlay();

  const handleJoin = (id: number) => {
    joinGathering(id, {
      onSuccess: () => {
        overlay(<MessageModal message="모임 참여가 완료되었습니다!" />);
      },
      onError: (error: any) => {
        // 에러 코드별 메시지
        let errorMessage = "모임 참여에 실패했습니다.";
        if (error?.code === "ALREADY_JOINED") {
          errorMessage = "이미 참여한 모임입니다.";
        } else if (error?.code === "CAPACITY_FULL") {
          errorMessage = "정원이 마감된 모임입니다.";
        } else if (error?.code === "REGISTRATION_CLOSED") {
          errorMessage = "모집이 마감된 모임입니다.";
        } else if (error?.message) {
          errorMessage = error.message;
        }

        overlay(<MessageModal message={errorMessage} />);
      },
    });
  };

  if (!items.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 lg:p-10 text-center text-sm md:text-base text-slate-500">
        조건에 맞는 모임이 없습니다. 필터를 조정해 보세요.
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 gap-4 md:gap-5 lg:gap-6 lg:grid-cols-2 ${className ?? ""}`}>
      {items.map((gathering) => (
        <MeetingCard
          key={gathering.id}
          gathering={gathering}
          onJoin={handleJoin}
        />
      ))}
    </div>
  );
}

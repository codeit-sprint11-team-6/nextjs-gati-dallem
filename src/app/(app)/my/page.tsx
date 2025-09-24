import Chip from "@/components/common/Chip";
import ReservedCardItem from "@/components/my/bookings/ReservedCardItem";
import { ChipInfo, CompletedChip, ConfirmChip } from "@/components/my/ChipState";
import CreatedCardItem from "@/components/my/hosted/CreatedCardItem";
import ReviewCardItem from "@/components/my/reviews/ReviewCardItem";
import Image from "next/image";

const MockData = {
  teamId: "11-6",
  id: 0,
  type: "DALLAEMFIT",
  name: "같이달램 프론트엔드 네트워킹",
  dateTime: "2025-09-23T00:16:21.224Z",
  registrationEnd: "2025-09-23T00:16:21.224Z",
  location: "string",
  participantCount: 0,
  capacity: 0,
  image: "string",
  createdBy: 0,
  canceledAt: "2025-09-23T00:16:21.224Z",
  joinedAt: "2025-09-23T00:16:21.224Z",
  isCompleted: true,
  isReviewed: true,
};

// src/app/(app)/my/page.tsx
export default function MyPage() {
  return (
    <div className="w-full rounded-lg border-1 p-5">
      <div className="flex flex-col items-start justify-center gap-4">
        <div className="flex flex-wrap gap-2">
          <h2 className="heading-2">tag</h2>
          <AlarmTag />
        </div>
        <div className="flex flex-wrap gap-2">
          <h2 className="heading-2">info</h2>
          <ChipInfo />
        </div>
        <div className="flex flex-wrap gap-2">
          <h2 className="heading-2">이용 상태 (brand/disabled)</h2>
          <CompletedChip isCompleted={false} />
          <CompletedChip isCompleted={true} />
        </div>
        <div className="flex flex-wrap gap-2">
          <h2 className="heading-2">개설 상태 (tertiary/outlined)</h2>
          <ConfirmChip isConfirmed={false} />
          <ConfirmChip isConfirmed={true} />
        </div>
        <div className="grid justify-stretch gap-4">
          <ReservedCardItem {...MockData} />
          <ReviewCardItem {...MockData} />
          <CreatedCardItem {...MockData} />
        </div>
      </div>
    </div>
  );
}

export const AlarmTag = () => {
  return (
    <Chip variant="tag">
      <Image src="/icon/alarm.svg" width={24} height={24} alt="태그 아이콘 이미지" />
      <span>오늘 21시 마감</span>
    </Chip>
  );
};

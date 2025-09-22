import Chip from "@/components/common/Chip";
import Image from "next/image";

// src/app/(app)/my/page.tsx
export default function MyPage() {
  return (
    <main className="p-6">
      <h1 className="text-4xl">마이페이지 대시보드</h1>
      <div className="flex justify-center items-start flex-col gap-4">
        <div className="flex gap-2">
          <h2 className="heading-2">tag</h2>
          <AlarmTag />
        </div>
        <div className="flex gap-2">
          <h2 className="heading-2">info</h2>
          <ChipInfo />
        </div>
        <div className="flex gap-2">
          <h2 className="heading-2">이용 상태 (brand/disabled)</h2>
          <CompletedChip isCompleted={false} />
          <CompletedChip isCompleted={true} />
        </div>
        <div className="flex gap-2">
          <h2 className="heading-2">개설 상태 (tertiary/outlined)</h2>
          <ConfirmChip isConfirmed={false} />
          <ConfirmChip isConfirmed={true} />
        </div>
      </div>
    </main>
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
export const ChipInfo = () => {
  return (
    <Chip variant="info">
      <span>17:30</span>
    </Chip>
  );
};
export const CompletedChip = ({ isCompleted = false }: { isCompleted: boolean }) => {
  return isCompleted ? (
    <Chip variant="disabled">이용 완료</Chip>
  ) : (
    <Chip variant="brand">이용 예정</Chip>
  );
};
export const ConfirmChip = ({ isConfirmed = false }: { isConfirmed: boolean }) => {
  return isConfirmed ? (
    <Chip variant="outlined">
      <Image src="/icon/check.svg" width={24} height={24} alt="개설확정 상태표시 아이콘 이미지" />
      <span>개설확정</span>
    </Chip>
  ) : (
    <Chip variant="tertiary">개설대기</Chip>
  );
};

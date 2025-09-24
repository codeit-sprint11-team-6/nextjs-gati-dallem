import Image from "next/image";
import Chip from "../common/Chip";

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

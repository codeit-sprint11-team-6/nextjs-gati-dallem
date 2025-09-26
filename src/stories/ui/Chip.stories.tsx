import Chip, { AlarmTag, ChipInfo, CompletedChip, ConfirmChip } from "@/components/ui/Chip";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/UI/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select" },
    children: { control: { type: "text" } },
    className: { control: { type: "text" } },
  },
} satisfies Meta<typeof Chip>;
export default meta;

type Story = StoryObj<typeof meta>;

export const ChipExample: Story = {
  args: { children: "Example", variant: "default" },
};
/**
 * Chip을 필터로 활용할 때 사용합니다
 *
 * ex. 모임 찾기 페이지 - 모임 필터링, 마이페이지 - 나의 리뷰 필터링
 */
export const Filter: Story = {
  render: () => {
    return (
      <div className="flex-center gap-4">
        <Chip variant="active">전체</Chip>
        <Chip variant="default">네트워킹</Chip>
        <Chip variant="default">세미나</Chip>
      </div>
    );
  },
};
/**
 * 모임 정보를 표시할 때 사용합니다.
 *
 * ex. 모임 찾기 페이지 - 모임 카드
 */
export const Info: Story = {
  render: () => {
    return (
      <div className="flex-center gap-4">
        <ChipInfo>11월 17일</ChipInfo>
        <ChipInfo>17:30</ChipInfo>
      </div>
    );
  },
};
/**
 * 모임 정보를 표시하는 Tag로 활용할 때 사용합니다.
 *
 * ex. 모임 찾기 페이지 - 모임 카드
 */
export const Tag: Story = {
  render: () => {
    return <AlarmTag>오늘 21시 마감</AlarmTag>;
  },
};
/**
 * 모임 상태를 표시할 때 사용합니다.
 *
 * ex. 마이페이지 - 나의 모임 카드
 */
export const GatheringState: Story = {
  render: () => {
    return (
      <div className="flex-center gap-4">
        <CompletedChip />
        <CompletedChip isCompleted={true} />
        <ConfirmChip />
        <ConfirmChip isConfirmed={true} />
      </div>
    );
  },
};

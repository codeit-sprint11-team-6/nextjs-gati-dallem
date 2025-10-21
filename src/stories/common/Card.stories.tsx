import { Card } from "@/components/common/Card";
import { ChipInfo } from "@/components/ui/Chip";
import { mockMyGathering } from "@/mocks/my/mockMyGathering";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Common/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;
export default meta;

type Story = StoryObj<typeof meta>;

/**
 * **Card 컴포넌트의 요소를 조합**하여 커스텀 사용할 수 있으며,
 * 타 UI 컴포넌트와의 결합 또한 가능합니다.
 * - Card 컴포넌트의 요소: Image, Detail, Tags, Title, GatheringDetail ...
 */
export const CustomCardExample: Story = {
  render: () => {
    const { id, name, image } = mockMyGathering[0];
    return (
      <Card>
        <Card.Image image={image ?? undefined} />
        <Card.Detail>
          <div className="flex h-full flex-col items-start justify-between gap-4">
            <Card.Title id={id}>
              <div className="flex gap-1.5 md:gap-2">{name}</div>
            </Card.Title>
            <div className="flex-start gap-2">
              <ChipInfo>XX월 XX일</ChipInfo>
              <ChipInfo>00:00</ChipInfo>
            </div>
            <div className="flex-end w-full">
              <button className="rounded-2xl bg-purple-100 px-6 py-2.5 text-base font-bold text-purple-500">
                리뷰 작성하기
              </button>
            </div>
          </div>
        </Card.Detail>
        <Card.LikeButton isLiked={true} />
      </Card>
    );
  },
};

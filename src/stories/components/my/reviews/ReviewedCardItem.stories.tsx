import ReviewedCardItem from "@/components/my/reviews/reviewed/ReviewedCardItem";
import { mockReviewed } from "@/mocks/my/mockMyReview";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/My/Reviews/ReviewedCardItem",
  component: ReviewedCardItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ReviewedCardItem>;
export default meta;

type Story = StoryObj<typeof meta>;

export const CardReviewed: Story = {
  args: { ...mockReviewed.data[0] },
  render: (args) => (
    <div className="grid justify-stretch gap-4 divide-gray-100">
      <ReviewedCardItem {...args} />
      <ReviewedCardItem {...args} />
    </div>
  ),
};

import UnreviewedCardItem from "@/components/my/reviews/unreviewed/UnreviewedCardItem";
import { mockUnreviewed } from "@/mocks/my/mockMyReview";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/My/Reviews/UnreviewedCardItem",
  component: UnreviewedCardItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UnreviewedCardItem>;
export default meta;

type Story = StoryObj<typeof meta>;

export const CardUnreviewed: Story = {
  args: { ...mockUnreviewed[0] },
};

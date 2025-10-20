import ReservedCardItem from "@/components/my/bookings/ReservedCardItem";
import { mockJoinedGathering } from "@/mocks/my/mockJoinedGathering";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/My/Bookings/ReservedCardItem",
  component: ReservedCardItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ReservedCardItem>;
export default meta;

type Story = StoryObj<typeof meta>;

export const CardReserved: Story = {
  args: { ...mockJoinedGathering[0] },
};

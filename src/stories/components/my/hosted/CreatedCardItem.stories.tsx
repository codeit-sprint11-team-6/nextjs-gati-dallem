import CreatedCardItem from "@/components/my/hosted/CreatedCardItem";
import { mockMyGathering } from "@/mocks/my/mockMyGathering";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/My/Hosted/CreatedCardItem",
  component: CreatedCardItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CreatedCardItem>;
export default meta;

type Story = StoryObj<typeof meta>;

export const CardHosted: Story = {
  args: { ...mockMyGathering[0] },
};

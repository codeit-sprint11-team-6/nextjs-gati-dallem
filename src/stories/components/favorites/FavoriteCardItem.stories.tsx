import FavoriteCardItem from "@/components/favorites/FavoriteCardItem";
import { mockFavoriteGatherings } from "@/mocks/favorites/mockFavorites";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Favorites/FavoriteCardItem",
  component: FavoriteCardItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FavoriteCardItem>;
export default meta;

type Story = StoryObj<typeof meta>;

export const FavoriteCardItemExample: Story = {
  args: { ...mockFavoriteGatherings[0] },
};

import ProfileCard from "@/components/my/profile/ProfileCard";
import { mockProfile } from "@/mocks/my/mockProfile";
import { useAuthStore } from "@/store/authStore";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/My/ProfileCard",
  component: ProfileCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProfileCard>;
export default meta;

type Story = StoryObj<typeof meta>;

export const ProfileCardExample: Story = {
  render: () => {
    useAuthStore.setState({ user: mockProfile });
    return <ProfileCard />;
  },
};

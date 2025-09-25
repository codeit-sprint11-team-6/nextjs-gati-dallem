import type { Meta, StoryObj } from "@storybook/react";
import MeetingActions from "@/components/meeting/MeetingActions";
import { Gathering } from "@/types/gathering";

const meta: Meta<typeof MeetingActions> = {
  title: "Meeting/MeetingActions",
  component: MeetingActions,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockGathering: Gathering = {
  teamId: "1",
  id: 1,
  type: "DALLAEMFIT" as any,
  name: "건대입구 달라임핏 모임",
  dateTime: "2024-01-20T10:00:00Z",
  registrationEnd: "2024-01-19T18:00:00Z",
  location: "건대입구",
  participantCount: 8,
  capacity: 12,
  image: "/images/meeting-placeholder.jpg",
  createdBy: 1,
};

export const Available: Story = {
  args: {
    gathering: mockGathering,
    isJoined: false,
    isFavorite: false,
    onJoin: () => console.log("참가 신청"),
    onToggleFavorite: () => console.log("찜하기 토글"),
    onShare: () => console.log("공유하기"),
  },
};

export const Joined: Story = {
  args: {
    gathering: mockGathering,
    isJoined: true,
    isFavorite: false,
    onLeave: () => console.log("모임 탈퇴"),
    onToggleFavorite: () => console.log("찜하기 토글"),
    onShare: () => console.log("공유하기"),
  },
};

export const Favorite: Story = {
  args: {
    gathering: mockGathering,
    isJoined: false,
    isFavorite: true,
    onJoin: () => console.log("참가 신청"),
    onToggleFavorite: () => console.log("찜하기 토글"),
    onShare: () => console.log("공유하기"),
  },
};

export const FullCapacity: Story = {
  args: {
    gathering: {
      ...mockGathering,
      participantCount: 12,
      capacity: 12,
    },
    isJoined: false,
    isFavorite: false,
    onJoin: () => console.log("참가 신청"),
    onToggleFavorite: () => console.log("찜하기 토글"),
    onShare: () => console.log("공유하기"),
  },
};

export const RegistrationEnded: Story = {
  args: {
    gathering: {
      ...mockGathering,
      registrationEnd: "2024-01-15T18:00:00Z", // 과거 날짜
    },
    isJoined: false,
    isFavorite: false,
    onJoin: () => console.log("참가 신청"),
    onToggleFavorite: () => console.log("찜하기 토글"),
    onShare: () => console.log("공유하기"),
  },
};

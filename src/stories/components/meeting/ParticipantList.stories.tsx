import type { Meta, StoryObj } from "@storybook/react";
import ParticipantList from "@/components/meeting/ParticipantList";
import { GatheringParticipant } from "@/types/gathering";

const meta: Meta<typeof ParticipantList> = {
  title: "Meeting/ParticipantList",
  component: ParticipantList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockParticipants: GatheringParticipant[] = [
  {
    teamId: "1",
    userId: 1,
    gatheringId: 1,
    joinedAt: "2024-01-15T09:00:00Z",
    User: {
      id: 1,
      email: "user1@example.com",
      name: "김철수",
      companyName: "테크스타트업",
      image: "/avatars/male.svg",
    },
  },
  {
    teamId: "1",
    userId: 2,
    gatheringId: 1,
    joinedAt: "2024-01-15T10:00:00Z",
    User: {
      id: 2,
      email: "user2@example.com",
      name: "이영희",
      companyName: "디자인스튜디오",
      image: "/avatars/female.svg",
    },
  },
  {
    teamId: "1",
    userId: 3,
    gatheringId: 1,
    joinedAt: "2024-01-15T11:00:00Z",
    User: {
      id: 3,
      email: "user3@example.com",
      name: "박민수",
      companyName: "마케팅 에이전시",
      image: "/avatars/male.svg",
    },
  },
  {
    teamId: "1",
    userId: 4,
    gatheringId: 1,
    joinedAt: "2024-01-15T12:00:00Z",
    User: {
      id: 4,
      email: "user4@example.com",
      name: "정수진",
      companyName: "금융회사",
      image: "/avatars/female.svg",
    },
  },
  {
    teamId: "1",
    userId: 5,
    gatheringId: 1,
    joinedAt: "2024-01-15T13:00:00Z",
    User: {
      id: 5,
      email: "user5@example.com",
      name: "최현우",
      companyName: "게임회사",
      image: "/avatars/male.svg",
    },
  },
  {
    teamId: "1",
    userId: 6,
    gatheringId: 1,
    joinedAt: "2024-01-15T14:00:00Z",
    User: {
      id: 6,
      email: "user6@example.com",
      name: "한지영",
      companyName: "교육기관",
      image: "/avatars/female.svg",
    },
  },
  {
    teamId: "1",
    userId: 7,
    gatheringId: 1,
    joinedAt: "2024-01-15T15:00:00Z",
    User: {
      id: 7,
      email: "user7@example.com",
      name: "윤태호",
      companyName: "의료기기회사",
      image: "/avatars/male.svg",
    },
  },
  {
    teamId: "1",
    userId: 8,
    gatheringId: 1,
    joinedAt: "2024-01-15T16:00:00Z",
    User: {
      id: 8,
      email: "user8@example.com",
      name: "강미래",
      companyName: "패션브랜드",
      image: "/avatars/female.svg",
    },
  },
  {
    teamId: "1",
    userId: 9,
    gatheringId: 1,
    joinedAt: "2024-01-15T17:00:00Z",
    User: {
      id: 9,
      email: "user9@example.com",
      name: "임동현",
      companyName: "부동산회사",
      image: "/avatars/male.svg",
    },
  },
  {
    teamId: "1",
    userId: 10,
    gatheringId: 1,
    joinedAt: "2024-01-15T18:00:00Z",
    User: {
      id: 10,
      email: "user10@example.com",
      name: "서나연",
      companyName: "미디어회사",
      image: "/avatars/female.svg",
    },
  },
];

export const Default: Story = {
  args: {
    participants: mockParticipants.slice(0, 4),
  },
};

export const ManyParticipants: Story = {
  args: {
    participants: mockParticipants,
    maxDisplay: 8,
  },
};

export const FewParticipants: Story = {
  args: {
    participants: mockParticipants.slice(0, 2),
  },
};

export const NoParticipants: Story = {
  args: {
    participants: [],
  },
};

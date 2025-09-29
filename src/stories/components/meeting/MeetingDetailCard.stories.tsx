import type { Meta, StoryObj } from "@storybook/react";
import MeetingDetailCard from "@/components/meeting/MeetingDetailCard";
import type { Gathering } from "@/types/gathering";

const meta: Meta<typeof MeetingDetailCard> = {
  title: "Components/Meeting/MeetingDetailCard",
  component: MeetingDetailCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    gathering: {
      description: "모임 정보",
    },
    isJoined: {
      control: { type: "boolean" },
      description: "참여 여부",
    },
    isFavorite: {
      control: { type: "boolean" },
      description: "즐겨찾기 여부",
    },
    isHost: {
      control: { type: "boolean" },
      description: "주최자 여부",
    },
    onJoin: {
      action: "join clicked",
      description: "참여 버튼 클릭 시 호출되는 콜백",
    },
    onLeave: {
      action: "leave clicked",
      description: "참여 취소 버튼 클릭 시 호출되는 콜백",
    },
    onToggleFavorite: {
      action: "favorite toggled",
      description: "즐겨찾기 토글 시 호출되는 콜백",
    },
    onShare: {
      action: "share clicked",
      description: "공유 버튼 클릭 시 호출되는 콜백",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockGathering: Gathering = {
  teamId: "team-1",
  id: 1,
  type: "DALLAEMFIT",
  name: "달램핏 클래스",
  dateTime: "2024-01-25T10:00:00.000Z",
  registrationEnd: "2024-01-24T18:00:00.000Z",
  location: "건대입구",
  participantCount: 15,
  capacity: 20,
  image: "/image/profile.svg",
  createdBy: 1,
  canceledAt: null,
};

const upcomingGathering: Gathering = {
  teamId: "team-1",
  id: 2,
  type: "OFFICE_STRETCHING",
  name: "사무직 스트레칭",
  dateTime: "2024-02-15T14:00:00.000Z",
  registrationEnd: "2024-02-14T18:00:00.000Z",
  location: "을지로3가",
  participantCount: 8,
  capacity: 15,
  image: "/image/profile.svg",
  createdBy: 2,
  canceledAt: null,
};

const fullGathering: Gathering = {
  teamId: "team-1",
  id: 3,
  type: "MINDFULNESS",
  name: "명상 세션",
  dateTime: "2024-01-30T19:00:00.000Z",
  registrationEnd: "2024-01-29T18:00:00.000Z",
  location: "신림",
  participantCount: 20,
  capacity: 20,
  image: "/image/profile.svg",
  createdBy: 3,
  canceledAt: null,
};

const canceledGathering: Gathering = {
  teamId: "team-1",
  id: 4,
  type: "WORKATION",
  name: "워케이션 세미나",
  dateTime: "2024-01-20T09:00:00.000Z",
  registrationEnd: "2024-01-19T18:00:00.000Z",
  location: "홍대입구",
  participantCount: 0,
  capacity: 30,
  image: "/image/profile.svg",
  createdBy: 4,
  canceledAt: "2024-01-18T10:00:00.000Z",
};

// 기본 상태 (참여하지 않음, 즐겨찾기 안함)
export const Default: Story = {
  args: {
    gathering: mockGathering,
    isJoined: false,
    isFavorite: false,
  },
};

// 참여한 상태
export const Joined: Story = {
  args: {
    gathering: mockGathering,
    isJoined: true,
    isFavorite: false,
  },
};

// 즐겨찾기한 상태
export const Favorited: Story = {
  args: {
    gathering: mockGathering,
    isJoined: false,
    isFavorite: true,
  },
};

// 참여하고 즐겨찾기한 상태
export const JoinedAndFavorited: Story = {
  args: {
    gathering: mockGathering,
    isJoined: true,
    isFavorite: true,
  },
};

// 다가오는 모임
export const Upcoming: Story = {
  args: {
    gathering: upcomingGathering,
    isJoined: false,
    isFavorite: false,
  },
};

// 정원이 가득 찬 모임
export const Full: Story = {
  args: {
    gathering: fullGathering,
    isJoined: false,
    isFavorite: false,
  },
};

// 취소된 모임
export const Canceled: Story = {
  args: {
    gathering: canceledGathering,
    isJoined: false,
    isFavorite: false,
  },
};

// 사무직 스트레칭
export const OfficeStretching: Story = {
  args: {
    gathering: {
      ...mockGathering,
      type: "OFFICE_STRETCHING",
      name: "사무직 스트레칭",
      location: "을지로3가",
    },
    isJoined: false,
    isFavorite: false,
  },
};

// 명상 세션
export const Mindfulness: Story = {
  args: {
    gathering: {
      ...mockGathering,
      type: "MINDFULNESS",
      name: "명상 세션",
      location: "신림",
    },
    isJoined: false,
    isFavorite: false,
  },
};

// 워케이션 세미나
export const Workation: Story = {
  args: {
    gathering: {
      ...mockGathering,
      type: "WORKATION",
      name: "워케이션 세미나",
      location: "홍대입구",
    },
    isJoined: false,
    isFavorite: false,
  },
};

// 긴 제목의 모임
export const LongTitle: Story = {
  args: {
    gathering: {
      ...mockGathering,
      name: "매우 긴 제목을 가진 달램핏 클래스 - 건강한 몸과 마음을 위한 특별한 시간",
    },
    isJoined: false,
    isFavorite: false,
  },
};

// 이미지가 없는 모임
export const NoImage: Story = {
  args: {
    gathering: {
      ...mockGathering,
      image: undefined,
    },
    isJoined: false,
    isFavorite: false,
  },
};

// 주최자인 경우
export const Host: Story = {
  args: {
    gathering: mockGathering,
    isJoined: true,
    isFavorite: false,
    isHost: true,
  },
};

// 주최자 + 즐겨찾기
export const HostAndFavorited: Story = {
  args: {
    gathering: mockGathering,
    isJoined: true,
    isFavorite: true,
    isHost: true,
  },
};

// 주최자 + 정원 마감
export const HostWithFullCapacity: Story = {
  args: {
    gathering: {
      ...mockGathering,
      participantCount: 20,
      capacity: 20,
    },
    isJoined: true,
    isFavorite: false,
    isHost: true,
  },
};

// 주최자 + 취소된 모임
export const HostWithCanceled: Story = {
  args: {
    gathering: {
      ...mockGathering,
      canceledAt: "2024-01-18T10:00:00.000Z",
    },
    isJoined: true,
    isFavorite: false,
    isHost: true,
  },
};

// 참가자 (크라운 아이콘 없음)
export const Participant: Story = {
  args: {
    gathering: mockGathering,
    isJoined: false,
    isFavorite: false,
    isHost: false,
  },
};

// 참가자 + 참여함
export const ParticipantJoined: Story = {
  args: {
    gathering: mockGathering,
    isJoined: true,
    isFavorite: false,
    isHost: false,
  },
};

// 참가자 + 즐겨찾기
export const ParticipantFavorited: Story = {
  args: {
    gathering: mockGathering,
    isJoined: false,
    isFavorite: true,
    isHost: false,
  },
};

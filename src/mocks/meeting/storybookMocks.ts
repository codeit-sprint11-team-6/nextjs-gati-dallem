import { Gathering, GatheringParticipant } from "@/types/gathering";
import { ReviewList } from "@/types/review";

// Storybook용 Mock 데이터
export const storybookMockGathering: Gathering = {
  teamId: "team-1",
  id: 1,
  type: "DALLAEMFIT",
  name: "건대입구 달라임핏 모임",
  dateTime: "2024-01-25T10:00:00.000Z",
  registrationEnd: "2024-01-24T18:00:00.000Z",
  location: "건대입구",
  participantCount: 15,
  capacity: 20,
  image:
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
  createdBy: 1,
  canceledAt: null,
};

export const storybookMockParticipants: GatheringParticipant[] = [
  {
    teamId: "team-1",
    userId: 1,
    gatheringId: 1,
    joinedAt: "2024-01-20T09:00:00.000Z",
    User: {
      id: 1,
      email: "user1@example.com",
      name: "김철수",
      companyName: "테크스타트업",
      image: "/avatars/male.svg",
    },
  },
  {
    teamId: "team-1",
    userId: 2,
    gatheringId: 1,
    joinedAt: "2024-01-20T10:00:00.000Z",
    User: {
      id: 2,
      email: "user2@example.com",
      name: "이영희",
      companyName: "디자인스튜디오",
      image: "/avatars/female.svg",
    },
  },
  {
    teamId: "team-1",
    userId: 3,
    gatheringId: 1,
    joinedAt: "2024-01-20T11:00:00.000Z",
    User: {
      id: 3,
      email: "user3@example.com",
      name: "박민수",
      companyName: "마케팅 에이전시",
      image: "/avatars/male.svg",
    },
  },
  {
    teamId: "team-1",
    userId: 4,
    gatheringId: 1,
    joinedAt: "2024-01-20T12:00:00.000Z",
    User: {
      id: 4,
      email: "user4@example.com",
      name: "정수진",
      companyName: "금융회사",
      image: "/avatars/female.svg",
    },
  },
  {
    teamId: "team-1",
    userId: 5,
    gatheringId: 1,
    joinedAt: "2024-01-20T13:00:00.000Z",
    User: {
      id: 5,
      email: "user5@example.com",
      name: "최현우",
      companyName: "게임회사",
      image: "/avatars/male.svg",
    },
  },
];

export const storybookMockReviewList: ReviewList = {
  data: [
    {
      teamId: "team-1",
      id: 1,
      score: 5,
      comment: "정말 좋은 경험이었습니다! 강추합니다.",
      createdAt: "2024-01-25T10:30:00.000Z",
      Gathering: {
        teamId: "team-1",
        id: 1,
        type: "DALLAEMFIT",
        name: "건대입구 달라임핏 모임",
        dateTime: "2024-01-25T10:00:00.000Z",
        location: "건대입구",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
      },
      User: { teamId: "team-1", id: 1, name: "김철수", image: "/avatars/male.svg" },
    },
    {
      teamId: "team-1",
      id: 2,
      score: 4,
      comment: "만족스러운 수업이었어요. 다음에도 참여하고 싶습니다.",
      createdAt: "2024-01-24T15:20:00.000Z",
      Gathering: {
        teamId: "team-1",
        id: 1,
        type: "DALLAEMFIT",
        name: "건대입구 달라임핏 모임",
        dateTime: "2024-01-25T10:00:00.000Z",
        location: "건대입구",
        image:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
      },
      User: { teamId: "team-1", id: 2, name: "이영희", image: "/avatars/female.svg" },
    },
  ],
  totalItemCount: 25,
  currentPage: 1,
  totalPages: 3,
};

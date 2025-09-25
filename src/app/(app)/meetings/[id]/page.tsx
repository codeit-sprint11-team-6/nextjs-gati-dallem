"use client";

import { useParams } from "next/navigation";
import MeetingDetailHeader from "@/components/meeting/MeetingDetailHeader";
import MeetingDetailContent from "@/components/meeting/MeetingDetailContent";
import MeetingActions from "@/components/meeting/MeetingActions";
import ParticipantList from "@/components/meeting/ParticipantList";
import ReviewSection from "@/components/meeting/ReviewSection";
import { useAuthStore } from "@/store/authStore";
import { useState, useEffect } from "react";
import { Gathering, GatheringParticipant } from "@/types/gathering";

// Mock 데이터
const mockGatherings: Record<number, Gathering> = {
  1: {
    teamId: "1",
    id: 1,
    type: "DALLAEMFIT",
    name: "건대입구 달라임핏 모임",
    dateTime: "2024-01-20T10:00:00Z",
    registrationEnd: "2024-01-19T18:00:00Z",
    location: "건대입구",
    participantCount: 8,
    capacity: 12,
    image: undefined,
    createdBy: 1,
  },
  2: {
    teamId: "1",
    id: 2,
    type: "OFFICE_STRETCHING",
    name: "홍대 스트레칭 모임",
    dateTime: "2024-01-21T14:00:00Z",
    registrationEnd: "2024-01-20T18:00:00Z",
    location: "홍대입구",
    participantCount: 5,
    capacity: 10,
    image: undefined,
    createdBy: 2,
  },
  3: {
    teamId: "1",
    id: 3,
    type: "MINDFULNESS",
    name: "신림 마인드풀니스 모임",
    dateTime: "2024-01-22T09:00:00Z",
    registrationEnd: "2024-01-21T18:00:00Z",
    location: "신림",
    participantCount: 3,
    capacity: 8,
    image: undefined,
    createdBy: 3,
  },
};

const mockParticipants: Record<number, GatheringParticipant[]> = {
  1: [
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
  ],
  2: [
    {
      teamId: "1",
      userId: 4,
      gatheringId: 2,
      joinedAt: "2024-01-16T09:00:00Z",
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
      gatheringId: 2,
      joinedAt: "2024-01-16T10:00:00Z",
      User: {
        id: 5,
        email: "user5@example.com",
        name: "최현우",
        companyName: "게임회사",
        image: "/avatars/male.svg",
      },
    },
  ],
  3: [
    {
      teamId: "1",
      userId: 6,
      gatheringId: 3,
      joinedAt: "2024-01-17T09:00:00Z",
      User: {
        id: 6,
        email: "user6@example.com",
        name: "한지영",
        companyName: "교육기관",
        image: "/avatars/female.svg",
      },
    },
  ],
};

export default function MeetingDetailPage() {
  const params = useParams();
  const meetingId = parseInt(params.id as string);

  const { user } = useAuthStore();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [gathering, setGathering] = useState<Gathering | null>(null);
  const [participants, setParticipants] = useState<GatheringParticipant[]>([]);

  // Mock 데이터 로딩 시뮬레이션
  useEffect(() => {
    const loadMockData = async () => {
      setIsLoading(true);

      // 1초 지연으로 로딩 상태 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockGathering = mockGatherings[meetingId];
      const mockParticipantList = mockParticipants[meetingId] || [];

      setGathering(mockGathering || null);
      setParticipants(mockParticipantList);
      setIsLoading(false);
    };

    loadMockData();
  }, [meetingId]);

  // 사용자가 참가했는지 확인
  const isJoined = participants.some((p) => p.userId === user?.id);

  const handleJoin = async () => {
    console.log("모임 참가 신청:", meetingId);
    // Mock: 참가자 수 증가
    if (gathering) {
      setGathering({
        ...gathering,
        participantCount: gathering.participantCount + 1,
      });
    }
  };

  const handleLeave = async () => {
    console.log("모임 탈퇴:", meetingId);
    // Mock: 참가자 수 감소
    if (gathering) {
      setGathering({
        ...gathering,
        participantCount: Math.max(0, gathering.participantCount - 1),
      });
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: API 연동
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: gathering?.name,
        text: `${gathering?.name} 모임에 참가해보세요!`,
        url: window.location.href,
      });
    } else {
      // 클립보드에 URL 복사
      navigator.clipboard.writeText(window.location.href);
      alert("링크가 클립보드에 복사되었습니다.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoading && !gathering) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">모임을 찾을 수 없습니다</h1>
          <p className="text-gray-600 mb-8">요청하신 모임이 존재하지 않거나 삭제되었습니다.</p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            이전 페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2 space-y-8">
            <MeetingDetailHeader gathering={gathering} />
            <MeetingDetailContent gathering={gathering} />
            <ParticipantList participants={participants} />
            <ReviewSection reviews={[]} averageRating={0} totalReviews={0} />
          </div>

          {/* 사이드바 - 액션 버튼 */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <MeetingActions
                gathering={gathering}
                isJoined={isJoined}
                isFavorite={isFavorite}
                onJoin={handleJoin}
                onLeave={handleLeave}
                onToggleFavorite={handleToggleFavorite}
                onShare={handleShare}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

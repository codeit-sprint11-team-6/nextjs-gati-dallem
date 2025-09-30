"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import MeetingDetailCard from "@/components/meeting/MeetingDetailCard";
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
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
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
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop&crop=center",
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
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center",
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

  // Mock 데이터 로딩
  useEffect(() => {
    const loadMockData = async () => {
      setIsLoading(true);

      // 즉시 로딩 (지연 제거)
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
      <div className="min-h-screen" style={{ backgroundColor: "var(--color-gray-50)" }}>
        <div className="container-custom py-8">
          <div className="animate-pulse">
            <div
              className="mb-4 h-8 w-3/4 rounded"
              style={{ backgroundColor: "var(--color-gray-200)" }}
            ></div>
            <div
              className="mb-8 h-4 w-1/2 rounded"
              style={{ backgroundColor: "var(--color-gray-200)" }}
            ></div>
            <div
              className="mb-8 h-64 rounded"
              style={{ backgroundColor: "var(--color-gray-200)" }}
            ></div>
            <div className="space-y-4">
              <div
                className="h-4 rounded"
                style={{ backgroundColor: "var(--color-gray-200)" }}
              ></div>
              <div
                className="h-4 w-5/6 rounded"
                style={{ backgroundColor: "var(--color-gray-200)" }}
              ></div>
              <div
                className="h-4 w-4/6 rounded"
                style={{ backgroundColor: "var(--color-gray-200)" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoading && !gathering) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ backgroundColor: "var(--color-gray-50)" }}
      >
        <div className="text-center">
          <h1 className="heading-2 mb-4" style={{ color: "var(--color-gray-900)" }}>
            모임을 찾을 수 없습니다
          </h1>
          <p className="body-regular mb-8" style={{ color: "var(--color-gray-600)" }}>
            요청하신 모임이 존재하지 않거나 삭제되었습니다.
          </p>
          <button onClick={() => window.history.back()} className="btn-primary px-6 py-2">
            이전 페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto mt-10 max-w-7xl px-4">
        {/* 메인 콘텐츠 영역 */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* 왼쪽: 모임 이미지 */}
          <div className="relative">
            {gathering!.image ? (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl sm:aspect-auto sm:h-full">
                <Image
                  src={gathering!.image}
                  alt={gathering!.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-3xl bg-gray-200">
                <div className="text-center">
                  <div className="mb-4 text-6xl">🏃‍♀️</div>
                  <p className="text-lg text-gray-500">모임 이미지</p>
                </div>
              </div>
            )}
          </div>

          {/* 오른쪽: 모임 정보와 참가자 정보 */}
          <div className="space-y-6">
            {/* 모임 정보 카드 */}
            <MeetingDetailCard
              gathering={gathering!}
              isJoined={isJoined}
              isFavorite={isFavorite}
              onJoin={handleJoin}
              onLeave={handleLeave}
              onToggleFavorite={handleToggleFavorite}
              onShare={handleShare}
            />

            {/* 참가자 정보 섹션 */}
            <div className="rounded-3xl border bg-gradient-to-r from-green-50 to-teal-50 hover:border-pink-200">
              <ParticipantList participants={participants} />
            </div>
          </div>
        </div>

        {/* 리뷰 섹션 - 전체 너비 */}
        <div className="mt-16 rounded-3xl">
          <ReviewSection reviews={[]} averageRating={0} totalReviews={0} />
        </div>
      </div>
    </div>
  );
}

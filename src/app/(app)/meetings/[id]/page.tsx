"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import MeetingDetailCard from "@/components/meeting/MeetingDetailCard";
import ParticipantList from "@/components/meeting/ParticipantList";
import ReviewSection from "@/components/meeting/ReviewSection";
import { selectUser, useAuthStore } from "@/store/authStore";
import { useFavoriteStore } from "@/store/favoriteStore";
import { useFavoriteToggle } from "@/apis/favorites/favorites.query";
import { useRequireAuthAction } from "@/hooks/auths/useRequireAuthAction";
import { useOverlay } from "@/hooks/useOverlay";
import LoginModal from "@/components/common/LoginModal";
import { useState } from "react";
import {
  useGatheringDetail,
  useParticipants,
  useJoinGathering,
  useLeaveGathering,
} from "@/apis/gatherings/gatherings.query";
import { useReviews } from "@/apis/reviews/reviews.query";

export default function MeetingDetailPage() {
  const params = useParams();
  const meetingId = parseInt(params.id as string);

  const user = useAuthStore(selectUser);
  const { mutate: toggleFavoriteMutation } = useFavoriteToggle(user?.id, meetingId);
  const { overlay } = useOverlay();
  const { requireAuthAction } = useRequireAuthAction({
    redirectOnBlocked: false,
    onBlocked: () => {
      overlay(<LoginModal />);
    },
  });
  const [currentPage, setCurrentPage] = useState(1);

  // 찜하기 상태 확인 - favorites 객체를 직접 구독하여 즉시 리렌더링 보장
  const isFavorite = useFavoriteStore((state) => {
    if (!user?.id) return false;
    const uid = String(user.id);
    return state.favorites[uid]?.ids.includes(meetingId) ?? false;
  });

  // 실제 API 호출
  const { data: gathering, isLoading: gatheringLoading } = useGatheringDetail(meetingId);
  const { data: participants = [], isLoading: participantsLoading } = useParticipants(meetingId);
  const { data: reviewList, isLoading: reviewsLoading } = useReviews({
    gatheringId: meetingId,
    offset: (currentPage - 1) * 10, // 페이지당 10개 아이템으로 가정
  });

  // Mutation hooks
  const joinMutation = useJoinGathering();
  const leaveMutation = useLeaveGathering();

  const isLoading = gatheringLoading || participantsLoading || reviewsLoading;

  // 사용자가 참가했는지 확인
  const isJoined = participants.some((p) => p.userId === user?.id);

  const handleJoin = async () => {
    try {
      await joinMutation.mutateAsync(meetingId);
      console.log("모임 참가 성공:", meetingId);
    } catch (error) {
      console.error("모임 참가 실패:", error);
    }
  };

  const handleLeave = async () => {
    try {
      await leaveMutation.mutateAsync(meetingId);
      console.log("모임 탈퇴 성공:", meetingId);
    } catch (error) {
      console.error("모임 탈퇴 실패:", error);
    }
  };

  const handleToggleFavorite = requireAuthAction(() => {
    toggleFavoriteMutation();
  });

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(`리뷰 페이지 ${page}로 이동`);
  };

  if (!isLoading && !gathering) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="heading-2 mb-4 text-gray-900">모임을 찾을 수 없습니다</h1>
          <p className="body-regular mb-8 text-gray-600">
            요청하신 모임이 존재하지 않거나 삭제되었습니다.
          </p>
          <button onClick={() => window.history.back()} className="btn-primary px-6 py-2">
            이전 페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  // gathering이 없으면 이미 위에서 "모임을 찾을 수 없습니다" 페이지를 표시했으므로
  // 여기서는 gathering이 확실히 존재함을 보장
  if (!gathering) {
    return null; // 이 경우는 발생하지 않아야 함
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto mt-10 max-w-7xl px-4">
        {/* 메인 콘텐츠 영역 */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* 왼쪽: 모임 이미지 */}
          <div className="relative">
            {gathering.image ? (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl sm:aspect-auto sm:h-full">
                <Image
                  src={gathering.image}
                  alt={gathering.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            ) : (
              <div className="relative flex h-full w-full items-center justify-center rounded-3xl bg-gray-200">
                <Image
                  loader={() => "/image/empty.svg"}
                  src="/image/empty.svg"
                  alt="모임 이미지 없음"
                  fill
                  className="object-contain opacity-30"
                />
              </div>
            )}
          </div>

          {/* 오른쪽: 모임 정보와 참가자 정보 */}
          <div className="space-y-6">
            {/* 모임 정보 카드 */}
            <MeetingDetailCard
              gathering={gathering}
              isJoined={isJoined}
              isFavorite={isFavorite}
              onJoin={handleJoin}
              onLeave={handleLeave}
              onToggleFavorite={handleToggleFavorite}
              onShare={handleShare}
            />

            {/* 참가자 정보 섹션 */}
            <div className="rounded-3xl hover:border-purple-200">
              <ParticipantList participants={participants} />
            </div>
          </div>
        </div>

        {/* 리뷰 섹션 - 전체 너비 */}
        <div className="mt-16 rounded-3xl">
          <ReviewSection
            reviewList={reviewList}
            currentPage={currentPage}
            totalPages={reviewList?.totalPages}
            totalItemCount={reviewList?.totalItemCount}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

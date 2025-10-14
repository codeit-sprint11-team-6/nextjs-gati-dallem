"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Image from "next/image";
import MeetingDetailCard from "@/components/meeting/MeetingDetailCard";
import ParticipantList from "@/components/meeting/ParticipantList";
import ReviewSection from "@/components/meeting/ReviewSection";
import { useAuthStore } from "@/store/authStore";
import { useMeetingData, useMeetingActions, useMeetingUI } from "@/hooks/meeting";

export default function MeetingDetailPage() {
  const params = useParams();
  const meetingId = parseInt(params.id as string);
  const { user } = useAuthStore();

  // Custom hooks 사용
  const { gathering, participants, reviewList, isLoading, isJoined, setGathering, setReviewList } =
    useMeetingData(meetingId, user?.id);

  const { isFavorite, currentPage, handleToggleFavorite, handlePageChange } =
    useMeetingUI(reviewList);

  const { handleJoin, handleLeave, handleShare } = useMeetingActions({
    meetingId,
    gathering,
    participants,
    reviewList,
    setGathering,
    setReviewList,
    onToggleFavorite: handleToggleFavorite,
    onPageChange: handlePageChange,
  });

  // Early return 패턴
  if (!isLoading && !gathering) {
    notFound();
  }

  if (!gathering) {
    return null;
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

"use client";

import { useParams } from "next/navigation";
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

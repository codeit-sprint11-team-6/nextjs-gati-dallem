"use client";

import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import Image from "next/image";
import MeetingDetailCard from "@/components/meeting/MeetingDetailCard";
import ParticipantList from "@/components/meeting/ParticipantList";
import ReviewSection from "@/components/meeting/ReviewSection";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import {
  useGatheringDetail,
  useParticipants,
  useJoinGathering,
  useLeaveGathering,
  useCancelGathering,
} from "@/apis/gatherings/gatherings.query";
import { useReviews } from "@/apis/reviews/reviews.query";

export default function MeetingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const meetingId = parseInt(params.id as string);

  const { user } = useAuthStore();
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * React Query Hooks (v5 Standard Pattern)
   * - useQuery: 데이터 조회 (GET 요청)
   * - useMutation: 데이터 변경 (POST/PUT/DELETE 요청)
   */

  // Query: 모임 상세 정보
  const {
    data: gathering,
    isLoading: gatheringLoading,
    isError: gatheringError,
  } = useGatheringDetail(meetingId);

  // Query: 참가자 목록 (기본값: 빈 배열)
  const { data: participants = [], isLoading: participantsLoading } = useParticipants(meetingId);

  // Query: 리뷰 목록 (페이지네이션)
  const limit = 10;
  const { data: reviewList, isLoading: reviewsLoading } = useReviews({
    gatheringId: meetingId,
    offset: (currentPage - 1) * limit,
    limit: limit,
  });

  // Mutations: 데이터 변경 작업
  // - 각 mutation은 onSuccess시 자동으로 관련 쿼리를 invalidate하여 최신 데이터 유지
  const joinMutation = useJoinGathering();
  const leaveMutation = useLeaveGathering();
  const cancelMutation = useCancelGathering();

  // 사용자가 참가했는지 확인
  const isJoined = participants.some((p) => p.userId === user?.id);

  // 주최자 확인
  const isHost = user?.id === gathering?.createdBy;

  // Mutation 진행 중 여부 (버튼 disabled 처리용)
  const isMutating = joinMutation.isPending || leaveMutation.isPending || cancelMutation.isPending;

  const handleJoin = () => {
    // 로그인 체크
    if (!user) {
      const confirmLogin = window.confirm(
        "로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?",
      );
      if (confirmLogin) {
        router.push(`/signin?redirect=/meetings/${meetingId}`);
      }
      return;
    }

    // Global MutationCache가 에러를 자동 처리 (MessageModal)
    joinMutation.mutate(meetingId);
  };

  const handleLeave = () => {
    if (!confirm("정말 참가를 취소하시겠습니까?")) {
      return;
    }

    // Global MutationCache가 에러를 자동 처리
    leaveMutation.mutate(meetingId);
  };

  const handleCancelMeeting = () => {
    if (!confirm("정말 모임을 취소하시겠습니까?\n이 작업은 되돌릴 수 없습니다.")) {
      return;
    }

    // 성공 시에만 특별한 처리 필요 (페이지 이동)
    cancelMutation.mutate(meetingId, {
      onSuccess: () => {
        router.push("/meetings");
      },
      // onError는 생략 - Global handler가 처리
    });
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // React Query가 자동으로 새 페이지 데이터를 fetch
  };

  // 로딩 상태 (React Query v5 권장 패턴)
  const isLoading = gatheringLoading || participantsLoading;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="relative">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-purple-600" />
          </div>
          <p className="text-lg font-medium text-gray-600">모임 정보를 불러오는 중...</p>
          {participantsLoading && !gatheringLoading && (
            <p className="text-sm text-gray-500">참가자 목록 로딩 중...</p>
          )}
        </div>
      </div>
    );
  }

  // 에러 또는 데이터 없음
  if (gatheringError || !gathering) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Global Mutation Loading Indicator */}
      {isMutating && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-white shadow-lg">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          <span className="text-sm font-medium">처리 중...</span>
        </div>
      )}

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
              isHost={isHost}
              onJoin={handleJoin}
              onLeave={isHost ? handleCancelMeeting : handleLeave}
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

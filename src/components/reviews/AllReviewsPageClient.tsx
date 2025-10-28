"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import FilterBar, { MeetingFilters } from "@/components/meeting/list/FilterBar";
import ReviewsRatingSummary from "@/components/reviews/ReviewsRatingSummary";
import ReviewList from "@/components/reviews/ReviewList";
import { useReviews, useReviewScores } from "@/apis/reviews/reviews.query";
import { mockAllReviews, mockRatingSummary } from "@/mocks/reviews/mockAllReviews";

export default function AllReviewsPageClient() {
  const [filters, setFilters] = useState<MeetingFilters>({
    keyword: "",
    category: "DALLAEMFIT",
    location: "",
    date: "",
    sort: "latest",
  });

  // API 호출을 위한 쿼리 파라미터 변환
  const queryParams = useMemo(() => {
    const params: any = {
      offset: 0,
      limit: 20,
    };

    // 카테고리 필터 (API 스키마에 맞게 type으로 변경)
    if (filters.category && filters.category !== "all") {
      params.type = filters.category;
    }

    // 위치 필터 (API 스키마에 정의된 값만 허용)
    if (filters.location) {
      params.location = filters.location;
    }

    // 날짜 필터
    if (filters.date) {
      params.date = filters.date;
    }

    // 정렬 (API 스키마에 맞게 수정)
    if (filters.sort) {
      if (filters.sort === "latest") {
        params.sortBy = "createdAt";
        params.sortOrder = "desc";
      } else if (filters.sort === "score") {
        params.sortBy = "score";
        params.sortOrder = "desc";
      } else if (filters.sort === "participants") {
        params.sortBy = "participantCount";
        params.sortOrder = "desc";
      }
    }

    return params;
  }, [filters]);

  // API 호출
  const {
    data: reviewList,
    isLoading: reviewsLoading,
    error: reviewsError,
  } = useReviews(queryParams);
  const {
    data: ratingScores,
    isLoading: scoresLoading,
    error: scoresError,
  } = useReviewScores(queryParams);

  // 리뷰 데이터 (API 실패 시 mock 데이터 사용)
  const reviews = reviewsError ? mockAllReviews : reviewList?.data || [];
  const totalCount = reviewsError ? mockAllReviews.length : reviewList?.totalItemCount || 0;

  // 평점 요약 데이터 변환 (API 실패 시 mock 데이터 사용)
  const ratingSummary = useMemo(() => {
    if (scoresError) {
      return {
        averageScore: mockRatingSummary.averageScore,
        totalReviews: mockRatingSummary.totalReviews,
        scoreBreakdown: mockRatingSummary.scoreBreakdown,
      };
    }

    if (!ratingScores || ratingScores.length === 0) {
      return {
        averageScore: 0,
        totalReviews: 0,
        scoreBreakdown: [
          { score: 5, count: 0 },
          { score: 4, count: 0 },
          { score: 3, count: 0 },
          { score: 2, count: 0 },
          { score: 1, count: 0 },
        ],
      };
    }

    // 첫 번째 항목에서 총 리뷰 수와 평균 점수 계산
    const firstScore = ratingScores[0];
    const totalReviews = firstScore
      ? firstScore.oneStar +
        firstScore.twoStars +
        firstScore.threeStars +
        firstScore.fourStars +
        firstScore.fiveStars
      : 0;
    const averageScore = firstScore ? firstScore.averageScore : 0;

    const scoreBreakdown = [1, 2, 3, 4, 5].map((score) => {
      // ratingScores는 ReviewScoreAggregate[] 형태이므로 첫 번째 항목에서 해당 점수 개수 추출
      const firstScore = ratingScores[0];
      if (!firstScore) return { score, count: 0 };

      const count =
        score === 1
          ? firstScore.oneStar
          : score === 2
            ? firstScore.twoStars
            : score === 3
              ? firstScore.threeStars
              : score === 4
                ? firstScore.fourStars
                : score === 5
                  ? firstScore.fiveStars
                  : 0;

      return { score, count };
    });

    return {
      averageScore: Math.round(averageScore * 10) / 10, // 소수점 첫째자리까지
      totalReviews,
      scoreBreakdown,
    };
  }, [ratingScores]);


  return (
    <div className="mx-auto max-w-7xl">
      {/* Header Section */}
      <div className="mb-6 flex items-end gap-6 md:gap-7 lg:mb-8 lg:gap-[33px]">
        <div className="relative h-14 w-[70px] flex-shrink-0 md:h-[57px] md:w-[70px] lg:h-[91px] lg:w-[97px]">
          <Image src="/image/empty.svg" alt="리뷰 헤더 일러스트" fill className="object-contain" />
        </div>
        <div className="flex flex-col gap-2 md:gap-4">
          <h1 className="text-lg leading-7 font-semibold text-gray-900 md:text-2xl lg:text-[32px] lg:leading-9">
            모든 리뷰
          </h1>
          <p className="text-base leading-6 font-medium text-slate-400 md:text-lg md:leading-7 lg:text-xl lg:leading-7">
            같이달램을 이용자들은 이렇게 느꼈어요 🫶
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar value={filters} onChange={setFilters} />


      {/* Rating Summary */}
      <div className="mt-4 md:mt-8">
        <ReviewsRatingSummary
          averageScore={ratingSummary.averageScore}
          totalReviews={ratingSummary.totalReviews}
          scoreBreakdown={ratingSummary.scoreBreakdown}
        />
      </div>

      {/* Reviews List / Empty State */}
      <div className="mt-6 lg:mt-8">
        {reviewsLoading ? (
          <div className="flex justify-center py-8">
            <div className="text-gray-500">리뷰를 불러오는 중...</div>
          </div>
        ) : reviewsError ? (
          <div className="flex justify-center py-8">
            <div className="text-red-500">리뷰를 불러오는데 실패했습니다.</div>
          </div>
        ) : (
          <ReviewList reviews={reviews} />
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import FilterBar, { MeetingFilters } from "@/components/meeting/list/FilterBar";
import ReviewsRatingSummary from "@/components/reviews/ReviewsRatingSummary";
import ReviewList from "@/components/reviews/ReviewList";
import { mockAllReviews, mockRatingSummary } from "@/mocks/reviews/mockAllReviews";

export default function AllReviewsPageClient() {
  const [filters, setFilters] = useState<MeetingFilters>({
    keyword: "",
    category: "DALLAEMFIT",
    location: "",
    date: "",
    sort: "latest",
  });

  // Filter reviews based on selected filters
  const filteredReviews = useMemo(() => {
    return mockAllReviews.filter((review) => {
      // Category filter
      if (filters.category !== "all" && review.category !== filters.category) return false;

      // Sub-category filter (OFFICE_STRETCHING, MINDFULNESS)
      if (filters.category === "OFFICE_STRETCHING" || filters.category === "MINDFULNESS") {
        if (review.subCategory !== filters.category) return false;
      }

      // Location filter
      if (filters.location && review.location !== filters.location) return false;

      return true;
    });
  }, [filters]);

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
          averageScore={mockRatingSummary.averageScore}
          totalReviews={mockRatingSummary.totalReviews}
          scoreBreakdown={mockRatingSummary.scoreBreakdown}
        />
      </div>

      {/* Reviews List / Empty State */}
      <div className="mt-6 lg:mt-8">
        <ReviewList reviews={filteredReviews} />
      </div>
    </div>
  );
}

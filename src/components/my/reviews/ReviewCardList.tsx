"use client";

import { useJoinedGatherings } from "@/apis/gatherings/gatherings.query";
import { useReviews } from "@/apis/reviews/reviews.query";
import Chip from "@/components/ui/Chip";
import Pagination from "@/components/ui/Pagination";
import { selectUser, useAuthStore } from "@/store/authStore";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import ReviewedCardItem, { ReviewCardSkeleton } from "./reviewed/ReviewedCardItem";
import UnreviewedCardItem, { UnreviewedCardSkeleton } from "./unreviewed/UnreviewedCardItem";

interface ReviewCardListContextType {
  writable: boolean;
}
const ReviewCardListContext = createContext<ReviewCardListContextType | null>(null);

function useReviewCardList() {
  const context = useContext(ReviewCardListContext);
  if (!context) throw new Error("It must be used within <ReviewCardList />");
  return context;
}

export default function ReviewCardList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isWritable = searchParams.get("writable") === "true";
  const [writable, setWritable] = useState(isWritable);

  function handleClickFilter() {
    router.push(`/my/reviews?writable=${writable ? "false" : "true"}`);
  }

  useEffect(() => {
    setWritable(isWritable);
  }, [searchParams, isWritable]);

  return (
    <div className="mt-1 flex w-full flex-col items-start justify-start gap-4 md:gap-8">
      <div className="flex-start gap-2.5 lg:ml-2">
        <button
          className="cursor-pointer"
          aria-label="작성 가능한 리뷰"
          onClick={() => !writable && handleClickFilter()}
        >
          <Chip variant={writable ? "active" : "default"}>작성 가능한 리뷰</Chip>
        </button>
        <button
          className="cursor-pointer"
          aria-label="작성한 리뷰"
          onClick={() => writable && handleClickFilter()}
        >
          <Chip variant={writable ? "default" : "active"}>작성한 리뷰</Chip>
        </button>
      </div>
      <ReviewCardListContext.Provider value={{ writable }}>
        <div className="grid w-full justify-stretch gap-4 lg:gap-6">
          {writable ? <UnreviewedCardList /> : <ReviewedCardList />}
        </div>
      </ReviewCardListContext.Provider>
    </div>
  );
}

function UnreviewedCardList() {
  const { isLoading, data } = useJoinedGatherings({ completed: true, reviewed: false });
  return isLoading ? (
    <SkeletonList />
  ) : data?.length === 0 ? (
    <EmptyList />
  ) : (
    <>
      {data?.map((card) => (
        <UnreviewedCardItem key={card.id} {...card} />
      ))}
    </>
  );
}
function ReviewedCardList() {
  const user = useAuthStore(selectUser);
  const [page, setPage] = useState(1);
  const { isLoading, data: reviewResult } = useReviews({ userId: user?.id, offset: page - 1 });
  const { data, totalPages } = reviewResult ?? { data: [], totalPages: 1 };
  return isLoading ? (
    <SkeletonList />
  ) : data.length === 0 ? (
    <EmptyList />
  ) : (
    <div className="grid justify-stretch gap-5 md:gap-10">
      <div className="grid justify-stretch gap-6 divide-y-1 divide-slate-200 rounded-3xl bg-white p-6 pb-0 md:rounded-4xl lg:px-8 lg:pb-2">
        {data.map((review) => (
          <ReviewedCardItem key={review.id} {...review} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      )}
    </div>
  );
}

function EmptyList() {
  const { writable } = useReviewCardList();
  return (
    <div className="flex-center mt-18 flex-col lg:mt-24">
      <div className="flex-center relative mb-6 h-24 w-24 sm:h-32 sm:w-32">
        <Image src="/image/empty.svg" alt="빈 페이지 표시 이미지" fill className="object-contain" />
      </div>
      <h3 className="mb-2 text-sm font-semibold text-gray-400 md:text-lg">
        {writable ? "작성할 수 있는 리뷰가 없어요" : "작성한 리뷰가 없어요"}
      </h3>
    </div>
  );
}

function SkeletonList() {
  const { writable } = useReviewCardList();
  return writable ? (
    <>
      {Array(3)
        .fill(undefined)
        .map((_, idx) => (
          <UnreviewedCardSkeleton key={idx} />
        ))}
    </>
  ) : (
    <div className="grid justify-stretch gap-6 divide-y-1 divide-slate-200 rounded-3xl bg-white p-6 pb-0 md:rounded-4xl lg:px-8 lg:pb-2">
      {Array(3)
        .fill(undefined)
        .map((_, idx) => (
          <ReviewCardSkeleton key={idx} />
        ))}
    </div>
  );
}

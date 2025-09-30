import { cn } from "@/lib/utils";
import Avatar from "@/components/ui/Avatar";
import { Card } from "@/components/common/Card";
import Pagination from "@/components/ui/Pagination";
import Image from "next/image";
import type { Review, ReviewList } from "@/types";
import { mockReviews } from "@/mocks/review";

interface ReviewSectionProps {
  // API 응답 데이터 (ReviewList 또는 개별 props)
  reviewList?: ReviewList;
  // 또는 개별 props로 전달
  reviews?: Review[];
  averageRating?: number;
  totalReviews?: number;
  currentPage?: number;
  totalPages?: number;
  totalItemCount?: number;

  className?: string;
  onPageChange?: (page: number) => void;
}

export default function ReviewSection({
  reviewList,
  reviews,
  averageRating,
  totalReviews,
  currentPage = 1,
  totalPages = 9,
  totalItemCount,
  className,
  onPageChange,
}: ReviewSectionProps) {
  // ReviewList가 있으면 우선 사용, 없으면 개별 props 사용, 둘 다 없으면 mock 데이터 사용
  const displayReviews = reviewList?.data || reviews || mockReviews;
  const displayCurrentPage = reviewList?.currentPage || currentPage;
  const displayTotalPages = reviewList?.totalPages || totalPages;
  const displayTotalItemCount = reviewList?.totalItemCount || totalItemCount || mockReviews.length;

  const renderStars = (score: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Image
        key={i}
        src={i < score ? "/icon/heart_active.svg" : "/icon/heart_inactive.svg"}
        alt={i < score ? "별점 활성" : "별점 비활성"}
        width={24}
        height={24}
        className="h-6 w-6"
      />
    ));
  };

  // 빈 상태 확인
  const isEmpty = displayReviews.length === 0;

  return (
    <div className={cn("", className)}>
      <h2 className="mb-8 ml-4 text-2xl font-semibold text-gray-900">리뷰 모아보기</h2>

      {/* 리뷰 목록 또는 빈 상태 */}
      <div className="space-y-6 rounded-3xl bg-white pt-10 pr-12 pb-12 pl-12">
        {isEmpty ? (
          // 빈 상태
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative mb-6 flex h-24 w-24 items-center justify-center sm:h-32 sm:w-32">
              <Image
                src="/image/empty.svg"
                alt="리뷰가 없음"
                fill
                className="object-contain opacity-30"
              />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-400">아직 리뷰가 없어요</h3>
          </div>
        ) : (
          displayReviews.map((review, index) => (
            <div
              key={review.id}
              className={cn(
                "bg-white p-6",
                index !== displayReviews.length - 1 && "border-b border-gray-200",
              )}
            >
              <Card.Detail>
                <div className="flex items-start gap-4">
                  {/* 사용자 프로필 */}
                  <Avatar
                    userProfile={{
                      teamId: review.User.teamId,
                      id: review.User.id,
                      email: "",
                      name: review.User.name,
                      companyName: "",
                      image: review.User.image || "",
                      createdAt: "",
                      updatedAt: "",
                    }}
                    size="medium"
                    className="h-10 w-10 flex-shrink-0"
                  />

                  {/* 사용자 정보 */}
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-col gap-1">
                      <span className="text-sm font-medium text-gray-600">{review.User.name}</span>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">{renderStars(review.score)}</div>
                        <span className="text-sm text-gray-400">
                          {new Date(review.createdAt)
                            .toLocaleDateString("ko-KR", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            })
                            .replace(/\./g, ".")
                            .replace(/\s/g, "")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 리뷰 내용 - 아바타와 같은 부모 레벨 */}
                <p className="mt-6 text-base leading-relaxed font-medium text-gray-700">
                  {review.comment}
                </p>
              </Card.Detail>
            </div>
          ))
        )}
      </div>

      {/* 페이지네이션 - 리뷰가 있을 때만 표시 */}
      {!isEmpty && (
        <Pagination
          currentPage={displayCurrentPage}
          totalPages={displayTotalPages}
          onPageChange={onPageChange || (() => {})}
          className="mt-8"
        />
      )}
    </div>
  );
}

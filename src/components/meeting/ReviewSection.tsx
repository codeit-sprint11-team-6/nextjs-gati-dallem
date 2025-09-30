import { cn } from "@/lib/utils";
import Avatar from "@/components/ui/Avatar";
import { Card } from "@/components/common/Card";
import Pagination from "@/components/ui/Pagination";
import { Heart } from "lucide-react";
import Image from "next/image";
import type { Review, ReviewList } from "@/types";

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
  // Mock 리뷰 데이터 (실제로는 props로 받아야 함)
  const mockReviews: Review[] = [
    {
      teamId: "team-1",
      id: 1,
      score: 5,
      comment:
        "따듯하게 느껴지는 공간이에요 :) 평소에 달램 이용해보고 싶었는데 이렇게 같이 달램 생기니까 너무 좋아요! 프로그램이 더 많이 늘어났으면 좋겠어요.",
      createdAt: "2024-01-25T10:30:00.000Z",
      Gathering: {
        teamId: "team-1",
        id: 1,
        type: "DALLAEMFIT",
        name: "달램핏 클래스",
        dateTime: "2024-01-25T10:00:00.000Z",
        location: "건대입구",
        image: "/image/profile.svg",
      },
      User: { teamId: "team-1", id: 1, name: "럽윈즈올", image: "/avatars/female.svg" },
    },
    {
      teamId: "team-1",
      id: 2,
      score: 4,
      comment: "두번째 이용이에요! 만족합니다. 다음에도 참여하고 싶어요.",
      createdAt: "2024-01-24T15:20:00.000Z",
      Gathering: {
        teamId: "team-1",
        id: 1,
        type: "DALLAEMFIT",
        name: "달램핏 클래스",
        dateTime: "2024-01-25T10:00:00.000Z",
        location: "건대입구",
        image: "/image/profile.svg",
      },
      User: { teamId: "team-1", id: 2, name: "슈크림", image: "/avatars/female.svg" },
    },
    {
      teamId: "team-1",
      id: 3,
      score: 5,
      comment: "강사분도 친절하시고 ~ ^^ 너무 좋은 공간에서 긴장과 스트레스 모두 잘 풀고 가요 ~ ^^",
      createdAt: "2024-01-24T09:15:00.000Z",
      Gathering: {
        teamId: "team-1",
        id: 1,
        type: "DALLAEMFIT",
        name: "달램핏 클래스",
        dateTime: "2024-01-25T10:00:00.000Z",
        location: "건대입구",
        image: "/image/profile.svg",
      },
      User: { teamId: "team-1", id: 3, name: "당근조아", image: "/avatars/male.svg" },
    },
    {
      teamId: "team-1",
      id: 4,
      score: 3,
      comment: "수업이 단조로워요. 좀 더 다양한 프로그램이 있었으면 좋겠어요.",
      createdAt: "2024-01-23T14:45:00.000Z",
      Gathering: {
        teamId: "team-1",
        id: 1,
        type: "DALLAEMFIT",
        name: "달램핏 클래스",
        dateTime: "2024-01-25T10:00:00.000Z",
        location: "건대입구",
        image: "/image/profile.svg",
      },
      User: { teamId: "team-1", id: 4, name: "김지수", image: "/avatars/female.svg" },
    },
    {
      teamId: "team-1",
      id: 5,
      score: 5,
      comment: "정말 좋은 경험이었습니다! 몸도 마음도 건강해지는 느낌이에요. 강추합니다!",
      createdAt: "2024-01-22T16:30:00.000Z",
      Gathering: {
        teamId: "team-1",
        id: 1,
        type: "DALLAEMFIT",
        name: "달램핏 클래스",
        dateTime: "2024-01-25T10:00:00.000Z",
        location: "건대입구",
        image: "/image/profile.svg",
      },
      User: { teamId: "team-1", id: 5, name: "박민수", image: "/avatars/male.svg" },
    },
    {
      teamId: "team-1",
      id: 6,
      score: 4,
      comment: "운동 강도가 적당해서 좋았어요. 다음에도 참여할 예정입니다.",
      createdAt: "2024-01-21T11:20:00.000Z",
      Gathering: {
        teamId: "team-1",
        id: 1,
        type: "DALLAEMFIT",
        name: "달램핏 클래스",
        dateTime: "2024-01-25T10:00:00.000Z",
        location: "건대입구",
        image: "/image/profile.svg",
      },
      User: { teamId: "team-1", id: 6, name: "이영희", image: "/avatars/female.svg" },
    },
  ];

  // ReviewList가 있으면 우선 사용, 없으면 개별 props 사용, 둘 다 없으면 mock 데이터 사용
  const displayReviews = reviewList?.data || reviews || mockReviews;
  const displayCurrentPage = reviewList?.currentPage || currentPage;
  const displayTotalPages = reviewList?.totalPages || totalPages;
  const displayTotalItemCount = reviewList?.totalItemCount || totalItemCount || mockReviews.length;

  const renderStars = (score: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Heart
        key={i}
        className={cn("h-6 w-6", i < score ? "fill-purple-500 text-purple-500" : "text-gray-300")}
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
                index !== mockReviews.length - 1 && "border-b border-gray-200",
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

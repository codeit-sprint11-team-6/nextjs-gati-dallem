import { cn } from "@/lib/utils";
import Avatar from "@/components/ui/Avatar";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";

interface Review {
  id: number;
  user: {
    id: number;
    name: string;
    image?: string;
  };
  rating: number;
  content: string;
  createdAt: string;
}

interface ReviewSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  className?: string;
}

export default function ReviewSection({
  reviews,
  averageRating,
  totalReviews,
  className,
}: ReviewSectionProps) {
  // Mock 리뷰 데이터 (실제로는 props로 받아야 함)
  const mockReviews: Review[] = [
    {
      id: 1,
      user: { id: 1, name: "럽윈즈올", image: "/avatars/female.svg" },
      rating: 5,
      content:
        "따듯하게 느껴지는 공간이에요 :) 평소에 달램 이용해보고 싶었는데 이렇게 같이 달램 생기니까 너무 좋아요! 프로그램이 더 많이 늘어났으면 좋겠어요.",
      createdAt: "2024.01.25",
    },
    {
      id: 2,
      user: { id: 2, name: "슈크림", image: "/avatars/female.svg" },
      rating: 4,
      content: "두번째 이용이에요! 만족합니다.",
      createdAt: "2024.01.25",
    },
    {
      id: 3,
      user: { id: 3, name: "당근조아", image: "/avatars/male.svg" },
      rating: 5,
      content: "강사분도 친절하시고 ~ ^^ 너무 좋은 공간에서 긴장과 스트레스 모두 잘 풀고 가요 ~ ^^",
      createdAt: "2024.01.25",
    },
    {
      id: 4,
      user: { id: 4, name: "김지수", image: "/avatars/female.svg" },
      rating: 3,
      content: "수업이 단조로워요.",
      createdAt: "2024.01.25",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Heart
        key={i}
        className={cn("h-6 w-6", i < rating ? "fill-red-500 text-red-500" : "text-gray-300")}
      />
    ));
  };

  return (
    <div className={cn("", className)}>
      <h2 className="mb-8 text-2xl font-semibold text-gray-900">리뷰 모아보기</h2>

      {/* 리뷰 목록 */}
      <div className="space-y-6">
        {mockReviews.map((review) => (
          <div key={review.id} className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-start gap-4">
              {/* 사용자 프로필 */}
              <Avatar
                userProfile={{
                  teamId: "1",
                  id: review.user.id,
                  email: "",
                  name: review.user.name,
                  companyName: "",
                  image: review.user.image || "",
                  createdAt: "",
                  updatedAt: "",
                }}
                size="medium"
                className="h-10 w-10"
              />

              {/* 리뷰 내용 */}
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-600">{review.user.name}</span>
                  <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
                  <span className="text-sm text-gray-400">{review.createdAt}</span>
                </div>
                <p className="leading-relaxed text-gray-700">{review.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="mt-8 flex items-center justify-center gap-2">
        <button className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50">
          <ChevronLeft className="h-5 w-5 text-gray-400" />
        </button>

        <div className="flex items-center gap-2">
          <button className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 font-semibold text-green-700">
            1
          </button>
          <button className="flex h-12 w-12 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50">
            2
          </button>
          <button className="flex h-12 w-12 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50">
            3
          </button>
          <button className="flex h-12 w-12 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50">
            4
          </button>
          <button className="flex h-12 w-12 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50">
            5
          </button>
          <div className="flex items-center gap-1">
            <div className="h-1 w-1 rounded-full bg-gray-400"></div>
            <div className="h-1 w-1 rounded-full bg-gray-400"></div>
            <div className="h-1 w-1 rounded-full bg-gray-400"></div>
          </div>
          <button className="flex h-12 w-12 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50">
            9
          </button>
        </div>

        <button className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50">
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
}

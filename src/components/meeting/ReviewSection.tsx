import { cn } from '@/lib/utils';
import Avatar from '@/components/ui/Avatar';
import { Star } from 'lucide-react';

interface Review {
  id: number;
  userId: number;
  userName: string;
  userImage?: string;
  userCompany?: string;
  rating: number;
  content: string;
  createdAt: string;
}

interface ReviewSectionProps {
  reviews: Review[];
  averageRating?: number;
  totalReviews?: number;
  className?: string;
}

export default function ReviewSection({ 
  reviews, 
  averageRating = 0,
  totalReviews = 0,
  className 
}: ReviewSectionProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={cn(
          "w-4 h-4",
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        )}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* 리뷰 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">리뷰</h3>
          {totalReviews > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                {renderStars(Math.round(averageRating))}
              </div>
              <span className="text-sm text-gray-600">
                {averageRating.toFixed(1)} ({totalReviews}개 리뷰)
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 리뷰 목록 */}
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-start gap-3">
                <Avatar
                  userProfile={{
                    teamId: 1,
                    id: review.userId,
                    email: '',
                    name: review.userName,
                    companyName: review.userCompany || '',
                    image: review.userImage || '',
                    createdAt: review.createdAt,
                    updatedAt: review.createdAt
                  }}
                  size="small"
                  className="w-10 h-10"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-gray-900">
                      {review.userName}
                    </span>
                    {review.userCompany && (
                      <span className="text-sm text-gray-500">
                        {review.userCompany}
                      </span>
                    )}
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-2">
                    {review.content}
                  </p>
                  <span className="text-xs text-gray-500">
                    {formatDate(review.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">
            <Star className="w-12 h-12 mx-auto" />
          </div>
          <p className="text-gray-500">아직 리뷰가 없습니다.</p>
          <p className="text-sm text-gray-400 mt-1">
            첫 번째 리뷰를 작성해보세요!
          </p>
        </div>
      )}
    </div>
  );
}

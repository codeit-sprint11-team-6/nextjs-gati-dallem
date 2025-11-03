import ReviewListItem from "./ReviewListItem";
import ReviewsEmptyState from "./ReviewsEmptyState";
import type { Review } from "@/types/review";

interface ReviewListProps {
  reviews: Review[];
  className?: string;
}

export default function ReviewList({ reviews, className }: ReviewListProps) {
  if (reviews.length === 0) {
    return <ReviewsEmptyState />;
  }

  return (
    <div
      className={`divide-y divide-slate-200 rounded-3xl bg-white p-6 md:rounded-[32px] md:p-8 lg:p-8 ${className || ""}`}
    >
      {reviews.map((review) => (
        <div key={review.id} className="py-6 first:pt-0 last:pb-0">
          <ReviewListItem {...review} />
        </div>
      ))}
    </div>
  );
}

"use client";

import { JoinedGathering } from "@/types";
import { Card } from "../../common/Card";

/** 마이페이지 나의 모임 카드 컴포넌트 */
export default function ReservedCardItem({
  id,
  name,
  image,
  participantCount,
  capacity,
  dateTime,
  location,
  isCompleted,
  isReviewed,
  ...props
}: JoinedGathering) {
  return (
    <Card>
      <Card.Image image={image} />
      <Card.Detail>
        <div className="flex flex-col gap-3.5 md:gap-4">
          <Card.Tags />
          <div className="flex flex-col items-start justify-between gap-4">
            <Card.Title id={id}>
              <div className="flex gap-1.5 md:gap-2">{name}</div>
            </Card.Title>
            <div className="flex-end md:flex-between flex-col items-center gap-6 md:flex-row md:gap-3">
              <Card.GatheringDetail {...{ participantCount, capacity, location, dateTime }} />
              <Card.ReservedButton />
            </div>
          </div>
        </div>
      </Card.Detail>
      <Card.LikeButton />
    </Card>
  );
}

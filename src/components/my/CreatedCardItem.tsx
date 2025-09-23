"use client";

import { JoinedGathering } from "@/types";
import { Card } from "../common/Card";

/** 마이페이지 내가 만든 모임 카드 컴포넌트 */
export default function CreatedCardItem({
  id,
  name,
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
      <Card.Image />
      <Card.Detail>
        <div className="flex h-full flex-col items-start justify-between gap-4">
          <Card.Title id={id}>
            <div className="flex gap-1.5 md:gap-2">{name}</div>
          </Card.Title>
          <div className="flex flex-col items-center justify-end gap-6 md:flex-row md:justify-between md:gap-3">
            <Card.GatheringDetail {...{ participantCount, capacity, location, dateTime }} />
          </div>
        </div>
      </Card.Detail>
      <Card.LikeButton />
    </Card>
  );
}

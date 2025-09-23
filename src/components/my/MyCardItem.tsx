"use client";

import { JoinedGathering } from "@/types";
import { Card } from "../common/Card";
import { CompletedChip, ConfirmChip } from "./ChipState";

export default function ReservedCardItem({
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
        <div className="flex flex-col gap-3.5 md:gap-4">
          <div className="flex items-center justify-start gap-2">
            <CompletedChip isCompleted={false} />
            <ConfirmChip isConfirmed={true} />
          </div>
          <div className="flex flex-col items-start justify-between gap-4">
            <Card.Title id={id}>
              <div className="flex gap-1.5 md:gap-2">{name}</div>
            </Card.Title>
            <div className="flex flex-col items-center justify-end gap-6 md:flex-row md:justify-between md:gap-3">
              <Card.GatheringDetail {...{ participantCount, capacity, location, dateTime }} />
              <Card.MyButton />
            </div>
          </div>
        </div>
      </Card.Detail>
      <Card.LikeButton />
    </Card>
  );
}

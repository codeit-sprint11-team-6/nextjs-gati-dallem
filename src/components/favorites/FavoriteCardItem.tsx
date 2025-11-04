"use client";

import { Card } from "@/components/common/Card";
import { Gathering } from "@/types";
import { Button } from "../common/Button";
import { GatheringCapacityGraph, GatheringTimeInfo } from "./GatheringInfo";
import { useJoinGathering } from "@/apis/gatherings/gatherings.query";
import { useOverlay } from "@/hooks/useOverlay";
import MessageModal from "../common/MessageModal";
import { cn } from "@/lib/utils";

/** 찜한 모임 카드 컴포넌트 */
export default function FavoriteCardItem(gathering: Gathering) {
  const { overlay } = useOverlay();
  const { mutate: joinMutate } = useJoinGathering();
  const { participantCount, capacity, dateTime, registrationEnd } = gathering;

  const now = new Date();
  const isFull = capacity <= participantCount;
  const isRegistrationClosed = registrationEnd ? new Date(registrationEnd) < now : false;

  function handleJoin(e: React.MouseEvent) {
    e.stopPropagation();
    joinMutate(gathering.id, {
      onSuccess: (res) => overlay(<MessageModal message={res.message} />),
    });
  }
  return (
    <Card gathering={gathering}>
      <Card.Image />
      <Card.Detail className="grid w-full items-start justify-stretch gap-6 md:gap-10">
        <div className="grid items-start justify-stretch gap-1.5">
          <div className="grid items-start justify-stretch gap-3.5">
            <Card.Title className="md:pr-12">{gathering.name}</Card.Title>
            <div className="flex gap-2.5 pr-2.5 text-sm font-medium">
              <span className="text-slate-400">위치</span>
              <span className="text-slate-500">{gathering.location}</span>
            </div>
            <GatheringTimeInfo showOnlyMobile={true} {...{ dateTime, registrationEnd }} />
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 md:items-end md:gap-10 lg:gap-8">
          <div className="grid grow justify-stretch gap-6 md:gap-3">
            <GatheringTimeInfo showOnlyMobile={false} {...{ dateTime, registrationEnd }} />
            <GatheringCapacityGraph {...{ participantCount, capacity }} />
          </div>
          <div className="shrink-0">
            {isRegistrationClosed ? (
              <Button
                variant="outlineSoft"
                className="btn rounded-2xl px-6 py-2.5 text-base font-bold"
                disabled={true}
              >
                모임 참여 마감
              </Button>
            ) : isFull ? (
              <Button
                variant="outlineSoft"
                className="btn rounded-2xl px-6 py-2.5 text-base font-bold"
                disabled={true}
              >
                모집 완료
              </Button>
            ) : (
              <Button
                variant="primary"
                className="btn rounded-2xl px-6 py-2.5 text-base font-bold"
                onClick={handleJoin}
              >
                참여하기
              </Button>
            )}
          </div>
        </div>
      </Card.Detail>
      <Card.LikeButton />
    </Card>
  );
}

/** 찜한 모임 카드 스켈레톤 */
export function FavoriteCardSkeleton() {
  return (
    <div
      className={cn(
        "relative animate-pulse overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-700",
        "md:items-upper md:flex md:justify-start md:gap-6 md:rounded-4xl md:p-6 md:pr-9",
      )}
      aria-label="찜한 모임 목록 스켈레톤"
    >
      <div className="aspect-[2.2] w-full shrink-0 overflow-hidden bg-slate-200 md:aspect-square md:w-[170px] md:rounded-3xl dark:bg-slate-600" />
      <div className="flex-2 p-4 pb-5 md:px-0 md:py-2">
        <div className="flex h-full flex-1 flex-col items-start justify-between gap-3.5 md:gap-4">
          <div className="flex flex-col gap-2.5">
            <div className="h-8 w-[300px] rounded-3xl bg-slate-200 dark:bg-slate-600" />
            <div className="h-5 w-25 rounded-3xl bg-slate-200 dark:bg-slate-600" />
          </div>
          <div className="flex-between flex-col items-center gap-4 md:w-full md:flex-row md:gap-10 lg:gap-8">
            <div className="flex grow flex-col gap-2.5">
              <div className="flex-start gap-4">
                <div className="h-5 w-16 rounded-3xl bg-slate-200 dark:bg-slate-600" />
                <div className="h-5 w-16 rounded-3xl bg-slate-200 dark:bg-slate-600" />
              </div>
              <div className="h-5 w-full rounded-3xl bg-slate-200 dark:bg-slate-600" />
            </div>
            <div className="flex-end w-full md:w-fit">
              <div className="h-11 w-[130px] rounded-3xl bg-slate-200 dark:bg-slate-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

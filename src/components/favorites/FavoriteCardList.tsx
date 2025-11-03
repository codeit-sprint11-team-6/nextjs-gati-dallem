"use client";

import { Card } from "@/components/common/Card";
import { Gathering } from "@/types";
import { Button } from "../common/Button";
import { GatheringCapacityGraph, GatheringTimeInfo } from "./GatheringInfo";
import { useJoinGathering } from "@/apis/gatherings/gatherings.query";
import { useOverlay } from "@/hooks/useOverlay";
import MessageModal from "../common/MessageModal";
import Image from "next/image";

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
        <div className="flex items-center justify-between gap-4 md:items-end md:gap-10">
          <div className="grid shrink-0 grow justify-stretch gap-6 md:gap-3">
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

export function EmptyFavoriteList() {
  return (
    <div className="flex-center mt-18 flex-col lg:mt-24">
      <div className="flex-center relative mb-6 h-24 w-24 sm:h-32 sm:w-32">
        <Image src="/image/empty.svg" alt="빈 페이지 표시 이미지" fill className="object-contain" />
      </div>
      <h3 className="mb-2 text-sm font-semibold text-gray-400 md:text-lg">
        아직 찜한 모임이 없어요
      </h3>
    </div>
  );
}

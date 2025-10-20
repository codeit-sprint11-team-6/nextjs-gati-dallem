"use client";

import { Gathering } from "@/types/gathering";
import MeetingCard from "./MeetingCard";
import { useJoinGathering } from "@/apis/gatherings/gatherings.query";

interface ListGridProps {
  items: Gathering[];
  className?: string;
}

export default function ListGrid({ items, className }: ListGridProps) {
  const { mutate: joinGathering } = useJoinGathering();

  const handleJoin = (id: number) => {
    joinGathering(id);
  };

  if (!items.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">
        조건에 맞는 모임이 없습니다. 필터를 조정해 보세요.
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${className ?? ""}`}>
      {items.map((gathering) => (
        <MeetingCard key={gathering.id} gathering={gathering} onJoin={handleJoin} />
      ))}
    </div>
  );
}

<<<<<<< Updated upstream
import HeroBanner from "@/components/meeting/list/HeroBanner";
import MeetingsPageClient from "@/components/meeting/list/MeetingsPageClient";
import CreateMeetingButton from "@/components/meeting/create/CreateMeetingButton";

export default function MeetingsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-0 pb-4 md:py-6 lg:py-8">
      <HeroBanner />

      <div className="mt-0 md:mt-7 lg:mt-8">
        <MeetingsPageClient />
      </div>

      <CreateMeetingButton />
=======
"use client";
// src/app/(app)/meetings/page.tsx
import Link from "next/link";
import { useGatherings } from "@/apis/gatherings/gatherings.query";

export default function MeetingsPage() {
  const { data: gatherings = [], isLoading, error } = useGatherings();

  if (isLoading) {
    return (
      <main className="p-6">
        <h1 className="mb-6 text-2xl font-bold">모임 목록</h1>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse rounded-lg border p-4">
              <div className="mb-2 h-6 w-3/4 rounded bg-gray-200"></div>
              <div className="mb-1 h-4 w-1/2 rounded bg-gray-200"></div>
              <div className="mb-2 h-4 w-1/3 rounded bg-gray-200"></div>
              <div className="h-8 w-20 rounded bg-gray-200"></div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-6">
        <h1 className="mb-6 text-2xl font-bold">모임 목록</h1>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-red-600">모임 목록을 불러오는 중 오류가 발생했습니다.</p>
          <p className="mt-1 text-sm text-red-500">잠시 후 다시 시도해주세요.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="mb-6 text-2xl font-bold">모임 목록</h1>
      {gatherings.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
          <p className="text-gray-600">등록된 모임이 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {gatherings.map((meeting) => (
            <div key={meeting.id} className="rounded-lg border p-4">
              <h2 className="text-lg font-semibold">{meeting.name}</h2>
              <p className="text-gray-600">위치: {meeting.location}</p>
              <p className="text-gray-600">
                날짜: {new Date(meeting.dateTime).toLocaleDateString("ko-KR")}
              </p>
              <p className="text-gray-600">
                참가자: {meeting.participantCount}/{meeting.capacity}명
              </p>
              <Link
                href={`/meetings/${meeting.id}`}
                className="mt-2 inline-block rounded bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
              >
                상세보기
              </Link>
            </div>
          ))}
        </div>
      )}
>>>>>>> Stashed changes
    </main>
  );
}
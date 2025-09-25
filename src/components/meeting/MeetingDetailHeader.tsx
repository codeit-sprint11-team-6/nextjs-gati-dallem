import { cn } from "@/lib/utils";
import { Gathering } from "@/types/gathering";
import { Clock, MapPin } from "lucide-react";

interface MeetingDetailHeaderProps {
  gathering: Gathering;
  className?: string;
}

export default function MeetingDetailHeader({ gathering, className }: MeetingDetailHeaderProps) {
  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString("ko-KR", {
        month: "short",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const { date, time } = formatDateTime(gathering.dateTime);
  const isRegistrationEnded =
    gathering.registrationEnd && new Date(gathering.registrationEnd) < new Date();

  return (
    <div className={cn("", className)}>
      {/* 상단 태그와 마감 정보 */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* 마감 알림 태그 */}
          {isRegistrationEnded ? (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-1.5">
              <Clock className="h-4 w-4 text-red-600" />
              <span className="text-sm font-semibold text-red-600">신청 마감</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1.5">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600">오늘 21시 마감</span>
            </div>
          )}

          {/* 날짜/시간 칩 */}
          <div className="rounded-lg border border-gray-200 bg-white px-3 py-1.5">
            <span className="text-sm font-medium text-gray-600">{date}</span>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white px-3 py-1.5">
            <span className="text-sm font-medium text-gray-600">{time}</span>
          </div>
        </div>

        {/* 주최자 크라운 아이콘 */}
        <div className="flex h-8 w-8 items-center justify-center">
          <div className="h-6 w-6 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500"></div>
        </div>
      </div>

      {/* 모임 제목과 위치 */}
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-semibold text-gray-900">{gathering.name}</h1>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span className="text-gray-400">위치</span>
          <span className="text-gray-600">{gathering.location}</span>
        </div>
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';
import { Gathering } from '@/types/gathering';
import { Calendar, MapPin, Users } from 'lucide-react';

interface MeetingDetailHeaderProps {
  gathering: Gathering;
  className?: string;
}

export default function MeetingDetailHeader({ gathering, className }: MeetingDetailHeaderProps) {
  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      }),
      time: date.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  const { date, time } = formatDateTime(gathering.dateTime);

  return (
    <div className={cn("space-y-4", className)}>
      {/* 모임 제목 */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
        {gathering.name}
      </h1>

      {/* 모임 기본 정보 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 날짜/시간 */}
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-5 h-5 text-purple-500" />
          <div>
            <div className="font-medium">{date}</div>
            <div className="text-sm">{time}</div>
          </div>
        </div>

        {/* 위치 */}
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-5 h-5 text-purple-500" />
          <div>
            <div className="font-medium">{gathering.location}</div>
          </div>
        </div>

        {/* 참가자 수 */}
        <div className="flex items-center gap-2 text-gray-600">
          <Users className="w-5 h-5 text-purple-500" />
          <div>
            <div className="font-medium">
              {gathering.participantCount}/{gathering.capacity}명
            </div>
            <div className="text-sm">
              {gathering.capacity - gathering.participantCount}자리 남음
            </div>
          </div>
        </div>
      </div>

      {/* 모임 타입 태그 */}
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
          {gathering.type}
        </span>
      </div>
    </div>
  );
}

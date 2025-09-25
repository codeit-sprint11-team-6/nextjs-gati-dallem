import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Gathering } from '@/types/gathering';

interface MeetingDetailContentProps {
  gathering: Gathering;
  description?: string;
  className?: string;
}

export default function MeetingDetailContent({ 
  gathering, 
  description = "모임에 대한 상세한 설명이 여기에 표시됩니다. 참가자들이 어떤 활동을 하게 될지, 어떤 준비물이 필요한지 등에 대한 정보를 제공합니다.",
  className 
}: MeetingDetailContentProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* 모임 이미지 */}
      {gathering.image && (
        <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
          <Image
            src={gathering.image}
            alt={gathering.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
        </div>
      )}

      {/* 모임 설명 */}
      <div className="prose prose-gray max-w-none">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">모임 소개</h2>
        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
          {description}
        </div>
      </div>

      {/* 모임 정보 카드 */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">모임 정보</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">모임 종류</dt>
            <dd className="text-sm text-gray-900">{gathering.type}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">위치</dt>
            <dd className="text-sm text-gray-900">{gathering.location}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">정원</dt>
            <dd className="text-sm text-gray-900">{gathering.capacity}명</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">현재 참가자</dt>
            <dd className="text-sm text-gray-900">{gathering.participantCount}명</dd>
          </div>
        </div>
      </div>
    </div>
  );
}

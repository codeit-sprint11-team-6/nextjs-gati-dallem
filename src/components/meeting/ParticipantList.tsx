"use client";

import { cn } from "@/lib/utils";
import Avatar from "@/components/ui/Avatar";
import { GatheringParticipant } from "@/types/gathering";
import { Card } from "@/components/common/Card";
import Chip, { AlarmTag, ChipInfo } from "@/components/ui/Chip";
import Image from "next/image";
import { useState, useEffect } from "react";

interface ParticipantListProps {
  participants: GatheringParticipant[];
  maxDisplay?: number;
  className?: string;
}

export default function ParticipantList({
  participants,
  maxDisplay = 4,
  className,
}: ParticipantListProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [animatedCount, setAnimatedCount] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);
  
  const displayParticipants = participants.slice(0, maxDisplay);
  const remainingCount = participants.length - maxDisplay;
  const isConfirmed = participants.length >= 5; // 최소 5명 이상이면 개설확정
  
  // Progress bar와 카운트 애니메이션
  useEffect(() => {
    const duration = 1500; // 1.5초
    const steps = 60; // 프레임 수
    const increment = participants.length / steps;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setAnimatedCount(Math.min(Math.round(increment * currentStep), participants.length));
        setProgressWidth(Math.min((currentStep / steps) * (participants.length / 20) * 100, 100));
      } else {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [participants.length]);

  return (
    <Card
      className={cn(
        "border-color-purple-200 w-full !max-w-full !min-w-0 border bg-purple-100",
        className,
      )}
    >
      <Card.Detail className="bg-purple-100 px-10 pt-7 pb-[34px]">
        {/* 참가자 수와 개설확정 상태 */}
        <div className="flex-between mb-6">
          <div className="flex-start gap-3">
            <div className="flex-start gap-2">
              <span className="text-2xl font-bold text-pink-600">{animatedCount}</span>
              <span className="text-xl font-medium text-gray-900">명 참여</span>
            </div>

            {/* 참가자 프로필 이미지들 */}
            <div 
              className="flex -space-x-2 hover:space-x-1 transition-all duration-500 ease-out"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {displayParticipants.map((participant, index) => (
                <div 
                  key={participant.userId} 
                  className="relative transition-transform duration-500 ease-out hover:scale-110 hover:z-10"
                  style={{
                    transitionDelay: `${index * 50}ms`
                  }}
                >
                  <Avatar
                    userProfile={{
                      teamId: participant.teamId,
                      id: participant.User.id,
                      email: participant.User.email,
                      name: participant.User.name,
                      companyName: participant.User.companyName || "",
                      image: participant.User.image || "",
                      createdAt: participant.joinedAt,
                      updatedAt: participant.joinedAt,
                    }}
                    size="small"
                    className="h-7 w-7 border-2 border-white transition-shadow duration-300 hover:shadow-lg"
                  />
                </div>
              ))}

              {/* 더 많은 참가자가 있을 때 */}
              {remainingCount > 0 && (
                <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-white transition-transform duration-500 hover:scale-110">
                  <span className="text-xs font-semibold text-gray-600">+{remainingCount}</span>
                </div>
              )}
            </div>
          </div>

          {/* 개설확정 상태 */}
          {isConfirmed && (
            <Chip>
              <Image src="/icon/check.svg" width={16} height={16} alt="개설확정 아이콘" />
              <span>개설확정</span>
            </Chip>
          )}
        </div>

        {/* 진행률 바와 최소/최대 인원 정보 */}
        <div className="space-y-3">
          <div className="flex-between text-sm text-gray-600">
            <span>최소 5명</span>
            <span>최대 20명</span>
          </div>

          {/* 진행률 바 */}
          <div className="relative h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-1.5 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-200 ease-out"
              style={{ width: `${progressWidth}%` }}
            />
          </div>
        </div>
      </Card.Detail>
    </Card>
  );
}

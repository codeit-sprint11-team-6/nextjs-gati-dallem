import { cn } from "@/lib/utils";
import Avatar from "@/components/ui/Avatar";
import { GatheringParticipant } from "@/types/gathering";
import { Users, CheckCircle } from "lucide-react";
import { Card } from "@/components/common/Card";

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
  const displayParticipants = participants.slice(0, maxDisplay);
  const remainingCount = participants.length - maxDisplay;
  const isConfirmed = participants.length >= 5; // 최소 5명 이상이면 개설확정

  return (
    <div
      className={cn(
        "w-full [&>article]:!w-full [&>article]:!max-w-full [&>article]:!min-w-0",
        className,
      )}
    >
      <Card>
        <Card.Detail>
          <div className="px-6 pt-5 pb-6">
            {/* 참가자 수와 개설확정 상태 */}
            <div className="flex-between mb-6">
              <div className="flex-start gap-3">
                <div className="flex-start gap-2">
                  <span className="text-2xl font-bold text-pink-600">{participants.length}</span>
                  <span className="text-xl font-medium text-gray-900">명 참여</span>
                </div>

                {/* 참가자 프로필 이미지들 */}
                <div className="flex -space-x-2">
                  {displayParticipants.map((participant) => (
                    <div key={participant.userId} className="relative">
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
                        className="h-7 w-7 border-2 border-white"
                      />
                    </div>
                  ))}

                  {/* 더 많은 참가자가 있을 때 */}
                  {remainingCount > 0 && (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-white">
                      <span className="text-xs font-semibold text-gray-600">+{remainingCount}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 개설확정 상태 */}
              {isConfirmed && (
                <div className="flex-start gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-pink-400 to-purple-400">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-lg font-semibold text-pink-600">개설확정</span>
                </div>
              )}
            </div>

            {/* 진행률 바와 최소/최대 인원 정보 */}
            <div className="space-y-3">
              <div className="flex-between text-sm text-gray-600">
                <span>최소 5명</span>
                <span>최대 20명</span>
              </div>

              {/* 진행률 바 */}
              <div className="relative h-1.5 w-full rounded-full bg-gray-200">
                <div
                  className="h-1.5 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-300"
                  style={{ width: `${Math.min((participants.length / 20) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </Card.Detail>
      </Card>
    </div>
  );
}

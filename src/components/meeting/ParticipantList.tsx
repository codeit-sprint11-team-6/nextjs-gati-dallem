import { cn } from '@/lib/utils';
import Avatar from '@/components/ui/Avatar';
import { GatheringParticipant } from '@/types/gathering';

interface ParticipantListProps {
  participants: GatheringParticipant[];
  maxDisplay?: number;
  className?: string;
}

export default function ParticipantList({ 
  participants, 
  maxDisplay = 8,
  className 
}: ParticipantListProps) {
  const displayParticipants = participants.slice(0, maxDisplay);
  const remainingCount = participants.length - maxDisplay;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          참가자 ({participants.length}명)
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {displayParticipants.map((participant) => (
          <div
            key={participant.userId}
            className="flex flex-col items-center space-y-2 p-3 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
          >
            <Avatar
              userProfile={{
                teamId: participant.teamId,
                id: participant.User.id,
                email: participant.User.email,
                name: participant.User.name,
                companyName: participant.User.companyName || '',
                image: participant.User.image || '',
                createdAt: participant.joinedAt,
                updatedAt: participant.joinedAt
              }}
              size="medium"
              className="w-12 h-12"
            />
            <div className="text-center">
              <div className="text-sm font-medium text-gray-900 truncate max-w-[80px]">
                {participant.User.name}
              </div>
              {participant.User.companyName && (
                <div className="text-xs text-gray-500 truncate max-w-[80px]">
                  {participant.User.companyName}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* 더 많은 참가자가 있을 때 표시 */}
        {remainingCount > 0 && (
          <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-purple-600 font-semibold text-sm">
                +{remainingCount}
              </span>
            </div>
            <div className="text-sm text-gray-500 mt-2">
              더보기
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

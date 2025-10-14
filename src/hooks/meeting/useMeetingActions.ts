import { Gathering, GatheringParticipant } from "@/types/gathering";
import { ReviewList } from "@/types/review";

interface UseMeetingActionsProps {
  meetingId: number;
  gathering: Gathering | null;
  participants: GatheringParticipant[];
  reviewList: ReviewList | undefined;
  setGathering: (gathering: Gathering | null) => void;
  setReviewList: (reviewList: ReviewList | undefined) => void;
  onToggleFavorite: () => void;
  onPageChange: (page: number) => void;
}

interface UseMeetingActionsReturn {
  handleJoin: () => Promise<void>;
  handleLeave: () => Promise<void>;
  handleShare: () => void;
}

export const useMeetingActions = ({
  meetingId,
  gathering,
  participants,
  reviewList,
  setGathering,
  setReviewList,
  onToggleFavorite,
  onPageChange,
}: UseMeetingActionsProps): UseMeetingActionsReturn => {
  const handleJoin = async () => {
    console.log("모임 참가 신청:", meetingId);
    // Mock: 참가자 수 증가
    if (gathering) {
      setGathering({
        ...gathering,
        participantCount: gathering.participantCount + 1,
      });
    }
  };

  const handleLeave = async () => {
    console.log("모임 탈퇴:", meetingId);
    // Mock: 참가자 수 감소
    if (gathering) {
      setGathering({
        ...gathering,
        participantCount: Math.max(0, gathering.participantCount - 1),
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: gathering?.name,
        text: `${gathering?.name} 모임에 참가해보세요!`,
        url: window.location.href,
      });
    } else {
      // 클립보드에 URL 복사
      navigator.clipboard.writeText(window.location.href);
      alert("링크가 클립보드에 복사되었습니다.");
    }
  };

  return {
    handleJoin,
    handleLeave,
    handleShare,
  };
};

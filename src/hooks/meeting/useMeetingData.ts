import { useState, useEffect } from "react";
import { Gathering, GatheringParticipant } from "@/types/gathering";
import { ReviewList } from "@/types/review";
import { mockGatherings, mockParticipants, mockReviewsByGathering } from "@/mocks/meeting";

interface UseMeetingDataReturn {
  gathering: Gathering | null;
  participants: GatheringParticipant[];
  reviewList: ReviewList | undefined;
  isLoading: boolean;
  isJoined: boolean;
  setGathering: (gathering: Gathering | null) => void;
  setParticipants: (participants: GatheringParticipant[]) => void;
  setReviewList: (reviewList: ReviewList | undefined) => void;
}

export const useMeetingData = (meetingId: number, userId?: number): UseMeetingDataReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [gathering, setGathering] = useState<Gathering | null>(null);
  const [participants, setParticipants] = useState<GatheringParticipant[]>([]);
  const [reviewList, setReviewList] = useState<ReviewList | undefined>(undefined);

  // Mock 데이터 로딩
  useEffect(() => {
    const loadMockData = async () => {
      setIsLoading(true);

      // TODO: 실제 API 호출로 대체 예정
      const mockGathering = mockGatherings[meetingId];
      const mockParticipantList = mockParticipants[meetingId] || [];
      const mockReviewData = mockReviewsByGathering[meetingId];

      setGathering(mockGathering || null);
      setParticipants(mockParticipantList);
      setReviewList(mockReviewData);
      setIsLoading(false);
    };

    loadMockData();
  }, [meetingId]);

  // 사용자가 참가했는지 확인
  const isJoined = participants.some((p) => p.userId === userId);

  return {
    gathering,
    participants,
    reviewList,
    isLoading,
    isJoined,
    setGathering,
    setParticipants,
    setReviewList,
  };
};

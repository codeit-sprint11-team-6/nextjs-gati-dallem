import { useState } from "react";
import { ReviewList } from "@/types/review";

interface UseMeetingUIReturn {
  isFavorite: boolean;
  currentPage: number;
  setIsFavorite: (isFavorite: boolean) => void;
  setCurrentPage: (page: number) => void;
  handleToggleFavorite: () => void;
  handlePageChange: (page: number) => void;
}

export const useMeetingUI = (reviewList?: ReviewList): UseMeetingUIReturn => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: API 연동
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 실제로는 API 호출로 해당 페이지의 리뷰 데이터를 가져와야 함
    // 현재는 mock 데이터이므로 페이지네이션 정보만 업데이트
    console.log(`리뷰 페이지 ${page}로 이동`);
  };

  return {
    isFavorite,
    currentPage,
    setIsFavorite,
    setCurrentPage,
    handleToggleFavorite,
    handlePageChange,
  };
};

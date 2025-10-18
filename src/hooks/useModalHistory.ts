import { useEffect } from "react";

export function useModalHistory(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return;

    // 모달이 열릴 때 히스토리에 상태 추가
    window.history.pushState({ modal: true }, "");

    const handlePopState = (event: PopStateEvent) => {
      // 뒤로가기 시 모달이 열려있으면 닫기
      if (event.state?.modal !== true) {
        onClose();
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen, onClose]);
}

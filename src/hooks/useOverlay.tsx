import { QueryProvider } from "@/app/providers";
import { createContext, JSX, useContext, useState } from "react";

interface OverlayContextProps {
  setIsOpen: (isOpen: boolean) => void;
  setOverlay: (overlay?: JSX.Element) => void;
}

const OverlayContext = createContext<OverlayContextProps>({
  setIsOpen: () => {},
  setOverlay: () => {},
});

export function OverlayProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [overlay, setOverlay] = useState<JSX.Element | undefined>();
  return (
    <OverlayContext value={{ setIsOpen, setOverlay }}>
      <QueryProvider>
        {children}
        {isOpen && overlay}
      </QueryProvider>
    </OverlayContext>
  );
}

export function useOverlay() {
  /**
   * NOTE:
   * - fade-out 애니메이션(duration: 300ms) 완료 직전에 모달 상태를 해제하기 위한 버퍼 시간.
   * - 285ms로 설정하여 애니메이션이 완료되기 전에 DOM이 사라지는 깜빡임(flickering) 현상을 방지함.
   * - 즉, 애니메이션이 끝나기 전까지 모달이 유지되도록 보정한 값.
   */
  const delay = 0.3 * 1_000 * 0.95;

  const { setIsOpen, setOverlay } = useContext(OverlayContext);

  function handleClose() {
    // fade-out 애니메이션 적용을 위해 DOM 요소의 className을 직접 조작
    const dimmedModalBg = document.getElementById("dimmed");
    dimmedModalBg?.classList.add("animate-fade-out");

    setTimeout(() => {
      setIsOpen(false);
      setOverlay();
    }, delay);
  }

  function handleSetOverlay(modal: JSX.Element) {
    setIsOpen(true);
    setOverlay(modal);
  }
  return { close: handleClose, overlay: handleSetOverlay };
}

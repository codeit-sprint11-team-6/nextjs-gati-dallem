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
  const { setIsOpen, setOverlay } = useContext(OverlayContext);
  function handleClose() {
    const dimmedModalBg = document.getElementById("dimmed");
    dimmedModalBg?.classList.remove("animate-fade-in");
    dimmedModalBg?.classList.add("animate-fade-out");
    setTimeout(() => {
      setIsOpen(false);
      setOverlay();
    }, 280);
  }
  function handleSetOverlay(modal: JSX.Element) {
    setIsOpen(true);
    setOverlay(modal);
  }
  return { close: handleClose, overlay: handleSetOverlay };
}

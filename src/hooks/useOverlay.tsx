import { QueryProvider } from "@/app/providers";
import { AnimatePresence, motion } from "framer-motion";
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
        {
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key={Number(isOpen)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {overlay}
              </motion.div>
            )}
          </AnimatePresence>
        }
      </QueryProvider>
    </OverlayContext>
  );
}

export function useOverlay() {
  const { setIsOpen, setOverlay } = useContext(OverlayContext);

  function handleClose() {
    setIsOpen(false);
    setOverlay();
  }

  function handleSetOverlay(modal: JSX.Element) {
    setIsOpen(true);
    setOverlay(modal);
  }
  return { close: handleClose, overlay: handleSetOverlay };
}

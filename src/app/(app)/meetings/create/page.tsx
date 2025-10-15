// app/(app)/@modal/(..)meetings/create/page.tsx
"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/common/Modal";
import { OverlayContext } from "@/hooks/useOverlay"; 
 
export default function CreateMeetingInterceptPage() {
  const router = useRouter();
  const value = useMemo(
    () => ({
      close: () => router.back(),
      setIsOpen: () => {}, // TODO: implement or connect to actual logic
      setOverlay: () => {}, // TODO: implement or connect to actual logic
    }),
    [router]
  );

  return (
    <OverlayContext.Provider value={value}>
      <Modal>
        <Modal.Header>모임 만들기 1/3</Modal.Header>
        <Modal.TwoButton
          rightBtnText="다음"
          rightBtnDisabled={false}
          onRightBtnClick={() => {/* setStep(2) */}}
        />
      </Modal>
    </OverlayContext.Provider>
  );
}

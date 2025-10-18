// src/components/common/SignupModal.tsx
"use client";

import { useOverlay } from "@/hooks/useOverlay";
import Modal from "@/components/common/Modal";

interface SignupModalProps {
  title?: string;
  message: string;
  onConfirm?: () => void;
}

export default function SignupModal({ title, message, onConfirm }: SignupModalProps) {
  const { close } = useOverlay();
  const handleConfirm = () => {
    onConfirm?.();
    close();
  };

  return (
    <Modal className="gap-10 p-6 md:gap-16 md:p-10">
      <div className="grid gap-6">
        <Modal.Header>{title}</Modal.Header>
        <div className="flex-center text-center text-lg font-semibold md:text-2xl">
          <p className="text-center whitespace-pre-line">{message}</p>
        </div>
      </div>
      <Modal.OneButton onClick={handleConfirm}>확인</Modal.OneButton>
    </Modal>
  );
}

"use client";

import { useOverlay } from "@/hooks/useOverlay";
import Modal from "./Modal";

export default function MessageModal({ message }: { message: string }) {
  const { close } = useOverlay();
  return (
    <Modal className="gap-10 p-6 md:gap-16 md:p-10">
      <div className="grid gap-6">
        <Modal.Header />
        <div className="flex-center text-lg font-semibold md:text-2xl">
          {message.split("\n").map((line, idx) => (
            <p className="text-center" key={idx}>
              {line}
            </p>
          ))}
        </div>
      </div>
      <Modal.OneButton onClick={close}>확인</Modal.OneButton>
    </Modal>
  );
}

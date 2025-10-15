"use client";

import { useOverlay } from "@/hooks/useOverlay";
import Modal from "@/components/common/Modal";
import CreateMeetingWizard from "./CreateMeetingWizard";

export default function CreateMeetingModal() {
  const { close } = useOverlay();

  const handleFinish = (draft: {
    type: string | null;
    name: string;
    location: string;
    imageFile: File | null;
    startDate: string;
    endDate: string;
    capacity: number | "";
  }) => {
    console.log("모임 생성 완료:", draft);
    // TODO: API 연동
    close();
  };

  return (
    <Modal className="gap-6">
      <CreateMeetingWizard onCancel={close} onFinished={handleFinish} />
    </Modal>
  );
}

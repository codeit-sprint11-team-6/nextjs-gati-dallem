"use client";

import { useOverlay } from "@/hooks/useOverlay";
import Modal from "../../common/Modal";
import CreateMeetingWizard from "./CreateMeetingWizard";

export default function CreateMeetingModal() {
  const { close } = useOverlay();

  const handleFinish = () => {
    close();
  };

  return (
    <Modal className="gap-6">
      <CreateMeetingWizard onCancel={close} onFinished={handleFinish}>
        <CreateMeetingWizard.Header />
        <CreateMeetingWizard.Step1 />
        <CreateMeetingWizard.Step2 />
        <CreateMeetingWizard.Step3 />
        <CreateMeetingWizard.Navigation />
      </CreateMeetingWizard>
    </Modal>
  );
}

// app/(app)/meetings/create/page.tsx
"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/common/Modal";
import CreateMeetingWizard from "@/components/meeting/create/CreateMeetingWizard";

export default function CreateMeetingPage() {
  const router = useRouter();

  const handleFinish = () => {
    router.push("/meetings");
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <Modal className="gap-6">
        <CreateMeetingWizard onCancel={handleCancel} onFinished={handleFinish}>
          <CreateMeetingWizard.Header />
          <CreateMeetingWizard.Step1 />
          <CreateMeetingWizard.Step2 />
          <CreateMeetingWizard.Step3 />
          <CreateMeetingWizard.Navigation />
        </CreateMeetingWizard>
      </Modal>
    </main>
  );
}

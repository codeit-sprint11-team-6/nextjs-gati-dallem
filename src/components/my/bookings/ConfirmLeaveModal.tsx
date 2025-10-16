"use client";

import { useLeaveGathering } from "@/apis/gatherings/gatherings.query";
import Modal from "@/components/common/Modal";
import { useOverlay } from "@/hooks/useOverlay";

export default function ConfirmLeaveModal({ id }: { id: number }) {
  const { close } = useOverlay();
  const { mutate: leaveGatheringMutate } = useLeaveGathering();

  function handleClickConfirm() {
    leaveGatheringMutate(id, { onSuccess: () => close() });
  }
  return (
    <Modal className="gap-10 p-6 md:gap-16 md:p-10">
      <div className="grid gap-6">
        <Modal.Header />
        <div className="flex-center text-center text-lg font-semibold md:text-2xl">
          모임 참여를 정말 취소하시겠습니까?
        </div>
      </div>
      <Modal.TwoButton
        leftBtnText="아니오"
        rightBtnText="네"
        onRightBtnClick={handleClickConfirm}
      />
    </Modal>
  );
}

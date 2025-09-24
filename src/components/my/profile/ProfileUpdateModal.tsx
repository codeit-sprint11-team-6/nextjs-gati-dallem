"use client";

import { useOverlay } from "@/hooks/useOverlay";
import Modal from "../../common/Modal";

export default function ProfileUpdateModal() {
  const { close } = useOverlay();

  function onConfirmBtnClick() {
    // TODO: 프로필 수정
    close();
  }
  return (
    <Modal>
      <Modal.Header>프로필 수정하기</Modal.Header>
      <Modal.TwoButton rightBtnText="수정하기" onRightBtnClick={onConfirmBtnClick} />
    </Modal>
  );
}

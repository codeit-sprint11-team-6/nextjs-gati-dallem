"use client";

import { useOverlay } from "@/hooks/useOverlay";
import Modal from "../../common/Modal";

export default function ReviewCreateModal() {
  const { close } = useOverlay();

  function onConfirmBtnClick() {
    // TODO: 리뷰 작성
    close();
  }
  return (
    <Modal>
      <Modal.Header>리뷰 쓰기</Modal.Header>
      <Modal.TwoButton onRightBtnClick={onConfirmBtnClick} />
    </Modal>
  );
}

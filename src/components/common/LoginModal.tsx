"use client";

import { useOverlay } from "@/hooks/useOverlay";
import { useRouter } from "next/navigation";
import Modal from "./Modal";

export default function LoginModal() {
  const router = useRouter();
  const { close } = useOverlay();

  function handleBtnClick() {
    router.push("/signin");
    close();
  }
  return (
    <Modal>
      <div className="grid gap-4">
        <Modal.Header />
        <div className="flex-center text-lg font-semibold md:text-2xl">
          로그인이 필요한 서비스입니다.
        </div>
      </div>
      <Modal.TwoButton onRightBtnClick={handleBtnClick} />
    </Modal>
  );
}

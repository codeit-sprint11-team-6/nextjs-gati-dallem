"use client";

import { useCreateReview } from "@/apis/reviews/reviews.query";
import Modal from "@/components/common/Modal";
import { useOverlay } from "@/hooks/useOverlay";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ScoreInput from "./ScoreInput";

export default function ReviewCreateModal({ id }: { id: number }) {
  const [score, setScore] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const { mutate: createReviewMutate } = useCreateReview();
  const router = useRouter();
  const { close } = useOverlay();

  function handleBtnClick() {
    createReviewMutate(
      { gatheringId: id, score, comment },
      {
        onSuccess: async () => {
          await router.push("/my/reviews?writable=false");
          close();
        },
      },
    );
  }
  return (
    <Modal>
      <Modal.Header>리뷰 쓰기</Modal.Header>
      <div className="grid justify-stretch gap-12">
        <div className="grid justify-stretch gap-2.5">
          <label htmlFor="score" className="font-medium text-slate-800 md:text-lg">
            만족스러운 경험이었나요?
          </label>
          <ScoreInput {...{ score, setScore }} />
        </div>
        <div className="grid justify-stretch gap-2.5">
          <label htmlFor="comment" className="font-medium text-slate-800 md:text-lg">
            경험에 대해 남겨주세요.
          </label>
          <div className="h-[200px] rounded-xl bg-gray-50 p-4 focus-within:ring-2 focus-within:ring-purple-500">
            <textarea
              id="comment"
              className="h-full w-full resize-none overflow-y-auto border-none text-sm ring-0 ring-offset-0 placeholder:text-slate-500 md:text-base"
              placeholder="남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>
      </div>
      <Modal.TwoButton onRightBtnClick={handleBtnClick} rightBtnDisabled={!!!score || !!!comment} />
    </Modal>
  );
}

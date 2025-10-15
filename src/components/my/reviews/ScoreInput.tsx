"use client";

import Image from "next/image";
import { DragEvent, MouseEvent, TouchEvent, useRef } from "react";

export default function ScoreInput({
  score,
  setScore,
}: {
  score: number;
  setScore: (value: number) => void;
}) {
  const touchMoveRef = useRef<HTMLDivElement>(null);

  function updateScoreLevel(end: number) {
    const start = touchMoveRef.current?.offsetLeft ?? 0;
    const scoreLevel = Math.floor((end - start) / 41) + 1;
    setScore(scoreLevel <= 0 ? 1 : scoreLevel > 5 ? 5 : scoreLevel);
  }

  function handleTouchHeart(e: TouchEvent<HTMLDivElement>) {
    updateScoreLevel(e.changedTouches[0].clientX);
  }

  function handleDragOrTouchHeart(e: DragEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>) {
    updateScoreLevel(e.clientX);
  }

  return (
    <div className="w-fit" ref={touchMoveRef} onTouchMove={handleTouchHeart}>
      <input
        className="hidden"
        id="score"
        type="number"
        value={score}
        onChange={(e) => setScore(Number(e.target.value))}
        readOnly
      />
      <div className="flex-start relative gap-[1px]">
        <div
          className="absolute inset-0 z-0 cursor-pointer bg-transparent"
          onDragEnd={handleDragOrTouchHeart}
          onClick={handleDragOrTouchHeart}
          draggable
        />
        {Array(5)
          .fill(undefined)
          .map((_, idx) => (
            <Image
              key={idx}
              className="object-fill"
              src={`/icon/heart_${score >= idx + 1 ? "active" : "inactive"}.svg`}
              alt="리뷰 평점 표시 이미지"
              width={40}
              height={40}
              draggable={false}
            />
          ))}
      </div>
    </div>
  );
}

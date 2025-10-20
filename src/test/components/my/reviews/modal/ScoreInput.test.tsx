import ScoreInput from "@/components/my/reviews/modal/ScoreInput";
import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";

function getActiveHeartsCount() {
  const imgs = screen.queryAllByAltText("리뷰 평점 표시 이미지") as HTMLImageElement[];
  return imgs.filter((img) => img.src.includes("heart_active.svg")).length;
}

function Wrapper({ initial = 3 }: { initial?: number }) {
  const [score, setScore] = useState(initial);
  return (
    <div data-testid="score-input-wrapper">
      <div>점수: {score}</div>
      <ScoreInput score={score} setScore={setScore} />
    </div>
  );
}

describe("마이페이지 - 나의 리뷰 - 리뷰 작성 모달 - 점수 입력 (ScoreInput)", () => {
  let draggableDiv: HTMLDivElement;

  test("score에 따른 활성 하트 수 체크", () => {
    render(<ScoreInput score={2} setScore={() => {}} />);

    const hearts = screen.getAllByAltText("리뷰 평점 표시 이미지") as HTMLImageElement[];
    expect(hearts).toHaveLength(5);

    const active = getActiveHeartsCount();
    expect(active).toBe(2);
  });

  test("점수 업데이트 (클릭)", () => {
    render(<Wrapper initial={1} />);
    draggableDiv = document.querySelector('div[draggable="true"]') as HTMLDivElement;

    fireEvent.click(draggableDiv, { clientX: 41 * 3 });
    const activeCount1 = getActiveHeartsCount();
    expect(activeCount1).toBe(3 + 1);

    fireEvent.click(draggableDiv, { clientX: 0 });
    const activeCount2 = getActiveHeartsCount();
    expect(activeCount2).toBe(1);
  });

  test("점수 업데이트 (드래그)", () => {
    render(<Wrapper initial={1} />);
    draggableDiv = document.querySelector('div[draggable="true"]') as HTMLDivElement;

    fireEvent.dragEnd(draggableDiv, { clientX: 41 * 4 });
    setTimeout(() => {
      const activeCount = getActiveHeartsCount();
      expect(activeCount).toBe(4 + 1);
    }, 100);
  });

  test("점수 업데이트 (터치 이동)", () => {
    render(<Wrapper initial={3} />);
    draggableDiv = document.querySelector('div[draggable="true"]') as HTMLDivElement;

    fireEvent.touchMove(draggableDiv, { changedTouches: [{ clientX: 41 * 2 }] } as any);
    setTimeout(() => {
      const activeCount = getActiveHeartsCount();
      expect(activeCount).toBe(2 + 1);
    }, 100);
  });

  test("<input type='number' readOnly /> setScore로만 값 갱신", () => {
    const setScore = jest.fn();
    render(<ScoreInput score={3} setScore={setScore} />);

    const hidden = screen.getByDisplayValue("3") as HTMLInputElement;
    expect(hidden).toHaveAttribute("readOnly");

    fireEvent.change(hidden, { target: { value: "4" } });
    expect(hidden).toHaveValue(3);
  });

  test("점수 범위는 1~5 이내 - 너무 작은 좌표", () => {
    render(<Wrapper initial={3} />);
    draggableDiv = document.querySelector('div[draggable="true"]') as HTMLDivElement;

    fireEvent.click(draggableDiv, { clientX: -9999 });
    const activeCount = getActiveHeartsCount();
    expect(activeCount).toBe(1);
  });

  test("점수 범위는 1~5 이내 - 너무 큰 좌표", () => {
    render(<Wrapper initial={3} />);
    draggableDiv = document.querySelector('div[draggable="true"]') as HTMLDivElement;

    fireEvent.click(draggableDiv, { clientX: 9999 });
    const activeCount = getActiveHeartsCount();
    expect(activeCount).toBe(5);
  });
});

import ReviewCreateModal from "@/components/my/reviews/modal/ReviewCreateModal";
import { pushSpy } from "@/test/__mocks__/next";
import { closeSpy, resetCloseSpy } from "@/test/__mocks__/overlay";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const mutateSpy = jest.fn();
jest.mock("@/apis/reviews/reviews.query", () => ({
  useCreateReview: () => ({ mutate: mutateSpy }),
}));

// ScoreInput 모킹 (setScore만 쉽게 호출하기 위함)
jest.mock("@/components/my/reviews/modal/ScoreInput", () => (props: any) => {
  const { score, setScore } = props;
  return (
    <div>
      <div data-testid="score-value">{score}</div>
      <button onClick={() => setScore(4)} aria-label="점수 4로 설정">
        set-4
      </button>
      <input id="score" readOnly value={score} onChange={() => {}} />
    </div>
  );
});

describe("마이페이지 - 나의 리뷰 - 리뷰 쓰기 모달 (ReviewCreateModal)", () => {
  let scoreInput: HTMLInputElement;
  let commentTextArea: HTMLTextAreaElement;
  let submitBtn: HTMLButtonElement;

  let setScoreBtn: HTMLButtonElement;

  beforeEach(() => {
    mutateSpy.mockReset();
    pushSpy.mockReset();
    resetCloseSpy();

    render(<ReviewCreateModal id={123} />);

    scoreInput = screen.getByLabelText("만족스러운 경험이었나요?");
    commentTextArea = screen.getByLabelText("경험에 대해 남겨주세요.");
    submitBtn = screen.getByRole("button", { name: "확인" });

    setScoreBtn = screen.getByRole("button", { name: "점수 4로 설정" });
  });

  test("초기 렌더링(제목/라벨/버튼 비활성화)", () => {
    const title = screen.getByText("리뷰 쓰기");
    expect(title).toBeInTheDocument();

    expect(scoreInput).toHaveValue("0");
    expect(commentTextArea).toHaveValue("");
    expect(submitBtn).toBeDisabled();
  });

  describe("버튼 활성화 로직", () => {
    test("score만 있고 comment가 비었으면 버튼 비활성화", () => {
      fireEvent.click(setScoreBtn);
      expect(submitBtn).toBeDisabled();
    });

    test("comment만 있고 score=0이면 버튼 비활성화", () => {
      fireEvent.change(commentTextArea, { target: { value: "텍스트만 입력" } });
      expect(screen.getByRole("button", { name: "확인" })).toBeDisabled();
    });

    test("score, comment 모두 설정 시 버튼 활성화", () => {
      fireEvent.click(setScoreBtn);
      expect(scoreInput).toHaveValue("4");
      expect(submitBtn).toBeDisabled();

      fireEvent.change(commentTextArea, { target: { value: "아주 좋았어요" } });
      expect(submitBtn).toBeEnabled();
    });
  });

  test("[확인] 클릭 - useCreateReview().mutate() 호출, useOverlay().close() 호출", async () => {
    fireEvent.click(setScoreBtn);
    fireEvent.change(commentTextArea, { target: { value: "좋았습니다!" } });

    expect(submitBtn).toBeEnabled();

    mutateSpy.mockImplementation((_payload: any, opts: any) => {
      return opts?.onSuccess?.();
    });

    fireEvent.click(submitBtn);

    expect(mutateSpy).toHaveBeenCalledTimes(1);
    const [payload, options] = mutateSpy.mock.calls[0];
    expect(payload).toEqual({ gatheringId: 123, score: 4, comment: "좋았습니다!" });
    expect(typeof options?.onSuccess).toBe("function");

    await waitFor(() => {
      expect(pushSpy).toHaveBeenCalledWith("/my/reviews?writable=false");
    });
    expect(closeSpy).toHaveBeenCalled();
  });
});

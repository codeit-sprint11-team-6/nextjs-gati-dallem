import Modal from "@/components/common/Modal";
import { closeSpy, resetCloseSpy } from "@/test/__mocks__/overlay";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Modal 컴포넌트", () => {
  describe("Modal (root)", () => {
    beforeEach(() => {
      resetCloseSpy();
    });

    test("기본 렌더링 테스트 (배경(dimmed), aria-label 섹션 렌더, className 병합)", () => {
      const { container } = render(
        <Modal className="custom-class">
          <div>content</div>
        </Modal>,
      );

      const dimmed = container.querySelector("#dimmed");
      expect(dimmed).toBeInTheDocument();

      const section = screen.getByLabelText("모달 영역");
      expect(section).toBeInTheDocument();
      expect(section).toHaveClass("custom-class");

      expect(screen.getByText("content")).toBeInTheDocument();
    });
  });

  describe("Modal.Header", () => {
    test("제목 렌더 및 닫기 버튼 클릭 시 close 호출", () => {
      render(
        <Modal>
          <Modal.Header>리뷰 쓰기</Modal.Header>
        </Modal>,
      );

      expect(screen.getByText("리뷰 쓰기")).toBeInTheDocument();

      const closeBtn = screen.getByRole("button", { name: "모달 닫기 버튼 이미지" });
      fireEvent.click(closeBtn);

      expect(closeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("Modal.OneButton", () => {
    test("버튼 렌더 및 props(onClick/disabled 등) 전달", () => {
      const handleClick = jest.fn();
      render(
        <Modal>
          <Modal.OneButton onClick={handleClick} disabled={false}>
            저장
          </Modal.OneButton>
        </Modal>,
      );

      const btn = screen.getByRole("button", { name: "저장" });
      expect(btn).toBeEnabled();
      fireEvent.click(btn);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test("disabled면 클릭 불가", () => {
      const handleClick = jest.fn();
      render(
        <Modal>
          <Modal.OneButton onClick={handleClick} disabled>
            저장
          </Modal.OneButton>
        </Modal>,
      );

      const btn = screen.getByRole("button", { name: "저장" });
      expect(btn).toBeDisabled();
      fireEvent.click(btn);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Modal.TwoButton", () => {
    test("좌측 버튼 클릭 시 close 호출, 우측 버튼 클릭 시 onRightBtnClick 호출", () => {
      const onRight = jest.fn();

      render(
        <Modal>
          <Modal.TwoButton leftBtnText="취소" rightBtnText="확인" onRightBtnClick={onRight} />
        </Modal>,
      );

      const leftBtn = screen.getByRole("button", { name: "취소" });
      const rightBtn = screen.getByRole("button", { name: "확인" });

      fireEvent.click(leftBtn);
      expect(closeSpy).toHaveBeenCalled();

      fireEvent.click(rightBtn);
      expect(onRight).toHaveBeenCalled();
    });

    test("우측 버튼 비활성 & 클릭 불가", () => {
      const onRight = jest.fn();
      render(
        <Modal>
          <Modal.TwoButton rightBtnText="등록" rightBtnDisabled onRightBtnClick={onRight} />
        </Modal>,
      );

      const rightBtn = screen.getByRole("button", { name: "등록" });
      expect(rightBtn).toBeDisabled();

      fireEvent.click(rightBtn);
      expect(onRight).not.toHaveBeenCalled();
    });

    test("커스텀 텍스트가 정상 표시된다", () => {
      render(
        <Modal>
          <Modal.TwoButton leftBtnText="뒤로" rightBtnText="저장" />
        </Modal>,
      );

      expect(screen.getByRole("button", { name: "뒤로" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "저장" })).toBeInTheDocument();
    });
  });
});

import ConfirmLeaveModal from "@/components/my/bookings/ConfirmLeaveModal";
import { closeSpy, resetCloseSpy } from "@/test/__mocks__/overlay";
import { fireEvent, render, screen } from "@testing-library/react";

const mutateSpy = jest.fn().mockImplementation((_payload: any, opts: any) => {
  opts?.onSuccess?.();
});
jest.mock("@/apis/gatherings/gatherings.query", () => ({
  useLeaveGathering: () => ({ mutate: mutateSpy }),
}));

describe("마이페이지 - 모임 참여 취소 확정 모달 (ConfirmLeaveModal)", () => {
  beforeEach(() => {
    resetCloseSpy();
    render(<ConfirmLeaveModal id={100} />);
  });

  test("[아니오] 클릭 시 useOverlay().close 호출", () => {
    const cancelBtn = screen.getByRole("button", { name: "아니오" });
    fireEvent.click(cancelBtn);

    expect(closeSpy).toHaveBeenCalled();
  });

  test("[네] 클릭 시 useLeaveGathering().mutate 호출, useOverlay().close 호출", () => {
    const confirmBtn = screen.getByRole("button", { name: "네" });
    fireEvent.click(confirmBtn);

    expect(mutateSpy).toHaveBeenCalledTimes(1);
    const options = mutateSpy.mock.calls[0][1];

    expect(typeof options?.onSuccess).toBe("function");
    expect(closeSpy).toHaveBeenCalled();
  });
});

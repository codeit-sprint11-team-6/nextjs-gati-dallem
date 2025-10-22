import ProfileCard from "@/components/my/profile/ProfileCard";
import { mockProfile } from "@/mocks/my/mockProfile";
import { useAuthStore } from "@/store/authStore";
import { overlaySpy } from "@/test/__mocks__/overlay";
import { fireEvent, render, screen } from "@testing-library/react";

describe("마이페이지 - 프로필 정보 조회 (ProfileCard)", () => {
  test("프로필 조회 실패 - 스켈레톤 렌더링", () => {
    useAuthStore.setState({ user: null });
    render(<ProfileCard />);

    expect(screen.getByLabelText("프로필 영역 스켈레톤")).toBeInTheDocument();
    expect(screen.getByAltText("프로필 이미지 스켈레톤")).toBeInTheDocument();
    expect(screen.queryByLabelText("프로필 이미지")).not.toBeInTheDocument();
  });

  test("프로필 조회 성공 - 프로필 정보가 올바르게 표시되는지 확인", () => {
    useAuthStore.setState({ user: mockProfile });

    render(<ProfileCard />);

    expect(screen.getByText(mockProfile.name)).toBeInTheDocument();
    expect(screen.getByText(mockProfile.companyName)).toBeInTheDocument();
    expect(screen.getByText(mockProfile.email)).toBeInTheDocument();

    const img = screen.getByAltText("프로필 이미지");
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toBe(mockProfile.image);
    expect(screen.queryByLabelText("프로필 영역 스켈레톤")).not.toBeInTheDocument();
  });

  test("[프로필 수정하기] 버튼 클릭 - useOverlay().overlay 호출 & 모달 컴포넌트 렌더링", () => {
    useAuthStore.setState({ user: mockProfile });

    render(<ProfileCard />);

    const editButton = screen.getByRole("button");
    fireEvent.click(editButton);

    expect(overlaySpy).toHaveBeenCalledTimes(1);
    const calledWith = overlaySpy.mock.calls[0][0];
    expect(calledWith).toBeTruthy();
  });
});

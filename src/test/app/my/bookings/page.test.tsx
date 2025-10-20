import MyBookingsPage from "@/app/(app)/my/bookings/page";
import { overlaySpy, resetOverlaySpy } from "@/test/__mocks__/overlay";
import { renderWithQueryClient } from "@/test/renderWithQueryClient";
import { cleanup, screen } from "@testing-library/react";

let mockProfileEdit = null as string | null;
jest.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: (key: string) => (key === "profileEdit" ? mockProfileEdit : null),
  }),
}));

const queryFnSpy = jest.fn();
jest.mock("@/apis/gatherings/gatherings.query", () => ({
  useJoinedGatherings: () => queryFnSpy(),
}));

// ReservedCardList는 단순 마커로 모킹(자식 UI 의존성 제거)
jest.mock("@/components/my/bookings/ReservedCardList", () => () => (
  <div data-testid="reserved-card-list">ReservedCardList</div>
));

describe("마이페이지 - 나의 모임 페이지", () => {
  beforeEach(() => {
    resetOverlaySpy();
    mockProfileEdit = null;
  });

  afterEach(() => {
    cleanup();
  });

  test("기본 렌더링 테스트 (ReservedCardList 표시, overlay 미호출)", () => {
    renderWithQueryClient(<MyBookingsPage />);

    expect(screen.getByTestId("reserved-card-list")).toBeInTheDocument();
    expect(overlaySpy).not.toHaveBeenCalled();
  });

  test("[내 정보 수정] 메뉴로 진입 시 프로필 수정 모달 overlay 호출", () => {
    mockProfileEdit = "true";
    renderWithQueryClient(<MyBookingsPage />);

    expect(screen.getByTestId("reserved-card-list")).toBeInTheDocument();
    expect(overlaySpy).toHaveBeenCalledTimes(1);

    const element = overlaySpy.mock.calls[0][0];
    expect(element).toBeTruthy();
  });
});

import ReservedCardList from "@/components/my/bookings/ReservedCardList";
import { mockJoinedGathering } from "@/mocks/my/mockJoinedGathering";
import { renderWithQueryClient } from "@/test/renderWithQueryClient";
import { screen } from "@testing-library/react";

const queryFnSpy = jest.fn();
jest.mock("@/apis/gatherings/gatherings.query", () => ({
  useJoinedGatherings: () => queryFnSpy(),
}));

describe("마이페이지 - 나의 모임 - 나의 모임 목록 조회 (ReservedCardList)", () => {
  beforeEach(() => {
    queryFnSpy.mockReset();
  });

  test("로딩 상태일 때 SkeletonList 렌더링", () => {
    queryFnSpy.mockReturnValue({ isLoading: true, data: undefined });

    renderWithQueryClient(<ReservedCardList />);

    const skeletons = screen.getAllByLabelText("모임 목록 스켈레톤");
    expect(skeletons).toHaveLength(5);
  });

  test("빈 데이터일 때 EmptyList 렌더링", () => {
    queryFnSpy.mockReturnValue({ isLoading: false, data: [] });

    renderWithQueryClient(<ReservedCardList />);

    const emptyListMessage = screen.getByText("아직 신청한 모임이 없어요");
    expect(emptyListMessage).toBeInTheDocument();

    const emptyListImage = screen.getByAltText("빈 페이지 표시 이미지");
    expect(emptyListImage).toHaveAttribute("src", "/image/empty.svg");
  });

  test("데이터가 있을 때 ReservedCardItem 리스트 렌더링", () => {
    const mockData = mockJoinedGathering;
    queryFnSpy.mockReturnValue({
      isLoading: false,
      data: mockData,
    });

    renderWithQueryClient(<ReservedCardList />);

    const items = screen.getAllByLabelText("모임 목록 아이템");
    expect(items).toHaveLength(mockData.length);
    for (const mockData of mockJoinedGathering) {
      expect(screen.getByText(mockData.name)).toBeInTheDocument();
    }
  });
});

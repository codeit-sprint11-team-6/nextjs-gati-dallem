import CreatedCardList from "@/components/my/hosted/CreatedCardList";
import { mockJoinedGathering } from "@/mocks/my/mockJoinedGathering";
import { mockMyGathering } from "@/mocks/my/mockMyGathering";
import { renderWithQueryClient } from "@/test/renderWithQueryClient";
import { render, screen } from "@testing-library/react";

const queryFnSpy = jest.fn();
jest.mock("@/apis/gatherings/gatherings.query", () => ({
  useGatherings: () => queryFnSpy(),
}));

describe("마이페이지 - 내가 만든 모임 - 내가 만든 모임 목록 조회 (CreatedCardList)", () => {
  beforeEach(() => {
    queryFnSpy.mockReset();
  });

  test("로딩 상태일 때 SkeletonList 렌더링", () => {
    queryFnSpy.mockReturnValue({ isLoading: true, data: undefined });

    renderWithQueryClient(<CreatedCardList />);

    const skeletons = screen.getAllByLabelText("내가 만든 모임 목록 스켈레톤");
    expect(skeletons).toHaveLength(5);
  });

  test("빈 데이터일 때 EmptyList 렌더링", () => {
    queryFnSpy.mockReturnValue({ isLoading: false, data: [] });

    renderWithQueryClient(<CreatedCardList />);

    const emptyListMessage = screen.getByText("아직 만든 모임이 없어요");
    expect(emptyListMessage).toBeInTheDocument();

    const emptyListImage = screen.getByAltText("빈 페이지 표시 이미지");
    expect(emptyListImage).toHaveAttribute("src", "/image/empty.svg");
  });

  test("데이터가 있을 때 CreatedCardItem 리스트 렌더링", () => {
    const mockData = mockMyGathering;
    queryFnSpy.mockReturnValue({
      isLoading: false,
      data: mockData,
    });

    renderWithQueryClient(<CreatedCardList />);

    const items = screen.getAllByLabelText("모임 목록 아이템");
    expect(items).toHaveLength(mockData.length);
    for (const mockData of mockJoinedGathering) {
      expect(screen.getByText(mockData.name)).toBeInTheDocument();
    }
  });
});
